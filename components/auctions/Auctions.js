import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { subscribeToAuctions } from 'actions/AuctionsActions';
import AuctionsList from 'components/auctions/AuctionsList';

class Auctions extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.subscribeToAuctions();
  }

  render() {
    const { auctions } = this.props;
    return (
      <View>
        <AuctionsList auctions={auctions} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    auctions: state.auctions
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
