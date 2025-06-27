<?php
// Migration file: database/migrations/YYYY_MM_DD_create_reapprovisionnements_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReapprovisionnementsTable extends Migration
{
    public function up()
    {
        Schema::create('reapprovisionnements', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('ingredient_id');
            $table->integer('quantite_ajoutee');
            $table->dateTime('date_reapprovisionnement');
            $table->timestamps();

            $table->foreign('ingredient_id')->references('id')->on('ingredients')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('reapprovisionnements');
    }
}
