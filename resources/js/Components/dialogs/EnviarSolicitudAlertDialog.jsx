import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { router } from '@inertiajs/react'
import { toast } from 'react-toastify'

export function EnviarSolicitudAlertDialog({ solicitud }) {
    //console.log(solicitud)
    return (

        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="ghost">Enviar</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>¿Enviar Solicitud?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta acción no se puede deshacer (Al enviarlo se asignará un número de folio a esta solicitud a la brevedad). ¿Estás seguro?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => {
                            router.put(route('solicitudes.send', solicitud.solicitud_id), {}, {
                                onSuccess: () => {
                                    toast.success('Solicitud enviada correctamente')
                                },
                                onError: (error) => {
                                    console.error("Errores del servidor:", error)
                                    toast.error('Error al enviar la solicitud')
                                }
                            })
                        }}
                    >
                        Sí, enviar
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
