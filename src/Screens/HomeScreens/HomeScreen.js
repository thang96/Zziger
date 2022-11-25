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
import CustomModalCamera from '../../Components/CustomModalCamera';
import CustomCamera from '../../Components/CustomCamera';
// import {postImg} from '../../Apis/HomeAPI';
import useGetShare from '../../Hooks/useGetShare';
import CustomLoading from '../../Components/CustomLoading';

import {useDispatch, useSelector} from 'react-redux';
import AICameraAPI from '../../Apis/HomeAPI/AICameraAPI/AICameraAPI';
import {addResource} from '../../Stores/slices/resourceSlice';
import {
  addFrontCard,
  addBackgroundFront,
  addValuesFront,
} from '../../Stores/slices/cardValuesSlice';
import Orientation, {
  OrientationLocker,
  LANDSCAPE,
  PORTRAIT,
} from 'react-native-orientation-locker';
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

  const openGallery = () => {
    setLoading(true);
    ImagePicker.openPicker({})
      .then(async image => {
        const imageConverted1 = await common.resizeImageNotVideo(image);
        await AICameraAPI.CutImageAPI(imageConverted1)
          .then(async res => {
            if (res?.status == 200) {
              let card_img = res?.data?.card_img;
              dispatch(addFrontCard(card_img));
              await AICameraAPI.DetailImageAPI(card_img)
                .then(res => {
                  if (res?.status == 200) {
                    dispatch(
                      addBackgroundFront(res?.data?.namecard_info?.background),
                    );
                    dispatch(addValuesFront(res?.data?.namecard_info?.values));
                    setLoading(false);
                    setModalCamera(false);
                    // navigation.navigate('ChooseTypeOfBusinessCard');
                    navigation.navigate('EditTemplate');
                  }
                })
                .catch(function (error) {
                  console.log(error);
                  setLoading(false);
                  setModalCamera(false);
                });
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
          dispatch(addFrontCard(card_img));
          navigation.navigate('ChooseTypeOfBusinessCard');
          await AICameraAPI.DetailImageAPI(card_img)
            .then(res => {
              dispatch(addResource(res?.data?.namecard_info));
              setLoading(false);
              setModalCamera(false);
            })
            .catch(function (error) {
              console.log(error);
              setLoading(false);
              setModalCamera(false);
            });
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
      <OrientationLocker orientation={PORTRAIT} />
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
        <CustomButtonLogo
          styleButton={styles.customButtonLogo}
          source={icons.ic_buttonCamera}
          onPress={() =>
            setModalVisible(prev => (prev == false ? true : false))
          }
        />

        <View style={[styles.viewBottom, {height: heightViewBottom}]}>
          <Text style={styles.title}>Build your personal brand</Text>
          <View style={{flexDirection: 'row', marginVertical: 10}}>
            <Image
              source={icons.ic_star}
              style={{height: 25, width: 25}}
              resizeMode={'cover'}
            />
            <Image
              source={icons.ic_star}
              style={{height: 25, width: 25, marginHorizontal: 5}}
              resizeMode={'cover'}
            />
            <Image
              source={icons.ic_star}
              style={{height: 25, width: 25}}
              resizeMode={'cover'}
            />
          </View>
          <Text
            style={
              styles.content
            }>{`Lorem ipsum is simple dummy text of the printing and typesetting industry.`}</Text>
          <View style={styles.viewRow}>
            <CustomButton
              styleButton={styles.customButton}
              title={'Category 1'}
              styleText={styles.textCustomButton}
              onPress={() => navigation.navigate('ChooseTypeOfBusinessCard')}
            />
            <CustomButton
              styleButton={styles.customButton}
              title={'Category 2'}
              styleText={styles.textCustomButton}
              onPress={() => setCreateImage(true)}
            />
            <CustomButton
              styleButton={styles.customButton}
              title={'Category 3'}
              styleText={styles.textCustomButton}
            />
          </View>
        </View>
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
    width: '95%',
    color: 'grey',
  },
  viewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50,
    width: '100%',
    paddingHorizontal: 10,
  },
  customButton: {
    height: 50,
    width: 100,
    borderRadius: 10,
    backgroundColor: colors.backgroundButton,
  },
  textCustomButton: {
    color: 'white',
    fontWeight: 'bold',
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
});
export default HomeScreen;
