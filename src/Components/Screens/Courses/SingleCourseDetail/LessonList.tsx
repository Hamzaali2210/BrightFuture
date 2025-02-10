import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import LessonItem from './LessonItem';
import {
  moderateScaleVertical,
  verticalScale,
} from '../../../../styles/responsiveSize';
import colors from '../../../../styles/colors';

function LessonList({ isScroll }) {
  if (isScroll) {
    return (
      <ScrollView style={styles.container} nestedScrollEnabled>
        <LessonItem />
        <LessonItem />
        <LessonItem />
        <LessonItem />
        <LessonItem />
        <LessonItem />
        <LessonItem />
        <LessonItem />
        <LessonItem />
        <LessonItem />
        <LessonItem />
        <LessonItem />
        <LessonItem />
        <LessonItem />
      </ScrollView>
    );
  }
  return (
    <View style={styles.container}>
      <LessonItem />
      <LessonItem />
      <LessonItem />
      <LessonItem />
      <LessonItem />
      <LessonItem />
      <LessonItem />
      <LessonItem />
      <LessonItem />
      <LessonItem />
      <LessonItem />
      <LessonItem />
      <LessonItem />
      <LessonItem />
    </View>
  );
}

export default LessonList;

const styles = StyleSheet.create({
  container: {
    // flex:1,
    marginBottom: verticalScale(10),

    // height:500,
    // backgroundColor:colors.red,

    gap: moderateScaleVertical(12),
    marginTop: moderateScaleVertical(10),
  },
});
