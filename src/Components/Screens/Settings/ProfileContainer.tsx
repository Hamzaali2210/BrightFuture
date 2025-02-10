import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import commonStyles from '../../../styles/commonStyles';
import {moderateScale, textScale} from '../../../styles/responsiveSize';
import {ratingStar} from '../../../utils/logicFunctions';

import EditButton from '../../../assets/images/Icons/settingsIcon/PenIcon.svg';
import colors from '../../../styles/colors';
import ProfileContainerName from './ProfileContainerName';
import PurchasedCourseList from './PurchasedCourseList';
import CoursesHomeList from '../Home/CoursesHomeList';
import SingleCourseList from '../Courses/SingleCourseList';
import {useSelector} from 'react-redux';
import MyCourse from '../Courses/MyCourse';
import useGetData from '../../../hooks/useGetData';
import {endpoints} from '../../../utils/endpoints';

function ProfileContainer() {
  const profile = useSelector((state: any) => state?.auth?.userPayload);
  const {data: profileData} = useGetData(endpoints.FULL_PROFILE, [
    'FULL_PROFILE',
  ]);
  console.log(
    'profileDataprofileDataprofileDataprofileDataprofileDataprofileData',
    profileData,
  );
  console.log('profileprofileprofileprofileprofile123', profile);

  return (
    <View style={[styles.container]}>
      <ProfileContainerName />
      <View style={[styles.profileDetailContainer, commonStyles.spacingCommon]}>
        <View style={[styles.descriptionContainer]}>
          <Text style={[styles.descHeading]}>Location</Text>
          <Text style={[styles.descDetail]}>
            {profile?.town}, {profile?.location}, {profile?.state}
          </Text>
        </View>
        <View style={[styles.descriptionContainer]}>
          <Text style={[styles.descHeading]}>About</Text>
          <Text style={[styles.descDetail]}>
            {profile?.about}
          </Text>
        </View>
        <View style={[styles.descriptionContainer]}>
          <Text style={[styles.descHeading]}>University</Text>

          <View style={[]}>
            {profileData?.user?.role === 2
              ? profileData?.user?.student?.student_type === 'University'
                ? <Text style={[styles.descDetail]}>{profileData?.user?.student?.university?.name}</Text>
                : <Text>{''}</Text>
              : profileData?.user?.instructor?.instructorUniversities?.map(
                  (item:any) => <Text style={[styles.descDetail]}>{item?.university?.name}</Text>
                )}
          </View>
        </View>
        <View style={[styles.descriptionContainer]}>
          <Text style={[styles.descHeading]}>Department</Text>
          <View style={[]}>
            {profileData?.user?.role === 2
              ? profileData?.user?.student?.student_type === 'University'
                ? <Text style={[styles.descDetail]}>{profileData?.user?.student?.universityDepartment?.name}</Text>
                : <Text>{''}</Text>
              : profileData?.user?.instructor?.instructorDepartments?.map(
                  (item:any) => <Text style={[styles.descDetail]}>{item?.department?.name}</Text>
                )}
          </View>
        </View>

        <View style={[styles.descDocuments]} />
      </View>
      <Text style={[styles.descHeading, commonStyles.spacingCommon]}>
        Courses
      </Text>
      <View style={[commonStyles.spacingCommon]}>
        {profile.role === 3 ? <MyCourse value={''} /> : <SingleCourseList />}
      </View>
    </View>
  );
}

export default ProfileContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: moderateScale(20),
    borderTopLeftRadius: moderateScale(30),
    borderTopRightRadius: moderateScale(30),
    position: 'relative',
    bottom: moderateScale(50),

    backgroundColor: 'white',
  },
  profileDetailContainer: {},
  descriptionContainer: {
    gap: moderateScale(4),
    marginVertical: moderateScale(10),
  },
  descHeading: {
    fontFamily: 'Montserrat-Bold',
    fontSize: textScale(14),
    color: colors.black,
  },

  descDetail: {
    fontFamily: 'Montserrat-Regular',
    fontSize: textScale(12),
    color: colors.darkGrey,
  },
  descDocuments: {},
});
