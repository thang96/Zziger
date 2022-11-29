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
  const orientation = useOrientation();
  useEffect(() => {
    Orientation.unlockAllOrientations();
    if (orientation == 'PORTRAIT') {
      renderSizePortrait();
    } else if (orientation == LANDSCAPE) {
      renderSizelandscape();
    }
  }, [orientation]);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const backgroundFrontStore = useSelector(
    state => state.cardValues.backgroundFront ?? [],
  );
  // {"height": 1042, "width": 1933}
  const valuesFrontStore = useSelector(
    state => state.cardValues.valuesFront ?? [],
  );

  const [sizeCard, setSizeCard] = useState({width: 100, height: 100});
  const [scale, setScale] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const renderSizePortrait = () => {
    let imageWidth = Dimensions.get('window').width - 20;
    let widthCard = backgroundFrontStore[0]?.width;
    let scales = widthCard / imageWidth;
    if (valuesFrontStore && widthCard) {
      setScale(scales);
      setSizeCard({
        width: backgroundFrontStore[0]?.width / scales,
        height: backgroundFrontStore[0]?.height / scales,
      });
    }
  };
  const renderSizelandscape = () => {
    let imageWidth = Dimensions.get('window').width - 200;
    let heightCard = backgroundFrontStore[0]?.width;
    let scales = heightCard / imageWidth;
    if (valuesFrontStore && heightCard) {
      setScale(scales);
      setSizeCard({
        width: backgroundFrontStore[0]?.width / scales,
        height: backgroundFrontStore[0]?.height / scales,
      });
    }
  };

  const onTogglePressed = index => {
    return () => {
      setSelectedIndex(prevIndex => (prevIndex == index ? null : index));
    };
  };
  const onRemove = id => {
    return () => {
      dispatch(removeResource(id));
    };
  };
  const updatePosition = (boxPosition, index) => {
    // const itemArray = [...valuesFrontStore];
    // const itemChange = {
    //   ...itemArray[index],
    //   x: boxPosition.x,
    //   y: boxPosition.y,
    // };
    // dispatch(updateValuesFront({itemChange, index}));
  };
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
          source={{
            uri: `data:image/png;base64,${backgroundFrontStore[0]?.background}`,
          }}
          style={{
            width: sizeCard?.width,
            height: sizeCard?.height,
            position: 'absolute',
          }}>
          {valuesFrontStore.map(
            (
              {color, font_path, font_size, scaleX, scaleY, text, type, x, y},
              index,
            ) => {
              return (
                <View key={`${uuid.v1()}`}>
                  {type == 'text' ? (
                    <PanAndPinch
                      isSelected={index === selectedIndex}
                      style={{
                        borderWidth: selectedIndex === index ? 0.2 : 0,
                        borderColor: 'black',
                      }}
                      key={`${uuid.v1()}`}
                      x={x / scale}
                      y={y / scale}
                      // rotate={rotate}
                      limitationHeight={sizeCard.height}
                      limitationWidth={sizeCard.width}
                      // onRemove={onRemove(id)}
                      onDragEnd={boxPosition =>
                        updatePosition(boxPosition, index)
                      }>
                      <TouchableOpacity
                        activeOpacity={1}
                        hitSlop={{top: 20, left: 20}}
                        style={[
                          StyleSheet.absoluteFill,
                          {zIndex: 99, elevation: 99},
                        ]}
                        onPress={onTogglePressed(index)}>
                        <View
                          style={() => {
                            return {
                              // width: size.width,
                              // height: size.height,
                            };
                          }}>
                          <Text
                            style={{
                              color: color,
                              fontSize: 14,
                            }}>
                            {`${text}`}
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
