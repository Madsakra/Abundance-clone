import { AntDesign, FontAwesome} from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';

import { Image, Text, View } from 'react-native';
import { Link, Redirect, router } from 'expo-router';

import auth from '@react-native-firebase/auth';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import firestore from '@react-native-firebase/firestore';
import { UserProfileProvider, useUserProfile } from '~/ctx';





function CustomDrawerContent(props:any) {

  const {bottom}= useSafeAreaInsets();
  const user = auth().currentUser;
    return (
      <View style={{flex:1}}>
          <DrawerContentScrollView 
          {...props}>
              
          <View style={{padding:15,paddingBottom:20,flexDirection:"row",gap:15,alignItems:"center"}}>
              
              {/* REPLACE VIEW WITH IMAGE LATER ON */}
              <View style={{width:70,height:70,borderRadius:50,backgroundColor:"gray"}}/>

              <View style={{justifyContent:"center"}}>
              <Text style={{fontFamily:"Poppins-Bold",fontSize:20,color:"#00ACAC",flexShrink:1}}>{user?.uid}</Text>
              <Text style={{fontFamily:"Poppins-Regular",fontSize:12}}>{user?.email}</Text> 
              </View>
      
          </View>
          <DrawerItemList {...props}/>
      </DrawerContentScrollView>

              {/*BOTTOM SECTION*/}
              <View 
              style={{
                  borderTopColor:"#dde3fe",
                  borderTopWidth:1,
                  padding:5,
                  paddingStart:10,
                  paddingBottom:10+bottom
                  
              }}
              >
                <DrawerItem label={"Logout"}
                activeBackgroundColor='#00ACAC'
                onPress={() => auth().signOut()} icon={({ size, color }) => (
                  <AntDesign name="logout" size={size} color={color}/>
                
                )} />
            </View>
      </View>)
}



const DrawerLayout = () => {









  return (
  <Drawer 
  drawerContent={CustomDrawerContent}
  
  screenOptions={{
    drawerActiveBackgroundColor:"#AEE8E8",
    drawerActiveTintColor:"#00ACAC",
    
    headerStyle:{  
    backgroundColor:'white',
    borderColor:"#D9D9D9",
    elevation: 0, // Android shadow
    shadowColor: "transparent", // iOS shadow
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    
    },
    
    // headerRight:(()=> 
    // <Link href={"/(settings)/profile"} style={{marginRight:10}}>
    // <Image 
    // source={require("assets/profilePic.jpg")}
    // style={{width:50,height:50,borderRadius:50}}/>
    // </Link>
    // ),

    
    headerTintColor: "#00ACAC",
    headerTitleStyle: {
      fontFamily:"Poppins-Light",
      fontSize:18,
      
    },
    
  }}
  >

   
    <Drawer.Screen
      name="index"

      options={{
        headerTitleAlign:'center',
        headerTitle: 'Home',
        drawerLabel: 'Home',
        
        drawerIcon: ({ size, color }) => <FontAwesome name="home" size={size} color={color} />,
      }}
    />

    <Drawer.Screen
     name="(caloriesAndGlucose)"
     listeners={({ navigation }) => ({
      drawerItemPress: (e) => {
        // when user clicks on navigation, send them back to gateway
        router.replace("/(userScreens)/(caloriesAndGlucose)/gateway")
      },
    })}
     
     options={{
      headerTitleAlign:'center',
      headerTitle: 'Calories and Glucose',
      drawerLabel: 'Calories and Glucose',
      drawerIcon: ({ size, color }) => <FontAwesome name="book" size={24} color={color} />,
      
    }}
    />

  
    {/* <Drawer.Screen
     name="(goals)"
     listeners={({ navigation }) => ({
      drawerItemPress: (e) => {
        // when user clicks on navigation, send them back to gateway
        router.replace("/(app)/(goals)/viewGoals")
      },
    })}
     
     options={{
      headerTitleAlign:'center',
      headerTitle: 'Goals',
      drawerLabel: 'Goals',
      drawerIcon: ({ size, color }) => <MaterialCommunityIcons name="flag" size={size} color={color} />,
     }}
    />
  
  <Drawer.Screen
     name="(settings)"
     listeners={({ navigation }) => ({
      drawerItemPress: (e) => {
        // when user clicks on navigation, send them back to 
        router.replace("/(app)/(settings)/gateway");
      },
    })}
     
     options={{
      headerTitleAlign:'center',
      headerTitle: 'Settings',
      drawerLabel: 'Settings',
      drawerIcon: ({ size, color }) => <FontAwesome5 name="user-cog" size={size} color={color} />,
     }}
    />

    <Drawer.Screen
     name="(dataCorrelation)"
     listeners={({ navigation }) => ({
      drawerItemPress: (e) => {
        router.replace("/(app)/(dataCorrelation)/viewDataCorrelation");
        // when user clicks on navigation, send them back to gateway
      },
    })}
     
     options={{
      headerTitleAlign:'center',
      headerTitle: 'Data Correlation',
      drawerLabel: 'Data Correlation',
      drawerIcon: ({ size, color }) => <AntDesign name="dotchart" size={size} color={color} />,
     }}
    />


  <Drawer.Screen
     name="(reminder)"
     listeners={({ navigation }) => ({
      drawerItemPress: (e) => {
        // when user clicks on navigation, send them back to gateway
        router.replace("/(app)/(reminder)/viewReminder")
      },
    })}
     
     options={{
      headerTitleAlign:'center',
      headerTitle: 'Reminder',
      drawerLabel: 'Reminder',
      drawerIcon: ({ size, color }) => <MaterialCommunityIcons name="clock-alert-outline" size={size} color={color} />,
     }}
    />
  

  
  <Drawer.Screen
     name="(appReview)"
     listeners={({ navigation }) => ({
      drawerItemPress: (e) => {
        // when user clicks on navigation, send them back to gateway
        router.replace("/(app)/(appReview)/viewAppReviews")
      },
    })}
     
     options={{
      headerTitleAlign:'center',
      headerTitle: 'App Review',
      drawerLabel: 'App Review',
      drawerIcon: ({ size, color }) => <MaterialCommunityIcons name="comment-text-multiple" size={size} color={color} />,
     }}
    />
  
  <Drawer.Screen
     name="(nutritionistFeedback)"
     listeners={({ navigation }) => ({
      drawerItemPress: (e) => {
        // when user clicks on navigation, send them back to gateway
        router.replace("/(app)/(nutritionistFeedback)/allFeedback")
      },
    })}
     
     options={{
      headerTitleAlign:'center',
      headerTitle: 'Nutritionist Feedback',
      drawerLabel: 'Nutritionist Feedback',
      drawerIcon: ({ size, color }) => <MaterialCommunityIcons name="food-apple" size={size} color={color} />,
     }}
    />


  <Drawer.Screen
    name="(articles)/[id]"
    options={{
      drawerItemStyle: { display: 'none' },
      headerTitle:"Article",
      headerTitleAlign:"center"
    }}
  /> */}


  
  </Drawer>
  )
    };




export default DrawerLayout;


















