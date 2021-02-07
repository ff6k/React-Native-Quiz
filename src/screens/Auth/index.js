import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './Login';
import SignUpScreen from './SignUp';
import PasswordResetScreen from './PasswordReset';
import TeacherSignup from './TeacherSignup';
import {
  LOGIN,
  SIGNUP,
  PW_RESET,
  TEACHERSIGNUP,
  REGISTRATIONCHOICE,
} from '../../constants/routeNames';
import RegistrationChoice from '../App/RegistrationChoice';

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator initialRouteName={LOGIN} headerMode="none">
      <Stack.Screen name={LOGIN} component={LoginScreen} />
      <Stack.Screen name={SIGNUP} component={SignUpScreen} />
      <Stack.Screen name={PW_RESET} component={PasswordResetScreen} />
      <Stack.Screen name={TEACHERSIGNUP} component={TeacherSignup} />
      <Stack.Screen name={REGISTRATIONCHOICE} component={RegistrationChoice} />
    </Stack.Navigator>
  );
};
