import React, {useEffect, useRef} from 'react';
import {
  StyleSheet,
  Animated,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Easing} from 'react-native-reanimated';
import {colors, icons} from '../Constants';

const CustomOption = props => {
  const {isShow, pressEditValue} = props;

  const move = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    isShow ? menuMoveUp() : menuMoveDown();
  }, [isShow]);
  const menuMoveDown = () => {
    Animated.timing(move, {
      toValue: 56,
      duration: 200,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
  };
  const menuMoveUp = () => {
    Animated.timing(move, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
  };

  return (
    <View>
      {isShow && (
        <Animated.ScrollView
          horizontal
          style={[styles.viewMenu, {transform: [{translateY: move}]}]}>
          <CustomButtonBottom
            source={icons.ic_keyboard}
            label={'edit text'}
            onPress={pressEditValue}
          />
          <CustomButtonBottom
            source={icons.ic_color_text}
            label={'color text'}
          />
          <CustomButtonBottom
            source={icons.ic_color_background}
            label={'background color'}
          />
        </Animated.ScrollView>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  viewMenu: {
    height: 56,
    paddingHorizontal: 20,
  },
});
const CustomButtonBottom = props => {
  const {source, label, onPress} = props;
  return (
    <TouchableOpacity style={styleCustom.button} onPress={onPress}>
      <Image
        source={source}
        style={{width: 20, height: 20, tintColor: colors.backgroundButton}}
      />
      <Text
        style={{
          fontSize: 8,
          color: colors.backgroundButton,
          textAlign: 'center',
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};
const styleCustom = StyleSheet.create({
  button: {
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
});
export default CustomOption;
