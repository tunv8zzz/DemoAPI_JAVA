/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/store';
import Login from './src/screen/Login'

export default class App extends Component{
  render(){
    return(
      <Provider store={store}>
        <Login/>
      </Provider>
    )
  }
}
