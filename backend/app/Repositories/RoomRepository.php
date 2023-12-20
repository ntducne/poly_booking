<?php

namespace App\Repositories;

use App\Events\BookingEvent;
use App\Events\Message;
use App\Models\Billing;
use App\Models\BookDetail;
use App\Models\Booking;
use App\Models\Branch;
use App\Models\HistoryHandleBooking;
use App\Models\Notification;
use App\Models\Room;
use App\Models\RoomImage;
use App\Models\RoomType;
use App\Models\User;
use App\Modules\Branch\Resources\BranchResource;
use App\Modules\Orders\Resources\BillingResource;
use App\Modules\RoomType\Resources\RoomTypeResource;
use Illuminate\Http\JsonResponse;
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
    private string $today;
    private Notification $notification;

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
        $this->today = Carbon::parse(Carbon::now()->format('Y-m-d H:i:s'));
        $this->notification = new Notification();
    }

    public function processSearchRoom($request)
    {
        $adult = $request->adult;
        $children = $request->child;
        $checkin = Carbon::parse($request->checkin)->addHours(14)->format('Y-m-d H:i:s');
        $checkout = Carbon::parse($request->checkout)->addHours(12)->format('Y-m-d H:i:s');
        $branch_id = $request->branch_id ?? $request->user()->branch_id;
        $amount_room = $request->amount_room;
        $room_id = $request->room_id;

        $adultsRatio = $adult / $amount_room;
        $childrenRatio = $children / $amount_room;

        if($room_id){
            $room = $this->room->find($room_id);
            if ($room->adults >= $adultsRatio && $room->children >= $childrenRatio) {
                $room_type_id = $room->room_type_id;
                $room_type = $this->room_type->where('branch_id', $branch_id)->where('id', $room_type_id)->first();
                $booking = $this->booking->where('room_type', $room_type_id)->where('checkin', '<=', $checkin)->where('checkout', '>=', $checkout)->get();
                $roomBook = $this->bookDetail->whereIn('room_number', $room->room_number)->where('room_id', $room_id)->whereIn('booking_id', $booking->pluck('_id'))->get();
                $roomNumerBook = $roomBook->pluck('room_number');
                $roomNumberIsNotBook = count($room->room_number) - count($roomNumerBook);
                $price = 0;
                $price_per_night = $this->room_type->find($room->room_type_id)->price_per_night;
                if ($room->discount > 0) {
                    if ($room->discount < 95) {
                        $price = $price_per_night * ($room->discount / 100);
                    } else {
                        $price = ($price_per_night - $room->discount);
                    }
                } else {
                    $price = $price_per_night;
                }
                return [
                    [
                        'id' => $room->id,
                        'slug' => $room->slug,
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
                        'room_empty' => $roomNumberIsNotBook,
                        'pay_is_checkin' => $room->pay_is_checkin,
                        'num_of_bed' => $room->num_of_bed,

                    ]
                ];
            }
            else {
                return [];
            }
        }
        $getRoom = [];
        $room_type_id = $request->room_type_id;
        if ($room_type_id) {
            $room = $this->room->where('room_type_id', $room_type_id)->get();
            foreach ($room as $item) {
                if ($item->adults >= $adultsRatio && $item->children >= $childrenRatio) {
                    $getRoom[] = $item;
                }
            }
        }
        else {
            $room_type = $this->room_type->where('branch_id', $branch_id)->get();
            foreach ($room_type as $value) {
                $room = $this->room->where('room_type_id', $value->id)->get();
                foreach ($room as $item) {
                    if ($item->adults >= $adultsRatio && $item->children >= $childrenRatio) {
                        $getRoom[] = $item;
                    }
                }
            }
        }
        $billing = $this->billing->whereNotIn('status', [2, 4, 6, 7])->where('branch_id', $branch_id)->get();
        if(count($billing) > 0){
            if(!$room_type_id){
                $booking = $this->booking->whereIn('room_type', $room_type->pluck('id'))->whereIn('_id', $billing->pluck('booking_id'))->where('checkin', '<=', $checkin)->where('checkout', '>=', $checkout)->get();
            }
            else {
                $booking = $this->booking->where('room_type', $room_type_id)->whereIn('_id', $billing->pluck('booking_id'))->where('checkin', '<=', $checkin)->where('checkout', '>=', $checkout)->get();
            }
            $room_completed = [];
            foreach ($getRoom as $room) {
                $room_number = $this->bookDetail->whereIn('status', [0, 1])->where('room_id', $room->id)->whereIn('booking_id', $booking->pluck('id'))->pluck('room_number');
                $newArray = [];
                foreach ($room->room_number as $value) {
                    if (!in_array($value, $room_number->toArray())) {
                        $newArray[] = $value;
                    }
                }
                $price = 0;
                $price_per_night = $this->room_type->find($room->room_type_id)->price_per_night;
                if ($room->discount > 0) {
                    if ($room->discount < 95) {
                        $price = $price_per_night * ($room->discount / 100);
                    } else {
                        $price = ($price_per_night - $room->discount);
                    }
                } else {
                    $price = $price_per_night;
                }
                if (count($newArray) > 0) {
                    $room_completed[] = [
                        'id' => $room->id,
                        'slug' => $room->slug,
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
                        'room_empty' => count($newArray),
                        'pay_is_checkin' => $room->pay_is_checkin,
                        'num_of_bed' => $room->num_of_bed,

                    ];
                }
            }
            $room_completed_2 = array_filter($room_completed, function ($room) use ($amount_room) {
                return $room['amount'] >= $amount_room && $room['room_empty'] >= $amount_room;
            });
            return $room_completed_2;
        }
        else {
            $room_completed = [];
            foreach ($getRoom as $room) {
                $price = 0;
                $price_per_night = $this->room_type->find($room->room_type_id)->price_per_night;
                if ($room->discount > 0) {
                    if ($room->discount < 95) {
                        $price = $price_per_night * ($room->discount / 100);
                    } else {
                        $price = ($price_per_night - $room->discount);
                    }
                } else {
                    $price = $price_per_night;
                }
                $room_completed[] = [
                    'id' => $room->id,
                    'slug' => $room->slug,
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
                    'room_empty' => count($room->room_number),
                    'pay_is_checkin' => $room->pay_is_checkin,
                        'num_of_bed' => $room->num_of_bed,

                ];
            }
            $room_completed_2 = array_filter($room_completed, function ($room) use ($amount_room) {
                return $room['amount'] >= $amount_room && $room['room_empty'] >= $amount_room;
            });
            return $room_completed_2;
        }
    }

    private function calculateProvisional($price_per_night, $room_discount, $number_of_nights, $amount_room): float|int
    {
        if ($room_discount > 0) {
            if ($room_discount < 95) {
                return (($price_per_night * ($room_discount / 100)) * $number_of_nights) * $amount_room;
            }
            else {
                return (($price_per_night - $room_discount) * $number_of_nights) * $amount_room;
            }
        }
        else {
            return ($price_per_night * $number_of_nights) * $amount_room;
        }
    }

    public function processBooking($request): JsonResponse|array
    {
        $searchRoom = $this->processSearchRoom($request);
        if (count($searchRoom) == 0) {
            return response()->json([
                'status' => false,
                'message' => 'Phòng đã hết !. Vui lòng chọn phòng khác',
            ]);
        }
        if (count($searchRoom) > 0) {
            $foundItem = collect($searchRoom)->firstWhere('id', $request->room_id);
            if ($foundItem) {
                $room = $this->room->find($foundItem['id']);
            }
        } 
        else {
            $room = $this->room->find($request->room_id);
        }
        $price_per_night = $this->room_type->find($room->room_type_id)->price_per_night;
        $room_discount = $room->discount;
        $number_of_nights = Carbon::parse($request->checkin)->diffInDays(Carbon::parse($request->checkout));
        $provisional = $this->calculateProvisional($price_per_night, $room_discount, $number_of_nights, $request->amount_room);
        $bookingData = [
            'booking_date' => Carbon::now()->format('Y-m-d'),
            'checkin' => Carbon::parse($request->checkin)->addHours(14)->format('Y-m-d H:i:s'),
            'checkout' => Carbon::parse($request->checkout)->addHours(12)->format('Y-m-d H:i:s'),
            'room_type' => $room->room_type_id,
            'representative' => [
                'name' => $request->name,
                'phone' => $request->phone,
                'email' => $request->email,
            ],
            'provisional' => $provisional,
            'amount_people' => [
                'adult' => $request->adult,
                'children' => $request->child,
                'total' => $request->adult + $request->child,
            ],
            'amount_room' => $request->amount_room,
            'status' => 0,
            'people' => [],
            'time' => [],
        ];
        $booking = $this->booking->where('checkin', '<=', Carbon::parse($request->checkin)->addHours(14)->format('Y-m-d H:i:s'))->where('checkout', '>=', Carbon::parse($request->checkout)->addHours(12)->format('Y-m-d H:i:s'))->get();
        $room_number = $this->bookDetail->whereIn('booking_id', $booking->pluck('id'))->whereIn('status', [0, 1])->where('room_id', $room->id)->pluck('room_number');
        $dataRoomNumber = [];
        foreach ($room->room_number as $value) {
            if (!in_array($value, $room_number->toArray())) {
                $dataRoomNumber[] = $value;
            }
        }
        $result = array_slice($dataRoomNumber, 0, $request->amount_room);
        $bookingCreate = $this->booking->create($bookingData);
        foreach ($result as $value) {
            $this->bookDetail->create([
                'booking_id' => $bookingCreate->id,
                'room_id' => $room->id,
                'room_name' => $room->name,
                'room_number' => $value,
                'is_checkout' => Carbon::parse($request->checkout)->addHours(12)->format('Y-m-d H:i:s'),
                'status' => 0,
            ]);
        }
        $user = $this->user->where('email', $request->email)->orWhere('phone', $request->phone)->first();
        $user_id = $user ? $user->id : null;
        $total = $provisional;
        $billingCode = time();
        $billingData = [
            'booking_id' => $bookingCreate->id,
            'user_id' => $user_id,
            'services' => [],
            'total' => $total,
            'payment_method' => $request->payment_method,
            'payment_date' => null,
            'branch_id' => $room->branch_id ?? $request->user()->branch_id,
            'status' => 0,
            'billingCode' => $billingCode,
            'moneyUSD' => $total / 23000,
            'moneyVND' => $total,
        ];
        $billing = $this->billing->create($billingData);
        $newBilling = $this->billing->where('booking_id', $bookingCreate->id)->first()->_id;
        event(new BookingEvent(new BillingResource(
            $this->billing->find($newBilling)
        )));
        if($user){
            User::where('email', $request->email)->orWhere('phone', $request->phone)->first()->notify(new \App\Notifications\BookRoom(
                $request->name,
                [
                    'order_code' => $billingCode,
                    'order_date' => Carbon::now()->format('Y-m-d H:i:s'),
                    'payment' => $request->payment_method,
                    'total' => $total,
                    'rooms' => $room->name,
                    'customer' => [
                        'name' => $request->name,
                        'phone' => $request->phone,
                        'email' => $request->email,
                    ],
                    'check_in' => $request->checkin,
                    'check_out' => $request->checkout,
                    'status' => 'Đã đặt phòng',
                ],
                env('FE_URL') . '/search-order?billingCode=' . $billingCode
            ));
        }
        if($request->user()){
            $this->history_handle->create([
                'booking_id' => $bookingCreate->id,
                'admin_id' => $request->user()->id,
                'handle' => 'Đặt phòng',
                'time' => Carbon::now()->format('Y-m-d H:i:s'),
            ]);
        }
        else {
            event(new Message([
                'message' => 'Bạn có một đơn đặt phòng mới !',
                'time' => Carbon::now()->format('Y-m-d H:i:s'),
            ]));
            $this->notification->create([
                'message' => 'Có một đơn đặt phòng mới !',
                'time' => Carbon::now()->format('Y-m-d H:i:s'),
                'billing_id' => $newBilling,
            ]);
        }
        if($request->payment_method == 'vnpay'){
            return [
                'status' => true,
                'message' => 'Đặt phòng thành công !',
                'url' => route('vnpay.process', [
                    'order_code' => $billing->billingCode,
                    'amount' => $billing->total,
                ]),
            ];
        }
        if($request->payment_method == 'momo'){
            return [
                'status' => true,
                'message' => 'Đặt phòng thành công !',
                'url' => route('momo.process', [
                    'order_code' => $billing->billingCode,
                    'amount' => $billing->total,
                ]),
            ];
        }
        if($request->payment_method == 'paypal'){
            return [
                'status' => true,
                'message' => 'Đặt phòng thành công !',
                'url' => route('paypal.process', [
                    'order_code' => $billing->billingCode,
                    'amount' => $billing->total,
                ]),
            ];
        }
        return [
            'status' => true,
            'message' => 'Đặt phòng thành công !',
            'billingCode' => $billing->billingCode,
            'amount' => $billing->total,
        ];
    }

   

    public function processRenew($request)
    {
        $room_id = $request->room_id;
        $billing = $this->billing->where('booking_id', $request->booking_id)->where('branch_id', $request->user()->branch_id)->first();
        $booking = $this->booking->find($billing->booking_id);
        $bookDetail = $this->bookDetail->where('booking_id', $booking->id)->first();
        if ($room_id == $bookDetail->room_id) {
            // thông tin phòng
            $price_per_night = $this->room_type->find($booking->room_type)->price_per_night;
            $room_discount = $bookDetail->discount;
            // thông tin booking
            $count_room_detail = count($this->bookDetail->where('booking_id', $booking->id)->get()); // số lượng phòng ban đầu
            $newAmountRoom = $request->amount_room; // số lượng phòng gia hạn
            $newCheckIn = $booking->checkin;
            $newCheckout = Carbon::parse($request->newCheckout)->addHours(12)->format('Y-m-d H:i:s');
            $number_of_nights = Carbon::parse($newCheckIn)->diffInDays(Carbon::parse($newCheckout));
            $provisional = $this->calculateProvisional($price_per_night, $room_discount, $number_of_nights, $newAmountRoom);
            // Trường hợp 1: Số lượng phòng gia hạn không thay đổi
            if ($count_room_detail == $newAmountRoom) {
                $this->bookDetail
                    ->where('booking_id', $booking->id)
                    ->where('status', 0)
                    ->update([
                        'is_checkout' => $newCheckout,
                    ]);
            }
            // Trường hợp 2: Số lượng phòng gia hạn nhỏ hơn số lượng phòng ban đầu
            if ($count_room_detail > $newAmountRoom) {
                $roomNumberRenew = $request->roomNumberRenew;
                if (Carbon::parse(Carbon::now()->format('Y-m-d H:i:s'))->eq($newCheckout))  // ngày hiện tại bằng ngày checkout mới
                {
                    $this->bookDetail
                        ->where('booking_id', $booking->id)
                        ->where('status', 0)
                        ->whereNotIn('_id', $roomNumberRenew)
                        ->update([
                            'status' => 4,
                        ]);
                }
                elseif (Carbon::parse(Carbon::now()->format('Y-m-d H:i:s'))->gt($newCheckout)) // ngày hiện tại lớn hơn ngày checkout mới
                {
                    return response()->json([
                        'message' => 'Ngày gia hạn phải lớn hơn ngày hiện tại !',
                    ]);
                }
                elseif (Carbon::parse(Carbon::now()->format('Y-m-d H:i:s'))->lt($newCheckout)) // ngày hiện tại nhỏ hơn ngày checkout mới
                {
                    $this->bookDetail
                        ->where('booking_id', $booking->id)
                        ->where('status', 0)
                        ->whereNotIn('_id', $roomNumberRenew)
                        ->update([
                            'is_checkout' => $newCheckout,
                        ]);
                }
            }
            // Trường hợp 3: Số lượng phòng gia hạn lớn hơn số lượng phòng ban đầu
            if ($count_room_detail < $newAmountRoom) {
                $searchRoom = $this->processSearchRoom($request);
                if (count($searchRoom) > 0) {
                    $foundItem = collect($searchRoom)->firstWhere('id', $request->room_id);
                    if ($foundItem) {
                        $room = $this->room->find($foundItem['id']);
                    }
                } 
                else {
                    $room = $this->room->find($request->room_id);
                }
                $roomNumbers = $room->room_number;
                $newRoomNumber = [];
                foreach ($roomNumbers as $value) {
                    $check = $this->bookDetail->where('room_number', $value)->first();
                    if (!$check) {
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
                $this->bookDetail
                    ->where('booking_id', $booking->id)
                    ->where('status', 0)
                    ->update([
                        'is_checkout' => $newCheckout,
                    ]);
            }
            $this->booking->where('booking_id', $request->booking_id)->update([
                'checkout' => $newCheckout,
                'provisional' => $booking->provisional + $provisional,
                'amount_room' => $newAmountRoom,
            ]);
            $newTotal = $billing->total + $provisional;
            $this->billing->where('booking_id', $request->booking_id)->where('branch_id', $request->user()->branch_id)->update([
                'total' => $newTotal,
            ]);
            $this->history_handle->create([
                'booking_id' => $booking->_id,
                'admin_id' => $request->user()->id,
                'handle' => 'Gia hạn phòng',
                'time' => Carbon::now()->format('Y-m-d H:i:s'),
            ]);
            return response()->json([
                'message' => 'Gia hạn phòng thành công !',
            ]);
        } 
        else {
            $this->billing->where('_id', $billing->_id)->update([
                'status' => 4,
            ]);
            $this->bookDetail
                ->where('booking_id', $booking->id)
                ->where('status', 0)
                ->update([
                    'status' => 1,
                ]);
            return $this->processBooking($request);
        }
    }
}
