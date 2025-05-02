<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Queryes\SolicitudesQueryes;
use App\Models\Queryes\DepartamentosQueryes;

class GenerarFolioController extends Controller
{

    protected $solicitudesQueryes;
    protected $departamentosQueryes;

    public function __construct(SolicitudesQueryes $solicitudesQueryes, DepartamentosQueryes $departamentosQueryes)
    {
        $this->solicitudesQueryes = $solicitudesQueryes;
        $this->departamentosQueryes = $departamentosQueryes;

    }

    public function index() {

        $solicitudes = $this->solicitudesQueryes->getSolicitudes();
        $departamentos = $this->departamentosQueryes->getDepartamentos();

        //dd($solicitudes);

        return Inertia::render('Folios/Index', [
            'solicitudes' => $solicitudes,
            'departamentos' => $departamentos
        ]);
    }

}
