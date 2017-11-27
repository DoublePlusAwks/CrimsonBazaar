import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';

import CreateEventForm from 'components/create-event/CreateEventForm';
import ViewEvents from 'components/view-events/ViewEvents';
import Chats from 'components/chats/Chats';

export default TabNavigator({
  CreateEvent: { screen: CreateEventForm },
  ViewEvents: { screen: ViewEvents },
  Chats: { screen: Chats }
},{
  initialRouteName: 'ViewEvents',
  headerMode: 'screen'
});
