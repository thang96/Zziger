import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Keyboard, View} from 'react-native';
import CustomTwoButtonTop from '../../../Components/CustomTwoButtonTop';
import CustomTowButtonBottom from '../../../Components/CustomTowButtonBottom';
import ComponentNormalCard from './ComponentOfCard/ComponentNormalCard';
import ComponentOtherCard from './ComponentOfCard/ComponentOtherCard';
const ChoosetypeOfCard = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [isFront, setIsFront] = useState(true);

  useEffect(() => {
    setIsFront(route.params?.isFront);
  }, []);

  return (
    <View style={styles.container}>
      <CustomTwoButtonTop
        styleComponent={styles.styleCustomTwoButtonTop}
        isFront={isFront}
        labelLeft={'일반형'}
        labelRight={'기타'}
        onPressLeft={() => setIsFront(true)}
        onPressRight={() => setIsFront(false)}
      />
      <View style={styles.container}>
        {isFront ? <ComponentNormalCard /> : <ComponentOtherCard />}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  styleCustomTwoButtonTop: {
    flexDirection: 'row',
    height: 56,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default ChoosetypeOfCard;
