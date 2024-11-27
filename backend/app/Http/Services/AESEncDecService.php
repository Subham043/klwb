<?php

namespace App\Http\Services;

class AESEncDecService
{

    public function encrypt($data,  $key)
    {
        $algo = 'aes-128-cbc';

        $iv = substr($key, 0, 16);
        $cipherText = openssl_encrypt(
            $data,
            $algo,
            $key,
            OPENSSL_RAW_DATA,
            $iv
        );
        $cipherText = base64_encode($cipherText);

        return $cipherText;
    }


    public function decrypt($cipherText,  $key)
    {
        $algo = 'aes-128-cbc';

        $iv = substr($key, 0, 16);
        $cipherText = base64_decode($cipherText);

        $plaintext = openssl_decrypt(
            $cipherText,
            $algo,
            $key,
            OPENSSL_RAW_DATA,
            $iv
        );
        return $plaintext;
    }
}
