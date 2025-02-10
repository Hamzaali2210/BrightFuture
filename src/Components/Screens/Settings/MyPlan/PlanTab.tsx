import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { moderateScale, moderateScaleVertical, textScale } from '../../../../styles/responsiveSize'
import colors from '../../../../styles/colors'
import fontFamily from '../../../../styles/fontFamily'
import { PlanTabInterface } from '../../../../types/componentInterface'
const PlanTab:React.FC<PlanTabInterface> = ({activeColor,handleActive}) => {
    
    
  return (
    <View
    style={{
      flexDirection: 'row',
      width: '100%',
      marginVertical: moderateScaleVertical(14),
      borderBottomWidth: 1,
      borderColor: colors.grey1,
    //   marginHorizontal: moderateScale(12),
    }}>
    <TouchableOpacity
      style={[
        styles.tabStyle,
        {
          backgroundColor:
            activeColor === 0 ? colors.themeYellow : 'transparent',
        },
      ]}
      onPress={() => handleActive(0)}>
      <Text
        style={[
          styles.textTab,
          {color: activeColor === 0 ? colors.white : colors.grey1},
        ]}>
        Subsription Plan
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[
        styles.tabStyle,
        {
          backgroundColor:
            activeColor === 1 ? colors.themeYellow : 'transparent',
        },
      ]}
      onPress={() => handleActive(1)}>
      <Text
        style={[
          styles.textTab,
          {color: activeColor === 1 ? colors.white : colors.grey1},
        ]}>
        Check Request
      </Text>
    </TouchableOpacity>
  </View>
  )
}

export default PlanTab

const styles = StyleSheet.create({
    tabStyle: {
        borderTopLeftRadius: moderateScale(18),
        borderTopRightRadius: moderateScale(18),
        backgroundColor: colors.themeYellow,
        padding: moderateScale(12),
        flex: 1,
        paddingHorizontal: moderateScale(16),
      },
      textTab: {
        color: colors.white,
        fontSize: textScale(16),
        textAlign: 'center',
        fontFamily: fontFamily.Poppins_Medium,
      },
})