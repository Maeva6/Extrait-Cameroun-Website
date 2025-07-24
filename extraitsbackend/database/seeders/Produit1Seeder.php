<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class Produit1Seeder extends Seeder
{
    /**
     * Run the database seeds.
     */
   public function run(): void
    {
        DB::table('produit')->insert([
            [
                'categorie_id' => 6,
                'nomProduit' => 'Nina red',
                'sexeCible' => 'Femme',
                'familleOlfactive' => 'Ambiance',
                'quantiteProduit' => 0,
                'quantiteAlerte' => 5,
                'contenanceProduit' => '120ml',
                'senteur' => 'Ambiance',
                'prixProduit' => 15000.00,
                'descriptionProduit' => 'La délicatesse des senteurs des diffuseurs d’ambiance...',
                'modeUtilisation' => 'Placer les tiges dans le liquide parfumé et laisser diffuser.',
                'particularite' => 'Les Fragrances utilisées...',
                'personnalite' => 'Fabrication Artisanale...',
                'imagePrincipale' => 'https://i.imgur.com/4riXP2u.jpeg',
                'estDisponible' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'categorie_id' => 6,
                'nomProduit' => 'Twilight',
                'sexeCible' => 'Unisexe',
                'familleOlfactive' => 'Ambiance',
                'quantiteProduit' => 10,
                'quantiteAlerte' => 5,
                'contenanceProduit' => '120ml',
                'senteur' => 'Ambiance',
                'prixProduit' => 15000.00,
                'descriptionProduit' => 'La délicatesse des senteurs des diffuseurs d’ambiance...',
                'modeUtilisation' => 'Placer les tiges dans le liquide parfumé et laisser diffuser.',
                'particularite' => 'Particularité : Les Fragrances utilisées dans nos produits...',
                'personnalite' => 'Sensuelle et mystérieuse',
                'imagePrincipale' => 'https://i.imgur.com/TbstkG0.jpeg',
                'estDisponible' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            // Ajoute d'autres produits ici si tu veux
        ]);
    }
}
