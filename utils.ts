
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

function getApiEndpoint() {
  if (!__DEV__) {
    // In production, use env variable from the .env file
    return process.env.EXPO_PUBLIC_API_URL;
  }

  // In dev mode, pick the correct local address
  if (Platform.OS === 'ios') {
    return 'https://abundance-backend-production.up.railway.app';
  } else {
    return 'https://abundance-backend-production.up.railway.app';
  }
}

export const API_ENDPOINT = getApiEndpoint();
export const EDAMAM_APP_ID = process.env.EXPO_PUBLIC_EDAMAM_ID;
export const EDAMAM_APP_KEY = process.env.EXPO_PUBLIC_EDAMAM_APP_KEY;




export const toggleItemInList = <T>( item: T, setState: React.Dispatch<React.SetStateAction<T[]>>) => {
  setState((prevList) => {
    const itemExists = prevList.includes(item); // Will work for any type
    return itemExists ? prevList.filter((listItem) => listItem !== item) : [...prevList, item];
  });
};


// for profile creation only
export const updateLocalProfileFields = async (fields: Record<string, any>) => {
  try {
      // Retrieve the existing profile data
      const existingData = await AsyncStorage.getItem('profileData');
      const profile = existingData ? JSON.parse(existingData) : {};

      // Merge the new fields into the profile data
      Object.keys(fields).forEach((key) => {
          profile[key] = fields[key];
      });

      // Save the updated profile data back to AsyncStorage
      await AsyncStorage.setItem('profileData', JSON.stringify(profile));

  } catch (error) {
      console.error('Failed to update profile data:', error);
  }
};