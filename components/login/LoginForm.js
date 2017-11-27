import React, { Component } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { login } from 'actions/UserActions';

class LoginForm extends Component {
  static navigationOptions = {
    title: "Login"
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  render() {
    const { login } = this.props;
    const { email, password } = this.state;
    return (
      <View>
        <Text>Email</Text>
        <TextInput
          onChangeText={email => this.setState({ email })}
        />
        <Text>Password</Text>
        <TextInput
          onChangeText={password => this.setState({ password })}
          secureTextEntry={true}
        />
        <Button
          onPress={() => login({ email, password })}
          title="Login"
          color="deepskyblue"
        />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    login
  }, dispatch);
};

export default connect(null, mapDispatchToProps)(LoginForm);
