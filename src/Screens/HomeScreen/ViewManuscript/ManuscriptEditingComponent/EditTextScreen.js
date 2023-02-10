import React from 'react';
import {Modal, StyleSheet, View, Dimensions, Text} from 'react-native';
import CustomButton from '../../../../Components/CustomButton';
import {colors, icons} from '../../../../Constants';

const EditTextScreen = props => {
  const {modalVisible, onRequestClose, onPressClose} = props;
  return (
    <View style={[styles.container]}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={onRequestClose}>
        <View style={styles.container}>
          <CustomButton
            source={icons.ic_close}
            styleImage={styles.buttonClose}
            onPress={onPressClose}
          />
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    backgroundColor: 'blue',
    height: '100%',
  },
  eachContainer: {flex: 1, backgroundColor: colors.backgroundInput},
  buttonClose: {width: 30, height: 30, alignSelf: 'center', tintColor: 'red'},
});
export default EditTextScreen;
