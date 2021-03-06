import React, { Component, RefObject } from 'react';
var moment = require('moment-timezone');
let local_tz = moment.tz.guess();
console.log(local_tz);
import { StyleSheet, View, ScrollView } from 'react-native';
import { Button as NativeButton } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  Alert,
} from 'react-native';

//import { ThemeProvider, Card, ListItem, Button, Icon } from 'react-native-elements'
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Form, Label, Item, Input } from 'native-base';
import * as Font from 'expo-font';

interface ComponentProps {
  email?: string,
}

interface ComponentState {
  json: { content: string, picture: string, username: string }[][],
  ready: boolean,
  image: any,
  image_data: string,
  post_data: string,
  is_uploading: boolean,
  inputTextValue : string,
}

export default class Message_Board extends Component<ComponentProps, ComponentState>{
  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('../node_modules/native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('../node_modules/native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({ ready: true });
  }

  constructor(props: ComponentProps) {
    super(props);
    this.state = {
      is_uploading: false,
      image: null,
      ready: false,
      json: [],
      image_data: "",
      post_data: "",
      inputTextValue: "",
    };
    this.update();
  }

  async update() {
    {
      try {
        let response = await fetch('https://sudz.dev/update');
        let myJson = await response.json();
        //TODO: remove
        //console.log(myJson);
        this.setState({ json: myJson });
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
      window.setInterval(function () {
        getrefresh();
      }, 200);
    };
    ws.onmessage = (e) => {// a message was received
      if (JSON.parse(e.data).length !== 0) {
        //console.log(JSON.stringify(mystate));
        for (let i = 0; i < JSON.parse(e.data).length; i++) {
          mystate.unshift(JSON.parse(e.data)[i]);
        }
        console.log("New message added");
        //console.log(JSON.stringify(mystate));
        this.forceUpdate(); //bad, needs to be adressed 

      }
      //console.log(Object.keys(mystate).length);
      //console.log(Object.keys(JSON.parse(e.data)).length);

    };
    ws.onerror = (e) => {// an error occurred
      console.log(e);
    };
    ws.onclose = function (e) {
      console.log('Socket is closed. Reconnect will not be attempted', e.reason);
      window.clearInterval();
      alert("Connection has been lost, please refresh the page. The contents on this page will no longer be updated.");
    };
  }
  upload_progress() {
    if (!this.state.is_uploading) {
      let { image } = this.state;

      let returnobj = image &&
        <Image source={{ uri: image }} style={styles.insert_picture} />;
      return ( returnobj )
    }
    else {
      return (<View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>)
    }
  }

  pickImage = () => {
    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      base64: true,
      quality: 0.3,
    }).then(result => {
      //console.log("foo");
      //console.log(result);

      if (result.cancelled === false) {
        this.setState({ image: result.uri });
        let return_base64 = (result as any as { base64: string }).base64;
        console.log(return_base64.length);
        this.setState({ image_data: return_base64 })
      } else {
        console.log("error");
      }
    }).catch(error => {
      console.log(`Error:`);
    });
  }

  submitdata() {
    interface submit_types {
      post_data: string,
      image_data: string,
      email: string,
    }
    let submitobj: submit_types = {
      "post_data": this.state.post_data,
      "image_data": this.state.image_data,
      "email" : this.props.email,
    }
    if (submitobj.post_data && submitobj.image_data !== "") {
      this.setState({is_uploading: true});
      console.log(submitobj.email);

      fetch('https://sudz.dev/app/', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ submitobj }),
      })
        .then((responseJson) => {
          //return responseJson;
          console.log("Image has been uploaded")
          this.setState({is_uploading: false});
          this.setState({image: null});
          this.setState({inputTextValue : ""});
          alert("Image upload succesfully");

        })
        .catch((error) => {
          console.error(error);
          alert("Image upload has failed, check internet connection or server down");
        });

    }
    else {
      //alert(JSON.stringify(submitobj));
      alert("Please enter post content and select an image before submitting");
    }

  }

  render() {
    if (this.state.ready) {
      if (this.state.json === undefined) {
        console.log("current render state is undefined");
        return "";
      }
      let returnobj =
        this.state.json.map((item, i) =>
          <View key={i}>
            <Card style={{ flex: 0 }}>
              <CardItem>
                <Left>
                  <Thumbnail source={require('./img/user_icon.jpg')} />
                  <Body>
                    <Text>{item[0].username}</Text>
                    <Text note>{moment(new Date(parseInt(item[1]))).tz(local_tz).format('MMM Do HH:mm').toString()}</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem>
                <Body>
                  <Image source={{ uri: ('data:  image/jpeg;base64,' + item[0].picture) }} style={{ margin: 10, height: 168.75, width: 300, resizeMode: "contain", flex: 1 }} />
                  <Text>
                    {item[0].content}
                  </Text>
                </Body>
              </CardItem>
              <CardItem>
                <Left>
                  <Button transparent textStyle={{ color: '#87838B' }}>
                    <Icon name="logo-github" />
                    <Text>1,926 stars</Text>
                  </Button>
                </Left>
              </CardItem>
            </Card>
          </View>
        );
      //return returnobj;

      return (
        <Container>
          <Header />
          <Content>

            <Text style={styles.normal_margin}>You are currently logged in as {this.props.email}} </Text>

            <Form>
              <Item last style={styles.normal_margin}>
                <Input placeholder="Post Content" value={this.state.inputTextValue} onChangeText={(text) => this.setState({ post_data: text, inputTextValue:text})} />
              </Item>
            </Form>

            <NativeButton
              title="Pick an image from camera roll"
              onPress={this.pickImage}
            />
            {this.upload_progress()}
            

            <Button full style={styles.normal_margin} onPress={this.submitdata.bind(this)}>
              <Text >Submit A Post</Text>
            </Button>



            <ScrollView>{returnobj}</ScrollView>

          </Content>
        </Container>
      );

    }
    else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  normal_margin: {
    margin: 10,
  },
  insert_picture: {
    margin: 10,
    height: 400,
    resizeMode: "contain",
  },
  loading: {
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center',
}
});
