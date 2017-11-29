import React from 'react';
import { StyleSheet, StatusBar, Text, View, ActivityIndicator } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import store from 'config/store';
import MainRouter from 'components/main/MainRouter';
import LoginRouter from 'components/login/LoginRouter';

import { subscribeToAuth } from 'actions/UserActions';

class AppRouter extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.subscribeToAuth();
  }

  render() {
    const { user } = this.props;
    return (
      <View style={styles.container}>
        {user.initialized ?
          user.email
            ? <MainRouter />
            : <LoginRouter />
          : <View style={styles.loadingContainer}>
            <ActivityIndicator animating={user.initialized} />
          </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: '#fff'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    subscribeToAuth
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppRouter);
