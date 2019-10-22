import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';


export default function UserCard({ userItem, navigation }) {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Details")}>
      <View key={userItem.id} style={styles.userCard}>
        <Image source={{ uri: userItem.avatar_url }}
          style={styles.userImage}
        />
        <View style={styles.descriptionTextContainer}>
          <Text style={styles.titleText}>{userItem.login}</Text>
          <Text style={styles.subtitleText}>{userItem.followersAmount} Seguidores</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  userImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: 0.3,
    borderColor: '#000',
    backgroundColor: '#fff',
    marginBottom: 10
  },
  userCard: {
    height: 200,
    width: 170,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  titleText: {
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 10
  },
  subtitleText: {
    fontSize: 14,
    marginBottom: 10
  },
  descriptionTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});