import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import CustomChangeValue from '../../../../Components/CustomChangeValue';
import CustomCheckBox from '../../../../Components/CustomCheckBox';
import {icons, images} from '../../../../Constants';

const ComponentOtherCard = props => {
  const {} = props;
  const [item, setItem] = useState('명함');
  const [paper, setPaper] = useState('반누보화이트');
  const [printFrequency, setPrintFrequency] = useState('양면칼라');
  const [quantity, setQuantity] = useState(1);
  const [designEdit, setDesignEdit] = useState(false);

  const [modalPickerItem, setModalPickerItem] = useState(false);
  const [modalPickerPaper, setModalPickerPaper] = useState(false);
  const [modalPickerPrint, setModalPickerPrint] = useState(false);
  const [modalQuantity, setModalQuantity] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.eachContainer}>
        <Image
          source={images.im_normal_card}
          style={styles.image}
          resizeMode={'cover'}
        />
        <ScrollView style={{paddingTop: 20}}>
          <CustomChangeValue
            type={'textInput'}
            title={'품목'}
            keyboardType={'numeric'}
            valueInput={`${item}`}
            placeholder={item ? `${item}` : '200'}
            onChangeTextInput={text => setItem(text)}
            onPress={() => setModalPickerItem(true)}
          />
          <CustomChangeValue
            type={'textInput'}
            title={'용지'}
            keyboardType={'numeric'}
            valueInput={`${paper}`}
            placeholder={paper ? `${paper}` : '200'}
            onChangeTextInput={text => setPaper(text)}
            onPress={() => setModalPickerItem(true)}
          />
          <CustomChangeValue
            type={'textInput'}
            title={'인쇄도수'}
            keyboardType={'numeric'}
            valueInput={`${printFrequency}`}
            placeholder={printFrequency ? `${printFrequency}` : '200'}
            onChangeTextInput={text => setPrintFrequency(text)}
            onPress={() => setModalPickerItem(true)}
          />
          <CustomChangeValue
            type={'textInput'}
            title={'인쇄도수'}
            keyboardType={'numeric'}
            valueInput={`${printFrequency}`}
            placeholder={printFrequency ? `${printFrequency}` : '200'}
            onChangeTextInput={text => setPrintFrequency(text)}
            onPress={() => setModalPickerItem(true)}
          />
          <CustomChangeValue
            type={'textInput'}
            title={'수량'}
            keyboardType={'numeric'}
            valueInput={`${quantity}`}
            placeholder={quantity ? `${quantity}` : '200'}
            onChangeTextInput={text => setQuantity(text)}
            onPress={() => setModalPickerItem(true)}
          />
          <View style={styles.viewCheck}>
            <Text style={styles.textTitle}>디자인편집</Text>
            <CustomCheckBox
              viewCheckBox={{marginRight: 50}}
              titleLeft={'무'}
              value={!designEdit}
              onPress={() => setDesignEdit(false)}
            />
            <CustomCheckBox
              titleLeft={'유'}
              value={designEdit}
              onPress={() => setDesignEdit(true)}
            />
          </View>
          <View style={{width: '100%', flexDirection: 'row'}}>
            <Text style={styles.textTitle}>후가공</Text>
            <View style={{width: '70%', height: 50}}>
              <View style={[styles.viewCheck]}>
                <CustomCheckBox
                  viewCheckBox={{width: '30%'}}
                  titleLeft={'무'}
                  value={!designEdit}
                  onPress={() => setDesignEdit(false)}
                />
                <CustomCheckBox
                  viewCheckBox={{width: '30%'}}
                  titleLeft={'유'}
                  value={designEdit}
                  onPress={() => setDesignEdit(true)}
                />
                <CustomCheckBox
                  viewCheckBox={{width: '30%'}}
                  titleLeft={'유'}
                  value={designEdit}
                  onPress={() => setDesignEdit(true)}
                />
              </View>
            </View>
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
  textTitle: {fontSize: 18, fontWeight: 'bold', color: 'black', width: '30%'},
  viewCheck: {
    flexDirection: 'row',
    height: 50,
    width: '100%',
    alignItems: 'center',
  },
});

export default ComponentOtherCard;
