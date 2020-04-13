import React from 'react';
import { View, Text, StyleSheet, Dimensions, Platform, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native';
import { TextInput, TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import User from '../User';
import firebase from 'firebase';
import { Header, Title, Right, Body, Left } from 'native-base';
import Constants from 'expo-constants';
import { Image } from 'react-native';


export default class ChatScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            person: {
                name: props.navigation.getParam('name'),
                phone: props.navigation.getParam('phone'),
            },
            textMessage: '',
            messageList: '',
        }
    }

    state = {
        textMessage: '',
    }

    componentWillMount() {
        firebase.database().ref('messages').child(User.phone).child(this.state.person.phone).on('child_added', (value) => {
            this.setState((prevState) => {
                return {
                    messageList: [...prevState.messageList, value.val()]
                }
            });
        });
        console.log(this.state.messageList)
    }

    handleChange = key => val => {
        this.setState({ [key]: val })
    }


    convertTime = (time) => {
        let d = new Date(time);
        let c = new Date();
        let result = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':';
        result += (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
        return result;
    }

    sendMessage = async () => {
        if (this.state.textMessage.length > 0) {
            let msgId = firebase.database().ref('messages').child(User.phone).child(this.state.person.phone).push().key;
            let updates = {};
            let message = {
                message: this.state.textMessage,
                time: firebase.database.ServerValue.TIMESTAMP,
                from: User.phone
            }
            updates['messages/' + User.phone + '/' + this.state.person.phone + '/' + msgId] = message;
            updates['messages/' + this.state.person.phone + '/' + User.phone + '/' + msgId] = message;
            firebase.database().ref().update(updates);
            this.setState({ textMessage: '' });
        }
    }

    renderRow = ({ item }) => {
        return (
            <View style={{
                flexDirection: 'row',
                width: '60%',
                alignSelf: item.from === User.phone ? 'flex-end' : 'flex-start',
                borderColor: item.from === User.phone ? '#00897b' : '#7cb342',
                borderRadius: 10,
                marginBottom: 10,
                backgroundColor: 'darkgrey',
            }}>
                <Text style={{ padding: 7, fontSize: 16, color: 'black' }}>
                    <Text style={{ color: '#eee', padding: 3, fontSize: 12 }}>
                        {this.convertTime(item.time)}
                    </Text>
                    {item.message}
                </Text>

            </View>
        )
    }

    render() {
        let { height, width } = Dimensions.get('window');
        if (Platform.OS === 'android') {
            return (
                <KeyboardAvoidingView style={{flex:1,paddingTop:Constants.statusBarHeight}} behavior="padding" keyboardVerticalOffset={0} enabled>
                    <Header>
                        {/* <Left>
                            <TouchableOpacity onPress={this.props.navigation.navigate('Home')}>
                                <Image
                                    source={require('../images/back.png')}
                                    style={{ width: 32, height: 28 }}
                                />
                            </TouchableOpacity>
                        </Left> */}
                        <Body>
                            <Title style={{ color: "black", marginLeft: -27, fontSize: 23 }}>{this.props.navigation.getParam('name')}</Title>
                        </Body>

                        <Right>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile', {
                                nxt_nm: this.props.navigation.getParam('name'),
                                nxt_ph: this.props.navigation.getParam('phone')
                            })}>
                                <Image
                                    source={require('../images/account.png')}
                                    style={{ width: 32, height: 32 }}
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
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TextInput
                            style={styles.input}
                            value={this.state.textMessage}
                            onChangeText={this.handleChange('textMessage')}
                            multiline={true}
                        />
                        <TouchableOpacity onPress={this.sendMessage} style={{
                            paddingBottom: 10,
                            marginLeft: 5
                        }}>
                            <Text style={styles.btnText}>Send</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            );

        }
        return (

            <SafeAreaView style={styles.droidSafeArea}>
                <Header>
                    <Left>
                        <TouchableOpacity onPress={this.props.navigation.navigate('Home')}>
                            <Image
                                source={require('../images/back.png')}
                                style={{ width: 32, height: 28 }}
                            />
                        </TouchableOpacity>
                    </Left>
                    <Body>
                        <Title style={{ color: "black", marginLeft: -27, fontSize: 23 }}>{this.props.navigation.getParam('name')}</Title>
                    </Body>

                    <Right>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile', {
                            nxt_nm: this.props.navigation.getParam('name'),
                            nxt_ph: this.props.navigation.getParam('phone')
                        })}>
                            <Image
                                source={require('../images/account.png')}
                                style={{ width: 32, height: 32 }}
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
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput
                        style={styles.input}
                        value={this.state.textMessage}
                        onChangeText={this.handleChange('textMessage')}
                    />
                    <TouchableOpacity onPress={this.sendMessage} style={{
                        paddingBottom: 10,
                        marginLeft: 5
                    }}>
                        <Text style={styles.btnText}>Send</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    navigationOptions: {
        marginTop: 100,
        fontSize: 50,
    },
    droidSafeArea: {
        flex: 1,
        backgroundColor: 'grey',
        paddingTop: Constants.statusBarHeight
    },
    input: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        width: '83%',
        margin: 1,
        marginLeft:2,
        borderRadius: 5,
    },
    btnText: {
        color: 'darkblue',
        fontSize: 20
    }
})