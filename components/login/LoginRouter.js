import { StackNavigator } from 'react-navigation';

import LoginHome from 'components/login/LoginHome';
import LoginForm from 'components/login/LoginForm';
import SignupForm from 'components/login/SignupForm';

export default StackNavigator({
  Home: { screen: LoginHome },
  LoginForm: { screen: LoginForm },
  SignupForm: { screen: SignupForm },
}, {
  initialRouteName: 'Home',
  headerMode: 'screen'
});
