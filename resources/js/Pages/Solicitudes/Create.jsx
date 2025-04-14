import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import Combobox from "react-widgets/Combobox";

export default function Index() {

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

                                    <Combobox className=""
                                        defaultValue="Yellow"
                                        data={["Red", "Yellow", "Blue", "Orange"]}
                                        name="tipo_solicitud"
                                    />

                                    <InputError message={errors.tipo_solicitud} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="tipo_solicitud" value="Tipo de Solicitud" />

                                    <TextInput
                                        id="tipo_solicitud"
                                        type="text"
                                        name="tipo_solicitud"
                                        value={data.tipo_solicitud}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) => setData('email', e.target.value)}
                                    />

                                    <InputError message={errors.email} className="mt-2" />
                                </div>

                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
