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
    if (this.state.phone.length > 8) {
      alert("Enter Proper ID number");
    } else if (this.state.name.length < 3) {
      alert("Enter Proper Name");
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
        <Text style={{flex:.1, marginTop:-21,fontWeight:'bold',fontSize:30}}>Edsat</Text>
        <TextInput
          placeholder="Enter ID"
          placeholderTextColor="black"
          style={styles.input}
          value={this.state.phone}
          onChangeText={this.handleChange("phone")}
        />
        <TextInput
          placeholder="Enter Name"
          placeholderTextColor="black"
          style={styles.input}
          value={this.state.name}
          onChangeText={this.handleChange("name")}
        />
        <TouchableOpacity onPress={this.submitform} style={{marginTop:23}}>
          <Text style={{ fontSize:21}}>Enter</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a8b4f8',
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
