import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

export default function Repository({ item }) {
  return (
    <View>
      <View style={styles.repository}>
        <View style={styles.header}>
          <Text style={styles.title}>{item.name}</Text>
          <View style={styles.star}>
            <Text style={styles.textStar}>1000</Text>
          </View>
        </View>
        <View style={styles.technologies}>
          <Text style={styles.label}>{item.language}</Text>
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