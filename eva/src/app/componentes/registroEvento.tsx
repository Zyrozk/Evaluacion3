import React, { useEffect, useState } from 'react'
import { Evento } from '../interfaces/iEvento'
import '../styles/page.css'

export const RegistroEvento = () => {
    const miStorage = window.localStorage
    const [eventos, setEventos] = useState<Evento[]>([])
        useEffect(() => {
            let lisEvento = localStorage.getItem("eventos")
            if(lisEvento != null){
                let listado = JSON.parse(lisEvento)
                setEventos(listado)
            }

        },[])
  return (
    <>
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

