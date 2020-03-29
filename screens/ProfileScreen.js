import React from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import User from '../User';
import { SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import Constants from 'expo-constants'
import { Header, Left, Title } from 'native-base';
import {Image} from 'react-native';



export default class ProfileScreen extends React.Component {
    // state = {
    //     name: '',
    // }

    // handleChange = key => val => {
    //     this.setState({ [key]: val })
    // }
    // _logOut = async () => {
    //     await AsyncStorage.clear();
    //     this.props.navigation.navigate('Login');
    // }

    render() {
        return (
            <SafeAreaView style={styles.droidSafeArea}>
                {/* <Header style={{backgroundColor: '#900C3F',borderBottomColor:'#900C3F', paddingTop: Constants.statusBarHeight}}>
                    <Left style={{flexDirection:'row',marginLeft:-200}}>
                        <Image
                        source={require('../images/account.png')}
                        style={{width:32,height:32}}
                        />
                        <Title style={{marginLeft:15,fontSize:24,color:'white'}}>Profile</Title>
                    </Left>
                </Header> */}
                {/* <View style={styles.container}> */}
                    {/* <Text style={{alignItems:'center',fontSize:20,margin:-10}}> */}
                        {/* {this.props.navigation.getParam('nxt_nm')}
                        {this.props.navigation.getParam('nxt_ph')} */}
                        {/* {User.name}{'\n'} */}
                    {/* </Text> */}
                    {/* <Text style={{alignItems:'center',fontSize:20,margin:-10}}> */}
                        {/* {this.props.navigation.getParam('nxt_nm')}
                        {this.props.navigation.getParam('nxt_ph')} */}
                        {/* {User.phone}{'\n'} */}
                    {/* </Text> */}
                    {/* <TouchableOpacity onPress={this._logOut} */}
                        {/* style={{ marginTop: 505 }} */}
                    {/* > */}
                        {/* <Text>Logout</Text> */}
                    {/* </TouchableOpacity> */}
                {/* </View> */}
                <Text>In Profile</Text>
            </SafeAreaView>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 2,
    },
    droidSafeArea: {
        flex: 1,
        backgroundColor: '#900C3F',
        paddingTop: Constants.statusBarHeight
    }
});
