import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as firebase from 'firebase';
import * as GoogleSignIn from 'expo-google-sign-in';
import {createSwitchNavigator} from 'react-navigation';
import {
  Button,
  SafeAreaView,
  Alert,
  Image,
} from 'react-native';

class LoadingScreen extends Component {

    ifloggedin = () => {
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                this.props.navigation.navigate('DashBoardScreen');
            }
            else {
                this.props.navigation.navigate('LoginScreen');
            }
        }
        )}

    render () {
        this.ifloggedin();
        return (
            <View style={styles_loading.container}>
                <ActivityIndicator size="large"/>
            </View>            
        );
    }
}

export default LoadingScreen; 


const styles_loading = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'center',
    }
});