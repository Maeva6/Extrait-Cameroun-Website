<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        // dd('Dashboard admin atteint ✅');
        $user = auth()->user();

        // Filtrage du rôle
        // if (!in_array($user->role, ['superadmin', 'employe'])) {
        //     return redirect('/')->with('warning', 'Accès refusé');
        // }
        if (!in_array($user->role, ['superadmin', 'employe'])) {
    return redirect()->route('dashboard')->with('warning', 'Accès refusé');
}


        return Inertia::render('Admin/Dashboard', [
            'user' => $user
        ]);
    }
}
