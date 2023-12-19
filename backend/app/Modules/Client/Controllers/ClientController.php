<?php

namespace App\Modules\Client\Controllers;

use App\Events\ContactEvent;
use App\Http\Controllers\Controller;
use App\Models\Billing;
use App\Models\BookDetail;
use App\Models\Booking;
use App\Models\Branch;
use App\Models\Contact;
use App\Models\RateRoom;
use App\Models\Room;
use App\Models\RoomType;
use App\Modules\Branch\Resources\BranchResource;
use App\Modules\Client\Requests\BookingRequest;
use App\Modules\Client\Requests\RenewRequest;
use App\Modules\Client\Requests\SearchRequest;
use App\Modules\Room\Resources\RoomResource;
use App\Repositories\BookingRepository;
use App\Repositories\RoomRepository;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;

class ClientController extends Controller
{
    private Booking $booking;
    private BookDetail $book_detail;
    private Billing $billing;
    private BookingRepository $bookingRepository;

    private RoomRepository $roomRepository;

    public function __construct(BookingRepository $bookingRepository, RoomRepository $roomRepository)
    {
        $this->bookingRepository = $bookingRepository;
        $this->roomRepository = $roomRepository;

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
        if (request()->has('checkin') && request()->has('checkout') && request()->has('adult') && request()->has('child') && request()->has('branch_id') && request()->has('soLuong')) {
            return $this->roomRepository->processSearchRoom($request);
        }

        return RoomResource::collection(Room::paginate(10));
    }

    public function roomDetail(Request $request, $id)
    {
        $room = Room::where('slug', '=', $id)->first();
        if (!$room) {
            return response()->json([
                'status' => 'error',
                'message' => 'Phòng không tồn tại !',
            ]);
        }
        $check = false;
        if ($request->user()) {
            $userId = $request->user()->id;
            $billing = Billing::where('user_id', $userId)->where('status', 4)->get();
            foreach ($billing as $item) {
                $bookDetail = BookDetail::where('booking_id', $item->booking_id)->where('room_id', $room->id)->orderBy('id', 'desc')->first();
                if ($bookDetail) {
                    $booking = Booking::where('_id', $bookDetail->booking_id)->first();
                    if ($booking && Carbon::parse($booking->checkout)->addDays(3)->isPast()) {
                        $check = false;
                    } else {
                        $check = true;
                    }
                    break;
                }
            }
        }
        return response()->json([
            'room' => new RoomResource($room),
            'check' => $check
        ]);
    }

    public function checkBooking(Request $request){
        try {
            return $this->bookingRepository->checkBooking($request);
        } catch (Exception $exception) {
            Log::debug($exception->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Lỗi lấy dữ liệu đặt phòng !'
            ]);
        }
    }

    public function processSearch(SearchRequest $request){
        $data = $this->roomRepository->processSearchRoom($request);
        // // phân trang ( data đang trả về là dạng mảng, viết thuật toán phân trang dựa vào page và limit )
        // $page = $request->page;
        // $limit = $request->limit;
        // $offset = ($page - 1) * $limit;
        // // lấy tổng số page
        // $total_page = ceil(count($data) / $limit);
        // // lấy dữ liệu theo page
        // $data = array_slice($data, $offset, $limit);
        // // trả về dữ liệu
        if(count($data) == 0){
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy phòng !',
                'data' => []
            ]);
        }
        return response()->json([
            'status' => true,
            'message' => 'Lấy dữ liệu thành công !',
            'data' => $data,
            // 'total_page' => $total_page
        ]);
    }

    public function processBooking(BookingRequest $request){
        return $this->roomRepository->processBooking($request);
    }

    public function processRenew(RenewRequest $request) {
        return $this->roomRepository->processRenew($request);
    }
}
