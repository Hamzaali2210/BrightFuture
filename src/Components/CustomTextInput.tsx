import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../styles/responsiveSize';
import colors from '../styles/colors';
import fontFamily from '../styles/fontFamily';

import {CustomInput} from '../types/uiType';
import DeviceInfo from 'react-native-device-info';

const CustomTextInput: React.FC<CustomInput> = ({
  value = '',
  placeholder,
  isError,
  onChangeText,
  inputStyle,
  containerStyle,
  disable,
  multiline,
  keyboardType
}) => {
  return (
    <View
      style={[{
        height: moderateScaleVertical(58),
        justifyContent: 'center',
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 0.5,


        borderColor:
          value !== ''
            ? colors.theme
            : isError
            ? colors.red
            : colors.blackOpacity25,
        marginVertical: moderateScaleVertical(10),

      },containerStyle]}>
      <TextInput
        placeholder={placeholder}
        value={value}
        editable={!disable}
        placeholderTextColor={colors.grey1}
        multiline={multiline}

        keyboardType={keyboardType}
        style={[{
          flex: 1,
          paddingHorizontal: moderateScale(20),
          fontSize:DeviceInfo.isTablet()?20:textScale(16),
          fontFamily: fontFamily.Montserrat_Medium,
          color:colors.themeDark,
          height:200,

        },inputStyle]}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({});
