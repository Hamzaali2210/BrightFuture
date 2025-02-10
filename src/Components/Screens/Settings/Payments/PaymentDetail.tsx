import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PurchasedCourseDetail from '../PurchasedCourseDetail'
import { useRoute } from '@react-navigation/native'

const PaymentDetail = () => {
  const route = useRoute()
  const {params}:any = route;


  return (
   <PurchasedCourseDetail checklist paymentType={params?.type}/>
  )
}

export default PaymentDetail

const styles = StyleSheet.create({})