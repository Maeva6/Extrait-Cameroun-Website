<?php

namespace App\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel
{
    protected $middlewareGroups = [
        'web' => [
            \App\Http\Middleware\EncryptCookies::class,
            \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
            \Illuminate\Session\Middleware\StartSession::class,
            \Illuminate\View\Middleware\ShareErrorsFromSession::class,
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
             \App\Http\Middleware\VerifyCsrfToken::class, // ✅ Ici
            \App\Http\Middleware\EnsureUserIsAuthenticated::class,
            \Inertia\Middleware::class,
            \App\Http\Middleware\HandleInertiaRequests::class,

        ],
    ];
    protected $routeMiddleware = [
    'auth' => \App\Http\Middleware\Authenticate::class,
    'role' => \App\Http\Middleware\CheckRole::class,
    // ... les autres middlewares de route
];

}
