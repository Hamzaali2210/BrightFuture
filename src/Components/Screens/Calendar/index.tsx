import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import fontFamily from '../../../styles/fontFamily'
import { textScale } from '../../../styles/responsiveSize'
import colors from '../../../styles/colors'

const Calendar = () => {
  return (
    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
      <Text style={{fontSize:textScale(14),fontFamily:fontFamily.Poppins_Medium,color:colors.black}}>no classes scheduled by instructor yet</Text>
    </View>
  )
}

export default Calendar

const styles = StyleSheet.create({})