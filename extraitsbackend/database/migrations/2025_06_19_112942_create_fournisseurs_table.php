<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('fournisseurs', function (Blueprint $table) {
            $table->id();
            $table->string('nom_fournisseur');
            $table->string('contact_tel')->nullable();
            $table->string('adresse_mail')->nullable();
            $table->text('adresse_boutique')->nullable();
            $table->enum('categorie_produit', [
                'Alimentaire',
                'Boissons',
                'Épicerie',
                'Produits frais',
                'Matériel',
                'Équipement',
                'Services',
                'Autres'
            ])->nullable();
            $table->string('site_web')->nullable();
            $table->tinyInteger('note')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('fournisseurs');
    }
};