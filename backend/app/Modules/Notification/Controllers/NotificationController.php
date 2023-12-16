<?php

namespace App\Modules\Notification\Controllers;

use App\Http\Controllers\Controller;

use App\Models\Notification;

use Illuminate\Http\Request;

class NotificationController extends Controller
{
    protected $notification;
    public function __construct()
    {
        $this->notification = new Notification();   
    }

    public function index(Request $request)
    {
        $limit = 10 || $request->limit;
        $notification = $this->notification->limit($limit)->orderBy('id', 'desc')->get();
        $newNotification = [];
        foreach ($notification as $value) {
            $newNotification[] = [
                'message' => $value->message,
                'time' => $value->time,
            ];
        }
        // đảo ngược mảng
        $newNotification = array_reverse($newNotification);
        return response()->json($newNotification);
    }

    public function updateIsRead(Request $request)
    {
        if($request->type == 'one'){
            $notification = $this->notification->find($request->id);
            $notification->is_read = true;
            $notification->save();
            return response()->json([
                'message' => 'Read notification success'
            ]);
        }
        if($request->type == 'all'){
            $notification = $this->notification->where('is_read', false)->get();
            foreach ($notification as $value) {
                $value->is_read = true;
                $value->save();
            }
            return response()->json([
                'message' => 'Read all notification success'
            ]);
        }
    }
}