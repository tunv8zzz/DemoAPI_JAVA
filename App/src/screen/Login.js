import React, { Component } from 'react';
import { View, TouchableOpacity, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions/AuthActions'
import ConfigAPI from '../api/ConfigAPI';
import { BaseService } from '../api/BaseService';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  login() {
    let params = {
      [ConfigAPI.PARAM_METHOD]: ConfigAPI.METHOD_LOGIN,
      [ConfigAPI.PARAM_USERNAME]: this.state.email,
      [ConfigAPI.PARAM_PASSWORD]: this.state.password,
    };

    this.props.login(BaseService.METHOD.POST, params).then(() => {
      if (this.props.error) {
        alert(this.props.error)
      }
      else {
        alert(JSON.stringify(this.props.userData) + '\n user successfully logged in ')
      }
    })
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <TextInput autoCapitalize="none" keyboardType="email-address" style={{ marginTop: 200, marginHorizontal: 40, height: 40 }} placeholder="Enter email" value={this.state.email} onChangeText={email => this.setState({ email })} />
        <TextInput autoCapitalize="none" secureTextEntry style={{ marginTop: 20, marginHorizontal: 40, height: 40 }} placeholder="Enter password" value={this.state.password} onChangeText={password => this.setState({ password })} />
        <TouchableOpacity onPress={() => this.login()}>
          <Text style={{ marginTop: 20, color: 'black', textAlign: 'center' }}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  isLoading: state.auth.isLoading,
  userData: state.auth.userData,
  error: state.auth.error
})

const mapDispatchToProps = dispatch => ({
  login: (methodType, params) => dispatch(actions.login(methodType, params))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
