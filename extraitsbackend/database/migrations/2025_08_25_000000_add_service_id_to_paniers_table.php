<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddServiceIdToPaniersTable extends Migration
{
    public function up()
    {
        Schema::table('paniers', function (Blueprint $table) {
            $table->unsignedBigInteger('service_id')->nullable()->after('accessoire_id');
            $table->foreign('service_id')->references('id')->on('services')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::table('paniers', function (Blueprint $table) {
            $table->dropForeign(['service_id']);
            $table->dropColumn('service_id');
        });
    }
}
