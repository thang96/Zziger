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
import {uuid} from '../../Utils/uuid';
import {addbackOfCardStore} from '../../Stores/slices/cardSlice';
import CustomAppbar from '../../Components/CustomAppBar';
import CustomCamera from '../../Components/CustomCamera';
import AICameraAPI from '../../Apis/HomeAPI/AICameraAPI/AICameraAPI';
const ViewManuscript = props => {
  const frontCardStore = useSelector(state => state.card.frontCard);
  const backOfCardStoreStore = useSelector(state => state.card.backOfCardStore);
  const shareCardStore = useSelector(state => state.card.shareCard);
  const resource = useSelector(state => state.resource.resourceStore);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isFront, setIsFront] = useState(true);
  const [modalShowImage, setModalShowImage] = useState(false);
  const [modalSelete, setModalSelete] = useState(false);
  const [modalNotify, setModalNotify] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalCamera, setModalCamera] = useState(false);
  const [frontCard, setFrontCard] = useState(null);

  useEffect(() => {
    shareCardStore?.contentUri
      ? setFrontCard(shareCardStore?.contentUri)
      : setFrontCard(frontCardStore?.uri);
  }, []);

  useEffect(() => {
    renderSize();
  }, [resource]);
  const imageWidth = Dimensions.get('window').width - 20;

  const [widthCard, setWidthCard] = useState(0);
  const [heightCard, setHeightCard] = useState(0);
  const [scale, setScale] = useState(0);
  const [backgroundCard, setBackgroundCard] = useState(null);
  const [values, setValues] = useState([]);

  // console.log(resource[0]?.values[0], 'resource');
  const renderSize = () => {
    let widthCard = resource[0]?.background[0]?.width;
    let scales = widthCard / imageWidth;
    if (resource && widthCard) {
      setScale(scales);
      setWidthCard(resource[0]?.background[0]?.width / scales);
      setHeightCard(resource[0]?.background[0]?.height / scales);
      setBackgroundCard(resource[0]?.background[0]?.background);
      setValues(resource[0]?.values);
    }
  };

  const renderFrontCard = () => {
    return (
      <View>
        <View>
          <View style={styles.viewRow}>
            <Text style={styles.title}>Original Template</Text>
            <CustomButton
              title={'선택'}
              styleText={styles.textCustomButton}
              onPress={() => setModalSelete(true)}
            />
          </View>
          <View style={{width: widthCard, height: heightCard}}>
            <Image
              source={{uri: `data:image/png;base64,${frontCardStore}`}}
              style={{width: widthCard, height: heightCard}}
              resizeMode={'cover'}
            />
          </View>
        </View>
        <View>
          <View style={styles.viewRow}>
            <Text style={styles.title}>Suggestion Template</Text>
            <CustomButton
              title={'선택'}
              styleText={styles.textCustomButton}
              onPress={() => setModalSelete(true)}
            />
          </View>
          <View style={{width: widthCard, height: heightCard}}>
            <Image
              source={{uri: `data:image/png;base64,${backgroundCard}`}}
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
                  // console.log(x / scale, y / scale, '----------', text);
                  return (
                    <View key={uuid}>
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
                              fontSize: (font_size / scale) * scaleX,
                              // transform: [{scaleX: scaleX}, {scaleY: scaleY}],
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
    );
  };
  const renderbackOfCardStore = () => {
    return (
      <View>
        <View>
          <View style={styles.viewRow}>
            <Text style={styles.title}>Template</Text>
            <CustomButton
              title={'선택'}
              styleText={styles.textCustomButton}
              onPress={() => setModalSelete(true)}
            />
          </View>
          {backOfCardStoreStore ? (
            <Image
              source={{uri: `data:image/png;base64,${backOfCardStoreStore}`}}
              style={{width: imageWidth, height: imageWidth / 1.8}}
              resizeMode={'cover'}
            />
          ) : (
            <CustomButtonLogo
              source={icons.ic_rotate}
              styleButton={{
                width: imageWidth,
                height: imageWidth / 1.8,
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

  const openGallery = () => {
    setLoading(true);
    ImagePicker.openPicker({})
      .then(async image => {
        const imageConverted1 = await common.resizeImageNotVideo(image);
        await AICameraAPI.CutImageAPI(imageConverted1)
          .then(res => {
            if (res?.status == 200 && res?.data.success == 1) {
              let card_img = res?.data?.card_img;
              dispatch(addbackOfCardStore(card_img));
              setLoading(false);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(e => {
        ImagePicker.clean();
      });
  };
  const getPicture = async resizeImage => {
    setLoading(true);
    await AICameraAPI.CutImageAPI(resizeImage)
      .then(res => {
        if (res?.status == 200 && res?.data.success == 1) {
          let card_img = res?.data?.card_img;
          dispatch(addbackOfCardStore(card_img));
          setLoading(false);
          setModalCamera(false);
        }
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
        setModalCamera(false);
      });
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.viewModal}>
          <CustomLoading
            modalVisible={loading}
            onRequestClose={() => setLoading(false)}
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
        <View>
          <CustomModalShowImage
            source={isFront ? frontCard : backOfCardStore}
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
            fourthTitle={'Rotate'}
            fourthIcon={icons.ic_rotate}
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
            }}
            fourthOnpress={() => {
              setModalShowImage(true);
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
    color: 'black',
  },
  styleModal: {
    backgroundColor: 'rgba(119,119,119,0.7)',
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 9999,
  },
  styleModal: {
    backgroundColor: 'rgba(119,119,119,0.7)',
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 9999,
  },
});
export default ViewManuscript;
