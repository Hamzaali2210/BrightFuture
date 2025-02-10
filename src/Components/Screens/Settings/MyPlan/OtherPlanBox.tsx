import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { moderateScale, moderateScaleVertical, textScale } from '../../../../styles/responsiveSize'
import colors from '../../../../styles/colors'
import commonStyles from '../../../../styles/commonStyles'
import fontFamily from '../../../../styles/fontFamily'

const OtherPlanBox = () => {
  return (
    <View style={[styles.walletContainer, commonStyles.spacing]}>
    <Text style={[styles.walletContainerMainText]}>6 Months</Text>
    <View style={[styles.walletContainerBottom]}>
      <View style={[styles.walletIconMoneyContainer]}>
       
        <Text style={[styles.walletMoneyText]}>625KD</Text>
        <Text style={[styles.walletText]}>Recurring monthly bill</Text>
      </View>
      <TouchableOpacity>
      <TouchableOpacity style={[styles.btn,{backgroundColor:colors.themeDark}]}>
        <Text style={[styles.btnText,{color:colors.white}]}>
        Upgrade
        </Text>
      </TouchableOpacity>
        <Text style={[styles.walletButtonText]}>7-days free trail</Text>
        <Text style={[styles.walletButtonText]}>Add Money</Text>
      </TouchableOpacity>
    </View>
  </View>
  )
}

export default OtherPlanBox

const styles = StyleSheet.create({
    walletContainer: {
        backgroundColor: '#e6edf3',
        borderWidth: moderateScale(2),
        borderStyle: 'dotted',
        borderColor: colors.themeDark,
        padding: moderateScale(20),
        gap: moderateScale(10),
        paddingHorizontal: moderateScale(16),
        borderRadius: moderateScale(12),
        marginVertical: moderateScaleVertical(14),
      },
      walletContainerMainText: {
        fontFamily:fontFamily.Poppins_Medium,
        fontSize: textScale(15),
        color: colors.black,
        // marginLeft: moderateScale(10),
      },
      walletContainerBottom: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      walletIconMoneyContainer: {
        // flexDirection: 'row',
        flex: 1,
      },
      walletText:{
            fontFamily:fontFamily.Poppins_Regular,
            color:colors.black,
            fontSize:textScale(14),
      },
      walletIconContainer: {},
      walletMoneyText: {
        fontFamily: 'Poppins-Bold',
        fontSize: textScale(20),
        color: colors.themeDark,
      },
      walletButtonText: {
        fontFamily: fontFamily.Poppins_Regular,
        fontSize: textScale(10),
        color: colors.black,
      },
      btn: {
        backgroundColor: colors.white,
        borderRadius: moderateScale(100),
        padding:moderateScale(8),
        paddingHorizontal:moderateScale(10),
        marginBottom:moderateScaleVertical(6),
      },
      btnText: {
        fontFamily: fontFamily.Poppins_SemiBold,
        color: colors.black,
        opacity: 0.8,
        textAlign:"center",
        fontSize: textScale(12),
      },
})