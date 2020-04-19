import React, { Component } from "react";
import { ActivityIndicator, AsyncStorage, StatusBar, View } from "react-native";
import User from "../User";
import firebase, { apps } from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyApFUg0o8y9Bw1StkxR8ELGD4T3nfPvS_Q",
  authDomain: "charusatmobileapp.firebaseapp.com",
  databaseURL: "https://charusatmobileapp.firebaseio.com",
  projectId: "charusatmobileapp",
  storageBucket: "charusatmobileapp.appspot.com",
  messagingSenderId: "969397309482",
  appId: "1:969397309482:web:e3645b5de8122bf87f7353",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    // console.log("in auth")
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    User.phone = await AsyncStorage.getItem("userPhone");
    User.name = await AsyncStorage.getItem("userName");
    this.props.navigation.navigate(User.phone ? "Home" : "Login");
  };

  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
