<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Solicitud {{ $folio }}</title>
</head>

<style>
    @page {
        size: A4;
        margin: 2cm;
    }

    body {
        position: relative;
        font-family: sans-serif;
    }

    .header {
        border-collapse: collapse;
        margin: auto 0;
    }

    .header img {
        height: 85px;
        padding: 1rem 2.5rem;
    }

    .header p {
        text-align: center;
        font-size: 13px;
        padding: 0 3px
    }

    .header td,
    th {
        border: 3px solid black;
    }

    .deptos {
        border-collapse: collapse;
        margin: 10% 0 0 auto;
    }

    .deptos td,
    th {
        border: 1px solid black;
    }

    .deptos td {
        padding: 5px;
        padding-right: 1.7rem;
    }

    .folio {
        margin-top: 5%;
        margin-left: 2cm;
        margin-right: auto;
        margin-bottom: 1.5rem;
        text-align: right;
    }

    .area-solicitante {
        border-collapse: collapse;
        width: 100%;
        margin: auto 0;
    }

    .area-solicitante td,
    th {
        border: 1px solid black;
    }

    .area-solicitante td {
        padding-left: 0.5rem;
        padding-right: 1.7rem;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem
    }
</style>

{{-- <p>{{$deptoSolicitante}}</p>
    <p>{{$deptoSolicitado}}</p>
    <p>{{$folio}}</p>
    <p>{{$nombreSolicitante}}</p>
    <p>{{$fechaElaboracion}}</p>
    <p>{{$descripcion}}</p> --}}

<body>

    <div>
        <table class="header">
            <tr>
                <td>
                    <img src="https://www.tepic.tecnm.mx/images/escudo_itt_grande.png">
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

    <div>
        <table class="deptos">
            <tr>
                <td>
                    <strong>Recursos Materiales y Servicios</strong>
                </td>
                <td>
                    @if ($deptoSolicitado === 'Recursos Materiales y Servicios')
                        &nbsp;X
                    @endif
                </td>
            </tr>
            <tr>
                <td>
                    <strong>Mantenimiento de Equipo</strong>
                </td>
                <td>
                    @if ($deptoSolicitado === 'Mantenimiento de Equipo')
                        &nbsp;X
                    @endif
                </td>
            </tr>
            <tr>
                <td>
                    <strong>Centro de Cómputo</strong>
                </td>
                <td>
                    @if ($deptoSolicitado === 'Centro de Cómputo')
                        &nbsp;X
                    @endif
                </td>
            </tr>
        </table>
    </div>

    <div class="folio">
        <strong>Folio:</strong> {{ $folio }}
    </div>

    <table class="area-solicitante">
        <tr>
            <td>
                <strong>Área Solicitante: </strong> {{ $deptoSolicitante }}
            </td>
        </tr>
    </table>

    <table class="area-solicitante">
        <tr>
            <td>
                <strong>Nombre y firma del Solicitante: </strong>{{ $nombreSolicitante }}
            </td>
        </tr>
        <tr>
            <td>
                <strong>Fecha de Elaboración: </strong>{{ $fechaElaboracion }}
            </td>
        </tr>
        <tr>
            <td>
                <strong>Descripción del servicio solicitado o falla a reparar: </strong>
            </td>
        </tr>
        <tr>
            <td style="font-size: 16px">
                <br>
                {{ $descripcion }}
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
            </td>
        </tr>
    </table>

    <div style="margin-top: 5%; margin-bottom: 1.5rem; text-align: left; font-size: 14px">
        c.c.p. Área Solicitante
    </div>

    <div style="margin-top: 5%; margin-left: 2cm; margin-right: auto; margin-bottom: 1.5rem; text-align: right; font-size: 14px">
        <strong>Instituto Tecnológico de Tepic</strong>
    </div>

</body>

</html>
