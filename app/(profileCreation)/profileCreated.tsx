import { router } from "expo-router"
import { StyleSheet, Text, View } from "react-native"
import FunctionTiedButton from "~/components/FunctionTiedButton"

export default function profileCreated() {

    const nextSection = ()=>{
        router.dismissAll();
        router.replace('/')
    }


  return (
    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
        <View style={{width:"80%"}}>
            <Text style={{fontFamily:"Poppins-Bold",fontSize:48}}>All Set!</Text>
            <Text style={{fontFamily:"Poppins-Light",fontSize:20}}>Welcome to abundance! Your journey to long life starts from here on!</Text>

            <FunctionTiedButton
            buttonStyle={styles.buttonBox}
            onPress={nextSection}
            textStyle={styles.buttonText}
            title="Start"
        />
        </View>
    </View>
  )
}



const styles = StyleSheet.create({
    buttonBox:{
        backgroundColor:"#00ACAC",
        borderRadius:5,
        marginTop:"20%",
        width:"100%",
        alignSelf:"center"
      },
      
      buttonText:{
        fontFamily:"Poppins-Bold",
        fontSize:20,color:"white",
        padding:10,
        textAlign:"center"
      
    }
})