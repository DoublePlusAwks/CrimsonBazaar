import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TradeCard from 'components/trades/TradeCard';
import { subscribeToTrades } from 'actions/TradesActions';
import { userChange } from 'actions/UserActions';

class TradesList extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { user, subscribeToTrades } = this.props;
    subscribeToTrades(user.uid);
  }

  componentWillReceiveProps(nextProps) {
    const { user, trades, userChange } = nextProps;
    const { toTrades } = trades;
    const nextNumIncompleteTrades = Object.keys(toTrades).length;
    if (user.numIncompleteTrades !== nextNumIncompleteTrades) {
      userChange({ numIncompleteTrades: nextNumIncompleteTrades });
    }
  }

  _renderToTrades() {
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

  _renderTrades() {
    const toTradeCards = this._renderToTrades();
    const fromTradeCards = this._renderFromTrades();
    if (toTradeCards.length == 0 && fromTradeCards.length == 0) {
      return (
        <Text>
          No trades...yet :)
        </Text>
      );
    }
    return toTradeCards.concat(fromTradeCards);
  }

  render() {
    return (
      <View>
        {this._renderTrades()}
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
    userChange
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TradesList);
