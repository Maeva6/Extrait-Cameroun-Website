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
        Schema::table('favorites', function (Blueprint $table) {
            // Rendre produit_id nullable
            $table->unsignedBigInteger('produit_id')->nullable()->change();

            // Ajouter accessoire_id
            $table->unsignedBigInteger('accessoire_id')->nullable()->after('produit_id');
            $table->foreign('accessoire_id')->references('id')->on('accessoires')->onDelete('cascade');

            // Ajouter service_id
            $table->unsignedBigInteger('service_id')->nullable()->after('accessoire_id');
            $table->foreign('service_id')->references('id')->on('services')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::table('favorites', function (Blueprint $table) {
            $table->dropForeign(['accessoire_id']);
            $table->dropColumn('accessoire_id');

            $table->dropForeign(['service_id']);
            $table->dropColumn('service_id');

            $table->unsignedBigInteger('produit_id')->nullable(false)->change(); // si tu veux le remettre non-nullable
        });
    }
};
