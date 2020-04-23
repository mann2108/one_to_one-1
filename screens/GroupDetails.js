import React from "react";
import { View, Text, AsyncStorage } from "react-native";
import User from "../User";
import { SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import { Header, Left, Title, Button } from "native-base";
import { Image } from "react-native";
import firebase from "firebase";

export default class GroupDetails extends React.Component {
  logout = () => {
    alert("Jeet is here");
  };
  constructor() {
    this.state = {
      grp: this.props.navigation.getParam("grpName"),
      time: this.props.navigation.getParam("createdTimeDB"),
      day: this.props.navigation.getParam("createDay"),
    };
    alert(this.state.grp);
    firebase
      .database()
      .ref(
        "GroupDetails/" +
          this.state.grp +
          this.state.time +
          " " +
          this.state.day +
          "/"
      )
      .child("Details")
      .child("1");
  }
  render() {
    return (
      <SafeAreaView>
        <Header
          style={{
            backgroundColor: "#900C3F",
            borderBottomColor: "#900C3F",
            marginTop: "-.1%",
          }}
        >
          <Left style={{ flexDirection: "row", marginLeft: "-42%" }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Home")}
            >
              <Image
                source={require("../images/back.png")}
                style={{ width: 32, height: 32 }}
              />
            </TouchableOpacity>

            <Title
              style={{
                marginLeft: 15,
                fontSize: 24,
                color: "white",
                marginTop: "-2%",
              }}
            >
              Profile
            </Title>
          </Left>
        </Header>
        <View style={styles.container}>
          <Text style={{ alignItems: "center", fontSize: 20, marginTop: 450 }}>
            <Text>
              User Name :{" "}
              <Text style={{ fontWeight: "bold" }}>
                {User.name}
                {"\n"}
              </Text>
            </Text>
            <Text>
              User Phone:{" "}
              <Text style={{ fontWeight: "bold" }}>
                {User.phone}
                {"\n"}
              </Text>
            </Text>
          </Text>
        </View>
        <Button
          style={{ marginTop: "120%", backgroundColor: "#900C3F" }}
          onPress={() => {
            this.props.navigation.navigate("Login");
          }}
        >
          <Text
            style={{
              flex: 1,
              fontSize: 29,
              left: 155,
              marginTop: "7%",
              color: "white",
            }}
          >
            Logout
          </Text>
        </Button>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  droidSafeArea: {
    flex: 1,
    backgroundColor: "#900C3F",
    marginTop: Constants.statusBarHeight,
  },
});
