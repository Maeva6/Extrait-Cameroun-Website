<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::where('user_id', Auth::id())->latest()->get();
        return Inertia::render('User/OrdersPage', [
            'orders' => $orders,
        ]);
    }

    public function store(Request $request)
{
    $validated = $request->validate([
        'items' => 'required|array',
        'total_price' => 'required|numeric',
        'payment_method' => 'required|string',
    ]);

    Order::create([
        'user_id' => auth()->id(),
        'items' => json_encode($validated['items']),
        'total_price' => $validated['total_price'],
        'payment_method' => $validated['payment_method'],
    ]);

    return redirect()->back(); // ou redirect()->route('orders.index');
}

}

