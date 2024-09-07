import {View, Text, TouchableOpacity, ScrollView, Alert} from 'react-native';
import React, {useState} from 'react';
import {styles} from './LoginScreenStyle';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import {CommonActions, useNavigation} from '@react-navigation/native';
import * as Keychain from 'react-native-keychain';
import CryptoJS from 'react-native-crypto-js';
import {validateEmail} from '../../utils';
import Config from 'react-native-config';
const LoginScreen = () => {
  const USER_SECRET_KEY = Config.USER_SECRET_KEY;
  console.log('Configsdkjaskdaskida', Config, USER_SECRET_KEY);

  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginFunc = async () => {
    if (email.length > 0 && password.length > 0) {
      if (validateEmail(email)) {
        try {
          const credentials = await Keychain.getGenericPassword();

          let bytesUserName = CryptoJS.AES.decrypt(
            credentials?.username,
            USER_SECRET_KEY,
          );
          let strUserName = bytesUserName.toString(CryptoJS.enc.Utf8);

          let bytesUserPassword = CryptoJS.AES.decrypt(
            credentials?.password,
            USER_SECRET_KEY,
          );
          let strUserPassword = bytesUserPassword.toString(CryptoJS.enc.Utf8);
          if (email == strUserName && password == strUserPassword) {
            navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [
                  {
                    name: 'HomeScreen',
                  },
                ],
              }),
            );
          } else {
            Alert.alert('Invalid Credentials');
          }
        } catch (error) {
          Alert.alert('Invalid Credentials');
        }
      } else {
        Alert.alert('Please Enter Valid Email');
      }
    } else {
      Alert.alert('Please Enter Valid Details');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.titleView}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.subTitle}>Sign in to continue</Text>
      </View>
      <View style={styles.body}>
        <CustomInput
          value={email}
          onChange={value => {
            setEmail(value);
          }}
          placeholder={'Email'}
        />
        <View style={styles.spacer} />
        <CustomInput
          value={password}
          secureTextEntry={true}
          onChange={value => {
            setPassword(value);
          }}
          placeholder={'Password'}
        />
      </View>
      <View style={styles.buttonView}>
        <CustomButton
          buttonName={'Login'}
          onPress={() => {
            loginFunc();
          }}
        />
      </View>
      <View style={styles.createButtonView}>
        <Text style={styles.accountText}>Don't have an account ?</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ProfileScreen');
          }}>
          <Text style={styles.buttonText}>Create</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
