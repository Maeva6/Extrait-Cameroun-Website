<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('productions', function (Blueprint $table) {
            $table->id();
            
            $table->foreignId('formule_id')
                  ->constrained('formules')
                  ->onDelete('restrict')
                  ->onUpdate('cascade');
                  
            $table->foreignId('produit_id')
                  ->constrained('produit')
                  ->onDelete('restrict')
                  ->onUpdate('cascade');
            
            $table->integer('quantite_produite')->unsigned();
            $table->timestamps();
            
            $table->index(['formule_id', 'produit_id']);
        });
        
        Schema::create('production_ingredient', function (Blueprint $table) {
            $table->id();
            
            $table->foreignId('production_id')
                  ->constrained('productions')
                  ->onDelete('cascade');
                  
            $table->foreignId('ingredient_id')
                  ->constrained('ingredients')
                  ->onDelete('restrict');
                  
            $table->decimal('quantite_utilisee', 10, 3)->unsigned();
            $table->string('unite', 20);
            
            $table->timestamps();
            
            $table->index(['production_id', 'ingredient_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('production_ingredient');
        Schema::dropIfExists('productions');
    }
};