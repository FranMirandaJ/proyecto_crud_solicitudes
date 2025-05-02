import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
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
} from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/Components/ui/button";
import VerDetallesDialog from "@/Components/dialogs/VerDetallesDialog";
import { router } from "@inertiajs/react";

export default function Index({ solicitudes, departamentos }) {

    // No. Folio => CC20251-066

    //console.log(solicitudes)
    return (
        <AuthenticatedLayout
            header={

                <div className="flex justify-between">

                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Generar folios
                    </h2>

                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">

                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Fecha de Elaboración</TableHead>
                                        <TableHead>Departamento Solicitado</TableHead>
                                        <TableHead>Departamento Solicitante</TableHead>
                                        <TableHead></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {solicitudes
                                        .filter((solicitud) => solicitud.esta_enviada === 1 && solicitud.folio === null)
                                        .map((solicitud) => (
                                            <TableRow key={solicitud.solicitud_id}>
                                                <TableCell>{new Date(solicitud.created_at).toLocaleDateString('es-MX', {
                                                    year: 'numeric',
                                                    month: '2-digit',
                                                    day: '2-digit',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}</TableCell>
                                                <TableCell>{departamentos.find(d => d.depto_id === solicitud.depto_solicitado_id)?.nombre_depto}</TableCell>
                                                <TableCell>{departamentos.find(d => d.depto_id === solicitud.depto_solicitante_id)?.nombre_depto}</TableCell>

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
                                                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                                                <VerDetallesDialog
                                                                    solicitud={solicitud}
                                                                    departamentos={departamentos}
                                                                />
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem>
                                                                <Button variant="ghost" className="w-full justify-start"
                                                                    onClick={() => {
                                                                        router.put(route("solicitudes.setFolio"), solicitud.solicitud_id,
                                                                        {
                                                                            onSuccess: () => {
                                                                                reset()
                                                                                setOpen(false)
                                                                                toast.success('Folio generado y asignado con éxito')
                                                                            }, onError: (e) => {
                                                                                toast.error('Error al generar el folio')
                                                                                console.log(e)
                                                                            }
                                                                        })
                                                                    }}
                                                                >
                                                                    Asignar Folio
                                                                </Button>
                                                            </DropdownMenuItem>

                                                        </DropdownMenuContent>

                                                    </DropdownMenu>
                                                </TableCell>

                                            </TableRow>
                                        ))}

                                </TableBody>
                            </Table>

                        </div>
                    </div>
                </div>
            </div>


        </AuthenticatedLayout>
    );
}
