import React from 'react';
import {Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-community/masked-view';

const GradientText = props => {
  return (
    <MaskedView maskElement={<Text {...props} />}>
      <LinearGradient
        colors={props?.listColor}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <Text {...props} style={[props?.style, {opacity: 0}]} />
      </LinearGradient>
    </MaskedView>
  );
};
export default GradientText;
// <MaskedView
//   maskElement={
//     <Text
//       style={{fontSize: (100 / scale) * scaleX}}>
//       {text}
//     </Text>
//   }>
//   <LinearGradient
//     colors={[color, colorSecont]}
//     start={{x: 0, y: 0}}
//     end={{x: 1, y: 0}}>
//     <Text
//       style={[
//         {fontSize: (100 / scale) * scaleX},
//         {opacity: 0},
//       ]}>
//       {text}
//     </Text>
//   </LinearGradient>
// </MaskedView>
