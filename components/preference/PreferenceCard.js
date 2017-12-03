import React, { Component } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class PreferenceCard extends Component {
  render() {
    const { color, item } = this.props;
    return (
      <View style={{ ...styles.container, backgroundColor: color }}>
        <Image
          source={{ uri: item.thumbnail }}
          style={styles.thumbnail}
        />
      </View>
    );
  }
}

const styles = {
  container: {
    height: 70,
    width: 400,
    marginTop: 5,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  thumbnail: {
    height: 60,
    width: 60,
  },
};

export default PreferenceCard;
