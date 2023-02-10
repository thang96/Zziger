import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import CustomAppBarEdit from '../../../Components/CustomAppBarEdit';
import CustomOption from '../../../Components/CustomOption';
import {colors, icons, images} from '../../../Constants';
import EditTextScreen from './ManuscriptEditingComponent/EditTextScreen';
const ManuscriptEditing = () => {
  const [isFront, setIsFront] = useState(true);
  const route = useRoute();
  const navigation = useNavigation();
  const [isShow, setIsShow] = useState(false);
  const [modalEditValue, setModalEditValue] = useState(false);
  return (
    <View style={styles.container}>
      {modalEditValue && (
        <EditTextScreen
          modalVisible={modalEditValue}
          onPressClose={() => setModalEditValue(false)}
        />
      )}
      <CustomAppBarEdit
        onPressHomeButton={() => navigation.navigate('HomeScreen')}
        onPressFinishButton={() => {
          console.log('finish');
        }}
      />
      <View style={{flex: 1, backgroundColor: colors.backgroundInput}}>
        <TouchableOpacity
          onPress={() => {
            setIsShow(prev => (prev == false ? true : false));
          }}
          style={{width: 50, height: 50, backgroundColor: 'red'}}
        />
      </View>
      <CustomOption
        isShow={isShow}
        pressEditValue={() => setModalEditValue(true)}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1},
});

export default ManuscriptEditing;
