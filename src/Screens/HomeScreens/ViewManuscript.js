import {useNavigation, useRoute} from '@react-navigation/native';
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
  ImageBackground,
  TextInput,
} from 'react-native';
import {icons, colors, images} from '../../Constants';
import CustomButtonLogo from '../../Components/CustomButtonLogo';
import CustomButton from '../../Components/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import CustomModalShowImage from '../../Components/CustomModalShowImage';
import CustomTwoButtonFuntion from '../../Components/CustomTwoButtonFuntion';
import CustomModaViewManuscriptSelete from '../../Components/CustomModaViewManuscriptSelete';
import CustomModalNotification from '../../Components/CustomModalNotification';
import CustomModalCamera from '../../Components/CustomModalCamera';
import ImagePicker from 'react-native-image-crop-picker';
import CustomLoading from '../../Components/CustomLoading';
import common from '../../Utils/common';
import uuid from 'react-native-uuid';
import CustomAppbar from '../../Components/CustomAppBar';
import CustomCamera from '../../Components/CustomCamera';
import AICameraAPI from '../../Apis/HomeAPI/AICameraAPI/AICameraAPI';
import {
  addBackgroundBack,
  addValuesBack,
  addBackOfCard,
  addValuesFront,
  addFrontCard,
  addBackgroundFront,
} from '../../Stores/slices/cardValuesSlice';
import rnTextSize, {TSFontSpecs} from 'react-native-text-size';
import CustomTwoBottomButtonFuntion from '../../Components/CustomTwoBottomButtonFuntion';
import Orientation, {
  useDeviceOrientationChange,
  useOrientationChange,
} from 'react-native-orientation-locker';
import CustomModalShowImageRender from '../../Components/CustomModalShowImageRender';
const ViewManuscript = props => {
  const frontCardStore = useSelector(state => state.cardValues.frontCard);
  const backgroundFrontStore = useSelector(
    state => state.cardValues.backgroundFront,
  );
  const valuesFrontStore = useSelector(state => state.cardValues.valuesFront);
  const backOfCardStore = useSelector(state => state.cardValues.backOfCard);
  const backgroundBackStore = useSelector(
    state => state.cardValues.backgroundBack,
  );
  const valuesBackStore = useSelector(state => state.cardValues.valuesBack);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isFront, setIsFront] = useState(true);
  const [modalShowImage, setModalShowImage] = useState(false);
  const [modalSelete, setModalSelete] = useState(false);
  const [modalNotify, setModalNotify] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [getValue, setGetValue] = useState(false);
  const [modalCamera, setModalCamera] = useState(false);

  const [orientation, setOrientation] = useState(true);

  useEffect(() => {
    renderSizeFront();
    renderSizeBack();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [
    backgroundFrontStore,
    valuesFrontStore,
    valuesBackStore,
    backgroundBackStore,
    orientation,
    loading,
    getValue,
  ]);

  useEffect(() => {
    Orientation.unlockAllOrientations();

    Dimensions.addEventListener('change', ({window: {width, height}}) => {
      if (width < height) {
        setOrientation(true);
        setModalShowImage(false);
      } else {
        setOrientation(false);
        setModalShowImage(true);
      }
    });
  }, [orientation]);
  const imageWidth = Dimensions.get('window').width - 20;

  const [widthCard, setWidthCard] = useState(0);
  const [heightCard, setHeightCard] = useState(0);
  const [scale, setScale] = useState(0);
  const [backgroundFrontCard, setBackgroundFrontCard] = useState(null);
  const [valuesFront, setValuesFront] = useState([]);

  const [widthCardBack, setWidthCardBack] = useState(0);
  const [heightCardBack, setHeightCardBack] = useState(0);
  const [scaleBack, setScaleBack] = useState(0);
  const [backgroundBackCard, setBackgroundBackCard] = useState(null);
  const [valuesBack, setValuesBack] = useState([]);

  const renderSizeFront = () => {
    let widthCard = backgroundFrontStore[0]?.width;
    let scales = widthCard / imageWidth;
    if (backgroundFrontStore && valuesFrontStore) {
      setScale(scales);
      setWidthCard(backgroundFrontStore[0]?.width / scales);
      setHeightCard(backgroundFrontStore[0]?.height / scales);
      setBackgroundFrontCard(backgroundFrontStore[0]?.background);
      setValuesFront(valuesFrontStore);
    }
  };
  const renderSizeBack = () => {
    let widthCardBack = backgroundBackStore[0]?.width;
    let scales = widthCardBack / imageWidth;
    if (backgroundBackStore && valuesBackStore) {
      setScaleBack(scales);
      setWidthCardBack(backgroundBackStore[0]?.width / scales);
      setHeightCardBack(backgroundBackStore[0]?.height / scales);
      setBackgroundBackCard(backgroundBackStore[0]?.background);
      setValuesBack(valuesBackStore);
    }
  };
  const renderFrontCard = () => {
    return (
      <View>
        {backgroundFrontCard && (
          <View>
            <View>
              <View style={styles.viewRow}>
                <CustomButton
                  styleButton={styles.styleButton}
                  title={'??????'}
                  styleText={styles.textCustomButton}
                  onPress={() => setModalSelete(true)}
                />
              </View>
              <View style={{width: widthCard, height: heightCard}}>
                <Image
                  source={{uri: `${frontCardStore}`}}
                  style={{width: widthCard, height: heightCard}}
                  resizeMode={'cover'}
                />
              </View>
            </View>
            <View>
              <View style={{height: 50}}></View>
              <View style={{width: widthCard, height: heightCard}}>
                <Image
                  source={{uri: `${backgroundFrontCard}`}}
                  style={{
                    width: widthCard,
                    height: heightCard,
                    position: 'absolute',
                    tintColor: backgroundFrontStore[0]?.tintColor,
                  }}
                  resizeMode={'cover'}
                />
                {valuesFront != [] &&
                  valuesFront.map(
                    (
                      {color, type, font_size, x, y, text, scaleX, scaleY},
                      index,
                    ) => {
                      return (
                        <View key={`${uuid.v1()}`}>
                          {type == 'text' ? (
                            <View
                              style={[
                                {
                                  position: 'absolute',
                                  transform: [
                                    {translateX: x / scale},
                                    {translateY: y / scale},
                                  ],
                                },
                              ]}>
                              <Text
                                style={[
                                  {
                                    fontSize: (100 / scale) * scaleX,
                                    color: color,
                                  },
                                ]}>
                                {text}
                              </Text>
                            </View>
                          ) : null}
                        </View>
                      );
                    },
                  )}
              </View>
            </View>
          </View>
        )}
      </View>
    );
  };
  const renderbackOfCardStore = () => {
    return (
      <View>
        <View>
          {backgroundBackCard ? (
            <View>
              <View>
                <View style={styles.viewRow}>
                  <CustomButton
                    styleButton={styles.styleButton}
                    title={'??????'}
                    styleText={styles.textCustomButton}
                    onPress={() => setModalSelete(true)}
                  />
                </View>
                <View style={{width: widthCard, height: heightCard}}>
                  <Image
                    source={{
                      uri: `${backOfCardStore}`,
                    }}
                    style={{width: widthCard, height: heightCard}}
                    resizeMode={'cover'}
                  />
                </View>
              </View>
              <View>
                <View style={{height: 50}}></View>
                <View style={{width: widthCardBack, height: heightCardBack}}>
                  <Image
                    source={{uri: `${backgroundBackCard}`}}
                    style={{
                      width: widthCardBack,
                      height: heightCardBack,
                      position: 'absolute',
                      tintColor: backgroundBackStore[0]?.tintColor,
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
                            <View
                              style={[
                                {
                                  position: 'absolute',
                                  transform: [
                                    {translateX: x / scaleBack},
                                    {translateY: y / scaleBack},
                                  ],
                                },
                              ]}>
                              <Text
                                style={[
                                  {
                                    fontSize: (font_size / scaleBack) * scaleX,
                                    color: color,
                                  },
                                ]}>
                                {text}
                              </Text>
                            </View>
                          </View>
                        );
                      },
                    )}
                </View>
              </View>
            </View>
          ) : (
            <CustomButtonLogo
              source={icons.ic_rotate}
              styleButton={{
                width: widthCard,
                height: heightCard,
                backgroundColor: 'rgb(248,253,255)',
              }}
              onPress={() =>
                setModalVisible(prev => (prev == false ? true : false))
              }
            />
          )}
        </View>
      </View>
    );
  };
  const fontSpecs = {
    fontFamily: undefined,
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 'normal',
  };
  const addBackgroundCard = async card_img => {
    const widthWindow = Dimensions.get('window').width * 0.9;
    await AICameraAPI.DetailImageAPI(card_img)
      .then(async res => {
        if (res?.status == 200) {
          let background = [
            {
              background: `data:image/png;base64,${res?.data?.namecard_info?.background[0]?.background}`,
              width: res?.data?.namecard_info?.background[0]?.width,
              height: res?.data?.namecard_info?.background[0]?.height,
              tintColor: 'rgba(0,0,0,0)',
            },
          ];
          isFront
            ? dispatch(addBackgroundFront(background))
            : dispatch(addBackgroundBack(background));
          let eachValue = [];
          let listValues = res?.data?.namecard_info?.values;
          for (let item = 0; item < listValues.length; item++) {
            const element = listValues[item];
            let text = element?.text;
            const size = await rnTextSize.measure({
              text,
              widthWindow,
              ...fontSpecs,
            });
            eachValue.push({
              ...element,
              rotate: 0,
              width: size?.width,
              height: size?.height,
            });
          }
          isFront
            ? dispatch(addValuesFront(eachValue))
            : dispatch(addValuesBack(eachValue));
          renderSizeBack();
          setModalCamera(false);
          setGetValue(false);
        }
      })
      .catch(function (error) {
        console.log(error);
        setGetValue(false);
        setModalCamera(false);
      });
  };
  const openGallery = () => {
    setGetValue(true);
    ImagePicker.openPicker({})
      .then(async image => {
        const imageConverted1 = await common.resizeImageNotVideo(image);
        await AICameraAPI.CutImageAPI(imageConverted1)
          .then(async res => {
            if (res?.status == 200 && res?.data.success == 1) {
              let card_img = res?.data?.card_img;
              isFront
                ? dispatch(addFrontCard(`data:image/png;base64,${card_img}`))
                : dispatch(addBackOfCard(`data:image/png;base64,${card_img}`));
              addBackgroundCard(card_img);
            }
          })
          .catch(function (error) {
            console.log(error);
            setGetValue(false);
            setModalCamera(false);
          });
      })
      .catch(function (error) {
        ImagePicker.clean();
        setGetValue(false);
        setModalCamera(false);
      });
  };
  const getPicture = async resizeImage => {
    setGetValue(true);
    await AICameraAPI.CutImageAPI(resizeImage)
      .then(res => {
        if (res?.status == 200 && res?.data.success == 1) {
          let card_img = res?.data?.card_img;
          addValueImage(card_img);
          addBackgroundCard(card_img);
          setModalCamera(false);
        }
      })
      .catch(function (error) {
        console.log(error);
        setGetValue(false);
        setModalCamera(false);
      });
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.styleModal}>
          <CustomLoading
            modalVisible={loading}
            onRequestClose={() => setLoading(false)}
          />
        </View>
      )}
      {getValue && (
        <View style={styles.styleModal}>
          <CustomLoading
            modalVisible={getValue}
            onRequestClose={() => setGetValue(false)}
          />
        </View>
      )}
      {modalCamera && (
        <View style={styles.styleModal}>
          <CustomCamera
            getPicture={image => getPicture(image)}
            cancel={() => setModalCamera(false)}
          />
        </View>
      )}
      {modalVisible && (
        <View style={styles.styleModal}>
          <CustomModalCamera
            openCamera={() => {
              setModalCamera(true);
              setModalVisible(false);
            }}
            selectGallery={() => {
              openGallery();
              setModalVisible(false);
            }}
            modalVisible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
            }}
            cancel={() =>
              setModalVisible(prev => (prev == false ? true : false))
            }
          />
        </View>
      )}
      {modalNotify && (
        <View style={styles.styleModal}>
          <CustomModalNotification
            source={icons.ic_happy}
            title={'Thank you for your order'}
            content={'by clicking the pay button,\nyou agree to our items'}
            titleButton={'PAYMENT'}
            modalVisible={modalNotify}
            onRequestClose={() => setModalNotify(false)}
            onPress={() => {
              setModalNotify(false);
              navigation.navigate('OrdersScreen');
            }}
          />
        </View>
      )}
      {modalShowImage && (
        <View style={styles.viewModal}>
          <CustomModalShowImageRender
            isShow={modalShowImage}
            isFront={isFront}
            modalVisible={modalShowImage}
            onRequestClose={() => {
              setModalShowImage(false);
            }}
            onPress={() => setModalShowImage(false)}
          />
        </View>
      )}
      {modalSelete && (
        <View style={styles.styleModal}>
          <CustomModaViewManuscriptSelete
            firtTitle={'Oder'}
            firtIcon={icons.ic_shoppingModal}
            secondTitle={'Edit'}
            secondIcon={icons.ic_editModal}
            iconTop={icons.ic_order}
            thirdTitle={'Record images'}
            thirdIcon={icons.ic_cameraModal}
            secondIconTop={icons.ic_checkGreen}
            fivethTitle={'Edit in PC'}
            fivethIcon={icons.ic_editPC}
            modalVisible={modalSelete}
            onRequestClose={() => setModalSelete(false)}
            closeModal={() => setModalSelete(false)}
            firtOnpress={() => {
              setModalSelete(false);
              setModalNotify(true);
            }}
            secondOnpress={() => {
              setModalSelete(false);
              navigation.navigate('EditTemplate');
            }}
            thirdOnpress={() => {
              setModalSelete(false);
              setModalVisible(true);
            }}
            fiveOnpress={() => {
              setModalSelete(false);
            }}
          />
        </View>
      )}

      <CustomAppbar
        styleAppBar={{paddingHorizontal: 8, marginBottom: 20}}
        iconLeft={icons.ic_back}
        iconRight2={icons.ic_bell}
        iconRight1={icons.ic_shopping}
        title={'View Manuscript'}
        onPressLeftIcon={() => navigation.goBack()}
      />
      <ScrollView style={styles.eachContainer}>
        <CustomTwoButtonFuntion
          titleLeft={'Front'}
          titleRight={'Back'}
          styleTwoButton={{height: 40}}
          styleTextLeft={{
            color: isFront ? 'white' : 'grey',
          }}
          styleTextRight={{
            color: !isFront ? 'white' : 'grey',
          }}
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

        {isFront && renderFrontCard()}
        {!isFront && renderbackOfCardStore()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(255,255,255)',
  },
  eachContainer: {
    flex: 1,
    paddingHorizontal: 10,
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
  title: {
    color: 'black',
    fontWeight: '900',
    fontSize: 16,
  },
  textCustomButton: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
  styleButton: {
    height: 35,
    backgroundColor: 'rgba(237,125,49,255)',
    width: 70,
    borderRadius: 10,
  },
  styleModal: {
    backgroundColor: 'rgba(119,119,119,0.7)',
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 9999,
  },
  viewModal: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgb(0,0,0)',
    // backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 9999,
    position: 'absolute',
  },
});
export default ViewManuscript;
