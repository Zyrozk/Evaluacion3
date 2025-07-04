import React, { useEffect, useState } from 'react'
import { Evento } from '../interfaces/iEvento'
import '../styles/page.css'

export const RegistroEvento = () => {
    const miStorage = window.localStorage
    const [eventos, setEventos] = useState<Evento[]>([])
        useEffect(() => {
            let lisEvento = localStorage.getItem("eventos")
            if(lisEvento != null){
                let listadoE = JSON.parse(lisEvento)
                setEventos(listadoE)
            }

        },[])
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
        </table>
    </>
  )
}

export default RegistroEvento

