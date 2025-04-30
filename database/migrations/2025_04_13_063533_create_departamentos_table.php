<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration 
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('departamentos', function (Blueprint $table) {
            $table->uuid('depto_id')->primary()->default(DB::raw('UUID()'));
            $table->string('nombre_depto', length: 100)->unique();
            $table->uuid('jefe_depto_id');
            $table->timestamps();

            $table->foreign('jefe_depto_id')->references('trabajador_id')->on('trabajadores')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('departamentos');
    }
};
