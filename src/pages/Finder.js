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
  ScrollView,
  Alert
} from 'react-native';

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import Axios from 'axios';

import UserList from '../components/UserList';
import Header from '../components/Header';
import { handleAndroidBackButton, removeAndroidBackButtonHandler } from '../services/BackViewService';
import { exitAlert } from '../services/ExitAlertService';

import { GIT_ID, GIT_LINK, GIT_SECRET } from '../services/GitKeys';

const userTokenKey = '@userTokenKey';

class Finder extends Component {

  constructor() {
    super();
    this.state = {
      loading: true,
      location: '',
      errorMessage: '',
      users: {},
      loadedUserData: {},
    }
    this.page = 1;
    this.previouPage = this.page;
    this.loadMoreUsersButtonLabel = 'Next Page';
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

  componentDidMount() {
    handleAndroidBackButton(this.navigateBack);
  }

  componentWillUnmount() {
    removeAndroidBackButtonHandler();
  }

  navigateBack = async () => {
    if (this.page > 1) {
      this.page = this.page - 1;
      this.setState({ loading: true });
      let usersLoaded = await this.loadUsersFromLocation(this.state.location.city);
      this.loadMoreUsersButtonLabel = (usersLoaded.length > 0) ? 'Next Page' : 'Back to First Page';
      this.setState({ loading: false });
    }
    else {
      exitAlert();
    }
    return true;
  }

  loadUsersFromLocation = async (location) => {
    try {
      let result = await Axios.get(`https://api.github.com/search/users?${GIT_LINK}&q=location:${location.toLowerCase()}&per_page=6&page=${this.page}`);
      let { items } = result.data;

      if (items) {
        items = await Promise.all(
          items.map(async (user) => {
            let { data } = await this.getUsersAmountFollowed(user.login);
            return { ...user, followersAmount: data.followers }
          })
        )
        this.setState({ users: items });
      }
      return items;
    } catch (error) {
      this.props.navigation.navigate('NetworkError');
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

  loadMoreData = async () => {
    this.previouPage = this.page;
    this.page = (this.state.users.length > 0) ? this.page + 1 : this.page;
    this.setState({ loading: true });
    let usersLoaded = await this.loadUsersFromLocation(this.state.location.city);
    this.loadMoreUsersButtonLabel = (usersLoaded.length > 0) ? 'Next Page' : 'Back to First Page';
    if (usersLoaded.length <= 0) {
      this.page = 1;
    }
    this.setState({ loading: false });
  }

  getUsersAmountFollowed = (userLogin) => {
    let url = `https://api.github.com/users/${userLogin}?${GIT_LINK}`;
    return Axios.get(url);
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle='dark-content' />
        <View style={{ zIndex: 0 }}>
          {this.state.loading && (
            <View style={styles.loadingContent}>
              <ActivityIndicator size="large" color="#000000" />
            </View>
          )}
          {((!this.state.loading) && (this.state.users.length > 0))
            && (
              <ScrollView style={{ marginTop: '25%', zIndex: 0 }}>
                <UserList users={this.state.users} navigation={this.props.navigation} />
              </ScrollView>
            )
          }
          {
            ((!this.state.loading) && (this.state.users.length == 0)) && (
              <Text>Ooops! Something went wrong</Text>
            )
          }
          {!this.state.loading && (
            <View style={styles.footer}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={this.loadMoreData}
                style={styles.loadMoreBtn}>
                <Text style={styles.btnText}>{this.loadMoreUsersButtonLabel}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <Header navigation={this.props.navigation} />
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
  footer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#000000',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#ffffff',
    fontSize: 15,
    textAlign: 'center',
  },
});

export default Finder;