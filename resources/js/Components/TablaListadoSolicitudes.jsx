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
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/Components/ui/button";
import VerDetallesDialog from "@/Components/dialogs/VerDetallesDialog";
import EditarSolicitudDialog from "./dialogs/EditarSolicitudDialog";
import { EliminarSolicitudAlertDialog } from "./dialogs/EliminarSolicitudAlertDialog";

export default function TablaListadoSolicitudes({ solicitudes, departamentos }) {

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">No. de Folio</TableHead>
                    <TableHead>Fecha de Elaboración</TableHead>
                    <TableHead>Departamento Solicitante</TableHead>
                    <TableHead>Departamento Solicitado</TableHead>
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
                        <TableCell>{departamentos.find(depto => depto.depto_id === solicitud.depto_solicitante_id)?.nombre_depto}</TableCell>
                        <TableCell>{departamentos.find(depto => depto.depto_id === solicitud.depto_solicitado_id)?.nombre_depto}</TableCell>
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
                                        <>
                                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                                <VerDetallesDialog
                                                    solicitud={solicitud}
                                                    departamentos={departamentos}
                                                />
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={() => console.log('Generar PDF')}>
                                                Generar PDF
                                            </DropdownMenuItem>
                                        </>

                                    ) : (
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
                                            <DropdownMenuItem onClick={() => console.log('Enviar solicitud')}>
                                                <Button variant="ghost" className="w-full justify-start">
                                                    Enviar Solicitud
                                                </Button>
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

