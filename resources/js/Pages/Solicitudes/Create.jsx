import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { useState, useEffect } from "react";

export default function Index({ tipos_solicitudes }) {

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };

    }, []);

    const initialValues = {
        tipo_solicitud: null,
        fecha_revision: null,
        depto_solicitado_id: null,
        depto_solicitante_id: null,
        fecha_elaboracion: null,
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

                            <form className="space-y-6">

                                <div>
                                    <InputLabel htmlFor="tipo_solicitud" value="Tipo de Solicitud" />

                                    <select
                                        id="tipo_solicitud"
                                        name="tipo_solicitud"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                                    >
                                        <option value="" >Selecciona un Tipo de Solicitud</option>
                                        {tipos_solicitudes.map((tipo) => (
                                            <option key={`tipo-${tipo.tipo_solicitud_id}`} value={tipo.tipo_solicitud_id}>{tipo.nombre_tipo_solicitud}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <InputLabel htmlFor="fecha_revision" value="Fecha de Revisión" />



                                    <InputError message={errors.email} className="mt-2" />
                                </div>

                            </form>
                            {/* <div className="">
                                {JSON.stringify(tipos_solicitudes)}
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
