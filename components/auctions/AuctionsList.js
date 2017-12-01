import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import AuctionCard from 'components/auctions/AuctionCard';

class AuctionsList extends Component {
  constructor(props) {
    super(props);
  }

  _renderAuctionCards() {
    const { auctions, navigation } = this.props;
    return Object.keys(auctions).map(
      auctionId => {
        return (
          <AuctionCard
            navigation={navigation}
            key={auctionId}
            auctionId={auctionId}
            auction={auctions[auctionId]}
          />
        );
      }
    );
  }

  render() {
    return (
      <ScrollView>
        {this._renderAuctionCards()}
      </ScrollView>
    );
  }
}

export default AuctionsList;
