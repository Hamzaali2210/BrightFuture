import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React, { FC } from 'react'
import { moderateScale, scale, textScale } from '../../../styles/responsiveSize';
import colors from '../../../styles/colors';
import fontFamily from '../../../styles/fontFamily';


interface CommonButtonProps {
    btnText?: string;
    mainViewStyle?: ViewStyle;
    onPressBtn?: () => void;
    loading?: boolean;
  }

const DottedButton: FC<CommonButtonProps>  = ({
    btnText,
    mainViewStyle,
    onPressBtn,
    loading,
  }) => {
  return (
    <TouchableOpacity onPress={onPressBtn} disabled={loading}>
    <View
      style={[styles.dottedStyle, mainViewStyle, {opacity: loading ? 0.4 : 1}]}>
      <Text style={[styles.txtStyle]}>{btnText}</Text>
    </View>
  </TouchableOpacity>
  )
}

export default DottedButton

const styles = StyleSheet.create({
    dottedStyle:{
        paddingVertical: moderateScale(16),
        borderRadius: moderateScale(12),
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        borderStyle:"dashed",
        borderWidth:scale(2),
        borderColor:colors.theme
    },
    txtStyle:{
        color: colors.theme,
        fontSize: textScale(14),
        fontFamily: fontFamily.Montserrat_Bold,
    }

})