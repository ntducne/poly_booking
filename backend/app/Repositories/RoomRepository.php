<?php

namespace App\Repositories;

use App\Models\Billing;
use App\Models\BookDetail;
use App\Models\Booking;
use App\Models\Branch;
use App\Models\HistoryHandleBooking;
use App\Models\Room;
use App\Models\RoomImage;
use App\Models\RoomType;
use App\Models\User;
use App\Modules\Branch\Resources\BranchResource;
use App\Modules\RoomType\Resources\RoomTypeResource;
use Illuminate\Support\Carbon;

class RoomRepository
{
    private Branch $branch;
    private Room $room;
    private RoomType $room_type;
    private RoomImage $room_image;
    private Booking $booking;
    private BookDetail $bookDetail;
    private Billing $billing;
    private User $user;
    private HistoryHandleBooking $history_handle;

    public function __construct()
    {
        $this->branch = new Branch();
        $this->room = new Room();
        $this->room_type = new RoomType();
        $this->room_image = new RoomImage();
        $this->booking = new Booking();
        $this->bookDetail = new BookDetail();
        $this->billing = new Billing();
        $this->user = new User();
        $this->history_handle = new HistoryHandleBooking();
    }

    public function processSearchRoom($request)
    {
        $adult = $request->adult;
        $children = $request->children;
        $checkin = $request->checkin;
        $checkout = $request->checkout;
        $branch_id = $request->branch_id;
        $amount_room = $request->amount_room;
        $room_type_id = $request->room_type_id;
        $getRoom = [];
        if($room_type_id){
            $room = $this->room->where('room_type_id', $room_type_id)->get();
            foreach ($room as $item) {
                if ($item->adults >= $adult && $item->children >= $children) {
                    $getRoom[] = $item;
                }
            }

        }
        else {
            $room_type = $this->room_type->where('branch_id', $branch_id)->get();
            foreach ($room_type as $value) {
                $room = $this->room->where('room_type_id', $value->id)->get();
                foreach ($room as $item) {
                    if ($item->adults >= $adult && $item->children >= $children) {
                        $getRoom[] = $item;
                    }
                }
            }
        }
        $billing = $this->billing
                        ->whereNotIn('status', [2, 4, 6, 7])
                        ->where('branch_id', $branch_id)
                        ->get();
        $booking = $this->booking
                        // ->whereIn('room_type', $room_type->pluck('id'))
                        ->whereIn('_id', $billing->pluck('booking_id'))
                        ->where('checkin', '>=', $checkin)
                        ->where('checkout', '<=', $checkout)
                        ->get();

        $room_completed = [];
        foreach ($getRoom as $room) {
            $room_number = $this->bookDetail
                                ->where('status', 0)
                                ->where('room_id', $room->id)
                                ->whereIn('booking_id', $booking->pluck('_id'))
                                ->pluck('room_number');
            $newArray = [];
            foreach ($room->room_number as $value) {
                if (!in_array($value, $room_number->toArray())) {
                    $newArray[] = $value;
                }
            }
            $price = 0;
            $price_per_night = $this->room_type->find($room->room_type_id)->price_per_night;
            if($room->discount > 0) {
                if($room->discount < 95) {
                    $price = $price_per_night * ($room->discount / 100);
                } else {
                    $price = ($price_per_night - $room->discount);
                }
            } else {
                $price = $price_per_night;
            }
            if(count($newArray) > 0){
                $room_completed[] = [
                    'id' => $room->id,
                    'name' => $room->name,
                    'amount' => $room->amount,
                    'discount' => $room->discount,
                    'price' => $price,
                    'adults' => $room->adults,
                    'children' => $room->children,
                    'description' => $room->description,
                    'room_type' => new RoomTypeResource($this->room_type->find($room->room_type_id)),
                    'branch' => new BranchResource($this->branch->find($room->branch_id)),
                    'image' => RoomImage::where('room_id', $room->id)->first()->image ?? '',
                    'room_empty' => count($newArray)
                ];
            }
        }
        $room_completed_2 = array_filter($room_completed, function ($room) use ($amount_room) {
            return $room['amount'] >= $amount_room;
        });
        return $room_completed_2;
    }

    public function processBooking($request)
    {
        $searchRoom = $this->processSearchRoom($request);
        if(count($searchRoom) == 0){
            return false;
        }
        if (count($searchRoom) > 0) {
            $foundItem = collect($searchRoom)->firstWhere('id', $request->room_id);
            if ($foundItem) {
                $room = $this->room->find($foundItem['id']);
            }
        } else {
            $room = $this->room->find($request->room_id);
        }
        $price_per_night = $this->room_type->find($room->room_type_id)->price_per_night;
        $room_discount = $room->discount;
        $number_of_nights = Carbon::parse($request->checkin)->diffInDays(Carbon::parse($request->checkout));
        $provisional = $this->calculateProvisional($price_per_night, $room_discount, $number_of_nights, $request->amount_room);
        $bookingData = [
            'booking_date' => Carbon::now()->format('Y-m-d'),
            'checkin' => $request->checkin,
            'checkout' => $request->checkout,
            'room_type' => $room->room_type_id,
            'representative' => [
                'name' => $request->name,
                'phone' => $request->phone,
                'email' => $request->email,
            ],
            'provisional' => $provisional,
            'amount_people' => [
                'adult' => $request->adult,
                'children' => $request->children,
                'total' => $request->adult + $request->children,
            ],
            'amount_room' => $request->amount_room,
            'status' => 0,
            'people' => [],
            'time' => [],
        ];
        $bookingCreate = $this->booking->create($bookingData);
        $roomNumbers = $room->room_number;
        $result = array_slice($roomNumbers, 0, $request->amount_room);
        foreach ($result as $value) {
            $this->bookDetail->create([
                'booking_id' => $bookingCreate->id,
                'room_id' => $room->id,
                'room_name' => $room->name,
                'room_number' => $value,
                'status' => 0,
            ]);
        }
        $user = $this->user->where('email', $request->email)->orWhere('phone', $request->phone)->first();
        $user_id = $user ? $user->id : null;
        $total = $provisional;
        $billingData = [
            'booking_id' => $bookingCreate->id,
            'user_id' => $user_id,
            'services' => [],
            'total' => $total,
            'payment_method' => $request->payment_method,
            'payment_date' => null,
            'branch_id' => $room->branch_id,
            'status' => 0,
            'billingCode' => time(),
        ];
        $billing = $this->billing->create($billingData);
        return [
            'message' => 'Đặt phòng thành công !',
            'bill' => [
                'billingCode' => $billing->billingCode,
                'total' => $billing->total,
            ]
        ];
    }

    private function calculateProvisional($price_per_night, $room_discount, $number_of_nights, $amount_room)
    {
        if ($room_discount > 0) {
            if ($room_discount < 95) {
                return (($price_per_night * ($room_discount / 100)) * $number_of_nights) * $amount_room;
            } else {
                return (($price_per_night - $room_discount) * $number_of_nights) * $amount_room;
            }
        } else {
            return ($price_per_night * $number_of_nights) * $amount_room;
        }
    }

    public function processRenew($request){
        $room_id = $request->room_id;
        $billing = $this->billing->find($request->billing_id);
        $booking = $this->booking->find($billing->booking_id);
        $bookDetail = $this->bookDetail->where('booking_id', $booking->id)->first();
        if($room_id == $bookDetail->room_id){
            $room = $this->room->find($room_id);
            $newCheckout = $request->newCheckout;
            $number_of_nights = Carbon::parse($booking->checkout)->diffInDays(Carbon::parse($newCheckout));
            $price_per_night = $this->room_type->find($room->room_type_id)->price_per_night;
            $room_discount = $room->discount;
            $provisional = $this->calculateProvisional($price_per_night, $room_discount, $number_of_nights, $request->amount_room);
            $count_room_detail = count($this->bookDetail->where('booking_id', $booking->id)->get());
            if($request->amount_room < $count_room_detail){
                $roomNumberRenew = $request->roomNumberRenew;
                $this->bookDetail
                    ->where('booking_id', $booking->id)
                    ->where('status', 0)
                    ->whereNotIn('_id', $roomNumberRenew)
                    ->update([
                        'status' => 1,
                    ]);
            }
            if($request->amount_room > $count_room_detail){
                $searchRoom = $this->processSearchRoom($request);
                if (count($searchRoom) > 0) {
                    $foundItem = collect($searchRoom)->firstWhere('_id', $request->room_id);
                    if ($foundItem) {
                        $room = $this->room->find($foundItem['id']);
                    }
                } else {
                    $room = $this->room->find($request->room_id);
                }
                $roomNumbers = $room->room_number;
                $newRoomNumber = [];

                foreach ($roomNumbers as $value) {
                    $check = $this->bookDetail->where('room_number', $value)->first();
                    if(!$check){
                        $newRoomNumber[] = $value;
                    }
                }
                $roomNumbers = $newRoomNumber;
                $result = array_slice($roomNumbers, 0, $request->amount_room - (integer)$count_room_detail);
                foreach ($result as $value) {
                    $this->bookDetail->create([
                        'booking_id' => $booking->_id,
                        'room_id' => $room->id,
                        'room_name' => $room->name,
                        'room_number' => $value,
                        'status' => 0,
                    ]);
                }
            }
            $this->booking->where('_id', $booking->_id)->update([
                'checkout' => $newCheckout,
                'provisional' => $booking->provisional + $provisional,
                'amount_room' => $request->amount_room,
            ]);
            $newTotal = $billing->total + $provisional;
            $this->billing->where('_id', $billing->_id)->update([
                'total' => $newTotal ,
            ]);
            $values = [
                'booking_id' => $booking->_id,
                'admin_id' => $request->user()->id,
                'handle' => 'Gia hạn phòng',
                'time' => Carbon::now()->format('Y-m-d H:i:s'),
            ];
            $this->history_handle->create($values);
            return response()->json([
                'message' => 'Gia hạn phòng thành công !',
            ]);
        }
        else {
            $this->billing->where('_id', $billing->_id)->update([
                'status' => 4 ,
            ]);
            return $this->processBooking($request);
        }
    }
}
