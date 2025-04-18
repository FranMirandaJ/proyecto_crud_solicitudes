<?php

use App\Http\Controllers\GenerarFolio;
use App\Http\Controllers\GenerarFolioController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SolicitudesController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

Route::prefix('dashboard')->group(function () {
    Route::get('solicitudes', [SolicitudesController::class,'index'])->name('solicitudes.index');
    Route::get('solicitudes/create', [SolicitudesController::class,'create'])->name('solicitudes.create');
});

Route::prefix('dashboard')->group(function () {
    Route::get('generar_folio', [GenerarFolioController::class,'index'])->name('generarFolio.index');
});

require __DIR__.'/auth.php';