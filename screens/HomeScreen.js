import React from 'react';
import { View, Text, AsyncStorage, StyleSheet, Platform } from 'react-native';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import User from '../User';
import firebase from 'firebase';
import { SafeAreaView } from 'react-native';
import { Image } from 'react-native';
import { Header, Title } from 'native-base';
import Constants from 'expo-constants';
import * as Font from 'expo-font';
import { FloatingAction } from 'react-native-floating-action';

const actions = [
    {
        text: "Create Group",
        icon: require("../images/account.png"),
        name: "bt_language",
        position: 1
    },
    {
        text: "Accessibility",
        icon: require("../images/account.png"),
        name: "bt_accessibility",
        position: 2
    },
    {
        text: "Location",
        icon: require("../images/account.png"),
        name: "bt_room",
        position: 3
    },
    {
        text: "Video",
        icon: require("../images/account.png"),
        name: "bt_videocam",
        position: 4
    }
]
export default class HomeScreen extends React.Component {
    constructor(){
        super()
    }
    state = {
        users: []
    }

    componentWillMount() {
        let dbRef = firebase.database().ref('users/')
        dbRef.on('child_added', (val) => {
            let person = val.val();
            // console.log("component person ", val.key)
            person.phone = val.key;
            if (person.phone === User.phone) {
                User.name = person.name
            } else {
                this.setState((prevState) => {
                    return {
                        users: [...prevState.users, person]
                    }
                })
                // console.log(users)
            }
        })
    }

    nextPage = async (item) => {
        this.props.navigation.navigate('Chat', item);
    }

    render() {
        return (
            <SafeAreaView style={styles.droidSafeArea}>
                <Header>
                    <Title>Chat</Title>
                </Header>
                <FlatList
                    Style={{ marginTop: 50 }}
                    data={this.state.users}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => this.nextPage(item)}
                                style={{ padding: 10, borderBottomColor: '#ccc', borderBottomWidth: 1 }}>
                                <Text style={{ fontSize: 25 }}>{item.name}</Text>
                            </TouchableOpacity>
                        )
                    }}
                    keyExtractor={item => item.phone}
                />
                <FloatingAction
                    ref={(ref) => { this.floatingAction = ref; }}
                    actions={actions}
                    onPressItem={(name) => {
                        console.log(this.props.navigation.navigate('Group'))
                    }}
                />
            </SafeAreaView>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
        marginTop: 50,
    },
    droidSafeArea: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: Constants.statusBarHeight
    },
    // headstyl:{
    //     fontFamily: "calibri"
    // }
});
