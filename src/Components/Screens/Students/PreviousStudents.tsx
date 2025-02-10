import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import StudentCard from '../../Layout/Card/StudentCard'

const PreviousStudents = () => {
  return (
    <View>
      <FlatList
      data={['']}
      nestedScrollEnabled
      renderItem={()=> <StudentCard/>}
      />
    </View>
  )
}

export default PreviousStudents

const styles = StyleSheet.create({})