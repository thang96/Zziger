import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, View, Dimensions, ScrollView, Text} from 'react-native';
import CustomAppBarEdit from '../../../Components/CustomAppBarEdit';
import {colors, icons, images} from '../../../Constants';
const ManuscriptEditing = () => {
  const [isFront, setIsFront] = useState(true);
  const route = useRoute();
  const navigation = useNavigation();
  console.log(route.params?.isFront);
  return (
    <View style={styles.container}>
      <CustomAppBarEdit
        onPressHomeButton={() => navigation.navigate('HomeScreen')}
        onPressFinishButton={() => {
          console.log('finish');
        }}
      />
      <Text>ManuscriptEditing</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
});

export default ManuscriptEditing;
