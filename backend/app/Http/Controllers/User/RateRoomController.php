<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\RateRoom\RateStoreRequest;
use App\Models\RateRoom;
use App\Models\Room;
use Illuminate\Http\JsonResponse;

class RateRoomController extends Controller
{
    private RateRoom $rate_room;
    private Room $room;

    public function __construct()
    {
        $this->rate_room = new RateRoom();
        $this->room = new Room();
    }
    public function store(RateStoreRequest $request, $id_room): JsonResponse
    {
        $room = $this->room->find($id_room);
        if(!$room){
            return response()->json([
                'message' => 'Room not found'
            ], 404);
        }
        $input  = $request->validated();
        $images = $request->file('images');
        if($images){
            $uploadedFileUrl = $this->UploadMultiImage($images,'rate_room/'.$id_room.'/');
            $input['images'] = json_encode($uploadedFileUrl);
        }
        $rate = $this->rate_room->create($request->validated());
        $this->rate_room->create($input);
        return response()->json([
            'message' => 'Rate room successfully',
            'data'    => $rate
        ], 201);
    }
}
