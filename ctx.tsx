import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { router } from 'expo-router';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface Goals {
  id: string;
  name: string;
  value: number;
}

interface ProfileDiet {
  id: string;
  name: string;
}

interface ProfileHealthCondi {
  id: string;
  name: string;
}

// Define the shape of the user profile data
interface UserProfile {
  birthDate: string;
  gender: string;
  goals: Goals[];
  height: string;
  image: string;
  name: string;
  profileDiet: ProfileDiet[];
  profileHealthCondi: ProfileHealthCondi[];
  weight: string;
}

// Define the context value structure
interface UserProfileContextValue {
  profile: UserProfile | null;
  setProfile: (profile: UserProfile) => void;
}

// Create the context with a default value of null
const UserProfileContext = createContext<UserProfileContextValue | undefined>(undefined);

export const UserProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const onAuthStateChanged = async (user: FirebaseAuthTypes.User | null) => {
    setLoading(true);
    console.log('user:', user);

    if (user) {
      if (!user?.emailVerified) {
        auth().signOut();
        setLoading(false);
        alert('Please verify your profile before joining us on the app!');
        return null;
      }

      try {
        const documentSnapshot = await firestore().collection('profiles').doc(user?.uid).get(); // Use get() for a one-time read

        if (documentSnapshot.exists) {
          // Profile exists
          const userProfile = documentSnapshot.data() as UserProfile;
          console.log('User profile found:', userProfile);
          setProfile(userProfile);
        } else {
          // Profile does not exist
          alert(
            "Hi, we see it's your first time here! Please create a profile before using our services."
          );
          router.replace('/(profileCreation)/simpleInformation');
          return null;
        }
      } catch (error) {
        console.error('Error checking user profile:', error);
        throw error;
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <UserProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
};

// Custom hook to use the UserProfileContext
export const useUserProfile = (): UserProfileContextValue => {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }
  return context;
};
