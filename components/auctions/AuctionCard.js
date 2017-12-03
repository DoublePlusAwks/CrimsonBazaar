import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as moment from 'moment';
import * as pluralize from 'pluralize';

class AuctionCard extends Component {
  _itemCount() {
    const { auction } = this.props;
    const itemsKeys = Object.keys(auction.items);
    const items = itemsKeys.filter(key => auction.items[key] === true);
    return items.length;
  }

  render() {
    const { auctionId, auction, onCardPress } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={{ flex: 1, flexDirection: 'row' }}
          onPress={() => onCardPress({ auction, auctionId })} >
          <FontAwesome name="exchange" size={64} color="gray" />
          <View style={styles.textContainer}>
            <View>
              <Text style={styles.title}>
                {auction.title}
              </Text>
            </View>
            <View>
              <Text>
                {`Market closes ${moment.default(auction.end).fromNow()}`}
              </Text>
              <Text>
                {`Contains ${pluralize.default('item', this._itemCount(), true)}`}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    marginTop: 10,
    marginHorizontal: 10,
    padding: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  textContainer: {
    flex: 1,
    paddingLeft: 15,
    flexDirection: 'column'
  }
});

export default AuctionCard;
