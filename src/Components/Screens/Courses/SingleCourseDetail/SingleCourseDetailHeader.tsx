import {
  Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import React from 'react';
import {
  height, moderateScale, moderateScaleVertical, textScale,
} from '../../../../styles/responsiveSize';
import colors from '../../../../styles/colors';
import imagePath from '../../../../constants/imagePath';
import BackBtn from '../../../../assets/images/Icons/backBtn.svg';
import NotificationBtn from '../../../../assets/images/Icons/msgNotification.svg';
import commonStyles from '../../../../styles/commonStyles';
import fontFamily from '../../../../styles/fontFamily';
import FastImage from 'react-native-fast-image';
import { IMAGE_API_URL } from '../../../../utils/urls';

function SingleCourseDetailHeader({ handleBack,courseData }: any) {

  return (
    <View style={{ marginBottom: moderateScale(20) }}>
      <View style={{}}>
        <ImageBackground
          source={imagePath.mathBlue}
          // resizeMode="contain"
          style={styles.backImg}
      >
          <View style={[styles.backImgContainer, commonStyles.spacingCommon]}>
            <TouchableOpacity style={{ flex: 1 }} onPress={handleBack}>
              <BackBtn width={55} height={55} />
            </TouchableOpacity>
            <TouchableOpacity>
              <NotificationBtn />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
      <View
      style={[
        { marginTop: moderateScale(16) },

      ]}
    >
        <View style={[{gap: moderateScale(6)}, commonStyles.spacingCommon]}>
          <Text style={[styles.headerTitle]}>
            {courseData?.name}
          </Text>
          <View style={[styles.instructorDetailContainer]}>
            <Text
              style={[
                {
                  fontSize: textScale(14),
                  fontFamily: fontFamily.Poppins_Medium,
                  color: colors.black,
                },
              ]}
          >
              Instructor
            </Text>
            <View style={[styles.instructorDetailContainer]}>
              <View style={[styles.instructorDetailImageContainer]}>
                <FastImage
                  style={styles.instructorDetailImage}
                  source={{uri: `${IMAGE_API_URL}${courseData?.instructor?.avatar}` || courseData?.instructor?.avatar}}
                />
              </View>
              <Text
                style={{
                  fontFamily: fontFamily.Poppins_Light,
                  color: colors.themeDark,
                  fontSize: textScale(14),
                }}
            >
                {courseData?.instructor?.full_name}
              </Text>
            </View>
          </View>
        </View>
        <View style={[styles.backGreyContainer, commonStyles.spacingCommon]}>
          <View style={[styles.greyContainerText]}>
          <Text style={styles.greyContTextHeading}>24</Text>
          <Text style={styles.greyContTextSubHeading}>Lectures</Text>
          </View>
          <View style={[styles.greyContainerText]}>
          <Text style={styles.greyContTextHeading}>25,000</Text>
          <Text style={styles.greyContTextSubHeading}>Students</Text>
          </View>
          <View style={[styles.greyContainerText]}>
          <Text style={styles.greyContTextHeading}>13h 40m</Text>
          <Text style={styles.greyContTextSubHeading}> Course Duration</Text>
          </View>
        </View>
      </View>
    </View>

  );
}

export default SingleCourseDetailHeader;

const styles = StyleSheet.create({
  backImg: {
    backgroundColor: 'blue',
    // flex: 1,
    flexDirection: 'row',
    // height:"100%",
    paddingVertical: moderateScaleVertical(50),

    alignItems: 'center',
  },
  backImgContainer: {
    marginTop: moderateScaleVertical(20),
    flexDirection: 'row',
    // flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  headerTitle: {
    fontFamily: fontFamily.Poppins_SemiBold,
    fontSize: textScale(18),
    color: colors.black,
  },
  instructorDetail: {},
  instructorDetailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  instructorDetailImageContainer: {
    width: moderateScale(25),
    height: moderateScaleVertical(25),
    overflow: 'hidden',
    borderRadius: moderateScale(100),
    marginLeft: moderateScale(12),
    marginRight: moderateScale(6),
    justifyContent: 'center',
  },
  instructorDetailImage: {
    width: '100%',
    height: '100%',
  },
  backGreyContainer: {
    backgroundColor: colors.containerGrey,
    marginTop: moderateScaleVertical(14),
    flexDirection: 'row',
    paddingVertical: moderateScaleVertical(18),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  greyContainerText: {
    alignItems: 'center',

  },
  greyContTextHeading: {
    fontFamily: fontFamily.Poppins_Medium,
    color: colors.black,
    fontSize: textScale(18),
  },
  greyContTextSubHeading: {
    fontFamily: fontFamily.Poppins_Regular,
    color: colors.blackGreyDark,
    fontSize: textScale(14),
  }
});
