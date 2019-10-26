/**
 * @authors 
 * Gabriel Ferreira
 * Anderson
 * 
 * @lastEditBy
 * 17/10/2019 - Gabriel Ferreira
 * 
 */

import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  AsyncStorage,
  Alert
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { AuthSession } from 'expo';

import axios from 'axios';

import logo from '../assets/logo.png';

// Remember to remove keys when do the commit
// TODO - Make a backend server to serve a api for the app

//Before testing login you must go to your github account:
// 1 - create a new app at your developer settings
// 2 - in home url and url callback you should input the redirectUrl obtained
// by the method AtuhSession.getRedirectUrl
import { GIT_ID, GIT_SECRET } from '../services/GitKeys';
const userTokenKey = '@userTokenKey';

export default function Login({ navigation }) {
  useEffect(() => {
    AsyncStorage.getItem(userTokenKey).then(token => {
      if (token) {
        navigation.navigate('Finder');
      }
    });
  }, []);

  async function awaitUserLogin() {
    try {
      const redirectUrl = AuthSession.getRedirectUrl();
      console.log(redirectUrl);

      const temporaryCode = await AuthSession.startAsync({
        authUrl:
          `https://github.com/login/oauth/authorize?` +
          `client_id=${GIT_ID}` +
          `&redirect_uri=${encodeURIComponent(redirectUrl)}`,
      });

      const { code } = temporaryCode.params;

      const switchCodeInToken = await axios.post(
        `https://github.com/login/oauth/access_token?` +
        `client_id=${GIT_ID}` +
        `&client_secret=${GIT_SECRET}` +
        `&code=${code}`
      );

      let token = switchCodeInToken.data;
      token = token.split('&')[0];
      token = token.split('=')[1];

      if (token) {
        await AsyncStorage.setItem(userTokenKey, token);
        navigation.navigate('Finder');
      }
    } catch (e) {
      return Alert.alert('Erro ao realizar o login!', 'Por favor tente novamente.');
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' />

      <Image source={logo} style={styles.logo} />

      <TouchableOpacity style={styles.button} onPress={awaitUserLogin}>
        <Ionicons name="logo-github" color="#fff" size={30} />
        <Text style={styles.buttonText}>Sign In with GitHub</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    position: 'absolute',
    top: StatusBar.currentHeight + 50,
    width: 260,
    height: 260
  },
  button: {
    position: 'absolute',
    top: '55%',
    flexDirection: 'row',
    backgroundColor: '#000',
    width: 250,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    alignSelf: 'center',
    marginLeft: 12
  }
});