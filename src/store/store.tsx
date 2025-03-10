//STORE
import { create } from "zustand"; //Zustant React: npm install zustand (https://www.npmjs.com/package/zustand)
import { devtools, persist } from "zustand/middleware"; //Middlewares Zustant React
import { v4 as uuidv4 } from "uuid" //Id's: npm i uuid
import { DraftPatient, Patient } from "../types";

/*
Zustand es una librería de manejo de estado para aplicaciones React, diseñada para ser 
sencilla y flexible. Su nombre proviene del alemán y significa "estado" o "condición". 
A diferencia de otras soluciones como Redux o Context API, Zustand es minimalista y 
fácil de usar, con una API muy simple que facilita la gestión del estado global de la aplicación.

1) create:
create es una función proporcionada por Zustand para crear un "store" o contenedor de estado. 
Este store es donde defines el estado global de tu aplicación y las funciones que lo manipulan. 
Cuando usas create, defines la estructura inicial de tu estado y las funciones que puedes usar 
para actualizar ese estado.

2) set:
set es una función que te permite actualizar el estado dentro del store. Es el mecanismo por 
el cual se cambian los valores del estado. Recibe una función que recibe el estado actual (llamado state) 
y devuelve el nuevo estado que deseas establecer.

3) state:
state es el objeto que contiene todo el estado actual del store. Es el valor completo del estado en ese 
momento. Cuando usas set, puedes acceder a este state para hacer referencias o cálculos sobre el estado 
actual antes de devolver el nuevo estado.

Middlewares :
1) devtools:
El middleware devtools se utiliza para integrar el store de Zustand con las herramientas 
de desarrollo de Redux DevTools. Esto permite hacer un seguimiento de los cambios en el 
estado de la aplicación, retroceder en el tiempo, y ver las acciones que modifican el estado. 
Es una característica útil para el desarrollo, ya que facilita la depuración y el análisis del 
flujo de datos. Cada vez que el estado cambie , las acciones se podrán ver en la extensión 
de Redux DevTools del navegador.

2) persist:
El middleware persist permite guardar el estado de tu store en el almacenamiento local del navegador 
(por ejemplo, localStorage o sessionStorage). Esto es útil cuando quieres que el estado de tu aplicación 
persista incluso después de que el usuario cierre la pestaña o recargue la página. Por default se
almacenará en LocalStorage.
'storage: createJSONStorage(() => sessionStorage)'

ESTRUCTURA:
create<PatientState>(): Creación del Store como función de orden superior
(devtools(persist(...))): Encadenamiento y orden correcto de los Middlewares

*/

//Type
type PatientState = {
    patients: Patient[],
    activeId: Patient['id'],
    addPatient: (data: DraftPatient) => void,
    deletePatient: (id : Patient['id']) => void,
    getPatientById: (id : Patient['id']) => void,
    updatePatient: (data: DraftPatient) => void
}

//Funciones
const createPatient = (patient : DraftPatient) : Patient => {
    return {
        ...patient,
        id: uuidv4()
    }
}

//Store
export const usePatientStore = create<PatientState>()(
    devtools(
        persist(
            (set) => ({
                patients: [],
                activeId: '',

                addPatient: (data) => {
                    const newPatient = createPatient(data);

                    set((state) => ({
                        patients: [...state.patients, newPatient]
                    }));
                },

                deletePatient: (id) => {
                    set((state) => ({
                        patients: state.patients.filter( patient => patient.id !== id )
                    }));
                },

                getPatientById: (id) => {
                    set(() => ({
                        activeId: id
                    }));
                },

                updatePatient: (data) => {
                    set((state) => ({
                        patients: state.patients.map( patient => patient.id === state.activeId ?
                            {...data, id:state.activeId} : patient),
                        activeId: ''
                    }));
                }
            }),
        {name: 'patient-storage'})
    )
);