import React, { useEffect, useState } from 'react'
import { Proyecto } from '../interfaces/iProyecto'
import '../styles/page.css'

export const RegistroProyecto = () => {
    const miStorage = window.localStorage
    const [Proyectos, setProyectos] = useState<Proyecto[]>([])
        useEffect(() => {
            let lisProyecto = localStorage.getItem("proyectos")
            if(lisProyecto != null){
                let listadoP = JSON.parse(lisProyecto)
                setProyectos(listadoP)
            }

        },[])
  return (
    <>
        <h1>PROYECTOS</h1>
        <table>
            <thead>
                <tr>
                    <th>Nombre del proyecto</th>
                    <th>Objetivo</th>
                    <th>Persona a cargo</th>
                    <th>Acción</th>
                </tr>
            </thead>
        </table>
    </>
  )
}

export default RegistroProyecto