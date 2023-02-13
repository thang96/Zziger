import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {colors} from '../Constants';
import CustomButton from './CustomButton';
const CustomTwoButtonBottom = props => {
  const {onPressLeft, onPressRight, labelLeft, labelRight, styleButton} = props;
  return (
    <View style={[styles.viewContainer, styleButton]}>
      <CustomButton
        label={labelLeft}
        onPress={onPressLeft}
        styleButton={styles.styleButton}
        styleLabel={styles.text}
      />
      <CustomButton
        label={labelRight}
        onPress={onPressRight}
        styleButton={styles.styleButton}
        styleLabel={styles.text}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  viewContainer: {
    flexDirection: 'row',
    height: 56,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  styleButton: {
    width: 130,
    backgroundColor: colors.backgroundButton,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {color: 'white', fontSize: 16},
});
export default CustomTwoButtonBottom;
