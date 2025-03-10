//COMPONENT PACIENT-FORM
import { useForm } from "react-hook-form" //Forms React: npm i react-hook-form (https://react-hook-form.com/docs)
import { toast } from "react-toastify" //Función react-toastify
import { DraftPatient } from "../types"
import Error from "./Error"
import { usePatientStore } from "../store/store";
import { useEffect } from "react";

function PacientForm() {
    /*
    React Hook Form es una librería para manejar formularios en React, que facilita 
    la validación y gestión del estado de los datos del formulario de manera eficiente. 
    Está optimizada para reducir las re-renderizaciones, lo que mejora el rendimiento de 
    la aplicación, especialmente cuando se manejan formularios complejos.

    -useForm(): Este hook es el que proporciona las funciones necesarias 
    para gestionar el formulario, como register, handleSubmit, y formState.

    -register: Es una función de React Hook Form que conecta los inputs del formulario 
    con el sistema de control y validación. Permite al formulario gestionar 
    el estado y la validación de los inputs.     
    ...register(campo: string, { RegisterOptions })
        *...register: Pasa todas las propiedades que register devuelve al input (value, handleChange...).
        *"campo": Registra el campo y le permite a React Hook Form gestionarlo.
        *{ RegisterOptions }: Define reglas de validación para el campo.

    -handleSubmit: Es la función que maneja la lógica al enviar el formulario, y 
    solo se ejecutará si la validación es exitosa, manejando los datos registrados.
    handleSubmit(e => SuccessFunction(e) ) 

    -setValue: Es una función que permite actualizar los valores de los campos de un formulario 
    de manera programática. A diferencia de reset, que restablece todos los valores del formulario 
    (y opcionalmente sus validaciones), setValue permite cambiar el valor de campos individuales 
    sin afectar a los demás.

    -reset: La función reset se utiliza para restablecer (o reiniciar) los valores 
    del formulario a un estado inicial. Esto es útil cuando quieres limpiar el formulario, 
    restaurar los valores predeterminados o incluso establecer nuevos valores predeterminados 
    después de que el formulario haya sido enviado o en algún otro evento.

    -formState: Es un objeto que contiene el estado actual del formulario. Este 
    estado incluye información importante sobre el formulario, como si está sucio, 
    si ha sido modificado, si hay errores, si se ha enviado correctamente, etc.
    formState: { errors, isDirty, isValid, isSubmitting, submitCount }
        1) errors: Se utiliza para mostrar el mensaje de error si los campos no son válidos.
        2) isDirty: Muestra un mensaje si el formulario ha sido modificado.
        3) isValid: Muestra si el formulario es válido o no.
        4) isSubmitting: Desactiva el botón de envío mientras el formulario se está enviando.
        5) submitCount: Muestra cuántas veces se ha enviado el formulario.
    */
    //State
    const { patients, activeId, addPatient, updatePatient } = usePatientStore();
    const { register, handleSubmit, setValue, reset, formState: { errors, isValid } } = useForm<DraftPatient>();

    useEffect(() => {
        if(activeId) {
            const activePatient = patients.filter(patient => patient.id === activeId)[0];
            setValue('name', activePatient.name);
            setValue('caretaker', activePatient.caretaker);
            setValue('email', activePatient.email);
            setValue('date', activePatient.date);
            setValue('symptoms', activePatient.symptoms);
        }
    }, [activeId]);

    //Funciones
    const registerPacient= (data : DraftPatient) => {

        if(activeId) {
            updatePatient(data);
            toast.info('¡Paciente Actualizado!');
        } else {
            addPatient(data);
            toast.success('¡Paciente Registrado!');

        }
        reset();
    }

    //---VIEW---//
    return (
        <div className="mx-5 md:w-1/2 lg:w-2/5">
            <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

            <p className="mb-10 mt-5 text-lg text-center">
                Añade Pacientes y {''}
                <span className="text-indigo-600 font-bold">Administralos</span>
            </p>

            <form className="py-10 px-5 mb-10 bg-white shadow-md rounded-lg" 
            onSubmit={ handleSubmit(registerPacient) }>
                {isValid && (
                    <div className="my-4 p-3 text-sm uppercase font-bold text-center bg-green-600 text-white">
                        Formulario Valido
                    </div>
                )}

                <div className="mb-5">
                    <label htmlFor="name" className="text-sm uppercase font-bold">
                        Paciente 
                    </label>

                    <input  
                    className="w-full p-3 border border-gray-100"  
                    id="name"
                    type="text" 
                    placeholder="Nombre del Paciente" 
                    { ...register("name", {
                        required: "El Nombre del Paciente es Obligatorio",
                        minLength: { value: 3, message: "El campo no puede tener menos de 3 caracteres" },
                        maxLength: { value: 10, message: "El campo no puede tener más de 10 caracteres" }
                    }) }
                    />

                    {errors.name && ( <Error>{errors.name?.message}</Error> )}
                </div>

                <div className="mb-5">
                    <label htmlFor="caretaker" className="text-sm uppercase font-bold">
                        Propietario 
                    </label>

                    <input  
                    className="w-full p-3 border border-gray-100"  
                    id="caretaker"
                    type="text" 
                    placeholder="Nombre del Propietario" 
                    { ...register("caretaker", {
                        required: "El Nombre del Propietario es Obligatorio",
                    }) }
                    />

                    {errors.caretaker && ( <Error>{errors.caretaker?.message}</Error> )}
                </div>

                <div className="mb-5">
                    <label htmlFor="email" className="text-sm uppercase font-bold">
                        Email 
                    </label>

                    <input  
                    className="w-full p-3 border border-gray-100"  
                    id="email"
                    type="email" 
                    placeholder="Email de Registro" 
                    {...register("email", {
                        required: "El Email es Obligatorio",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Email No Válido"
                        }
                    })} 
                    />

                    {errors.email && ( <Error>{errors.email?.message}</Error> )}
                </div>

                <div className="mb-5">
                    <label htmlFor="date" className="text-sm uppercase font-bold">
                        Fecha Alta 
                    </label>

                    <input  
                    className="w-full p-3 border border-gray-100"  
                    id="date"
                    type="date" 
                    { ...register("date", {
                        required: "La Fecha de Alta es Obligatorio",
                    }) }
                    />
                </div>

                {errors.date && ( <Error>{errors.date?.message}</Error> )}
                
                <div className="mb-5">
                    <label htmlFor="symptoms" className="text-sm uppercase font-bold">
                    Síntomas 
                    </label>
                    
                    <textarea  
                    id="symptoms"
                    className="w-full p-3 border border-gray-100"  
                    placeholder="Síntomas del paciente" 
                    { ...register("symptoms", {
                        required: "Los Sintomas son Obligatorios",
                    }) }
                    ></textarea>

                    {errors.symptoms && ( <Error>{errors.symptoms?.message}</Error> )}
                </div>

                <input
                type="submit"
                className="w-full p-3  bg-indigo-600 text-white uppercase font-bold cursor-pointer transition-colors hover:bg-indigo-700"
                value={activeId ? 'Guardar Edición' : 'Guardar Paciente'}
                />
            </form> 
        </div>
    )
}

export default PacientForm;