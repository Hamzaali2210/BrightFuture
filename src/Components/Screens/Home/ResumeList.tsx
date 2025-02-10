import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import HomeFeatHeading from '../../Layout/Typography/HomeFeatHeading';
import { mainStrings } from '../../../constants/mainstrings';
import commonStyles from '../../../styles/commonStyles';
import { moderateScale, verticalScale } from '../../../styles/responsiveSize';
import ResumeItem from './ResumeItem';

function ResumeList() {
  return (
    <View style={[styles.container, commonStyles.spacingCommon]}>
      <HomeFeatHeading title={mainStrings.ResumeCourses} />
      <View style={[styles.resumeList]}>
        <ResumeItem />
        <ResumeItem />
      </View>
    </View>
  );
}

export default ResumeList;

const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(10),
  },
  resumeList: {
    gap: moderateScale(20),
  },
});
