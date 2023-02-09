import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {colors} from '../Constants';
import CustomButton from './CustomButton';
const CustomTwoButtonTop = props => {
  const {isFront, labelLeft, labelRight, onPressLeft, onPressRight} = props;
  return (
    <View style={styles.viewContainer}>
      <CustomButton
        styleButton={[
          styles.styleButtonChildren,
          {
            borderBottomColor: isFront
              ? colors.backgroundButton
              : colors.backgroundInput,
          },
        ]}
        label={labelLeft}
        styleLabel={[
          styles.styleLabel,
          {color: isFront ? colors.backgroundButton : 'grey'},
        ]}
        onPress={onPressLeft}
      />
      <CustomButton
        styleButton={[
          styles.styleButtonChildren,
          {
            borderBottomColor: !isFront
              ? colors.backgroundButton
              : colors.backgroundInput,
          },
        ]}
        label={labelRight}
        styleLabel={[
          styles.styleLabel,
          {color: !isFront ? colors.backgroundButton : 'grey'},
        ]}
        onPress={onPressRight}
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
    justifyContent: 'space-between',
  },
  styleButtonChildren: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: 56,
    borderBottomWidth: 5,
  },
  styleLabel: {fontSize: 16, fontWeight: '500'},
});
export default CustomTwoButtonTop;
