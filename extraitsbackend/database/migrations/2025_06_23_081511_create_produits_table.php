<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up()
    {
        Schema::create('produit', function (Blueprint $table) {
            $table->id();
            
            // Clé étrangère
            $table->foreignId('categorie_id')
                  ->constrained('categorie')
                  ->onDelete('restrict')
                  ->onUpdate('cascade');
            
            // Champs principaux
            $table->string('nomProduit', 100);
            $table->enum('sexeCible', ['Homme', 'Femme', 'Unisexe']);
            $table->string('familleOlfactive', 50);
            
            // Stocks
            $table->integer('quantiteProduit')->unsigned()->default(0);
            $table->integer('quantiteAlerte')->unsigned()->default(10);
            
            // Caractéristiques
            $table->string('contenanceProduit', 20);
            $table->string('senteur', 50)->nullable();
            $table->decimal('prixProduit', 10, 2)->unsigned();
            // $table->timestamp('dateAjoutProduit')->nullable();


            // Descriptions
            $table->text('descriptionProduit')->nullable();
            $table->text('modeUtilisation')->nullable();
            $table->text('particularite')->nullable();
            $table->string('personnalite', 100)->nullable();
            
            // Média
            $table->string('imagePrincipale', 255)->nullable();
            
            // Statut
            $table->boolean('estDisponible')->default(true);
            
            $table->timestamps();
        });

        // Ajout des contraintes CHECK (pour MySQL)
        if (DB::getDriverName() === 'mysql') {
            DB::statement('ALTER TABLE produit ADD CONSTRAINT chk_quantite CHECK (quantiteProduit >= 0)');
            DB::statement('ALTER TABLE produit ADD CONSTRAINT chk_prix CHECK (prixProduit > 0)');
        }

        // Index
        Schema::table('produit', function (Blueprint $table) {
            $table->index('nomProduit');
            $table->index('categorie_id');
            $table->index('sexeCible');
        });
    }

    public function down()
    {
        Schema::dropIfExists('produit');
  }
};