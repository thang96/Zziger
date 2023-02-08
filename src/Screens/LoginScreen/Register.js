import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import CustomButton from '../../Components/CustomButton';
import {colors} from '../../Constants';

const Register = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <CustomButton
        styleButton={styles.button}
        label={'개인'}
        styleLabel={styles.text}
        onPress={() => navigation.navigate('RegisterAsAnIndividual')}
      />
      <CustomButton
        styleButton={styles.button}
        label={'개인'}
        styleLabel={styles.text}
        onPress={() => navigation.navigate('RegisterAsABusiness')}
      />
      <CustomButton
        styleButton={styles.button}
        label={'개인'}
        styleLabel={styles.text}
        onPress={() => navigation.navigate('RegisterAsASchool')}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundButton,
  },
  background: {
    width: '100%',
    height: '100%',
  },
  button: {
    width: 150,
    height: 150,
    borderRadius: 150,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
  },
  text: {color: 'black', fontSize: 16, fontWeight: 'bold'},
});

export default Register;
