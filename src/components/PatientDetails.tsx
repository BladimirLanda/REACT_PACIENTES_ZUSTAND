//COMPONENT PATIENT-DETAILS
import { usePatientStore } from "../store/store"
import { toast } from "react-toastify"
import { Patient } from "../types"
import PatientDetailItem from "./PatientDetailItem"

//Type
type PatientDetailsProps = {
    patient: Patient,

}

function PatientDetails( { patient } : PatientDetailsProps ) {
    //State
    const { deletePatient, getPatientById } = usePatientStore();

    //Eventos
    const handleClick = () => {
        deletePatient(patient.id);
        toast.error('¡Paciente Eliminado!');
    }
 
    //---VIEW---//
    return (
        <div className="mx-5 my-10 px-5 py-10 bg-white shadow-md rounded-xl">
            <PatientDetailItem  label={"ID"} data={patient.id} />
            <PatientDetailItem  label={"Nombre"} data={patient.name} />
            <PatientDetailItem  label={"Propietario"} data={patient.caretaker} />
            <PatientDetailItem  label={"Email"} data={patient.email} />
            <PatientDetailItem  label={"Fecha Alta"} data={patient.date.toString()} />
            <PatientDetailItem  label={"Sintomas"} data={patient.symptoms} />

            <div className="mt-10 flex flex-col gap-3 lg:flex-row justify-between">
                <button type="button" className="py-2 px-10 text-white font-bold uppercase rounded-lg
                bg-indigo-600 hover:bg-indigo-700" onClick={() => getPatientById(patient.id)}>
                    Editar
                </button>

                <button type="button" className="py-2 px-10 text-white font-bold uppercase rounded-lg
                bg-red-600 hover:bg-red-700" onClick={ handleClick }>
                    Eliminar
                </button>
            </div>
        </div>
    )
}

export default PatientDetails