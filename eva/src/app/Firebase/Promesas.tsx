import { db } from "./Conexion";
import { Evento } from "../interfaces/iEvento";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { Beneficiario } from "../interfaces/iBeneficiario";


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