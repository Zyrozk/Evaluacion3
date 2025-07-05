'use client'
import { useEffect, useState } from "react"
import { Evento } from "./interfaces/iEvento"
import { Beneficiario } from "./interfaces/iBeneficiario"
import { Proyecto } from "./interfaces/iProyecto"
import RegistroEvento from "./componentes/RegistroEvento"
import RegistroBeneficiario from "./componentes/RegistroBeneficiario"
import { RegistroProyecto } from "./componentes/RegistroProyecto"

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

export default function Home(){

const miStorage = window.localStorage
const [evento, setEvento] = useState(initialStateEvento)
const [eventos, setEventos] = useState<Evento[]>([])
const [EventoIndex, setEventoIndex] = useState<number | null>(null)


const [beneficiario, setBeneficiario] = useState(initialStateBeneficiario)
const [beneficiarios, setBeneficiarios] = useState<Beneficiario[]>([])
const [BeneficiarioIndex, setBeneficiarioIndex] = useState<number | null>(null)


const [proyecto, setProyecto] = useState(initialStateProyecto)
const [proyectos, setProyectos] = useState<Proyecto[]>([])
const [ProyectoIndex, setProyectoIndex] = useState<number | null>(null)


useEffect(() =>{
  let lisEvento = miStorage.getItem("eventos")
  if(lisEvento != null){
    let listadoE = JSON.parse(lisEvento)
    setEventos(listadoE)
  }
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

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, stateSetter: Function, state: any) => {
 const {name, value} = e.target
 stateSetter({...state, [name]: name === "telefono" ? Number(value) : value}) 
}

const handleRegistrarEvento = ()=>{
  if (EventoIndex !== null) {
    if (confirm("agrega texto despues")) {
      const actualizaR = [...eventos]
      actualizaR[EventoIndex] = evento
      setEventos(actualizaR)
      miStorage.setItem("eventos",JSON.stringify(actualizaR))
      setEventoIndex(null)
      setEvento(initialStateEvento)
  }
} else {
  const listaE = [...eventos, evento]
  setEventos(listaE)
  miStorage.setItem("eventos", JSON.stringify(listaE))
 } 
}

  
const handleRegistrarBeneficiario = ()=>{
  miStorage.setItem("beneficiarios",JSON.stringify([...beneficiarios,beneficiario]))
  }
  const handleBeneficiario = (name:string, value:string)=>{
    setBeneficiario(
      {...beneficiario, [name] : value}
    )
  }


const handleRegistrarProyecto = ()=>{
  miStorage.setItem("proyectos",JSON.stringify([...proyectos, proyecto]))
  }
  const handleProyecto = (name:string, value:string)=>{
    setProyecto(
      {...proyecto, [name] : value}
    )
  }

const actualizarEvento = (index: number) =>{
  setEvento(eventos[index])
  setEventoIndex(index)
}



return (
  <>
  <section>
    <form>
      <h1>Bienvenido</h1>
     <RegistroEvento></RegistroEvento>
     <>
      <input
          name="nombreEven"
          type="text"
          placeholder="Ingrese el nombre del evento"
          value={evento.nombreEven}
          onChange={(e)=>{handleInputChange(e, setEvento, evento)}}/><br/>
      </>
      <>
      <input
          name="fecha"
          type="text"
          placeholder="Ingrese la fecha"
          value={evento.fecha}
          onChange={(e)=>{handleInputChange(e, setEvento, evento)}}/><br/>
      </>
      <>
      <input
          name="direccion"
          type="text"
          placeholder="Ingrese direccion"
          value={evento.direccion}
          onChange={(e)=>{handleInputChange(e, setEvento, evento)}}/><br/>
      </>
        <button
        onClick={(handleRegistrarEvento)}>{EventoIndex !== null ? "Actualizar Evento" : "Registrar Evento"}</button>
    </form>
    <form>
      <RegistroBeneficiario></RegistroBeneficiario>
      <input
          name="nombre"
          type="text"
          placeholder="Ingrese su nombre"
          onChange={(e)=>{handleBeneficiario(e.currentTarget.name,e.currentTarget.value)}}/><br/>
      <input
          name="apellido"
         type="text"
          placeholder="Ingrese su apellido"
          onChange={(e)=>{handleBeneficiario(e.currentTarget.name,e.currentTarget.value)}}/><br/>
     <input
         name="telefono"
          type="text"
          placeholder="Ingrese su teléfono"
          onChange={(e)=>{handleBeneficiario(e.currentTarget.name,e.currentTarget.value)}}/><br/>
      <input
          name="rol"
          type="text"
          placeholder="Ingrese su rol"
          onChange={(e)=>{handleBeneficiario(e.currentTarget.name,e.currentTarget.value)}}/><br/>
      <button
        onClick={()=>{handleRegistrarBeneficiario()}}>Registrar</button> 
    </form>
    <form>
      <RegistroProyecto></RegistroProyecto>
      <input
          name="nombre de proyecto"
          type="text"
          placeholder="Ingrese el nombre del proyecto"
          onChange={(e)=>{handleProyecto(e.currentTarget.name,e.currentTarget.value)}}/><br/>
      <input
          name="objetivo"
          type="text"
          placeholder="Ingrese objetivo"
          onChange={(e)=>{handleProyecto(e.currentTarget.name,e.currentTarget.value)}}/><br/>
      <input
          name="persona a cargo"
          type="text"
          placeholder="Ingrese nombre de encargado"
          onChange={(e)=>{handleProyecto(e.currentTarget.name,e.currentTarget.value)}}/><br/>
      <button
        onClick={()=>{handleRegistrarProyecto()}}>Registrar</button> 
    </form>
  </section>
  <section>
    <h2>Eventos registrados</h2>
    <ul>
      {eventos.map((e, i) => (
        <li key={i}>
          {e.nombreEven} - {e.fecha} - {e.direccion}
          <button onClick={() => actualizarEvento(i)}>Actualizar</button>
        </li>
      ))}
    </ul>
  </section>
  </> 
)
}
