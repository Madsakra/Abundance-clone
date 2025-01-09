
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





export const toggleItemInList = <T>( item: T, setState: React.Dispatch<React.SetStateAction<T[]>>) => {
  setState((prevList) => {
    const itemExists = prevList.includes(item); // Will work for any type
    return itemExists ? prevList.filter((listItem) => listItem !== item) : [...prevList, item];
  });
};

