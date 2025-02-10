import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {moderateScale, textScale} from '../../styles/responsiveSize';
import fontFamily from '../../styles/fontFamily';
import colors from '../../styles/colors';

interface CustomTextInputProps {
  value: string;
  setTimeInput?: React.Dispatch<React.SetStateAction<string>>;
  isError?: boolean;
  handleTimeChange : (input:string) =>void
}

const CustomTimeInput: React.FC<CustomTextInputProps> = ({
  value,
  setTimeInput,
  isError,
  handleTimeChange
}) => {
  


  return (
    <TextInput
      style={[
        styles.input,
        {
          borderColor:
            value !== ''
              ? colors.theme
              : isError
              ? colors.red
              : colors.blackOpacity25,
        },
      ]}
      placeholder="mm:ss"
      value={value}
      onChangeText={handleTimeChange}
      keyboardType="numeric"
      maxLength={5}
    />
  );
};

export default CustomTimeInput;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: moderateScale(12),
    padding: moderateScale(14),
    marginBottom: 10,
    width: moderateScale(140),
    paddingHorizontal: moderateScale(20),
    fontSize: textScale(16),
    fontFamily: fontFamily.Montserrat_Medium,
  },
});
