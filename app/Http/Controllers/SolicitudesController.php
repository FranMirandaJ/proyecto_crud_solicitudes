<?php

namespace App\Http\Controllers;

use App\Http\Requests\Solicitudes\SolicitudRequest;
use App\Models\Departamentos;
use App\Models\Solicitudes;
use Inertia\Inertia;
use App\Models\Queryes\SolicitudesQueryes;
use App\Models\Queryes\DepartamentosQueryes;
use App\Models\Queryes\TrabajadoresQueryes;
use Carbon\Carbon;
use Illuminate\Http\Request;

class SolicitudesController extends Controller
{

    protected $solicitudesQueryes;
    protected $departamentosQueryes;
    protected $trabajadoresQueryes;

    public function __construct(SolicitudesQueryes $solicitudesQueryes, DepartamentosQueryes $departamentosQueryes, TrabajadoresQueryes $trabajadoresQueryes)
    {
        $this->solicitudesQueryes = $solicitudesQueryes;
        $this->departamentosQueryes = $departamentosQueryes;
        $this->trabajadoresQueryes = $trabajadoresQueryes;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $solicitudes = $this->solicitudesQueryes->getSolicitudes();
        $departamentos = $this->departamentosQueryes->getDepartamentos();

        //dd($solicitudes);

        return Inertia::render('Solicitudes/Index', [
            'solicitudes' => $solicitudes,
            'departamentos' => $departamentos,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {}

    /**
     * Store a newly created resource in storage.
     */
    public function store(SolicitudRequest $request)
    {

        $trabajador_solicitante_id = $this->departamentosQueryes->getJefeDeptoById($request->depto_solicitante_id);

        $this->solicitudesQueryes->insertSolicitud((object)[
            'depto_solicitado_id' => $request->depto_solicitado_id,
            'depto_solicitante_id' => $request->depto_solicitante_id,
            'trabajador_solicitante_id' => $trabajador_solicitante_id,
            'desc_servicio' => $request->desc_servicio,
            'created_at' => Carbon::now('America/Mazatlan')
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Solicitudes $solicitudes)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Solicitudes $solicitudes) {}

    /**
     * Update the specified resource in storage.
     */
    public function update(SolicitudRequest $request)
    {

        $this->solicitudesQueryes->updateSolicitud((object)[
            'depto_solicitado_id' => $request->depto_solicitado_id,
            'depto_solicitante_id' => $request->depto_solicitante_id,
            'desc_servicio' => $request->desc_servicio,
            'updated_at' => Carbon::now('America/Mazatlan'),
        ], $request->solicitud_id);

    }

    public function send(Request $request, $id)
    {
        $this->solicitudesQueryes->updateEstadoSolicitud((object)[
            'esta_enviada' => true,
            'updated_at' => Carbon::now('America/Mazatlan'),
        ], $id);
    }

    public function setFolio(Request $request, $id){

        dd($id);

        $folio = 1;

        $this->solicitudesQueryes->updateFolioSolicitud((Object)[
            'folio' => $folio,
            'updated_at' => Carbon::now('America/Mazatlan')
        ], $id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $this->solicitudesQueryes->deleteSolicitud($id);
    }
}
