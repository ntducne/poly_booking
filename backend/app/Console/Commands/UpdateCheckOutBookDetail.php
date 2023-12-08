<?php

namespace App\Console\Commands;

use App\Models\BookDetail;
use App\Models\Booking;
use Illuminate\Console\Command;

class UpdateCheckOutBookDetail extends Command
{
    private BookDetail $bookDetail;
    private Booking $booking;

    public function __construct()
    {
        parent::__construct();
        $this->booking = new Booking();
        $this->bookDetail = new BookDetail();
    }
    protected $signature = 'app:update-check-out-book-detail';
    protected $description = 'Update Check Out Book Detail';
    public function handle(): void
    {
        $booking = $this->booking->where('status', 3)->get();
        foreach ($booking as $item) {
            $bookDetail = $this->bookDetail->where('booking_id', $item->id)->get();
            
        }
    }
}
