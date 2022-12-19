import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Modal,
  Dimensions,
  FlatList,
} from 'react-native';
import {useSelector} from 'react-redux';
import {colors, icons} from '../Constants';
import CustomButtonLogo from './CustomButtonLogo';
import {uuid} from '../Utils/uuid';
const CustomModalChangeColor = props => {
  const {modalVisible, onRequestClose, closeModal, changeColor} = props;
  const backgroundBackStore = useSelector(
    state => state.cardValues.backgroundBack,
  );
  const backgroundFrontStore = useSelector(
    state => state.cardValues.backgroundFront,
  );
  const colorStore = useSelector(state => state?.color?.colorStore);

  const renderColorStore = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => changeColor(item?.value)}
        style={[styles.styleButtonColor, {backgroundColor: item?.value}]}
      />
    );
  };
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={onRequestClose}>
        <View style={[styles.eachContainer, {height: '55%'}]}>
          <View style={styles.viewRow}>
            <Text style={styles.title}>Color</Text>
            <CustomButtonLogo
              source={icons.ic_closeRed}
              styleButton={{width: 25, height: 25}}
              onPress={closeModal}
            />
          </View>
          <View style={styles.viewListColor}>
            <View style={styles.viewColorItem}>
              <TouchableOpacity
                style={[
                  styles.styleButtonColor,
                  {backgroundColor: backgroundFrontStore[0]?.tintColor},
                ]}
              />
            </View>
            <Text style={styles.content}>Choose Color</Text>
            <FlatList
              numColumns={8}
              data={colorStore}
              keyExtractor={uuid}
              renderItem={({item, index}) => renderColorStore(item, index)}
            />
          </View>
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
  content: {color: 'grey', fontWeight: '500', fontSize: 16, marginBottom: 5},
  viewListColor: {
    paddingHorizontal: 10,
    flex: 1,
  },
  viewColorItem: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  styleButtonColor: {
    width: 30,
    height: 30,
    margin: 5,
    borderRadius: 5,
    borderWidth: 0.2,
  },
});
export default CustomModalChangeColor;
