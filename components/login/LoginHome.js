import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

class LoginHome extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>Welcome!</Text>
        <Button
          onPress={() => navigate('LoginForm')}
          title="Login"
          color="deepskyblue"
        />
        <Button
          onPress={() => navigate('SignupForm')}
          title="Sign Up"
          color="red"
        />
      </View>
    );
  }
}

export default LoginHome;
