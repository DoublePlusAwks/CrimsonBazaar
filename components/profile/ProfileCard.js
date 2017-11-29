import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { logout } from 'actions/UserActions';

const ProfileCard = ({ user, logout }) => {
  return (
    <View>
      <View style={styles.profileCard}>
        <View style={styles.profileInfo}>
          <Text>
            {user.email}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={logout}>
            <Text style={{color: 'white'}}>
              Log out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileCard: {
    height: 100,
    backgroundColor: 'lightgray',
  },
  profileInfo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {
    margin: 10,
    height: 30
  },
  logoutButton: {
    flex: 1,
    backgroundColor: 'purple',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    logout,
  },
  dispatch);
};

export default connect(
  null,
  mapDispatchToProps
)(ProfileCard);
