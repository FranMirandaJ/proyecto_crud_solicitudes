import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/Components/ui/button";
import VerDetallesDialog from "@/Components/dialogs/VerDetallesDialog";
import EditarSolicitudDialog from "./dialogs/EditarSolicitudDialog";
import { EliminarSolicitudAlertDialog } from "./dialogs/EliminarSolicitudAlertDialog";
import { EnviarSolicitudAlertDialog } from "./dialogs/EnviarSolicitudAlertDialog";
import { router } from "@inertiajs/react";

export default function TablaListadoSolicitudes({ solicitudes, departamentos }) {

    function openPostRoute(url, data) {
        // Crear un formulario en el cuerpo del documento
        const form = new FormData();

        // Añadir el token CSRF automáticamente
        const csrfToken = document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content");
        form.append("_token", csrfToken);

        // Añadir los datos
        for (const key in data) {
            form.append(key, data[key]);
        }

        // Crear una nueva ventana para enviar los datos
        const newWindow = window.open("", "_blank");

        // Crear y enviar la solicitud POST
        fetch(url, {
            method: "POST",
            body: form,
        })
            .then((response) => response.blob()) // Obtener la respuesta como blob
            .then((blob) => {
                // Crear un objeto URL para el blob y mostrarlo en la nueva ventana
                const blobUrl = URL.createObjectURL(blob);
                newWindow.location.href = blobUrl;
            })
            .catch((error) => {
                toast({
                    description: 'Ocurrió un error al intentar imprimir el documento',
                    variant: 'destructive'
                });
                //console.error("Error en la solicitud POST:", error);
                newWindow.close();
            });
    }

    const handleImprimirPDF = (solicitud_id) => {

        //console.log(solicitud_id)

        const solicitudSeleccionada = solicitudes.find(
            (s) => s.solicitud_id === solicitud_id
        )


        //console.log(solicitudSeleccionada)

        const fecha = new Date(solicitudSeleccionada.created_at)

        const dia = fecha.getDate().toString().padStart(2, '0')
        const mes = fecha.toLocaleString('es-ES', { month: 'long' }) // mes en texto, en español
        const año = fecha.getFullYear()

        const fechaFormateada = `${dia}/${mes}/${año}`
        //console.log(departamentos)
        const deptoSolicitante = departamentos.find(d => d.depto_id === solicitudSeleccionada.depto_solicitante_id)
        //console.log(deptoSolicitante)
        const deptoSolicitado = departamentos.find(d => d.depto_id === solicitudSeleccionada.depto_solicitado_id)
        //console.log(deptoSolicitado)


        const datosSolicitud = {
            id: solicitudSeleccionada.solicitud_id,
            folio: solicitudSeleccionada.folio,
            trabajador_solicitante: solicitudSeleccionada.jefe_solicitante,
            fecha: fechaFormateada,
            depto_solicitante: deptoSolicitante.nombre_depto,
            depto_solicitado: deptoSolicitado.nombre_depto,
            descripcion: solicitudSeleccionada.desc_servicio
        }

        //console.log(datosSolicitud)

        //uso de la funcion
        openPostRoute(route("solicitudes.pdf"), {
            datosSolicitud: JSON.stringify(datosSolicitud),
        })

    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">No. de Folio</TableHead>
                    <TableHead>Fecha de Elaboración</TableHead>
                    <TableHead>Departamento Solicitado</TableHead>
                    <TableHead>Departamento Solicitante</TableHead>
                    <TableHead>Enviada</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {solicitudes.map((solicitud) => (
                    <TableRow key={solicitud.solicitud_id}>
                        <TableCell className="font-medium">{solicitud.folio ?? 'N/A'}</TableCell>
                        <TableCell>{new Date(solicitud.created_at).toLocaleDateString('es-MX', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                        })}</TableCell>
                        <TableCell>{departamentos.find(depto => depto.depto_id === solicitud.depto_solicitado_id)?.nombre_depto}</TableCell>
                        <TableCell>{departamentos.find(depto => depto.depto_id === solicitud.depto_solicitante_id)?.nombre_depto}</TableCell>
                        <TableCell>{solicitud.esta_enviada === 1 ? (
                            <span>Sí</span>
                        ) : (
                            <span>No</span>
                        )}</TableCell>
                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                        <span className="sr-only">Abrir Menú</span>
                                        <MoreHorizontal />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>

                                    {solicitud.folio ? (
                                        // Tiene folio: Ver + PDF
                                        <>
                                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                                <VerDetallesDialog
                                                    solicitud={solicitud}
                                                    departamentos={departamentos}
                                                />
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                                                <Button variant="ghost" className="w-full justify-start"
                                                    onClick={() => handleImprimirPDF(solicitud.solicitud_id)}
                                                >
                                                    Generar PDF
                                                </Button>
                                            </DropdownMenuItem>
                                        </>
                                    ) : solicitud.esta_enviada ? (

                                        // Enviada pero sin folio: Solo Ver
                                        <>
                                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                                <VerDetallesDialog
                                                    solicitud={solicitud}
                                                    departamentos={departamentos}
                                                />
                                            </DropdownMenuItem>
                                        </>
                                    ) : (
                                        // Ni enviada ni con folio: todas las opciones
                                        <>
                                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                                <VerDetallesDialog
                                                    solicitud={solicitud}
                                                    departamentos={departamentos}
                                                />
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                                                <EditarSolicitudDialog
                                                    solicitud={solicitud}
                                                    departamentos={departamentos}
                                                />
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                                                <EnviarSolicitudAlertDialog
                                                    solicitud={solicitud}
                                                />
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                                                <EliminarSolicitudAlertDialog
                                                    solicitud={solicitud}
                                                />
                                            </DropdownMenuItem>
                                        </>
                                    )}
                                </DropdownMenuContent>

                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

