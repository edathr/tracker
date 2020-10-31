import React from 'react';

// Components
import {StyleSheet, View, Text} from 'react-native';
import { Card } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

// Firebase
import * as firebase from 'firebase';

const SignedInScreen = ({ navigation }) => {
    const logOut = () => {
        firebase
            .auth()
            .signOut()
            .then((res) => {
                navigation.navigate("SignedOut")
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <View style={{paddingTop: 20}}>
            <Card>
                <Text style={{fontSize: 18, paddingBottom: 20}}>You are logged in!</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {logOut()}}
                >
                    <Text style={{color: 'white', fontSize: 16}}>LOG OUT</Text>
                </TouchableOpacity>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#7E82C4',
        borderRadius: 5,
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 5,
        marginBottom: 10
    },
});

export default SignedInScreen;