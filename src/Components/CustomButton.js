import React from 'react';
import {Image, TouchableOpacity, Text} from 'react-native';
const CustomButton = props => {
  const {
    label,
    styleLabel,
    styleButton,
    onPress,
    IconSvg,
    iconSvgStyle,
    source,
    styleImage,
  } = props;
  return (
    <TouchableOpacity style={styleButton} onPress={onPress}>
      {IconSvg && (
        <IconSvg width={iconSvgStyle?.width} height={iconSvgStyle?.height} />
      )}
      {source && (
        <Image source={source} style={styleImage} resizeMode={'cover'} />
      )}
      {label && <Text style={styleLabel}>{label}</Text>}
    </TouchableOpacity>
  );
};
export default CustomButton;
