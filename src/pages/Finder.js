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
  ScrollView
} from 'react-native';

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import Axios from 'axios';

import UserList from '../components/UserList';

const userTokenKey = '@userTokenKey';

class Finder extends Component {
  constructor(props) {
    super(props);
  };

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

    if (items) {
      items = await Promise.all(
        items.map(async (user) => {
          let { data } = await this.getUsersAmountFollowed(user.login);
          return { ...user, followersAmount: data.length }
        })
      )
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

  getUsersAmountFollowed = (userLogin) => {
    let url = `https://api.github.com/users/${userLogin}/followers`;
    return Axios.get(url);
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
            <UserList users={this.state.users} navigation={this.props.navigation} />
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
  }
});

export default Finder;