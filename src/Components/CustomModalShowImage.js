import React from 'react';
import {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import {colors, icons} from '../Constants';

const CustomModalShowImage = props => {
  const {onRequestClose, modalVisible, source, isShow} = props;
  const widthWindow = Dimensions.get('window').height - 40;
  if (!isShow) {
    return null;
  }
  return (
    // <Modal
    //   animationType="fade"
    //   transparent={true}
    //   visible={modalVisible}
    //   onRequestClose={onRequestClose}>
    <View style={styles.eachContainer}>
      <Image
        source={source ? {uri: source} : icons.ic_rotate}
        style={{
          width: widthWindow * 1.8,
          height: widthWindow,
          flex: 1,
        }}
        resizeMode={'contain'}
      />
    </View>
    // </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  eachContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  styleButtonIcon: {
    width: 40,
    height: 40,
    marginVertical: 10,
    transform: [{rotate: '90deg'}],
  },
});
export default CustomModalShowImage;
