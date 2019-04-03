/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { BaseService } from './src/api/BaseService';
import ConfigAPI from './src/api/ConfigAPI';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {

  constructor(props) {
    super(props);
    let params = {
      [ConfigAPI.PARAM_METHOD]: ConfigAPI.METHOD_LOGIN,
      [ConfigAPI.PARAM_USERNAME]: "nguyentu",
      [ConfigAPI.PARAM_PASSWORD]: "123456",
    };
    let loginService = new BaseService();
    loginService.setParam(params);
    loginService.setCallback(this);
    loginService.requestData(BaseService.METHOD.POST);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }

  async onSuccess(code, message, data, method) {
    if (method == ConfigAPI.METHOD_LOGIN) {
      alert("METHOD_LOGIN onSuccess"  + JSON.stringify(data))
    }
  }
  async onFail(code, message, method) {
    if (method == ConfigAPI.METHOD_LOGIN) {
      alert("METHOD_LOGIN onFail" + JSON.stringify(message))
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',//
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
