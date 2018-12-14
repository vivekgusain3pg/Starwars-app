/**
 * Project - StarwasApp
 * Created by vivekgusain on 9/12/18
 */

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, ImageBackground, TextInput, TouchableHighlight, AsyncStorage} from 'react-native';
import login_background from '../../resources/images/login_background.jpg';
import SearchPlanets from "../screens/SearchPlanets";
import BaseComponent from "../components/BaseComponent";

type Props = {};
export default class LoginScreen extends Component<Props> {
    constructor(props){
        super(props);

        this.state = {
            username: '',
            password: '',
            loginFailure: false
        }
    }

    updateText = (stateName, value) => {
        this.setState({
            [stateName]: value
        })
    };

    authenticate = () => {
        if(this.state.username && this.state.password) {
            fetch(`https://swapi.co/api/people/?search=${this.state.username}`).then(response => {
                return response.json();
            }).then((responseJson) => {
                if (responseJson.count !== 0 && responseJson.results[0].name.toLowerCase() === this.state.username.toLowerCase() && responseJson.results[0].birth_year === this.state.password) {
                    AsyncStorage.setItem('userName', responseJson.results[0].name.toLowerCase());
                    this.props.navigation.navigate('SearchPlanets');
                } else {
                    this.setState({loginFailure: true})
                }
            })
        }
    };

    render() {
        return (
            <BaseComponent imageBackgroundSource={login_background}>
                <View style={styles.headingBlock}>
                    <Text style={styles.headingText}>Star wars</Text>
                </View>
                {this.state.loginFailure && <Text style={styles.errMsgText}>Invalid username or password</Text>}
                <View style={styles.formContainer}>
                    <Text style={styles.labelText}>Username</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.updateText('username',text)}
                    />

                    <Text style={styles.labelText}>Password</Text>
                    <TextInput
                        secureTextEntry= {true}
                        style={styles.input}
                        onChangeText={(text) => this.updateText('password',text)}
                    />

                    <TouchableHighlight style={styles.submitBtn} onPress={this.authenticate}>
                        <Text style={styles.submitBtnText}>Sign in</Text>
                    </TouchableHighlight>
                </View>
            </BaseComponent>
        );
    }
}

const styles = StyleSheet.create({
    headingBlock: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headingText: {
        color: 'white',
        fontSize: 30,
    },
    errMsgText: {
        color: 'red',
        fontSize: 20,
        textAlign: "center"
    },
    formContainer: {
        flex: 2,
        margin: 10
    },
    labelText: {
        fontSize: 20,
        color: 'white',
        marginTop: 20
    },
    input: {
        height: 40,
        width: '100%',
        color: 'white',
        borderBottomWidth: 1,
        borderBottomColor:'white',
        fontSize: 15
    },
    submitBtn: {
        alignItems: 'center',
        marginTop: 20
    },
    submitBtnText: {
        color: 'white',
        fontSize: 20
    }
});

