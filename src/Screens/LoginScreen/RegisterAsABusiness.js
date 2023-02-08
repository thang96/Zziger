import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  ScrollView,
  Alert,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import IconFacebook from '../../Assets/svgs/ic_facebook.svg';
import IconNaver from '../../Assets/svgs/ic_naver.svg';
import IconKakaotalk from '../../Assets/svgs/ic_kakaotalk.svg';
import IconGoogle from '../../Assets/svgs/ic_google.svg';
import IconInstagram from '../../Assets/svgs/ic_instagram.svg';
import CustomButton from '../../Components/CustomButton';
import CustomInputText from '../../Components/CustomInputText';
import {colors} from '../../Constants';

const RegisterAsABusiness = props => {
  const [userID, setuserID] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyRegistrationNumber, setCompanyRegistrationNumber] =
    useState('');
  const [representativeName, setRepresentativeName] = useState('');
  const [dateOfOpening, setDateOfOpening] = useState('');

  const [collectPersonalInformation, setCollectPersonalInformation] =
    useState(false);

  const joinMember = async () => {
    if (!collectPersonalInformation) {
      return Alert.alert('이용약관, 개인정보 수집에 동의해주세요');
    }
    console.log('okkkkkkk');
  };
  return (
    <View style={styles.container}>
      <ScrollView style={{flex: 1, paddingHorizontal: 10}}>
        <CustomInputText
          styleViewTextInput={[styles.styleViewTextInput, {marginTop: 30}]}
          placeholder={userID ? userID : '아이디'}
          value={userID}
          onChangeText={text => setuserID(text)}
        />
        <CustomInputText
          styleViewTextInput={[styles.styleViewTextInput, {marginTop: 20}]}
          placeholder={password ? password : '비밀번호'}
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <CustomInputText
          styleViewTextInput={[styles.styleViewTextInput, {marginTop: 20}]}
          placeholder={rePassword ? rePassword : '비밀번호 확인'}
          value={rePassword}
          onChangeText={text => setRePassword(text)}
        />
        <CustomInputText
          styleViewTextInput={[styles.styleViewTextInput, {marginTop: 20}]}
          placeholder={userName ? userName : '이름'}
          value={userName}
          onChangeText={text => setUserName(text)}
        />
        <CustomInputText
          styleViewTextInput={[styles.styleViewTextInput, {marginTop: 20}]}
          placeholder={phoneNumber ? phoneNumber : '전화번호'}
          value={phoneNumber}
          onChangeText={text => setPhoneNumber(text)}
        />
        <CustomInputText
          styleViewTextInput={[styles.styleViewTextInput, {marginTop: 20}]}
          placeholder={companyName ? companyName : '회사명'}
          value={companyName}
          onChangeText={text => setCompanyName(text)}
        />
        <CustomInputText
          styleViewTextInput={[styles.styleViewTextInput, {marginTop: 20}]}
          placeholder={
            companyRegistrationNumber
              ? companyRegistrationNumber
              : '사업자등록번호'
          }
          value={companyRegistrationNumber}
          onChangeText={text => setCompanyRegistrationNumber(text)}
        />
        <CustomInputText
          styleViewTextInput={[styles.styleViewTextInput, {marginTop: 20}]}
          placeholder={representativeName ? representativeName : '대표자명'}
          value={representativeName}
          onChangeText={text => setRepresentativeName(text)}
        />
        <CustomInputText
          styleViewTextInput={[styles.styleViewTextInput, {marginTop: 20}]}
          placeholder={dateOfOpening ? dateOfOpening : '개업연월일'}
          value={dateOfOpening}
          onChangeText={text => setDateOfOpening(text)}
        />
        <View style={{marginTop: 20}}>
          <BouncyCheckbox
            size={25}
            fillColor={colors.backgroundButton}
            unfillColor="#FFFFFF"
            text="이용약관, 개인정보 수집 동의"
            iconStyle={{borderColor: colors.backgroundButton}}
            innerIconStyle={{borderWidth: 2}}
            textStyle={{
              color: collectPersonalInformation ? 'blue' : 'black',
              fontSize: 14,
            }}
            isChecked={collectPersonalInformation}
            onPress={() =>
              setCollectPersonalInformation(!collectPersonalInformation)
            }
          />
        </View>
        <CustomButton
          label={'회원가입'}
          styleLabel={styles.textRegister}
          styleButton={styles.buttonRegister}
          onPress={joinMember}
        />
        <Text style={styles.textOtherRegister}>간편 회원 가입</Text>
        <View style={styles.viewRow}>
          <CustomButton
            IconSvg={IconFacebook}
            iconSvgStyle={styles.styleIconSvg}
          />
          <CustomButton
            IconSvg={IconNaver}
            iconSvgStyle={styles.styleIconSvg}
          />
          <CustomButton
            IconSvg={IconKakaotalk}
            iconSvgStyle={styles.styleIconSvg}
          />
          <CustomButton
            IconSvg={IconGoogle}
            iconSvgStyle={styles.styleIconSvg}
          />
          <CustomButton
            IconSvg={IconInstagram}
            iconSvgStyle={styles.styleIconSvg}
          />
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  styleViewTextInput: {
    width: '90%',
    height: 60,
    borderRadius: 10,
    backgroundColor: colors.backgroundInput,
    alignSelf: 'center',
  },
  buttonRegister: {
    backgroundColor: colors.backgroundButton,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 30,
  },
  textRegister: {color: 'white', fontSize: 16, fontWeight: 'bold'},
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  styleIconSvg: {width: 60, height: 60},
  textOtherRegister: {color: 'grey', alignSelf: 'center', marginTop: 40},
});
export default RegisterAsABusiness;
