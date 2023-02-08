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
import {colors, icons, images} from '../../Constants';
import {useNavigation} from '@react-navigation/native';
// import {postImg} from '../../Apis/HomeAPI';
// import useGetShare from '../../Hooks/useGetShare';
// import CustomLoading from '../../Components/CustomLoading';
import {useDispatch, useSelector} from 'react-redux';
import CustomLoading from '../../Components/CustomLoading';
import useGetShare from '../../Hooks/useGetShare';

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
    // console.warn(err);
  }
};

const HomeScreen = () => {
  const files = useGetShare();
  useEffect(() => {
    if (files !== null && files !== undefined) {
      // dispatch(addShareCard(files[0]));
      console.log(`${files[0]}`);
    }
  }, [files]);
  useEffect(() => {
    requestCameraPermission();
  }, []);

  const navigation = useNavigation();
  const heightViewBottom = Dimensions.get('window').height - 250;

  const [modalVisible, setModalVisible] = useState(false);
  const [modalCamera, setModalCamera] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      {loading && (
        <CustomLoading
          modalVisible={loading}
          onRequestClose={() => setLoading(false)}
        />
      )}
      <ImageBackground
        style={styles.container}
        source={images.backgroundHome}
        resizeMode={'cover'}>
        <TouchableOpacity
          style={styles.customButtonLogo}
          onPress={() => navigation.navigate('TakeAPictureToOrder')}>
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
                navigation.navigate('CameraScreen');
              }}>
              <Text style={styles.content}>명함</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.customButton}
              onPress={() => {
                setLoading(!loading);
              }}>
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
