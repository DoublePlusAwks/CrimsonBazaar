import React, { Component } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { logout } from 'actions/UserActions';

class Profile extends Component {
  render() {
    const { user, logout } = this.props;
    return (
      <View>
        <Text>
          {user.email}
        </Text>
        <Button
          title="Log out"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
          onPress={logout}>
        </Button>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    logout,
  },
  dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
