import React, { Component } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class PreferenceCard extends Component {
  render() {
    const { color, item } = this.props;
    return (
      <View style={{ ...styles.container, backgroundColor: color }}>
        <TouchableOpacity>
          <Image
            source={item.image}
            style={styles.thumbnail}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = {
  container: {
    height: 60,
    width: 60,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnail: {
    height: 50,
    width: 50,
  },
};

export default PreferenceCard;
