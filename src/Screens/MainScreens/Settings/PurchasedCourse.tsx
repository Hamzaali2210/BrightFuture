import {
 ScrollView, StyleSheet, Text, View 
} from 'react-native';
import React from 'react';
import CommonHeader from '../../../Components/CommonHeader';
import PurchasedCourseList from '../../../Components/Screens/Settings/PurchasedCourseList';
import colors from '../../../styles/colors';
import commonStyles from '../../../styles/commonStyles';

function PurchasedCourse() {
  return (
    <View
      style={[styles.container, commonStyles.spacingCommon]}
    >
      <PurchasedCourseList />
    </View>
  );
}

export default PurchasedCourse;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
});
