import React from 'react'
import {
    View,
    StyleSheet
} from 'react-native';

import UserCard from './UserCard';


export default function UserList({ users, navigation }) {
    return (
        <View style={styles.usersContainer}>
            {users.map((user) => (
                <UserCard key={user.id} userItem={user} navigation={navigation} />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    usersContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        zIndex: 0
    }
})