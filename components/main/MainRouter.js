import { Platform } from 'react-native';
import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';

import Profile from 'components/profile/Profile';
import Auctions from 'components/auctions/Auctions';

export default TabNavigator({
  Profile: { screen: Profile },
  Auctions: { screen: Auctions },
},{
  initialRouteName: 'Profile',
  headerMode: 'screen',
  tabBarPosition: (Platform.OS === 'ios') ? 'bottom' : 'top',
  tabBarOptions: {
    style: {
      backgroundColor: 'steelblue',
    },
    activeTintColor: 'white',
  },
});
