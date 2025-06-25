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
    Schema::create('commandes', function (Blueprint $table) {
        $table->id('idCommande');
        $table->foreignId('idClient')->constrained('users')->onDelete('cascade');
        $table->dateTime('dateCommande')->default(DB::raw('CURRENT_TIMESTAMP'));
        $table->enum('statutCommande', ['en_attente', 'payée', 'expédiée', 'livrée', 'annulée'])->default('en_attente');
        $table->string('modePaiement')->nullable();
        $table->decimal('montantTotal', 10, 2);
        $table->text('adresseLivraison');
        $table->text('commentaire')->nullable();
        $table->enum('origineCommande', ['en_ligne', 'boutique'])->default('en_ligne');
        $table->unsignedBigInteger('idEmploye')->nullable();
        $table->foreign('idEmploye')->references('id')->on('users')->nullOnDelete();
        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('commandes');
    }
};
