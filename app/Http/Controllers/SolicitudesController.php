<?php

namespace App\Http\Controllers;

use App\Http\Requests\Solicitudes\SolicitudRequest;
use App\Models\Departamentos;
use App\Models\Solicitudes;
use App\Models\Tipos_Solicitud;
use App\Models\Trabajadores;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SolicitudesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Solicitudes/Index', [
            'departamentos' => Departamentos::all(),
            'trabajadores' => Trabajadores::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SolicitudRequest $request)
    {

        $trabajador_solicitante = Departamentos::where('depto_id', $request->depto_solicitante_id)->first()->jefe_depto_id;

        Solicitudes::create([
            'depto_solicitado_id' => $request->depto_solicitado_id,
            'depto_solicitante_id' => $request->depto_solicitante_id,
            'fecha_elaboracion' => now(),
            'desc_servicio' => $request->desc_servicio,
            'trabajador_solicitante_id' => $trabajador_solicitante
        ]);

        return to_route('solicitudes.index')->with('success', 'Solicitud creada correctamente');

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
    public function edit(Solicitudes $solicitudes)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Solicitudes $solicitudes)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Solicitudes $solicitudes)
    {
        //
    }
}
