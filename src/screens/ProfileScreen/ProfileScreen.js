import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from './ProfileScreenStyle';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {validateEmail} from '../../utils';
import {ASYNC_KEYS} from '../../utils/constant';
import * as Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoJS from 'react-native-crypto-js';
import Config from 'react-native-config';
const ProfileScreen = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const USER_SECRET_KEY = Config.USER_SECRET_KEY;

  const loginFunc = async () => {
    if (email.length > 0 && userName.length > 0 && password.length > 0) {
      if (validateEmail(email)) {
        // Encrypt
        let encryptedEmail = CryptoJS.AES.encrypt(
          email,
          USER_SECRET_KEY,
        ).toString();
        let encryptedUserName = CryptoJS.AES.encrypt(
          userName,
          USER_SECRET_KEY,
        ).toString();
        let encryptedPassword = CryptoJS.AES.encrypt(
          password,
          USER_SECRET_KEY,
        ).toString();
        await Keychain.setGenericPassword(encryptedEmail, encryptedPassword);

        await AsyncStorage.setItem(ASYNC_KEYS.USER_DETAIL, encryptedUserName);

        navigation.navigate('CardDetailScreen');
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
        <Text style={styles.title}>Hi!</Text>
        <Text style={styles.subTitle}>Create a new account</Text>
      </View>
      <View style={styles.body}>
        <CustomInput
          value={userName}
          onChange={value => {
            setUserName(value);
          }}
          placeholder={'Username'}
        />
        <View style={styles.spacer} />
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
          buttonName={'Sign Up'}
          onPress={() => {
            loginFunc();
          }}
        />
      </View>
      <View style={styles.createButtonView}>
        <Text style={styles.accountText}>Already have an account ?</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('LoginScreen');
          }}>
          <Text style={styles.buttonText}>SignIn</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
