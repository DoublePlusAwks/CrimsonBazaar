import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { subscribeToAuctions } from 'actions/AuctionsActions';

class Auctions extends Component {
  constructor(props) {
    super(props);
  }
  
  componentWillMount() {
    this.props.subscribeToAuctions();
  }

  render() {
    return (
      <View>
        <Text>
          View auctions here!
        </Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    subscribeToAuctions
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auctions);
