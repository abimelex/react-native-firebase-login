import React, {Component} from  'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

import Button from '../components/button/button';
import Header from '../components/header/header';
import Login from './login';
import styles from '../styles/common-styles.js';
import {auth} from '../modules/firebase';

class Account extends Component {
    constructor(props){
        super(props);
        this.user = auth.currentUser;
    }

    _logout() {
        auth.signOut();
        this.props.navigator.push({
            component: Login
        });
    }

    _renderUserInfo() {
        if (this.user) {
           return (
               <View style={styles.body}>
                   <View style={page_styles.email_container}>
                       <Text style={page_styles.email_text}>{this.user.email}</Text>
                       <Text>ID: {this.user.uid}</Text>
                   </View>
                   <Button
                       text="Logout"
                       onpress={this._logout.bind(this)}
                       button_styles={styles.primary_button}
                       button_text_styles={styles.primary_button_text} />
               </View>
           );
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Header text="Account" loaded={true} />
                <View style={styles.body}>
                    { this._renderUserInfo() }
                </View>
            </View>
        );
    }
}

const page_styles = StyleSheet.create({
    email_container: {
        padding: 20
    },
    email_text: {
        fontSize: 18
    }
});

export default Account;