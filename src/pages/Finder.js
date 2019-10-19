import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  AsyncStorage,
  Platform,
  ActivityIndicator
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
    let result  = await Axios.get(`https://api.github.com/search/users?q=location:${location.toLowerCase()}`);
    let {items} = result.data;
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
<<<<<<< HEAD
        {this.state.loading && (
          <View style={styles.loadingContent}>
            <ActivityIndicator size="large" color="#000000" />
          </View>
        )}
        {!this.state.loading && (
          <TouchableOpacity onPress={this.logout}>
            <Text>Logout - location:{this.state.location.city} - users {JSON.stringify(this.state.users)}</Text>
          </TouchableOpacity>
        )}
=======
        
        <TouchableOpacity onPress={this.logout}>
          <Text>Logout</Text>
        </TouchableOpacity>

        <Text style={{fontWeight: 'bold'}}>Location: {this.state.location.city}</Text>
>>>>>>> master
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
  }
});

export default Finder;