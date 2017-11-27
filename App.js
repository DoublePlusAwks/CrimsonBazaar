import React from 'react';
import { StyleSheet, StatusBar, Text, View } from 'react-native';
import { Provider, connect } from 'react-redux';

import store from 'config/store';
import AppRouter from './AppRouter';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: '#fff'
  },
});
