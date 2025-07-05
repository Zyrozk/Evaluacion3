import React, { useEffect, useState } from 'react'
import { Beneficiario } from '../interfaces/iBeneficiario'
import '../styles/page.css'

export const RegistroBeneficiario = () => {
    const miStorage = window.localStorage
    const [beneficiarios, setBeneficiarios] = useState<Beneficiario[]>([])
        useEffect(() => {
            let lisBeneficiario = miStorage.getItem("beneficiarios")
            if(lisBeneficiario != null){
                let listadoB = JSON.parse(lisBeneficiario)
                setBeneficiarios(listadoB)
            }

        },[])
  return (
    <>  
        <h1>BENEFICIARIOS</h1>
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Teléfono</th>
                    <th>Rol</th>
                    <th>Acción</th>
                </tr>
            </thead>
        </table>
    </>
  )
}

export default RegistroBeneficiario