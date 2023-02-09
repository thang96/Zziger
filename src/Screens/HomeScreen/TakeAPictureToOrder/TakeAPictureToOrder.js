import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import CustomButton from '../../../Components/CustomButton';
import {colors, images} from '../../../Constants';
const TakeAPictureToOrder = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.viewAppBar}>
        <Text>주문할 명함 유형을 선택하세요</Text>
      </View>
      <View style={styles.eachContainer}>
        <ScrollView style={{flex: 1}}>
          <CustomReviewCardType
            type={'일반형'}
            description={'일반적으로 가장 많이 사용하는\n명함이예요'}
            source={images.im_normal_card}
            details={'일반용지 / 200매 / 5,000원\n사이즈 90mm*50mm'}
            onPress={() =>
              navigation.navigate('ChoosetypeOfCard', {isFront: true})
            }
          />
          <CustomReviewCardType
            type={'기타'}
            description={'용지와 사이즈를\n취향에 맞게 선택해보세요'}
            source={images.im_other_cards}
            price={'일반용지 / 200매 / 5,000원'}
            details={'명함 외 품목도 선택 가능해요'}
            onPress={() =>
              navigation.navigate('ChoosetypeOfCard', {isFront: false})
            }
          />
        </ScrollView>
        <CustomButton
          label={'이전'}
          styleLabel={styles.styleLabel}
          styleButton={styles.buttonBack}
          onPress={() => navigation.navigate('HomeScreen')}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  viewAppBar: {
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  eachContainer: {flex: 1, paddingHorizontal: 10, paddingTop: 10},
  buttonBack: {
    backgroundColor: colors.backgroundButton,
    width: 160,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    borderRadius: 10,
  },
  styleLabel: {color: 'white', fontSize: 16, fontWeight: '500'},
});

const CustomReviewCardType = props => {
  const {type, description, source, details, onPress} = props;
  return (
    <View style={{marginTop: 20}}>
      <View style={styleReviewCard.viewRow}>
        <CustomButton
          styleButton={styleReviewCard.button}
          label={type}
          styleLabel={styleReviewCard.styleLabel}
          onPress={onPress}
        />
        <Text style={styleReviewCard.textDecription}>{description}</Text>
      </View>
      <Image
        source={source}
        style={styleReviewCard.image}
        resizeMode={'cover'}
      />
      <Text style={styleReviewCard.textDetail}>{details}</Text>
    </View>
  );
};
const styleReviewCard = StyleSheet.create({
  viewRow: {flexDirection: 'row', height: 60, alignItems: 'center'},
  button: {
    backgroundColor: colors.backgroundButton,
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  styleLabel: {fontSize: 15, fontWeight: '500', color: 'white'},
  textDecription: {
    color: 'black',
    textAlign: 'center',
    flex: 1,
    fontSize: 14,
  },
  image: {width: '100%', height: 220, alignSelf: 'center'},
  textDetail: {
    color: 'grey',
    fontSize: 14,
    alignSelf: 'center',
    textAlign: 'center',
  },
});
export default TakeAPictureToOrder;
