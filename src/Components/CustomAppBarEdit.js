import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {icons} from '../Constants';
import CustomButton from './CustomButton';
const CustomAppBarEdit = props => {
  const {} = props;
  return (
    <View style={styles.container}>
      <CustomButton source={icons.ic_home} styleImage={styles.styleIconHome} />
      <CustomButton
        label={'완료'}
        styleLabel={styles.styleLabel}
        styleButton={styles.button}
      />
    </View>
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
  styleIconHome: {width: 30, height: 30, tintColor: 'white'},
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
