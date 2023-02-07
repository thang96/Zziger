import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import BouncyCheckbox from 'react-native-bouncy-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TitleLogin from '../../Assets/svgs/TitleLogin.svg';
import CustomButton from '../../Components/CustomButton';
import CustomInputText from '../../Components/CustomInputText';
import {colors} from '../../Constants';
import IconFacebook from '../../Assets/svgs/ic_facebook.svg';
import IconNaver from '../../Assets/svgs/ic_naver.svg';
import IconKakaotalk from '../../Assets/svgs/ic_kakaotalk.svg';
import IconGoogle from '../../Assets/svgs/ic_google.svg';
import IconInstagram from '../../Assets/svgs/ic_instagram.svg';
import {Post_GetUserToken} from '../../Apis/LoginAPI/LoginApi';

const ReLoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [automaticLogin, setAutomaticLogin] = useState(true);

  return (
    <View style={styles.container}>
      <Text>relogin</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
});
export default ReLoginScreen;
