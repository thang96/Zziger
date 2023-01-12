import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  AppState,
} from 'react-native';
import CustomButtonLogo from '../../Components/CustomButtonLogo';
import CustomButton from '../../Components/CustomButton';
import {colors, icons, images} from '../../Constants';
import {useNavigation} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import common from '../../Utils/common';
import uuid from 'react-native-uuid';
import CustomModalCamera from '../../Components/CustomModalCamera';
import CustomCamera from '../../Components/CustomCamera';
// import {postImg} from '../../Apis/HomeAPI';
import useGetShare from '../../Hooks/useGetShare';
import CustomLoading from '../../Components/CustomLoading';
import {useDispatch, useSelector} from 'react-redux';
import AICameraAPI from '../../Apis/HomeAPI/AICameraAPI/AICameraAPI';
import {
  addFrontCard,
  addBackgroundFront,
  addValuesFront,
} from '../../Stores/slices/cardValuesSlice';
import Orientation from 'react-native-orientation-locker';
import rnTextSize, {TSFontSpecs} from 'react-native-text-size';
const HomeScreen = () => {
  const navigation = useNavigation();
  const heightViewBottom = Dimensions.get('window').height - 250;

  const [modalVisible, setModalVisible] = useState(false);
  const [modalCamera, setModalCamera] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // console.log('You can use the camera');
      } else {
        // console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const files = useGetShare();
  useEffect(() => {
    if (files !== null && files !== undefined) {
      dispatch(addShareCard(files[0]));
      navigation.navigate('ChooseTypeOfBusinessCard');
    }
  }, [files]);

  const addBackgroundFrontCard = async card_img => {
    const widthWindow = Dimensions.get('window').width * 0.9;
    const imageWidth = Dimensions.get('window').height - 20;
    await AICameraAPI.DetailImageAPI(card_img)
      .then(async res => {
        let widthCard = res?.data?.namecard_info?.background[0]?.width;
        let scales = widthCard / imageWidth;
        if (res?.status == 200) {
          let background = [
            {
              background: `data:image/png;base64,${res?.data?.namecard_info?.background[0]?.background}`,
              width: res?.data?.namecard_info?.background[0]?.width,
              height: res?.data?.namecard_info?.background[0]?.height,
            },
          ];
          dispatch(addBackgroundFront(background));
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
            });
          }
          dispatch(addValuesFront(eachValue));
          setLoading(false);
          setModalCamera(false);
          navigation.navigate('ChooseTypeOfBusinessCard');
          // navigation.navigate('EditTemplate');
        }
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
        setModalCamera(false);
      });
  };
  const openGallery = () => {
    setLoading(true);
    ImagePicker.openPicker({})
      .then(async image => {
        const imageConverted1 = await common.resizeImageNotVideo(image);
        await AICameraAPI.CutImageAPI(imageConverted1)
          .then(async res => {
            if (res?.status == 200) {
              let card_img = res?.data?.card_img;
              dispatch(addFrontCard(`data:image/png;base64,${card_img}`));
              addBackgroundFrontCard(card_img);
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
      .then(async res => {
        if (res?.status == 200 && res?.data.success == 1) {
          let card_img = res?.data?.card_img;
          dispatch(addFrontCard(`data:image/png;base64,${card_img}`));
          addBackgroundFrontCard(card_img);
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
      {loading && (
        <View style={styles.styleModal}>
          <CustomLoading
            modalVisible={loading}
            onRequestClose={() => setLoading(false)}
          />
        </View>
      )}
      <ImageBackground
        style={styles.container}
        source={images.backgroundZ}
        resizeMode={'cover'}>
        <TouchableOpacity
          style={styles.customButtonLogo}
          onPress={() =>
            // setModalVisible(prev => (prev == false ? true : false))
            navigation.navigate('ChooseTypeOfBusinessCard')
          }>
          <Text style={styles.textTitle}>{'사진 찍어 \n주문하기'}</Text>
          <View style={styles.viewTitle}>
            <Image source={icons.ic_camera} style={styles.imageTitle} />
          </View>
        </TouchableOpacity>

        <View style={[styles.viewBottom, {height: heightViewBottom}]}>
          <Text style={[styles.title, {marginVertical: 30}]}>홍길동님</Text>
          <View style={styles.viewRow}>
            <TouchableOpacity
              style={styles.customButton}
              onPress={() => {
                navigation.navigate('EditTemplate');
              }}>
              <Text style={styles.content}>명함</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.customButton} onPress={() => {}}>
              <Text style={styles.content}>주문내역</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.customButton} onPress={() => {}}>
              <Text style={styles.content}>시안확인</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.buttonPlus}>
          <Image
            source={icons.ic_plus}
            style={{width: 30, height: 30, tintColor: colors.backgroundButton}}
          />
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  customButtonLogo: {
    marginTop: 200,
    height: 120,
    width: 120,
    alignSelf: 'center',
    zIndex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 30,
    elevation: 3,
  },
  viewBottom: {
    backgroundColor: 'white',
    zIndex: 2,
    width: '100%',
    position: 'absolute',
    top: 250,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    alignItems: 'center',
    paddingTop: 80,
  },
  title: {
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
  },
  content: {
    textAlign: 'center',
    fontSize: 16,
    color: 'grey',
  },
  viewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
  },
  customButton: {
    height: 100,
    width: 100,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    zIndex: 3,
    backgroundColor: 'white',
  },
  camera: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 9999,
  },
  styleModal: {
    backgroundColor: 'rgba(119,119,119,0.7)',
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 9999,
  },
  textTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.backgroundButton,
    textAlign: 'center',
  },
  viewTitle: {
    backgroundColor: 'white',
    width: 30,
    height: 30,
    position: 'absolute',
    bottom: -15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageTitle: {
    width: 20,
    height: 20,
    tintColor: 'grey',
  },
  buttonPlus: {
    borderRadius: 60,
    width: 60,
    height: 60,
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: 'white',
    elevation: 3,
    zIndex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default HomeScreen;
