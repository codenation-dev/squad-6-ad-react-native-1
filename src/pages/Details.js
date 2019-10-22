import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

export default class Details extends React.Component {
  constructor(props){
    super(props);
  };

  render(){
    return(
      <View style={styles.container}>
          <Text>Details Page</Text>
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