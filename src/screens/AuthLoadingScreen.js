/**
 * Project - StarwasApp
 * Created by vivekgusain on 12/12/18
 */

import React, {Component} from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';
import MainActivityLoader from '../components/MainActivityIndicator';

type Props = {};
export default class AuthLoadingScreen extends Component<Props> {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        const userName = await AsyncStorage.getItem('userName');
        console.log("userName 2 : ", userName);
        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        this.props.navigation.navigate(userName ? 'App' : 'Auth');
    };

    // Render any loading content that you like here
    render() {
        return (
            <View>
                <MainActivityLoader />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}