import React, {useEffect, useRef} from 'react';
import {StyleSheet, TouchableOpacity, Image, View, Modal} from 'react-native';
import {CameraScreen, Camera, CameraType} from 'react-native-camera-kit';
import {icons} from '../Constants';
import {colors} from '../Constants';
import common from '../Utils/common';
const CustomCamera = props => {
  const camera = useRef();
  const {onRequestClose, modalVisible, cancel, getPicture} = props;
  const takePicture = async () => {
    const image = await camera.current.capture();
    const resizeImage = await common.resizeImageNotVideo(image);
    getPicture(resizeImage);
  };
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={onRequestClose}>
        <View style={styles.container}>
          <Camera
            style={styles.camera}
            ref={camera}
            cameraType={CameraType.Back} // front/back(default)
          />

          <View style={styles.viewVertical} />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.horizontalLine} />
            <View style={styles.framesCamera} />
            <View style={styles.horizontalLine} />
          </View>
          <View style={styles.viewVertical} />
          <TouchableOpacity onPress={takePicture} style={styles.buttonCamera}>
            <Image
              source={icons.ic_button_camera}
              style={{
                width: 70,
                height: 70,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={cancel} style={styles.buttonBack}>
            <Image
              source={icons.ic_back}
              style={{
                width: 30,
                height: 30,
                tintColor: colors.backgroundButton,
              }}
            />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  viewModal: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 9999,
    position: 'absolute',
  },
  horizontalLine: {
    flex: 1,
    backgroundColor: 'rgba(119,119,119,0.8)',
    height: 200,
  },
  viewVertical: {flex: 1, backgroundColor: 'rgba(119,119,119,0.8)'},
  buttonCamera: {
    width: 70,
    height: 70,
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  framesCamera: {
    width: 330,
    height: 200,
    borderWidth: 2,
    borderColor: colors.backgroundButton,
  },
  buttonBack: {
    position: 'absolute',
    top: 8,
    left: 8,
    zIndex: 9999,
  },
});
export default CustomCamera;
