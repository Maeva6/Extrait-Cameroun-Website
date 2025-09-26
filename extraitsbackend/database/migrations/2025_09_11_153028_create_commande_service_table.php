<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('commande_service', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('commande_id');
            $table->unsignedBigInteger('service_id');
            $table->integer('quantite')->default(1);
            $table->timestamps();

            // 🔧 Clé étrangère vers commandes.idCommande
            $table->foreign('commande_id')
                  ->references('idCommande')
                  ->on('commandes')
                  ->onDelete('cascade');

            // 🔧 Clé étrangère vers services.id
            $table->foreign('service_id')
                  ->references('id')
                  ->on('services')
                  ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('commande_service');
    }
};
