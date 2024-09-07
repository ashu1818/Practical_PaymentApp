import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ASYNC_KEYS} from '../../utils/constant';
import CryptoJS from 'react-native-crypto-js';
import {styles} from './HomeScreenStyle';
import CreditCard from 'react-native-credit-card';
import {IMAGES} from '../../assets/images/map';
import Config from 'react-native-config';

const HomeScreen = () => {
  const SECRET_KEY = Config.SECRET_KEY;
  const USER_SECRET_KEY = Config.USER_SECRET_KEY;
  const [number, setNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');

  const fetchCardDetails = async () => {
    let cardDetails = await AsyncStorage.getItem(ASYNC_KEYS.C_CARD_DETAIL);
    let userName = await AsyncStorage.getItem(ASYNC_KEYS.USER_DETAIL);
    cardDetails = JSON.parse(cardDetails);

    let bytesNumber = CryptoJS.AES.decrypt(cardDetails?.number, SECRET_KEY);
    let strNumber = bytesNumber.toString(CryptoJS.enc.Utf8);

    let bytesCvv = CryptoJS.AES.decrypt(cardDetails?.cvv, SECRET_KEY);
    let strCvv = bytesCvv.toString(CryptoJS.enc.Utf8);

    let bytesName = CryptoJS.AES.decrypt(cardDetails?.name, SECRET_KEY);
    let strName = bytesName.toString(CryptoJS.enc.Utf8);

    let bytesExpiry = CryptoJS.AES.decrypt(cardDetails?.expiry, SECRET_KEY);
    let strExpiry = bytesExpiry.toString(CryptoJS.enc.Utf8);

    let bytesUserName = CryptoJS.AES.decrypt(userName, USER_SECRET_KEY);
    let strUserName = bytesUserName.toString(CryptoJS.enc.Utf8);

    setNumber(strNumber);
    setExpiry(strExpiry);
    setCvv(strCvv);
    setName(strName);
    setUserName(strUserName);
  };
  useEffect(() => {
    fetchCardDetails();
  });
  return (
    <>
      <View style={styles.header}>
        <View></View>
        <Text style={styles.title}>Home</Text>
        <View />
      </View>
      <View style={styles.titleView}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.subTitle}>{userName}</Text>
      </View>
      <View style={styles.cardView}>
        <CreditCard
          type={'mastercard'}
          imageFront={IMAGES.cardFront}
          imageBack={IMAGES.cardBack}
          shiny={false}
          bar={false}
          number={number}
          expiry={expiry}
          cvc={cvv}
          name={name}
        />
      </View>
    </>
  );
};

export default HomeScreen;
