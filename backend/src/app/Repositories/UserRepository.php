<?php

namespace app\Repositories;

use App\Models\User;
use Exception;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class UserRepository
{
    private User $user;
    private string $folder;

    public function __construct(User $user)
    {
        $this->user = $user;
        $this->folder = 'users';
    }

    public function index(): LengthAwarePaginator|bool
    {
        try {
            $query = $this->user->newQuery();
            if(request()->has('phone')){
                $query->where('phone', 'like', request()->get('phone'));
            }
            if(request()->has('email')){
                $query->where('email', 'like', request()->get('email'));
            }
            return $query->paginate(10);
        } catch(Exception $e){
            Log::error($e->getMessage());
            return false;
        }
    }

    public function create(array $request)
    {
        try {
            $attributes = $request->validated();
            $image = $request->file('image');
            if($image){
                $image_url = UploadImage($image, $this->folder);
                $attributes['image'] = $image_url;
            }
            return $this->user->create($attributes);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return false;
        }
    }

    public function find($id)
    {
        try {
            return $this->user->find($id);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return false;
        }
    }

    public function update(array $request, $id): bool
    {
        try {
            $user = $this->find($id);
            if(!$user){
                return false;
            }
            $arr = $request->validated();
            $image = $request->file('image');
            if($image){
                DeleteImage($user->image);
                $image_url = UploadImage($image, $this->folder);
                $arr['image'] = $image_url;
            }
            $arr['status'] = (integer)$request->status;
            $user->update($arr);
            return true;
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return false;
        }
    }

    public function delete($id): bool|int
    {
        $check = $this->find($id);
        if(!$check){
            return false;
        }
        $this->user->destroy($id);
        return true;
    }

    public function trash()
    {
        try {
            $query = $this->user->newQuery();
            if(request()->has('phone')){
                $query->where('phone', 'like', request()->get('phone'));
            }
            if(request()->has('email')){
                $query->where('email', 'like', request()->get('email'));
            }
            return $query->onlyTrashed()->paginate(3);
        } catch(Exception $e){
            Log::error($e->getMessage());
            return false;
        }
    }

    public function restore($id): bool
    {
        try {
            $check = $this->find($id);
            if(!$check){
                return false;
            }
            $check->withTrashed()->restore();
            return true;
        } catch(Exception $e){
            Log::error($e->getMessage());
            return false;
        }
    }

    public function force($id): bool
    {
        try {
            $user = $this->find($id);
            if(!$user){
                return false;
            }
            DeleteImage($user->image);
            $user->withTrashed()->forceDelete();
            return true;
        } catch(Exception $e){
            Log::error($e->getMessage());
            return false;
        }
    }

    public function emptyTrash(): bool
    {
        try {
            $user = $this->user->where('deleted_at', '!=', null);
            foreach ($user->get() as $item) {
                DeleteImage($item->image);
                $item->forceDelete();
            }
            return true;
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return false;
        }
    }

    public function updateImage(array $request, $id){
        try {
            $user = $this->find($id);
            if(!$user){
                return false;
            }
            $image = $request->file('image');
            if($image){
                DeleteImage($user->image);
                $image_url = UploadImage($image, $this->folder);
                $user->image = $image_url;
            }
            $user->save();
            return true;
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return false;
        }
    }

    public function updateInformation(array $request, $id): bool
    {
        try {
            $user = $this->find($id);
            if(!$user){
                return false;
            }
            $arr = $request->validated();
            $user->name = $arr['name'];
            $user->email = $arr['email'];
            $user->phone = $arr['phone'];
            $user->address = $arr['address'];
            $user->save();
            return true;
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return false;
        }
    }

    public function updatePassword(array $request, $id): bool
    {
        try {
            $user = $this->find($id);
            if(!$user){
                return false;
            }
            $arr = $request->validated();
            if(!Hash::check($arr['old_password'], $user->password)){
                return false;
            }
            $user->password = Hash::make($arr['password']);
            $user->save();
            return true;
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return false;
        }
    }

    public function userBookingHistory($id){
        try {
            $user = $this->find($id);
            if(!$user){
                return false;
            }
            return $user
                    ->bookingHistory()
                    ->paginate(10);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return false;
        }
    }


}
