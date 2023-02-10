import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StyleSheet} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
import {
  SplashScreen,
  LoginScreen,
  ReLoginScreen,
  Register,
  RegisterAsAnIndividual,
  RegisterAsABusiness,
  RegisterAsASchool,
  HomeScreen,
  TakeAPictureToOrder,
  ChoosetypeOfCard,
  UploadImage,
  ViewManuscript,
  ManuscriptEditing,
} from '../Screens';

const MainNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        component={SplashScreen}
        name={'SplashScreen'}
        options={{headerShown: false}}
      />
      {/*Login ----------------------------------*/}
      <Stack.Screen
        component={LoginScreen}
        name={'LoginScreen'}
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={ReLoginScreen}
        name={'ReLoginScreen'}
        options={{headerShown: false}}
      />
      {/*Register ----------------------------------*/}
      <Stack.Screen
        component={Register}
        name={'Register'}
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={RegisterAsAnIndividual}
        name={'RegisterAsAnIndividual'}
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={RegisterAsABusiness}
        name={'RegisterAsABusiness'}
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={RegisterAsASchool}
        name={'RegisterAsASchool'}
        options={{headerShown: false}}
      />
      {/*Home ----------------------------------*/}
      <Stack.Screen
        component={HomeScreen}
        name={'HomeScreen'}
        options={{headerShown: false}}
      />
      {/*TakeAPictureToOrder ----------------------------------*/}
      <Stack.Screen
        component={TakeAPictureToOrder}
        name={'TakeAPictureToOrder'}
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={ChoosetypeOfCard}
        name={'ChoosetypeOfCard'}
        options={{headerShown: false}}
      />
      {/*PhotoAlbum ----------------------------------*/}
      <Stack.Screen
        component={UploadImage}
        name={'UploadImage'}
        options={{headerShown: false}}
      />
      {/*ViewManuscript ----------------------------------*/}
      <Stack.Screen
        component={ViewManuscript}
        name={'ViewManuscript'}
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={ManuscriptEditing}
        name={'ManuscriptEditing'}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default MainNavigation;
