import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

class ItemView extends Component {
  render() {
    const { item } = this.props.navigation.state.params;

    return (
      <View>
        <Image style={styles.image} source={{ uri: item.image }} />
        <Text>{item.title}</Text>
        <Text>{item.description}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: 400,
    width: 400
  }
})

export default ItemView;
