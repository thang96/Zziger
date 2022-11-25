import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
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
  Modal,
  Alert,
  TextInput,
  ImageBackground,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CustomAppbar from '../../../Components/CustomAppBar';
import CustomButton from '../../../Components/CustomButton';
import CustomButtonLogo from '../../../Components/CustomButtonLogo';
import CustomTwoButtonFuntion from '../../../Components/CustomTwoButtonFuntion';
import CustomTextInput from '../../../Components/CustomTextInput';
import {colors, icons, images} from '../../../Constants';
import CustomModaViewManuscriptSelete from '../../../Components/CustomModaViewManuscriptSelete';
import CustomModalChangeColor from '../../../Components/CustomModalChangeColor';
import CustomModalChooseThemeTemplate from '../../../Components/CustomModalChooseThemeTemplate';
import uuid from 'react-native-uuid';
import {
  addValuesFront,
  updateValuesFront,
} from '../../../Stores/slices/cardValuesSlice';
import Orientation, {
  OrientationLocker,
  LANDSCAPE,
  PORTRAIT,
} from 'react-native-orientation-locker';
import PanAndPinch from '../../../Components/PanAndPinch';
import {useOrientation} from '../../../Hooks/useOrientation';
const EditPositionTemplate = () => {
  const isFocused = useIsFocused();
  const [showOrien, setShowOrien] = useState(false);

  const navigation = useNavigation();

  const backgroundFrontStore = useSelector(
    state => state.cardValues.backgroundFront,
  );
  const valuesFrontStore = useSelector(state => state.cardValues.valuesFront);
  const orientation = useOrientation();
  useEffect(() => {
    Orientation.unlockAllOrientations();
    if (orientation == 'PORTRAIT') {
      renderSizePortrait();
    } else if (orientation == LANDSCAPE) {
      renderSizelandscape();
    }
  }, [valuesFrontStore, backgroundFrontStore, orientation]);

  const [widthCard, setWidthCard] = useState(0);
  const [heightCard, setHeightCard] = useState(0);
  const [scale, setScale] = useState(0);
  const [backgroundCard, setBackgroundCard] = useState(null);
  const [values, setValues] = useState([]);
  const renderSizePortrait = () => {
    let imageWidth = Dimensions.get('window').width - 20;
    let widthCard = backgroundFrontStore[0]?.width;
    let scales = widthCard / imageWidth;
    if (backgroundFrontStore && widthCard) {
      setShowOrien(true);
      setScale(scales);
      setWidthCard(backgroundFrontStore[0]?.width / scales);
      setHeightCard(backgroundFrontStore[0]?.height / scales);
      setBackgroundCard(backgroundFrontStore[0]?.background);
      setValues(valuesFrontStore);
    }
  };
  const renderSizelandscape = () => {
    let imageWidth = Dimensions.get('window').width - 200;
    let heightCard = backgroundFrontStore[0]?.width;
    let scales = heightCard / imageWidth;
    if (backgroundFrontStore && heightCard) {
      setShowOrien(true);
      setScale(scales);
      setWidthCard(backgroundFrontStore[0]?.width / scales);
      setHeightCard(backgroundFrontStore[0]?.height / scales);
      setBackgroundCard(backgroundFrontStore[0]?.background);
      setValues(valuesFrontStore);
    }
  };

  const [selectedIndex, setSelectedIndex] = useState(null);

  const onTogglePressed = index => {
    return () => {
      setSelectedIndex(prevIndex => (prevIndex == index ? null : index));
    };
  };
  // const onRemove = id => {
  //   return () => {
  //     dispatch(removeResource(id));
  //   };
  // };
  return (
    <View style={styles.container}>
      <CustomButtonLogo
        source={icons.ic_back}
        styleButton={styles.customButtonLogo}
        styleImage={styles.styleImage}
        onPress={() => navigation.navigate('EditTemplate')}
      />
      <View style={styles.eachContainer}>
        <ImageBackground
          resizeMode="cover"
          source={{uri: `data:image/png;base64,${backgroundCard}`}}
          style={{
            width: widthCard,
            height: heightCard,
            position: 'absolute',
          }}>
          {values?.length > 0 &&
            values.map(
              ({color, type, font_size, x, y, text, scaleX, scaleY}, index) => {
                return (
                  <View key={`${uuid.v1()}`}>
                    {type == 'text' ? (
                      <PanAndPinch
                        isSelected={index === selectedIndex}
                        style={{
                          borderWidth: selectedIndex === index ? 0.2 : 0,
                          borderColor: 'black',
                          zIndex: selectedIndex === index ? 9999 : 1,
                        }}
                        key={`${uuid.v1()}`}
                        // height={heightCard}
                        // width={widthCard}
                        x={x / scale}
                        y={y / scale}
                        // rotate={rotate}
                        limitationHeight={heightCard}
                        limitationWidth={widthCard}
                        // onRemove={onRemove(id)}
                        onDragEnd={boxPosition => {}}
                        onResizeEnd={boxPosition => {}}
                        onRotateEnd={boxPosition => {}}>
                        <TouchableOpacity
                          activeOpacity={1}
                          style={[
                            StyleSheet.absoluteFill,
                            {zIndex: 99, elevation: 99},
                          ]}
                          onPress={onTogglePressed(index)}>
                          <View style={() => {}}>
                            <Text
                              style={{
                                color: color,
                                fontSize: (font_size / scale) * scaleX,
                              }}>
                              {text}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </PanAndPinch>
                    ) : null}
                  </View>
                );
              },
            )}
        </ImageBackground>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1},
  eachContainer: {
    flex: 1,
    paddingHorizontal: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customButtonLogo: {position: 'absolute', top: 8, left: 8},
  styleImage: {width: 25, height: 25},
});
export default EditPositionTemplate;
