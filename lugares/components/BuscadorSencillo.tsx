import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Lugares } from '../model/Tipos'
import { TextInput } from 'react-native'
import { globalStyles } from '../styles/GlobalStyles'
import { buscarLugares } from '../utils/CrudLugares'

type BuscadorSencilloProps = {
    setListaLugares: React.Dispatch<React.SetStateAction<Lugares>>
}

export default function BuscadorSencillo({setListaLugares}:BuscadorSencilloProps) {

    //variables de estado
    const [textoBusqueda,setTextoBusqueda]=useState("")


    useEffect(accionBuscarLugares, [textoBusqueda])


    //funciones 

    function accionBuscarLugares(){
        buscarLugares(textoBusqueda)
            .then( lugares => setListaLugares(lugares))
            .catch( error => console.log(error.toString))
    }

  return (
    <TextInput 
    placeholder='Busqueda por nombre, pais, descripcion...'
    style={globalStyles.buscador}
    value={textoBusqueda} 
    onChangeText={setTextoBusqueda} 
    />
  )
}

const styles = StyleSheet.create({})