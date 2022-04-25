import React from 'react'
import { Formik, Form , Field } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from "yup"
import Alerta from './Alerta'
import Spinner from './Spinner'
const Formulario = ({cliente, cargando}) => {
  const navegar = useNavigate()
  const nuevoClienteSchema = Yup.object().shape({
    nombre: Yup.string()
               .min(3, "El nombre es demasiado corto")
               .max(20, "El nombre es demasiado largo")
               .required("El nombre del cliente es obligatorio"),
    empresa: Yup.string()
                .required("El nombre de la empresa es obligatorio"),
    email: Yup.string()
              .email("Email no valido")
              .required("Email es obligatorio"),
    telefono: Yup.number()
                 .positive("Numero no valido")
                 .integer("Numero no valido")
                 .typeError("El numero no es valido")
  })
  const handleSubmit = async (valores) =>{
    try {
      let respuesta 
      if(cliente.id){
      const url = `http://localhost:4000/clientes/${cliente.id}`
      const respuesta = await fetch(url,{
        method: 'PUT',
        body: JSON.stringify(valores),
        headers: {
          'Content-Type' : 'application/json'
        }
      })
      }
      else{
      const url = "http://localhost:4000/clientes"
      const respuesta = await fetch(url,{
        method: 'POST',
        body: JSON.stringify(valores),
        headers: {
          'Content-Type' : 'application/json'
        }
      })
      
      }
    await respuesta.json()  
    } catch (error) {
      console.log(error);
    }
  }
  return (
    cargando ? <Spinner /> : (
    <div className='bg-white px-5 py-10 mt-5 rounded-md shadow-md md:w-3/4 mx-auto'>
        <h1 
        className='text-gray-600 font-bold text-xl uppercase text-center '
        >{cliente.nombre ? "Editar Cliente" : "Agregar Cliente"}</h1>

        <Formik
          validationSchema={nuevoClienteSchema} 
          initialValues={{
            nombre: cliente.nombre ? cliente.nombre : "",
            empresa: cliente.empresa ? cliente.empresa : "",
            email: cliente.email ? cliente.email : "",
            telefono: cliente.telefono ? cliente.telefono : "",
            notas: cliente.notas ? cliente.notas : ""
          }}
          enableReinitialize={true}
          onSubmit={ async (values, {resetForm})=>{
            await handleSubmit(values)
            resetForm()
            navegar("/clientes")
          }}
        >
        {({errors, touched})=>{ 
          return(
          <Form  className="mt-5">
          <div className='mb-4'>
            <label className='block text-gray-800' htmlFor='name'>Nombre:</label>
            <Field
              type= "text"
              id="name"
              placeholder = "Nombre Cliente"
              className="w-full bg-gray-100 p-3 mt-2"
              name="nombre"
            />
            {errors.nombre && touched.nombre ?
            <Alerta>{errors.nombre}</Alerta> 
             : null}
          </div>
          <div className='mb-4'>
            <label className='block text-gray-800' htmlFor='empresa'>Empresa:</label>
            <Field
              type= "text"
              id="empresa"
              placeholder = "Empresa Cliente"
              className="w-full bg-gray-100 p-3 mt-2"
              name="empresa"
            />
            {errors.empresa && touched.empresa ?
            <Alerta>{errors.empresa}</Alerta> 
             : null}
          </div>
          <div className='mb-4'>
            <label className='block text-gray-800' htmlFor='email'>Email:</label>
            <Field
              type= "email"
              id="email"
              placeholder = "Email Cliente"
              className="w-full bg-gray-100 p-3 mt-2"
              name="email"
            />
            {errors.email && touched.email ?
            <Alerta>{errors.email}</Alerta> 
             : null}
          </div>
          <div className='mb-4'>
            <label className='block text-gray-800' htmlFor='phone'>Telefono:</label>
            <Field
              type= "tel"
              id="phone"
              placeholder = "Telefono Cliente"
              className="w-full bg-gray-100 p-3 mt-2"
              name="telefono"
            />
            {errors.telefono && touched.telefono ?
            <Alerta>{errors.telefono}</Alerta> 
             : null}
          </div>
          <div className='mb-4'>
            <label className='block text-gray-800' htmlFor='notes'>Notas:</label>
            <Field
              as="textarea"
              type= "text"
              id="notes"
              placeholder = "Notas Cliente"
              className="w-full bg-gray-100 p-3 mt-2 h-40"
              name="notas"
            />
          </div>

          <input
            className='w-full bg-blue-600 text-white font-bold px-2 py-3 hover:bg-blue-900 cursor-pointer rounded-md'
            type="submit"
            value={cliente.nombre ? "Editar Cliente" : "Agregar Cliente"}
          />
          </Form>
          )}}
        </Formik>
    </div>
    )
  )
}

Formulario.defaultProps = {
  cliente : {}
}
export default Formulario