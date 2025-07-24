<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Produit;
use App\Models\Ingredient;
use Illuminate\Support\Facades\DB;

class ProduitIngredientSeeder extends Seeder
{
    public function run()
    {
        $produits = Produit::all();
        $ingredientIds = Ingredient::pluck('id')->toArray();

        foreach ($produits as $produit) {
            $randomIds = collect($ingredientIds)->shuffle()->take(3);

            foreach ($randomIds as $ingredientId) {
                DB::table('produit_ingredient')->updateOrInsert([
                    'produit_id' => $produit->id,
                    'ingredient_id' => $ingredientId,
                ], [
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
