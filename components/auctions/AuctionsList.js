import React, { Component } from 'react';
import { View, Text } from 'react-native';
import AuctionCard from 'components/auctions/AuctionCard';

class AuctionsList extends Component {
  constructor(props) {
    super(props);
  }

  _renderAuctionCards() {
    const { onCardPress, auctions } = this.props;
    return Object.keys(auctions).map(
      auctionId => {
        return (
          <AuctionCard
            key={auctionId}
            auctionId={auctionId}
            auction={auctions[auctionId]}
            onCardPress={onCardPress}
          />
        );
      }
    );
  }

  render() {
    return (
      <View>
        {this._renderAuctionCards()}
      </View>
    );
  }
}

export default AuctionsList;
