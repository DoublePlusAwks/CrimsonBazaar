import React from 'react';
import { View, StyleSheet } from 'react-native';

const StatusBar = props => {
  return (
    <View
      style={[ styles.statusBarBackground, props.style ]}
    />
  );
};

const styles = StyleSheet.create({
  statusBarBackground: {
    height: 24,
    backgroundColor: 'tomato'
  }
});

export default StatusBar;
