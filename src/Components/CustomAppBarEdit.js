import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {icons} from '../Constants';
import CustomButton from './CustomButton';
import LinearGradient from 'react-native-linear-gradient';

const CustomAppBarEdit = props => {
  const {onPressHomeButton, onPressFinishButton} = props;
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={['#07bccd', '#3f76da', '#782fe6']}
      style={styles.container}>
      <CustomButton
        source={icons.ic_home}
        styleImage={styles.styleIconHome}
        onPress={onPressHomeButton}
      />
      <CustomButton
        label={'완료'}
        styleLabel={styles.styleLabel}
        styleButton={styles.button}
        onPress={onPressFinishButton}
      />
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 56,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    backgroundColor: 'rgba(119,119,119,0.5)',
    justifyContent: 'space-between',
  },
  styleIconHome: {width: 20, height: 20, tintColor: 'white'},
  styleLabel: {fontSize: 15, color: 'black', fontWeight: '500'},
  button: {
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
    borderRadius: 10,
  },
});
export default CustomAppBarEdit;
