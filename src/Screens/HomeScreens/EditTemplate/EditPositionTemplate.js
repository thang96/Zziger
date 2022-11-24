import {useNavigation, useRoute} from '@react-navigation/native';
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
import Orientation from 'react-native-orientation-locker';
const EditPositionTemplate = () => {
  useEffect(() => {
    Orientation.lockToLandscape();
  }, []);
  const navigation = useNavigation();

  const frontCardStore = useSelector(state => state.cardValues.frontCard);
  const backgroundFrontStore = useSelector(
    state => state.cardValues.backgroundFront,
  );
  const valuesFrontStore = useSelector(state => state.cardValues.valuesFront);

  useEffect(() => {
    renderSize();
  }, [backgroundFrontStore, valuesFrontStore]);
  const imageHeight = Dimensions.get('window').height;

  const [widthCard, setWidthCard] = useState(0);
  const [heightCard, setHeightCard] = useState(0);
  const [scale, setScale] = useState(0);
  const [backgroundCard, setBackgroundCard] = useState(null);
  const [values, setValues] = useState([]);
  const renderSize = () => {
    let heightCard = backgroundFrontStore[0]?.height + 40;
    let scales = heightCard / imageHeight;
    if (valuesFrontStore && heightCard) {
      setScale(scales);
      setWidthCard(backgroundFrontStore[0]?.width / scales);
      setHeightCard(backgroundFrontStore[0]?.height / scales);
      setBackgroundCard(backgroundFrontStore[0]?.background);
      setValues(valuesFrontStore);
    }
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
        <View style={{width: widthCard, height: heightCard}}>
          <Image
            source={{uri: `data:image/png;base64,${backgroundCard}`}}
            style={{width: widthCard, height: heightCard}}
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1},
  eachContainer: {
    flex: 1,
    marginHorizontal: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customButtonLogo: {position: 'absolute', top: 8, left: 8},
  styleImage: {width: 25, height: 25},
});
export default EditPositionTemplate;
