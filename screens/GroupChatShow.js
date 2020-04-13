import React, { Component } from 'react';
import { StyleSheet, Dimensions, KeyboardAvoidingView } from 'react-native';
import { View, Text, Header, Left, Image } from 'native-base';
import firebase from 'firebase';
import { Button } from 'react-native-paper';
import Constants from 'expo-constants';
import { FlatList, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import User from '../User';

export default class GroupChatShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gp_name: props.navigation.getParam('name'),
            createdTime: props.navigation.getParam('createdTime'),
            createdDay: props.navigation.getParam('createdDay'),
            messageList: '',
            textMessage: '',
            db_GpValue: props.navigation.getParam('db_Gname'),
        }
    }
    componentWillMount() {
        firebase.database().ref('messages/').child('groupChat/').child(this.state.db_GpValue)
            .on('child_added', (value) => {
                this.setState((prevState) => {
                    return {
                        messageList: [...prevState.messageList, value.val()]
                    }
                })
            })
        // console.log(this.state.messageList)
    }


    sendMessage = () => {
        if (this.state.textMessage.length > 0) {
            let msgId = firebase.database().ref('messages/').child('groupChat/').child(this.state.db_GpValue).push().key;
            let updates = {};
            let message = {
                message: this.state.textMessage,
                time: firebase.database.ServerValue.TIMESTAMP,
                from: User.phone
            }
            updates[msgId] = message;
            firebase.database().ref('messages/groupChat/').child(this.state.db_GpValue).update(updates);
            this.setState({ textMessage: '' });
        }
    }

    convertTime = (time) => {
        let d = new Date(time);
        let c = new Date();
        let result = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':';
        result += (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
        return result;
    }

    renderRow = ({ item }) => {
        if (item.message !== 'undefined') {
            return (
                <View
                    style={{
                        flexDirection: 'row',
                        width: '60%',
                        alignSelf: item.from === User.phone ? 'flex-end' : 'flex-start',
                        borderColor: item.from === User.phone ? '#00897b' : '#7cb342',
                        borderRadius: 10,
                        backgroundColor: 'darkgrey',
                    }}>

                    <Text style={{ padding: 7, fontSize: 16, color: 'black' }}>
                        <Text style={{ color: '#eee', padding: 3, fontSize: 12 }}>
                            {this.convertTime(item.time)}
                        </Text>
                        {" " + item.message}
                    </Text>
                </View>
            )
        }

    }
    render() {
        let { height, width } = Dimensions.get('window');
        return (
            <KeyboardAvoidingView style={{ flex: 1, paddingTop: Constants.statusBarHeight }} behavior="padding" keyboardVerticalOffset={0} enabled>
                <FlatList
                    style={{ padding: 10, height: height * 0.8 }}
                    data={this.state.messageList}
                    renderItem={this.renderRow}
                    keyExtractor={(item, index) => index.toString()}
                />
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput
                        style={styles.input}
                        value={this.state.textMessage}
                        onChangeText={(textMessage) => this.setState({ textMessage })}
                        multiline={true}
                    />
                    <TouchableOpacity onPress={this.sendMessage} style={{ paddingBottom: 10, marginLeft: 5 }}>
                        <Text style={styles.btnText}>Send</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },
    input: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        width: '83%',
        margin: 1,
        marginLeft: 2,
        borderRadius: 5,
    },
    btnText: {
        color: 'darkblue',
        fontSize: 20
    }
})