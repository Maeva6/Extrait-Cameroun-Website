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
       Schema::create('services', function (Blueprint $table) {
    $table->bigIncrements('id');
    $table->string('nom');
    $table->string('slug')->unique();
    $table->text('description');
    $table->decimal('prix', 10, 2);
    $table->string('image')->nullable();
    $table->foreignId('categorie_id')->constrained('categorie')->onDelete('set null');
    $table->boolean('disponible')->default(true);
    $table->timestamps();
});

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
