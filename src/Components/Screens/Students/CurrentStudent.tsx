import { StyleSheet, Text, View,FlatList } from 'react-native'
import React from 'react'
import StudentCard from '../../Layout/Card/StudentCard'

const CurrentStudent = () => {
  return (
    <View>
      <FlatList
      data={['','','']}
      nestedScrollEnabled
      renderItem={()=> <StudentCard/>}
      />
   
     

    </View>
  )
}

export default CurrentStudent

const styles = StyleSheet.create({})