<?php

namespace App\Http\Enums;

enum Guards:string {
    case Web = 'web';
    case Admin = 'admin';
    case Industry = 'industry';
    case Institute = 'institute';

    public function value(): string
    {
        return $this->value;
    }

    public function middleware(): string
    {
        return 'auth:'.$this->value;
    }
}
