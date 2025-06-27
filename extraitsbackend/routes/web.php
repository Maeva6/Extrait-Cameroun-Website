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
use App\Models\Produit;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProduitController;
use App\Http\Controllers\AdminController;
// use App\Http\Controllers\UserController;


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
Route::get('/famille/parfums-dambiance', fn () => Inertia::render('HomeFragrance'))->name('senteurs');
Route::get('/famille/parfums-de-corps', fn () => Inertia::render('BodyPerfume'))->name('senteurs');
Route::get('/famille/cosmetiques', fn () => Inertia::render('Cosmetiques'))->name('senteurs');
Route::get('/notre-histoire', fn () => Inertia::render('About'))->name('about');
Route::get('/contact', fn () => Inertia::render('Contact'))->name('contact');
Route::get('/famille/accessoires', fn () => Inertia::render('Accessories'))->name('accessoires');
// Route::get('/product/{slug}', function ($slug) {
//     return Inertia::render('ProductPage', [
//         'slug' => $slug
//     ]);
// });
Route::get('/famille/parfums-de-corps', [ProduitController::class, 'parfumsDeCorps']);
Route::get('/body-perfume', [ProductController::class, 'bodyPerfume'])->name('body.perfume');
// Route::get('/product/{id}', [ProduitController::class, 'show']);
Route::get('/product/{id}', [ProductController::class, 'show'])->name('product.show');



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

// Route::middleware('api')->group(function () {
//     Route::post('/ingredients', [IngredientController::class, 'store']);
// });
// Route::post('/ingredients', [IngredientController::class, 'store']);
 Route::get('/pages/pagesLab/ingredientLab', fn () => Inertia::render('ingredientLab'))->name('quiz');

Route::middleware('auth')->group(function () {
    Route::post('/ingredients', [IngredientController::class, 'store']);
});
//Recuperer les elements de la table ingredients a fin de les afficher
Route::get('/quiz/ingredients-data', [IngredientController::class, 'index']);
Route::put('/ingredients/{id}/reapprovisionner', [IngredientController::class, 'reapprovisionner']);
Route::get('/ingredients/{id}', [IngredientController::class, 'show']);

// Route::middleware(['auth', 'role:superadmin'])->group(function () {
//     Route::get('/admin/creer-employe', [UserController::class, 'createEmploye']);
// });

// Route::middleware(['auth', 'role:superadmin,administrateur,employé'])->group(function () {
//     Route::get('/admin', fn () => view('admin.dashboard'));
// });

// Route::middleware(['auth', 'role:employe'])->group(function () {
//     Route::get('/employe', fn () => view('employe.dashboard'));
// });
// Route::middleware(['auth', 'role:superadmin,employé'])->get('/superadmin/dashboard', fn () => Inertia::render('Admin/Dashboard'));
// Route::middleware(['auth', 'role:superadmin,employé'])->get('/superadmin/dashboard', function () {
//     return Inertia::render('Admin/Dashboard');
// })->name('admin.dashboard');
// Route::middleware(['auth'])->get('/superadmin/dashboard', [AdminController::class, 'dashboard']);
// Route::middleware(['auth', 'verified'])->prefix('admin')->group(function () {
    // Route::get('/superadmin/dashboard', fn() => Inertia::render('Admin/Dashboard'))->name('admin.dashboard');
    // Route::get('/produits', fn() => Inertia::render('Admin/ProduitAdmin'))->name('admin.produits');
    // Ajoute ici toutes les autres routes
// });
// Avant (à corriger)
// Route::get('/dashboard-admin', fn () => Inertia::render('Admin/Dashboard'))
//      ->middleware(['auth', 'role:superadmin']);

// Après (filtrage dans le contrôleur)
Route::get('/dashboard-admin', [AdminController::class, 'index'])
     ->middleware(['auth'])->name('admin.dashboard');

require __DIR__.'/auth.php';
