<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        $this->truncateTables();

        $this->seedTrabajadores();
        $this->seedDepartamentos();
        $this->seedSolicitudes();
        $this->seedUsuarioAdmin();

        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }



    protected function truncateTables(): void
    {
        $tables = [
            'solicitudes',
            'departamentos',
            'trabajadores',
            'users'
        ];

        foreach ($tables as $table) {
            DB::table($table)->truncate();
        }
    }

    protected function seedDepartamentos(): void
{
    $datos = [
        ['nombre' => 'Recursos Humanos', 'jefe' => 'Juan Carlos Pérez López'],
        ['nombre' => 'Contabilidad', 'jefe' => 'María Guadalupe García Martínez'],
        ['nombre' => 'Recursos Materiales y Servicios', 'jefe' => 'Sofía Isabel Hernández Mendoza'],
        ['nombre' => 'Mantenimiento de Equipo', 'jefe' => 'Miguel Ángel González Castro'],
        ['nombre' => 'Centro de Cómputo', 'jefe' => 'Carlos Alberto López Ramírez'],
        ['nombre' => 'Vinculación', 'jefe' => 'Luis Fernando Rodríguez González'],
        ['nombre' => 'Lenguas Extranjeras', 'jefe' => 'Laura Estela Díaz Romero'],
        ['nombre' => 'Departamento de Ingenierías', 'jefe' => 'Ana Patricia Martínez Sánchez'],
        ['nombre' => 'Laboratorio de Cómputo', 'jefe' => 'José Manuel Torres Jiménez'],
        ['nombre' => 'Planeación', 'jefe' => 'Roberto Carlos Sánchez Pérez'],
        ['nombre' => 'Dirección', 'jefe' => 'Martín Eduardo García Avilanes'],
        ['nombre' => 'Servicios Escolares', 'jefe' => 'Juan Carlos Pérez López'], // repetido
    ];

    foreach ($datos as $d) {
        $jefeId = DB::table('trabajadores')
            ->where('nombre_trabajador', $d['jefe'])
            ->first()?->trabajador_id;

        DB::table('departamentos')->insert([
            'nombre_depto' => $d['nombre'],
            'jefe_depto_id' => $jefeId,
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }
}


    protected function seedTrabajadores(): void
    {
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
            ['nombre_trabajador' => 'Roberto Carlos Sánchez Pérez'],
            ['nombre_trabajador' => 'Martín Eduardo García Avilanes']
        ];

        DB::table('trabajadores')->insert($trabajadores);
    }



    protected function seedSolicitudes(): void
    {
        $solicitudes = [
            [
                'dep_solicitado' => 'Recursos Materiales y Servicios',
                'dep_solicitante' => 'Departamento de Ingenierías',
                'fecha_elaboracion' => now()->subDays(5),
                'descripcion' => 'Materiales para laboratorio de electrónica'
            ],
            [
                'dep_solicitado' => 'Mantenimiento de Equipo',
                'dep_solicitante' => 'Centro de Cómputo',
                'fecha_elaboracion' => now()->subDays(3),
                'descripcion' => 'Reparación de impresora láser en sala de profesores'
            ],
            [
                'dep_solicitado' => 'Recursos Humanos',
                'dep_solicitante' => 'Contabilidad',
                'fecha_elaboracion' => now()->subDays(2),
                'descripcion' => 'Información de prestaciones para reporte mensual'
            ],
            [
                'dep_solicitado' => 'Vinculación',
                'dep_solicitante' => 'Lenguas Extranjeras',
                'fecha_elaboracion' => now()->subDays(7),
                'descripcion' => 'Capacitación en metodologías de enseñanza de inglés'
            ],
            [
                'dep_solicitado' => 'Recursos Materiales y Servicios',
                'dep_solicitante' => 'Mantenimiento de Equipo',
                'fecha_elaboracion' => now()->subDays(4),
                'descripcion' => 'Juego de herramientas para taller de mantenimiento'
            ]
        ];

        foreach ($solicitudes as $solicitud) {

            $deptoSolicitadoId = DB::table('departamentos')
                ->where('nombre_depto', $solicitud['dep_solicitado'])
                ->first()->depto_id;

            $deptoSolicitanteId = DB::table('departamentos')
                ->where('nombre_depto', $solicitud['dep_solicitante'])
                ->first()->depto_id;

            DB::table('solicitudes')->insert([
                'depto_solicitado_id' => $deptoSolicitadoId,
                'depto_solicitante_id' => $deptoSolicitanteId,
                'fecha_elaboracion' => $solicitud['fecha_elaboracion']->format('Y-m-d'),
                'desc_servicio' => $solicitud['descripcion'],
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }
    }

    protected function seedUsuarioAdmin(): void
    {
        User::create([
            'name' => 'Francisco Miranda',
            'email' => 'frsamirandaja@ittepic.edu.mx',
            'password' => bcrypt('12345678')
        ]);
    }
}
