import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {colors} from '../Constants';
import CustomButton from './CustomButton';
const CustomSelectDropDown = props => {
  const {title, content} = props;
  return (
    <View style={styles.viewContainer}>
      <Text style={styles.textTitle}>{title}</Text>
      {content && <Text style={styles.textContent}>{content}</Text>}
    </View>
  );
};
const styles = StyleSheet.create({
  viewContainer: {
    flexDirection: 'row',
    height: 56,
    width: '100%',
    alignItems: 'center',
  },
  textTitle: {fontSize: 18, fontWeight: 'bold', color: 'black', width: '30%'},
  textContent: {fontSize: 16, fontWeight: 'normal', color: 'grey'},
});
export default CustomSelectDropDown;
