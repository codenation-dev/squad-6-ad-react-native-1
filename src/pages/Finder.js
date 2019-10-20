import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  AsyncStorage,
  Platform,
  ActivityIndicator,
  Image,
  ScrollView
} from 'react-native';

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import Axios from 'axios';


const userTokenKey = '@userTokenKey';

class Finder extends Component {
  state = {
    loading: true,
    location: '',
    errorMessage: '',
    users: {},
    loadedUserData: {}
  }

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this.getLocation();
    }
  }

  loadUsersFromLocation = async (location) => {
    let result = await Axios.get(`https://api.github.com/search/users?q=location:${location.toLowerCase()}`);
    let { items } = result.data;
    debugger;
    if (items) {
      this.setState({ users: items });
    }
  }

  getLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({ errorMessage: 'Permissão para acesso a localização negada' });
    }

    let location = await Location.getCurrentPositionAsync({});
    let address = await Location.reverseGeocodeAsync(location.coords);
    location = address[0];
    if (address && (!address[0].city)) {
      let zipCode = address[0].postalCode.replace('-', '');
      let cityByZipCode = await Axios.get(`https://viacep.com.br/ws/${zipCode}/json/`);
      let { localidade } = cityByZipCode.data;
      location.city = localidade;
    }
    this.setState({ location });
    await this.loadUsersFromLocation(location.city);
    this.setState({ loading: false });
  }

  logout = async () => {
    await AsyncStorage.removeItem(userTokenKey);
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle='dark-content' />
        {this.state.loading && (
          <View style={styles.loadingContent}>
            <ActivityIndicator size="large" color="#000000" />
          </View>
        )}
        {!this.state.loading && (
          <ScrollView>
            <View style={styles.usersContainer}>
              {this.state.users.map((user) => (
                <View key={user.id} style={styles.userCard}>
                  <Image source={{ uri: user.avatar_url }}
                    style={styles.userImage}
                  />
                </View>
              ))}
            </View>
            <TouchableOpacity onPress={this.logout}>
              <Text>Logout - location:{this.state.location.city}</Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingContent: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  usersContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    marginTop: 80,
    marginLeft: 0
  },
  userImage: {
    height: 100,
    width: 100,
    borderRadius:50,
    backgroundColor: '#fff',
  },
  userCard: {
    height: 200,
    width: 150,
    padding: 20,
    alignItems:'center',
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
  }
});

export default Finder;