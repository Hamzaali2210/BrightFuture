import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MySubscriptionsCard from '../../Components/Screens/MySubscriptions/MySubscriptionsCard'
import commonStyles from '../../styles/commonStyles'
import useGetData from '../../hooks/useGetData'
import { endpoints } from '../../utils/endpoints'
import { useSelector } from 'react-redux'

const MySubscriptions = () => {
  const userPayload = useSelector((state: any) => state.auth.userPayload);
  console.log('user user user user user ', userPayload);
  const {
    isError: isCourseError,
    error: courseError,
    data: courseData,
    isSuccess: courseSuccess,
    isLoading: courseLoading,
  } = useGetData(`${endpoints.PURCHASED_COURSES}?user_id=${userPayload?.id}&page=1`, ['ORDERS']);
  return (
    <View style={[commonStyles.spacingCommon]}>
          <FlatList data={[12,32,21,12]} renderItem={({item})=>{
            return <MySubscriptionsCard courseListShow item={item} />
          }}/>
    </View>
  )
}

export default MySubscriptions

const styles = StyleSheet.create({})