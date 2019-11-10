import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as GoogleSignIn from 'expo-google-sign-in';
import {createSwitchNavigator} from 'react-navigation';
import {
  Button,
  SafeAreaView,
  Alert,
  Image,
} from 'react-native';



class DashBoardScreen extends Component<{email: string}> {
    render () {
        return (
            <View style={styles_dash.container}>
                <Text> {this.props.email} </Text>
            </View>
            
        );
    }
}

export default DashBoardScreen; 


const styles_dash = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'center',
    }
});