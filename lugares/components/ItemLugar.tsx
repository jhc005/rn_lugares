import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Lugar } from '../model/Tipos'
import { ImageBackground } from 'expo-image'

type ItemLugarProps={
    item:Lugar
    accionAbrirDetalleLugar: (lugar:Lugar) => void
}
export default function ItemLugar({item,accionAbrirDetalleLugar}:ItemLugarProps) {
  return (
    <Pressable style={styles.contenedor} onPress={()=> accionAbrirDetalleLugar(item)}>
      <ImageBackground source={item.foto} contentFit='cover' style={styles.imagen}>
        <View style={styles.columna}>
            <Text style={styles.titulo}>{item.nombre}</Text>
            <Text style={styles.subtitulo}>{item.ciudad},{item.pais}</Text>
        </View>
      </ImageBackground>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    titulo: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
    textTransform: "capitalize"
  },
  imagen: {
    flex: 1,
    justifyContent: "flex-end",
  },
  subtitulo: {
    color: "#d1d5db",
    fontSize: 14,
  },
  columna: {
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 10,
  },
  contenedor: {
    width: "100%",
    height: 150,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#e8ebf0",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginBottom: 12,
  }
})