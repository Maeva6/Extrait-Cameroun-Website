<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('formules', function (Blueprint $table) {
            $table->id();
            
            // Relation avec le produit fini (1 formule = 1 produit)
            $table->foreignId('produit_id')
                  ->constrained('produit')
                  ->onDelete('restrict') // Empêche la suppression d'un produit utilisé
                  ->onUpdate('cascade');
            
            // Champs de base
            $table->string('nom_formule', 100);
            $table->text('description')->nullable();
            $table->text('instructions')->nullable();
            $table->string('createur', 100)->nullable();
            
            // Timestamps et soft deletes
            $table->timestamps();
            $table->softDeletes(); // Optionnel pour archivage
            
            // Index
            $table->index('nom_formule');
            $table->index('produit_id'); // Important pour les performances
        });
    }

    public function down()
    {
        Schema::dropIfExists('formules');
    }
};