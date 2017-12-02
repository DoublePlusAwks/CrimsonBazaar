import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getItems } from 'actions/ItemActions';

class Preference extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { auctionId } = this.props.navigation.state.params;
    this.props.getItems(auctionId);
  }

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
    getItems
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Preference);
