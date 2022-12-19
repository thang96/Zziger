import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Image,
  Dimensions,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import {colors, icons} from '../Constants';

const CustomModalShowImageRender = props => {
  const [loading, setLoading] = useState(true);
  const {onRequestClose, modalVisible, isFront, isShow} = props;
  const [eachBackground, setEachBackground] = useState([]);
  const [eachValues, setEachValues] = useState([]);
  const [resizeBackground, setResizeBackground] = useState([]);
  const [resizeValues, setResizeValues] = useState([]);
  const [scaleBack, setScaleBack] = useState(0);
  const backgroundFrontStore = useSelector(
    state => state.cardValues.backgroundFront,
  );
  const valuesFrontStore = useSelector(state => state.cardValues.valuesFront);
  const backgroundBackStore = useSelector(
    state => state.cardValues.backgroundBack,
  );
  const valuesBackStore = useSelector(state => state.cardValues.valuesBack);

  useEffect(() => {
    if (isFront) {
      setEachBackground(backgroundFrontStore);
      setEachValues(valuesFrontStore);
    } else if (!isFront) {
      setEachBackground(backgroundBackStore);
      setEachValues(valuesBackStore);
    }
    renderSizelandscape();
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, []);
  useEffect(() => {
    renderSizelandscape();
  }, [loading]);

  const renderSizelandscape = () => {
    let imageWidth = Dimensions.get('window').width - 200;
    let heightCard = eachBackground[0]?.width;
    let scales = heightCard / imageWidth;
    setScaleBack(scales);
    if (valuesFrontStore && heightCard) {
      let eachBack = [];
      for (let index = 0; index < eachBackground.length; index++) {
        const elementGround = eachBackground[index];
        let newElementBackground = {
          background: elementGround?.background,
          width: elementGround.width / scales,
          height: elementGround.height / scales,
        };
        eachBack.push(newElementBackground);
      }
      setResizeBackground(eachBack);
      let eachValue = [];
      for (let index = 0; index < eachValues.length; index++) {
        const element = eachValues[index];
        let newElement = {
          ...element,
          x: element?.x / scales,
          y: element?.y / scales,
          fontSize: (100 / scales) * element?.scaleX,
        };
        eachValue.push(newElement);
      }
      setResizeValues(eachValue);
    }
  };

  return (
    // <Modal
    //   animationType="fade"
    //   transparent={true}
    //   visible={modalVisible}
    //   onRequestClose={onRequestClose}>
    <View style={styles.container}>
      <View style={styles.eachContainer}>
        {loading ? (
          <ActivityIndicator size={'large'} color={colors.backgroundButton} />
        ) : (
          <ImageBackground
            resizeMode="cover"
            source={
              resizeBackground[0]?.background
                ? {
                    uri: `${resizeBackground[0]?.background}`,
                  }
                : null
            }
            style={{
              width: resizeBackground[0]?.width,
              height: resizeBackground[0]?.height,
              position: 'absolute',
              overflow: 'hidden',
            }}>
            {resizeValues.map(
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
                  <View key={id}>
                    {type == 'text' ? (
                      <View
                        style={[
                          {
                            position: 'absolute',
                            transform: [{translateX: x}, {translateY: y}],
                          },
                        ]}>
                        <Text
                          style={[
                            {
                              fontSize: fontSize,
                              color: color,
                            },
                          ]}>
                          {text}
                        </Text>
                      </View>
                    ) : null}
                  </View>
                );
              },
            )}
          </ImageBackground>
        )}
      </View>
    </View>

    // </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  eachContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    zIndex: 999,
    position: 'absolute',
  },
});
export default CustomModalShowImageRender;
