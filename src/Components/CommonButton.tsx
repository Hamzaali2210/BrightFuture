import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC} from 'react';
import {moderateScale, textScale} from '../styles/responsiveSize';
import colors from '../styles/colors';
import fontFamlity from '../styles/fontFamily';
import DeviceInfo from 'react-native-device-info';

interface commonButtonProps {
  btnText?: string;
  mainViewStyle?: ViewStyle;
  onPressBtn?: () => void;
  loading?: boolean;
}

const CommonButton: FC<commonButtonProps> = ({
  btnText,
  mainViewStyle,
  onPressBtn,
  loading,
}) => {
  return (
    <TouchableOpacity onPress={onPressBtn} disabled={loading}>
      <View
        style={[styles.btnStyle, mainViewStyle, {opacity: loading ? 0.4 : 1}]}>
        <Text style={[styles.txtStyle]}>{btnText}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CommonButton;

const styles = StyleSheet.create({
  btnStyle: {
    margin: moderateScale(16),
    backgroundColor: colors.theme,
    paddingVertical: moderateScale(20),
    borderRadius: moderateScale(16),
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    // height: moderateScale(50),
  },
  txtStyle: {
    color: colors.white,
    fontSize: DeviceInfo.isTablet()?20:textScale(16),
    fontFamily: fontFamlity.Montserrat_Bold,
  },
});
