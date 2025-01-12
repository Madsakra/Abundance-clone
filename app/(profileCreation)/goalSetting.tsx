import { Entypo } from "@expo/vector-icons"
import { Link, router } from "expo-router"
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native"
import { useState } from "react";
import { FlashList } from "@shopify/flash-list";
import PressableTab from "~/components/PressableTab";
import FunctionTiedButton from "~/components/FunctionTiedButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingAnimation from "~/components/LoadingAnimation";



type Goal = {
  id: number;
  name: string;
  value: number;

};




export default function goalSetting() {



  const allGoals:Goal[] = [
    {id:1,name:"< 1800 kcal / day",value:1800},
    {id:2,name:"< 2000 kcal / day",value:2000},
    {id:3,name:"< 2300 kcal / day",value:2200},
    {id:4,name:"< 5.0 mmo/L before Food",value:5.0},
    {id:5,name:"< 6.0 mmo/L before Food",value:6.0},
    {id:6,name:"< 7.0 mmo/L after Food",value:7.0},
  ]
  


  const [profileGoals,setProfileGoals] = useState<Goal[]>([])
  const [loading,setLoading] = useState(false)

  const handleGoals = (goal: { id: number; name: string; value: number }) => {
    const exists = profileGoals.some((item) => item.id === goal.id);
  
    if (exists) {
      // Remove the goal if it exists
      setProfileGoals((prev) => prev.filter((item) => item.id !== goal.id));
    } else {
      // Add the goal if it doesn't exist
      setProfileGoals((prev) => [...prev, goal]);
    }
  
  };



// load pre-existing data , so user don't have to restart 
const loadProfileData = async () => {
  const data = await AsyncStorage.getItem('profileData');
  if (data) {
      return JSON.parse(data);
  }
};

  const nextSection = async ()=>{

      const profileData = await loadProfileData()
      console.log(profileData);

      try{

        if (profileGoals.length === 0)
        {
          alert("You have yet to select at least 1 goal")
        }

        else if (profileGoals.length >3)
        {
          alert("You can only select up to 3 goals!")
        }

        else{
          // CALL API TO SEND ALL DATA TO STORAGE
          setLoading(true);

          // ONCE DONE REMOVE ALL DATA FROM INTERNAL STORAGE AND ROUTE THEM TO PROFILE CREATED
          await AsyncStorage.removeItem('profileData');
          console.log('Profile data removed');
          setTimeout(() => {
          setLoading(false);
          router.replace('/(profileCreation)/profileCreated')
        
          },2000);
        }
      }
      catch (err){
        console.log(err)
      }

  }

  if (loading)
  {
    return (
      <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
        <LoadingAnimation/>
      </View>
    )
  } 


  
  return (
    <View style={{flex:1}}>
        
    <Link href="/(profileCreation)/dietInfo" style={{padding:25}}>
        <Entypo name="chevron-thin-left" size={24} color="black" />
    </Link>

    <Text style={styles.header}>Goal Setting</Text>
    <Text style={styles.subHeader}>Final step ! You can select up to 3 goals and you can change them later.</Text>
    
    <Image source={require("assets/profileCreation/goal.jpg")} style={{width:100,height:100,alignSelf:"center", marginBottom:20}}/>

    <View style={styles.listBox}>

      <FlashList
        data={allGoals}
        renderItem={({ item }) => (
          <PressableTab
                 editable={true}
                        tabBoxStyle={styles.tabBox}
                        handleInfo={handleGoals}
                        tabTextStyle={styles.tabTextStyle}
                        tabValue={item} // This now matches the expected type
    
                        isPressed={profileGoals.some((goal) => goal.id === item.id)} // Check if the goal is selected
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        estimatedItemSize={100}
        numColumns={1}
        contentContainerStyle={styles.listContainer}
      />
    </View>



    <FunctionTiedButton
            buttonStyle={styles.buttonBox}
            onPress={nextSection}
            textStyle={styles.buttonText}
            title="Next"
        />


  

  
    </View>
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


    listHeader:{
      paddingLeft:25,
      fontFamily:'Poppins-SemiBold',
      fontSize:20
  },

  tabBox:{
    borderRadius: 30,
    paddingVertical:10,
    paddingHorizontal:20,
    marginBottom:10,
    flexDirection:"row"
},

tabTextStyle:{
  fontFamily:"Poppins-Regular",
  fontSize:14, 
  color:"white",
  width:200
  
},





listContainer: {
  padding:20,
  
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


}

)