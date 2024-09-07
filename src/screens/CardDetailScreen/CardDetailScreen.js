import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import CreditCard from 'react-native-credit-card';
import {IMAGES} from '../../assets/images/map';
import {styles} from './CardDetailScreenStyle';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import {useNavigation} from '@react-navigation/native';
import MonthPicker from 'react-native-month-year-picker';
import moment from 'moment';
import CryptoJS from 'react-native-crypto-js';
import {
  validateCardCVV,
  validateCardExpiry,
  validateCardNumber,
} from '../../utils';
import {ASYNC_KEYS} from '../../utils/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';

const CardDetailScreen = () => {
  const SECRET_KEY = Config.SECRET_KEY;
  const navigation = useNavigation();
  const [focused, setFocused] = useState('');
  const [number, setNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onValueChange = (event, newDate) => {
    const selectedDate = newDate;

    setExpiry(moment(selectedDate).format('MM/YY'));

    if (event == 'dateSetAction') {
      setShow(false);
    }
  };

  const onSubmitHandle = async () => {
    if (
      number.length > 0 &&
      expiry.length > 0 &&
      cvv.length > 0 &&
      name.length > 0
    ) {
      if (!validateCardNumber(number)) {
        Alert.alert('Please Enter Valid Card Number');
        return;
      }
      if (!validateCardCVV(cvv)) {
        Alert.alert('Please Enter Valid Card CVV');
        return;
      }
      if (!validateCardExpiry(expiry)) {
        Alert.alert('Please Enter Valid Card Expiry');
        return;
      }
      // Encrypt
      let encryptedNumber = CryptoJS.AES.encrypt(number, SECRET_KEY).toString();
      let encryptedExpiry = CryptoJS.AES.encrypt(expiry, SECRET_KEY).toString();
      let encryptedCvv = CryptoJS.AES.encrypt(cvv, SECRET_KEY).toString();
      let encryptedName = CryptoJS.AES.encrypt(name, SECRET_KEY).toString();

      await AsyncStorage.setItem(
        ASYNC_KEYS.C_CARD_DETAIL,
        JSON.stringify({
          number: encryptedNumber,
          expiry: encryptedExpiry,
          cvv: encryptedCvv,
          name: encryptedName,
        }),
      );

      navigation.navigate('LoginScreen');
    } else {
      Alert.alert('Please Enter Valid Details');
    }
  };

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Image style={styles.backImage} source={IMAGES.back} />
        </TouchableOpacity>
        <Text style={styles.title}>Payment Detail</Text>
        <View />
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.cardView}>
          <CreditCard
            type={'mastercard'}
            imageFront={IMAGES.cardFront}
            imageBack={IMAGES.cardBack}
            shiny={false}
            bar={false}
            focused={focused}
            number={number}
            expiry={expiry}
            cvc={cvv}
            name={name}
          />
        </View>
        <View style={styles.body}>
          <CustomInput
            maxLength={16}
            keyboardType={'number-pad'}
            onChange={value => {
              setNumber(value);
            }}
            placeholder={'Card Number'}
            focusedInput={type => {
              setFocused(type);
            }}
            type="number"
          />
          <CustomInput
            maxLength={14}
            keyboardType={'default'}
            onChange={value => {
              setName(value);
            }}
            focusedInput={type => {
              setFocused(type);
            }}
            type="name"
            placeholder={'Name On Card'}
          />
          <TouchableOpacity
            style={styles.expiryButton}
            onPress={() => {
              setFocused('expiry');
              setShow(!show);
            }}>
            <CustomInput
              style={{width: '40%', borderBottomWidth: 1}}
              editable={false}
              value={expiry}
              maxLength={5}
              keyboardType={'number-pad'}
              onChange={value => {
                if (value.length == 2) {
                  setExpiry(value + '/');
                } else {
                  setExpiry(value);
                }
              }}
              focusedInput={type => {
                setFocused(type);
              }}
              type="expiry"
              placeholder={'Expiry (01/24)'}
            />
          </TouchableOpacity>

          <CustomInput
            style={{width: '35%', borderBottomWidth: 1}}
            keyboardType={'number-pad'}
            focusedInput={type => {
              setFocused(type);
            }}
            type="cvc"
            placeholder={'CVV'}
            onChange={value => {
              setCvv(value);
            }}
            maxLength={3}
          />
        </View>
        <View style={styles.buttonView}>
          <CustomButton
            buttonName={'Submit'}
            onPress={() => {
              onSubmitHandle();
            }}
          />
        </View>
        {show && (
          <MonthPicker
            onChange={onValueChange}
            value={date}
            minimumDate={new Date()}
            maximumDate={new Date(2080, 5)}
            locale="en"
          />
        )}
      </ScrollView>
    </>
  );
};

export default CardDetailScreen;
