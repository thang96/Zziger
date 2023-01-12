import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {icons} from '../Constants';
import CustomButtonLogo from './CustomButtonLogo';

const CustomSubMenu = props => {
  const {
    firtOnpress,
    secondOnpress,
    thirdOnpress,
    fourthOnpress,
    fifthOnpress,
  } = props;
  return (
    <View style={styles.subMenu}>
      <ScrollView horizontal>
        <CustomButtonLogo
          styleButton={styles.styleButton}
          source={icons.ic_colors}
          onPress={firtOnpress}
        />
        <CustomButtonLogo
          styleButton={styles.styleButton}
          source={icons.ic_template}
          onPress={secondOnpress}
        />
        <CustomButtonLogo
          styleButton={styles.styleButton}
          source={icons.ic_changePosition}
          onPress={thirdOnpress}
        />
        <CustomButtonLogo
          styleButton={styles.styleButton}
          source={icons.ic_textColor}
          onPress={fourthOnpress}
        />
        <CustomButtonLogo
          styleButton={styles.styleButton}
          source={icons.ic_editModal}
          onPress={fifthOnpress}
        />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  subMenu: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 56,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  styleButton: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
});
export default CustomSubMenu;
