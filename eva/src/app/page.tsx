'use client'
import { useEffect, useState } from "react"
import { Evento } from "./interfaces/iEvento"
import { Beneficiario } from "./interfaces/iBeneficiario"
import { Proyecto } from "./interfaces/iProyecto"

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
  let lisEvento = localStorage.getItem("eventos")
  if(lisEvento != null){
    let listado = JSON.parse(lisEvento)
    setEventos(listado)
  }
},[])

const handleRegistrarEvento = ()=>{
  miStorage.setItem("eventos",JSON.stringify([...eventos, evento]))
  }
  const handleEvento = (name:string, value:string)=>{
    setEvento(
      {...evento, [name] : value }
    )
  }
  


const handleBeneficiario = ()=>{
  alert("Acaba de entrar a Beneficiarios")
}

const handleProyecto = ()=>{
  alert("Acaba de entrar a Proyecto")
}



return (
  <form>
    <h1>Bienvenido</h1>
    <label>Nombre de evento</label><br/>
    <input
        name="nombreEven"
        type="text"
        placeholder="Ingrese el nombre del evento"
        onChange={(e)=>{handleEvento(e.currentTarget.name,e.currentTarget.value)}}/><br/>
      <label>Fecha</label><br/>
    <input
        name="fecha"
        type="text"
        placeholder="Ingrese la fecha"
        onChange={(e)=>{handleEvento(e.currentTarget.name,e.currentTarget.value)}}/><br/>
    <label>Dirección</label><br/>
    <input
        name="dirección"
        type="text"
        placeholder="Ingrese dirección"
        onChange={(e)=>{handleEvento(e.currentTarget.name,e.currentTarget.value)}}/><br/>
    <button
      onClick={()=>{handleRegistrarEvento()}}>Registrar</button>    
  </form>
)
}