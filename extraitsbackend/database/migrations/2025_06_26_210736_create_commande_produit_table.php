<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
       Schema::create('commande_produit', function (Blueprint $table) {
    $table->id();
    
    // On crée manuellement les colonnes avec noms personnalisés
    $table->unsignedBigInteger('commande_id');
    $table->unsignedBigInteger('produit_id');
    
    $table->integer('quantite');
    $table->timestamps();

    // Clés étrangères explicites
    $table->foreign('commande_id')->references('idCommande')->on('commandes')->onDelete('cascade');
    $table->foreign('produit_id')->references('id')->on('produit')->onDelete('cascade');
});


    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('commande_produit');
    }
};
