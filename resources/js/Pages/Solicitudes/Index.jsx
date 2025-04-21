import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";
import { Textarea } from "@/Components/ui/textarea";
import { toast } from "react-toastify";

export default function Index({ departamentos }) {

    const {
        data: dataSolicitud,
        setData: setDataSolicitud,
        errors,
        reset,
        post
    } = useForm({
        depto_solicitado_id: null,
        depto_solicitante_id: null,
        desc_servicio: ""
    })

    function handleSubmit(e) {

        e.preventDefault()

        post(route('solicitudes.store'), {
            onSuccess: () => {
                reset()
                toast.success('Solicitud creada con éxito')
            }
        })

    }

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Solicitudes
                    </h2>

                    {/*----- CODIGO DE VENTANA MODAL PARA CREAR SOLICITUDES ------*/}
                    <Dialog forceMount>
                        <DialogTrigger asChild>
                            <Button variant="outline">Crear Solicitud</Button>
                        </DialogTrigger>

                        <DialogContent className="sm:max-w-[600px]" >
                            <form onSubmit={handleSubmit} >
                                <DialogHeader>
                                    <DialogTitle>Crear Solicitud</DialogTitle>
                                    <DialogDescription>
                                        Completa cada uno de los campos para crear una nueva solicitud. Una vez terminado presiona el botón "Crear".
                                    </DialogDescription>
                                </DialogHeader>

                                <div className="grid gap-4 py-4">



                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="depto_solicitado_id" className="text-right">
                                            Departamento Solicitado
                                        </Label>
                                        <Select value={dataSolicitud.depto_solicitado_id} onValueChange={(value) =>
                                            setDataSolicitud({ ...dataSolicitud, depto_solicitado_id: value })
                                        }>
                                            <SelectTrigger id="depto_solicitado_id" className="col-span-3" >
                                                <SelectValue placeholder="Seleccione un Departamento" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Departamentos</SelectLabel>
                                                    {departamentos
                                                        .filter(depto => ['Recursos Materiales y Servicios', 'Mantenimiento de Equipo', 'Centro de Cómputo'].includes(depto.nombre_depto))
                                                        .map((depto) => (
                                                            <SelectItem key={`depto-${depto.depto_id}`} value={depto.depto_id}>{depto.nombre_depto}</SelectItem>
                                                        ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        {errors.depto_solicitado_id && (
                                            <p className="text-sm text-red-500 col-span-4 ml-[calc(25%+1rem)]">{errors.depto_solicitado_id}</p>
                                        )}

                                    </div>

                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="depto_solicitante_id" className="text-right">
                                            Departamento Solicitante
                                        </Label>
                                        <Select value={dataSolicitud.depto_solicitante_id} onValueChange={(value) =>
                                            setDataSolicitud({ ...dataSolicitud, depto_solicitante_id: value })
                                        }>
                                            <SelectTrigger id="depto_solicitante_id" className="col-span-3" >
                                                <SelectValue placeholder="Seleccione un Departamento" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Departamentos</SelectLabel>
                                                    {departamentos
                                                        .map((depto) => (
                                                            <SelectItem key={`depto-${depto.depto_id}`} value={depto.depto_id}>{depto.nombre_depto}</SelectItem>
                                                        ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        {errors.depto_solicitante_id && (
                                            <p className="text-sm text-red-500 col-span-4 ml-[calc(25%+1rem)]">{errors.depto_solicitante_id}</p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="desc_servicio" className="text-right" >
                                            Descripción del servicio solicitado
                                        </Label>
                                        <Textarea
                                            id="desc_servicio"
                                            placeholder="Escribe una descripción del servicio"
                                            className="col-span-3"
                                            rows={4}
                                            value={dataSolicitud.desc_servicio}
                                            onChange={(e) =>
                                                setDataSolicitud({ ...dataSolicitud, desc_servicio: e.target.value })
                                            }
                                        />
                                        {errors.desc_servicio && (
                                            <p className="text-sm text-red-500 col-span-4 ml-[calc(25%+1rem)]">{errors.desc_servicio}</p>
                                        )}

                                    </div>
                                </div>

                                <DialogFooter>
                                    <Button type="submit" className="">Crear</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                    {/*----- FIN CODIGO DE VENTANA MODAL PARA CREAR SOLICITUDES ------*/}

                </div>

            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            You're logged in!
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
