import React, { Component } from 'react';
import { StyleSheet, Dimensions, KeyboardAvoidingView, Image } from 'react-native';
import { View, Text, Header, Left, Body, Right } from 'native-base';
import firebase from 'firebase';
import { Button, Title } from 'react-native-paper';
import Constants from 'expo-constants';
import { FlatList, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import User from '../User';
import { SafeAreaView } from 'react-navigation';

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

    nameCheck = (from) => {
        var tt = firebase.database().ref('users/' + from + '/');
        tt.on('value', function(data){
            var nn = data.val()
            // console.log(nn.name)
            var nam = nn.name
            return nam;
        });
    }

    renderRow = ({ item }) => {
        if (item.message !== 'undefined') {
            // console.log(item)
            return (
                <View
                    style={{
                        flexDirection: 'row',
                        width: '60%',
                        alignSelf: item.from === User.phone ? 'flex-end' : 'flex-start',
                        borderColor: item.from === User.phone ? '#00897b' : '#7cb342',
                        borderRadius: 10,
                        backgroundColor: 'darkgrey',
                        marginBottom: 2
                    }}>

                    <Text style={{ padding: 7, fontSize: 16, color: 'black' }}>
                        <Text>
                            {item.from + '\n'}
                        </Text>
                        <Text>
                            {item.message}
                        </Text>
                        <Text style={{ color: '#eee', padding: 3, fontSize: 12, }}>
                            {'\n' + this.convertTime(item.time)}
                        </Text>
                    </Text>
                </View>
            )
        }

    }
    render() {
        let { height, width } = Dimensions.get('window');
        return (
            <KeyboardAvoidingView style={{ flex: 1, paddingTop: Constants.statusBarHeight }} keyboardVerticalOffset={0} enabled>
                <Header style={{ backgroundColor: 'cream', marginTop: '-8.4%', marginBottom: '-1%', flexDirection: 'row' }}>
                    <Left style={{ marginTop: '10%' }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
                            <Image
                                style={{ height: 30, width: 30, }}
                                source={require('../images/back.png')}
                            />
                        </TouchableOpacity>
                    </Left>
                    <Body style={{ alignItems: 'center', marginTop: '10%', }}>
                        <Title numberOfLines={1}>{this.props.navigation.getParam('name')}</Title>
                    </Body>
                    <Right>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile',{
                            nxt_nm: User.name,
                            nxt_ph: User.phone
                        })}>
                            <Image
                                style={{ marginTop: '120%' }}
                                source={require('../images/account.png')}
                            />
                        </TouchableOpacity>
                    </Right>
                </Header>
                <FlatList
                    style={{ padding: 10, height: height * 0.8 }}
                    data={this.state.messageList}
                    renderItem={this.renderRow}
                    keyExtractor={(item, index) => index.toString()}
                />
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 9, marginBottom: 9, marginLeft: 9 }}>
                    <TextInput
                        style={styles.input}
                        value={this.state.textMessage}
                        onChangeText={(textMessage) => this.setState({ textMessage })}
                        multiline={true}
                    />
                    <TouchableOpacity onPress={this.sendMessage} style={{ paddingBottom: 10, marginLeft: 5, marginTop: 10 }}>
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
        // position: 'absolute',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        width: '83%',
        margin: 1,
        marginLeft: 2,
        marginRight: 9,
        borderRadius: 5,
    },
    btnText: {
        color: 'darkblue',
        fontSize: 20,
        // marginLeft: '85%',
        borderColor: 'red',
    }
})