<?php


use app\Repositories\UserRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class UserService {
    private UserRepository $user;

    public function __construct(UserRepository $userRepository)
    {
        $this->user = $userRepository;
    }

    public function all(): LengthAwarePaginator|bool
    {
        return $this->user->index();
    }

    public function find($id) {
        return $this->user->find($id);
    }

    public function create(array $attributes) {
        return $this->user->create($attributes);
    }

    public function update(array $attributes, $id): bool
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






}
