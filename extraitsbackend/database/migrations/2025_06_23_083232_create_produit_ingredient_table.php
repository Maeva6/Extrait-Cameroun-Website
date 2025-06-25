<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProduitIngredientTable extends Migration
{
    public function up()
    {
        Schema::create('produit_ingredient', function (Blueprint $table) {
            $table->id();
            $table->foreignId('produit_id')->constrained('produit')->onDelete('cascade');
            $table->foreignId('ingredient_id')->constrained('ingredients')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('produit_ingredient');
 }
}