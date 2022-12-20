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
  ActivityIndicator,
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
  addFrontCard,
  addBackgroundFront,
  addValuesFront,
} from '../../Stores/slices/cardValuesSlice';
import rnTextSize, {TSFontSpecs} from 'react-native-text-size';
import CustomTwoBottomButtonFuntion from '../../Components/CustomTwoBottomButtonFuntion';
import Orientation from 'react-native-orientation-locker';
import CustomModalShowImageRender from '../../Components/CustomModalShowImageRender';
const UploadFile = props => {
  const frontCardStore = useSelector(state => state.cardValues.frontCard);
  const backOfCardStore = useSelector(state => state.cardValues.backOfCard);
  const imageWidth = Dimensions.get('window').width * 0.9;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [isFront, setIsFront] = useState(true);
  const [isShow, setIsShow] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalCamera, setModalCamera] = useState(false);
  const [sendImage, setSendImage] = useState(false);
  const [isRotateLeft, setisRotateLeft] = useState(false);
  const [isRotateRight, setisRotateRight] = useState(false);
  const [rotateLeft, setRotateLeft] = useState(360);
  const [rotateRight, setRotateRight] = useState(360);
  const [imageSizeLeft, setImageSizeLeft] = useState({width: 0, height: 0});
  const [imageSizeRight, setImageSizeRight] = useState({width: 0, height: 0});

  useEffect(() => {
    setSizeLeft();
  }, [isRotateLeft, orientation]);

  const setSizeLeft = () => {
    isRotateLeft
      ? setImageSizeLeft({
          width: imageWidth + 100,
          height: (imageWidth + 100) / 1.8,
        })
      : setImageSizeLeft({
          width: imageWidth,
          height: imageWidth / 1.8,
        });
  };
  useEffect(() => {
    setSizeRight();
  }, [isRotateRight]);
  const setSizeRight = () => {
    isRotateRight
      ? setImageSizeRight({
          width: imageWidth + 100,
          height: (imageWidth + 100) / 1.8,
        })
      : setImageSizeRight({
          width: imageWidth,
          height: imageWidth / 1.8,
        });
  };

  const renderFrontCard = () => {
    return (
      <View
        style={{
          justifyContent: isRotateLeft ? 'center' : 'flex-start',
          flex: 1,
          alignItems: 'center',
        }}>
        {frontCardStore ? (
          <TouchableOpacity
            style={{
              width: imageSizeLeft.width,
              height: imageSizeLeft.height,
            }}
            onPress={() => setModalVisible(true)}>
            <Image
              source={{uri: `${frontCardStore}`}}
              style={{
                width: imageSizeLeft.width,
                height: imageSizeLeft.height,
                transform: [{rotate: `${rotateLeft}deg`}],
              }}
              resizeMode={'cover'}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{marginTop: 30, alignSelf: 'center'}}>
            <Image
              source={icons.ic_rotate}
              style={{width: imageWidth, height: imageWidth / 1.8}}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  };
  const renderbackOfCardStore = () => {
    return (
      <View
        style={{
          justifyContent: isRotateRight ? 'center' : 'flex-start',
          flex: 1,
          alignItems: 'center',
        }}>
        {backOfCardStore ? (
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image
              source={{uri: `${backOfCardStore}`}}
              style={{
                width: imageSizeRight.width,
                height: imageSizeRight.height,
                transform: [{rotate: `${rotateRight}deg`}],
              }}
              resizeMode={'cover'}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{marginTop: 30, alignSelf: 'center'}}>
            <Image
              source={icons.ic_rotate}
              style={{width: imageWidth, height: imageWidth / 1.8}}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const openGallery = () => {
    setLoading(true);
    ImagePicker.openPicker({})
      .then(async image => {
        const imageConverted1 = await common.resizeImageNotVideo(image);
        await AICameraAPI.CutImageAPI(imageConverted1)
          .then(async res => {
            if (res?.status == 200 && res?.data.success == 1) {
              let card_img = res?.data?.card_img;
              addValueImage(card_img);
              addBackgroundFrontCard(card_img);
              setLoading(false);
            }
          })
          .catch(function (error) {
            console.log(error);
            setLoading(false);
            setModalCamera(false);
          });
      })
      .catch(function (error) {
        ImagePicker.clean();
        setLoading(false);
        setModalCamera(false);
      });
  };
  const getPicture = async resizeImage => {
    setLoading(true);
    await AICameraAPI.CutImageAPI(resizeImage)
      .then(res => {
        if (res?.status == 200 && res?.data.success == 1) {
          let card_img = res?.data?.card_img;
          addValueImage(card_img);
          addBackgroundFrontCard(card_img);
          setModalCamera(false);
          setLoading(false);
        }
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
        setModalCamera(false);
      });
  };
  const addValueImage = card_img => {
    isFront
      ? dispatch(addFrontCard(`data:image/png;base64,${card_img}`))
      : dispatch(addBackOfCard(`data:image/png;base64,${card_img}`));
  };
  const addBackgroundFrontCard = async card_img => {
    setSendImage(true);
    const widthWindow = Dimensions.get('window').width - 20;
    const imageWidth = Dimensions.get('window').width - 20;
    await AICameraAPI.DetailImageAPI(card_img)
      .then(async res => {
        if (res?.status == 200) {
          let widthCard = res?.data?.namecard_info?.background[0]?.width;
          let scales = widthCard / imageWidth;
          let background = [
            {
              background: `data:image/png;base64,${res?.data?.namecard_info?.background[0]?.background}`,
              width: res?.data?.namecard_info?.background[0]?.width,
              height: res?.data?.namecard_info?.background[0]?.height,
              tintColor: undefined,
            },
          ];
          isFront
            ? dispatch(addBackgroundFront(background))
            : dispatch(addBackgroundBack(background));
          let eachValue = [];
          let listValues = res?.data?.namecard_info?.values;
          for (let item = 0; item < listValues.length; item++) {
            const element = listValues[item];
            let idItem = `${uuid.v1()}`;
            const fontSpecs = {
              fontFamily: undefined,
              fontSize: (100 / scales) * element?.scaleX,
              fontStyle: 'normal',
              fontWeight: 'normal',
            };
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
              id: idItem,
              fontSize: (100 / scales) * element?.scaleX,
              colorSecont: element?.color,
            });
          }
          isFront
            ? dispatch(addValuesFront(eachValue))
            : dispatch(addValuesBack(eachValue));
          setModalCamera(false);
          setSendImage(false);
          setLoading(false);
        }
      })
      .catch(function (error) {
        console.log(error);
        setModalCamera(false);
        setSendImage(false);
        setLoading(false);
      });
  };
  const onChangeRotateLeft = () => {
    if (isFront) {
      setisRotateLeft(prev => (prev == false ? true : false));
      setRotateLeft(rotateLeft - 90);
    } else if (!isFront) {
      setisRotateRight(prev => (prev == false ? true : false));
      setRotateRight(rotateRight - 90);
    }
  };
  const onChangeRotateRight = () => {
    if (isFront) {
      setisRotateLeft(prev => (prev == false ? true : false));
      setRotateLeft(rotateLeft + 90);
    } else if (!isFront) {
      setisRotateRight(prev => (prev == false ? true : false));
      setRotateRight(rotateRight + 90);
    }
  };
  const [modalShowImage, setModalShowImage] = useState(false);
  const [orientation, setOrientation] = useState(true);
  useEffect(() => {
    Dimensions.addEventListener('change', ({window: {width, height}}) => {
      if (width < height) {
        setModalShowImage(false);
        setIsShow(false);
      } else {
        setOrientation(false);
        setModalShowImage(true);
      }
    });
  }, [orientation]);
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
      {modalShowImage && (
        <View style={styles.viewModal}>
          <CustomModalShowImage
            isShow={modalShowImage}
            source={isFront ? frontCardStore : backOfCardStore}
            modalVisible={modalShowImage}
            onRequestClose={() => {
              setModalShowImage(false);
            }}
            onPress={() => setModalShowImage(false)}
          />
        </View>
      )}
      <CustomAppbar
        styleAppBar={{paddingHorizontal: 8, marginBottom: 20}}
        iconLeft={icons.ic_back}
        iconRight2={icons.ic_bell}
        iconRight1={icons.ic_shopping}
        title={'Upload File'}
        onPressLeftIcon={() => navigation.goBack()}
      />
      <View style={styles.eachContainer}>
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
        <View style={styles.viewRowButton}>
          <TouchableOpacity onPress={() => onChangeRotateLeft()}>
            <Image
              source={icons.ic_rotateLeft}
              style={{width: 50, height: 50}}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onChangeRotateRight()}>
            <Image
              source={icons.ic_rotateRight}
              style={{width: 50, height: 50}}
            />
          </TouchableOpacity>
        </View>
      </View>

      {isFront && renderFrontCard()}
      {!isFront && renderbackOfCardStore()}
      {((!sendImage && frontCardStore && isFront) ||
        (!sendImage && backOfCardStore && !isFront)) && (
        <CustomTwoBottomButtonFuntion
          styleTwoButton={styles.customTwoBottomButtonFuntion}
          titleLeft={'이전'}
          titleRight={'다음단계'}
          styleTextLeft={{color: 'white'}}
          styleTextRight={{color: 'white'}}
          styleButtonLeft={{backgroundColor: colors.backgroundButtonRed}}
          styleButtonRight={{backgroundColor: colors.backgroundButton}}
          onPressLeft={() => navigation.goBack()}
          onPressRight={() => navigation.navigate('ViewManuscript')}
        />
      )}
      {sendImage && (
        <ActivityIndicator size={'large'} color={colors.backgroundButton} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(255,255,255)',
  },
  eachContainer: {
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
  customTwoBottomButtonFuntion: {
    height: 60,
  },
  viewRowButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginVertical: 20,
  },
});
export default UploadFile;
