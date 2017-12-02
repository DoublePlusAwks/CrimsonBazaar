import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Preference extends Component {
  render() {
    const { auctionId } = this.props.navigation.state.params;
    return (
      <View>
        <Text>
          Preference screen
        </Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    auctions: state.items
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Preference);
