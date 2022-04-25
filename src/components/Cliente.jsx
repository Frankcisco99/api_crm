import React from 'react'
import { useNavigate } from 'react-router-dom'
const Cliente = ({cliente, handleEliminar}) => {
  const navigate = useNavigate()
  const {nombre, empresa, email, telefono, notas, id} = cliente
  return (
    <tr className='border-b hover:bg-gray-50'>
        <td className='p-3'>{nombre}</td>
        <td className='p-3'>
        <p><span className='text-gray-800 uppercase font-bold'>Email: </span> {email}</p>
        <p><span className='text-gray-800 uppercase font-bold'>Telefono: </span> {telefono}</p>
        
        </td>
        <td className='p-3'>{empresa}</td>
        <td className='p-3'>
            <button 
            className='bg-yellow-500 text-white uppercase w-full p-2 block hover:bg-yellow-600 font-bold'
            onClick={()=> navigate(`/clientes/${id}`)}
            >Ver</button>
            <button 
            className='bg-blue-500 text-white uppercase w-full p-2 block hover:bg-blue-600 mt-3 font-bold'
            onClick={()=> navigate(`/clientes/editar/${id}`)}
            >Editar</button>
            <button 
            className='bg-red-500 text-white uppercase w-full p-2 block hover:bg-red-600 mt-3 font-bold'
            onClick={()=> handleEliminar(id)}
            >Eliminar</button>
        </td>
    </tr>
  )
}

export default Cliente