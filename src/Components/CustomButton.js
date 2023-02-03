import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Text} from 'react-native';
const CustomButton = props => {
  const {styleViewButton, label, styleLabel, styleButton, onPress} = props;
  return (
    <View style={styleViewButton}>
      <TouchableOpacity style={styleButton} onPress={onPress}>
        {label && <Text style={styleLabel}>{label}</Text>}
      </TouchableOpacity>
    </View>
  );
};
export default CustomButton;
