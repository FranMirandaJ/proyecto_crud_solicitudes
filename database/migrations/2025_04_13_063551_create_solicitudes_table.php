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
            $table->uuid('tipo_solicitud_id');
            $table->uuid('depto_solicitado_id');
            $table->uuid('depto_solicitante_id');
            $table->date('fecha_elaboracion');
            $table->string('desc_servicio', length: 250);
            $table->timestamps();

            $table->foreign('tipo_solicitud_id')->references('tipo_solicitud_id')->on('tipos__solicituds')->onDelete('cascade');
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
