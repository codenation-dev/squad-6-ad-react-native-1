import React from 'react'
import {
    View,
    StyleSheet
} from 'react-native';

import UserCard from './UserCard';


export default function UserList({ users }) {
    return (
        <View style={styles.usersContainer}>
            {users.map((user) => (
                <UserCard key={user.id} userItem={user} />
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
        marginTop: 80,
        marginLeft: 0
      }
})