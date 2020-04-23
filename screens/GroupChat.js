import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import firebase from "firebase";
import MultiSelect from "react-native-multiple-select";
import {
  TouchableOpacity,
  BorderlessButton,
  TextInput,
} from "react-native-gesture-handler";
import User from "../User";
import { Button } from "native-base";

export default class GroupChat extends Component {
  constructor() {
    super();
    this.state = {
      selecteditems: [],
      items: [],
      group_name: "",
    };
    var phone_nb = [],
      name_nb = [];
    firebase
      .database()
      .ref("users/")
      .on("child_added", function (data, prevkey) {
        var ch = data.val();
        phone_nb.push(ch.phone);
        name_nb.push(ch.name);
      });
    this.checknames(phone_nb, name_nb);
  }

  checknames(phone_nb, name_nb) {
    var temp = this.state.items;
    for (var i = 0; i < phone_nb.length; i++) {
      temp.push({ phone: phone_nb[i], name: name_nb[i] });
    }
    this.setState({ items: temp });
    // console.log(this.state.items)
  }

  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItems });
  };

  nxtPage() { 
    var phn_id = [];
    phn_id.push(this.state.selectedItems);
    console.log(phn_id);
    var time = new Date();
    var date = new Date().getDate();
    var mon = new Date().getMonth();
    var yr = new Date().getFullYear();
    var hrs = new Date().getHours();
    var mins = new Date().getMinutes();
    var sec = new Date().getSeconds();
    hrs = hrs % 12;
    hrs = hrs.toString();
    sec = sec.toString();
    date = date.toString();
    mon = mon.toString();
    yr = yr.toString();
    var time = hrs + ":" + mins + ":" + sec;
    var day = date + "/" + mon + "/" + yr;
    var db_dt = date + ":" + mon + ":" + yr;
    var db_gpName = this.state.group_name + time + " " + db_dt;
    var newPostKey = firebase.database().ref().child("posts").push().key;

    var listOfMembers = {};
    for (let i = 0; i < phn_id.length; i++) {
      listOfMembers[i + 1] = phn_id[i];
    }
    firebase
      .database()
      .ref("GroupsDetails/" + db_gpName)
      .update({
        Details: listOfMembers,
      });
    //    }

    for (let i = 0; i < this.state.selectedItems.length; i++) {
      firebase
        .database()
        .ref("users/" + this.state.selectedItems[i])
        .child("Groups/" + newPostKey)
        .update({
          name: this.state.group_name,
          createdDay: day,
          createdTime: time,
          createdBy: User.phone,
          db_Gname: db_gpName,
        });
    }
    firebase
      .database()
      .ref("messages/")
      .child("groupChat/" + db_gpName)
      .update({
        defaultvalue: "1000",
      });
    alert("Group Created Successfully");
    this.setState({
      group_name: "",
      selectedItems: [],
    });
  }

  render() {
    const { selectedItems } = this.state;
    return (
      <View style={{ flex: 1, marginTop: 50, marginLeft: 10, marginRight: 10 }}>
        <TextInput
          placeholder="Enter Group Name"
          style={{
            borderColor: "grey",
            borderBottomWidth: 1,
            marginTop: 8,
            fontSize: 17,
            marginBottom: 20,
          }}
          onChangeText={(group_name) => this.setState({ group_name })}
        />
        <MultiSelect
          hideTags
          items={this.state.items}
          uniqueKey="phone"
          ref={(component) => {
            this.multiSelect = component;
          }}
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={selectedItems}
          selectText="Select Friend"
          searchInputPlaceholderText="Search Friends..."
          onChangeInput={(text) => console.log(text)}
          // altFontFamily="ProximaNova-Light"
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{ color: "#CCC" }}
          // submitButtonColor="blue"
          submitButtonText="Submit"
        />
        <View style={{ marginLeft: 10, marginRight: 10 }}>
          {this.multiSelect
            ? this.multiSelect.getSelectedItemsExt(selectedItems)
            : null}
        </View>

        <Button onPress={() => this.nxtPage()}>
          <Text>Submit Button To Next Page</Text>
        </Button>
        <Text>{User.name}</Text>
        <Button
          onPress={() => {
            this.props.navigation.navigate("Home");
          }}
        >
          <Text>Go Back</Text>
        </Button>
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
    marginTop: 50,
  },
});
