import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

type botonProps = {
    texto:string
    onPress:()=>void

}
export default function Boton({texto,onPress}:botonProps) {
  return (
    <Pressable style={({pressed})=> pressed ? [styles.boton,{backgroundColor:"#2563eb"}] : styles.boton}
    onPress={onPress}>
        <Text style={styles.texto}>{texto}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    texto: {
    color: "white",
    margin: "auto",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5
  },
  boton: {
    borderRadius: 12,
    backgroundColor: "#007aff",
    paddingVertical: 14,
    paddingHorizontal: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  }
})