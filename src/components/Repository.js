import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

export default function Repository() {
  return (
    <View>
      <View style={styles.repository}>
        <View style={styles.header}>
          <Text style={styles.title}>Projeto 1</Text>
          <View style={styles.star}>
            <Text style={styles.textStar}>1000</Text>
          </View>
        </View>
        <View style={styles.technologies}>
          <Text style={styles.label}>React</Text>
          <Text style={styles.label}>React Native</Text>
          <Text style={styles.label}>CSS</Text>
          <Text style={styles.label}>JavaScript</Text>
        </View>
      </View>

      <View style={styles.repository}>
        <View style={styles.header}>
          <Text style={styles.title}>Projeto 2</Text>
          <View style={styles.star}>
            <Text style={styles.textStar}>10</Text>
          </View>
        </View>
        <View style={styles.technologies}>
          <Text style={styles.label}>React</Text>
          <Text style={styles.label}>React Native</Text>
          <Text style={styles.label}>CSS</Text>
          <Text style={styles.label}>JavaScript</Text>
        </View>
      </View>

      <View style={styles.repository}>
        <View style={styles.header}>
          <Text style={styles.title}>Projeto 3</Text>
          <View style={styles.star}>
            <Text style={styles.textStar}>400</Text>
          </View>
        </View>
        <View style={styles.technologies}>
          <Text style={styles.label}>React</Text>
          <Text style={styles.label}>React Native</Text>
          <Text style={styles.label}>CSS</Text>
          <Text style={styles.label}>JavaScript</Text>
        </View>
      </View>

      <View style={styles.repository}>
        <View style={styles.header}>
          <Text style={styles.title}>Projeto 5</Text>
          <View style={styles.star}>
            <Text style={styles.textStar}>1000</Text>
          </View>
        </View>
        <View style={styles.technologies}>
          <Text style={styles.label}>React</Text>
          <Text style={styles.label}>React Native</Text>
          <Text style={styles.label}>CSS</Text>
          <Text style={styles.label}>JavaScript</Text>
        </View>
      </View>

      <View style={styles.repository}>
        <View style={styles.header}>
          <Text style={styles.title}>Projeto 6</Text>
          <View style={styles.star}>
            <Text style={styles.textStar}>1000</Text>
          </View>
        </View>
        <View style={styles.technologies}>
          <Text style={styles.label}>React</Text>
          <Text style={styles.label}>React Native</Text>
          <Text style={styles.label}>CSS</Text>
          <Text style={styles.label}>JavaScript</Text>
        </View>
      </View>

      <View style={styles.repository}>
        <View style={styles.header}>
          <Text style={styles.title}>Projeto 7</Text>
          <View style={styles.star}>
            <Text style={styles.textStar}>1000</Text>
          </View>
        </View>
        <View style={styles.technologies}>
          <Text style={styles.label}>React</Text>
          <Text style={styles.label}>React Native</Text>
          <Text style={styles.label}>CSS</Text>
          <Text style={styles.label}>JavaScript</Text>
        </View>
      </View>

    </View>

  )
}

const styles = StyleSheet.create({
  repository: {
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 15,
    padding: 10
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 8
  },
  star: {
    flex: 2,
    justifyContent: 'flex-end',
    flexDirection: 'row'
  },
  textStar: {
    fontSize: 20
  },
  technologies: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 8
  },
  label: {
    color: '#999',
    paddingHorizontal: 8
  }
});