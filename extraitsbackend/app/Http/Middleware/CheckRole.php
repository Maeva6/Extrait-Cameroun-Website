<?php

namespace App\Http\Middleware;

// use Closure;
// use Illuminate\Http\Request;
// use Symfony\Component\HttpFoundation\Response;

// class CheckRole
// {
//     /**
//      * Handle an incoming request.
//      *
//      * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
//      */
//     public function handle($request, Closure $next, ...$roles)
// {
//     if (!auth()->check() || !in_array(auth()->user()->role, $roles)) {
//         return redirect()->route('register')->with('warning', 'Accès réservé');
//     }

//     return $next($request);
// }

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        if (!auth()->check() || !in_array(auth()->user()->role, $roles)) {
            return redirect()->route('register')->with('warning', 'Accès réservé');
        }

        return $next($request);
    }
}



