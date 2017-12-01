import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as moment from 'moment';
import * as pluralize from 'pluralize';

class AuctionCard extends Component {
  render() {
    const { auctionId, auction } = this.props;
    const { navigate } = this.props.navigation;
    console.log(this.props.navigation);
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => navigate("ItemForm")}
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
              {`Contains ${pluralize.default('item', auction.items.length, true)}`}
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
    margin: 10,
    padding: 10
  }
});

export default AuctionCard;
