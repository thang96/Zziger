import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  AppState,
  ScrollView,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import CustomAppbar from '../../Components/CustomAppBar';
import CustomButton from '../../Components/CustomButton';
import {colors, icons} from '../../Constants';
const AssignDesign = props => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState('');

  return (
    <View style={styles.container}>
      <CustomAppbar
        styleAppBar={{paddingHorizontal: 8}}
        iconLeft={icons.ic_back}
        iconRight2={icons.ic_bell}
        iconRight1={icons.ic_shopping}
        title={'Assign Design'}
        onPressLeftIcon={() => navigation.goBack()}
      />
      <ScrollView style={styles.eachContainer}>
        <View style={[styles.viewBox, {marginTop: 30}]}>
          <Text style={styles.title}>
            {"If you can't edit it to you liking.\nentrust it to me"}
          </Text>
          <CustomSelected
            content={'Almost the same as the original 10,000won'}
            selected={selected}
            onPress={() => setSelected(true)}
          />
          <CustomSelected
            content={'Indentical to the original 20,000won'}
            selected={!selected}
            onPress={() => setSelected(false)}
          />
        </View>
        <View
          style={[
            styles.viewBox,
            {marginTop: 20, height: 200, paddingHorizontal: 10},
          ]}>
          <TextInput
            style={{fontSize: 16, color: 'black'}}
            placeholder={'Message'}
            value={message}
            onChangeText={text => setMessage(text)}
          />
        </View>
      </ScrollView>
      <CustomButton
        title={'FINISH'}
        styleButton={styles.styleButton}
        styleText={styles.styleText}
        onPress={() => navigation.navigate('OrdersScreen')}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1},
  eachContainer: {flex: 1, paddingHorizontal: 10},
  viewBox: {backgroundColor: 'rgba(119,119,119,0.3)', borderRadius: 10},
  title: {
    textAlign: 'center',
    fontSize: 16,
    color: 'black',
    marginVertical: 15,
  },
  imageCheck: {width: 25, height: 25, marginRight: 5},
  viewRow: {flexDirection: 'row', alignItems: 'flex-start'},
  content: {fontSize: 15, color: 'black'},
  styleButton: {height: 60, backgroundColor: colors.backgroundButtonRed},
  styleText: {color: 'white', fontSize: 18, fontWeight: 'bold'},
});

const CustomSelected = props => {
  const {content, onPress, selected} = props;
  return (
    <View style={[styles.viewRow, {paddingHorizontal: 10, marginBottom: 15}]}>
      <TouchableOpacity onPress={onPress}>
        {selected ? (
          <Image style={styles.imageCheck} source={icons.ic_checkBox} />
        ) : (
          <Image style={styles.imageCheck} source={icons.ic_checkBoxEmpty} />
        )}
      </TouchableOpacity>
      <Text style={[styles.content, {width: '80%'}]}>{content}</Text>
    </View>
  );
};

export default AssignDesign;
