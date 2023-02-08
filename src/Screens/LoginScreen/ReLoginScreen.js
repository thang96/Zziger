import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import TitleReLogin from '../../Assets/svgs/TitleReLogin.svg';
import {colors, icons} from '../../Constants';
import CustomButton from '../../Components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {uuidUtils} from '../../Utils/uuid';

const ReLoginScreen = () => {
  const navigation = useNavigation();
  const [listUser, setListUser] = useState([]);
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

  const reLogin = async () => {
    await AsyncStorage.setItem('token', '123')
      .then(() => {
        navigation.navigate('HomeScreen');
      })
      .catch(error => console.log(error));
  };

  return (
    <View style={styles.container}>
      <View style={styles.eachContainer}>
        <TitleReLogin width={150} height={60} />
        <View style={{width: '100%', maxHeight: 300}}>
          <ScrollView>
            {listUser.map(item => {
              return (
                <View key={uuidUtils}>
                  <CustomButtonRelogin
                    onPressButton={() => reLogin()}
                    key={item?.ic_user}
                    source={icons.ic_user}
                    label={`${item?.username}`}
                  />
                </View>
              );
            })}
          </ScrollView>
        </View>
        <CustomButtonRelogin
          styleButton={{marginTop: 15}}
          source={icons.ic_user}
          label={'다른 계정으로 로그인하기'}
          onPressButton={() => {
            navigation.navigate('LoginScreen');
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  eachContainer: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    backgroundColor: 'white',
    flex: 1,
  },
});
const CustomButtonRelogin = props => {
  const {
    source,
    sourceDelete,
    label,
    styleButton,
    onPressButton,
    onPressButtonDelete,
  } = props;
  return (
    <TouchableOpacity
      onPress={onPressButton}
      style={[stylesButtonRelogin.button, styleButton]}>
      <Image
        source={source}
        style={{width: 45, height: 45, marginHorizontal: 5}}
        resizeMode={'contain'}
      />
      <Text style={{color: 'black', fontSize: 14, flex: 1}}>{label}</Text>
      {sourceDelete && (
        <CustomButton
          source={icons.ic_close}
          styleImage={stylesButtonRelogin.buttonDelete}
          styleButton={{position: 'absolute', top: 5, right: 5}}
          onPress={onPressButtonDelete}
        />
      )}
    </TouchableOpacity>
  );
};
const stylesButtonRelogin = StyleSheet.create({
  button: {
    width: '100%',
    height: 70,
    backgroundColor: colors.backgroundInput,
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    marginTop: 5,
  },
  buttonDelete: {width: 30, height: 30},
});
export default ReLoginScreen;
