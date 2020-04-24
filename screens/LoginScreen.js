import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import User from "../User";
import firebase from "firebase";

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    phone: "",
    name: "",
  };
  handleChange = (key) => (val) => {
    this.setState({ [key]: val });
  };
  submitform = async () => {
    if (this.state.phone.length < 10) {
      alert("enter proper phone number");
    } else if (this.state.name.length < 5) {
      alert("enter proper name");
    } else {
      await AsyncStorage.setItem("userPhone", this.state.phone);
      await AsyncStorage.setItem("userName", this.state.name);
      User.phone = this.state.phone;
      User.name = this.state.name;
      console.log(User.name);
      console.log(
        firebase
          .database()
          .ref("users/" + User.phone)
          .set({ name: this.state.name, phone: this.state.phone })
      );
      this.props.navigation.navigate("Home");
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="enter phone"
          keyboardType="number-pad"
          style={styles.input}
          value={this.state.phone}
          onChangeText={this.handleChange("phone")}
        />
        <TextInput
          placeholder="enter name"
          style={styles.input}
          value={this.state.name}
          onChangeText={this.handleChange("name")}
        />
        <TouchableOpacity onPress={this.submitform}>
          <Text>Enter</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    width: "90%",
    marginBottom: 1,
    borderRadius: 5,
  },
});
