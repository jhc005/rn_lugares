import { Alert, FlatList, Modal, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { DatosFormulario, Lugar, Lugares } from './model/Tipos'
import ItemLugar from './components/ItemLugar'
import { globalStyles } from './styles/GlobalStyles'
import Fab from './components/Fab'
import { borrarLugar, cargarLugares, crearNuevoLugar, modificarLugar } from './utils/CrudLugares'
import DetalleLugar from './components/DetalleLugar'
import EditarLugar from './components/EditarLugar'
import { append } from 'ramda';
import BuscadorSencillo from './components/BuscadorSencillo'
import BuscadorSugerencias from './components/BuscadorSugerencias'


export default function App() {

  //variables de estado
  const [listaLugares,setListaLugares]=useState<Lugares>([])
  useEffect(accionCargarLugares, [])
  const [lugarSeleccionado, setLugarSeleccionado]=useState<Lugar | undefined>(undefined)
  const [modalEditarVisible, setModalEditarVisible]= useState(false)

  //funciones 
  function getItemLugar(lugar:Lugar):React.ReactElement{
    return <ItemLugar item={lugar} accionAbrirDetalleLugar={accionAbrirDetalleLugar}/>
  }

  function accionCargarLugares(){
    cargarLugares()
          .then(lugares=> setListaLugares(lugares))
          .catch(error=>mostrarError(error.toString))
  }

  function accionAbrirDetalleLugar(lugar:Lugar){
    setLugarSeleccionado(lugar)
  }

  function accionCerrarDetalleLugar(){
    setLugarSeleccionado(undefined)
  }

  function accionAbrirEditorLugar(lugar?:Lugar){
    setModalEditarVisible(true)
  }

  function accionCerrarEditorLugar(){
    setModalEditarVisible(false)
  }

  function accionCrearNuevoLugar(datos:DatosFormulario){
    crearNuevoLugar(datos)
              .then( nuevoLugar => {
                setModalEditarVisible(false)
                const nuevaLista = [...listaLugares, nuevoLugar]
                setListaLugares(nuevaLista)
              })
              .catch(error=>mostrarError(error.toString()))
  }

  function accionModificarLugar(datos:DatosFormulario){
    if(lugarSeleccionado!==undefined){
      modificarLugar(lugarSeleccionado.id, datos)
          .then( lugarSeleccionado=> {
            setLugarSeleccionado(lugarSeleccionado)
            const nuevaLista = listaLugares.map(
              lugar => lugar.id===lugarSeleccionado.id? lugarSeleccionado : lugar
            )
            setListaLugares(nuevaLista)
            setModalEditarVisible(false)
          })
          .catch(error=>mostrarError(error.toString()))
    }
  }

  function accionBorrarLugar(){
    Alert.alert(
      `¿Desea borrar ${lugarSeleccionado?.nombre}?`,
      "Un lugar eliminado no podra ser recuperado",
      [
        {text:"Si, eliminar", onPress:realizarBorrado},
        {text:"No, cancelar"}
      ]
    )
  }

  function realizarBorrado(){
    if(lugarSeleccionado!==undefined){
      borrarLugar(lugarSeleccionado)
          .then(()=>{
            const nuevaLista = listaLugares.filter(lugar=>lugar.id !== lugarSeleccionado.id)
            setListaLugares(nuevaLista)
            setLugarSeleccionado(undefined)
          })
          .catch(error=>mostrarError(error.toString()))
    }
  }

  function mostrarError(mensaje:string){
    Alert.alert("Error", mensaje)
  }
  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Lugares del mundo</Text>
      <BuscadorSugerencias setLugarSeleccionado={setLugarSeleccionado}/>
      <View style={{marginTop:60}}>
        <FlatList data={listaLugares}
        keyExtractor={(lugar)=> lugar.id.toString()}
        renderItem={({item})=>getItemLugar(item)}/>
      </View>
      
      <View style={styles.positionFab}>
        <Fab icono='add' bgColor={"#007AFF"} onPress={()=> accionAbrirEditorLugar()}/>
      </View>
      {
        lugarSeleccionado !== undefined && (
          <Modal transparent={false} animationType={'slide'}>
            <DetalleLugar 
            lugarSeleccionado={lugarSeleccionado} 
            accionAbrirEditorLugar={accionAbrirEditorLugar} 
            accionBorrarLugar={accionBorrarLugar}
            salirPulsado={accionCerrarDetalleLugar}/>
          </Modal>
        )
      }
      {
        modalEditarVisible &&(
          <Modal transparent={false} animationType='slide'>
            <EditarLugar
            lugarSeleccionado={lugarSeleccionado}
            aceptarPulsado={lugarSeleccionado===undefined ?
                                                accionCrearNuevoLugar : accionModificarLugar
            }
            accionCerrarEditorLugar={accionCerrarEditorLugar}/>
          </Modal>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  contenedor: {
    ...globalStyles.contenedor,
    backgroundColor: '#f0f2f5',
  },
  titulo: {
    ...globalStyles.titulo,
    color: '#344055',
    marginBottom: 16,
  },
  positionFab: {
    position: "absolute",
    bottom: 64,
    right: 64,
  }
})
