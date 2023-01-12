import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  ImageStore,
} from 'react-native';
import CardTemplate from '../../../Components/CardTemplate';
import CustomButton from '../../../Components/CustomButton';
import CustomAppbar from '../../../Components/CustomAppBar';
import {colors, icons, images} from '../../../Constants';
import CustomModalNotification from '../../../Components/CustomModalNotification';
import {addtypeCard} from '../../../Stores/slices/cardSlice';
import {useDispatch, useSelector} from 'react-redux';
const ChooseTypeOfBusinessCard = () => {
  const navigation = useNavigation();
  const imageWidth = Dimensions.get('window').width - 20;
  const [typeCard, setTypeCard] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      {modalVisible && (
        <View style={styles.styleModal}>
          <CustomModalNotification
            source={icons.ic_nonHappyFace}
            title={'Oops'}
            content={"You haven't selected a template yet"}
            titleButton={'CHOOSE TEMPLATE'}
            modalVisible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
            }}
            onPress={() =>
              setModalVisible(prev => (prev == false ? true : false))
            }
          />
        </View>
      )}
      <CustomAppbar
        styleAppBar={{paddingHorizontal: 8, marginBottom: 20}}
        title={'주문할 명함 유형을 선택하세요'}
      />
      <ScrollView style={styles.container}>
        <CardTemplate
          styleCard={{
            padding: 10,
            borderColor: 'red',
          }}
          onPress={() => {
            dispatch(addtypeCard('common'));
            navigation.navigate('TypeOfBusinessCard');
          }}
          uri={images.im_commonCard}
          type={'일반형'}
          detail={'일반용지 / 200매 / 5,000원'}
          describe={'일반적으로 가장 많이 사용하는\n명함이예요'}
          describeSize={'사이즈 90mm*50mm'}
          styleImage={{
            width: imageWidth,
            height: imageWidth / 1.8,
            borderRadius: 10,
          }}
        />
        <View style={[styles.line, {width: imageWidth}]} />
        <CardTemplate
          onPress={() => {
            dispatch(addtypeCard('other'));
            navigation.navigate('TypeOfBusinessCard');
          }}
          styleCard={{
            padding: 10,
            borderColor: 'red',
          }}
          uri={images.im_otherCard}
          type={'기타'}
          detail={'명함 외 품목도 선택 가능해요'}
          describe={'용지와 사이즈를\n취향에 맞게 선택해보세요'}
          styleImage={{
            width: imageWidth,
            height: imageWidth / 1.8,
            borderRadius: 10,
          }}
        />
        <CustomButton
          title={'이전'}
          styleButton={styles.customButtonOk}
          styleText={styles.textCustomButtonOk}
          onPress={() => navigation.goBack()}
        />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(255,255,255)',
  },

  customButton: {
    backgroundColor: 'rgb(26,109,255)',
    height: 35,
    width: 150,
    alignSelf: 'center',
  },
  line: {
    height: 1,
    backgroundColor: 'rgba(119,119,119,0.4)',
    alignSelf: 'center',
    marginVertical: 10,
  },
  customButtonOk: {
    backgroundColor: colors.backgroundButton,
    height: 50,
    width: 150,
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  textCustomButtonOk: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  styleModal: {
    backgroundColor: 'rgba(119,119,119,0.7)',
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 9999,
  },
});
export default ChooseTypeOfBusinessCard;
