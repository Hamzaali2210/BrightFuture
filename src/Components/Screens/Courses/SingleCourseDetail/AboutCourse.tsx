import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import commonStyles from '../../../../styles/commonStyles';
import {mainStrings} from '../../../../constants/mainstrings';
import fontFamily from '../../../../styles/fontFamily';
import colors from '../../../../styles/colors';
import {
  moderateScale,
  moderateScaleVertical,
  scale,
  textScale,
} from '../../../../styles/responsiveSize';

import BlueTick from '../../../../assets/images/Icons/blueTickAbout.svg';
import { formatTime } from '../../../../utils/logicFunctions';
import DeviceInfo from 'react-native-device-info';


interface AboutCourseProps {
  aboutInfo:string;
  chapterCount:string;
  duration:number;
}

const  AboutCourse:React.FC<AboutCourseProps>=({aboutInfo,chapterCount,duration}) =>{
  
  const list = [
    // { id: 1, feature: `${formatTime(duration)} of on-demand Chapter Duration` },
    { id: 2, feature: `${chapterCount} Chapters` },
    // { id: 3, feature: 'downloadable Notes' },
    { id: 4, feature: 'Certificate of completion' },
  ];

  return (
    <ScrollView
      nestedScrollEnabled
      contentContainerStyle={[
        commonStyles.spacingCommon,
        { gap: moderateScaleVertical(12) },
      ]}
    >
      <View style={[styles.aboutContainer]}>
        <Text style={[styles.courseHeading]}>{mainStrings.Courses}</Text>
        <View>
          <Text style={[styles.feature]}>
            {aboutInfo}
          </Text>
         
        </View>
      </View>
      <View>
        <Text style={[styles.courseHeading]}>
          {mainStrings.ThisCourseIncludes}
        </Text>
        <View style={[styles.aboutContainerList]}>
          {list?.map((item) => (
            <View key={item.id} style={[styles.list]}>
              <BlueTick width={moderateScale(20)} height={moderateScaleVertical(20)}/>
              <Text style={[styles.feature]}>{item.feature}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

export default AboutCourse;

const styles = StyleSheet.create({
  aboutContainer: {
    marginTop: moderateScaleVertical(12),
  },
  courseHeading: {
    fontFamily: fontFamily.Poppins_SemiBold,
    color: colors.theme,
    fontSize: DeviceInfo?.isTablet()?textScale(10):textScale(16),
    marginBottom: moderateScaleVertical(10),
  },
  courseParagraph: {
    fontSize: DeviceInfo?.isTablet()?textScale(8):textScale(13),
    color: colors.blackGreyMedium,
    marginVertical: moderateScaleVertical(4),
  },
  aboutContainerList: {
    gap: moderateScaleVertical(8),
  },
  feature: {
    color: colors.blackGreyMedium,
    fontSize:DeviceInfo?.isTablet()?textScale(10): textScale(15),
    fontFamily: fontFamily.Poppins_Medium,
  },

  list: {
    flexDirection: 'row',
    gap: scale(6),
    alignItems:"center"
  },
});
