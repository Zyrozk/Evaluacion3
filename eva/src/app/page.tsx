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
})


const handleRegistrarEvento = ()=>{
  const lista = [...eventos,evento]
  setEventos(lista)
  setEvento(initialStateEvento)
  alert("Ingreso un nuevo evento")
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
  </form>
)
}