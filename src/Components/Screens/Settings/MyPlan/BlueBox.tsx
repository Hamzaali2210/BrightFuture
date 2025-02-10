import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { moderateScale, moderateScaleVertical, textScale } from '../../../../styles/responsiveSize'
import fontFamily from '../../../../styles/fontFamily'
import colors from '../../../../styles/colors'

const BlueBox = () => {
  return (
    <View style={[styles.blueBox]}>
    <Text
      style={{
        fontFamily: fontFamily.Poppins_SemiBold,
        fontSize: textScale(14),
        color: colors.white,
      }}>
      3 Courses
    </Text>
    <Text
      style={{
        fontFamily: fontFamily.Poppins_Bold,
        fontSize: textScale(20),
        color: colors.white,
        marginTop: moderateScaleVertical(8),
      }}>
      300KD
    </Text>
    <View style={[styles.planRow]}>
      <View style={{flex: 1}}>
        <Text
          style={{
            fontFamily: fontFamily.Poppins_Medium,
            fontSize: textScale(12),
            color: colors.white,

            marginTop: moderateScaleVertical(8),
          }}>
          Purchased : 12 Oct 20223
        </Text>
      </View>

      <View style={{width: moderateScale(125)}}>
        <Text
          style={{
            fontFamily: fontFamily.Poppins_Medium,
            fontSize: textScale(12),
            color: colors.white,

            marginTop: moderateScaleVertical(8),
          }}>
          Renew Date : 12 Jan 2024
        </Text>
      </View>
    </View>
    <View style={[styles.planRow,{gap:moderateScale(12),marginTop:moderateScaleVertical(12)}]}>
      <TouchableOpacity style={[styles.btn,{backgroundColor:colors.themeYellow}]}>
        <Text style={[styles.btnText,{color:colors.white}]}>
        Upgrade
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.btn]}>
        <Text style={[styles.btnText]}>
        Upgrade
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.btn]}>
        <Text style={[styles.btnText]}>
        Upgrade
        </Text>
      </TouchableOpacity>
    </View>
  </View>
  )
}

export default BlueBox

const styles = StyleSheet.create({
  
      blueBox: {
        backgroundColor: colors.theme,
        borderRadius: moderateScale(12),
        padding: moderateScale(16),
      },
      planRow: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      btn: {
        backgroundColor: colors.white,
        borderRadius: moderateScale(100),
        padding:moderateScale(6),
        paddingHorizontal:moderateScale(10),
      },
      btnText: {
        fontFamily: fontFamily.Poppins_SemiBold,
        color: colors.black,
        opacity: 0.8,
        fontSize: textScale(12),
      },
})