"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "@inertiajs/react";
import { toast } from "react-toastify";

export default function EditarSolicitudDialog({
    solicitud,
    departamentos,
    open,
    setOpen
}) {
    const { data, setData, errors, put, reset } = useForm({
        depto_solicitado_id: solicitud.depto_solicitado_id,
        depto_solicitante_id: solicitud.depto_solicitante_id,
        desc_servicio: solicitud.desc_servicio
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('solicitudes.update', solicitud.solicitud_id), {
            onSuccess: () => {
                toast.success('Solicitud actualizada correctamente');
                setOpen(false);
            }
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[600px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Editar Solicitud</DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        {/*=========== Departamento Solicitado ===========*/}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="depto_solicitado_id" className="text-right">
                                Departamento Solicitado
                            </Label>
                            <Select value={solicitudNueva.depto_solicitado_id} onValueChange={(value) =>
                                setSolicitudNueva({ ...solicitudNueva, depto_solicitado_id: value })
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
                            <Select value={solicitudNueva.depto_solicitante_id} onValueChange={(value) =>
                                setSolicitudNueva({ ...solicitudNueva, depto_solicitante_id: value })
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
                                value={solicitudNueva.desc_servicio}
                                onChange={(e) =>
                                    setSolicitudNueva({ ...solicitudNueva, desc_servicio: e.target.value })
                                }
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
                        >
                            Cancelar
                        </Button>
                        <Button type="submit">Guardar Cambios</Button>
                    </DialogFooter>


                </form>
            </DialogContent>
        </Dialog>
    );
}
