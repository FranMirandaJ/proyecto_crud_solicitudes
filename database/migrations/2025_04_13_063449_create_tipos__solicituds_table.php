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
        Schema::create('tipos_solicitud', function (Blueprint $table) {
            $table->uuid('tipo_solicitud_id')->primary()->default(DB::raw('UUID()'));
            $table->string('nombre_tipo_solicitud', length: 100)->unique();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tipos__solicituds');
    }
};
