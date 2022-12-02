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
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CustomButtonLogo from '../../../Components/CustomButtonLogo';
import {colors, icons, images} from '../../../Constants';
import uuid from 'react-native-uuid';
import {
  addBackgroundFront,
  addValuesFront,
  updateBackgroundFront,
  updateValuesFront,
} from '../../../Stores/slices/cardValuesSlice';
import Orientation from 'react-native-orientation-locker';
import PanAndPinch from '../../../Components/PanAndPinch';
import {useOrientation} from '../../../Hooks/useOrientation';
const EditPositionTemplate = () => {
  Orientation.lockToLandscape();
  const orientation = useOrientation();
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const backgroundFrontStore = useSelector(
    state => state.cardValues.backgroundFront ?? [],
  );
  const valuesFrontStore = useSelector(
    state => state.cardValues.valuesFront ?? [],
  );
  const [eachBackgroundFrontStore, setEachBackgroundFrontStore] = useState([]);
  const [eachValuesFrontStore, setEachValuesFrontStore] = useState([]);

  useEffect(() => {
    if (isFocused) {
      setTimeout(() => {
        Orientation.lockToLandscape();
      }, 1000);
      setTimeout(() => {
        renderSizelandscape();
        setLoading(false);
      }, 1500);
    }
  }, [isFocused]);

  const [selectedIndex, setSelectedIndex] = useState(null);
  const renderSizelandscape = () => {
    let imageWidth = Dimensions.get('window').width - 200;
    let heightCard = backgroundFrontStore[0]?.width;
    let scales = heightCard / imageWidth;
    if (valuesFrontStore && heightCard) {
      let eachBack = [];
      for (let index = 0; index < backgroundFrontStore.length; index++) {
        const elementGround = backgroundFrontStore[index];
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
        const element = valuesFrontStore[index];
        let newElement = {
          ...element,
          x: element?.x / scales,
          y: element?.y / scales,
        };
        eachValues.push(newElement);
      }
      setEachValuesFrontStore(eachValues);
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
    const itemArray = [...eachValuesFrontStore];
    const itemChange = {
      ...itemArray[index],
      x: boxPosition.x,
      y: boxPosition.y,
    };
    eachValuesFrontStore[index] = itemChange;
  };
  const updateValueStore = () => {
    let imageWidth = Dimensions.get('window').width - 200;
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
    dispatch(addValuesFront(arrayValue));
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <CustomButtonLogo
        source={icons.ic_back}
        styleButton={styles.customButtonLogo}
        styleImage={styles.styleImage}
        onPress={() => updateValueStore()}
      />
      {loading ? (
        <ActivityIndicator color={colors.backgroundButton} size={'large'} />
      ) : (
        <View style={styles.eachContainer}>
          <ImageBackground
            resizeMode="cover"
            source={{
              uri: `${eachBackgroundFrontStore[0]?.background}`,
            }}
            style={{
              width: eachBackgroundFrontStore[0]?.width,
              height: eachBackgroundFrontStore[0]?.height,
              position: 'absolute',
              overflow: 'hidden',
            }}>
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
                },
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
                          position: 'absolute',
                          zIndex: selectedIndex === index ? 9999 : 1,
                        }}
                        key={`${uuid.v1()}`}
                        x={x}
                        y={y}
                        rotate={rotate}
                        height={height}
                        width={width}
                        limitationHeight={eachBackgroundFrontStore[0]?.height}
                        limitationWidth={eachBackgroundFrontStore[0]?.width}
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
          </ImageBackground>
        </View>
      )}
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
  customButtonLogo: {position: 'absolute', top: 8, left: 8, zIndex: 9999},
  styleImage: {width: 25, height: 25},
});
export default EditPositionTemplate;
