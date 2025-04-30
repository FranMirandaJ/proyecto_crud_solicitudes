<?php

namespace App\Models\Queryes;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;

class SolicitudesQueryes extends Model
{

    
    public function getSolicitudes()
    {


        $query = "SELECT s.`solicitud_id`, s.`folio` FROM `solicitudes` as s;";

        $resultado = DB::select($query);

        if (count($resultado) > 0) {
            return $resultado;
        } else {
            return [];
        }

    }
}
