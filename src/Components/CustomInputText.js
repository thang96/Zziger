import React from 'react';
import {StyleSheet, View, Image, TextInput} from 'react-native';
const CustomInputText = props => {
  const {styleViewTextInput, styleTextinput, placeholder, value} = props;
  return (
    <View style={styleViewTextInput}>
      <TextInput
        style={[{flex: 1}, styleTextinput]}
        placeholder={placeholder}
        value={value}
      />
    </View>
  );
};
export default CustomInputText;
