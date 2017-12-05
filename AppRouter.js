import React from 'react';
import { StyleSheet, StatusBar, Text, View, ActivityIndicator, Platform } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import store from 'config/store';
import RootRouter from 'components/main/RootRouter';
import LoginRouter from 'components/login/LoginRouter';

import { subscribeToAuth } from 'actions/UserActions';
import { setLoading } from 'actions/StatusActions';

class AppRouter extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.subscribeToAuth();
  }

  componentWillReceiveProps(nextProps) {
    const { user, setLoading } = nextProps;
    if (user.initialized && !this.props.user.initialized) {
      setLoading(false);
    }
  }

  render() {
    const { user, status } = this.props;
    return (
      <View style={{...StyleSheet.absoluteFillObject}}>
        <Spinner visible={!user.initialized} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
        <View style={styles.statusBar}/>
        <View style={styles.container}>
          {
            user.email !== '' && user.emailVerified
              ? <RootRouter />
              : <LoginRouter />
          }
        </View>
      </View>
    );
  }
}

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
    backgroundColor: 'lightgray',
  },
  container: {
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
    user: state.user,
    status: state.status
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    subscribeToAuth,
    setLoading
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppRouter);
