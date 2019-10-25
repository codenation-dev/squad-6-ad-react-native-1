import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView
} from 'react-native';
import Repository from '../components/Repository';

import Header from '../components/Header';

export default class Details extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation} />
        <View style={{ marginTop: '20%', padding: 0 }}>
          <View style={styles.profileHeader}>
            <Image
              source={{ uri: 'https://avatars3.githubusercontent.com/u/8082302?s=460&v=4' }}
              style={styles.profileImage}
            />
            <View>
              <Text style={styles.profileName}>Ana Carolina Fidelis</Text>
              <View style={styles.profileSocial}>
                <Text style={styles.profileSocialLabel}>@acarolinafg</Text>
                <Text style={styles.profileSocialLabel}>10 Seguidores</Text>
              </View>
            </View>
          </View>

          <View style={styles.profileExtraInfo}>
            <Text style={styles.profileText}>Juiz de Fora, Minas Gerais</Text>
            <Text style={styles.profileTab}>|</Text>
            <Text style={styles.profileText}>SunMedia</Text>
          </View>

          <View style={styles.profileBio}>
            <Text style={styles.profileText}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
          </View>

          <View style={styles.profileContact}>
            <Text>acarolinafg@gmail.com</Text>
            <Text style={{ paddingHorizontal: 10 }}>|</Text>
            <Text>acarolinafg.com.br</Text>
          </View>

          <ScrollView style={styles.profileRepositories}>
            <Repository />
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 16,
    paddingBottom: 10
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
    flexDirection: 'row',
    marginLeft: 8,
    marginTop: 16
  },
  profileSocialLabel: {
    color: '#808080',
    fontSize: 16,
    paddingHorizontal: 8
  },
  profileExtraInfo: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
  },
  profileBio: {
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 12,
    marginBottom: 12
  },
  profileContact: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#c4c4c4',
    borderRadius: 5
  },
  profileText: {
    color: '#000',
    fontSize: 16
  },
  profileTab: {
    color: '#000',
    fontSize: 18,
    marginLeft: 10,
    marginRight: 10
  },
  profileRepositories: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10
  }
});