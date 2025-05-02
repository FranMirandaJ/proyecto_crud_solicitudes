<?php

use App\Http\Controllers\GenerarFolioController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SolicitudesController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::resource('solicitudes', SolicitudesController::class)
    ->middleware(['auth', 'verified'])
    ->names('solicitudes');
Route::put('/solicitudes/{solicitud}/enviar', [SolicitudesController::class, 'send'])->name('solicitudes.send');
Route::put('/solicitudes/{solicitud}/setFolio', [SolicitudesController::class, 'setFolio'])->name('solicitudes.setFolio');

Route::resource('generar_folio', GenerarFolioController::class)
    ->middleware(['auth', 'verified'])
    ->only(['index', 'store'])
    ->names('generar_folio');

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});





require __DIR__ . '/auth.php';
