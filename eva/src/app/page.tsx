'use client'
import { useState } from "react"
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
function Sistema(){
const [Evento, setEvento] = useState(initialStateEvento)
const [Beneficiario, setBeneficiario] = useState(initialStateBeneficiario)
const [Proyecto, setProyecto] = useState(initialStateProyecto)

const handleEvento = ()=>{
  alert("Acaba de entrar a evento")
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
    <button onClick={handleEvento}>Eventos</button>
    <button onClick={handleBeneficiario}>Beneficiarios</button>
    <button onClick={handleProyecto}>Proyectos</button>
  </form>
)
}