import {View, TextInput} from 'react-native';
import React from 'react';
import {styles} from './CustomInputStyle';
import {APP_COLORS} from '../../theme/colors';

const CustomInput = props => {
  return (
    <View style={styles.container}>
      <TextInput
        secureTextEntry={props?.secureTextEntry}
        value={props?.value}
        maxLength={props?.maxLength}
        keyboardType={props?.keyboardType}
        editable={props?.editable}
        placeholder={props?.placeholder}
        placeholderTextColor={APP_COLORS.gray}
        onChangeText={value => {
          props.onChange(value);
        }}
        style={[styles.input, props.style]}
        onFocus={() => {
          props?.focusedInput?.(props?.type);
        }}
        {...props}
      />
    </View>
  );
};

export default CustomInput;
