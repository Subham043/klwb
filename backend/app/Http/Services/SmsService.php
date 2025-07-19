<?php

namespace App\Http\Services;

class SmsService
{

    public function sendOtp(string $phone, string $otp)
    {
        // $sender = config('services.sms.sender');
        // $token = config('services.sms.token');
        // $url = config('services.sms.url');
        // $msg = 'Your one time password for Karnataka labour welfare board scholarship registration is '. $otp .'.Do not share with anyone. KLWBAP';
        // $param = 'message=' . $msg . '&sender='.$sender.'&to=91'.$phone.'&service=T&access_token='.$token;
        // $ch = curl_init($url);
        // curl_setopt($ch, CURLOPT_POST, true);
        // curl_setopt($ch, CURLOPT_POSTFIELDS, $param);
        // curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        // curl_exec($ch);
        // curl_close($ch);

        // $url = "https://sms.versatilesmshub.com/api/smsservices.php";
        $url = "https://alerts.smsbajar.com/api/smsservices.php";

        // $data = [
        //     "api" => "fb77325e6d73aeabf26ac71b328a21bc",
        //     "senderid" => "KLWBAP",
        //     "campaignid" => "2",
        //     "channel" => "Trans",
        //     "templateid" => "1707173280722532150",
        //     "dcs" => "0",
        //     "shorturl" => "NO",
        //     "data" => [
        //         [
        //             "international" => "NO",
        //             "countrycode" => "91",
        //             "number" => $phone,
        //             "message" => "Your one time password for Karnataka labour welfare board scholarship registration is ".$otp.".Do not share with anyone. KLWBAP",
        //             "url" => ""
        //         ]
        //     ]
        // ];

        $data = [
            "api" => "7b7090071c9fab3e4352e70d6026c31e",
            "senderid" => "KLWBAP",
            "campaignid" => "Test",
            "channel" => "Trans",
            "templateid" => "1707173280722532150",
            "dcs" => "0",
            "shorturl" => "NO",
            "dlr" => "NO",
            "data" => [
                [
                    "international" => "NO",
                    "countrycode" => "91",
                    "number" => $phone,
                    "message" => "Your one time password for Karnataka labour welfare board scholarship registration is ".$otp.".Do not share with anyone. KLWBAP",
                    "url" => ""
                ]
            ]
        ];

        // $payload = json_encode($data);

        $ch = curl_init($url);

        // curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        // curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        // curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
        // curl_setopt($ch, CURLOPT_HTTPHEADER, [
        //     "Content-Type: application/json"
        // ]);

        // Set cURL options
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json',
        ]);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

        
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Makes it insecure

        $response = curl_exec($ch);
        $err = curl_error($ch);

        // if (curl_errno($ch)) {
        //     echo "cURL Error: " . curl_error($ch);
        // } else {
        //     echo "Response: " . $response;
        // }

        curl_close($ch);
    }

    public function sendInstituteRejectedSms(string|null $phone, string|null $name, string $reason)
    {
        $msg = 'Dear '. ($name ?? 'Student').',
        Your Karnataka Labour Welfare Board Scholarship has been rejected from institute due to '.$reason.', More information login to your account and check the Scholarship status';
        $url = 'http://txt.bdsent.co.in/api/v2/sms/send';
        $param = 'message=' . $msg . '&sender=KLWBAP&to=91'.$phone.'&service=T&access_token=1d53d3c2e26408ccd824dd264b642239';
        
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $param);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $server_output = curl_exec($ch);
        curl_close($ch);
    }
    
    public function sendIndustryRejectedSms(string|null $phone, string|null $name, string $reason)
    {
        $msg = 'Dear '. ($name ?? 'Student').',
        Your Karnataka Labour Welfare Board Scholarship has been rejected from Industry due to '.$reason.', More information login to your account and check the Scholarship status';
        $url = 'http://txt.bdsent.co.in/api/v2/sms/send';
        $param = 'message=' . $msg . '&sender=KLWBAP&to=91'.$phone.'&service=T&access_token=1d53d3c2e26408ccd824dd264b642239';
        
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $param);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $server_output = curl_exec($ch);
        curl_close($ch);
    }
    
    public function sendGovtRejectedSms(string|null $phone, string|null $name, string $reason)
    {
        $msg = 'Dear '. ($name ?? 'Student').',
        Your Karnataka Labour Welfare Board Scholarship has been rejected from Govt Verification Officer due to '.$reason.', More information login to your account and check the Scholarship status';
        $url = 'http://txt.bdsent.co.in/api/v2/sms/send';
        $param = 'message=' . $msg . '&sender=KLWBAP&to=91'.$phone.'&service=T&access_token=1d53d3c2e26408ccd824dd264b642239';
        
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $param);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $server_output = curl_exec($ch);
        curl_close($ch);
    }
    
    public function sendAdminRejectedSms(string|null $phone, string|null $name, string $reason)
    {
        $msg = 'Dear '. ($name ?? 'Student').',
        Your Karnataka Labour Welfare Board Scholarship has been rejected from Labour Welfare Board due to '.$reason.', More information login to your account and check the Scholarship status';
        $url = 'http://txt.bdsent.co.in/api/v2/sms/send';
        $param = 'message=' . $msg . '&sender=KLWBAP&to=91'.$phone.'&service=T&access_token=1d53d3c2e26408ccd824dd264b642239';
        
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $param);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $server_output = curl_exec($ch);
        curl_close($ch);
    }
    
    public function sendFinanceRejectedSms(string|null $phone, string $reason)
    {
        $msg = 'Sorry!, Your Karnataka Labour Welfare Board Scholarship  Amount has been Failed due to '.$reason;
        $url = 'http://txt.bdsent.co.in/api/v2/sms/send';
        $param = 'message=' . $msg . '&sender=KLWBAP&to=91'.$phone.'&service=T&access_token=1d53d3c2e26408ccd824dd264b642239';
        
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $param);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $server_output = curl_exec($ch);
        curl_close($ch);
    }
    
    public function sendInstituteApprovedSms(string|null $phone)
    {
        $msg = 'Your Karnataka Labour Welfare Board Scholarship has been succesfully moved to industry for verification, we will notify the status via sms';
        $url = 'http://txt.bdsent.co.in/api/v2/sms/send';
        $param = 'message=' . $msg . '&sender=KLWBAP&to=91'.$phone.'&service=T&access_token=1d53d3c2e26408ccd824dd264b642239';
        
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $param);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $server_output = curl_exec($ch);
        curl_close($ch);
    }
    
    public function sendIndustryApprovedSms(string|null $phone)
    {
        $msg = 'Your Karnataka Labour Welfare Board Scholarship has been succesfully moved to Labour Welfare Board for verification, we will notify the status via sms';
        $url = 'http://txt.bdsent.co.in/api/v2/sms/send';
        $param = 'message=' . $msg . '&sender=KLWBAP&to=91'.$phone.'&service=T&access_token=1d53d3c2e26408ccd824dd264b642239';
        
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $param);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $server_output = curl_exec($ch);
        curl_close($ch);
    }
    
    public function sendAdminApprovedSms(string|null $phone)
    {
        $msg = 'Congratulations!, Your Scholarship  Application has been  approved by government .The Scholarship amount will be credited to your account shortly!';
        $url = 'http://txt.bdsent.co.in/api/v2/sms/send';
        $param = 'message=' . $msg . '&sender=KLWBAP&to=91'.$phone.'&service=T&access_token=1d53d3c2e26408ccd824dd264b642239';
        
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $param);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $server_output = curl_exec($ch);
        curl_close($ch);
    }
    
    public function sendFinanceApprovedSms(string|null $phone)
    {
        $msg = 'Congratulations!, Your Scholarship  Application has been  approved by government .The Scholarship amount will be credited to your account shortly!';
        $url = 'http://txt.bdsent.co.in/api/v2/sms/send';
        $param = 'message=' . $msg . '&sender=KLWBAP&to=91'.$phone.'&service=T&access_token=1d53d3c2e26408ccd824dd264b642239';
        
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $param);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $server_output = curl_exec($ch);
        curl_close($ch);
    }

}