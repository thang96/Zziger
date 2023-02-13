import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Keyboard,
} from 'react-native';
import CustomChangeValue from '../../../../Components/CustomChangeValue';
import CustomTowButtonBottom from '../../../../Components/CustomTowButtonBottom';
import CustomPicker from '../../../../Components/CustomPicker';
import {colors, icons, images} from '../../../../Constants';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {useDispatch} from 'react-redux';
import {updatePaymenInfo} from '../../../../Stores/slices/paymentInfoSlice';
import {useNavigation} from '@react-navigation/native';

const ComponentNormalCard = props => {
  const {} = props;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [paper, setPaper] = useState('일반용지');
  const [size, setSize] = useState('90mm*50mm');
  const [quantity, setQuantity] = useState(1);
  const [rounding, setrounding] = useState(false);

  const [modalPicker, setModalPicker] = useState(false);
  const [listQuantity, setListQuantity] = useState([]);
  useEffect(() => {
    Array.from(new Array(200)).map((_, index) =>
      listQuantity.push({
        label: index + 1,
        value: index + 1,
      }),
    );
  }, []);
  const [keyBoardIsShow, setKeyBoardIsShow] = useState();
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setKeyBoardIsShow(true);
    });
    Keyboard.addListener('keyboardDidHide', () => {
      setKeyBoardIsShow(false);
    });
  }, []);
  return (
    <View style={styles.container}>
      {modalPicker && (
        <CustomPicker
          data={listQuantity}
          value={quantity}
          onPress={value => {
            setQuantity(value);
            setModalPicker(false);
          }}
        />
      )}
      <View style={styles.eachContainer}>
        <ScrollView style={{paddingTop: 20}}>
          <Image
            source={images.im_normal_card}
            style={styles.image}
            resizeMode={'cover'}
          />
          <CustomChangeValue type={'text'} title={'용지'} content={paper} />
          <CustomChangeValue type={'text'} title={'사이즈'} content={size} />
          <CustomChangeValue
            type={'textInput'}
            title={'수량'}
            keyboardType={'numeric'}
            valueInput={`${quantity}`}
            placeholder={quantity ? `${quantity}` : '200'}
            onChangeTextInput={text => setQuantity(text)}
            onPress={() => setModalPicker(true)}
          />
          <View style={styles.viewCheckBox}>
            <Text style={styles.textTitle}>라운딩</Text>
            <BouncyCheckbox
              size={25}
              fillColor={colors.backgroundButton}
              unfillColor="#FFFFFF"
              text="자동 로그인"
              iconStyle={{borderColor: colors.backgroundButton}}
              innerIconStyle={{borderWidth: 2}}
              textStyle={{
                color: rounding ? 'blue' : 'black',
                fontSize: 14,
              }}
              isChecked={rounding}
              onPress={() => setrounding(!rounding)}
            />
          </View>
          <View style={[styles.viewRow, {marginTop: 30}]}>
            <Text style={[styles.textPrice, {width: '30%'}]}>금액</Text>
            <Text style={styles.textPrice}>{`${quantity * 1000} 원`}</Text>
          </View>
          <View style={{height: 50}} />
        </ScrollView>
        {!keyBoardIsShow && (
          <CustomTowButtonBottom
            labelLeft={'이전'}
            labelRight={'다음단계'}
            onPressLeft={() => navigation.navigate('HomeScreen')}
            onPressRight={() => {
              let paymenInfo = {
                paper: paper,
                size: size,
                quantity: quantity,
                rounding: rounding,
              };
              dispatch(updatePaymenInfo(paymenInfo));
              navigation.navigate('CameraDetectScreen');
            }}
          />
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1},
  eachContainer: {flex: 1, paddingHorizontal: 10, paddingTop: 10},
  image: {width: '100%', height: 220, alignSelf: 'center'},
  viewCheckBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    width: '100%',
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textPrice: {fontWeight: 'bold', fontSize: 25, color: colors.backgroundButton},
  textTitle: {fontSize: 18, fontWeight: 'bold', color: 'black', width: '30%'},
});

export default ComponentNormalCard;
