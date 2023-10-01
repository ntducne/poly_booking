<?php


namespace app\Services;

use App\Models\Booking;
use App\Repositories\UserRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class BookingService
{

    private Booking $booking;

    public function __construct(Booking $booking)
    {
        $this->booking = $booking;
    }

    public function all()
    {
        return $this->booking->all();
    }

    public function find($id)
    {
        return $this->booking->find($id);
    }

    public function create($attributes)
    {
        return $this->booking->create($attributes);
    }

    public function update($attributes, $id)
    {
        return $this->booking->update($attributes, $id);
    }

    public function delete($id): bool|int
    {
        return $this->booking->delete($id);
    }

    public function trash()
    {
        return $this->booking->trash();
    }

    public function restore($id): bool
    {
        return $this->booking->restore($id);
    }

    public function forceDelete($id): bool
    {
        return $this->booking->force($id);
    }

    public function emptyTrash(): bool
    {
        return $this->booking->emptyTrash();
    }

    public function bookingHistory($id)
    {
        return $this->booking->bookingHistory($id);
    }

    public function updatePassword($attributes, $id): bool
    {
        return $this->booking->updatePassword($attributes, $id);
    }

    public function updateProfile($attributes, $id): bool
    {
        return $this->booking->updateProfile($attributes, $id);
    }

    public function updateAvatar($attributes, $id): bool
    {
        return $this->booking->updateAvatar($attributes, $id);
    }

    public function newUsers($attributes)
    {
        return $this->booking->newUsers($attributes);
    }


}
