import { ColorValue, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'

type FabProps = {
    icono:"edit"|"add"|"delete"
    onPress: ()=>void
    bgColor:ColorValue
}
export default function Fab({icono,onPress,bgColor}:FabProps) {
  return (
    <Pressable style={[styles.fab,{backgroundColor:bgColor}]} onPress={onPress}>
        <MaterialIcons name={icono} style={styles.iconoFab}/>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    iconoFab: {
    fontSize: 28,
    color: "white",
    margin: "auto"
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    shadowColor: "#eee",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 7,
  }
})