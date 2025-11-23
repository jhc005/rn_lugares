import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Lugar } from "../model/Tipos";
import { buscarLugares } from "../utils/CrudLugares";
import AutocompleteInput from "react-native-autocomplete-input";
import VisorSugerencia from "./VisorSugerencia";

type BuscadorSugerenciasProps = {
  setLugarSeleccionado: React.Dispatch<React.SetStateAction<Lugar | undefined>>;
};

export default function BuscadorSugerencias({
  setLugarSeleccionado,
}: BuscadorSugerenciasProps) {
  //varaibles de estado
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [sugerencias, setSugerencias] = useState([]);

  useEffect(actulizarSugerencias, [textoBusqueda]);

  //funciones

  function actulizarSugerencias() {
    if (textoBusqueda === "") {
      setSugerencias([]);
    } else {
      buscarLugares(textoBusqueda).then((lugares) => setSugerencias(lugares));
    }
  }

  function getEtiquetaSugerencia(lugar: Lugar): React.ReactElement {
    return(
        <Pressable onPress={ () => {
                    setLugarSeleccionado(lugar)
                    setTextoBusqueda("")
            }
        }>
            <VisorSugerencia lugar={lugar}/>
        </Pressable>
    )
  }

  return (
    <View style={styles.contenedor}>
      <AutocompleteInput
        data={sugerencias}
        defaultValue={textoBusqueda}
        onChangeText={setTextoBusqueda}
        inputContainerStyle={styles.cuadroTexto}
        placeholder={"Búsqueda por nombre, país, descripción..."}
        listContainerStyle = {styles.estiloFlatList}
        flatListProps={{
          keyExtractor: (lugar) => lugar.id,
          renderItem: ({ item }) => getEtiquetaSugerencia(item),
          keyboardShouldPersistTaps:"handled",
          style:{borderWidth:0}
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  contenedor: {
    position: "absolute",
    top: 60,
    left: 24,
    width: "100%",
    zIndex: 10,
  },
  cuadroTexto: {
    backgroundColor: "#FFFFFF",
    fontSize: 16,
    color: "#344055",
    borderWidth: 2,
    borderColor: "#344055",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  estiloFlatList:{
    backgroundColor:"#fff",
    borderRadius:12,
    marginTop:4,
    elevation:3
  }
});
