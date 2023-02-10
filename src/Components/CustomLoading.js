import React from 'react';
import {StyleSheet, Modal, View, Text, ActivityIndicator} from 'react-native';

const CustomLoading = props => {
  const {modalVisible, onRequestClose} = props;
  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={onRequestClose}>
        <View style={styles.eachContainer}>
          <Text style={styles.textLoading}>Loading...</Text>
          <ActivityIndicator size={80} color={'white'} />
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 9999,
  },
  eachContainer: {
    flex: 1,
    backgroundColor: 'rgba(119,119,119,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textLoading: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 15,
  },
});
export default CustomLoading;
