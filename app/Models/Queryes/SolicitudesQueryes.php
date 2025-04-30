<?php

namespace App\Models\Queryes;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;

class SolicitudesQueryes extends Model
{


    public function getSolicitudes()
    {
        $query = "SELECT s.solicitud_id, s.folio, s.depto_solicitado_id, s.depto_solicitante_id, s.trabajador_solicitante_id, s.desc_servicio FROM `solicitudes` as s WHERE 1;";

        $resultado = DB::select($query);

        if (count($resultado) > 0) {
            return $resultado;
        } else {
            return [];
        }
    }



}
