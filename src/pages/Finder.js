import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  AsyncStorage
} from 'react-native';

const userTokenKey = '@userTokenKey';

export default function Finder({ navigation }) {
  async function logout() {
    await AsyncStorage.removeItem(userTokenKey);
    navigation.navigate('Login');
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' />

      <TouchableOpacity onPress={logout}>
        <Text>Logout from Finder Page</Text>
      </TouchableOpacity>
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