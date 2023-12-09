<?php

namespace App\Console\Commands;

use App\Models\BookDetail;
use App\Models\Booking;
use Carbon\Carbon;
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
        // Retrieve bookings with a status of 3
        $booking = $this->booking->where('status', 3)->get();

        // Loop through each booking
        foreach ($booking as $item) {
            // Retrieve booking details associated with the current booking
            $bookDetail = $this->bookDetail->where('booking_id', $item->id)->get();

            // Loop through each booking detail
            foreach ($bookDetail as $value) {
                // Check conditions for updating
                if (
                    $value->is_checkout < Carbon::now()->format('Y-m-d H:i:s') &&
                    $item->checkout > Carbon::now()->format('Y-m-d H:i:s')
                ) {
                    // Update the bookDetail record
                    $this->bookDetail->where('id', $value->id)->update([
                        'is_checkout' => Carbon::now()->format('Y-m-d H:i:s'),
                        'status' => 1
                    ]);
                }
            }
        }
    }
}
