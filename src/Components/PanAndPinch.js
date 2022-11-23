import React, {useEffect, useMemo, useRef} from 'react';
import {Image, StyleSheet, View, TouchableOpacity} from 'react-native';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  RotationGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {icons} from '../Constants';
const clamp = (value, lowerBound, upperBound) => {
  'worklet';
  return Math.min(Math.max(lowerBound, value), upperBound);
};
function PanAndPinch(props) {
  const {
    x,
    y,
    limitationHeight,
    limitationWidth,
    height,
    width,
    onDragEnd,
    onResizeEnd,
    onRotateEnd,
    children,
    resizerImageSource = require('../assets/icons/resize.png'),
    closeImageSource = icons.ic_closeRed,
    style,
    isSelected,
    onRemove,
    rotate,
  } = props;
  const xRef = useRef(x);
  const yRef = useRef(y);
  const heightRef = useRef(height);
  const widthRef = useRef(width);
  const boxX = useSharedValue(0);
  const boxY = useSharedValue(0);
  const boxHeight = useSharedValue(heightRef.current ?? 100);
  const boxWidth = useSharedValue(widthRef.current ?? 100);
  const rotation = useSharedValue(0);
  const savedRotation = useSharedValue(0);
  useEffect(() => {
    boxX.value = withTiming(xRef.current);
    boxY.value = withTiming(yRef.current);
  }, [boxX, boxY]);
  useEffect(() => {
    savedRotation.value = (rotate * Math.PI) / 180;
  }, [rotate]);
  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_ev, ctx) => {
      ctx.offsetX = boxX.value;
      ctx.offsetY = boxY.value;
      ctx.boxWidth = boxWidth.value;
      ctx.boxHeight = boxHeight.value;
      ctx.rotate = rotation.value;
    },
    onActive: (ev, ctx) => {
      if (!isSelected) {
        return;
      }
      boxX.value = clamp(
        ctx.offsetX + ev.translationX,
        -boxWidth.value / 2,
        limitationWidth - boxWidth.value / 2,
      );
      boxY.value = clamp(
        ctx.offsetY + ev.translationY,
        -boxHeight.value / 2,
        limitationHeight - boxHeight.value / 2,
      );
    },
    onFinish: () => {
      if (onDragEnd) {
        runOnJS(onDragEnd)({
          x: boxX.value,
          y: boxY.value,
          height: boxHeight.value,
          width: boxWidth.value,
          rotate: rotation.value,
        });
      }
    },
  });
  const resizeHandler = useAnimatedGestureHandler({
    onStart: (_ev, ctx) => {
      ctx.offsetX = boxX.value;
      ctx.offsetY = boxY.value;
      ctx.boxWidth = boxWidth.value;
      ctx.boxHeight = boxHeight.value;
      ctx.rotate = rotation.value;
    },
    onActive: (ev, ctx) => {
      if (!isSelected) {
        return;
      }
      boxWidth.value = clamp(
        ctx.boxWidth + ev.translationX,
        30,
        limitationWidth - boxX.value,
      );
      boxHeight.value = clamp(
        ctx.boxHeight + ev.translationY,
        30,
        limitationHeight - boxY.value,
      );
    },
    onFinish: () => {
      'worklet';
      if (onResizeEnd) {
        runOnJS(onResizeEnd)({
          x: boxX.value,
          y: boxY.value,
          height: boxHeight.value,
          width: boxWidth.value,
          rotate: rotation.value,
        });
      }
    },
  });
  const rotateHandler = useAnimatedGestureHandler({
    onStart: (_ev, ctx) => {
      ctx.offsetX = boxX.value;
      ctx.offsetY = boxY.value;
      ctx.boxWidth = boxWidth.value;
      ctx.boxHeight = boxHeight.value;
      ctx.rotate = rotation.value;
    },
    onActive: (ev, ctx) => {
      if (!isSelected) {
        return;
      }
      rotation.value = savedRotation.value + ev.rotation;
    },
    onFinish: () => {
      'worklet';
      if (onRotateEnd) {
        runOnJS(onRotateEnd)({
          x: boxX.value,
          y: boxY.value,
          height: boxHeight.value,
          width: boxWidth.value,
          rotate: rotation.value,
        });
      }
    },
  });
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: boxX.value,
      },
      {
        translateY: boxY.value,
      },
      {rotateZ: `${rotation.value}rad`},
    ],
    height: boxHeight.value,
    width: boxWidth.value,
    position: 'absolute',
    flexDirection: 'row',
  }));
  const styles = useMemo(
    () =>
      StyleSheet.create({
        closeBoxStyle: {
          position: 'absolute',
          zIndex: 20,
          elevation: 20,
          right: -5,
          top: 0,
        },
        rotateBoxStyle: {
          position: 'absolute',
          zIndex: 20,
          elevation: 20,
          left: -10,
          top: -10,
        },
        resizeBoxStyle: {
          position: 'absolute',
          zIndex: 20,
          elevation: 20,
          right: -15,
          bottom: -15,
          transform: [{scale: 1}],
        },
        imageStyle: {
          height: 15,
          width: 15,
        },
      }),
    [],
  );
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View>
          <RotationGestureHandler onGestureEvent={rotateHandler}>
            <Animated.View style={[animatedStyle, style]}>
              {isSelected && (
                <View
                  style={[
                    styles.closeBoxStyle,
                    {width: width, height: height},
                  ]}>
                  <View
                    style={[
                      styless.eachViewContainer,
                      {width: width, height: height},
                    ]}>
                    <TouchableOpacity
                      hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
                      onPress={onRemove}
                      style={styless.close}>
                      <Image
                        source={closeImageSource}
                        style={styles.imageStyle}
                        resizeMode={'contain'}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              {isSelected && (
                <PanGestureHandler
                  hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
                  onGestureEvent={resizeHandler}>
                  <Animated.View style={[styles.resizeBoxStyle]}>
                    <Image
                      source={resizerImageSource}
                      style={styles.imageStyle}
                      resizeMode={'contain'}
                    />
                  </Animated.View>
                </PanGestureHandler>
              )}

              {children}
            </Animated.View>
          </RotationGestureHandler>
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
}
const styless = StyleSheet.create({
  viewContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    flex: 1,
    backgroundColor: 'red',
  },
  eachViewContainer: {
    position: 'relative',
  },
  rotation: {
    position: 'absolute',
    top: -10,
    right: -5,
    zIndex: 10,
    elevation: 10,
  },
  close: {
    position: 'absolute',
    top: -15,
    right: -10,
    zIndex: 10,
    elevation: 10,
  },
});

export default PanAndPinch;
