import React, {useState} from 'react';
import {StyleSheet, View, Image, Text, TextInput} from 'react-native';
import {colors, icons} from '../Constants';
import CustomButton from './CustomButton';
import CustomPicker from './CustomPicker';
const CustomChangeValue = props => {
  const {
    title,
    content,
    keyboardType,
    placeholder,
    type,
    onChangeTextInput,
    valueInput,
    onPress,
  } = props;
  return (
    <View style={styles.viewContainer}>
      <Text style={styles.textTitle}>{title}</Text>
      {type == 'text' && <Text style={styles.textContent}>{content}</Text>}
      {type == 'textInput' && (
        <View style={styles.viewRow}>
          <TextInput
            keyboardType={keyboardType}
            placeholder={placeholder}
            style={{flex: 1, color: 'grey'}}
            onChangeText={onChangeTextInput}
            value={valueInput}
          />
          <CustomButton
            source={icons.ic_arrow_down}
            styleImage={{width: 25, height: 25}}
            styleButton={styles.buttonDown}
            onPress={onPress}
          />
        </View>
      )}
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
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 220,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 5,
  },
  buttonDown: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default CustomChangeValue;
