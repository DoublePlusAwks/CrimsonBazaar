import React, { Component } from 'react';
import { Dimensions, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

class LoginHome extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('assets/logo.gif')} />
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

var { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBFFFF',
    justifyContent: 'space-around',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
     width: width,
     height: width * 0.75
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 130
  },
  loginButton: {
    alignSelf: 'stretch',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'deepskyblue',
  },
  signInButton: {
    alignSelf: 'stretch',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default LoginHome;
