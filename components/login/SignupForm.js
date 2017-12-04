import React, { Component } from 'react';
import { Alert, View, Text, TextInput, Button } from 'react-native';
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
      password: '',
      firstName: '',
      lastName: ''
    };
  }

  _signup() {
    const { firstName, lastName, email, password } = this.state;
    const { signup } = this.props;
    if (!firstName || !lastName || !email || !password) {
      Alert.alert('Please complete all fields');
    } else if (email.endsWith('harvard.edu')) {
      signup({ firstName, lastName, email, password });
      Alert.alert(`Please validate your email: ${email}`);
    } else {
      Alert.alert(
        "Inavlid email",
        "We are presently only supporting \"harvard.edu\" emails. Sorry!"
      );
    }
  }

  render() {
    return (
      <View>
        <Text>First Name</Text>
        <TextInput
          onChangeText={firstName => this.setState({ firstName })}
          autoCapitalize="words"
        />
        <Text>Last Name</Text>
        <TextInput
          onChangeText={lastName => this.setState({ lastName })}
          autoCapitalize="words"
        />
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
          onPress={() => this._signup()}
          title="SIGN UP"
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
