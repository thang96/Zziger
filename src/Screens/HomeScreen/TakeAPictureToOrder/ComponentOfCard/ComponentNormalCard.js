import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import CustomChangeValue from '../../../../Components/CustomChangeValue';
import CustomPicker from '../../../../Components/CustomPicker';
import {colors, icons, images} from '../../../../Constants';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const ComponentNormalCard = props => {
  const {} = props;

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
        <Image
          source={images.im_normal_card}
          style={styles.image}
          resizeMode={'cover'}
        />
        <ScrollView style={{paddingTop: 20}}>
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
        </ScrollView>
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
