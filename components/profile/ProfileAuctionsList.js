import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { subscribeToAuctions } from 'actions/AuctionsActions';
import { userChange } from 'actions/UserActions';
import AuctionsList from 'components/auctions/AuctionsList';

class ProfileAuctionsList extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.subscribeToAuctions();
  }

  componentWillReceiveProps(nextProps) {
    const { user, userChange } = nextProps;
    const nextNumActiveAuctions = Object.keys(this._getParticipatingAuctions(nextProps)).length;
    console.log(nextNumActiveAuctions);
    if (user.numActiveAuctions !== nextNumActiveAuctions) {
      userChange({ numActiveAuctions: nextNumActiveAuctions });
    }
  }

  _onCardPress({ auction, auctionId }) {
    const { navigate } = this.props.navigation;
    navigate('Preference', { auctionId });
  }

  _getParticipatingAuctions(props) {
    const { auctions, user } = props;
    const auctionKeys = Object.keys(auctions);
    if (auctionKeys.length) {
      return auctionKeys.filter(key => auctions[key].participants[user.uid] === true)
      .reduce((obj, key) => {
        obj[key] = auctions[key];
        return obj;
      }, {});
    } return {};
  }

  render() {
    return (
      <AuctionsList
        auctions={this._getParticipatingAuctions(this.props)}
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
    subscribeToAuctions,
    userChange
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileAuctionsList);
