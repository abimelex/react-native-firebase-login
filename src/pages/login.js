import React, {Component} from  'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';

import Button from '../components/button/button';
import Header from '../components/header/header';
import {auth} from '../modules/firebase';
import Signup from './signup';
import Account from './account';

import styles from '../styles/common-styles.js';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: null,
            password: null,
            loaded: true
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Header text="Login" loaded={this.state.loaded} />
                <View style={styles.body}>
                    <TextInput
                        style={styles.textinput}
                        onChangeText={(text) => this.setState({email: text})}
                        value={this.state.email}
                        placeholder={"Email Address"} />
                    <TextInput
                        style={styles.textinput}
                        onChangeText={(text) => this.setState({password: text})}
                        value={this.state.password}
                        secureTextEntry={true}
                        placeholder={"Password"} />
                    <Button
                        text="Login"
                        onpress={this.login.bind(this)}
                        button_styles={styles.primary_button}
                        button_text_styles={styles.primary_button_text} />
                    <Button
                        text="New here?"
                        onpress={this.goToSignup.bind(this)}
                        button_styles={styles.transparent_button}
                        button_text_styles={styles.transparent_button_text} />
                </View>
            </View>
        );
    }

    login() {
        this.setState({
            loaded: false
        });

        auth.signInWithEmailAndPassword(this.state.email, this.state.password).then( () => {
            this.props.navigator.push({
                component: Account
            });
        }).catch( (error) => {
            alert(`Login Failed. Please try again: ${error}`);

            this.setState({
                loaded: true
            });
        });
    }

    goToSignup() {
        this.props.navigator.push({
            component: Signup
        });
    }
}

export default Login;