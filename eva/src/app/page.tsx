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
      const actualizarE = [...eventos]
      actualizarE[EventoIndex] = evento
      setEventos(actualizarE)
      miStorage.setItem("eventos",JSON.stringify(actualizarE))
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
  if (BeneficiarioIndex !== null) {
    if (confirm("asd")) {
      const actualizarB = [...beneficiarios]
      actualizarB[BeneficiarioIndex] = beneficiario
      setBeneficiarios(actualizarB)
      miStorage.setItem("beneficiarios",JSON.stringify(actualizarB))
      setBeneficiarioIndex(null)
      setBeneficiario(initialStateBeneficiario)
  }
} else {
  const listaB = [...beneficiarios, beneficiario]
  setBeneficiarios(listaB)
  miStorage.setItem("beneficiarios", JSON.stringify(listaB))
 }
}

const handleRegistrarProyecto = ()=>{
  if (ProyectoIndex !== null) {
    if (confirm("asad")) {
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
      <>
      <input
          name="nombre"
          type="text"
          placeholder="Ingrese su nombre"
          value={beneficiario.nombre}
          onChange={(e)=>{handleInputChange(e, setBeneficiario, beneficiario)}}/><br/>
      </>
      <>
      <input
          name="apellido"
         type="text"
          placeholder="Ingrese su apellido"
          value={beneficiario.apellido}
          onChange={(e)=>{handleInputChange(e, setBeneficiario, beneficiario)}}/><br/>
      </>
      <>
     <input
         name="telefono"
          type="text"
          placeholder="Ingrese su teléfono"
          value={beneficiario.telefono}
          onChange={(e)=>{handleInputChange(e, setBeneficiario, beneficiario)}}/><br/>
      </>
      <>
      <input
          name="rol"
          type="text"
          placeholder="Ingrese su rol"
          value={beneficiario.rol}
          onChange={(e)=>{handleInputChange(e, setBeneficiario, beneficiario)}}/><br/>
      </>
      <button
        onClick={(handleRegistrarBeneficiario)}>{BeneficiarioIndex !== null ? "Actualizar Beneficiario" : "Registrar Beneficiario"}</button> 
    </form>
    <form>
      <RegistroProyecto></RegistroProyecto>
      <>
      <input
          name="nombreProye"
          type="text"
          placeholder="Ingrese el nombre del proyecto"
          value={proyecto.nombreProye}
          onChange={(e) => {handleInputChange(e, setProyecto, proyecto)}}/><br/>
      </>
      <>
      <input
          name="objetivo"
          type="text"
          placeholder="Ingrese objetivo"
          value={proyecto.objetivo}
          onChange={(e)=>{handleInputChange(e, setProyecto, proyecto)}}/><br/>
      </>
      <>
      <input
          name="personaAcargo"
          type="text"
          placeholder="Ingrese nombre de encargado"
          value={proyecto.personaAcargo}
          onChange={(e)=>{handleInputChange(e, setProyecto, proyecto)}}/><br/>
      </>
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
        </li>
      ))}
    </ul>

    <h2>Beneficiarios registrados</h2>
    <ul>
      {beneficiarios.map((e, i) => (
        <li key={i}>
          {e.nombre} - {e.apellido} - {e.telefono} - {e.rol}
          <button onClick={() => actualizarBeneficiario(i)}>Actualizar</button>
        </li>
      ))}
    </ul>

    <h2>Proyectos registrados</h2>
    <ul>
      {proyectos.map((e, i) => (
        <li key={i}>
          {e.nombreProye} - {e.objetivo} - {e.personaAcargo}
          <button onClick={() => actualizarProyecto(i)}>Actualizar</button>
        </li>
      ))}
    </ul>
  </section>
  </> 
)
}
