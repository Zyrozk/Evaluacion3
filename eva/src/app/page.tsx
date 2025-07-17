'use client'
import React, { useEffect, useState } from "react"
import { Evento } from "./interfaces/iEvento"
import { Beneficiario } from "./interfaces/iBeneficiario"
import { Proyecto } from "./interfaces/iProyecto"
import { RegistroBeneficiario } from "./componentes/RegistroBeneficiario"
import { RegistroProyecto } from "./componentes/RegistroProyecto"
import { RegistroEvento, obtenerEventos } from "./Firebase/Promesas"


export default function Home(){

const initialStateEvento:Evento = {
  nombreEven : "",
  fecha : "",
  direccion : ""
}

const initialStateBeneficiario:Beneficiario = {
  nombre : "",
  apellido : "",
  telefono : 0,
  rol : ""
}

const initialStateProyecto:Proyecto = {
  nombreProye : "",
  objetivo : "",
  personaAcargo : ""
}

const [evento, setEvento] = useState(initialStateEvento)
const [eventos, setEventos] = useState<Evento[]>([])
const [EventoIndex, setEventoIndex] = useState<number | null>(null)
const [ErrorNombreEvento, setErrorNombreEvento] = useState("")
const [ErrorDireccionEvento, setErrorDireccionEvento] = useState("")


const [beneficiario, setBeneficiario] = useState(initialStateBeneficiario)
const [beneficiarios, setBeneficiarios] = useState<Beneficiario[]>([])
const [BeneficiarioIndex, setBeneficiarioIndex] = useState<number | null>(null)
const [ErrorNombreBeneficiario, setErrorNombreBeneficiario] = useState("")
const [ErrorApellidoBeneficiario, setErrorApellidoBeneficiario] = useState("")
const [ErrorTelefonoBeneficiario, setErrorTelefonoBeneficiario] = useState("")


const [proyecto, setProyecto] = useState(initialStateProyecto)
const [proyectos, setProyectos] = useState<Proyecto[]>([])
const [ProyectoIndex, setProyectoIndex] = useState<number | null>(null)
const [ErrorNombreProyecto, setErrorNombreProyecto] = useState("")
const [ErrorObjetivoProyecto, setErrorObjetivoProyecto] = useState("")
const [ErrorCargoProyecto, setErrorCargoProyecto] = useState("")

useEffect(() =>{
  obtenerEventos().then(setEventos)
},[])

useEffect(() =>{
  let lisBeneficiario = localStorage.getItem("beneficiarios")
  if(lisBeneficiario != null){
    let listadoB =  JSON.parse(lisBeneficiario)
    setBeneficiarios(listadoB)
  }
},[])

useEffect(() =>{
  let lisProyecto = localStorage.getItem("proyectos")
  if(lisProyecto != null){
    let listadoP = JSON.parse(lisProyecto)
    setProyectos(listadoP)
  }
},[])

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, stateSetter: Function, state: any, errorSetter?: Function) => {
 const {name, value} = e.target
 stateSetter({...state, [name]: name === "telefono" ? Number(value): value})
}

const handleErrorEvento = (e: React.ChangeEvent<HTMLInputElement>) => {
  const {name, value} = e.target
  setEvento({...evento, [name]: value})
  if (name === "nombreEven") {
    if(value.length < 3) {
      setErrorNombreEvento("El nombre del evento debe tener al menos 3 letras")
      return
    }
    if (!/^[A-Za-zÁÉÍÓÚáéíóú\s]+$/.test(value)) {
      setErrorNombreEvento("solo se permiten letras")
      return
    }
  
    setErrorNombreEvento("")
  }

    if (name === "direccion") {
      if(value.length < 3) {
        setErrorDireccionEvento("La dirección debe tener al menos 3 letras")
        return
      }
      if (!/^[A-Za-zÁÉÍÓÚáéíóú0-9\s]+$/.test(value)) {
        setErrorDireccionEvento("solo se permiten letras y números")
        return
      }
    }
    setErrorDireccionEvento("")
}

const handleRegistrarEvento = async ()=>{
  if(
    evento.nombreEven.trim() === "" || evento.fecha.trim() === "" || evento.direccion.trim() === ""
  ) {
    alert("Debes rellenar todos los campos")
    return
  }
  if(ErrorNombreEvento !== "" || ErrorDireccionEvento !== ""){
    alert("Corrige los errores antes de registrar")
    return
  }
  const confirmar = window.confirm(EventoIndex !== null ? "¿Estás seguro de actualizar este evento?" : "¿Estás seguro de registrar este evento?")
  if(!confirmar){
    return
  }
    if (EventoIndex !== null) {
      await actualizarEvento(eventos[EventoIndex].id, evento)
      setEventoIndex(null)
    } else {
      await RegistroEvento(evento)
    }

    setEvento(initialStateEvento)
    obtenerEventos().then(setEventos)
}

const handleErrorBeneficiario = (e: React.ChangeEvent<HTMLInputElement>) => {
  const {name, value} = e.target
  setBeneficiario({...beneficiario, [name]: value})
  if (name === "nombre") {
    if(value.length < 3) {
      setErrorNombreBeneficiario("El nombre debe tener al menos 3 letras")
      return
    }
    if (!/^[A-Za-zÁÉÍÓÚáéíóú\s]+$/.test(value)) {
      setErrorNombreBeneficiario("solo se permiten letras")
      return
    }
  
    setErrorNombreBeneficiario("")
  }

    if (name === "apellido") {
      if(value.length < 3) {
        setErrorApellidoBeneficiario("El apellidoo debe tener al menos 3 letras")
        return
      }
      if (!/^[A-Za-zÁÉÍÓÚáéíóú\s]+$/.test(value)) {
        setErrorApellidoBeneficiario("solo se permiten letras")
        return
      }
    }
    setErrorApellidoBeneficiario("")
}

const handleErrorTelefonoBeneficiario = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value
  if (value.length !== 9 ) {
    setErrorTelefonoBeneficiario("El teléfono debe tener 9 dígitos")
  } else {
    setErrorTelefonoBeneficiario("")
  }
  setBeneficiario({...beneficiario, telefono: Number(value)})
}
  
const handleRegistrarBeneficiario = ()=>{
  if(
    beneficiario.nombre.trim() === "" || beneficiario.apellido.trim() === "" || beneficiario.telefono.toString().trim() === "" || beneficiario.rol.trim() === ""
  ) {
    alert("Debes rellenar todos los campos")
    return
  }
  if(ErrorNombreBeneficiario !== "" || ErrorApellidoBeneficiario !== "" || ErrorTelefonoBeneficiario !== ""){
    alert("Corrige los errores antes de registrar")
    return
  }
  const confirmar = window.confirm(BeneficiarioIndex !== null ? "¿Estás seguro de actualizar este beneficiario?" : "¿Estás seguro de registrar este benefeciario?")
  if(!confirmar){
    return
  }
  if (BeneficiarioIndex !== null) { 
      const actualizarB = [...beneficiarios]
      actualizarB[BeneficiarioIndex] = beneficiario
      setBeneficiarios(actualizarB)
      miStorage.setItem("beneficiarios",JSON.stringify(actualizarB))
      setBeneficiarioIndex(null)
      setBeneficiario(initialStateBeneficiario)
} else {
  const listaB = [...beneficiarios, beneficiario]
  setBeneficiarios(listaB)
  miStorage.setItem("beneficiarios", JSON.stringify(listaB))
  setBeneficiario(initialStateBeneficiario)
 }
}

const handleErrorProyecto = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const {name, value} = e.target
  setProyecto({...proyecto, [name]: value})
  if (name === "nombreProye") {
    if(value.length < 3) {
      setErrorNombreProyecto("El nombre del proyecto debe tener al menos 3 letras")
      return
    }
    if (!/^[A-Za-zÁÉÍÓÚáéíóú\s]+$/.test(value)) {
      setErrorNombreProyecto("solo se permiten letras")
      return
    }
  
    setErrorNombreProyecto("")
  }

    if (name === "objetivo") {
      if(value.trim().length < 3) {
        setErrorObjetivoProyecto("El objetivo debe tener al menos 3 caracteres")
        return
      }
    setErrorObjetivoProyecto("")
  }
    if (name === "personaAcargo") {
      if(value.length < 3) {
        setErrorCargoProyecto("Persona a cargo debe tener al menos 3 letras")
        return
    }
    if (!/^[A-Za-zÁÉÍÓÚáéíóú\s]+$/.test(value)) {
      setErrorCargoProyecto("solo se permiten letras")
      return
      }
    setErrorCargoProyecto("")
 }
}

const handleRegistrarProyecto = ()=>{
  if(
    proyecto.nombreProye.trim() === "" || proyecto.objetivo.trim() === "" || proyecto.personaAcargo.trim() === "" 
  ) {
    alert("Debes rellenar todos los campos")
    return
  }
  if(ErrorNombreProyecto !== "" || ErrorObjetivoProyecto !== ""){
    alert("Corrige los errores antes de registrar")
    return
  }
  const confirmar = window.confirm(BeneficiarioIndex !== null ? "¿Estás seguro de actualizar este proyecto?" : "¿Estás seguro de registrar este proyecto?")
  if(!confirmar){
    return
  }
  if (ProyectoIndex !== null) {
   {  
      const actualizarP = [...proyectos]
      actualizarP[ProyectoIndex] = proyecto
      setProyectos(actualizarP)
      miStorage.setItem("proyectos",JSON.stringify(actualizarP))
      setProyectoIndex(null)
      setProyecto(initialStateProyecto)
  }
} else {
  const listaP = [...proyectos, proyecto]
  setProyectos(listaP)
  miStorage.setItem("proyectos", JSON.stringify(listaP))
  }
}  

const actualizarEvento = (index: number) =>{
  setEvento(eventos[index])
  setEventoIndex(index)
}

const actualizarBeneficiario = (index: number) =>{
  setBeneficiario(beneficiarios[index])
  setBeneficiarioIndex(index)
}

const actualizarProyecto = (index: number) =>{
  setProyecto(proyectos[index])
  setProyectoIndex(index)
}

const eliminarEvento = (index: number) => {
  if (confirm("¿Está seguro de eliminar este evento?")) {
    const listaE = eventos.filter((_, i) => i !== index)
    setEventos(listaE)
    miStorage.setItem("eventos", JSON.stringify(listaE))
  }
}

const eliminarBeneficiario = (index: number) => {
  if (confirm("¿Está seguro de eliminar este beneficiario?")) {
    const listaB = beneficiarios.filter((_, i) => i !== index)
    setBeneficiarios(listaB)
    miStorage.setItem("beneficiarios", JSON.stringify(listaB))
  }
}

const eliminarProyecto = (index: number) => {
  if (confirm("¿Está seguro de eliminar este proyecto?")) {
    const listaP = proyectos.filter((_, i) => i !== index)
    setProyectos(listaP)
    miStorage.setItem("proyectos", JSON.stringify(listaP))
  }
}


return (
  <>
  <section>
    <form>
      <h1>Bienvenido</h1>
     <RegistroEvento></RegistroEvento>
      <input
          name="nombreEven"
          type="text"
          placeholder="Ingrese el nombre del evento"
          value={evento.nombreEven}
          onChange={handleErrorEvento}/><br/>
          {ErrorNombreEvento && (<span>{ErrorNombreEvento}</span>)}
      <input
          name="fecha"
          type="date"
          placeholder="Ingrese la fecha"
          value={evento.fecha}
          onChange={(e)=>{handleInputChange(e, setEvento, evento)}}/><br/>
      <input
          name="direccion"
          type="text"
          placeholder="Ingrese direccion"
          value={evento.direccion}
          onChange={handleErrorEvento}/><br/>
          {ErrorDireccionEvento && (<span>{ErrorDireccionEvento}</span>)}<br/>
        <button type="button"
        onClick={(handleRegistrarEvento)}>{EventoIndex !== null ? "Actualizar Evento" : "Registrar Evento"}</button>
    </form>
    <form>
      <RegistroBeneficiario></RegistroBeneficiario>
      <input
          name="nombre"
          type="text"
          placeholder="Ingrese su nombre"
          value={beneficiario.nombre}
          onChange={handleErrorBeneficiario}/><br/>
          {ErrorNombreBeneficiario && (<span>{ErrorNombreBeneficiario}</span>)}
      <input
          name="apellido"
         type="text"
          placeholder="Ingrese su apellido"
          value={beneficiario.apellido}
          onChange={handleErrorBeneficiario}/><br/>
          {ErrorApellidoBeneficiario && (<span>{ErrorApellidoBeneficiario}</span>)}
     <input
         name="telefono"
          type="text"
          placeholder="Ingrese su teléfono"
          value={beneficiario.telefono}
          onChange={handleErrorTelefonoBeneficiario}/><br/>
          {ErrorTelefonoBeneficiario && <span>{ErrorTelefonoBeneficiario}</span>}
      <select
          name="rol"
          value={beneficiario.rol}
          onChange={(e)=>{handleInputChange(e, setBeneficiario, beneficiario)}}>
          <option value="">Seleccione un rol</option>
          <option value="Estudiante">Estudiante</option>
          <option value="Profesor">Profesor</option>
          <option value="Ayudante">Ayudante</option>
          <option value="Coordinador">Coordinador</option>
      </select>
      <button
        onClick={(handleRegistrarBeneficiario)}>{BeneficiarioIndex !== null ? "Actualizar Beneficiario" : "Registrar Beneficiario"}</button> 
    </form>
    <form>
      <RegistroProyecto></RegistroProyecto>
      <input
          name="nombreProye"
          type="text"
          placeholder="Ingrese el nombre del proyecto"
          value={proyecto.nombreProye}
          onChange={handleErrorProyecto}/><br/>
          {ErrorNombreProyecto && <span>{ErrorNombreProyecto}</span>}
      <textarea
          id="objetivo"
          name="objetivo"
          placeholder="Ingrese objetivo"
          rows={4}
          cols={40}
          value={proyecto.objetivo}
          onChange={handleErrorProyecto}/><br/>
          {ErrorObjetivoProyecto && <span>{ErrorObjetivoProyecto}</span>}
      <input
          name="personaAcargo"
          type="text"
          placeholder="Ingrese nombre de encargado"
          value={proyecto.personaAcargo}
          onChange={handleErrorProyecto}/><br/>
          {ErrorCargoProyecto && <span>{ErrorCargoProyecto}</span>}
      <button
        onClick={(handleRegistrarProyecto)}>{ProyectoIndex !== null ? "Actualizar Proyecto" : "Registrar Proyecto"}</button> 
    </form>
  </section>
  <section>
    <h2>Eventos registrados</h2>
    <ul>
      {eventos.map((e, i) => (
        <li key={i}>
          {e.nombreEven} - {e.fecha} - {e.direccion}
          <button onClick={() => actualizarEvento(i)}>Actualizar</button>
          <button onClick={() => eliminarEvento(i)}>Eliminar</button>
        </li>
      ))}
    </ul>

    <h2>Beneficiarios registrados</h2>
    <ul>
      {beneficiarios.map((e, i) => (
        <li key={i}>
          {e.nombre} - {e.apellido} - {e.telefono} - {e.rol}
          <button onClick={() => actualizarBeneficiario(i)}>Actualizar</button>
          <button onClick={() => eliminarBeneficiario(i)}>Eliminar</button>
        </li>
      ))}
    </ul>

    <h2>Proyectos registrados</h2>
    <ul>
      {proyectos.map((e, i) => (
        <li key={i}>
          {e.nombreProye} - {e.objetivo} - {e.personaAcargo}
          <button onClick={() => actualizarProyecto(i)}>Actualizar</button>
          <button onClick={() => eliminarProyecto(i)}>Eliminar</button>
        </li>
      ))}
    </ul>
  </section>
  </> 
)
}
