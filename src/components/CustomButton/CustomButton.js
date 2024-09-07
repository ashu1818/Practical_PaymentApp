import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './CustomButtonStyle';

const CustomButton = ({buttonName, onPress}) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        onPress();
      }}>
      <Text style={styles.buttonText}>{buttonName}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
