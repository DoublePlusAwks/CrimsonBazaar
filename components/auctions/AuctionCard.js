import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as moment from 'moment';
import * as pluralize from 'pluralize';

class AuctionCard extends Component {
  _itemCount() {
    const { auction } = this.props;
    const itemsKeys = Object.keys(auction.items);
    console.log(itemsKeys);
    const items = itemsKeys.filter(key => auction.items[key] === true);
    return items.length;
  }

  render() {
    const { auctionId, auction } = this.props;
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => navigate('ItemForm', { auctionId })}
          >
          <View>
            <Text>
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
    padding: 10
  }
});

export default AuctionCard;
