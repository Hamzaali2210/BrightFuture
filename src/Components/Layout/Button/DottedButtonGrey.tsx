import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React, { FC } from 'react'
import { moderateScale, scale, textScale } from '../../../styles/responsiveSize';
import colors from '../../../styles/colors';
import fontFamily from '../../../styles/fontFamily';
import Icon from 'react-native-vector-icons/AntDesign'



interface CommonButtonProps {
    btnText?: string;
    mainViewStyle?: ViewStyle;
    customStyle?: ViewStyle;
    onPressBtn?: () => void;
    loading?: boolean;
  }

const DottedButtonGrey: FC<CommonButtonProps>  = ({
    btnText,
    mainViewStyle,
    onPressBtn,
    loading,
    customStyle
  }) => {
  return (
    <TouchableOpacity onPress={onPressBtn} disabled={loading}>
    <View
      style={[styles.dottedStyle, mainViewStyle, {opacity: loading ? 0.4 : 1}]}>
        <Icon name='upload' color={colors.grey1} size={20}/>

      <Text style={[styles.txtStyle]}>{btnText}</Text>
    </View>
  </TouchableOpacity>
  )
}

export default DottedButtonGrey

const styles = StyleSheet.create({
    dottedStyle:{
        paddingVertical: moderateScale(16),
        borderRadius: moderateScale(12),
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        borderStyle:"dashed",
        flexDirection:"row",
        borderWidth:scale(2),
        borderColor:colors.grey1
    },
    txtStyle:{
        color: colors.grey1,
        fontSize: textScale(14),
        fontFamily: fontFamily.Montserrat_Medium,
        marginLeft:moderateScale(12),
    }

})