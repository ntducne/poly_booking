<?php

namespace app\Services;

use App\Repositories\UserRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class UserService {
    private UserRepository $user;

    public function __construct(UserRepository $userRepository)
    {
        $this->user = $userRepository;
    }

    public function all($request): LengthAwarePaginator|bool
    {
        return $this->user->index($request);
    }

    public function find($id) {
        return $this->user->find($id);
    }

    public function create($attributes) {
        return $this->user->create($attributes);
    }

    public function update($attributes, $id)
    {
        return $this->user->update($attributes, $id);
    }

    public function delete($id): bool|int
    {
        return $this->user->delete($id);
    }

    public function trash() {
        return $this->user->trash();
    }

    public function restore($id): bool
    {
        return $this->user->restore($id);
    }

    public function forceDelete($id): bool
    {
        return $this->user->force($id);
    }

    public function emptyTrash(): bool
    {
        return $this->user->emptyTrash();
    }

    public function bookingHistory($id) {
        return $this->user->bookingHistory($id);
    }

    public function updatePassword($attributes, $id): bool
    {
        return $this->user->updatePassword($attributes, $id);
    }

    public function updateProfile($attributes, $id): bool
    {
        return $this->user->updateProfile($attributes, $id);
    }

    public function updateAvatar($attributes, $id): bool
    {
        return $this->user->updateAvatar($attributes, $id);
    }

    public function newUsers($attributes) {
        return $this->user->newUsers($attributes);
    }



}
