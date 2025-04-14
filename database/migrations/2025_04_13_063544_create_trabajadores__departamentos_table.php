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
        Schema::create('trabajadores__departamentos', function (Blueprint $table) {
            $table->uuid('trabajador_id');
            $table->uuid('depto_id');
            $table->timestamps();

            $table->foreign('trabajador_id')->references('trabajador_id')->on('trabajadores')->onDelete('cascade');
            $table->foreign('depto_id')->references('depto_id')->on('departamentos')->onDelete('cascade');
            $table->primary(['trabajador_id', 'depto_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trabajadores__departamentos');
    }
};
