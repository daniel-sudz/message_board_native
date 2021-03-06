import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as GoogleSignIn from 'expo-google-sign-in';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import {
    Button,
    SafeAreaView,
    Alert,
    Image,
} from 'react-native';

import LoadingScreen from './screens/LoadingScreen';
import DashBoardScreen from './screens/DashBoardScreen';
import LoginScreen from './screens/LoginScreen';
import Message_Board from "./Chat";


type ComponentState = {
    loggedIn: boolean,
    email?: string
};

export default class App extends Component<{}, ComponentState> {

    constructor(props: any) {
        super(props);
        this.state = {
            loggedIn: false
        }
    }

    render() {
        if (this.state.loggedIn) {
            return <Message_Board email={this.state.email} />;
        } else {
            return (
                <LoginScreen
                    onGetEmail={(email: string) => this.setEmail(email)}
                />
                //<Message_Board email={this.state.email} />
                
            );
            
        }

    }

    setEmail(email: string) {
        this.setState({
            loggedIn: true,
            email: email
        });
    }
}



const AppSwitchNavigator = createSwitchNavigator({
    Loading: LoadingScreen,
    LoginScreen: LoginScreen,
    DashBoardScreen: DashBoardScreen
})

const AppNavigator = createAppContainer(AppSwitchNavigator);

import * as firebase from 'firebase';
const FirebaseConfig = {
    apiKey: "AIzaSyCRZzl-7AwGctiwh71rOMhqAKKcmbgrBFU",
    authDomain: "messages-6dce5.firebaseapp.com",
    databaseURL: "https://messages-6dce5.firebaseio.com",
    projectId: "messages-6dce5",
    storageBucket: "messages-6dce5.appspot.com",
    messagingSenderId: "1092488556161",
    appId: "1:1092488556161:web:eb096ba797c0c9fcad2780",
    measurementId: "G-5F6Y7Y0TEZ"
}
firebase.initializeApp(FirebaseConfig);



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3498db'
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'flex-start',
        marginTop: 70,

    },
    logo: {
        width: 300,
        height: 300
    },
    title: {
        fontSize: 20,
    }
});