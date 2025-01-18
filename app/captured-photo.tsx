import { Entypo } from '@expo/vector-icons';
import axios from 'axios';
import { Link, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import FunctionTiedButton from '~/components/FunctionTiedButton';
import { EdamamApiResponse } from '~/types/common/edaman';
import { EDAMAM_APP_ID, EDAMAM_APP_KEY } from '~/utils';

export default function CapturedPhoto() {
  const { media, type } = useLocalSearchParams();

  const baseUrl = 'https://api.edamam.com/api/recipes/v2';
  const params = {
    uri: `file://${media}`,
    name: 'food.jpg',
    type: 'image/jpeg',
    app_id: EDAMAM_APP_ID,
    app_key: EDAMAM_APP_KEY,
    imageSize: 'SMALL',
  };

  const sendToEdamam = async () => {
    try {
      const response = await axios.post<EdamamApiResponse>(baseUrl, params);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <View>
      <Link
        style={{
          marginTop: 20,
          fontWeight: 'bold',
        }}
        href="/(userScreens)/(caloriesAndGlucose)/calories/food-scanner/food-scanner">
        <Entypo name="chevron-left" size={30} color="black" />
      </Link>
      {type === 'photo' ? (
        <Image
          source={{ uri: `file://${media}` }}
          style={{ width: '100%', height: '80%', resizeMode: 'contain' }}
        />
      ) : null}
      <FunctionTiedButton
        onPress={() => console.log('Log Food')}
        title="Calculate Calories"
        buttonStyle={styles.buttonBox}
        textStyle={styles.buttonText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonBox: {
    backgroundColor: '#C68F5E',
    paddingHorizontal: 10,
    borderRadius: 30,
    marginTop: 40,
  },

  buttonText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: 'white',
    padding: 10,
    textAlign: 'center',
  },
});
