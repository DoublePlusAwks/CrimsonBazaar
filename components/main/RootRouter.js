import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import MainRouter from 'components/main/MainRouter';
import ItemForm from 'components/item-form/ItemForm';
import Preference from 'components/preference/Preference';
import ItemView from 'components/item-view/ItemView';
import ValidateTradeTo from 'components/validate-trade-to/ValidateTradeTo';
import ValidateTradeFrom from 'components/validate-trade-from/ValidateTradeFrom';

export default StackNavigator({
  Main: { screen: MainRouter },
  ItemForm: { screen: ItemForm },
  Preference: { screen: Preference },
  ItemView: { screen: ItemView },
  ValidateTradeTo: { screen: ValidateTradeTo },
  ValidateTradeFrom: { screen: ValidateTradeFrom }
},{
  initialRouteName: 'Main',
  headerMode: 'none'
});
