<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('formule_ingredient', function (Blueprint $table) {
            $table->id();
            
            // Clés étrangères
            $table->foreignId('formule_id')
                  ->constrained('formules')
                  ->onDelete('cascade'); // Supprime la ligne si la formule est supprimée
                  
            $table->foreignId('ingredient_id')
                  ->constrained('ingredients')
                  ->onDelete('restrict'); // Bloque si l'ingrédient est utilisé
                  
            // Quantité et unité
            $table->decimal('quantite', 10, 3)->unsigned(); // Précision à 3 décimales
            $table->string('unite', 10); // g, kg, L, etc.
            
            // Timestamps (pas de softDelete ici)
            $table->timestamps();
            
            // Contrainte d'unicité (évite les doublons)
            $table->unique(['formule_id', 'ingredient_id']);
            
            // Index pour performances
            $table->index('ingredient_id');
        });
    }

    public function down()
    {
        Schema::dropIfExists('formule_ingredient');
    }
};