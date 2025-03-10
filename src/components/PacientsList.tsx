//COMPONENT PACIENTS-LIST
import { usePatientStore } from "../store/store";
import PatientDetails from "./PatientDetails";

function PacientsList() {
    //State
    const { patients } = usePatientStore();

    //---VIEW---//
    return (
        <div className="overflow-y-scroll md:w-1/2 lg:w-3/5 md:h-screen">
            {patients.length ? (
                <>
                    <h2 className="font-black text-3xl text-center">Listado de Pacientes</h2>
                    <p className="mt-5 mb-10 text-center text-xl">
                        Administra tus {''}
                        <span className="text-indigo-600 font-bold">Pacientes y Citas</span>
                    </p>
                    {patients.map(patient => (
                        <PatientDetails key={patient.id} patient={patient} />
                    ))}
                </>
            ) : (
                <>
                    <h2 className="font-black text-3xl text-center">No Hay Pacientes</h2>
                    <p className="mt-5 mb-10 text-center text-xl">
                        Comienza agregando pacientes {''}
                        <span className="text-indigo-600 font-bold">y aparecerán aquí</span>
                    </p>
                </>
            )}
        </div>
    )
}

export default PacientsList;