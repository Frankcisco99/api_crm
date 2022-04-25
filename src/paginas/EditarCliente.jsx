import Formulario from "../components/Formulario"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Spinner from "../components/Spinner"
const EditarCliente = () => {
  const {id} = useParams()
    const [cliente, setCliente] = useState({})
    const [cargando,setCargando] = useState(false)
    useEffect(()=>{
        const consultarAPI = async ()=>{
          setCargando(!cargando)
            try {
                const url = `http://localhost:4000/clientes/${id}`
                const respuesta = await fetch(url)
                const resultado = await respuesta.json()
                setCliente(resultado)
            } catch (error) {
                console.log(error)
            }
          setCargando(false) 
        }
        consultarAPI()
    },[])
  return (
    cargando ? <Spinner /> : (
      Object.keys(cliente).length === 0 ? "No Hay Resultados" :(
    <>
    <h1 className='text-4xl font-black text-blue-900'>Editar Cliente</h1>
    <p className='mt-3'>Utiliza este formulario para editar datos de un cliente</p>
    <Formulario  cliente={cliente} cargando = {cargando}/>
    </>
  ))
  )
}

export default EditarCliente