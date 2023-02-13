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
import CustomCheckBox from '../../../../Components/CustomCheckBox';
import {icons, images} from '../../../../Constants';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {updatePaymenInfo} from '../../../../Stores/slices/paymentInfoSlice';

const ComponentOtherCard = props => {
  const {} = props;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [item, setItem] = useState('명함');
  const [paper, setPaper] = useState('반누보화이트');
  const [printFrequency, setPrintFrequency] = useState('양면칼라');
  const [quantity, setQuantity] = useState(1);
  const [designEdit, setDesignEdit] = useState(false);
  const [createHardCorners, setCreateHardCorners] = useState(false);
  const [sewingMachine, setSewingMachine] = useState(false);
  const [silverPaper, setSilverPaper] = useState(false);
  const [molds, setMolds] = useState(false);
  const [numbering, setNumbering] = useState(false);
  const [photoCut, setPhotoCut] = useState(false);
  const [punchAHole, setPunchAHole] = useState(false);
  const [roundCorners, setRoundCorners] = useState(false);
  const [epoxy, setEpoxy] = useState(false);

  const [modalPickerItem, setModalPickerItem] = useState(false);
  const [modalPickerPaper, setModalPickerPaper] = useState(false);
  const [modalPickerPrint, setModalPickerPrint] = useState(false);
  const [modalQuantity, setModalQuantity] = useState(false);

  const [keyBoardIsShow, setKeyBoardIsShow] = useState();
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setKeyBoardIsShow(true);
    });
    Keyboard.addListener('keyboardDidHide', () => {
      setKeyBoardIsShow(false);
    });
  }, []);

  const updatePayment = () => {
    {
      let paymenInfo = {
        item: item,
        paper: paper,
        printFrequency: printFrequency,
        quantity: quantity,
        designEdit: designEdit,
        createHardCorners: createHardCorners,
        sewingMachine: sewingMachine,
        silverPaper: silverPaper,
        molds: molds,
        numbering: numbering,
        photoCut: photoCut,
        punchAHole: punchAHole,
        roundCorners: roundCorners,
        epoxy: epoxy,
      };
      dispatch(updatePaymenInfo(paymenInfo));
      navigation.navigate('CameraDetectScreen');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.eachContainer}>
        <ScrollView style={{paddingTop: 20}}>
          <Image
            source={images.im_normal_card}
            style={styles.image}
            resizeMode={'cover'}
          />
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
            <Text style={styles.textTitleCheckBox}>후가공</Text>
            <View style={{width: '75%'}}>
              <View
                style={[styles.viewCheck, {justifyContent: 'space-between'}]}>
                <CustomCheckBox
                  titleLeft={'오시'}
                  value={createHardCorners}
                  onPress={() => setCreateHardCorners(!createHardCorners)}
                />
                <CustomCheckBox
                  titleLeft={'미싱'}
                  value={sewingMachine}
                  onPress={() => setSewingMachine(!sewingMachine)}
                />
                <CustomCheckBox
                  titleLeft={'박'}
                  value={silverPaper}
                  onPress={() => setSilverPaper(!silverPaper)}
                />
              </View>
              <View
                style={[styles.viewCheck, {justifyContent: 'space-between'}]}>
                <CustomCheckBox
                  titleLeft={'형압'}
                  value={molds}
                  onPress={() => setMolds(!molds)}
                />
                <CustomCheckBox
                  titleLeft={'넘버링'}
                  value={numbering}
                  onPress={() => setNumbering(!numbering)}
                />
                <CustomCheckBox
                  titleLeft={'도무송'}
                  value={photoCut}
                  onPress={() => setPhotoCut(!photoCut)}
                />
              </View>
              <View
                style={[styles.viewCheck, {justifyContent: 'space-between'}]}>
                <CustomCheckBox
                  titleLeft={'타공'}
                  value={punchAHole}
                  onPress={() => setPunchAHole(!punchAHole)}
                />
                <CustomCheckBox
                  titleLeft={'귀도리'}
                  value={roundCorners}
                  onPress={() => setRoundCorners(!roundCorners)}
                />
                <CustomCheckBox
                  titleLeft={'에폭시'}
                  value={epoxy}
                  onPress={() => setEpoxy(!epoxy)}
                />
              </View>
            </View>
          </View>
          <View style={{height: 50}} />
        </ScrollView>
        {!keyBoardIsShow && (
          <CustomTowButtonBottom
            labelLeft={'이전'}
            labelRight={'다음단계'}
            onPressLeft={() => navigation.navigate('HomeScreen')}
            onPressRight={() => updatePayment()}
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
  textTitle: {fontSize: 18, fontWeight: 'bold', color: 'black', width: '30%'},
  textTitleCheckBox: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    width: '25%',
  },
  viewCheck: {
    flexDirection: 'row',
    height: 50,
    width: '100%',
    alignItems: 'center',
  },
});

export default ComponentOtherCard;
