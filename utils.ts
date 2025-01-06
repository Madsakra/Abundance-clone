
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