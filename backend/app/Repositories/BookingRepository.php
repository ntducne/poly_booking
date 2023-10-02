<?php

namespace app\Repositories;

use App\Models\BookDetail;
use App\Models\Booking;
use App\Models\Room;
use Carbon\Carbon;
use Exception;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class BookingRepository
{
    private Booking $booking;
    private BookDetail $bookingDetail;
    private string $date;

    public function __construct(Booking $booking, BookDetail $bookingDetail)
    {
        $this->booking = $booking;
        $this->bookingDetail = $bookingDetail;
        $this->date = Carbon::now()->format('d/m/Y H:i:s');
    }

    public function index(): LengthAwarePaginator|bool
    {
        try {
            $query = $this->booking->newQuery();
            return $query->paginate(10);
        } catch(Exception $e){
            Log::error($e->getMessage());
            return false;
        }
    }

    public function checkRoom($request)
    {
        // lấy dữ liệu từ request
        $checkIn = $request->check_in; // Ngày check-in
        $checkOut = $request->check_out; // Ngày check-out
        $numberOfPeople = $request->amount_of_people; // Số lượng người
        $room_quantity = $request->room_quantity;

        // kiểm tra số lượng phòng đặt có lớn hơn số lượng người hay không
        if($room_quantity > $numberOfPeople){
            return false;
        }

        // kiểm tra các phòng còn trống
        return DB::table('rooms')
            ->leftJoin('booking_detail', function ($join) use ($checkIn, $checkOut) {
                $join->on('rooms.room_name', '=', 'booking_detail.room_name')
                    ->where(function ($query) use ($checkIn, $checkOut) {
                        // Kiểm tra xem phòng đã được đặt cho khoảng thời gian này chưa
                        $query->where(function ($subQuery) use ($checkIn, $checkOut) {
                            $subQuery->where('booking.check_in', '>=', $checkIn)
                                ->where('booking.check_in', '<', $checkOut);
                        })->orWhere(function ($subQuery) use ($checkIn, $checkOut) {
                            $subQuery->where('booking.check_out', '>', $checkIn)
                                ->where('booking.check_out', '<=', $checkOut);
                        });
                    });
            })
            ->where('rooms.num_of_room', '>=', $room_quantity)
            ->select('rooms.*')
            ->groupBy('rooms.id')
            ->havingRaw('SUM(booking_detail.room_id IS NOT NULL) < ?', [$room_quantity])
            ->get();
    }


    public function create($request)
    {
        try {
            $user_id = $request->user_id;
            $booking_date = $this->date;
            $check_in = $request->check_in;
            $check_out = $request->check_out;
            $pay_date = $request->pay_date;
            $representative = $request->representative;
            $amount_of_people = $request->amount_of_people;
            $list_room = $request->list_room;



            return $this->booking->create($request);
        } catch(Exception $e){
            Log::error($e->getMessage());
            return false;
        }
    }

    public function update($attributes, $id): bool
    {
        try {
            return $this->booking->update($attributes, $id);
        } catch(Exception $e){
            Log::error($e->getMessage());
            return false;
        }
    }




}
