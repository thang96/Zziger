import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  PermissionsAndroid,
  Dimensions,
} from 'react-native';
import {
  Camera,
  useCameraDevices,
  useFrameProcessor,
} from 'react-native-vision-camera';
import {colors, icons} from '../../../Constants';
import CustomButton from '../../../Components/CustomButton';
import {
  CutImageAPI,
  DetailImageAPI,
} from '../../../Apis/HomeAPI/CameraDetectAPI';
import CustomLoading from '../../../Components/CustomLoading';
import {useDispatch} from 'react-redux';
import {
  addBackgroundFront,
  addValuesFront,
} from '../../../Stores/slices/cardValuesSlice';
import rnTextSize, {TSFontSpecs} from 'react-native-text-size';
import {uuidUtils} from '../../../Utils/uuid';

export function objectDetect(frame) {
  'worklet';
  return __objectDetect(frame);
}

const CameraDetectScreen = props => {
  const [cameraPermission, setCameraPermission] = useState(false);
  const devices = useCameraDevices();
  const device = devices.back;
  const camera = useRef();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const isFocus = useIsFocused();

  const requestCameraPermission = async () => {
    const newCameraPermission = await Camera.requestCameraPermission();
    setCameraPermission(newCameraPermission == 'authorized' ? true : false);
  };

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    const card = objectDetect(frame);
    // console.log(`${card}`);
  }, []);

  const takePhoto = async () => {
    let img = await camera.current.takePhoto();
    setLoading(true);
    await CutImageAPI(img)
      .then(res => {
        if (res?.status == 200) {
          let card_img = res?.data?.card_img;
          getDetailCard(card_img);
        }
      })
      .catch(error => console.log(error));
  };

  const getDetailCard = async card_img => {
    let widthWindow = Dimensions.get('window').width;
    let imageWidth = Dimensions.get('window').height;
    await DetailImageAPI(card_img).then(async res => {
      if (res?.status == 200) {
        // console.log(res?.data?.namecard_info);
        let widthCard = res?.data?.namecard_info?.background[0]?.width;
        let scales = widthCard / imageWidth;
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
        for (let index = 0; index < listValues.length; index++) {
          const element = listValues[index];
          let idItem = `${index}`;
          const fontSpecs = {
            fontFamily: undefined,
            fontSize: (100 / scales) * element?.scaleX,
            fontStyle: 'normal',
            fontWeight: 'normal',
            usePreciseWidth: true,
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
        navigation.navigate('ViewManuscript');
      }
    });
  };

  if (device == null)
    return <ActivityIndicator size={40} color={colors.backgroundButton} />;

  return (
    <View
      style={{position: 'absolute', width: '100%', height: '100%', zIndex: 1}}>
      {loading && <CustomLoading />}
      {device != null && cameraPermission && (
        <>
          <Camera
            style={StyleSheet.absoluteFill}
            ref={camera}
            isActive={isFocus}
            device={device}
            photo={true}
            frameProcessor={frameProcessor}
            frameProcessorFps={5}
          />
          <TouchableOpacity style={styles.buttonCamera} onPress={takePhoto} />
        </>
      )}

      <CustomButton
        source={icons.ic_left_arrow}
        styleImage={styles.buttonClose}
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  buttonCamera: {
    position: 'absolute',
    bottom: 15,
    alignSelf: 'center',
    width: 80,
    height: 80,
    borderRadius: 80,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderWidth: 5,
    borderColor: 'white',
  },
  buttonClose: {
    width: 30,
    height: 30,
    tintColor: 'white',
    position: 'absolute',
    top: 10,
    left: 10,
  },
});
export default CameraDetectScreen;
