import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {ReactElement} from 'react';
import colors from '../../../styles/colors';
import {
  moderateScale,  
  moderateScaleVertical,
  textScale,
} from '../../../styles/responsiveSize';
import fontFamily from '../../../styles/fontFamily';
import DeviceInfo from 'react-native-device-info';

interface BlueLabelButtonProps {
  handleChange: () => void;
  icon?: ReactElement;
  text: string;
  btnStyle?: ViewStyle;
  txtStyle?: TextStyle;
  disabled?:boolean;
}

const BlueLabelButton: React.FC<BlueLabelButtonProps> = ({

  handleChange,
  icon,
  iconBlue,
  text,
  btnStyle,
  txtStyle,
  disabled
  
}) => {
  return (
    <TouchableOpacity
      onPress={handleChange}
      disabled={disabled}
      style={[styles.btnStyle, btnStyle]}>
       {icon && <View style={{marginRight: moderateScale(10)}}>{icon}</View>}
      {text && <Text style={[styles.txtStyle,txtStyle]}>{text}</Text>}
      {iconBlue && <View style={{marginLeft: moderateScale(2)}}>{iconBlue}</View>}
    </TouchableOpacity>
  );
};

export default BlueLabelButton;

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: colors.theme,
    paddingVertical: moderateScaleVertical(8),
    paddingHorizontal: moderateScale(12),
    borderRadius: moderateScale(1000),
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtStyle: {
    color: colors.white,
    fontFamily: fontFamily.Poppins_SemiBold,
    fontSize:DeviceInfo.isTablet()?textScale(10) :textScale(14),
   
  },
});
