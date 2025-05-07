<?php

namespace App\Http\Controllers;

use App\Http\Requests\Solicitudes\SolicitudRequest;
use App\Models\Departamentos;
use App\Models\Solicitudes;
use Inertia\Inertia;
use App\Models\Queryes\SolicitudesQueryes;
use App\Models\Queryes\DepartamentosQueryes;
use App\Models\Queryes\TrabajadoresQueryes;
//use Barryvdh\DomPDF\PDF;
use Barryvdh\DomPDF\PDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;

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

        $this->solicitudesQueryes->insertSolicitud((object)[
            'depto_solicitado_id' => $request->depto_solicitado_id,
            'depto_solicitante_id' => $request->depto_solicitante_id,
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

    public function send($id)
    {
        $this->solicitudesQueryes->updateEstadoSolicitud((object)[
            'esta_enviada' => true,
            'updated_at' => Carbon::now('America/Mazatlan'),
        ], $id);
    }

    public function setFolio($id)
    {

        $año = Carbon::now('America/Mazatlan')->year;
        $prefijo = "CC{$año}1-";
        $ultimoFolio = $this->solicitudesQueryes->getLastFolio();

        $consecutivo = $ultimoFolio && preg_match('/-(\d+)$/', $ultimoFolio->folio, $matches)
            ? intval($matches[1]) + 1
            : 1;

        $folioFinal = $prefijo . str_pad($consecutivo, 3, '0', STR_PAD_LEFT);

        $this->solicitudesQueryes->updateFolioSolicitud((object)[
            'folio' => $folioFinal,
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

    public function generarPDF(Request $request)
    {

        $data = json_decode($request->datosSolicitud);

        $deptoSolicitante = $data->depto_solicitante;
        $deptoSolicitado =$data->depto_solicitado;
        $folio = $data->folio;
        $nombreSolicitante = $data->trabajador_solicitante;
        $fechaElaboracion = $data->fecha;
        $descripcion = $data->descripcion;

        // Inicializar DOMPDF ===================
        $pdf = App::make('dompdf.wrapper');

        $html = view('Solicitudes.solicitud_pdf', compact('deptoSolicitante', 'deptoSolicitado', 'folio', 'nombreSolicitante', 'fechaElaboracion', 'descripcion'));
        $pdf->loadHTML($html);

        // configurar opciones de Dompdf
        $pdf->setOptions([
            'isRemoteEnabled' => true // para cargar imagenes de forma remota
        ]);

        // cargar el HTML completo
        $pdf->loadHTML($html);
        $pdf->setPaper('A4');

        return $pdf->stream('solicitud.pdf');

    }
}
