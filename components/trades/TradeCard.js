import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getOtherUser } from 'actions/OtherUsersActions';

class TradeCard extends Component {
  componentWillMount() {
    const { isTo, otherUsers, trade, getOtherUser } = this.props;
    const otherUser = this._getOtherUser();
    if (!otherUsers[otherUser]) {
      getOtherUser(otherUser);
    }
  }

  _getOtherUser() {
    const { isTo, trade } = this.props;
    let otherUser;
    if (isTo) {
      otherUser = trade.toUser;
    } else {
      otherUser = trade.fromUser;
    }
    return otherUser;
  }

  _getIcon() {
    const { isTo } = this.props;
    if (isTo) {
      return (<FontAwesome name="sign-out" size={64} color="firebrick" />);
    }
    return (<FontAwesome name="sign-in" size={64} color="forestgreen" />);
  }

  render() {
    const { isTo, tradeId, trade, otherUsers, onCardPress, icon } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={{ flex: 1, flexDirection: 'row' }}
          onPress={() => onCardPress( tradeId )} >
          {this._getIcon()}
          <View style={styles.textContainer}>
            <View>
              <Text style={styles.title}>
                Trade {isTo ? 'to' : 'from'}:
              </Text>
            </View>
            <View>
              <Text>
                {otherUsers[this._getOtherUser()] && otherUsers[this._getOtherUser()].email}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    padding: 10
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  textContainer: {
    flex: 1,
    paddingLeft: 15,
    flexDirection: 'column'
  }
});

const mapStateToProps = state => {
  return {
    otherUsers: state.otherUsers,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getOtherUser,
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TradeCard);
