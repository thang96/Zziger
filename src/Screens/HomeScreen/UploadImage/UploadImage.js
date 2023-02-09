import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import CustomButton from '../../../Components/CustomButton';
import CustomTwoButtonBottom from '../../../Components/CustomTowButtonBottom';
import CustomTwoButtonTop from '../../../Components/CustomTwoButtonTop';
import {icons} from '../../../Constants';
const UploadImage = () => {
  const navigation = useNavigation();
  const [isFront, setIsFront] = useState(true);
  return (
    <View style={styles.container}>
      <CustomTwoButtonTop
        isFront={isFront}
        labelLeft={'앞면'}
        labelRight={'뒷면'}
        onPressLeft={() => setIsFront(true)}
        onPressRight={() => setIsFront(false)}
      />
      <View style={styles.eachContainer}>
        {isFront ? (
          <RenderFrontCard
            onPressRotateLeft={() => {
              console.log('rotate left front');
            }}
            onPressRotateRight={() => {
              console.log('rotate right front');
            }}
          />
        ) : (
          <RenderBackOfCard
            onPressRotateLeft={() => {
              console.log('rotate left back');
            }}
            onPressRotateRight={() => {
              console.log('rotate right back');
            }}
          />
        )}
      </View>
      <CustomTwoButtonBottom
        labelLeft={'사진 추가'}
        labelRight={'다음단계'}
        onPressLeft={() => {}}
        onPressRight={() => {
          navigation.navigate('ViewManuscript');
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  eachContainer: {flex: 1, paddingHorizontal: 10},
});

const RenderFrontCard = props => {
  const {onPressRotateLeft, onPressRotateRight} = props;
  return (
    <View>
      <View
        style={{
          height: 70,
          width: '100%',
          justifyContent: 'space-around',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <CustomButton
          source={icons.ic_rotate_left}
          styleImage={{width: 50, height: 50}}
          onPress={onPressRotateLeft}
        />
        <CustomButton
          source={icons.ic_rotate_right}
          styleImage={{width: 50, height: 50}}
          onPress={onPressRotateRight}
        />
      </View>
    </View>
  );
};
const RenderBackOfCard = props => {
  const {onPressRotateLeft, onPressRotateRight} = props;
  return (
    <View>
      <View
        style={{
          height: 70,
          width: '100%',
          justifyContent: 'space-around',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <CustomButton
          source={icons.ic_rotate_left}
          styleImage={{width: 50, height: 50}}
          onPress={onPressRotateLeft}
        />
        <CustomButton
          source={icons.ic_rotate_right}
          styleImage={{width: 50, height: 50}}
          onPress={onPressRotateRight}
        />
      </View>
    </View>
  );
};

export default UploadImage;
