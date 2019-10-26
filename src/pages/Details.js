import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';

import Axios from 'axios';

import Repository from '../components/Repository';
import Header from '../components/Header';

import { handleAndroidBackButton, removeAndroidBackButtonHandler } from '../services/BackViewService';

import { GIT_ID, GIT_LINK, GIT_SECRET } from '../services/GitKeys';
import { Ionicons } from '@expo/vector-icons';

const favsKey = '@favs';

export default class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      repos: {},
      starred: false
    }
  };

  async componentDidMount() {
    handleAndroidBackButton(() => { this.props.navigation.navigate('Finder') });

    const URL = 'https://api.github.com/users/' + this.props.navigation.getParam('username') + `?${GIT_LINK}`;
    const { data } = await Axios.get(URL);
    if (data) {
      this.setState({ user: data });
      //carregar repositório
      const data_repo = await Axios.get(data.repos_url + `?${GIT_LINK}`);
      const objects = data_repo.data;
      this.setState({ repos: objects });
    }

    let favs = await AsyncStorage.getItem(favsKey);
    if (favs) {
      favs = JSON.parse(favs).favs;
      for (let fav of favs) {
        if (fav.id === this.state.user.id) {
          this.setState({ starred: true });
        }
      }
    }
  }

  componentWillUnmount() {
    removeAndroidBackButtonHandler();
  }

  render() {
    const user = this.state.user;
    const repos = this.state.repos;

    const star = async () => {
      let data = await AsyncStorage.getItem(favsKey);

      if (data) {
        data = JSON.parse(data).favs;

        let ver = false;
        for (let fav of data) {
          if (fav.id === this.state.user.id) {
            ver = true;
          }
        }

        if (ver) {
          await AsyncStorage.setItem(favsKey, JSON.stringify({ favs: data.filter((dev) => { return dev.login !== user.login }) }));
        } else {
          await AsyncStorage.setItem(favsKey, JSON.stringify({ favs: [...data, this.state.user] }));
        }
      } else {
        await AsyncStorage.setItem(favsKey, JSON.stringify({ favs: [this.state.user] }));
      }
      this.setState({ starred: !this.state.starred });
    }

    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation} />
        <View style={styles.details}>
          <View style={styles.profileHeader}>
            <Image
              source={{ uri: user.avatar_url }}
              style={styles.profileImage}
            />
            <View>
              <Text style={styles.profileName}>{user.name}</Text>
              <View style={styles.profileSocial}>
                <Text style={styles.profileSocialLabel}>@{user.login}</Text>
              </View>
              <View style={styles.profileSocial}>
                <Text style={styles.profileSocialLabel}>{user.followers} seguidores</Text>
                <Text style={styles.profileSocialLabel}>{user.following} seguindo</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.star} onPress={() => { star(); }}>
            <Ionicons name={this.state.starred ? 'md-star' : 'md-star-outline'} size={45} color={'black'} />
          </TouchableOpacity>

          <View style={styles.profileExtraInfo}>
            {!!user.location && (
              <Text style={styles.profileText}>{user.location}</Text>
            )}

            {!!user.company && !!user.location && (
              <Text style={styles.profileTab}>|</Text>
            )}

            {!!user.company && (
              <Text style={styles.profileText}>{user.company}</Text>
            )}
          </View>

          {!!user.bio && (
            <View style={styles.profileBio}>
              <Text style={styles.profileText}>{user.bio}</Text>
            </View>
          )}

          {!!user.email || !!user.blog && (
            <View style={styles.profileContact}>
              {!!user.email && (
                <Text>{user.email}</Text>
              )}

              {!!user.email && !!user.blog && (
                <Text style={{ paddingHorizontal: 10 }}>|</Text>
              )}

              {!!user.blog && (
                <Text>{user.blog}</Text>
              )}
            </View>
          )}

          {repos && (
            <View style={styles.profileRepositories}>
              <FlatList
                key={item => item.id}
                data={repos}
                keyExtractor={item => item.name}
                renderItem={({ item }) => <Repository key={item.id} item={item} />}
              />
            </View>
          )}
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
  details: {
    marginTop: Header.menu ? '20%' : '18%',
    padding: 0
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
  star: {
    position: 'absolute',
    right: '12%',
    top: '5.5%',
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
    margin: 10,
    marginBottom: 50
  }
});