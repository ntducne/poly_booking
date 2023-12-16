<?php

namespace App\Modules\Contact\Controllers;

use App\Events\ContactEvent;
use App\Http\Controllers\Controller;

use App\Models\Contact;
use App\Modules\Contact\Resources\ContactResource;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    protected $contact;
    public function __construct()
    {
        $this->contact = new Contact();   
    }

    public function index() {
        $contacts = $this->contact->orderBy('id', 'desc')->get();
        return ContactResource::collection($contacts);
    }

    public function store(Request $request) {
        $value = [
            'name' => $request->name,
            'email' => $request->email,
            'message' => $request->message,
            'time' => Carbon::now()->format('d/m/Y H:i:s')
        ];
        $this->contact->create($value);
        event(new ContactEvent($value));
    }
}