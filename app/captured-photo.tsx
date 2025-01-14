import { useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, View } from 'react-native';

export default function CapturedPhoto() {
  const { media, type } = useLocalSearchParams();

  useEffect(() => {
    console.log(media, type);
  }, []);

  return (
    <View>
      {type === 'photo' ? (
        <Image
          source={{ uri: `file://${media}` }}
          style={{ width: '100%', height: '80%', resizeMode: 'contain' }}
        />
      ) : null}
    </View>
  );
}
