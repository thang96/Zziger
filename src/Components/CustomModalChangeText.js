import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
  FlatList,
  TextInput,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {colors, icons} from '../Constants';
import CustomButtonLogo from './CustomButtonLogo';
import {uuid} from '../Utils/uuid';
import {useState} from 'react';
import {useEffect} from 'react';
import {
  updateValuesBack,
  updateValuesFront,
} from '../Stores/slices/cardValuesSlice';
const CustomModalChangeText = props => {
  const {modalVisible, onRequestClose, closeModal, data, isFront} = props;
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={onRequestClose}>
        <View style={[styles.eachContainer, {height: '55%'}]}>
          <View style={styles.viewRow}>
            <Text style={styles.title}>Change text</Text>
            <CustomButtonLogo
              source={icons.ic_closeRed}
              styleButton={{width: 25, height: 25}}
              onPress={closeModal}
            />
          </View>
          <ScrollView>
            {data.map(
              (
                {
                  color,
                  type,
                  font_size,
                  x,
                  y,
                  text,
                  scaleX,
                  scaleY,
                  width,
                  height,
                  fontSize,
                  colorSecont,
                },
                index,
              ) => (
                <View key={`${text}`}>
                  <InputText
                    text={text}
                    changeValue={textChange => {
                      let itemChange = {
                        color: color,
                        type: type,
                        x: x,
                        y: y,
                        text: textChange,
                        scaleX: scaleX,
                        scaleY: scaleY,
                        width: width,
                        height: height,
                        fontSize: fontSize,
                        colorSecont: colorSecont,
                      };
                      isFront
                        ? dispatch(updateValuesFront({index, itemChange}))
                        : dispatch(updateValuesBack({index, itemChange}));
                    }}
                  />
                </View>
              ),
            )}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  eachContainer: {
    backgroundColor: colors.backgroundInput,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flex: 1,
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: 'rgb(199,199,199)',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
  styleCustomTextInput: {
    backgroundColor: 'white',
    borderRadius: 10,
    flex: 1,
    height: 45,
  },
});
const InputText = props => {
  const {text, changeValue} = props;
  const [textChange, setTextChange] = useState('');
  const endHandleEdit = val => {
    setTextChange(val);
    changeValue(val);
  };
  useEffect(() => {
    setTextChange(text);
  }, []);
  return (
    <View style={{marginBottom: 10}}>
      <Text style={styles.title}>Title</Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TextInput
          onEndEditing={evt => endHandleEdit(evt.nativeEvent.text)}
          style={styles.styleCustomTextInput}
          defaultValue={textChange}
        />
      </View>
    </View>
  );
};
export default CustomModalChangeText;
