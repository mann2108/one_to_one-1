import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
import { View } from 'native-base';

export default class GroupChatShow extends React.Component {
    constructor(){
        this.state={
            items:this.props.route.params.item
        }
        console.log(items)
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>Inside GroupChatShow</Text>
            </View>
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
})