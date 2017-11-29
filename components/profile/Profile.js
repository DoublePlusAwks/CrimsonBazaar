import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import ProfileCard from 'components/profile/ProfileCard';

class Profile extends Component {
  render() {
    const { user } = this.props;
    return (
      <View>
        <View>
          <ProfileCard user={user} />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  null
)(Profile);
