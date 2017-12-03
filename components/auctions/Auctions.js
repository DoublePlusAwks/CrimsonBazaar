import React, { Component } from 'react';
import { Button, ScrollView, Text, StyleSheet } from 'react-native';
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

  _onCardPress({ auction, auctionId }) {
    const { navigate } = this.props.navigation;
    navigate('ItemForm', { auctionId });
  }

  _getNonparticipatingAuctions() {
    const { auctions, user } = this.props;
    return Object.keys(auctions)
      .filter(key => auctions[key].participants[user.uid] !== true)
      .reduce((obj, key) => {
        obj[key] = auctions[key];
        return obj;
      }, {});
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <AuctionsList
          auctions={this._getNonparticipatingAuctions()}
          onCardPress={card => this._onCardPress(card)}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
  },
});

const mapStateToProps = state => {
  return {
    user: state.user,
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
