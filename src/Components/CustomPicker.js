import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  FlatList,
} from 'react-native';
const CustomPicker = props => {
  const {data, onPress, modalVisible, onRequestClose} = props;
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={onRequestClose}>
        <View style={styles.eachContainer}>
          <FlatList
            keyExtractor={data?.label}
            data={data}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() => onPress(item?.value)}
                key={index}
                style={styles.button}>
                <Text style={styles.textRender}>{item?.value}</Text>
              </TouchableOpacity>
            )}
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
    height: '100%',
    backgroundColor: 'rgba(119,119,119,0.5)',
  },
  eachContainer: {
    position: 'absolute',
    width: '100%',
    height: 250,
    zIndex: 9999,
    backgroundColor: 'white',
    bottom: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 10,
  },
  button: {
    width: '100%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textRender: {fontSize: 16, fontWeight: 'bold', color: 'black'},
});
export default CustomPicker;
