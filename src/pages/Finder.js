import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  AsyncStorage,
  Platform
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
    errorMessage: ''
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

  getLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({errorMessage:'Permissão para acesso a localização negada'});
    }

    let location = await Location.getCurrentPositionAsync({});
    let address = await Location.reverseGeocodeAsync(location.coords);
    location = address[0];
    if(address&&(!address[0].city)){
      let zipCode = address[0].postalCode.replace('-','');
      let cityByZipCode = await Axios.get(`https://viacep.com.br/ws/${zipCode}/json/`);
      let {localidade} = cityByZipCode.data;
      location.city = localidade;
    }
    this.setState({location});
  }

  logout = async () => {
    await AsyncStorage.removeItem(userTokenKey);
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle='dark-content' />
        
        <TouchableOpacity onPress={this.logout}>
          <Text>Logout</Text>
        </TouchableOpacity>

        <Text style={{fontWeight: 'bold'}}>Location: {this.state.location.city}</Text>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Finder;