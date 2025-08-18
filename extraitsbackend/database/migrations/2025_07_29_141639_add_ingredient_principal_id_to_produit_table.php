<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('produit', function (Blueprint $table) {
            $table->foreignId('ingredient_principal_id')
                ->nullable()
                ->constrained('ingredients')
                ->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::table('produit', function (Blueprint $table) {
            $table->dropForeign(['ingredient_principal_id']);
            $table->dropColumn('ingredient_principal_id');
        });
    }
};
