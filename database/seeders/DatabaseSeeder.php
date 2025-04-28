<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Lista de departamentos y jefes
        $departamentosJefes = [
            'Centro de Cómputo' => 'Roberto Carlos Villalobos Montiel',
            'Mantenimiento de Equipo' => 'Salvador Salas Carlock',
            'Recursos Materiales y Servicios' => 'José Antonio García Madrigal',
            'Departamento de Recursos Financieros' => 'Claudia Ramírez Montoya',
            'Departamento de Recursos Humanos' => 'Adriana Yarim González Ramos',
            'Servicios Administrativos' => 'Daniel Alejandro García Banda',
            'Departamento de Servicios Escolares' => 'Zoila Raquel Aguirre González',
            'Centro de Información' => 'Norma Natalia Rubín Ramírez',
            'Departamento de Planeación' => 'Rommel Rodríguez Garay',
            'Departamento de Ingenierías' => 'Martin Eduardo García Avilanes',
            'Departamento de Ciencias de la Tierra' => 'Mariana Cortés Zayas',
            'División de Estudios Profesionales' => 'Israel Arjona Vizcaíno',
        ];

        $trabajadores = [];
        $departamentos = [];

        // Insertar trabajadores y departamentos
        foreach ($departamentosJefes as $nombreDepto => $nombreJefe) {
            $trabajadorId = Str::uuid();
            $deptoId = Str::uuid();

            DB::table('trabajadores')->insert([
                'trabajador_id' => $trabajadorId,
                'nombre_trabajador' => $nombreJefe,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            DB::table('departamentos')->insert([
                'depto_id' => $deptoId,
                'nombre_depto' => $nombreDepto,
                'jefe_depto_id' => $trabajadorId,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            $trabajadores[$nombreDepto] = $trabajadorId;
            $departamentos[$nombreDepto] = $deptoId;
        }

        // Crear 3 solicitudes (sin folio)
        $solicitudes = [
            [
                'depto_solicitado' => 'Centro de Cómputo',
                'depto_solicitante' => 'Departamento de Planeación',
                'desc_servicio' => 'Solicitamos mantenimiento de equipo de cómputo en el área de planeación.',
            ],
            [
                'depto_solicitado' => 'Mantenimiento de Equipo',
                'depto_solicitante' => 'Servicios Administrativos',
                'desc_servicio' => 'Se requiere reparación de impresora en servicios administrativos.',
            ],
            [
                'depto_solicitado' => 'Recursos Materiales y Servicios',
                'depto_solicitante' => 'Departamento de Recursos Financieros',
                'desc_servicio' => 'Solicitamos adquisición de material de oficina urgente.',
            ],
        ];

        foreach ($solicitudes as $solicitud) {
            DB::table('solicitudes')->insert([
                'solicitud_id' => Str::uuid(),
                'folio' => null, // Sin folio
                'depto_solicitado_id' => $departamentos[$solicitud['depto_solicitado']],
                'depto_solicitante_id' => $departamentos[$solicitud['depto_solicitante']],
                'trabajador_solicitante_id' => $trabajadores[$solicitud['depto_solicitante']], // El jefe del depto solicitante
                'desc_servicio' => $solicitud['desc_servicio'],
                'esta_enviada' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        User::create([
            'name' => 'Francisco Miranda',
            'email' => 'frsamirandaja@ittepic.edu.mx',
            'password' => bcrypt('12345678')
        ]);
    }
}
