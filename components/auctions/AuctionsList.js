import React, { Component } from 'react';
import { View, Text } from 'react-native';
import AuctionCard from 'components/auctions/AuctionCard';

class AuctionsList extends Component {
  constructor(props) {
    super(props);
  }

  _renderAuctionCards() {
    const { onCardPress, auctions } = this.props;
    const auctionKeys = Object.keys(auctions);
    if (auctionKeys.length == 0) {
      return (
        <Text>
          No exchanges...yet :)
        </Text>
      )
    }
    return auctionKeys.map(
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
