<?php

namespace App\Http\Controllers;

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
        return Inertia::render('Solicitudes/Create', [
            'departamentos' => Departamentos::all(),
            'trabajadores' => Trabajadores::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

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
