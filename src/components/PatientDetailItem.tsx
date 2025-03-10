//COMPONENT PATIENT-DETAIL-ITEM

//Type
type PatientDetailItemProps = {
    label: string,
    data: string
}

function PatientDetailItem( {label, data} : PatientDetailItemProps ) {
  return (
    <p className="mb-3 font-bold text-gray-700 uppercase">
        {label}: {''}
        <span className="font-normal normal-case">{data}</span>
    </p>
  )
}

export default PatientDetailItem