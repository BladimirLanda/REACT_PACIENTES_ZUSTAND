//TYPES

type Patient = {
    id: string,
    name: string,
    caretaker: string,
    email: string,
    date: Date,
    symptoms: string
}

type DraftPatient = Omit<Patient, 'id'>;

export type {
    Patient,
    DraftPatient
}