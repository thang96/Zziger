import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {colors, icons} from '../Constants';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
const CustomCheckBox = props => {
  const {
    titleLeft,
    styleTitleLeft,
    titleRight,
    styleTitleRight,
    viewCheckBox,
    value,
    onPress,
  } = props;
  return (
    <View style={viewCheckBox}>
      <View style={styles.eachContainer}>
        {titleLeft && (
          <Text
            style={[
              styles.textTitle,
              {
                marginRight: 5,
                color: value ? colors.backgroundButton : 'black',
              },
              styleTitleLeft,
            ]}>
            {titleLeft}
          </Text>
        )}
        <TouchableOpacity onPress={onPress}>
          <Image
            style={{
              width: 20,
              height: 20,
              tintColor: value ? colors.backgroundButton : 'black',
            }}
            source={value ? icons.ic_check_box : icons.ic_empty_check_box}
          />
        </TouchableOpacity>
        {titleRight && (
          <Text
            style={[
              styles.textTitle,
              {
                marginRight: 5,
                color: value ? colors.backgroundButton : 'black',
              },
              styleTitleRight,
            ]}>
            {titleRight}
          </Text>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  eachContainer: {flexDirection: 'row', flex: 1, alignItems: 'center'},
  textTitle: {fontSize: 18, fontWeight: 'bold'},
});
export default CustomCheckBox;
