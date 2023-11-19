<?php

namespace App\Http\Controllers;

use App\Http\Requests\Booking\BookingRequest;
use App\Http\Resources\BranchResource;
use App\Http\Resources\RoomResource;
use App\Models\Billing;
use App\Models\BookDetail;
use App\Models\Booking;
use App\Models\Branch;
use App\Models\Rates;
use App\Models\Room;
use App\Models\RoomType;
use App\Models\User;
use App\Repositories\BookingRepository;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Carbon;

class ClientController extends Controller
{
    private Booking $booking;
    private BookDetail $book_detail;
    private Billing $billing;
    public function __construct(BookingRepository $bookingRepository)
    {
        $this->bookingRepository = $bookingRepository;
        $this->booking = new Booking();
        $this->book_detail = new BookDetail();
        $this->billing = new Billing();
    }

    public function branch()
    {
        return BranchResource::collection(Branch::all());
    }

    public function roomType()
    {
        return RoomResource::collection(RoomType::all());
    }

    public function rooms(Request $request)
    {
        if (
            request()->has('checkin')
            && request()->has('checkout')
            && request()->has('adult')
            && request()->has('child')
            && request()->has('branch_id')
            && request()->has('soLuong')
        ) {
            $room_completed = $this->check_room($request->checkin, $request->checkout, $request->adult, $request->child, $request->branch_id, null, $request->soLuong);
            if (!$room_completed) {
                $response = [
                    'message' => 'Hết phòng !'
                ];
            } else {
                $room = [];
                foreach ($room_completed as $value) {
                    $room[] = [
                        'room' => Room::find($value),
                        'room_type' => RoomType::where('_id', '=', Room::find($value)->room_type_id)->get()
                    ];
                }
                $response = [
                    'message' => 'Tìm thành công !',
                    'data' => $room
                ];
            }
            return response()->json($response);
        }
        return RoomResource::collection(Room::paginate(10));
    }

    public function roomDetail($id)
    {
        $room = Room::where('slug', '=', $id)->first();
        if (!$room) {
            return response()->json([
                'status' => 'error',
                'message' => 'Phòng không tồn tại !',
            ]);
        }
        $room_same = Room::where('room_type_id', '=', $room->room_type_id)
            ->where('branch_id', '=', $room->branch_id)
            ->where('_id', '!=', $id)
            ->get();
        return response()->json([
            'room' => new RoomResource($room),
            'rate' => $room->getRate(),
            'room_same' => RoomResource::collection($room_same)
        ]);
    }
    public function check_room($check_in, $check_out, $adults, $children, $branch_id, $room_type_id = null, $soLuong = 1)
    {
        $config = config('status');
        //Check qua thoi gian ben Booking
        $room_booked = $this->booking
            // ->where('status', '=', config('status')[0]->id)
            ->where(function ($query) use ($config) {
                $query->where(function ($query) use ($config) {
                    $query->where('status', '=', $config[0]['id']);
                })
                    ->orWhere(function ($query) use ($config) {
                        $query->where('status', '=', $config[1]['id']);
                    })
                    ->orWhere(function ($query) use ($config) {
                        $query->where('status', '=', $config[3]['id']);
                    })
                    ->orWhere(function ($query) use ($config) {
                        $query->where('status', '=', $config[5]['id']);
                    })
                    ->orWhere(function ($query) use ($config) {
                        $query->where('status', '=', $config[8]['id']);
                    });
            })
            ->where(function ($query) use ($check_in, $check_out) {
                $query->where(function ($query) use ($check_in, $check_out) {
                    $query->where('checkin', '>=', $check_in)
                        ->where('checkout', '<=', $check_out);
                })
                    ->orWhere(function ($query) use ($check_in, $check_out) {
                        $query->where('checkin', '<=', $check_in)
                            ->where('checkout', '>=', $check_out);
                    })
                    ->orWhere(function ($query) use ($check_in, $check_out) {
                        $query->where('checkin', '>=', $check_in)->where('checkin', '<', $check_out)->where('checkout', '>=', $check_out);
                    })
                    ->orWhere(function ($query) use ($check_in, $check_out) {
                        $query->where('checkin', '<=', $check_in)->where('checkout', '>', $check_in)->where('checkout', '<=', $check_out);
                    });
            })->get();
        $room_id_booked = [];
        foreach ($room_booked as $item) {
            $book_detail = $this->book_detail->where('booking_id', '=', $item->_id)->get();
            foreach ($book_detail as $key => $value) {
                $room_id_booked[] = $value->room_id;
            }
        }
        //Danh sach cac room
        $room = Room::where('adults', '=', ceil($adults / $soLuong))
            ->where('children', '=', ceil($children / $soLuong))
            ->where('branch_id', '=', $branch_id);
        if ($room_type_id != null) {
            $room->where('room_type_id', '=', $room_type_id);
        }
        $room = $room->get();
        //Danh sach cac phong thoa man adult va children
        $room_id_completed = [];
        foreach ($room as $item) {
            if (!in_array($item->_id, $room_id_booked)) {
                $room_id_completed[] = $item->_id;
            }
        }
        return $room_id_completed;
    }
    public function search(Request $request)
    {
        try {
            if (
                request()->has('checkin')
                && request()->has('checkout')
                && request()->has('adult')
                && request()->has('child')
                && request()->has('branch_id')
                && request()->has('soLuong')
            ) {
                $room_completed = $this->check_room($request->checkin, $request->checkout, $request->adult, $request->child, $request->branch_id, null, $request->soLuong);
                if (!$room_completed) {
                    $response = [
                        'message' => 'Hết phòng !'
                    ];
                } else {
                    $room = [];
                    foreach ($room_completed as $key => $value) {
                        $room[] = new RoomResource(Room::find($value));
                    }
                    $response = [
                        'message' => 'Tìm thành công !',
                        'data' => $room
                    ];
                }
                return response()->json($response);
            }
        } catch (Exception $exception) {
            Log::debug($exception->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Lỗi không thực hiện được tìm kiếm !'
            ]);
        }

    }
    public function booking(BookingRequest $request)
    {
        try {
            return $this->bookingRepository->book($request);
        } catch (Exception $exception) {
            Log::debug($exception->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Lỗi không thực hiện được đặt phòng !'
            ]);
        }
    }


}
