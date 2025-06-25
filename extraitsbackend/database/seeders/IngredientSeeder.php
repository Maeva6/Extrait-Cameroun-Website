<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class IngredientSeeder extends Seeder
{
    public function run(): void
    {
        //DB::table('ingredient_produit')->truncate();
        //DB::table('produits')->truncate(); // Nettoie la table avant l'insertion
        DB::table('ingredients')->insert([
            [
                'nomIngredient' => 'Vanille Bourbon',
                'photo' => 'https://i.imgur.com/mpiJ8gA.jpeg',
                'etat_physique' => 'liquide',
                'categorie' => 'Gourmand',
                'stockActuel' => 0,
                'prix' => 500,
                'seuilAlerte' => 50,
            ],
            [
                'nomIngredient' => 'Bois de Santal',
                'photo' => 'https://i.imgur.com/tAa2ROi.jpeg',
                'etat_physique' => 'solide',
                'categorie' => 'Boisé',
                'stockActuel' => 0,
                'prix' => 500,
                'seuilAlerte' => 50,
            ],
            [
                'nomIngredient' => 'Fleur d’oranger',
                'photo' => 'https://i.imgur.com/YW02gKN.jpeg',
                'etat_physique' => 'liquide',
                'categorie' => 'Floral',
                'stockActuel' => 0,
                'prix' => 500,
                'seuilAlerte' => 50,
            ],
            [
                'nomIngredient' => 'Ambre gris',
                'photo' => 'https://i.imgur.com/PpJHzTY.jpeg',
                'etat_physique' => 'solide',
                'categorie' => 'Oriental',
                'stockActuel' => 0,
                'prix' => 500,
                'seuilAlerte' => 50,
            ],
            [
                'nomIngredient' => 'Lavande',
                'photo' => 'https://i.imgur.com/xnR3iuP.jpeg',
                'etat_physique' => 'solide',
                'categorie' => 'Aromatique',
                'stockActuel' => 0,
                'prix' => 500,
                'seuilAlerte' => 50,
            ],
            [
                'nomIngredient' => 'Thé vert',
                'photo' => 'https://i.imgur.com/v7Das6x.jpeg',
                'etat_physique' => 'solide',
                'categorie' => 'Végétal',
                'stockActuel' => 0,
                'prix' => 500,
                'seuilAlerte' => 50,
            ],
            [
                'nomIngredient' => "Cires d'abeilles",
                'photo' => 'https://i.imgur.com/mIC9CDR.jpeg',
                'etat_physique' => 'liquide',
                'categorie' => 'animal',
                'stockActuel' => 0,
                'prix' => 500,
                'seuilAlerte' => 50,
            ],
            [
                'nomIngredient' => 'Agrumes',
                'photo' => 'https://i.imgur.com/xU8K0hH.jpeg',
                'etat_physique' => 'liquide',
                'categorie' => 'Hespéridé',
                'stockActuel' => 0,
                'prix' => 500,
                'seuilAlerte' => 50,
            ],
            [
                'nomIngredient' => 'Patchouli',
                'photo' => 'https://i.imgur.com/qtbI3PI.jpeg',
                'etat_physique' => 'solide',
                'categorie' => 'Terreux',
                'stockActuel' => 0,
                'prix' => 500,
                'seuilAlerte' => 50,
            ],
            [
                'nomIngredient' => 'Cire de soja',
                'photo' => 'https://i.imgur.com/PK1tBj3.jpeg',
                'etat_physique' => 'solide',
                'categorie' => 'végétal',
                'stockActuel' => 0,
                'prix' => 500,
                'seuilAlerte' => 50,
            ],
        ]);
    }
}
