
import { View,StyleSheet, Text, Pressable, Image,TextInput } from "react-native";
import { useSession } from '../ctx';
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FunctionTiedButton from "~/components/FunctionTiedButton";



export default function SignIn() {
  const { signIn,signOut } = useSession();

  const [email,setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle the password visibility state
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
};



const loginCall = ()=>
{
  try{

  // use email and password to make api call 
    if (email.trim() === "" || password.trim() === "")
    {
       alert("You have missed out on either your email and password!")
    }

    else{
       signIn(email,password);

    }

   // make API call to the server
  // when server responds, set the context to the user object
  }
  catch(err)
  {
    console.log(err);
    alert("account don't exist / wrong credentials")
  }

}





  return (

    <View style={styles.pageContainer}>

      
        {/* Form container*/}
      <View style={styles.formContainer}>


      {/* -------------- HEADER ------------- */}
      <View style={styles.logoContainer}> 
      <Image source={require('assets/icon.png')} style={{width:70,height:70}}/>
      </View>
     
      <Text  style={{fontFamily:'Poppins-ExtraBold', fontSize:24}}>Hello Again!</Text>
      <Text  style={{fontFamily:'Poppins-SemiBold', fontSize:12, marginBottom:20,color:"#8E8E8E"}}>Log in to your account</Text>
    {/* ----------------- HEADER ------------- */}




    {/* ----------------- INPUT SECTION ------------- */}
      <View style={styles.inputSection}>
        
      <View style={{backgroundColor:"#F0F0F0",paddingVertical:12,paddingHorizontal:25,width:"90%",borderRadius:50}}>
            
            <Text style={{fontFamily:"Poppins-Medium"}}>Name</Text>
            <TextInput
                placeholder="Enter your email"
                value={email}
                onChangeText={text => setEmail(text)}
                style={styles.inputBox}
                inputMode="email"
             />
      </View>

      
      <View style={{backgroundColor:"#F0F0F0",paddingVertical:12,paddingHorizontal:25,width:"90%",borderRadius:50}}>
            
            <Text style={{fontFamily:"Poppins-Medium"}}>Password</Text>
            <TextInput
                placeholder="Enter your Password"
                value={password}
                onChangeText={text => setPassword(text)}
                style={styles.inputBox}
                secureTextEntry={!showPassword}
             />

            <MaterialCommunityIcons
                   name={showPassword ? 'eye-off' : 'eye'}
                   size={24}
                   color="#aaa"
                   style={{position:"absolute",bottom:25,right:25}}
                   onPress={toggleShowPassword}
                />

        </View>
      </View>
    {/* ----------------- INPUT SECTION ------------- */}


  
    {/* ----------------- ACTION BUTTONS  ------------- */}
      <FunctionTiedButton
         buttonStyle={styles.buttonBox}
         onPress={loginCall}
         textStyle={styles.buttonText}
         title="Login"
      />

          <Pressable style={styles.forgetPassword}>
            <Text style={{color:'#989595',fontFamily:"Poppins-Regular",fontSize:14}}>Forget Password?</Text>
        </Pressable>

      </View>
    </View>
 


  );
}

const styles = StyleSheet.create({

  pageContainer:{
     width:"100%",
     height:"100%",
     gap:20
  },

  formContainer:{
     width:"100%",
     alignItems:"center",
     flex:1,
     justifyContent:"center"
  },

  logoContainer:{
     width:20,
     height:20,
     alignItems:"center",
     justifyContent:"center",
     marginBottom:"12%"
  },

 inputSection:{
  gap:10, 
  alignItems:"center",
  width:"100%",
  marginTop:10
 },


 inputBox: {
    width:"100%",


 },

 passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: "80%",       
    borderRadius: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#A3A2A2',
 },

 forgetPassword:{
     marginTop:20, 
     width:'100%',
     alignItems:"center"   
 },


 buttonBox:{
  backgroundColor:"#22CBCB",
  width:'80%',
  borderRadius:30,
  marginTop:40
 },

 buttonText:{
  fontFamily:"Poppins-Bold",
  fontSize:20,
  color:"white",
  padding:10,
  textAlign:"center"
 }

});
