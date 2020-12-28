<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\NotifyMail;

class MailController extends Controller
{
    public function sendEmail() {

        $to_email = [
            'email' => 'ductrung.2112xx@gmail.com',
            'name' => "Flashcard",
        ];

        Mail::to($to_email)->send(new NotifyMail);

        return "<p> Success! Your E-mail has been sent.</p>";

    }
}
