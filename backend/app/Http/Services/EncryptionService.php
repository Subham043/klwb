<?php

namespace App\Http\Services;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Contracts\Encryption\DecryptException;

class EncryptionService
{
    public function encrypt($value)
    {
        return Crypt::encryptString($value);
    }

    public function decrypt($value)
    {
        try {
            //code...
            return Crypt::decryptString($value);
        } catch (DecryptException $e) {
            //throw $th;
            return null;
        }
    }
}