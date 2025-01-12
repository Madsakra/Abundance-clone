import { Link, router } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import PressableTab from "~/components/PressableTab";
import { FlashList } from "@shopify/flash-list";
import { useEffect, useState } from "react";
import FunctionTiedButton from "~/components/FunctionTiedButton";
import { toggleItemInList, updateLocalProfileFields } from "~/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function healthInformation() {

  const healthConditions = ["Type 2 Diabets","High Blood Pressure",
    "Type 1 Diabetes","High Cholesterol","Low Glucose Levels","Low Blood Pressure"];


 const [profileHealthCondi,setProfileHealthCondi] = useState<string[]>([]);



const handleHealthCondi = (healthCondition: string) => {
  toggleItemInList(healthCondition,setProfileHealthCondi)
};


// load pre-existing data , so user don't have to restart 
const loadProfileData = async () => {
  const data = await AsyncStorage.getItem('profileData');
  if (data) {
      const profile = JSON.parse(data);
      setProfileHealthCondi([...profile.profileHealthCondi])

  }
};


  const nextSection = async ()=>{
    // SEND DATA TO SQL LITE FIRST
    await updateLocalProfileFields({
            profileHealthCondi:profileHealthCondi
                    })
    // NAVIGATE TO GOAL SETTING PAGE
    router.replace("/(profileCreation)/dietInfo")
  }

  useEffect(()=>{
    loadProfileData();
  },[])



  return (
    <ScrollView>
        
        <Link href="/(profileCreation)/bmrInformation" style={{marginHorizontal:20,marginVertical:25}}>
            <Entypo name="chevron-thin-left" size={24} color="black" />
        </Link>

        <Text style={styles.header}>Health Conditions</Text>
        <Text style={styles.subHeader}>Select your health condition below so that we can help you navigate from health risks</Text>
        <Image source={require("assets/profileCreation/health_condi.jpg")} style={{width:100,height:100,alignSelf:"center", marginBottom:20}}/>

        {/*Health Conditions restriction section*/}
        <View style={styles.listBox}>
      
        <FlashList
        data={healthConditions}        
        renderItem={({ item }) =>         
        <PressableTab
        editable={true} 
        isPressed={profileHealthCondi.includes(item)} // Highlight if selected
        tabBoxStyle={styles.tabBox}
        handleInfo={handleHealthCondi}
        tabTextStyle={styles.tabTextStyle}
        tabValue={item}/>}
        keyExtractor={(item) => item}
        estimatedItemSize={100}
        contentContainerStyle={styles.listContainer}
        />

        </View>
        

    

        <FunctionTiedButton
            buttonStyle={styles.buttonBox}
            onPress={nextSection}
            textStyle={styles.buttonText}
            title="Next"
        />

    </ScrollView>
  )
}


const styles = StyleSheet.create({
    header:{
        fontFamily:"Poppins-Bold",
        fontSize:30, 
        textAlign:"center",
        

    },

    subHeader:{
      fontFamily:"Poppins-Medium",
      fontSize:14,
      color:"#818181", 
      paddingVertical:10,
      paddingHorizontal:40,
    },


    listContainer: {
        padding:20,
        
      },

    tabBox:{
        
        borderRadius: 30,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginHorizontal: 4,
        marginVertical:5,
        flexWrap:"wrap",
        marginBottom:10
    },

  

    tabTextStyle:{
        fontFamily:"Poppins-Regular",
        fontSize:14, 
        color:"white",

        
    },

    listHeader:{
        marginLeft:20,
        fontFamily:'Poppins-SemiBold',
        fontSize:16,
        marginTop:15,
        marginBottom:5
    },

    listWarning:{
    color:"red",
    fontFamily:"Poppins-SemiBold",
    paddingLeft:30,
    fontSize:15
    },

    buttonBox:{
      backgroundColor:"#6B7FD6",
      borderRadius:30,
      marginVertical:20,
      width:"90%",
      alignSelf:"center"
     },
   
     buttonText:{
      fontFamily:"Poppins-Regular",
      fontSize:16,
      color:"white",
      padding:12,
      textAlign:"center"
     },

     listBox:{
      height:250,
      borderWidth:1,
      marginHorizontal:20,
      borderRadius:10,
      marginBottom:10,borderColor:"#D2D2D2"
     }
    
})