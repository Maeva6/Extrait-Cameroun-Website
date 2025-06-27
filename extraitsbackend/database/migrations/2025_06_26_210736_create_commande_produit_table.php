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
    $table->foreignId('idCommande')->constrained('commandes')->onDelete('cascade');
    $table->foreignId('produit_id')->constrained('produit')->onDelete('cascade');
    $table->integer('quantite');
    $table->timestamps();

     $table->foreign('idCommande')->references('idCommande')->on('commandes')->onDelete('cascade');
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
