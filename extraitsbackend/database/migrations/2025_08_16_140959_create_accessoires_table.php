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
    Schema::create('accessoires', function (Blueprint $table) {
        $table->id();
        $table->string('nomProduit');
        $table->string('slug')->unique();
        $table->string('price');
        $table->string('size')->nullable();
        $table->string('imageUrl');
        $table->string('categorie');
        $table->boolean('available')->default(true);
        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('accessoires');
    }
};
