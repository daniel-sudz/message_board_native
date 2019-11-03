import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  Button,
  SafeAreaView,
  Alert,
} from 'react-native';

class Message_Board extends Component<{}, {json: (string|number)[]}>{
  constructor(props: never) {
    super(props);
    this.state = {
      json: []
    };
    this.update();
  }
  async update() {
    {   
        try {
        let response = await fetch('https://sudz.dev/update');
        let myJson = await response.json();
        //TODO: remove
        console.log(myJson);
        this.setState({json: myJson});
        var mystate = this.state.json; 
        } catch (error) {
          console.error(error);
          console.log("Error communicating with server")
        }
        var global = this; 
 
    }
    var ws = new WebSocket('wss://sudz.dev/socket');
    ws.onopen = () => {// connection opened
        async function getrefresh() {
            
        if (Object.keys(mystate).length !== undefined) {
        ws.send(Object.keys(mystate).length.toString());
            }   
        }
        window.setInterval(function(){
        getrefresh();
        }, 200);
    };
    ws.onmessage = (e) => {// a message was received
    if (JSON.parse(e.data).length !== 0) {
        //console.log(JSON.stringify(mystate));
        for (let i = 0; i < JSON.parse(e.data).length; i ++) {
        mystate.unshift(JSON.parse(e.data)[i]);
        }
          console.log("New message added");
          console.log(JSON.stringify(mystate));
        this.forceUpdate(); //bad, needs to be adressed 
        
    }
      console.log(Object.keys(mystate).length);
      console.log(Object.keys(JSON.parse(e.data)).length);
    
    };
    ws.onerror = (e) => {// an error occurred
    console.log(e); 
    };
    ws.onclose = function(e) {
    console.log('Socket is closed. Reconnect will not be attempted', e.reason);
    window.clearInterval();
    alert("Connection has been lost, please refresh the page. The contents on this page will no longer be updated.");
    };
   }
   render() {
    if (this.state.json === undefined) {
        console.log("current render state is undefined");
        return "";
    }
    return Object.keys(this.state.json ).map((i, key) => 
       <Text key={key}> { this.state.json[key][0].content } </Text>

  );
  }
  }

  export default function App() {
    return (
      <View style={styles.container}>
        <Message_Board/>
        <Text>Open up App.tsx to start working on your app! foobar</Text>
        <Button
            title="Press me"
            onPress={() => Alert.alert('Simple Button pressed')}
          />
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
