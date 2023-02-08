import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import CustomSelectDropDown from '../../../../Components/CustomSelectDropDown';
import {icons, images} from '../../../../Constants';

const ComponentNormalCard = props => {
  const {} = props;

  return (
    <View style={styles.container}>
      <View style={styles.eachContainer}>
        <Image
          source={images.im_normal_card}
          style={styles.image}
          resizeMode={'cover'}
        />
        <ScrollView style={{paddingTop: 20}}>
          <CustomSelectDropDown title={'용지'} content={'일반용지'} />
          <CustomSelectDropDown title={'사이즈'} content={'90mm*50mm'} />
          <CustomSelectDropDown title={'수량'} content={'90mm*50mm'} />
        </ScrollView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1},
  eachContainer: {flex: 1, paddingHorizontal: 10, paddingTop: 10},
  image: {width: '100%', height: 220, alignSelf: 'center'},
});

export default ComponentNormalCard;
