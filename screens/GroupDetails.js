import React, { Component } from "react";
import {
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import { View, Text, Header, Left, Body, Right, Input } from "native-base";
import firebase from "firebase";
import { Button, Title } from "react-native-paper";
import Constants from "expo-constants";
import {
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import User from "../User";
import { SafeAreaView } from "react-navigation";

var nav;


export default class GroupDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gp_name: props.navigation.getParam("grpName"),
      createdTimeDB: props.navigation.getParam("createdTimeDB"),
      createDay: props.navigation.getParam("createDate"),
      finalString:
        props.navigation.getParam("grpName") +
        props.navigation.getParam("createdTimeDB") +
        props.navigation.getParam("createDay"),
      grp_users: [],
    };
  }

  UNSAFE_componentWillMount(){
    let temp = "";
    let grpRef = firebase
      .database()
      .ref("GroupsDetails/" + this.state.finalString);
    // console.log(grpRef);
    grpRef.on("value", function (snapshot) {
      temp = snapshot.val().Details;
    });

    var sample = "";
    for (var i = 0; i < temp.length; i++) {
      if (temp[i] == ",") {
        this.state.grp_users.push(sample);
        sample = "";
      } else {
        sample += temp[i];
      }
    }
    this.state.grp_users.push(sample);
  }

  render() {
    
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Header style={{ marginTop: -33, backgroundColor: '#6855ab' }}>
          <Left style={{ left: -60 }}>
            <TouchableOpacity onPress={() => console.log(this.props.navigation.navigate('Home'))}>
              <Image
                source={require('../images/back.png')}

              />
            </TouchableOpacity>

          </Left>
          <Title style={{ left: -40, marginTop: 10 }}>{this.state.gp_name}</Title>
        </Header>
        <Text style={{ fontSize: 25, borderBottomColor: 'grey', borderBottomWidth: 1, marginBottom: 20,alignItems:'center', justifyContent:'center'}}>Group Members</Text>
        <FlatList
          data={this.state.grp_users}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={{
                  padding: 10,
                  borderBottomColor: "grey",
                  borderBottomWidth: 1,
                }}
              >
                <Text style={{ fontSize: 25 }}>{item}{console.log(item)}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 23,
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: "#000000",
    borderWidth: 1,
    alignItems: "center",
  },
  submitButton: {
    backgroundColor: "#000000",
    padding: 10,
    margin: 15,
    height: 40,
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    alignItems: "center",
  },
  textCenter: {
    margin: "50%",
  },
});
