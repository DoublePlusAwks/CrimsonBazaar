import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { MAX_LIVES } from 'config/constants';
import { logout } from 'actions/UserActions';

class ProfileCard extends Component {
  _renderHearts() {
    const { user } = this.props;
    const numLives = MAX_LIVES - user.numActiveAuctions - user.numIncompleteTrades;
    const hearts = [];
    let key = 0;
    for (let i = 0; i < numLives; i++) {
      hearts.push(
        <View style={{ marginHorizontal: 2 }}>
          <FontAwesome name="heart" size={20} color="crimson" key={key} />
        </View>);
      key++;
    }
    for (let i = numLives; i < MAX_LIVES; i++) {
      hearts.push(
        <View style={{ marginHorizontal: 2 }}>
          <FontAwesome name="heart-o" size={20} color="crimson" key={key} />
        </View>);
      key++;
    }
    return hearts;
  }

  render() {
    const { user, logout } = this.props;
    return (
      <View>
        <View style={styles.profileCard}>
          <View style={styles.profileInfo}>
            <Text style={styles.title}>
              Welcome {user.firstName}
            </Text>
          </View>
          <View style={styles.heartContainer}>
            <Text style={styles.livesText}>LIVES: </Text>
            {this._renderHearts()}
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={logout}>
              <Text style={{color: 'white'}}>
                LOG OUT
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  profileCard: {
    paddingTop: 20,
    height: 120,
    backgroundColor: 'lightgray',
  },
  profileInfo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  heartContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20
  },
  livesText: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  buttonContainer: {
    margin: 10,
    height: 30
  },
  logoutButton: {
    flex: 1,
    backgroundColor: 'steelblue',
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
