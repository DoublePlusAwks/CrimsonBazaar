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
        <View style={styles.contentContainer}>
          <View style={styles.auctionsContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Ongoing Auctions</Text>
            </View>
            <ProfileAuctionsList navigation={this.props.navigation}/>
          </View>
          <View style={styles.tradesContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Outstanding Trades</Text>
            </View>
            <ProfileAuctionsList navigation={this.props.navigation}/>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    marginHorizontal: 5,
  },
  titleContainer: {
    borderBottomWidth: 2.5,
    paddingVertical: 5,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  auctionsContainer: {
    paddingBottom: 20
  },
  tradesContainer: {
    paddingBottom: 40
  }
});

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  null
)(Profile);
