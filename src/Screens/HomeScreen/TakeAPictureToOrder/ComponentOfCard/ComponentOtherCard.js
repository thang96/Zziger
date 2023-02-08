import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {icons, images} from '../../../../Constants';

const ComponentOtherCard = props => {
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
          <Text>123</Text>
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

export default ComponentOtherCard;
