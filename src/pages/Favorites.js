import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  AsyncStorage,
  ScrollView
} from 'react-native';

import Header from '../components/Header';
import UserList from '../components/UserList';
import { handleAndroidBackButton, removeAndroidBackButtonHandler } from '../services/BackViewService';

import linktocat from '../assets/linktocat.jpg'

const favsKey = '@favs';

export default function Favorites({ navigation }) {
  const [favs, setFavs] = useState(null);

  useEffect(() => {
    handleAndroidBackButton(() => { navigation.navigate('Finder'); removeAndroidBackButtonHandler(); });
  }, []);

  useEffect(() => {
    AsyncStorage.getItem(favsKey).then(favs => {
      if (!favs) {
        setFavs(null);
      } else {
        setFavs(favs);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' />

      {!favs && (
        <View style={styles.noFavs}>
          <Image source={linktocat} style={styles.linktocat} />
          <Text style={styles.noFavsText}>Que pena, você ainda não tem devs favoritos.</Text>
        </View>
      )}

      {favs && (
        <ScrollView style={{ marginTop: '25%', zIndex: 0 }}>
          <UserList users={favs} navigation={navigation} />
        </ScrollView>
      )}

      <Header navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  noFavs: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%'
  },
  linktocat: {
    width: 250,
    height: 250
  },
  noFavsText: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});