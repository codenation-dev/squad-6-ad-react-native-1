import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

export default function Favorites({ navigation }) {
  return(
    <View style={styles.container}>
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