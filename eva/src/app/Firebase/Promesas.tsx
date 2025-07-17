import { db } from "./Conexion";
import { Evento } from "../interfaces/iEvento";
import { Beneficiario } from "../interfaces/iBeneficiario";
import { Proyecto } from "../interfaces/iProyecto";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";


export const RegistrarEvento = async (evento: Evento) => {
    const docRef = await addDoc(collection(db, "eventos"), evento)
    console.log("Evento guardado con el ID:", docRef.id)
}

export const obtenerEventos = async (): Promise<(Evento & {id: string})[]> => {
    const querySnapshot = await getDocs(collection(db, "eventos"))
    let listado: (Evento & { id: string})[] = []
    querySnapshot.forEach((docSnap) => {
        const evento: Evento = {
            nombreEven: docSnap.data().nombreEven,
            fecha: docSnap.data().fecha,
            direccion: docSnap.data().direccion
        }
        listado.push({ id: docSnap.id, ...evento})
        console.log(docSnap.id, "=>", evento)
    })
    return listado
}

export const eliminarEvento = (id: string) =>
    deleteDoc(doc(db, "eventos", id))

export const actualizarEvento = (id: string, data: Evento) => {
    const {nombreEven, fecha, direccion} = data
    return updateDoc(doc(db, "eventos", id), {nombreEven, fecha, direccion})
}



export const RegistrarBeneficiario = async (beneficiario: Beneficiario) => {
    const docRef = await addDoc(collection(db, "beneficiarios"), beneficiario)
    console.log("Beneficiario guardado con el ID:", docRef.id)
}

export const obtenerBeneficiarios = async (): Promise<(Beneficiario & { id: string })[]> => {
    const querySnapshot = await getDocs(collection(db, "beneficiarios"))
    let listado: (Beneficiario & { id: string})[] = []
    querySnapshot.forEach((docSnap) => {
        const benefeciario: Beneficiario = {
            nombre: docSnap.data().nombre,
            apellido: docSnap.data().apellido,
            telefono: docSnap.data().telefono,
            rol: docSnap.data().rol
        }
        listado.push({ id: docSnap.id, ...benefeciario})
        console.log(docSnap.id, "=>", benefeciario)
    })
    return listado
}

export const eliminarBeneficiario = (id: string) =>
    deleteDoc(doc(db, "beneficiarios", id))

export const actualizarBeneficiario = (id: string, data: Beneficiario) => {
    const { nombre, apellido, telefono, rol} = data
    return updateDoc(doc(db, "beneficiarios", id), {nombre, apellido, telefono, rol })
}



export const RegistrarProyecto = async (proyecto: Proyecto) => {
    const docRef = await addDoc(collection(db, "proyectos"), proyecto)
    console.log("Proyecto guardado con el ID:", docRef.id)
}

export const obtenerProyectos = async (): Promise<(Proyecto & { id: string})[]> => {
    const querySnapshot = await getDocs(collection(db, "proyectos"))
    let listado: (Proyecto & {id: string })[] = []
    querySnapshot.forEach((docSnap) => {
        const proyecto: Proyecto = {
            nombreProye: docSnap.data().nombreProye,
            objetivo: docSnap.data().objetivo,
            personaAcargo: docSnap.data().personaAcargo
        }
        listado.push({ id: docSnap.id, ...proyecto})
        console.log(docSnap.id, " => ", proyecto)
    })
    return listado
}

export const eliminarProyecto = (id: string) =>
    deleteDoc(doc(db, "proyectos", id))

export const actualizarProyecto = (id: string, data: Proyecto) => {
    const { nombreProye, objetivo, personaAcargo } = data
    return updateDoc(doc(db, "proyectos", id), { nombreProye, objetivo, personaAcargo })
}