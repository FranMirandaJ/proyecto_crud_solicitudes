import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/Components/ui/button";
import VerDetallesDialog from "@/Components/dialogs/VerDetallesDialog";
import EditarSolicitudDialog from "./dialogs/EditarSolicitudDialog";

export default function TablaListadoSolicitudes({ solicitudes, departamentos }) {
    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th className="px-6 py-3">No. de Folio</th>
                        <th className="px-6 py-3">Fecha de Elaboración</th>
                        <th className="px-6 py-3">Departamento Solicitante</th>
                        <th className="px-6 py-3">Departamento Solicitado</th>
                        <th className="px-6 py-3"></th>
                    </tr>
                </thead>
                <tbody>
                    {solicitudes?.map((solicitud) => (
                        <tr key={solicitud.solicitud_id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {solicitud.folio ?? 'N/A'}
                            </th>
                            <td className="px-6 py-4">
                                {new Date(solicitud.created_at).toLocaleDateString('es-MX', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </td>
                            <td className="px-6 py-4">
                                {departamentos.find(depto => depto.depto_id === solicitud.depto_solicitante_id)?.nombre_depto}
                            </td>
                            <td className="px-6 py-4">
                                {departamentos.find(depto => depto.depto_id === solicitud.depto_solicitado_id)?.nombre_depto}
                            </td>
                            <td className="px-6 py-4">
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
                                                    Enviar Solicitud
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem onClick={() => console.log('Eliminar solicitud')}>
                                                    Eliminar
                                                </DropdownMenuItem>
                                            </>

                                        )}

                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
