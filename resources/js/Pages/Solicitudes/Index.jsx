import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import CrearSolicitudDialog from "@/Components/dialogs/CrearSolicitudDialog";
import TablaListadoSolicitudes from "@/Components/TablaListadoSolicitudes";

export default function Index({ departamentos, solicitudes }) {

    // console.log("departamentos en index = ", departamentos);
    // console.log("solicitudes en index = ", solicitudes);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Solicitudes de Mantenimiento Correctivo
                    </h2>

                    {/*----- CODIGO DE VENTANA MODAL PARA CREAR SOLICITUDES ------*/}
                    <CrearSolicitudDialog
                        departamentos={departamentos}
                    />
                    {/*----- FIN CODIGO DE VENTANA MODAL PARA CREAR SOLICITUDES ------*/}

                </div>

            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">

                            <div className="relative overflow-x-auto">
                                {/*----- CODIGO DE LA TABLA QUE LISTA LAS SOLICITUDES EXISTENTES -----*/}
                                <TablaListadoSolicitudes
                                    solicitudes={solicitudes}
                                    departamentos={departamentos}
                                />
                                {/*----- FIN CODIGO DE LA TABLA QUE LISTA LAS SOLICITUDES EXISTENTES -----*/}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
