import React, {Component} from 'react';
import { ActivityIndicator, AsyncStorage, StatusBar, View } from 'react-native';
import User from '../User';
import firebase, { apps } from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyCSNJtalNlaVLmCF13xO37x7NcQbv4UX1Q",
    authDomain: "chat-application-1ac4e.firebaseapp.com",
    databaseURL: "https://chat-application-1ac4e.firebaseio.com",
    projectId: "chat-application-1ac4e",
    storageBucket: "chat-application-1ac4e.appspot.com",
    messagingSenderId: "241112021009",
    appId: "1:241112021009:web:509edee3af6f73aec619b0",
    measurementId: "G-2784SJG8QR"
  };
  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig); 
  }
  


export default class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props);
        // console.log("in auth")
        this._bootstrapAsync();
    }

    
    
    _bootstrapAsync = async () => {
        User.phone = await AsyncStorage.getItem('userPhone');
        User.name = await AsyncStorage.getItem('userName')
        this.props.navigation.navigate(User.phone ? 'Home': 'Login');
    };

    render(){
        return(
            <View>
                <ActivityIndicator/>
                <StatusBar barStyle="default"/>
            </View>
        );
    }
}