<?php

namespace App\Http\Controllers;
use App\Models\Accessoires;
use Inertia\Inertia;
use Illuminate\Http\Request;

class AccessoireController extends Controller
{
    public function index()
{
    $accessoires = Accessoires::where('available', true)->get();
    return Inertia::render('Accessoires', [
        'products' => $accessoires
    ]);
}
public function show($slug)
{
    $accessoires = Accessoires::where('slug', $slug)->firstOrFail();

    return Inertia::render('AccessoireDetail', [
        'accessoire' => $accessoires
    ]);
}

}
