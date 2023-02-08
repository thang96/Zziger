import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, ImageBackground} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
// import {updateToken} from '../Stores/slices/tokenSlice';
// import LoginApi from '../Apis/LoginAPI/LoginApi';
import {images} from '../Constants';
const SplashScreen = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const token = useSelector(state => state?.token?.token);
  const isFocused = useIsFocused();
  const [listUser, setListUser] = useState([]);

  useEffect(() => {
    loginTokenApi();
  }, [token, isFocused]);

  const loginTokenApi = async () => {
    await AsyncStorage.getItem('token').then(value => {
      if (value) {
        // dispatch(updateToken(value));
        callApiToken(value);
      } else if (!value) {
        getListUser();
      }
    });
  };
  const getListUser = async () => {
    try {
      await AsyncStorage.getItem('listUser')
        .then(res => {
          if (res) {
            let result = JSON.parse(res);
            setListUser(result);
            navigation.navigate('ReLoginScreen');
          } else if (!res) {
            navigation.navigate('LoginScreen');
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {}
  };
  const callApiToken = async value => {
    navigation.navigate('HomeScreen');
    // await LoginApi.GetVerifyTokenAPI(value)
    //   .then(res => {
    //     if (res?.status == 200 && res?.data?.success == true) {
    //       navigation.navigate('HomeNavigation');
    //     } else {
    //       navigation.navigate('LoginNavigation');
    //     }
    //   })
    //   .catch(function (error) {
    //     navigation.navigate('LoginNavigation');
    //   });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={images.backgroundSplash}
        style={styles.background}
        resizeMode={'cover'}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    width: '100%',
    height: '100%',
  },
});
export default SplashScreen;
