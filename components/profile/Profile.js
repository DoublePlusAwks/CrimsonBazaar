import React, { Component } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import ProfileCard from 'components/profile/ProfileCard';
import ProfileAuctionsList from 'components/profile/ProfileAuctionsList';

class Profile extends Component {
  render() {
    const { user } = this.props;
    return (
      <ScrollView>
        <View>
          <ProfileCard user={user} />
        </View>
        <ProfileAuctionsList navigation={this.props.navigation}/>
      </ScrollView>
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
