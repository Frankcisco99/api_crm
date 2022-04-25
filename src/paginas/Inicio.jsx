import {useState, useEffect} from 'react'
import Cliente from '../components/Cliente'
import Spinner from '../components/Spinner'

const Inicio = () => {
  const [clientes, setClientes] = useState([])
  const [cargando, setCargando] = useState(false)
  useEffect(()=>{
    const consultarAPI = async ()=>{
    setCargando(!cargando)
    try{
    const url = "http://localhost:4000/clientes"
    const respuesta = await fetch(url)
    const resultado = await respuesta.json()
    setClientes(resultado)
    }
    catch (error){
        console.log(error)
    }
    setCargando(false)
    }

    consultarAPI()
  },[])
  
  const handleEliminar = async (id) =>{
    const confirmar = confirm("¿Deseas eliminar a este cliente?")
    if(confirmar){
    try {
      const url = `http://localhost:4000/clientes/${id}`
      const respuesta = await fetch(url, {
        method: "DELETE"
      })
      await respuesta.json()

      const newArray = clientes.filter( (cliente) => cliente.id !== id)
      setClientes(newArray)
    } catch (error) {
      console.log(error)
    }
  }
  }

  return (
    <>
    <h1 className='text-4xl font-black text-blue-900'>Clientes</h1>
    <p className='mt-3'>Administra tus clientes</p>
    {cargando ? <Spinner /> : Object.keys(clientes).length === 0 ? "No Hay Resultados" :(
    <table className='w-full mt-5 table-auto shadow bg-white'>
      <thead className='bg-blue-800 text-white'>
        <tr>
          <th className='p-2'>Nombre</th>
          <th className='p-2'>Contacto</th>
          <th className='p-2'>Empresa</th>
          <th className='p-2'>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {clientes.map(cliente =>(
          <Cliente 
            key={cliente.id}
            cliente={cliente}
            handleEliminar = {handleEliminar}
          />
        ))}
      </tbody>
    </table>
    )}
    </>
  )
}

export default Inicio