import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {useEffect} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  Image,
  Text,
} from 'react-native';
import {useSelector} from 'react-redux';
import CustomButton from '../../../Components/CustomButton';
import CustomLoading from '../../../Components/CustomLoading';
import CustomTwoButtonBottom from '../../../Components/CustomTowButtonBottom';
import CustomTwoButtonTop from '../../../Components/CustomTwoButtonTop';
import {colors, icons, images} from '../../../Constants';
const ViewManuscript = () => {
  const navigation = useNavigation();
  const [isFront, setIsFront] = useState(true);

  const frontCardStore = useSelector(state => state.cardValues.frontCard);
  const backgroundFrontStore = useSelector(
    state => state.cardValues.backgroundFront,
  );
  const valuesFrontStore = useSelector(state => state.cardValues.valuesFront);
  const backOfCardStore = useSelector(state => state.cardValues.backOfCard);
  const backgroundBackStore = useSelector(
    state => state.cardValues.backgroundBack,
  );
  const valuesBackStore = useSelector(state => state.cardValues.valuesBack);

  const [loading, setLoading] = useState(true);

  const [widthCard, setWidthCard] = useState(0);
  const [heightCard, setHeightCard] = useState(0);
  const [scale, setScale] = useState(0);
  const [backgroundFrontCard, setBackgroundFrontCard] = useState(null);
  const [valuesFront, setValuesFront] = useState([]);

  const [widthCardBack, setWidthCardBack] = useState(0);
  const [heightCardBack, setHeightCardBack] = useState(0);
  const [scaleBack, setScaleBack] = useState(0);
  const [backgroundBackCard, setBackgroundBackCard] = useState(null);
  const [valuesBack, setValuesBack] = useState([]);

  const imageWidth = Dimensions.get('window').width - 20;

  useEffect(() => {
    renderSizeFront();
    renderSizeBack();
  }, [
    backgroundFrontStore,
    valuesFrontStore,
    valuesBackStore,
    backgroundBackStore,
    loading,
    frontCardStore,
  ]);

  const renderSizeFront = () => {
    let widthCard = backgroundFrontStore[0]?.width;
    let scales = widthCard / imageWidth;
    console.log(widthCard, scales);
    if (backgroundFrontStore && valuesFrontStore) {
      setScale(scales);
      setWidthCard(backgroundFrontStore[0]?.width / scales);
      setHeightCard(backgroundFrontStore[0]?.height / scales);
      setBackgroundFrontCard(backgroundFrontStore[0]?.background);
      setValuesFront(valuesFrontStore);
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }
  };

  const renderSizeBack = () => {
    let widthCardBack = backgroundBackStore[0]?.width;
    let scales = widthCardBack / imageWidth;
    if (backgroundBackStore && valuesBackStore) {
      setScaleBack(scales);
      setWidthCardBack(backgroundBackStore[0]?.width / scales);
      setHeightCardBack(backgroundBackStore[0]?.height / scales);
      setBackgroundBackCard(backgroundBackStore[0]?.background);
      setValuesBack(valuesBackStore);
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }
  };

  const detailInfor = useSelector(state => state?.paymentInfo?.paymentInfo);
  console.log(detailInfor);

  const renderFrontCard = () => {
    return (
      <View>
        {backgroundFrontCard && (
          <View>
            <CustomButton
              label={'선택'}
              styleLabel={styles.styleLabel}
              styleButton={styles.button}
              onPress={() => navigation.navigate('ManuscriptEditing')}
            />
            <View style={{width: widthCard, height: heightCard}}>
              <Image
                source={{uri: `${backgroundFrontCard}`}}
                style={{
                  width: widthCard,
                  height: heightCard,
                  position: 'absolute',
                  tintColor: backgroundFrontStore[0]?.tintColor,
                }}
                resizeMode={'cover'}
              />
              {valuesFront != [] &&
                valuesFront.map(
                  (
                    {color, type, font_size, x, y, text, scaleX, scaleY, id},
                    index,
                  ) => {
                    return (
                      <View key={id}>
                        {type == 'text' ? (
                          <View
                            style={[
                              {
                                position: 'absolute',
                                transform: [
                                  {translateX: x / scale},
                                  {translateY: y / scale},
                                ],
                              },
                            ]}>
                            <Text
                              style={[
                                {
                                  fontSize: (100 / scale) * scaleX,
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
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {loading && <CustomLoading modalVisible={loading} />}
      <CustomTwoButtonTop
        isFront={isFront}
        labelLeft={'앞면'}
        labelRight={'뒷면'}
        onPressLeft={() => setIsFront(true)}
        onPressRight={() => setIsFront(false)}
      />
      <ScrollView style={{flex: 1, paddingHorizontal: 10, paddingTop: 20}}>
        {isFront && !loading && renderFrontCard()}
        <CustomTwoButtonBottom
          labelLeft={'주문하기'}
          labelRight={'여기서 편집'}
          onPressLeft={() => {}}
          onPressRight={() => {
            navigation.navigate('ManuscriptEditing', {isFront: true});
          }}
        />
        <CustomTwoButtonBottom
          labelLeft={'PC에서 편집'}
          labelRight={'재촬영'}
          onPressLeft={() => {}}
          onPressRight={() => {}}
        />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  button: {
    height: 45,
    width: 100,
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundButtonOrange,
  },
  styleLabel: {color: 'white', fontSize: 16, fontWeight: '500'},
});

const RenderCard = props => {
  const {styleCardRender, source} = props;
  return (
    <View style={styleCardRender}>
      <CustomButton
        label={'선택'}
        styleLabel={styleRender.styleLabel}
        styleButton={styleRender.button}
      />
      <Image source={source} style={{width: '100%', height: 250}} />
    </View>
  );
};
const styleRender = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  button: {
    height: 45,
    width: 100,
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundButtonOrange,
  },
  styleLabel: {color: 'white', fontSize: 16, fontWeight: '500'},
});

export default ViewManuscript;
