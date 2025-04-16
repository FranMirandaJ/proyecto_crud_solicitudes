import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { useState, useEffect } from "react";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Index({ tipos_solicitudes, departamentos }) {

    function handleSubmit(e) {
        e.preventDefault()
        console.log('submit')
    }

    const initialValues = {
        tipo_solicitud: null,
        fecha_revision: null,
        depto_solicitado_id: null,
        depto_solicitante_id: null,
        trabajador_solicitante_id: null,
        desc_servicio: ""
    }

    const { data, errors, setData } = useForm(initialValues)

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Crear Solicitud
                    </h2>
                    <Link className="text-white" href={route('solicitudes.index')}>
                        Solicitudes
                    </Link>
                </div>

            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">

                            <form className="space-y-6" onSubmit={handleSubmit}>

                                <div>
                                    <InputLabel htmlFor="tipo_solicitud" value="Tipo de Solicitud" />

                                    <select
                                        id="tipo_solicitud"
                                        name="tipo_solicitud"
                                        value={data.tipo_solicitud || ""}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        onChange={e => setData('tipo_solicitud', e.target.value)}
                                    >
                                        <option value="" disabled hidden>Selecciona un Tipo de Solicitud</option>
                                        {tipos_solicitudes.map((tipo) => (
                                            <option key={`tipo-${tipo.tipo_solicitud_id}`} value={tipo.tipo_solicitud_id}>{tipo.nombre_tipo_solicitud}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* <div>
                                    <InputLabel htmlFor="fecha_revision" value="Fecha de Revisión" />

                                        <TextInput
                                            id="fecha_revision"
                                            name="fecha_revision"
                                            type="date"
                                            className="mt-1 block w-full"
                                            value={data.fecha_revision}
                                            onChange={e => setData('fecha_revision', e.target.value)}
                                            isFocused={true}
                                        />

                                    <InputError message={errors.email} className="mt-2" />
                                </div> */}

                                <div>
                                    <InputLabel htmlFor="depto_solicitado" value="Departamento Solicitado" />

                                    <select
                                        id="depto_solicitado"
                                        name="depto_solicitado"
                                        value={data.depto_solicitado || ""}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        onChange={e => setData('depto_solicitado', e.target.value)}
                                    >
                                        <option value="" disabled hidden>Selecciona un Departamento</option>
                                        {departamentos
                                        .filter(depto => ['Recursos Materiales y Servicios', 'Mantenimiento de Equipo', 'Centro de Cómputo'].includes(depto.nombre_depto))
                                        .map((depto) => (
                                            <option key={`depto-${depto.depto_id}`} value={depto.depto_id}>{depto.nombre_depto}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <InputLabel htmlFor="depto_solicitante" value="Departamento Solicitante" />

                                    <select
                                        id="depto_solicitante"
                                        name="depto_solicitante"
                                        value={data.depto_solicitante || ""}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        onChange={e => setData('depto_solicitante', e.target.value)}
                                    >
                                        <option value="" disabled hidden>Selecciona un Departamento</option>
                                        {departamentos
                                        .map((depto) => (
                                            <option key={`depto-${depto.depto_id}`} value={depto.depto_id}>{depto.nombre_depto}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <InputLabel htmlFor="trabajador_solicitante" value="Trabajador Solicitante" />

                                    <select
                                        id="trabajador_solicitante"
                                        name="trabajador_solicitante"
                                        value={data.trabajador_solicitante || ""}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        onChange={e => setData('trabajador_solicitante', e.target.value)}
                                    >
                                        <option value="" disabled hidden>Selecciona un Trabajador</option>
                                        {/* {departamentos
                                        .map((depto) => (
                                            <option key={`depto-${depto.depto_id}`} value={depto.depto_id}>{depto.nombre_depto}</option>
                                        ))} */}
                                    </select>
                                </div>

                                <div>
                                    <InputLabel htmlFor="desc_servicio" value="Descripción del servicio solicitado o falla a reparar" />

                                    <textarea
                                        id="desc_servicio"
                                        name="desc_servicio"
                                        placeholder="Escribe una descripción del servicio"
                                        onChange={e => setData('desc_servicio', e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    ></textarea>
                                </div>

                                <div className="flex align-items-center justify-center">
                                    <PrimaryButton >
                                        Crear Solicitud
                                    </PrimaryButton>
                                </div>

                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
