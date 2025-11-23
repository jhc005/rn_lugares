import axios from "axios";
import { DatosFormulario, Lugar, Lugares } from "../model/Tipos";
import { Platform } from "react-native";
import { v4 } from "react-native-uuid/dist/v4";

const IP=Platform.OS==="android" ? "10.0.2.2" : "localhost"
export async function cargarLugares():Promise<Lugares> {
    const url=`http://${IP}:3000/lugares`
    const respuesta= await axios.get(url)
    return respuesta.data
}

export async function crearNuevoLugar(datos:DatosFormulario):Promise<Lugar>{
    const lugar:Lugar={
        id:v4(),
        nombre:datos.nombre,
        pais:datos.pais,
        ciudad:datos.ciudad,
        foto:datos.foto,
        descripcion:datos.descripcion
    }
    const URL = `http://${IP}:3000/lugares`
    await axios.post(URL,lugar)
    return lugar
}

export async function modificarLugar(idLugarModificado:string,datos:DatosFormulario):Promise<Lugar>{
    const lugar:Lugar={
        id:idLugarModificado,
        nombre:datos.nombre,
        pais:datos.pais,
        ciudad:datos.ciudad,
        foto:datos.foto,
        descripcion:datos.descripcion
    }
    const url=`http://${IP}:3000/lugares/${lugar.id}`
    await axios.put(url,lugar)
    return lugar
}

export async function borrarLugar(lugar:Lugar){
    const url=`http://${IP}:3000/lugares/${lugar.id}`
    await axios.delete(url)
}

export async function buscarLugares(texto:string):Promise<Lugares>{
    const url=`http://${IP}:3000/lugares?q=${texto}`
    const respuesta = await axios.get(url)
    return respuesta.data
}
