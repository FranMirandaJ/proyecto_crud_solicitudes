<?php

namespace App\Models\Queryes;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class DepartamentosQueryes extends Model
{

    public function getDepartamentos() {
        $query = "SELECT dep.`depto_id`, dep.nombre_depto, dep.jefe_depto_id FROM `departamentos` AS `dep`;";
        $resultado = DB::select($query);
        if (count($resultado) > 0) {
            return $resultado;
        } else {
            return [];
        }
    }

    public function getJefeDeptoById($id) {
        $query = "SELECT d.jefe_depto_id FROM `departamentos` AS d WHERE d.depto_id = ?;";
        $resultado = DB::select($query, [$id]);
        return count($resultado) > 0 ? $resultado[0]->jefe_depto_id : null;
    }

    public function getNombreSolicitante($id)
    {
        $query = "SELECT t.nombre_trabajador
                FROM `solicitudes` AS s
                JOIN departamentos AS d ON s.depto_solicitante_id = d.depto_id
                JOIN trabajadores AS t ON d.jefe_depto_id = t.trabajador_id
                WHERE s.depto_solicitante_id = ?;";

        $resultado = DB::select($query,[$id]);
        if (count($resultado) > 0) {
            return $resultado[0];
        } else {
            return [];
        }
    }

}
