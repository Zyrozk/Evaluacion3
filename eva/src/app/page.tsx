import { useState } from "react"

interface Evento{
  nombreEven : string,
  fecha : string,
  direccion : string  
}

interface Beneficiario{
  nombre : string,
  apellido : string,
  telefono : number,
  rol : string
}

interface Proyecto{
  nombreProye : string,
  objetivo : string,
  personaAcargo : string
}

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

const handleRegistrar = ()=>{
  alert("Falta")
}

const handleActualizar = ()=>{
  alert("Falta")
}

const handleEliminar = ()=>{
  alert("Falta")
}



return (
    <form>
      <h1>Eventos</h1>
      <label>Nombre</label><br/>
      <input
          name = "nombre"
          type = "text"
          placeholder = "Ingrese su nombre"></input>


      <span></span>
      <button
        onclick={()=>{handleRegistrar()}}>Registrar</button>
      <button
        onclick={()=>{handleActualizar()}}>Actualizar</button>
      <button
        onClick={()=>{handleEliminar()}}>Eliminar</button>
    </form>

  )
}