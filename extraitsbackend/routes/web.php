<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\CommandeController;
use App\Http\Controllers\IngredientController;
use App\Http\Controllers\RecommendationController;

// 🌐 Pages publiques
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// 🎯 Route QUIZ publique
Route::get('/quiz/resultat', [RecommendationController::class, 'result']);
Route::get('/quiz/fragrance-result', fn () => Inertia::render('FragranceQuizStep3'));
Route::get('/quiz/ingredients', fn () => Inertia::render('FragranceQuizStep2'));
Route::get('/quiz/senteurs', fn () => Inertia::render('FragranceQuizStepSenteurs'))->name('quiz.senteurs');

// ✅ Routes ouvertes aux invités
Route::middleware(['guest'])->group(function () {
    Route::get('/register', [RegisteredUserController::class, 'create'])->name('register');
    Route::post('/register', [RegisteredUserController::class, 'store']);
});

// 🔒 Routes nécessitant une authentification
Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', fn () => Inertia::render('Dashboard'))->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/find-my-fragrance', fn () => Inertia::render('FragranceQuizStep1'))->name('quiz');
    Route::get('/fragrance-step2-homme', fn () => Inertia::render('FragranceQuizStep2Homme'))->name('quiz');

    Route::inertia('/utilisateur', 'User/UserDashboard')->name('user.dashboard');
    Route::inertia('/mes-favoris', 'FavoritesPage')->name('favorites');

    Route::get('/checkout', fn () => Inertia::render('Checkout'))->name('checkout');
    Route::post('/orders', [CommandeController::class, 'store'])->name('orders.store');
    Route::get('/mes-commandes', [CommandeController::class, 'index'])->name('orders.index');

    Route::get('/quiz/ingredients-data', [IngredientController::class, 'list'])->name('quiz.ingredients.data');

    Route::post('/logout', [\App\Http\Controllers\Auth\AuthenticatedSessionController::class, 'destroy'])->name('logout');
});

require __DIR__.'/auth.php';
