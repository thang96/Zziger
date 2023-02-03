import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  AppState,
} from 'react-native';

import TitleLogin from '../../Assets/svgs/TitleLogin.svg';
import CustomButton from '../../Components/CustomButton';
import CustomInputText from '../../Components/CustomInputText';
import {colors} from '../../Constants';
const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.container}>
      <View style={styles.eachContainer}>
        <TitleLogin width={150} height={60} />
        <Text style={styles.textContent}>Wellcome to Zziger!</Text>
        <CustomInputText
          styleViewTextInput={[styles.styleViewTextInput, {marginTop: 30}]}
          placeholder={username ? username : 'Username'}
        />
        <CustomInputText
          styleViewTextInput={[styles.styleViewTextInput, {marginTop: 10}]}
          placeholder={password ? password : 'Password'}
        />
        <CustomButton
          styleViewButton={[
            styles.styleViewButton,
            {
              borderRadius: 10,
              backgroundColor: colors.backgroundButton,
              marginTop: 30,
            },
          ]}
          styleButton={styles.styleViewButton}
          label={'Login'}
          styleLabel={styles.styleLabel}
          onPress={() => {}}
        />
        <View style={styles.viewRow}>
          <CustomButton
            label={'아이디 찾기'}
            styleLabel={{color: 'black', fontSize: 16}}
            onPress={() => {}}
          />
          <CustomButton
            label={'비밀번호 찾기'}
            styleLabel={{color: 'black', fontSize: 16}}
            onPress={() => {}}
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  eachContainer: {flex: 1, justifyContent: 'center', paddingHorizontal: 10},
  textContent: {fontSize: 16, color: 'grey'},
  styleViewTextInput: {
    width: '100%',
    height: 60,
    borderRadius: 10,
    backgroundColor: colors.backgroundInput,
  },
  styleViewButton: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  styleLabel: {fontSize: 18, fontWeight: 'bold', color: 'white'},
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
});
export default LoginScreen;
