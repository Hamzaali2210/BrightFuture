import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {CustomInputIcon} from '../../types/uiType';
import {
  moderateScale,
  moderateScaleVertical,
  scale,
  textScale,
} from '../../styles/responsiveSize';
import fontFamily from '../../styles/fontFamily';
import colors from '../../styles/colors';
import DeviceInfo from 'react-native-device-info';

const CustomIconInput: React.FC<CustomInputIcon> = ({
  onChangeText,
  placeholder,
  value,
  isError,
  icon,
  secure,
  handleIconPress,
}) => {
  return (
    <View
      style={{
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
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={colors.grey1}
        value={value}
        style={{
          flex: 1,
          paddingHorizontal: moderateScale(20),
          fontSize:DeviceInfo.isTablet()?20: textScale(16),
          color:colors.theme,
          fontFamily: fontFamily.Montserrat_Medium,
        }}
        secureTextEntry={secure}
        onChangeText={onChangeText}
      />
      <View style={{marginRight: scale(14)}}>
        <TouchableOpacity onPress={handleIconPress}>{icon}</TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomIconInput;

const styles = StyleSheet.create({});
