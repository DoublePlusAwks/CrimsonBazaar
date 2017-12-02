import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import MainRouter from 'components/main/MainRouter';
import ItemForm from 'components/item-form/ItemForm';
import Preference from 'components/preference/Preference';

export default StackNavigator({
  Main: { screen: MainRouter },
  ItemForm: { screen: ItemForm },
  Preference: { screen: Preference }
},{
  initialRouteName: 'Main',
  headerMode: 'none'
});
