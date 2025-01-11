import { useFonts } from 'expo-font';
import { Slot, Stack } from 'expo-router';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SessionProvider } from '~/ctx';

// export const unstable_settings = {
//   // Ensure that reloading on `/modal` keeps a back button present.
//   initialRouteName: 'sign-in',
// };






export default function RootLayout() {




  const [loaded,error] = useFonts({
    'Poppins-ExtraLight':require('../assets/fonts/Poppins-ExtraLight.ttf'),
    'Poppins-Light':require('../assets/fonts/Poppins-Light.ttf'),
    'Poppins-Regular':require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium':require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-SemiBold':require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Bold':require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-ExtraBold':require('../assets/fonts/Poppins-ExtraBold.ttf'),
    'Poppins-Black':require('../assets/fonts/Poppins-Black.ttf'),
  })
  
  if (!loaded && !error) {
    return null;
  }







  return (
    <SessionProvider>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Slot />
    </GestureHandlerRootView>
    </SessionProvider>
  );
}
