<?php

namespace App\Http\Services;

class SmsService
{

    public function sendOtp(string $phone, string $otp)
    {
        $sender = config('services.sms.sender');
        $token = config('services.sms.token');
        $url = config('services.sms.url');
        $msg = 'Your one time password for Karnataka labour welfare board scholarship registration is '. $otp .'.Do not share with anyone. KLWBAP';
        $param = 'message=' . $msg . '&sender='.$sender.'&to=91'.$phone.'&service=T&access_token='.$token;
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $param);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_exec($ch);
        curl_close($ch);
    }

}