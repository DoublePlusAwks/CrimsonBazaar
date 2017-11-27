import React, { Component } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { signup } from 'actions/UserActions';

class SignupForm extends Component {
  static navigationOptions = {
    title: "Sign Up"
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  render() {
    const { signup } = this.props;
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
          onPress={() => signup({ email, password })}
          title="Sign Up"
          color="red"
        />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    signup
  }, dispatch);
};

export default connect(null, mapDispatchToProps)(SignupForm);
