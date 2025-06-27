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
    Schema::table('commandes', function (Blueprint $table) {
        $table->string('nom_client')->nullable()->after('idClient');
        $table->string('prenom_client')->nullable()->after('nom_client');
        $table->string('telephone_client')->nullable()->after('prenom_client');
    });
}

public function down(): void
{
    Schema::table('commandes', function (Blueprint $table) {
        $table->dropColumn(['nom_client', 'prenom_client', 'telephone_client']);
    });
}


    /**
     * Reverse the migrations.
     */
   
};
