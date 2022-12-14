import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';
const CustomPicker = props => {
  const {data, onPress, open = false} = props;

  if (!open) return null;

  return (
    <View
      style={{
        position: 'absolute',
        width: '100%',
        height: 250,
        zIndex: 9999,
        backgroundColor: 'white',
        bottom: 0,
        borderRadius: 10,
        paddingHorizontal: 10,
      }}>
      <FlatList
        keyExtractor={data.label}
        data={data}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={onPress(item.value)}
            key={index}
            style={styles.button}>
            <Text style={styles.textRender}>{item.label}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
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
