import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

class LoginHome extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{flex: 1}}>
        <View style={styles.logoContainer}>
          <Text>Welcome!</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigate('LoginForm')}>
            <Text style={styles.buttonText}>
              LOGIN
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style = {styles.signInButton}
            onPress={() => navigate('SignupForm')}>
            <Text style={styles.buttonText}>
              SIGN UP
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  loginButton: {
    alignSelf: 'stretch',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'deepskyblue',
    margin: 10,
  },
  signInButton: {
    alignSelf: 'stretch',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    margin: 10
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default LoginHome;
