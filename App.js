import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import React from 'react';
import { View, Text, Button, StyleSheet, Settings } from 'react-native';
import AuthLoadingScreen from './screens/AuthLoadingScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ChatScreen from './screens/ChatScreen';
import ProfileScreen from './screens/ProfileScreen';
import GroupChat from './screens/GroupChat';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Constants from 'expo-constants';
import GroupChatShow from './screens/GroupChatShow';

export default class App extends React.Component {

  state = {
    loading: true
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    })
    this.setState({ loading: false })
  }
  constructor(){
    super()
  // console.log("jeet")
  }
  render() {
    console.disableYellowBox = true;
    const AppSwitchNavigator = createSwitchNavigator({
      Auth: AuthLoadingScreen,  //authloading
      Home: HomeScreen,  //app
      Group: GroupChat,
      GroupChatView: GroupChatShow,
      Chat: ChatScreen, //app
      // Profile: ProfileScreen,
      Login: LoginScreen, //auth
    }, {
      initialRouteName: "Auth",
      navigationOptions: {
        headerTitleStyle: {
          fontWeight: "bold",
          color: "black",
          fontSize: 40
        },
        headerTintColor: "#fff"
      }
    }
    );

    const AppNavigator = createAppContainer(AppSwitchNavigator); 
    if (this.state.loading) {
      return (
        <View></View>
      );
    }
    return (
      <AppNavigator></AppNavigator>
    )
  }
}

