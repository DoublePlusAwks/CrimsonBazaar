import React, { Component } from 'react';
import { Alert, Button, ScrollView, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { MAX_LIVES } from 'config/constants';
import { subscribeToAuctions } from 'actions/AuctionsActions';
import AuctionsList from 'components/auctions/AuctionsList';

class Auctions extends Component {
  static navigationOptions = {
    tabBarLabel: 'Auctions',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
      <FontAwesome name="exchange" size={20} color="gray" />
    ),
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.subscribeToAuctions();
  }

  _onCardPress({ auction, auctionId }) {
    const { navigate } = this.props.navigation;
    const { user } = this.props;
    const numLives = MAX_LIVES - user.numActiveAuctions - user.numIncompleteTrades;
    if (numLives > 0) {
      navigate('ItemForm', { auctionId });
    } else {
      Alert.alert(
        'Out of lives!',
        'Please complete outstanding trades to regain lives'
      );
    }
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
