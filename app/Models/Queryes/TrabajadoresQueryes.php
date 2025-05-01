<?php

namespace App\Models\Queryes;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class TrabajadoresQueryes extends Model
{
    public function getTrabajadorById($id) {
        $query = "SELECT t.nombre_trabajador FROM `trabajadores` AS t WHERE t.trabajador_id = ?;";
        $resultado = DB::select($query, [$id]);

        if (count($resultado) > 0) {
            return $resultado[0];
        } else {
            return [];
        }

    }
}
