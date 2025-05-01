"use client";

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
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";
import { useState } from "react";
import { useForm } from "@inertiajs/react";

export default function CrearSolicitudDialog({ departamentos}) {

    const [open, setOpen] = useState(false);

    const {data, setData, errors, reset, post} = useForm({
            depto_solicitado_id: null,
            depto_solicitante_id: null,
            desc_servicio: ""
        });

    function handleSubmit(e) {
            e.preventDefault()
            post(route('solicitudes.store'), {
                onSuccess: () => {
                    reset()
                    setOpen(false)
                    toast.success('Solicitud creada con éxito')
                }, onError: () => {
                    toast.error('Error al crear la solicitud')
                }
            })
    }

    return (
        <Dialog onOpenChange={setOpen} open={open}>
            <DialogTrigger asChild>
                <Button variant="outline">Crear Solicitud</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[600px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Crear Solicitud</DialogTitle>
                        <DialogDescription>
                            Completa cada uno de los campos para crear una nueva solicitud. Una vez terminado presiona el botón "Crear".
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        {/*=========== Departamento Solicitado ===========*/}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="depto_solicitado_id" className="text-right">
                                Departamento Solicitado
                            </Label>
                            <Select value={data.depto_solicitado_id} onValueChange={(value) =>
                                setData({ ...data, depto_solicitado_id: value })
                            }>
                                <SelectTrigger id="depto_solicitado_id" className="col-span-3">
                                    <SelectValue placeholder="Seleccione un Departamento" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Departamentos</SelectLabel>
                                        {departamentos
                                            .filter(depto => ['Recursos Materiales y Servicios', 'Mantenimiento de Equipo', 'Centro de Cómputo'].includes(depto.nombre_depto))
                                            .map(depto => (
                                                <SelectItem key={`depto-${depto.depto_id}`} value={depto.depto_id}>
                                                    {depto.nombre_depto}
                                                </SelectItem>
                                            ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {errors.depto_solicitado_id && (
                                <p className="text-sm text-red-500 col-span-4 ml-[calc(25%+1rem)]">{errors.depto_solicitado_id}</p>
                            )}
                        </div>

                        {/*=========== Departamento Solicitante ===========*/}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="depto_solicitante_id" className="text-right">
                                Departamento Solicitante
                            </Label>
                            <Select value={data.depto_solicitante_id} onValueChange={(value) =>
                                setData({ ...data, depto_solicitante_id: value })
                            }>
                                <SelectTrigger id="depto_solicitante_id" className="col-span-3">
                                    <SelectValue placeholder="Seleccione un Departamento" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Departamentos</SelectLabel>
                                        {departamentos.map(depto => (
                                            <SelectItem key={`depto-${depto.depto_id}`} value={depto.depto_id}>
                                                {depto.nombre_depto}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {errors.depto_solicitante_id && (
                                <p className="text-sm text-red-500 col-span-4 ml-[calc(25%+1rem)]">{errors.depto_solicitante_id}</p>
                            )}
                        </div>

                        {/*=========== Descripción del servicio ===========*/}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="desc_servicio" className="text-right">
                                Descripción del servicio solicitado
                            </Label>
                            <Textarea
                                id="desc_servicio"
                                placeholder="Escribe una descripción del servicio"
                                className="col-span-3"
                                rows={4}
                                value={data.desc_servicio}
                                onChange={(e) =>
                                    setData({ ...data, desc_servicio: e.target.value })
                                }
                            />
                            {errors.desc_servicio && (
                                <p className="text-sm text-red-500 col-span-4 ml-[calc(25%+1rem)]">{errors.desc_servicio}</p>
                            )}
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="submit" className="">
                            Crear
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
