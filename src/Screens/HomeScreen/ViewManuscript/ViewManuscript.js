import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, View, Dimensions, ScrollView, Image} from 'react-native';
import CustomButton from '../../../Components/CustomButton';
import CustomTwoButtonBottom from '../../../Components/CustomTowButtonBottom';
import CustomTwoButtonTop from '../../../Components/CustomTwoButtonTop';
import {colors, icons, images} from '../../../Constants';
const ViewManuscript = () => {
  const navigation = useNavigation();
  const [isFront, setIsFront] = useState(true);
  return (
    <View style={styles.container}>
      <CustomTwoButtonTop
        isFront={isFront}
        labelLeft={'앞면'}
        labelRight={'뒷면'}
        onPressLeft={() => setIsFront(true)}
        onPressRight={() => setIsFront(false)}
      />
      <ScrollView style={{flex: 1, paddingHorizontal: 10, paddingTop: 20}}>
        {isFront ? (
          <View>
            <RenderCard
              source={images.im_normal_card}
              styleCardRender={{marginBottom: 30}}
            />
            <RenderCard
              source={images.im_normal_card}
              styleCardRender={{marginBottom: 30}}
            />
          </View>
        ) : (
          <View>
            <RenderCard
              source={images.im_other_cards}
              styleCardRender={{marginBottom: 30}}
            />
            <RenderCard
              source={images.im_other_cards}
              styleCardRender={{marginBottom: 30}}
            />
          </View>
        )}
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
