//COMPONENT - ERROR
import { ReactNode } from "react";

//Type
type ErrorProps = {
  children: ReactNode
}

function Error( {children} : ErrorProps ) {
  return (
    <p className="my-4 p-3 text-sm uppercase font-bold text-center bg-red-600 text-white">
      {children}
    </p>
  )
}

export default Error;