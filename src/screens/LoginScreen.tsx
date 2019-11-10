import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import * as Google from 'expo-google-app-auth';
import * as Expo from 'expo';
import * as GoogleSignIn from 'expo-google-sign-in';
import LoadingScreen from './LoadingScreen';

type LoginScreenProps = {
    onGetEmail: (email: string) => void
};

type LoginScreenState = {
    loading: boolean
};

class LoginScreen extends Component<LoginScreenProps, LoginScreenState> {

    constructor(props: any) {
        super(props);
        this.state = {
            loading: false
        };
    }
    async getresult() {
        try {
            await GoogleSignIn.initAsync({ clientId: '<YOUR_IOS_CLIENT_ID>' });
          } catch ({ message }) {
            alert('GoogleSignIn.initAsync(): ' + message);
          }

        try {
            await GoogleSignIn.askForPlayServicesAsync();
            this.setState({loading: true});
            const { type, user } = await GoogleSignIn.signInAsync();
            this.setState({loading: false});
            if (type === 'success') {
                this.props.onGetEmail(user.email);
                return;
            }
            else {
                alert(type+user);
                return { cancelled: true };
            }
        } catch (e) {
            console.log(e);
            return { error: true }
        }

    }
    render() {

        if(!this.state.loading) {
            return (
                
                <View style={styles.container}>
                    <View style={styles.logoContainer}>
                        <Image style={styles.logo} source ={require('../img/login.png')}/>
                        <Text style={styles.title}>Simple Message Board </Text>
                    </View>
                <View style={styles.button}>
                 <TouchableOpacity  onPress={() => this.getresult()}> 
                     <Text style={styles.buttontext}> Google Authentication </Text> 
                    </TouchableOpacity>
                    </View>
                </View>
            );
        } else {
            return <LoadingScreen/>
        }
        
    }
}
export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#3498db',
        padding: 20,
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'flex-start',
        marginTop: 70,
        
    },
    button: {
        marginBottom:300,
        backgroundColor: '#563c69',
        paddingVertical: 15,
    },
    buttontext: {
    
      textAlign: 'center',
      paddingVertical: 5, 
      fontSize: 20, 
    },
    logo: {
        width: 300,
        height: 300
    },
    title: {
        fontSize: 20,
    }
});