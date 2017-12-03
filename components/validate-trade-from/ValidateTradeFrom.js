import React, { Component } from 'react';
import { Alert, View, Text, StyleSheet } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation'
import { completeTrade } from 'actions/TradesActions';

class ValidateTradeFrom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      disabled: false,
    }
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  _handleBarCodeRead = ({ type, data }) => {
    const { disabled } = this.state;
    if (disabled) {
      return;
    }
    const { completeTrade, navigation } = this.props;
    const { trade, tradeId } = navigation.state.params;
    if (data == trade.toUser) {
      this.setState({ disabled: true });
      const backAction = NavigationActions.back();
      completeTrade(tradeId, () => {
        navigation.dispatch(backAction);
        Alert.alert('Trade succeeded!');
      });
    }
  }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={styles.container}>
          <BarCodeScanner
            onBarCodeRead={this._handleBarCodeRead}
            style={StyleSheet.absoluteFill}
          />
        </View>
      );
    }
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
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    completeTrade,
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ValidateTradeFrom);
