import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen, ReLoginScreen} from '../../Screens';
const Stack = createStackNavigator();
const LoginNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ReLoginScreen"
        component={ReLoginScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default LoginNavigation;
