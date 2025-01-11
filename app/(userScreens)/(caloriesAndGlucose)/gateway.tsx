import { FontAwesome } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { Link, RelativePathString } from "expo-router";
import { Text, View } from "react-native";
import GatewayCard from "~/components/GatewayCard";


const calorieLinks = {
  headerText:"Calories Data",
  routeLists:[{
    image:require("assets/routeImages/calo_input.jpg"),
    routeRef:"/" as RelativePathString,
    routeName:"Food Logging"
  },{
    image:require("assets/routeImages/calo_output.jpg"),
    routeRef:"/" as RelativePathString,
    routeName:"Calories Output Logging"
  },{
    image:require("assets/routeImages/chart_data.jpg"),
    routeRef:"/" as RelativePathString,
    routeName:"View Graphed Data"
  }]
}


const glucoseLinks = {
  headerText:"Glucose Data",
  routeLists:[{
    image:require("assets/routeImages/glucose_log.jpg"),
    routeRef:"/" as RelativePathString,
    routeName:"Glucose Logging"
  },
  {
    image:require("assets/routeImages/chart_data.jpg"),
    routeRef:"/" as RelativePathString,
    routeName:"View Graphed Data"
  }
]
}


export default function gateway() {
  return (
    <View style={{flex:1}}>
       <Text style={{marginTop:20,marginStart:30,fontFamily:"Poppins-Medium",fontSize:15}}>Select your path for management</Text>
      <GatewayCard
      headerText={calorieLinks.headerText}
      iconName={"flame"}
      routeLists={calorieLinks.routeLists}
      themeColor="#C68F5E"
      />
   

      {/*GLUCOSE SECTION*/}
      <GatewayCard
      headerText={glucoseLinks.headerText}
      iconName={"cube"}
      routeLists={glucoseLinks.routeLists}
      themeColor="#DB8189"
      />
    


    </View>
  )
}


