import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar
} from 'react-native';

import { Linking } from 'expo';

import Header from '../components/Header';
import { handleAndroidBackButton, removeAndroidBackButtonHandler } from '../services/BackViewService';

function DevProfile({ dev }) {
  return (
    <View style={styles.profileHeader}>
      <Image
        source={{ uri: dev.avatar_url }}
        style={styles.profileImage}
      />
      <View>
        <Text style={styles.profileName}>{dev.name}</Text>
        <View style={styles.profileSocial}>
          <Text style={styles.profileSocialLabel}>@{dev.login}</Text>
          <Text style={styles.profileSocialLabel}>{dev.followers} Seguidores</Text>
        </View>
      </View>
    </View>
  );
}

function Devs({ navigation }) {
  const devs = [
    {
      "id": 8082302,
      "login": "acarolinafg",
      "avatar_url": "https://avatars2.githubusercontent.com/u/8082302?v=4",
      "name": "Ana Carolina",
      "followers": 5,
    },
    {
      "id": 12850879,
      "login": "andersonRocha091",
      "avatar_url": "https://avatars3.githubusercontent.com/u/12850879?v=4",
      "name": "Anderson Souza",
      "followers": 3,
    },
    {
      "id": 36803662,
      "login": "GabrielF9",
      "avatar_url": "https://avatars3.githubusercontent.com/u/36803662?v=4",
      "name": "Gabriel Ferreira",
      "followers": 6,
    },
  ];

  return (
    <>
      <Text style={styles.aboutText}>Aplicativo desenvolvido como forma de desafio final do AceleraDev React-Native. E produzido por:</Text>
      {devs.map((dev) => (
        <TouchableOpacity key={dev.id} onPress={() => { navigation.navigate('Details', { username: dev.login }) }}>
          <DevProfile dev={dev} />
        </TouchableOpacity>
      ))}
    </>
  );
}

export default function About({ navigation }) {
  useEffect(() => {
    handleAndroidBackButton(() => { navigation.navigate('Finder'); removeAndroidBackButtonHandler(); });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <View style={styles.devs}>
        <Text style={styles.aboutText}>Encontre os desenvolvedores que estão na mesma cidade que você.</Text>
        <Devs navigation={navigation} />
      </View>

      <Header navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 12,
    marginTop: 0
  },
  devs: {
    width: '92.5%',
    height: '80%',
    justifyContent: 'space-around'
  },
  aboutText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "left"
  },
  profileHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 0,
    paddingBottom: 10,
    alignSelf: 'center'
  },
  profileImage: {
    height: 100,
    width: 100,
    borderRadius: 50
  },
  profileName: {
    color: '#000',
    fontSize: 22,
    fontWeight: "bold",
    paddingLeft: 16
  },
  profileSocial: {
    alignItems: 'center',
    marginLeft: 8,
    marginTop: 5
  },
  profileSocialLabel: {
    color: '#808080',
    fontSize: 16,
    paddingHorizontal: 8
  },
});