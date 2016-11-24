import React, {Component} from  'react';
import {
    AppRegistry,
    Text,
    TextInput,
    View
} from 'react-native';

import Button from '../components/button/button';
import Header from '../components/header/header';
import {auth} from '../modules/firebase';
import Login from './login';
import styles from '../styles/common-styles.js';

class Signup extends Component {
    constructor(props){
        super(props);

        this.state = {
            loaded: true,
            email: null,
            password: null
        };
    }

    _signup() {

        this.setState({
            loaded: false
        });

        auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then( () => {
                alert('Your account was created!');

                this.setState({
                    email: '',
                    password: '',
                    loaded: true
                });
            })
            .catch((error) => {
                alert(`Problem creating account: ${error.message}`);
                this.setState({
                    loaded: true
                });
            })
    }

    _goToLogin(){
        this.props.navigator.push({
            component: Login
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Header text="Signup" loaded={this.state.loaded} />
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
                        text="Signup"
                        onpress={this._signup.bind(this)}
                        button_styles={styles.primary_button}
                        button_text_styles={styles.primary_button_text} />
                    <Button
                        text="Got an Account?"
                        onpress={this._goToLogin.bind(this)}
                        button_styles={styles.transparent_button}
                        button_text_styles={styles.transparent_button_text} />
                </View>
            </View>
        );
    }
}

export default Signup;