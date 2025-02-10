import {StyleSheet, Text, View,Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import commonStyles from '../../../styles/commonStyles';
import {moderateScale, textScale} from '../../../styles/responsiveSize';
import {ratingStar} from '../../../utils/logicFunctions';

import EditButton from '../../../assets/images/Icons/settingsIcon/PenIcon.svg';
import colors from '../../../styles/colors';
import navigationStrings from '../../../constants/navigationStrings';
import useGetData from '../../../hooks/useGetData';
import {endpoints} from '../../../utils/endpoints';
import {useSelector} from 'react-redux';
import imagePath from '../../../constants/imagePath';

function ProfileContainerName() {
  const [star, setStar] = useState([]);
  const profile = useSelector((state: any) => state.auth.userPayload);
 
  console.log('profileDataprofileDataprofileDataprofileData', profile);

  const navigation = useNavigation();
  useEffect(() => {
    const ratingStarFunc: any = ratingStar(3);
    console.log({
      ratingStarFuncratingStarFuncratingStarFuncratingStarFuncratingStarFunc:
        ratingStarFunc,
    });
    setStar(ratingStarFunc);
  }, []);
  return (
    <View style={[styles.container, commonStyles.spacingCommon]}>
      <View style={[styles.nameContainer]}>
        <View style={[styles.nameStyle]}>
          <Text style={[styles.nameMain]}>{profile?.full_name}</Text>
          <Text style={[styles.position]}>
            {profile?.instructor?.instructorDepartments
              ?.map((item: any) => item?.department?.name)
              ?.join(',')}
          </Text>
          <View style={[styles.ratingContainer]}>
            <View style={[styles.ratingStar]}>
              {star.map(item => (
                <View>{item}</View>
              ))}
            </View>
            <Text style={[styles.ratingText]}>4.5</Text>
          </View>
        </View>
        <View style={[styles.editBtnContainer]}>
        {profile.role===2 && <TouchableOpacity
          onPress={() => {
            navigation.navigate(navigationStrings.EditProfile as never);
          }}
          style={{width:moderateScale(54),height:moderateScale(54),overflow:"hidden"}}
          >
          <Image source={imagePath.editPen} resizeMode='contain' style={{width:"100%",height:"100%"}}/>
        </TouchableOpacity>}
        </View>
      </View>
    </View>
  );
}

export default ProfileContainerName;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: moderateScale(20),
  },
  ratingStar: {
    flexDirection: 'row',
  },
  nameContainer: {
    flexDirection: 'row',
  },
  nameStyle: {
    flex: 1,
    gap: moderateScale(8),
  },
  position: {
    fontFamily: 'Montserrat-Regular',
    fontSize: textScale(14),
    color: colors.darkGrey,
  },
  nameMain: {
    fontFamily: 'Montserrat-Bold',
    fontSize: textScale(24),
    color: colors.black,
  },
  ratingContainer: {
    flexDirection: 'row',
    gap: moderateScale(6),
    alignItems: 'center',
  },
  ratingText: {
    fontFamily: 'Montserrat-Regular',
    color: colors.darkGrey,
  },
  editBtnContainer: {},
});
