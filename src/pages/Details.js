import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  FlatList
} from 'react-native';
import Axios from 'axios';
import Repository from '../components/Repository';
import Header from '../components/Header';

export default class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      repos: {}
    }
  };

  async componentDidMount() {
    const URL = 'https://api.github.com/users/' + this.props.navigation.getParam('username');
    const { data } = await Axios.get(URL);
    if (data) {
      this.setState({ user: data });
      //carregar repositório
      objects = await Axios.get(data.repos_url);
      this.setState({ repos: objects });;
    }

  }

  render() {
    const user = this.state.user;
    const repos = this.state.repos;
    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation} />
        <View style={{ marginTop: Header.menu ? '20%' : '18%', padding: 0 }}>
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

          <View style={styles.profileExtraInfo}>
            {user.location && (
              <Text style={styles.profileText}>{user.location}</Text>
            )}

            {user.company && user.location && (
              <Text style={styles.profileTab}>|</Text>
            )}

            {user.company && (
              <Text style={styles.profileText}>{user.company}</Text>
            )}
          </View>

          {user.bio && (
            <View style={styles.profileBio}>
              <Text style={styles.profileText}>{user.bio}</Text>
            </View>
          )}

          {user.email && user.blog !== "" && (
            <View style={styles.profileContact}>
              {user.email && (
                <Text>{user.email}</Text>
              )}

              {user.email && user.blog && (
                <Text style={{ paddingHorizontal: 10 }}>|</Text>
              )}

              {user.blog !== "" && (
                <Text>{user.blog}</Text>
              )}
            </View>
          )}

          {(repos) && (
            <View style={styles.profileRepositories}>
              <FlatList
                data={repos}
                keyExtractor={item => item.index}
                renderItem={({ item, index }) => <Repository item={item} />}
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