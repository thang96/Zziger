import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Text} from 'react-native';
const CustomButton = props => {
  const {styleViewButton, label, styleLabel, styleButton, onPress, IconSvg} =
    props;
  return (
    <View style={styleViewButton}>
      <TouchableOpacity style={styleButton} onPress={onPress}>
        {IconSvg && (
          <IconSvg width={styleButton?.width} height={styleButton?.height} />
        )}
        {label && <Text style={styleLabel}>{label}</Text>}
      </TouchableOpacity>
    </View>
  );
};
export default CustomButton;
