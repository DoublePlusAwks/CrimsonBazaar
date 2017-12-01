import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import MainRouter from 'components/main/MainRouter';
import ItemForm from 'components/item-form/ItemForm';

export default StackNavigator({
  Main: { screen: MainRouter },
  ItemForm: { screen: ItemForm }
},{
  initialRouteName: 'Main',
  headerMode: 'none'
});
