import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen, LoginScreens, CameraScreen} from '../../Screens';
const Stack = createStackNavigator();
const HomeNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="CameraScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LoginScreens"
        component={LoginScreens}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CameraScreen"
        component={CameraScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default HomeNavigation;
