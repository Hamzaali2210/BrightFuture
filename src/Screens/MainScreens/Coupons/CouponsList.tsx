import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CouponsCard from '../../Layout/Card/CouponsCard'


const index = () => {
  return (
    <View>
      <CouponsCard/>
      <CouponsCard/>
      <CouponsCard/>
    </View>
  )
}

export default index

const styles = StyleSheet.create({})