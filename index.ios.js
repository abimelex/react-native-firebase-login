import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import UjiMain from './src/index'

export default class firebaseTest extends Component {
  render() {
    return <UjiMain />;
  }
}

AppRegistry.registerComponent('firebaseTest', () => firebaseTest);