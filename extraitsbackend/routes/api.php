<?php
// routes/api.php

use App\Http\Controllers\ProduitController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\IngredientController;
use App\Http\Controllers\FournisseurController;
use App\Http\Controllers\FormuleController;
use App\Http\Controllers\ReapprovisionnementController;
use App\Http\Controllers\ProductionController;


//Pour mes cas de test pour les acces utilisateurs
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\UserController;


Route::middleware('api')->group(function () {
    Route::prefix('produits')->group(function () {
        Route::get('/', [ProduitController::class, 'index']);
        Route::get('/{id}', [ProduitController::class, 'show']);
        Route::post('/', [ProduitController::class, 'store'])->name('produits.store');
        Route::put('/{id}', [ProduitController::class, 'update']);
        Route::delete('/{id}', [ProduitController::class, 'destroy']);
        Route::get('/search', [ProduitController::class, 'search']);
    });

    Route::get('/categories', [CategorieController::class, 'index']);
    Route::post('/categories', [CategorieController::class, 'store']);

    //Api pour ingredient
    Route::post('/ingredients', [IngredientController::class, 'store']);
});


Route::middleware('api')->group(function () {
    Route::post('/ingredients', [IngredientController::class, 'store']);
});
//Recuperer les elements de la table ingredients a fin de les afficher
Route::get('/ingredients', [IngredientController::class, 'index']);
Route::put('/ingredients/{id}/reapprovisionner', [IngredientController::class, 'reapprovisionner']);
Route::get('/ingredients/{id}', [IngredientController::class, 'show']);

//Faire l'ajout de fournisseurs dans la base de donnees
Route::post('/fournisseurs', [FournisseurController::class, 'store']);
// routes/api.php
Route::get('/fournisseurs', [FournisseurController::class, 'index']);
Route::delete('/fournisseurs/{id}', [FournisseurController::class, 'destroy']);
Route::get('/fournisseurs/{id}', [FournisseurController::class, 'show']);


//API pour stocker les differents elements de la formule dans sa base de donnees
Route::post('/formules', [FormuleController::class, 'store']);
Route::get('/formules', [FormuleController::class, 'index']);
Route::get('/formules/{id}', [FormuleController::class, 'show']);

//API pour recuperer les donnees de la table de reapprovisionnement et les afficher dans l'historique de reapprovisionnement
Route::get('/reapprovisionnements', [ReapprovisionnementController::class, 'index']);
Route::get('/reapprovisionnements/{id}', [ReapprovisionnementController::class, 'show']);



Route::get('/test', function () {
    return response()->json(['message' => 'Test successful']);
});

Route::get('/formules/{formule}/ingredients', [FormuleController::class, 'getIngredients']);

//Pour envoyer les elements de la production dans la base de donnees
Route::apiResource('productions', ProductionController::class)->only(['index', 'store']);

Route::get('/productions', [ProductionController::class, 'index']);
Route::post('/productions', [ProductionController::class, 'store']);
Route::get('/productions/{id}', [ProductionController::class, 'show']);
Route::delete('/productions/{id}', [ProductionController::class, 'destroy']);

//API SIMPLE AUTHENTIFICATION
// routes/api.php
// Route::post('/simple-login', function (Request $request) {
//     $request->validate([
//         'username' => 'required|string',
//         'password' => 'required|string'
//     ]);

//     try {
//         $user = DB::table('simple_auth')
//                  ->where('username', $request->username)
//                  ->first();

//         if (!$user) {
//             return response()->json([
//                 'success' => false,
//                 'message' => 'Utilisateur non trouvé'
//             ], 404);
//         }

//         if (Hash::check($request->password, $user->password)) {
//             return response()->json([
//                 'success' => true,
//                 'message' => 'Connexion réussie'
//             ]);
//         }

//         return response()->json([
//             'success' => false,
//             'message' => 'Mot de passe incorrect'
//         ], 401);

//     } catch (\Exception $e) {
//         return response()->json([
//             'success' => false,
//             'message' => 'Erreur serveur',
//             'error' => $e->getMessage()
//         ], 500);
//     }
// });

//API pour recevoir les utilisateurs de la table utilisateur
Route::get('/users', [UserController::class, 'index']);


