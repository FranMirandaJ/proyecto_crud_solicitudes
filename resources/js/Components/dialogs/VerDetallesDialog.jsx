"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Asegúrate de importar Input
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function VerDetallesDialog({ solicitud, departamentos }) {

    const [open, setOpen] = useState(false);

    // Obtener nombres de departamentos
    const deptoSolicitante = departamentos.find(
        (depto) => depto.depto_id === solicitud.depto_solicitante_id
    )?.nombre_depto;

    const deptoSolicitado = departamentos.find(
        (depto) => depto.depto_id === solicitud.depto_solicitado_id
    )?.nombre_depto;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" className="w-full justify-start">
                    Ver detalles
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Detalles de la Solicitud</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    {/* === Folio (si existe) === */}
                    {solicitud.folio && (
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Folio</Label>
                            <Input
                                readOnly
                                value={solicitud.folio}
                                className="col-span-3"
                            />
                        </div>
                    )}

                    {/* === Fecha === */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Fecha de Elaboración</Label>
                        <Input
                            readOnly
                            value={new Date(solicitud.created_at).toLocaleString("es-MX")}
                            className="col-span-3"
                        />
                    </div>

                    {/* === Departamento Solicitante === */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Departamento Solicitante</Label>
                        <Input
                            readOnly
                            value={deptoSolicitante}
                            className="col-span-3"
                        />
                    </div>

                    {/* === Solicitante === */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Nombre del Solicitante</Label>
                        <Input
                            readOnly
                            value={solicitud.jefe_solicitante}
                            className="col-span-3"
                        />
                    </div>

                    {/* === Departamento Solicitado === */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Departamento Solicitado</Label>
                        <Input
                            readOnly
                            value={deptoSolicitado}
                            className="col-span-3"
                        />
                    </div>

                    {/* === Descripción === */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Descripción del servicio solicitado</Label>
                        <Textarea
                            readOnly
                            value={solicitud.desc_servicio}
                            className="col-span-3"
                            rows={4}
                        />
                    </div>
                </div>

                <div className="flex justify-end">
                    <Button onClick={() => setOpen(false)}>Cerrar</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
