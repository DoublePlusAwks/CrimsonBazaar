import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import MainRouter from 'components/main/MainRouter';
import ItemForm from 'components/item-form/ItemForm';
import Preference from 'components/preference/Preference';
import ItemView from 'components/item-view/ItemView';

export default StackNavigator({
  Main: { screen: MainRouter },
  ItemForm: { screen: ItemForm },
  Preference: { screen: Preference },
  ItemView: { screen: ItemView }
},{
  initialRouteName: 'Main',
  headerMode: 'none'
});
