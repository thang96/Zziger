import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import {SafeAreaView, StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {store} from './src/Stores/store';
import MainNavigation from './src/Navigations/MainNavigation';

// import Orientation from 'react-native-orientation-locker';
const App = () => {
  // useEffect(() => {
  //   Orientation.lockToPortrait();
  // }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <GestureHandlerRootView style={{flex: 1}}>
        <StatusBar hidden={true} />
        <Provider store={store}>
          <NavigationContainer>
            <MainNavigation />
          </NavigationContainer>
        </Provider>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default App;
