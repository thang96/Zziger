import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
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
import {useNavigation} from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [automaticLogin, setAutomaticLogin] = useState(true);
  const [listUser, setListUser] = useState([]);

  const [keyBoardIsShow, setKeyBoardIsShow] = useState();
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setKeyBoardIsShow(true);
    });
    Keyboard.addListener('keyboardDidHide', () => {
      setKeyBoardIsShow(false);
    });
  }, []);

  useEffect(() => {
    const getListUser = async () => {
      await AsyncStorage.getItem('listUser')
        .then(res => {
          if (res) {
            setListUser(JSON.parse(res));
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    getListUser();
  }, []);

  useEffect(() => {
    const checkAutomaticLogin = async () => {
      let valueAutomatic = JSON.stringify(automaticLogin);
      try {
        await AsyncStorage.setItem('automaticLogin', valueAutomatic);
      } catch (e) {
        // saving error
      }
    };
    checkAutomaticLogin();
  }, [automaticLogin]);

  const login = async () => {
    let user = {username: username, password: password};
    let newArrayUser = [...listUser, user];
    AsyncStorage.setItem('listUser', JSON.stringify(newArrayUser));
    navigation.navigate('HomeScreen');
    AsyncStorage.setItem('token', '123');
    //       AsyncStorage.setItem('listUser', newListUser);
    // try {
    //   await AsyncStorage.multiSet(['listUser', secondPair])
    // } catch(e) {
    //   //save error
    // }
    // try {
    //   let newListUser = JSON.stringify(listUser);
    //   await Post_GetUserToken(username, password, 3)
    //     .then(res => {
    //       //response data
    //       console.log(res);
    //       let newListUser = JSON.stringify(listUser);
    //       AsyncStorage.setItem('listUser', newListUser);
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.eachContainer}>
        <TitleLogin width={150} height={60} />
        <Text style={styles.textContent}>Wellcome to Zziger!</Text>
        <CustomInputText
          styleViewTextInput={[styles.styleViewTextInput, {marginTop: 30}]}
          placeholder={username ? username : 'Username'}
          value={username}
          onChangeText={text => setUsername(text)}
        />
        <CustomInputText
          styleViewTextInput={[styles.styleViewTextInput, {marginTop: 10}]}
          placeholder={password ? password : 'Password'}
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <CustomButton
          styleButton={[
            styles.styleViewButton,
            {
              borderRadius: 10,
              backgroundColor: colors.backgroundButton,
              marginTop: 30,
            },
          ]}
          label={'Login'}
          styleLabel={styles.styleLabel}
          onPress={() => login()}
        />
        <View style={styles.viewRow}>
          <CustomButton
            label={'아이디 찾기'}
            styleLabel={{color: 'black', fontSize: 14}}
            onPress={() => {}}
          />
          <CustomButton
            label={'비밀번호 찾기'}
            styleLabel={{color: 'black', fontSize: 14}}
            onPress={() => {}}
          />
        </View>
        <View style={[{marginTop: 5}, styles.viewRow]}>
          <View style={{width: '40%'}}>
            <BouncyCheckbox
              size={25}
              fillColor={colors.backgroundButton}
              unfillColor="#FFFFFF"
              text="자동 로그인"
              iconStyle={{borderColor: colors.backgroundButton}}
              innerIconStyle={{borderWidth: 2}}
              textStyle={{
                color: automaticLogin ? 'blue' : 'black',
                fontSize: 14,
              }}
              isChecked={automaticLogin}
              onPress={() => setAutomaticLogin(!automaticLogin)}
            />
          </View>
          <Text>or</Text>
          <View
            style={{
              width: '40%',
              height: 2,
              backgroundColor: colors.backgroundInput,
            }}
          />
        </View>
        <View style={styles.viewRow}>
          <CustomButton
            styleButton={styles.styleIconSvg}
            IconSvg={IconFacebook}
          />
          <CustomButton styleButton={styles.styleIconSvg} IconSvg={IconNaver} />
          <CustomButton
            styleButton={styles.styleIconSvg}
            IconSvg={IconKakaotalk}
          />
          <CustomButton
            styleButton={styles.styleIconSvg}
            IconSvg={IconGoogle}
          />
        </View>
        <View style={styles.viewRow}>
          <CustomButton
            styleButton={styles.styleIconSvg}
            IconSvg={IconInstagram}
          />
        </View>
        {!keyBoardIsShow && (
          <CustomButton
            label={'회원가입'}
            styleButton={styles.buttonLogin}
            styleLabel={styles.textLogin}
            onPress={() => navigation.navigate('Register')}
          />
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  eachContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
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
  buttonLogin: {
    height: 50,
    width: 200,
    borderRadius: 10,
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundButtonRed,
  },
  styleIconSvg: {width: 80, height: 50},
  textLogin: {color: 'white', fontSize: 15},
});
export default LoginScreen;
