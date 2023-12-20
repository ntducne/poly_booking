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
            $billing = Billing::where('user_id', $userId)->where('status', 4)->orderBy('_id','desc')->get();
            foreach ($billing as $item) {
                $countBookdetail = BookDetail::where('room_id', $room->id)->where('booking_id', $item->booking_id)->pluck('booking_id');
                $countBooking = Booking::whereIn('_id', $countBookdetail)->count();
                $countRate = RateRoom::where('room_id', $room->id)->where('user_id', $userId)->count();
                if($countBooking > $countRate){
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
        }
        return response()->json([
            'room' => new RoomResource($room),
            'check' => $check
        ]);
    }

    public function checkBooking(Request $request)
    {
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

    public function processSearch(SearchRequest $request)
    {
        $data = $this->roomRepository->processSearchRoom($request);
        $page = $request->page ?? 1;
        $limit = $request->limit ?? 10;

        // Tính số lượng bản ghi bằng cách sử dụng COUNT trong truy vấn cơ sở dữ liệu
        $total_records = count($data);

        // Tính toán số trang
        $total_pages = ceil($total_records / $limit);

        // Đảm bảo trang hiện tại không vượt quá số trang tổng cộng
        $page = min($page, $total_pages);

        // Tính offset cho truy vấn cơ sở dữ liệu
        $offset = ($page - 1) * $limit;

        // Truy vấn cơ sở dữ liệu với phân trang

        if (count($data) == 0) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy phòng !',
                'data' => []
            ]);
        }

        return response()->json([
            'status' => true,
            'message' => 'Lấy dữ liệu thành công !',
            'data' => array_slice($data, $offset, $limit),
            'meta' => [
                'current_page' => $page,
                'last_page' => $total_pages,
                'total_records' => $total_records,
            ]
        ]);
    }

    public function processBooking(BookingRequest $request)
    {
        return $this->roomRepository->processBooking($request);
    }

    public function processRenew(RenewRequest $request)
    {
        return $this->roomRepository->processRenew($request);
    }
}
