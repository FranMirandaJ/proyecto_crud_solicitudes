import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Index(){
    return (
        <AuthenticatedLayout
                    header={
                        <div className="flex justify-between">
                            <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                                Solicitudes
                            </h2>
                            <Link className="text-white" href={route('solicitudes.create')}>
                                Crear Solicitud
                            </Link>
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
