import React, { Component } from 'react';
import { Dimensions, View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode';
import { connect } from 'react-redux';

class ValidateTradeTo extends Component {
  render() {
    const { user } = this.props;
    var { height, width } = Dimensions.get('window');
    return (
      <View style={styles.container}>
        <QRCode
          value={user.uid}
          size={Math.min(height * 0.75, width * 0.75)}
          bgColor='steelblue'
          fgColor='white' />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
});

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export default connect(
  mapStateToProps,
  null
)(ValidateTradeTo);
