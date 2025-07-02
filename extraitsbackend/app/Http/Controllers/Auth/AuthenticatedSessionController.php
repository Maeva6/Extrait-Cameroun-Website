<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Log;


class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    // public function create(): Response
    // {
    //     return Inertia::render('Auth/Login', [
    //         'canResetPassword' => Route::has('password.request'),
    //         'status' => session('status'),
    //     ]);
    // }
    public function create(): Response|RedirectResponse
{
    if (Auth::check()) {
        $user = Auth::user();

        if (in_array($user->role, ['superadmin', 'employe'])) {
            return redirect('/dashboard-admin');
        }

        return redirect('/dashboard');
    }

    return Inertia::render('Auth/Login', [
        'canResetPassword' => Route::has('password.request'),
        'status' => session('status'),
    ]);
}

    /**
     * Handle an incoming authentication request.
     */
    // public function store(LoginRequest $request): RedirectResponse
    // {
    //     $request->authenticate();

    //     $request->session()->regenerate();

    //     //return redirect()->intended(route('dashboard', absolute: false));
    //      $user = Auth::user();
    //     return redirect()->route('dashboard'); // client ou visiteur
    
    // }
    public function store(LoginRequest $request): RedirectResponse
{
    $request->authenticate();

    $request->session()->regenerate();

    $user = Auth::user();
    
    Log::info('Role utilisateur connecté : ' . $user->role); // ✅

    if (in_array($user->role, ['superadmin', 'employe'])) {
        return redirect('/dashboard-admin');
; // Vers /dashboard-admin
    }

    return redirect()->route('/dashboard'); // Pour les clients
    //  return redirect()->intended('/dashboard');

}



    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}



// namespace App\Http\Controllers\Auth;

// use App\Http\Controllers\Controller;
// use App\Http\Requests\Auth\LoginRequest;
// use Illuminate\Http\RedirectResponse;
// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Auth;
// use Illuminate\Support\Facades\Route;
// use Inertia\Inertia;
// use Inertia\Response;
// use Illuminate\Support\Facades\Log;

// class AuthenticatedSessionController extends Controller
// {
//     public function create(): Response|RedirectResponse
//     {
//         if (Auth::check()) {
//             $user = Auth::user();

//             return match ($user->role) {
//                 'superadmin', 'employe', 'administrateur' => redirect('/dashboard-admin'),
//                 default => redirect('/dashboard'),
//             };
//         }

//         return Inertia::render('Auth/Login', [
//             'canResetPassword' => Route::has('password.request'),
//             'status' => session('status'),
//         ]);
//     }

//     public function store(LoginRequest $request): RedirectResponse
//     {
//         $request->authenticate();
//         $request->session()->regenerate();

//         $user = Auth::user();

//         Log::info('Role utilisateur connecté : ' . $user->role);

//         return match ($user->role) {
//             'superadmin', 'employe', 'administrateur' => redirect('/dashboard-admin'),
//             default => redirect('/dashboard'),
//         };
//     }

//     public function destroy(Request $request): RedirectResponse
//     {
//         Auth::guard('web')->logout();

//         $request->session()->invalidate();
//         $request->session()->regenerateToken();

//         return redirect('/');
//     }
// }
