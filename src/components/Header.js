/**
 * @authors 
 * Gabriel Ferreira
 * 
 * @lastEditBy
 * 24/10/2019 - Gabriel Ferreira
 * 
 */

import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  StatusBar,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import logo from '../assets/logo.png';

const userTokenKey = '@userTokenKey';

export default function Header({ navigation }) {
  const [menu, setMenu] = useState(false);

  async function logout() {
    await AsyncStorage.removeItem(userTokenKey);
    return navigation.navigate('Login');
  }

  function about() {
    return navigation.navigate('About');
  }

  return (
    <>
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} />
        <TouchableOpacity style={styles.menu} onPress={() => { setMenu(!menu); }}>
          <Ionicons name='md-menu' size={35} color='#000' />
        </TouchableOpacity>
      </View>

      {menu && (
        <View style={styles.menuDrop}>
          <TouchableOpacity style={styles.menuSelect} onPress={() => { console.log('Favs'); }}>
            <Ionicons name='md-star' size={35} color='#fff' />
            <Text style={styles.menuText}>Favoritos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuSelect} onPress={() => { about(); }}>
            <Ionicons name='md-information-circle-outline' size={35} color='#fff' />
            <Text style={styles.menuText}>Sobre</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuSelect} onPress={() => { logout(); }}>
            <Ionicons name='md-log-out' size={35} color='#fff' />
            <Text style={styles.menuText}>Sair</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight + 5 : 0,
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  logo: {
    height: 50,
    width: 50,
  },
  menu: {
    position: 'absolute',
    right: '5%'
  },
  menuDrop: {
    position: 'absolute',
    top: '9.65%',
    width: '100%',
    height: 150,
    backgroundColor: '#262626',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 30,
    zIndex: 1
  },
  menuSelect: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '10%',
    marginVertical: '1.5%',
  },
  menuText: {
    color: '#fff',
    marginLeft: '2%',
    fontSize: 26
  }
});