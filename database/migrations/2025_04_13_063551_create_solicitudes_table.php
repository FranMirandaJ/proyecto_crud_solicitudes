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
        Schema::create('solicitudes', function (Blueprint $table) {
            $table->uuid('solicitud_id')->primary()->default(DB::raw('UUID()'));
            $table->string('folio')->nullable();
            $table->uuid('depto_solicitado_id');
            $table->uuid('depto_solicitante_id');

            $table->string('desc_servicio', length: 500);
            $table->boolean('esta_enviada')->default(false);
            $table->timestamps();

            $table->foreign('depto_solicitado_id')->references('depto_id')->on('departamentos')->onDelete('cascade');
            $table->foreign('depto_solicitante_id')->references('depto_id')->on('departamentos')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('solicitudes');
    }
};
