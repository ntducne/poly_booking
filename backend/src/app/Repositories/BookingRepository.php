<?php

namespace app\Repositories;

use App\Models\Booking;
use Exception;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Log;

class BookingRepository
{
    private Booking $booking;

    public function __construct(Booking $booking)
    {
        $this->booking = $booking;
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

    public function create($attributes)
    {
        try {
            return $this->booking->create($attributes);
        } catch(Exception $e){
            Log::error($e->getMessage());
            return false;
        }
    }

    public function update($attributes, $id)
    {
        try {
            return $this->booking->update($attributes, $id);
        } catch(Exception $e){
            Log::error($e->getMessage());
            return false;
        }
    }




}
