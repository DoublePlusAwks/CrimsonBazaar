import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TradeCard from 'components/trades/TradeCard';
import { subscribeToTrades } from 'actions/TradesActions';

class TradesList extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { user, subscribeToTrades } = this.props;
    subscribeToTrades(user.uid);
  }

  _renderToTrades() {
    console.log(this.props);
    const { navigate } = this.props.navigation;
    const { toTrades } = this.props.trades;
    return Object.keys(toTrades).map(tradeId => {
      return (
        <TradeCard
          isTo
          key={tradeId}
          tradeId={tradeId}
          trade={toTrades[tradeId]}
          onCardPress={
            () => navigate('ValidateTradeTo',
                            { tradeId, trade: toTrades[tradeId] })}
        />
      );
    });
  }

  _renderFromTrades() {
    const { navigate } = this.props.navigation;
    const { fromTrades } = this.props.trades;
    return Object.keys(fromTrades).map(tradeId => {
      return (
        <TradeCard
          isFrom
          key={tradeId}
          tradeId={tradeId}
          trade={fromTrades[tradeId]}
          onCardPress={
            () => navigate('ValidateTradeFrom',
                            { tradeId, trade: fromTrades[tradeId] })}        />
      );
    });
  }

  render() {
    return (
      <View>
        {this._renderToTrades()}
        {this._renderFromTrades()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    trades: state.trades,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    subscribeToTrades,
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TradesList);
