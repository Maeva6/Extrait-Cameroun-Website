<?php

namespace Database\Seeders;

use App\Models\Categorie;
use Illuminate\Database\Seeder;

class CategorieTableSeeder extends Seeder
{
    public function run()
    {
        $categories = [
            'Huile de parfum de créateur',
            'Cologne',
            'Brume corporelle',
            'Eau de parfum',
            'Extrait de parfum',
            'Diffuseurs à bâtonnets parfumés',
            'Huile essentielle',
            'Spray d\'ambiance / pour linge',
            'Parfum pour voiture',
            'Bougie parfumée en pot à la cire de soja',
            'Barres de cire parfumée',
            'Fondants de cire parfumée',
            'Désodorisants en perles parfumées',
            'Bougies chauffe-plat',
            'Diffuseurs d\'arôme ultrasoniques',
            'Porte-encens',
            'Brûleurs',
            'Baume à lèvres en tube',
            'Savon pour les mains',
            'Crème pour les mains',
            'Lait pour le corps',
            'Savons parfumés saponifiés à froid'
        ];

        foreach ($categories as $categorie) {
            Categorie::firstOrCreate(
                ['name' => trim($categorie)], // Évite les doublons
                [
                    'created_at' => now(),
                    'updated_at' => now()
                ]
            );
        }
    }
}