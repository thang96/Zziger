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

export function objectDetect(frame) {
  'worklet';
  return __objectDetect(frame);
}

const App = () => {
  const [cameraPermission, setCameraPermission] = useState(false);
  const devices = useCameraDevices();
  const device = devices.back;
  const camera = useRef();
  const requestCameraPermission = async () => {
    const newCameraPermission = await Camera.requestCameraPermission();
    setCameraPermission(newCameraPermission == 'authorized' ? true : false);
  };
  console.log(cameraPermission);
  useEffect(() => {
    requestCameraPermission();
  }, []);

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    const card = objectDetect(frame);
    console.log(`${card}`);
  }, []);

  const takePhoto = async () => {
    photo.current = await camera.current.takePhoto();
  };

  if (device == null) return <ActivityIndicator size={40} color={'red'} />;

  return (
    <SafeAreaView style={{flex: 1}}>
      {device != null && cameraPermission && (
        <>
          <Camera
            style={StyleSheet.absoluteFill}
            ref={camera}
            isActive={true}
            device={device}
            photo={true}
            frameProcessor={frameProcessor}
            frameProcessorFps={5}
          />
          <TouchableOpacity style={styles.buttonCamera} onPress={takePhoto} />
        </>
      )}
    </SafeAreaView>
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
});
export default App;
