import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import CustomTwoButtonTop from '../../../Components/CustomTwoButtonTop';
import CustomTowButtonBottom from '../../../Components/CustomTowButtonBottom';
import ComponentNormalCard from './ComponentOfCard/ComponentNormalCard';
import ComponentOtherCard from './ComponentOfCard/ComponentOtherCard';
const ChoosetypeOfCard = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [isFront, setIsFront] = useState(true);
  console.log(isFront, 'isFront');
  useEffect(() => {
    setIsFront(route.params?.isFront);
  }, []);
  return (
    <View style={styles.container}>
      <CustomTwoButtonTop
        styleComponent={styles.styleCustomTwoButtonTop}
        isFront={isFront}
        onPressLeft={() => setIsFront(true)}
        onPressRight={() => setIsFront(false)}
      />
      <View style={styles.container}>
        {isFront ? <ComponentNormalCard /> : <ComponentOtherCard />}
      </View>
      <CustomTowButtonBottom
        labelLeft={'이전'}
        labelRight={'다음단계'}
        onPressLeft={() => navigation.navigate('HomeScreen')}
        onPressRight={() => {}}
      />
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
