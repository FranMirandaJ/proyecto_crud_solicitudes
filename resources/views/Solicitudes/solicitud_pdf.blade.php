<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<style>
    .header th, td {
        border: solid black;
    }

    .tabla-deptos {
        margin-left: 20rem;
        margin-top: 3rem;
    }

    .tabla-deptos th, td {
        border: 2px solid black;
    }

</style>

<body>
    {{-- <p>{{$deptoSolicitante}}</p>
    <p>{{$deptoSolicitado}}</p>
    <p>{{$folio}}</p>
    <p>{{$nombreSolicitante}}</p>
    <p>{{$fechaElaboracion}}</p>
    <p>{{$descripcion}}</p> --}}

    <div class="header">
        <table class="header" style="width:100%">
            <tr>
                <td>
                    <img src="{{ 'file://' . public_path('escudo_itt_grande.png') }}" width="120">
                </td>
                <td style="text-align: center">
                    <p>Solicitud de Mantenimiento Correctivo</p>
                    <p>Código: ITT-POE-06-02</p>
                    <p>Referencia a la norma ISO 9001:2015:7.1.3, 7.1.4</p>
                </td>
                <td>
                    <p>Fecha de revisión: 22-Ene-24</p>
                    <p>Revisión: 1</p>
                    <p>Página: 1 de 1</p>
                </td>
            </tr>
        </table>
    </div>

    <div class="tabla-deptos">
        <table class="header" style="width:100%">
            <tr>
                <td>
                    <strong>Recursos Materiales y Servicios</strong>
                </td>
                <td style="padding: 13px;">

                </td>
            </tr>
            <tr>
                <td>
                    <strong>Mantenimiento de Equipo</strong>
                </td>
                <td style="padding: 13px;">
                </td>
            </tr>
            <tr>
                <td>
                    <strong>Centro de Cómputo</strong>
                </td>
                <td style="padding: 13px;">
                </td>
            </tr>
        </table>
    </div>

</body>

</html>
