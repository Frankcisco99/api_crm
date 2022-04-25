import React from 'react'

const Alerta = ({children}) => {
  return (
    <div className="bg-red-700 text-white text-center px-1 py-2 mt-2 font-bold rounded-md">{children}</div>
  )
}

export default Alerta