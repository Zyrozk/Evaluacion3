import { db } from "./Conexion";
import { Evento } from "../interfaces/iEvento";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "@firebase/firestore";


export const RegistroEvento = async (evento: Evento) => {
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