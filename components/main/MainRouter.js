import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';

import Profile from 'components/profile/Profile';
import ViewEvents from 'components/view-events/ViewEvents';
import Chats from 'components/chats/Chats';

export default TabNavigator({
  Profile: { screen: Profile },
  ViewEvents: { screen: ViewEvents },
  Chats: { screen: Chats }
},{
  initialRouteName: 'ViewEvents',
  headerMode: 'screen'
});
