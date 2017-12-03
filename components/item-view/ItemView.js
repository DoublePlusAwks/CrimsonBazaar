import React, { Component } from 'react';
import { Dimensions, View, Text, Image, StyleSheet } from 'react-native';

class ItemView extends Component {
  render() {
    const { item } = this.props.navigation.state.params;

    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: item.image }} />
        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{item.title}</Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        </View>
      </View>
    );
  }
}

var { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  contentContainer: {
    marginHorizontal: 10
  },
  titleContainer: {
    borderBottomWidth: 2.5,
    paddingVertical: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  descriptionContainer: {
    marginTop: 5
  },
  description: {
    fontSize: 15
  },
  image: {
    height: width,
    width: width
  }
});

export default ItemView;
