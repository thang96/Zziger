import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  StatusBar,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CustomButtonLogo from '../../../Components/CustomButtonLogo';
import {colors, icons, images} from '../../../Constants';
import uuid from 'react-native-uuid';
import {
  addBackgroundFront,
  addValuesBack,
  addValuesFront,
  updateBackgroundFront,
  updateValuesFront,
  removeValuesFront,
  removeValuesBack,
} from '../../../Stores/slices/cardValuesSlice';
import Orientation, {
  LANDSCAPE,
  OrientationLocker,
} from 'react-native-orientation-locker';
import PanAndPinch from '../../../Components/PanAndPinch';
import CustomAppbar from '../../../Components/CustomAppBar';
import CustomModalShowImage from '../../../Components/CustomModalShowImage';
import CustomModalShowImageRender from '../../../Components/CustomModalShowImageRender';
const EditPositionTemplate = () => {
  const route = useRoute();
  const [loading, setLoading] = useState(true);
  const [isFront, setIsFront] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const backgroundFrontStore = route.params?.background ?? [];

  const valuesFrontStore = route.params?.values ?? [];

  const [eachBackgroundFrontStore, setEachBackgroundFrontStore] = useState([]);
  const [eachValuesFrontStore, setEachValuesFrontStore] = useState([]);
  const [orientation, setOrientation] = useState(false);

  useEffect(() => {
    renderSizePortrait();
    setIsFront(route.params?.isFront);
  }, []);
  useEffect(() => {
    Dimensions.addEventListener('change', ({window: {width, height}}) => {
      if (width < height) {
        setLoading(true);
        setOrientation(true);
        setTimeout(() => {
          renderSizePortrait();
        }, 500);
      } else {
        setOrientation(false);
        setLoading(true);
        setTimeout(() => {
          renderSizelandscape();
        }, 500);
      }
    });
  }, [orientation]);

  const renderSizePortrait = () => {
    let imageWidth = Dimensions.get('window').width - 20;
    let heightCard = backgroundFrontStore[0]?.width;
    let scales = heightCard / imageWidth;
    if (valuesFrontStore && heightCard) {
      let eachBack = [];
      for (let index = 0; index < backgroundFrontStore.length; index++) {
        let elementGround = backgroundFrontStore[index];
        let newElementBackground = {
          background: elementGround?.background,
          width: elementGround.width / scales,
          height: elementGround.height / scales,
        };
        eachBack.push(newElementBackground);
      }
      setEachBackgroundFrontStore(eachBack);
      let eachValues = [];
      for (let index = 0; index < valuesFrontStore.length; index++) {
        let element = valuesFrontStore[index];
        let newElement = {
          ...element,
          x: element?.x / scales,
          y: element?.y / scales,
          fontSize: (100 / scales) * element?.scaleX,
        };
        eachValues.push(newElement);
      }
      setEachValuesFrontStore(eachValues);
    }
    setLoading(false);
  };
  const renderSizelandscape = () => {
    let imageWidth = Dimensions.get('window').width - 200;
    let heightCard = backgroundFrontStore[0]?.width;
    let scalesPort = heightCard / imageWidth;
    if (valuesFrontStore && scalesPort) {
      let eachBack = [];
      for (let index = 0; index < backgroundFrontStore.length; index++) {
        let elementGround = backgroundFrontStore[index];
        let newElementBackground = {
          background: elementGround?.background,
          width: elementGround.width / scalesPort,
          height: elementGround.height / scalesPort,
        };
        eachBack.push(newElementBackground);
      }
      setEachBackgroundFrontStore(eachBack);
      let eachValues = [];
      for (let index = 0; index < valuesFrontStore.length; index++) {
        let element = valuesFrontStore[index];
        let newElement = {
          ...element,
          x: element?.x / scalesPort,
          y: element?.y / scalesPort,
          fontSize: (100 / scalesPort) * element?.scaleX,
        };
        eachValues.push(newElement);
      }
      setEachValuesFrontStore(eachValues);
    }
    setLoading(false);
  };
  const onTogglePressed = index => {
    return () => {
      setSelectedIndex(prevIndex => (prevIndex == index ? null : index));
    };
  };
  const onRemove = id => {
    return () => {
      let removeItem = [...eachValuesFrontStore];
      let itemRemove = removeItem.findIndex(itemFind => itemFind.id === id);
      removeItem.splice(itemRemove, 1);
      setEachValuesFrontStore(removeItem);
    };
  };
  const updateSize = (boxPosition, index) => {
    const itemArray = [...eachValuesFrontStore];
    const itemChange = {
      ...itemArray[index],
      height: boxPosition.height,
      width: boxPosition.width,
    };
    eachValuesFrontStore[index] = itemChange;
  };
  const updatePosition = (boxPosition, index) => {
    const itemArray = [...eachValuesFrontStore];
    const itemChange = {
      ...itemArray[index],
      x: boxPosition.x,
      y: boxPosition.y,
    };
    eachValuesFrontStore[index] = itemChange;
  };
  const updateValueStore = () => {
    let isFront = route.params?.isFront;
    let imageWidth = Dimensions.get('window').width - 250;
    let heightCard = backgroundFrontStore[0]?.width;
    let scales = heightCard / imageWidth;
    let arrayValue = [];
    for (let index = 0; index < eachValuesFrontStore.length; index++) {
      const element = eachValuesFrontStore[index];
      let newElement = {
        ...element,
        x: element?.x * scales,
        y: element?.y * scales,
      };
      arrayValue.push(newElement);
    }
    {
      isFront
        ? dispatch(addValuesFront(arrayValue))
        : dispatch(addValuesBack(arrayValue));
    }
    navigation.navigate('EditTemplate');
  };
  const [selectedIndex, setSelectedIndex] = useState(null);
  return (
    <View style={styles.container}>
      <CustomButtonLogo
        source={icons.ic_back}
        styleButton={styles.customButtonLogo}
        styleImage={styles.styleImage}
        onPress={() => navigation.goBack()}
        // onPress={() => updateValueStore()}
      />

      {loading ? (
        <ActivityIndicator color={colors.backgroundButton} size={'large'} />
      ) : (
        <View style={styles.eachContainer}>
          <View
            style={{
              overflow: 'hidden',
              width: eachBackgroundFrontStore[0]?.width,
              height: eachBackgroundFrontStore[0]?.height,
            }}>
            {backgroundFrontStore[0]?.tintColor ? (
              <Image
                source={{uri: `${eachBackgroundFrontStore[0]?.background}`}}
                style={{
                  width: eachBackgroundFrontStore[0]?.width,
                  height: eachBackgroundFrontStore[0]?.height,
                  position: 'absolute',
                  tintColor: `${backgroundFrontStore[0]?.tintColor}`,
                }}
                resizeMode={'cover'}
              />
            ) : (
              <Image
                source={{uri: `${eachBackgroundFrontStore[0]?.background}`}}
                style={{
                  width: eachBackgroundFrontStore[0]?.width,
                  height: eachBackgroundFrontStore[0]?.height,
                  position: 'absolute',
                }}
                resizeMode={'cover'}
              />
            )}
            {eachValuesFrontStore.map(
              (
                {
                  color,
                  font_path,
                  font_size,
                  scaleX,
                  scaleY,
                  text,
                  type,
                  x,
                  y,
                  fontSize,
                  height,
                  width,
                  rotate,
                  id,
                },
                index,
              ) => {
                return (
                  <View key={text}>
                    {type == 'text' ? (
                      <PanAndPinch
                        isSelected={index === selectedIndex}
                        style={{
                          borderWidth: selectedIndex === index ? 0.2 : 0,
                          borderColor: 'black',
                          position: 'absolute',
                          zIndex: selectedIndex === index ? 9999 : 1,
                        }}
                        key={id}
                        x={x}
                        y={y}
                        rotate={rotate}
                        height={height}
                        width={width}
                        limitationHeight={eachBackgroundFrontStore[0]?.height}
                        limitationWidth={eachBackgroundFrontStore[0]?.width}
                        onRemove={onRemove(id)}
                        onResizeEnd={boxPosition =>
                          updateSize(boxPosition, index)
                        }
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
                                width: width,
                                height: height,
                              };
                            }}>
                            <Text
                              style={{
                                color: color,
                                fontSize: fontSize,
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
          </View>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, zIndex: 10000},
  eachContainer: {
    flex: 1,
    paddingHorizontal: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customButtonLogo: {
    position: 'absolute',
    top: 8,
    left: 8,
    zIndex: 9999,
  },
  styleImage: {width: 25, height: 25},
});
export default EditPositionTemplate;
