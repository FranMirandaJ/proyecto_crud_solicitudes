<?php

namespace App\Models\Queryes;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;

class SolicitudesQueryes extends Model
{


    public function getSolicitudes()
    {
        $query = "SELECT
        s.solicitud_id,
        s.folio,
        s.depto_solicitado_id,
        s.depto_solicitante_id,
        s.desc_servicio,
        s.created_at,
        s.esta_enviada,
        t.nombre_trabajador AS jefe_solicitante
        FROM solicitudes AS s
        JOIN departamentos AS d ON s.depto_solicitante_id = d.depto_id
        JOIN trabajadores AS t ON d.jefe_depto_id = t.trabajador_id;";

        $resultado = DB::select($query);

        if (count($resultado) > 0) {
            return $resultado;
        } else {
            return [];
        }
    }

    public function getSolicitudById($id)
    {
        $query = "SELECT s.solicitud_id, s.folio, s.depto_solicitado_id, s.depto_solicitante_id,
            s.desc_servicio, s.created_at
            FROM `solicitudes` as s WHERE s.solicitud_id = ?;";

        $resultado = DB::select($query, [$id]);
        if (count($resultado) > 0) {
            return $resultado[0];
        } else {
            return [];
        }
    }

    public function insertSolicitud($data)
    {
        $query = "INSERT INTO solicitudes (depto_solicitado_id, depto_solicitante_id,
         desc_servicio, created_at)
         VALUES (?, ?, ?, ?)";

        DB::insert($query, [
            $data->depto_solicitado_id,
            $data->depto_solicitante_id,
            $data->desc_servicio,
            $data->created_at
        ]);
    }

    public function updateSolicitud($data, $id)
    {
        $query = "UPDATE solicitudes
                  SET depto_solicitado_id = ?,
                      depto_solicitante_id = ?,
                      desc_servicio = ?,
                      updated_at = ?
                  WHERE solicitud_id = ?";

        DB::update($query, [
            $data->depto_solicitado_id,
            $data->depto_solicitante_id,
            $data->desc_servicio,
            $data->updated_at,
            $id
        ]);
    }

    public function updateEstadoSolicitud($data, $id)
    {
        $query = "UPDATE solicitudes
                  SET esta_enviada = ?,
                      updated_at = ?
                  WHERE solicitud_id = ?";

        DB::update($query, [
            $data->esta_enviada,
            $data->updated_at,
            $id
        ]);
    }

    public function updateFolioSolicitud($data, $id)
    {
        $query = "UPDATE solicitudes
                  SET folio = ?,
                      updated_at = ?
                  WHERE solicitud_id = ?";

        DB::update($query, [
            $data->folio,
            $data->updated_at,
            $id
        ]);
    }

    public function deleteSolicitud($id)
    {
        $query = "DELETE FROM `solicitudes` WHERE solicitud_id = ?;";

        DB::delete($query, [$id]);
    }

    public function getLastFolio()
    {
        $query = "SELECT * FROM solicitudes WHERE folio IS NOT NULL AND folio LIKE 'CC20251%' ORDER BY folio DESC LIMIT 1;";

        $resultado = DB::select($query);
        if (count($resultado) > 0) {
            return $resultado[0];
        } else {
            return [];
        }
    }

    public function getNombreDepto($id)
    {
        $query = "SELECT d.nombre_depto
                    FROM `solicitudes` AS s
                    JOIN departamentos AS d ON s.depto_solicitante_id = d.depto_id
                    WHERE s.depto_solicitante_id = ?;";

        $resultado = DB::select($query,[$id]);
        if (count($resultado) > 0) {
            return $resultado[0];
        } else {
            return [];
        }
    }


}
