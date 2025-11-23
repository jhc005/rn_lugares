import { StyleSheet} from 'react-native'

 export const globalStyles = StyleSheet.create({
    contenedor: {
    flex: 1,
    padding: 24,
  },
  titulo: {
    color: "#1F2937",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
  foto: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 25,
  },
  cuadroTexto: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#dd45db",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#111827",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  buscador:{
    height:44,  
    paddingHorizontal:12,  
    backgroundColor:"#fefefe",  
    borderWidth:2,  
    borderColor:"#344055",  
    borderRadius:12,  
    fontSize:16,  
    color: '#344055',  
    marginBottom:16 
  }
 })