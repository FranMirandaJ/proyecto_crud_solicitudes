<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Solicitudes extends Model
{
    protected $fillable = [
        'depto_solicitado_id',
        'depto_solicitante_id',
        'fecha_elaboracion',
        'desc_servicio',
        'trabajador_solicitante_id'
    ];
    
}
