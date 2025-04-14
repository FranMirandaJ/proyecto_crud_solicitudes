<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Desactivar la revisión de claves foráneas temporalmente
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        // Limpiar tablas
        DB::table('solicitudes')->truncate();
        DB::table('trabajadores__departamentos')->truncate();
        DB::table('trabajadores')->truncate();
        DB::table('departamentos')->truncate();
        DB::table('tipos_solicitud')->truncate();

        // Tipos de solicitud
        $tiposSolicitud = [
            ['nombre_tipo_solicitud' => 'Solicitud de Materiales'],
            ['nombre_tipo_solicitud' => 'Solicitud de Reposición'],
            ['nombre_tipo_solicitud' => 'Solicitud de Capacitación'],
            ['nombre_tipo_solicitud' => 'Solicitud de Insumos'],
            ['nombre_tipo_solicitud' => 'Solicitud de Herramientas'],
            ['nombre_tipo_solicitud' => 'Solicitud de Mantenimiento Correctivo'],
            ['nombre_tipo_solicitud' => 'Solicitud de Mantenimiento Preventivo'],
            ['nombre_tipo_solicitud' => 'Solicitud de Información']
        ];

        foreach ($tiposSolicitud as $tipo) {
            DB::table('tipos_solicitud')->insert($tipo);
        }

        // Departamentos
        $departamentos = [
            ['nombre_depto' => 'Recursos Humanos'],
            ['nombre_depto' => 'Contabilidad'],
            ['nombre_depto' => 'Recursos Materiales y Servicios'],
            ['nombre_depto' => 'Mantenimiento de Equipo'],
            ['nombre_depto' => 'Centro de Cómputo'],
            ['nombre_depto' => 'Vinculación'],
            ['nombre_depto' => 'Lenguas Extranjeras'],
            ['nombre_depto' => 'Departamento de Ingenierías'],
            ['nombre_depto' => 'Laboratorio de Cómputo'],
            ['nombre_depto' => 'Planeación'],
            ['nombre_depto' => 'Dirección'],
            ['nombre_depto' => 'Servicios Escolares']
        ];

        foreach ($departamentos as $depto) {
            DB::table('departamentos')->insert($depto);
        }

        // Trabajadores (con 1-2 nombres y 2 apellidos)
        $trabajadores = [
            ['nombre_trabajador' => 'Juan Carlos Pérez López'],
            ['nombre_trabajador' => 'María Guadalupe García Martínez'],
            ['nombre_trabajador' => 'Carlos Alberto López Ramírez'],
            ['nombre_trabajador' => 'Ana Patricia Martínez Sánchez'],
            ['nombre_trabajador' => 'Luis Fernando Rodríguez González'],
            ['nombre_trabajador' => 'Sofía Isabel Hernández Mendoza'],
            ['nombre_trabajador' => 'Miguel Ángel González Castro'],
            ['nombre_trabajador' => 'José Manuel Torres Jiménez'],
            ['nombre_trabajador' => 'Laura Estela Díaz Romero'],
            ['nombre_trabajador' => 'Roberto Carlos Sánchez Pérez']
        ];

        foreach ($trabajadores as $trabajador) {
            DB::table('trabajadores')->insert($trabajador);
        }

        // Asignar trabajadores a departamentos (relación muchos a muchos)
        $trabajadoresDepartamentos = [
            ['trabajador_id' => DB::table('trabajadores')->where('nombre_trabajador', 'Juan Carlos Pérez López')->first()->trabajador_id,
             'depto_id' => DB::table('departamentos')->where('nombre_depto', 'Recursos Humanos')->first()->depto_id],

            ['trabajador_id' => DB::table('trabajadores')->where('nombre_trabajador', 'María Guadalupe García Martínez')->first()->trabajador_id,
             'depto_id' => DB::table('departamentos')->where('nombre_depto', 'Contabilidad')->first()->depto_id],

            ['trabajador_id' => DB::table('trabajadores')->where('nombre_trabajador', 'Carlos Alberto López Ramírez')->first()->trabajador_id,
             'depto_id' => DB::table('departamentos')->where('nombre_depto', 'Centro de Cómputo')->first()->depto_id],

            ['trabajador_id' => DB::table('trabajadores')->where('nombre_trabajador', 'Ana Patricia Martínez Sánchez')->first()->trabajador_id,
             'depto_id' => DB::table('departamentos')->where('nombre_depto', 'Departamento de Ingenierías')->first()->depto_id],

            ['trabajador_id' => DB::table('trabajadores')->where('nombre_trabajador', 'Luis Fernando Rodríguez González')->first()->trabajador_id,
             'depto_id' => DB::table('departamentos')->where('nombre_depto', 'Vinculación')->first()->depto_id],

            ['trabajador_id' => DB::table('trabajadores')->where('nombre_trabajador', 'Sofía Isabel Hernández Mendoza')->first()->trabajador_id,
             'depto_id' => DB::table('departamentos')->where('nombre_depto', 'Recursos Materiales y Servicios')->first()->depto_id],

            ['trabajador_id' => DB::table('trabajadores')->where('nombre_trabajador', 'Miguel Ángel González Castro')->first()->trabajador_id,
             'depto_id' => DB::table('departamentos')->where('nombre_depto', 'Mantenimiento de Equipo')->first()->depto_id],

            ['trabajador_id' => DB::table('trabajadores')->where('nombre_trabajador', 'José Manuel Torres Jiménez')->first()->trabajador_id,
             'depto_id' => DB::table('departamentos')->where('nombre_depto', 'Laboratorio de Cómputo')->first()->depto_id],

            ['trabajador_id' => DB::table('trabajadores')->where('nombre_trabajador', 'Laura Estela Díaz Romero')->first()->trabajador_id,
             'depto_id' => DB::table('departamentos')->where('nombre_depto', 'Lenguas Extranjeras')->first()->depto_id],

            ['trabajador_id' => DB::table('trabajadores')->where('nombre_trabajador', 'Roberto Carlos Sánchez Pérez')->first()->trabajador_id,
             'depto_id' => DB::table('departamentos')->where('nombre_depto', 'Dirección')->first()->depto_id],
        ];

        foreach ($trabajadoresDepartamentos as $relacion) {
            DB::table('trabajadores__departamentos')->insert($relacion);
        }

        // Solicitudes (actualizadas con los nuevos tipos y departamentos)
        $solicitudes = [
            [
                'tipo_solicitud_id' => DB::table('tipos_solicitud')->where('nombre_tipo_solicitud', 'Solicitud de Materiales')->first()->tipo_solicitud_id,
                'fecha_revision' => now()->addDays(5)->format('Y-m-d'),
                'depto_solicitado_id' => DB::table('departamentos')->where('nombre_depto', 'Recursos Materiales y Servicios')->first()->depto_id,
                'depto_solicitante_id' => DB::table('departamentos')->where('nombre_depto', 'Departamento de Ingenierías')->first()->depto_id,
                'trabajador_solicitante_id' => DB::table('trabajadores')->where('nombre_trabajador', 'Ana Patricia Martínez Sánchez')->first()->trabajador_id,
                'fecha_elaboracion' => now()->format('Y-m-d'),
                'desc_servicio' => 'Materiales para laboratorio de electrónica',
            ],
            [
                'tipo_solicitud_id' => DB::table('tipos_solicitud')->where('nombre_tipo_solicitud', 'Solicitud de Mantenimiento Correctivo')->first()->tipo_solicitud_id,
                'fecha_revision' => now()->addDays(3)->format('Y-m-d'),
                'depto_solicitado_id' => DB::table('departamentos')->where('nombre_depto', 'Mantenimiento de Equipo')->first()->depto_id,
                'depto_solicitante_id' => DB::table('departamentos')->where('nombre_depto', 'Centro de Cómputo')->first()->depto_id,
                'trabajador_solicitante_id' => DB::table('trabajadores')->where('nombre_trabajador', 'Carlos Alberto López Ramírez')->first()->trabajador_id,
                'fecha_elaboracion' => now()->format('Y-m-d'),
                'desc_servicio' => 'Reparación de impresora láser en sala de profesores',
            ],
            [
                'tipo_solicitud_id' => DB::table('tipos_solicitud')->where('nombre_tipo_solicitud', 'Solicitud de Información')->first()->tipo_solicitud_id,
                'fecha_revision' => now()->addDays(2)->format('Y-m-d'),
                'depto_solicitado_id' => DB::table('departamentos')->where('nombre_depto', 'Recursos Humanos')->first()->depto_id,
                'depto_solicitante_id' => DB::table('departamentos')->where('nombre_depto', 'Contabilidad')->first()->depto_id,
                'trabajador_solicitante_id' => DB::table('trabajadores')->where('nombre_trabajador', 'María Guadalupe García Martínez')->first()->trabajador_id,
                'fecha_elaboracion' => now()->format('Y-m-d'),
                'desc_servicio' => 'Información de prestaciones para reporte mensual',
            ],
            [
                'tipo_solicitud_id' => DB::table('tipos_solicitud')->where('nombre_tipo_solicitud', 'Solicitud de Capacitación')->first()->tipo_solicitud_id,
                'fecha_revision' => now()->addDays(7)->format('Y-m-d'),
                'depto_solicitado_id' => DB::table('departamentos')->where('nombre_depto', 'Vinculación')->first()->depto_id,
                'depto_solicitante_id' => DB::table('departamentos')->where('nombre_depto', 'Lenguas Extranjeras')->first()->depto_id,
                'trabajador_solicitante_id' => DB::table('trabajadores')->where('nombre_trabajador', 'Laura Estela Díaz Romero')->first()->trabajador_id,
                'fecha_elaboracion' => now()->format('Y-m-d'),
                'desc_servicio' => 'Capacitación en metodologías de enseñanza de inglés',
            ],
            [
                'tipo_solicitud_id' => DB::table('tipos_solicitud')->where('nombre_tipo_solicitud', 'Solicitud de Herramientas')->first()->tipo_solicitud_id,
                'fecha_revision' => now()->addDays(4)->format('Y-m-d'),
                'depto_solicitado_id' => DB::table('departamentos')->where('nombre_depto', 'Recursos Materiales y Servicios')->first()->depto_id,
                'depto_solicitante_id' => DB::table('departamentos')->where('nombre_depto', 'Mantenimiento de Equipo')->first()->depto_id,
                'trabajador_solicitante_id' => DB::table('trabajadores')->where('nombre_trabajador', 'Miguel Ángel González Castro')->first()->trabajador_id,
                'fecha_elaboracion' => now()->format('Y-m-d'),
                'desc_servicio' => 'Juego de herramientas para taller de mantenimiento',
            ]
        ];

        foreach ($solicitudes as $solicitud) {
            DB::table('solicitudes')->insert($solicitud);
        }

        // Reactivar la revisión de claves foráneas
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
