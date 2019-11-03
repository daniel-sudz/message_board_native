import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  Button,
  SafeAreaView,
  Alert,
} from 'react-native';

import Login from "./src/Login";
export default class Main extends Component {
  render() {
    return ( 
      <Login />
    );
  }
}

