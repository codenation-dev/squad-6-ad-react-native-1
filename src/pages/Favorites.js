import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

import Header from '../components/Header';

export default function Favorites({ navigation }) {
  return (
    <View style={styles.container}>
      <Header />
      <Text>Favorites Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});