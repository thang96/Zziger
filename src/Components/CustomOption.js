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

const CustomLoading = props => {
  const {isShow} = props;

  const move = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    isShow ? menuMoveUp() : menuMoveDown();
  }, [isShow]);

  const menuMoveDown = () => {
    Animated.timing(move, {
      toValue: 56,
      duration: 200,
      useNativeDriver: true,
      easing: Easing.ease,
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
          <CustomButtonBottom source={icons.ic_keyboard} label={'edit text'} />
          <CustomButtonBottom source={icons.ic_keyboard} label={'edit text'} />
          <CustomButtonBottom source={icons.ic_keyboard} label={'edit text'} />
          <CustomButtonBottom source={icons.ic_keyboard} label={'edit text'} />
          <CustomButtonBottom source={icons.ic_keyboard} label={'edit text'} />
          <CustomButtonBottom source={icons.ic_keyboard} label={'edit text'} />
          <CustomButtonBottom source={icons.ic_keyboard} label={'edit text'} />
          <CustomButtonBottom
            source={icons.ic_fill_color}
            label={'fill color'}
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
  const {source, label} = props;
  return (
    <TouchableOpacity
      style={{
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
      }}>
      <Image
        source={source}
        style={{width: 30, height: 30, tintColor: colors.backgroundButton}}
      />
      <Text style={{fontSize: 10, color: colors.backgroundButton}}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};
export default CustomLoading;
