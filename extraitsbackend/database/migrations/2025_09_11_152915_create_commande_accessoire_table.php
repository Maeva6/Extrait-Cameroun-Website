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
        Schema::create('commande_accessoire', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('commande_id');
            $table->unsignedBigInteger('accessoire_id');
            $table->integer('quantite')->default(1);
            $table->timestamps();

            // 🔧 Clé étrangère vers commandes.idCommande
            $table->foreign('commande_id')
                  ->references('idCommande')
                  ->on('commandes')
                  ->onDelete('cascade');

            // 🔧 Clé étrangère vers accessoires.id
            $table->foreign('accessoire_id')
                  ->references('id')
                  ->on('accessoires')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('commande_accessoire');
    }
};
