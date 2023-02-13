import {useIsFocused} from '@react-navigation/native';
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
} from 'react-native';
import {
  Camera,
  useCameraDevices,
  useFrameProcessor,
} from 'react-native-vision-camera';
import {icons} from '../Constants';
import CustomButton from './CustomButton';

export function objectDetect(frame) {
  'worklet';
  return __objectDetect(frame);
}

const CameraDetectComponent = props => {
  const [cameraPermission, setCameraPermission] = useState(false);
  const devices = useCameraDevices();
  const device = devices.back;
  const camera = useRef();

  const {pressButtonClose} = props;
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
    photo.current = await camera.current.takePhoto();
  };

  if (device == null) return <ActivityIndicator size={40} color={'red'} />;

  return (
    <View
      style={{position: 'absolute', width: '100%', height: '100%', zIndex: 1}}>
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
        source={icons.ic_close}
        styleImage={styles.buttonClose}
        onPress={pressButtonClose}
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
export default CameraDetectComponent;
