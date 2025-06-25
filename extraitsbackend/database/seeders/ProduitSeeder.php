<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ProduitSeeder extends Seeder
{
    public function run(): void
    {
        

        DB::table('produit')->insert([
            [
                
                'categorie_id' => 1,
                'nomProduit' => 'Eau de Parfum Élégance',
                'sexeCible' => 'Femme',
                'familleOlfactive' => 'Floral',
                'quantiteProduit' => 25,
                'quantiteAlerte' => 5,
                'contenanceProduit' => '100ml',
                'senteur' => 'Rose',
                'prixProduit' => 79.99,
                'descriptionProduit' => 'Un parfum délicat aux notes florales intemporelles...',
                'modeUtilisation' => 'Pulvériser sur les points de pulsation.',
                'particularite' => 'Édition limitée printemps',
                'personnalite' => 'Romantique',
                'imagePrincipale' => 'elegance.jpg',
                'estDisponible' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
               
                'categorie_id' => 2,
                'nomProduit' => 'Encens Mystique',
                'sexeCible' => 'Unisexe',
                'familleOlfactive' => 'Boisé',
                'quantiteProduit' => 40,
                'quantiteAlerte' => 10,
                'contenanceProduit' => '20 bâtonnets',
                'senteur' => 'Santal',
                'prixProduit' => 24.50,
                'descriptionProduit' => 'Encens pur aux notes boisées et épicées.',
                'modeUtilisation' => 'Brûler dans un support adapté.',
                'particularite' => 'Fabriqué à la main',
                'personnalite' => 'Méditatif',
                'imagePrincipale' => 'mystique.jpg',
                'estDisponible' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                
                'categorie_id' => 3,
                'nomProduit' => 'Brume Fraîcheur Matinale',
                'sexeCible' => 'Homme',
                'familleOlfactive' => 'Frais',
                'quantiteProduit' => 32,
                'quantiteAlerte' => 8,
                'contenanceProduit' => '150ml',
                'senteur' => 'Citron',
                'prixProduit' => 29.99,
                'descriptionProduit' => 'Brume revitalisante pour le corps.',
                'modeUtilisation' => 'Vaporiser sur le corps après la douche.',
                'particularite' => 'Formule sans alcool',
                'personnalite' => 'Énergique',
                'imagePrincipale' => 'fraicheur.jpg',
                'estDisponible' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                
                'categorie_id' => 4,
                'nomProduit' => 'Diffuseur Zen',
                'sexeCible' => 'Unisexe',
                'familleOlfactive' => 'Oriental',
                'quantiteProduit' => 18,
                'quantiteAlerte' => 5,
                'contenanceProduit' => '200ml',
                'senteur' => 'Vanille',
                'prixProduit' => 45.00,
                'descriptionProduit' => 'Diffuseur à roseaux parfumé longue durée.',
                'modeUtilisation' => 'Retourner les roseaux régulièrement.',
                'particularite' => 'Durée 3 mois',
                'personnalite' => 'Apaisant',
                'imagePrincipale' => 'zen.jpg',
                'estDisponible' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                
                'categorie_id' => 5,
                'nomProduit' => 'Bougie Parfumée Nocturne',
                'sexeCible' => 'Femme',
                'familleOlfactive' => 'Chypré',
                'quantiteProduit' => 12,
                'quantiteAlerte' => 3,
                'contenanceProduit' => '300g',
                'senteur' => 'Musc',
                'prixProduit' => 39.99,
                'descriptionProduit' => 'Bougie à la cire de soja aux notes envoûtantes.',
                'modeUtilisation' => 'Laisser brûler 2-3 heures maximum.',
                'particularite' => 'Verre recyclé',
                'personnalite' => 'Sensuelle',
                'imagePrincipale' => 'nocturne.jpg',
                'estDisponible' => false,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}
