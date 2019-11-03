import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Google from 'expo-google-app-auth';
import * as Expo from 'expo';
import * as GoogleSignIn from 'expo-google-sign-in';

class LoginScreen extends Component {
    async getresult() {
        try {
            const result = await Google.logInAsync({
                androidClientId: "1092488556161-d64bugk35q85c6cgdp1sfuctf54gfa09.apps.googleusercontent.com",
                scopes: ["profile", "email"],
                behavior: 'web',
                clientId: "",
            })
            console.log(result);
            if (result.type === 'success') {
                this.props.navigation.navigate('DashBoardScreen');
                return result.accessToken;
            }
            else {
                return { cancelled: true };
            }

        } catch (e) {
            console.log(e);
            return { error: true }
        }

    }
    render() {

        return (
            <View style={styles.container}>
                <Button title={"Sign In With Google"}
                    onPress={() => this.getresult()}
                />
            </View>
        );
    }
}
export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    }
});

//"1092488556161-d64bugk35q85c6cgdp1sfuctf54gfa09.apps.googleusercontent.com