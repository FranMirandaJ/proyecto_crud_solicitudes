<?php

namespace App\Models\Queryes;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;

class SolicitudesQueryes extends Model
{


    public function getSolicitudes()
    {
        $query = "SELECT s.solicitud_id, s.folio, s.depto_solicitado_id, s.depto_solicitante_id, s.trabajador_solicitante_id, s.desc_servicio, s.created_at, s.esta_enviada FROM `solicitudes` as s;";

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
            s.trabajador_solicitante_id, s.desc_servicio, s.created_at
            FROM `solicitudes` as s WHERE s.solicitud_id = ?;";

        $resultado = DB::select($query, [$id]);
        if (count($resultado) > 0) {
            return $resultado[0];
        } else {
            return [];
        }
    }

    public function insertSolicitud($data) {
        $query = "INSERT INTO solicitudes (depto_solicitado_id, depto_solicitante_id, trabajador_solicitante_id,
         desc_servicio, created_at)
         VALUES (?, ?, ?, ?, ?)";

        DB::insert($query, [
            $data->depto_solicitado_id,
            $data->depto_solicitante_id,
            $data->trabajador_solicitante_id,
            $data->desc_servicio,
            $data->created_at
        ]);
    }

    public function updateSolicitud($data, $id) {
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

    public function updateEstadoSolicitud($data, $id) {
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

    public function updateFolioSolicitud($data, $id) {
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

    public function deleteSolicitud($id) {
        $query = "DELETE FROM `solicitudes` WHERE solicitud_id = ?;";

        DB::delete($query, [$id]);
    }

}
