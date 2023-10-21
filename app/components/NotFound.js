import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AntDesign } from "@expo/vector-icons";


const NotFound = () => {
  return (
    <View style={[StyleSheet.absoluteFillObject,styles.container]}>
    <AntDesign 
     name='frowno'
     size={90}
     color={'black'}
     />
    <Text style={{marginTop:20, fontSize:20}}>result not found</Text>
     </View>
  )
}

export default NotFound

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        opacity:0.3,
        zIndex:-1


    }
})