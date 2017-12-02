import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { subscribeToAuctions } from 'actions/AuctionsActions';
import AuctionsList from 'components/auctions/AuctionsList';

class ProfileAuctionsList extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.subscribeToAuctions();
  }

  _onCardPress({ auction, auctionId }) {
    const { navigate } = this.props.navigation;
    navigate('Preference', { auctionId });
  }

  _getParticipatingAuctions() {
    const { auctions, user } = this.props;
    return Object.keys(auctions)
      .filter(key => auctions[key].participants[user.uid] === true)
      .reduce((obj, key) => {
        obj[key] = auctions[key];
        return obj;
      }, {});
  }

  render() {
    return (
      <AuctionsList
        auctions={this._getParticipatingAuctions()}
        onCardPress={card => this._onCardPress(card)}
      />
    );
  }
}

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
)(ProfileAuctionsList);
