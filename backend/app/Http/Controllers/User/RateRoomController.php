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

    }
}
