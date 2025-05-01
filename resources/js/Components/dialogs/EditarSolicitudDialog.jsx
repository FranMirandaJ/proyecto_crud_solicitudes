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

export default function EditarSolicitudDialog({ solicitud, departamentos }) {

    const [open, setOpen] = useState(false);

    const { data, setData, errors, reset, put, processing } = useForm({
        solicitud_id: solicitud.solicitud_id,
        depto_solicitado_id: solicitud.depto_solicitado_id,
        depto_solicitante_id: solicitud.depto_solicitante_id,
        desc_servicio: String(solicitud.desc_servicio || "")
    });

    function handleSubmit(e) {

        e.preventDefault()

        put(route('solicitudes.update', solicitud.solicitud_id), {
            onSuccess: () => {
                setOpen(false)
                toast.success('Solicitud actualizada correctamente')
            }, onError: () => {
                toast.error('Error al actualizar la solicitud')
            }
        })
    }

    return (
        <Dialog onOpenChange={setOpen} open={open}>
            <DialogTrigger asChild>
                <Button variant="ghost" className="w-full justify-start">
                    Editar
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[600px]">

                <DialogHeader>
                    <DialogTitle>Editar Solicitud</DialogTitle>
                    <DialogDescription>
                        Modifica los campos necesarios y presiona "Guardar cambios" para actualizar la solicitud.
                    </DialogDescription>
                </DialogHeader>

                <form>
                    <div className="grid gap-4 py-4">

                        {/*=========== Departamento Solicitado ===========*/}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="depto_solicitado_id" className="text-right">
                                Departamento Solicitado
                            </Label>
                            <Select
                                value={data.depto_solicitado_id}
                                onValueChange={(value) => setData('depto_solicitado_id', value)}
                            >
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
                            <Select
                                value={data.depto_solicitante_id}
                                onValueChange={(value) => setData('depto_solicitante_id', value)}
                            >
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
                                className="col-span-3"
                                rows={4}
                                value={data.desc_servicio}
                                onChange={(e) => setData('desc_servicio', e.target.value)}
                                placeholder="Describa el servicio requerido"
                            />
                            {errors.desc_servicio && (
                                <p className="text-sm text-red-500 col-span-4 ml-[calc(25%+1rem)]">{errors.desc_servicio}</p>
                            )}
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            disabled={processing}
                        >
                            Cancelar
                        </Button>
                        <Button onClick={(e) => { handleSubmit(e) }}>
                            Guardar cambios
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>

        </Dialog>
    );
}
