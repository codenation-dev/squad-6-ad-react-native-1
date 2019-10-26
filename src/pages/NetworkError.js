import React from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';


import Header from '../components/Header';


function NetworkError({ navigation }) {
    handleTryAgain = ()=>{
        navigation.navigate('Finder');
    }
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={require('../assets/octobiwanedited.png')}
                    style={styles.image} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>Doh! Something went wrong...</Text>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={this.handleTryAgain}
                    style={styles.loadMoreBtn}>
                    <Text style={styles.btnText}>Try Again</Text>
                </TouchableOpacity>
                <Text style={styles.smallSugetion}>If that doesn't work. 
                    try sign-out and back again</Text>
            </View>
            <Header navigation={navigation} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: 300,
        width: 300,
    },
    imageContainer: {
        height: 350,
        width: 350,
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'Roboto'
    },
    textContainer: {
        alignItems: 'center'
    },
    loadMoreBtn: {
        padding: 10,
        backgroundColor: '#000000',
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width:140,
        marginTop:15
      },
      btnText: {
        color: '#ffffff',
        fontSize: 15,
        textAlign: 'center',
      },
      smallSugetion:{
          fontSize:14,
          marginTop:20
      }
})

export default NetworkError;