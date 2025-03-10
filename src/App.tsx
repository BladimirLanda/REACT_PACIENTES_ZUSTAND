//COMPONENT APP
import { ToastContainer } from "react-toastify" //Notificaciones React: npm i react-toastify (https://www.npmjs.com/package/react-toastify)
import PacientForm from "./components/PacientForm"
import PacientsList from "./components/PacientsList"

/*
React-Toastify es una librería de notificaciones (o "toasts") para aplicaciones React. 
Permite mostrar mensajes emergentes (toasts) de manera fácil y personalizada para notificar 
a los usuarios sobre eventos o acciones en la aplicación, como el éxito de una operación, 
errores, advertencias, o cualquier otro tipo de mensaje temporal.

1) ToastContainer: Este es el contenedor donde se mostrarán todas las notificaciones. 
Debe ser incluido en tu componente, generalmente en el nivel más alto de tu aplicación, 
como en el App.js. Se encarga de renderizar y mostrar todos los toasts.

toast.success(): Muestra una notificación de éxito.
toast.error(): Muestra una notificación de error.
toast.info(): Muestra una notificación informativa.
toast.warning(): Muestra una notificación de advertencia.
toast.dark(): Muestra una notificación con estilo oscuro.
*/

function App() {

  //---VIEW---//
  return (
    <>
      <div className="mx-auto mt-20 container">
        <h1 className="font-black text-5xl text-center md:w-2/3 md:mx-auto">
          Seguimiento de Pacientes {''}
          <span className="text-indigo-700">Veterinaria</span>
        </h1>

        <div className="mt-12 md:flex">
          <PacientForm />
          <PacientsList />
        </div>
      </div>

      <ToastContainer />
    </>
  )
}

export default App
