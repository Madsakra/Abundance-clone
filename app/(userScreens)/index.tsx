import { Text, View } from 'react-native';
import auth from '@react-native-firebase/auth';

import { Button } from '~/components/Button';
import { useUserProfile } from '~/ctx';
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';


export default function Index() {

  const user = auth().currentUser;
  const [loading,setLoading] = useState(false);
  const { profile, setProfile, clearProfile } = useUserProfile();

  const checkUserProfile = async () => {

 
    setLoading(true)
    try {
      // Retrieve the document for the user's UID
      const documentSnapshot = await firestore()
      .collection('profiles')
      .doc(user?.uid)
      .get(); // Use get() for a one-time read
    
      if (documentSnapshot.exists) {
      // Profile exists
      const userProfile = documentSnapshot.data();
      console.log('User profile found:', userProfile);
      // setProfile(userProfile);

      } else {
      // Profile does not exist
      alert("Hi, we see it's your first time here! Please create a profile before using our services.")
      router.replace("/(profileCreation)/simpleInformation")
      return null;
      }
    } catch (error) {
      console.error('Error checking user profile:', error);
      throw error;
    }

    setLoading(false);

    };


    useEffect(()=>{
      checkUserProfile();
    },[])



  return (
<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  

      <Button
        title="Sign Out"
        onPress={() => {
          auth().signOut()
          clearProfile();
        }}
      />

      




    </View>
  );
}