import React, { Component } from 'react';
import {
    AppRegistry,
    Text,
    View,
    Navigator,
} from 'react-native';

import Signup from './pages/signup';
import Account from './pages/account';
import Header from './components/header/header';
import {auth} from './modules/firebase';
import styles from './styles/common-styles.js';

class LoginMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            component: null,
            loaded: false
        };
    }

    componentWillMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.setState({component: Account});
            } else {
                this.setState({component: Signup});
            }
        });
    }

    render() {
        if (this.state.component) {
            return (
                <Navigator
                    initialRoute={{component: this.state.component}}
                    configureScene={() => {
                        return Navigator.SceneConfigs.FloatFromRight;
                    }}
                    renderScene={(route, navigator) => {
                        if (route.component) {
                            return React.createElement(route.component, { navigator });
                        }
                    }}
                />
            );
        } else {
            return (
                <View style={styles.container}>
                    <Header text="React Native Firebase Auth" loaded={this.state.loaded} />
                    <View style={styles.body}></View>
                </View>
            );
        }
    }
}

export default LoginMain;
