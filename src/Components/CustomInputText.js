import React from 'react';
import {StyleSheet, View, Image, TextInput} from 'react-native';
const CustomInputText = props => {
  const {
    styleViewTextInput,
    styleTextinput,
    placeholder,
    value,
    secureTextEntry,
    onChangeText,
    numberOfLines,
  } = props;
  return (
    <View style={styleViewTextInput}>
      <TextInput
        numberOfLines={numberOfLines ? numberOfLines : 1}
        secureTextEntry={secureTextEntry}
        style={[{flex: 1}, styleTextinput]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};
export default CustomInputText;
