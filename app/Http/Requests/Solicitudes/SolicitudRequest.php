<?php

namespace App\Http\Requests\Solicitudes;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class SolicitudRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check();
    }

    public function rules(): array
    {
        return [
            'depto_solicitado_id' => 'required',
            'depto_solicitante_id' => 'required',
            'desc_servicio' => 'required|max:500',
        ];
    }

    public function messages(): array
    {
        return [
            'depto_solicitado_id.required' => 'El departamento solicitado es obligatorio.',
            'depto_solicitante_id.required' => 'El departamento solicitante es obligatorio.',
            'desc_servicio.required' => 'La descripción del servicio es obligatoria.',
            'desc_servicio.max' => 'La descripción no debe tener más de 500 caracteres.',
        ];
    }
}
