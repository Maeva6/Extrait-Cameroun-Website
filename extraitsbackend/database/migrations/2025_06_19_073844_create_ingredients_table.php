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
            Schema::create('ingredients', function (Blueprint $table) {
            $table->id();
            $table->string('nomIngredient');
            $table->text('description')->nullable();
            $table->string('fournisseur')->nullable();
            $table->integer('stockActuel');
            $table->decimal('prix', 8, 2);
            $table->integer('seuilAlerte');
            $table->string('categorie');
            $table->string('photo')->nullable();
            $table->enum('etat_physique', ['liquide', 'solide', 'gazeux']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ingredients');
    }
};
