import React, { useEffect, useState } from 'react'
import { Evento } from '../interfaces/iEvento'
import '../styles/page.css'


interface Props{
    traerEvento: (p:Evento) => void
}

export const RegistroEvento = (props:Props) => {
    const miStorage = window.localStorage
    const [eventos, setEventos] = useState<Evento[]>([])
        useEffect(() => {
            let lisEvento = miStorage.getItem("eventos")
            if(lisEvento != null){
                let listadoE = JSON.parse(lisEvento)
                setEventos(listadoE)
            }

        },[])

    const queActualizar = (index:number) =>{
        alert("Le diste a "+index)
        props.traerEvento(eventos[index])
    }  

  return (
    <>
        <h1>EVENTOS</h1>
        <table>
            <thead>
                <tr>
                    <th>Nombre del evento</th>
                    <th>Fecha</th>
                    <th>Dirección</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody>
               {eventos.map((e, index) => {
                return(
                    <tr key={index}>
                        <td>{e.nombreEven}</td>
                        <td>{e.fecha}</td>
                        <td>{e.direccion}</td>
                        <td><button
                                onClick={() => queActualizar(index)}>Actualizar</button>

                        </td>
                    </tr>
                )
               })} 
            </tbody>
        </table>
    </>
  )
}

export default RegistroEvento

