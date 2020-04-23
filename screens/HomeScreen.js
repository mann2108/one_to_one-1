import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity, FlatList } from "react-native-gesture-handler";
import User from "../User";
import firebase from "firebase";
import { SafeAreaView } from "react-native";
import Constants from "expo-constants";
import * as Font from "expo-font";
import { FloatingAction } from "react-native-floating-action";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

var nav;

const actions = [
  {
    text: "Create Group",
    icon: require("../images/account.png"),
    name: "bt_language",
    position: 1,
  },
  {
    text: "Accessibility",
    icon: require("../images/account.png"),
    name: "bt_accessibility",
    position: 2,
  },
  {
    text: "Location",
    icon: require("../images/account.png"),
    name: "bt_room",
    position: 3,
  },
  {
    text: "Video",
    icon: require("../images/account.png"),
    name: "bt_videocam",
    position: 4,
  },
];

export class SingleChatView extends React.Component {
  state = {
    users: [],
  };

  componentWillMount() {
    let dbRef = firebase.database().ref("users/");

    dbRef.on("child_added", (val) => {
      let person = val.val();
      person.phone = val.key;
      if (person.phone === User.phone) {
        User.name = person.name;
      } else {
        this.setState((prevState) => {
          return {
            users: [...prevState.users, person],
          };
        });
      }
    });
  }

  nextPage = async (item) => {
    console.log("single chat next page called");
    // console.log(item)
    nav.navigate("Chat", item);
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Text>{User.name}</Text>
        <FlatList
          data={this.state.users}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => this.nextPage(item)}
                style={{
                  padding: 10,
                  borderBottomColor: "red",
                  borderBottomWidth: 10,
                }}
              >
                <Text style={{ fontSize: 25 }}>{item.name}</Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.phone}
        />
        <FloatingAction
          ref={(ref) => {
            this.floatingAction = ref;
          }}
          actions={actions}
          onPressItem={(name) => {
            console.log(nav.navigate("Group"));
            console.log(name);
          }}
        />
      </SafeAreaView>
    );
  }
}

export class GroupChatView extends React.Component {
  state = {
    grp_users: [],
    vl_key: "",
  };
  componentWillMount() {
    let grpRef = firebase
      .database()
      .ref("users/" + User.phone)
      .child("/Groups/");
    grpRef.on("child_added", (val) => {
      let grpKey = val.val();
      this.setState((prevState) => {
        return {
          grp_users: [...prevState.grp_users, grpKey],
        };
      });
    });
  }
  nextPage(item) {
    // console.log('group chat next page called')
    // console.log(nav)
    // console.log(item)
    nav.navigate("GroupChatView", item);
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={this.state.grp_users}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  this.nextPage(item);
                  alert(item.val);
                }}
                style={{
                  padding: 10,
                  borderBottomColor: "red",
                  borderBottomWidth: 10,
                }}
              >
                <Text style={{ fontSize: 25 }}>{item.name}</Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.phone}
        />
      </SafeAreaView>
    );
  }
}

const Tab = createMaterialTopTabNavigator();

export default function HomeScreen({ navigation }) {
  // console.log(navigation)
  nav = navigation;
  // console.log(nav)
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Chat"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Chat") {
              iconName = focused
                ? "ios-information-circle"
                : "ios-information-circle-outline";
            } else if (route.name === "Groups") {
              iconName = focused ? "ios-list-box" : "ios-list";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={24} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "blue",
          inactiveTintColor: "grey",
          indicatorStyle: {
            backgroundColor: "red",
          },
          showIcon: true,
          style: {
            backgroundColor: "#f2f2f2",
          },
        }}
      >
        <Tab.Screen name="Chat" component={SingleChatView} nav={navigation} />
        <Tab.Screen name="Groups" component={GroupChatView} nav={navigation} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  droidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Constants.statusBarHeight,
  },
});
