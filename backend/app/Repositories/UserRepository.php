<?php

namespace app\Repositories;

use App\Models\Billing;
use App\Models\Booking;
use App\Models\User;
use App\Modules\Orders\Resources\BillingResource;
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

    public function index($request): LengthAwarePaginator|bool
    {
        try {
            $query = $this->user->newQuery();
            if ($request->has('phone')) {
                if($request->input('phone') != ''){
                    $searchTerm = $request->input('phone');
                    $query->where('phone', 'LIKE', '%' . $searchTerm . '%');
                }
                else {
                    return false;
                }
            }
            if ($request->has('email')) {
                if($request->input('email') != ''){
                    $searchTerm = $request->input('email');
                    $query->where('email', 'LIKE', '%' . $searchTerm . '%');
                }
                else {
                    return false;
                }
            }
            return $query->paginate(10);
        } catch(Exception $e){
            Log::error($e->getMessage());
            return false;
        }
    }

    public function newUsers($attributes)
    {
        try {
            return $this->user->create($attributes);
        } catch(Exception $e){
            Log::error($e->getMessage());
            return false;
        }
    }

    public function create($request)
    {
        try {
            $attributes = $request->all();
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

    public function update($request, $id)
    {
        try {
            $user = $this->find($id);
            if(!$user){
                return false;
            }
            $arr = $request->all();
            $image = $request->file('image');
            if($image){
                DeleteImage($user->image);
                $image_url = UploadImage($image, $this->folder);
                $arr['image'] = $image_url;
            }
            $arr['status'] = (integer)$request->status;
            $user->update($arr);
            return $user;
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

    public function trash($request)
    {
        try {
            $query = $this->user->newQuery();
            if ($request->has('phone')) {
                if($request->input('phone') != ''){
                    $searchTerm = $request->input('phone');
                    $query->where('phone', 'LIKE', '%' . $searchTerm . '%');
                }
                else {
                    return false;
                }
            }
            if ($request->has('email')) {
                if($request->input('email') != ''){
                    $searchTerm = $request->input('email');
                    $query->where('email', 'LIKE', '%' . $searchTerm . '%');
                }
                else {
                    return false;
                }
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

    public function updateAvatar($request, $id): bool
    {
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

    public function updateProfile($request, $id): bool
    {
        try {
            $user = $this->find($id);
            if(!$user){
                return false;
            }
            $arr = $request->all();
            $user->name = $arr['name'];
            $user->phone = $arr['phone'];
            $user->save();
            return true;
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return false;
        }
    }

    public function updatePassword($request, $id): bool
    {
        try {
            $user = $this->find($id);
            if(!$user){
                return false;
            }
            if(!Hash::check($request->old_password, $user->password)){
                return false;
            }
            $user->password = Hash::make($request->new_password);
            $user->save();
            return true;
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return false;
        }
    }
    public function bookingHistory($request){
        try {
            return BillingResource::collection(Billing::where('user_id' , $request->user()->id)->get());
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return false;
        }
    }
}
