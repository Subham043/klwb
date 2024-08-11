<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class HttpHeaders
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        if(method_exists($response, 'header')){

            $response->headers->set('X-XSS-Protection', '1; mode=block');
            $response->headers->set('X-Content-Type-Options', 'nosniff');
            $response->headers->set('X-Frame-Options', 'SAMEORIGIN');
            $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');
            // $response->headers->set('Content-Type', 'text/html; charset=UTF-8');
            $response->headers->set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
            // $response->headers->set('Cache-Control', 'max-age=86400, must-revalidate');
            if (function_exists('header_remove')) {
                header_remove('X-Powered-By'); // PHP 5.3+
            }
            $response->headers->set('X-Powered-By', 'KLWB');
        }


        return $response;
    }
}
