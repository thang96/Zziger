import {useNavigation, useRoute, useIsFocused} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  FlatList,
  Dimensions,
  Modal,
  Alert,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CustomAppbar from '../../../Components/CustomAppBar';
import CustomButton from '../../../Components/CustomButton';
import CustomButtonLogo from '../../../Components/CustomButtonLogo';
import CustomTwoButtonFuntion from '../../../Components/CustomTwoButtonFuntion';
import {useOrientation} from '../../../Hooks/useOrientation';
import {colors, icons, images} from '../../../Constants';
import CustomModaViewManuscriptSelete from '../../../Components/CustomModaViewManuscriptSelete';
import CustomModalChangeColor from '../../../Components/CustomModalChangeColor';
import CustomModalChooseThemeTemplate from '../../../Components/CustomModalChooseThemeTemplate';
import uuid from 'react-native-uuid';
import {
  addValuesFront,
  updateValuesFront,
} from '../../../Stores/slices/cardValuesSlice';
import Orientation from 'react-native-orientation-locker';

const EditTemplate = props => {
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    if (isFocused) {
      setTimeout(() => {
        Orientation.lockToPortrait();
      }, 2000);
      setTimeout(() => {
        renderSize();
        renderSizeBack();
        setLoading(false);
      }, 2500);
    }
  }, [isFocused]);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isFront, setIsFront] = useState(true);
  const backgroundFrontStore = useSelector(
    state => state.cardValues.backgroundFront,
  );
  const valuesFrontStore = useSelector(state => state.cardValues.valuesFront);
  const backgroundBackStore = useSelector(
    state => state.cardValues.backgroundBack,
  );
  const valuesBackStore = useSelector(state => state.cardValues.valuesBack);
  const [modalSelete, setModalSelete] = useState(false);
  const [editable, setEditable] = useState(false);
  const [modalChangeColor, setModalChangeColor] = useState(false);
  const [modalChangeTheme, setModalChangeTheme] = useState(false);
  const [modalChangeValue, setModalChangeValue] = useState(true);
  const [frontCard, setFrontCard] = useState(null);
  const [valueChange, setValueChange] = useState('');

  const [widthCard, setWidthCard] = useState(0);
  const [heightCard, setHeightCard] = useState(0);
  const [scale, setScale] = useState(0);
  const [backgroundCard, setBackgroundCard] = useState(null);
  const [values, setValues] = useState([]);

  const [widthCardBack, setWidthCardBack] = useState(0);
  const [heightCardBack, setHeightCardBack] = useState(0);
  const [scaleBack, setScaleBack] = useState(0);
  const [backgroundCardBack, setBackgroundCardBack] = useState(null);
  const [valuesBack, setValuesBack] = useState([]);
  const renderSize = () => {
    let widthCard = backgroundFrontStore[0]?.width;
    let imageWidth = Dimensions.get('window').width - 20;
    let scales = widthCard / imageWidth;
    if (backgroundFrontStore && widthCard) {
      setScale(scales);
      setWidthCard(backgroundFrontStore[0]?.width / scales);
      setHeightCard(backgroundFrontStore[0]?.height / scales);
      setBackgroundCard(backgroundFrontStore[0]?.background);
      setValues(valuesFrontStore);
    }
  };
  const renderSizeBack = () => {
    let widthCard = backgroundBackStore[0]?.width;
    let imageWidth = Dimensions.get('window').width - 20;
    let scales = widthCard / imageWidth;
    if (backgroundBackStore && widthCard) {
      setScaleBack(scales);
      setWidthCardBack(backgroundBackStore[0]?.width / scales);
      setHeightCardBack(backgroundBackStore[0]?.height / scales);
      setBackgroundCardBack(backgroundBackStore[0]?.background);
      setValuesBack(valuesBackStore);
    }
  };
  return (
    <View style={styles.container}>
      <CustomAppbar
        styleAppBar={{paddingHorizontal: 8}}
        iconLeft={icons.ic_back}
        iconRight2={icons.ic_bell}
        iconRight1={icons.ic_shopping}
        title={'Edit Template'}
        onPressLeftIcon={() => {
          navigation.navigate('EditPositionTemplate');
        }}
      />
      {loading ? (
        <ActivityIndicator color={colors.backgroundButton} size={'large'} />
      ) : (
        <View style={styles.container}>
          <View style={{width: '100%', height: '45%'}}>
            <View style={{paddingHorizontal: 10}}>
              <CustomTwoButtonFuntion
                titleLeft={'Front'}
                titleRight={'Back'}
                styleTwoButton={{height: 40, marginVertical: 20}}
                styleButtonLeft={[
                  {
                    backgroundColor: isFront
                      ? colors.backgroundButton
                      : colors.backgroundInput,
                  },
                  styles.styleButtonLeft,
                ]}
                styleButtonRight={[
                  {
                    backgroundColor: !isFront
                      ? colors.backgroundButton
                      : colors.backgroundInput,
                  },
                  ,
                  styles.styleButtonRight,
                ]}
                onPressLeft={() => setIsFront(true)}
                onPressRight={() => setIsFront(false)}
              />
              {isFront ? (
                <View style={{width: widthCard, height: heightCard}}>
                  <Image
                    source={{uri: `${backgroundCard}`}}
                    style={{
                      width: widthCard,
                      height: heightCard,
                      position: 'absolute',
                    }}
                    resizeMode={'cover'}
                  />
                  {values != [] &&
                    values.map(
                      (
                        {color, type, font_size, x, y, text, scaleX, scaleY},
                        index,
                      ) => {
                        return (
                          <View key={`${uuid.v1()}`}>
                            {type == 'text' ? (
                              <Text
                                style={[
                                  {
                                    color: color,
                                    transform: [
                                      {translateX: x / scale},
                                      {translateY: y / scale},
                                    ],
                                    position: 'absolute',
                                    fontSize: (100 / scale) * scaleX,
                                  },
                                ]}>
                                {text}
                              </Text>
                            ) : null}
                          </View>
                        );
                      },
                    )}
                </View>
              ) : (
                <View style={{width: widthCardBack, height: heightCardBack}}>
                  <Image
                    source={{uri: `${backgroundCardBack}`}}
                    style={{
                      width: widthCardBack,
                      height: heightCardBack,
                      position: 'absolute',
                    }}
                    resizeMode={'cover'}
                  />
                  {valuesBack != [] &&
                    valuesBack.map(
                      (
                        {color, type, font_size, x, y, text, scaleX, scaleY},
                        index,
                      ) => {
                        return (
                          <View key={`${uuid.v1()}`}>
                            {type == 'text' ? (
                              <Text
                                style={[
                                  {
                                    color: color,
                                    transform: [
                                      {translateX: x / scaleBack},
                                      {translateY: y / scaleBack},
                                    ],
                                    position: 'absolute',
                                    fontSize: (100 / scaleBack) * scaleX,
                                  },
                                ]}>
                                {text}
                              </Text>
                            ) : null}
                          </View>
                        );
                      },
                    )}
                </View>
              )}
            </View>
            <CustomModalChangeColor
              modalVisible={modalChangeColor}
              onRequestClose={() => setModalChangeColor(false)}
              closeModal={() => setModalChangeColor(false)}
            />
            <CustomModalChooseThemeTemplate
              modalVisible={modalChangeTheme}
              onRequestClose={() => setModalChangeTheme(false)}
              closeModal={() => setModalChangeTheme(false)}
            />
            <CustomModaViewManuscriptSelete
              titleTop={'Edit'}
              secondIconTop={icons.ic_checkGreen}
              firtTitle={'Background color change'}
              firtIcon={icons.ic_colors}
              secondTitle={'Choose theme template'}
              secondIcon={icons.ic_template}
              thirdTitle={'Change position template'}
              thirdIcon={icons.ic_changePosition}
              modalVisible={modalSelete}
              onRequestClose={() => setModalSelete(false)}
              closeModal={() => setModalSelete(false)}
              firtOnpress={() => {
                setModalSelete(false);
                setModalChangeColor(true);
              }}
              secondOnpress={() => {
                setModalSelete(false);
                setModalChangeTheme(true);
              }}
              thirdOnpress={() => {
                navigation.navigate('EditPositionTemplate');
                setModalSelete(false);
              }}
            />
          </View>
          <View
            style={[styles.eachContainer, {height: '55%', paddingBottom: 40}]}>
            {!modalChangeColor && (
              <View style={{paddingHorizontal: 10}}>
                <View style={styles.viewRow}>
                  <CustomButton
                    title={'ASSIGN DESIGN'}
                    styleButton={styles.styleCustomButton}
                    styleText={styles.styleTextCustomButton}
                  />
                  <CustomButton
                    title={editable == false ? 'Edit text' : 'Save text'}
                    styleButton={styles.styleCustomButton}
                    styleText={styles.styleTextCustomButton}
                    onPress={() =>
                      setEditable(prev => (prev == false ? true : false))
                    }
                  />
                  <CustomButtonLogo
                    source={icons.ic_editModal}
                    styleButton={styles.styleIcon}
                    onPress={() => setModalSelete(true)}
                  />
                </View>
                <ScrollView>
                  {isFront &&
                    values != [] &&
                    values.map(
                      (
                        {color, type, font_size, x, y, text, scaleX, scaleY},
                        index,
                      ) => (
                        <View key={`${uuid.v1()}`}>
                          <InputText
                            editable={editable}
                            text={text}
                            changeValue={textChange => {
                              let itemChange = {
                                color: color,
                                type: type,
                                x: x,
                                y: y,
                                text: textChange,
                                scaleX: scaleX,
                                scaleY: scaleY,
                              };
                              dispatch(updateValuesFront({index, itemChange}));
                            }}
                          />
                        </View>
                      ),
                    )}
                  {!isFront &&
                    valuesBack != [] &&
                    valuesBack.map(
                      (
                        {color, type, font_size, x, y, text, scaleX, scaleY},
                        index,
                      ) => (
                        <View key={`${uuid.v1()}`}>
                          <InputText
                            editable={editable}
                            text={text}
                            changeValue={textChange => {
                              let itemChange = {
                                color: color,
                                type: type,
                                x: x,
                                y: y,
                                text: textChange,
                                scaleX: scaleX,
                                scaleY: scaleY,
                              };
                              dispatch(updateValuesFront({index, itemChange}));
                            }}
                          />
                        </View>
                      ),
                    )}
                </ScrollView>
              </View>
            )}
          </View>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  eachContainer: {
    flex: 1,
    backgroundColor: colors.backgroundInput,
  },
  styleButtonLeft: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  styleButtonRight: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
  },
  styleIcon: {height: 30, width: 30},
  styleCustomButton: {
    height: 40,
    width: 130,
    backgroundColor: colors.backgroundButtonRed,
    borderRadius: 10,
  },
  styleTextCustomButton: {color: 'white', fontSize: 14, fontWeight: 'bold'},
  viewStyle: {
    marginBottom: 10,
  },
  styleCustomTextInput: {
    backgroundColor: 'white',
    borderRadius: 10,
    flex: 1,
    height: 45,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
  },
});
const InputText = props => {
  const {text, changeValue, editable} = props;
  const [textChange, setTextChange] = useState('');
  const endHandleEdit = val => {
    setTextChange(val);
    changeValue(val);
  };
  useEffect(() => {
    setTextChange(text);
  }, []);
  return (
    <View style={styles.viewStyle}>
      <Text style={styles.title}>Title</Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TextInput
          editable={editable}
          onEndEditing={evt => endHandleEdit(evt.nativeEvent.text)}
          style={styles.styleCustomTextInput}
          defaultValue={textChange}
        />
      </View>
    </View>
  );
};

export default EditTemplate;
