<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
 use App\Models\Service;
use Inertia\Inertia;


class ServiceController extends Controller
{
   
    public function index()
    {
        $services = Service::where('disponible', true)->get();

        return Inertia::render('SpecialGiftSet', [
            'services' => $services
        ]);
    }
    public function show($slug)
{
    $service = Service::where('slug', $slug)->firstOrFail();

    return Inertia::render('ServiceDetail', [
        'service' => $service
    ]);
}
}