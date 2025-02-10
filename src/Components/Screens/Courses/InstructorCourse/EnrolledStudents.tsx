import React from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';

import dayjs from 'dayjs';
import imagePath from '../../../../constants/imagePath';
import useGetData from '../../../../hooks/useGetData';
import colors from '../../../../styles/colors';
import commonStyles from '../../../../styles/commonStyles';
import fontFamily from '../../../../styles/fontFamily';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from '../../../../styles/responsiveSize';
import {EnrolledStudentProps} from '../../../../types/componentInterface';
import {endpoints} from '../../../../utils/endpoints';
import EnrolledStudentsLoader from '../../../Loader/EnrolledStudentLoader';
import {IMAGE_API_URL} from '../../../../utils/urls';

const EnrolledStudentsItems: React.FC<EnrolledStudentProps> = ({
  name,
  price,
  chapterLength,
  paidDate,
  imageLink,
  isVerified,
  subType,
}) => {
  return (
    <View
      style={[
        styles.rowContainer,
        {
          paddingVertical: moderateScaleVertical(16),
          borderBottomColor: 'rgba(217, 217, 217, 0.4)',
          borderBottomWidth: moderateScale(1),
        },
      ]}>
      <View
        style={[
          commonStyles.spacingCommon,
          styles.rowContainer,
          {gap: moderateScale(12)},
        ]}>
        <View style={styles.imageContainer}>
          <Image
            source={imageLink}
            resizeMode="cover"
            style={{width: '100%', height: '100%'}}
          />
        </View>
        <View>
          <View style={styles.rowContainer}>
            <Text style={styles.titleContainer}>{name} </Text>
            <View style={styles.rowContainer}>
              <Image
                source={isVerified ? imagePath.greenCross : imagePath.redCross}
                style={{
                  width: moderateScale(13),
                  height: moderateScaleVertical(13),
                  marginHorizontal: moderateScale(4),
                }}
              />
              <Text
                style={[
                  styles.verfiyText,
                  {color: isVerified ? colors.themeGreen : colors.red},
                ]}>
                {isVerified ? 'Verfied' : 'Unverified'}{' '}
              </Text>
            </View>
          </View>

          <View style={[styles.rowContainer]}>
            <View style={[]}>
              <View style={styles.rowContainer}>
                {/* <Text
                  style={[
                    styles.titleContainer,
                    {
                      fontFamily: fontFamily.Poppins_Bold,
                      fontSize: textScale(16),
                      marginRight: moderateScale(6),
                    },
                  ]}>
                  {price}KD
                </Text> */}

                <View style={styles.priceLabel}>
                  <Text style={styles.textLabel}>
                    {price > 0 ? price + 'KD' : 'Free'}
                  </Text>
                </View>
                <View style={[styles.chapterIconRow]}>
                  <Image
                    source={imagePath.notesGrey}
                    style={{
                      width: moderateScale(12),
                      height: moderateScaleVertical(12),
                    }}
                  />

                  <Text style={[styles.greyText]}>{chapterLength}</Text>
                </View>
                <View style={[styles.chapterIconRow]}>
                  <Image
                    source={imagePath.calBlue}
                    style={{
                      width: moderateScale(12),
                      height: moderateScaleVertical(12),
                    }}
                  />

                  <Text style={[styles.greyText]}>{paidDate}</Text>
                </View>
              </View>
              <Text style={styles.subsText}>Subscription : {subType} </Text>
            </View>

            {/* <TouchableOpacity
              style={[
                {
                  width: moderateScale(60),
                  alignItems: 'flex-end',
                },
              ]}>
              <Icon
                size={20}
                name="dots-three-vertical"
                color={colors.cartBlueGrey}
              />
            </TouchableOpacity> */}
          </View>
        </View>
      </View>
    </View>
  );
};

const EnrolledStudents: React.FC<{courseId: number}> = ({courseId}) => {
  const {data: enrolledStudentList, status}: any = useGetData(
    `${endpoints.ENROLLED_STUDENTS}?course_id=${courseId}`,
    ['AVAILABLE_COUPONS_PACKAGE'],
  );

  console.log(
    'enrolledStudentListenrolledStudentListenrolledStudentList',
    enrolledStudentList,
  );

  if (status === 'pending') {
    return <EnrolledStudentsLoader />;
  }

  return (
    <View>
      <View style={[styles.blueBoxContainer]}>
        {[
          {
            count: enrolledStudentList?.inPersonCount,
            type: 'In-Person',
          },
          {count: enrolledStudentList?.totalStudent, type: 'Total'},
          {count: enrolledStudentList?.onlineCount, type: 'Online'},
        ].map(item => {
          return (
            <View style={[styles.blueBox]}>
              <Text style={[styles.numText]} numberOfLines={1}>
                {item?.count || 0}
              </Text>
              <Text style={[styles.numType]} numberOfLines={2}>
                {item?.type}
              </Text>
              <Image
                source={imagePath.vectorPeople}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  opacity: 0.1,
                  width: moderateScale(58),
                  height: moderateScaleVertical(58),
                }}
              />
            </View>
          );
        })}
      </View>
      <FlatList
        data={enrolledStudentList?.data}
        style={{marginBottom: moderateScaleVertical(40)}}
        renderItem={({item}) => (
          <EnrolledStudentsItems
            name={item?.name}
            price={item?.order_price}
            chapterLength={item?.order_type}
            paidDate={dayjs(item?.order_date).format('DD MMM YYYY')}
            imageLink={
              `${IMAGE_API_URL}${item?.avatar}` ||
              item?.avatar ||
              'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            }
            isVerified={item?.verified_status}
            subType={item?.subscription}
          />
        )}
      />
    </View>
  );
};

export default EnrolledStudents;

const styles = StyleSheet.create({
  greyText: {
    color: colors.cartBlueGrey,
    fontSize: textScale(12),
    fontFamily: fontFamily.Poppins_Regular,
  },
  chapterIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(3),
    marginRight: moderateScale(6),
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    backgroundColor: colors.theme,
    width: moderateScale(42),
    height: moderateScale(42),
    borderRadius: moderateScale(1200),
    overflow: 'hidden',
    resizeMode: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    // alignSelf:"flex-start"
  },
  titleContainer: {
    fontFamily: fontFamily.Poppins_SemiBold,
    color: colors.black,
    fontSize: textScale(14),
  },
  subsText: {
    color: colors.theme,
    fontFamily: fontFamily.Poppins_Regular,
    fontSize: textScale(12),
  },
  verfiyText: {
    fontFamily: fontFamily.Poppins_Medium,
    color: colors.themeGreen2,
    fontSize: textScale(12),
    marginTop: moderateScaleVertical(-2),
  },
  blueBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: moderateScaleVertical(12),
    justifyContent: 'space-evenly',
  },
  blueBox: {
    height:
      width > 750 ? moderateScaleVertical(100) : moderateScaleVertical(80),
    backgroundColor: colors.theme,
    borderRadius: moderateScale(8),
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    width: width > 750 ? moderateScale(150) : moderateScale(110),
  },
  numText: {
    fontFamily: fontFamily.Poppins_Bold,
    fontSize: textScale(18),
    color: colors.white,
  },
  numType: {
    fontFamily: fontFamily.Poppins_Regular,
    fontSize: textScale(14),
    color: colors.white,
    textAlign: 'center',
  },
  priceLabel: {
    alignSelf: 'flex-start',
    backgroundColor: `${colors.theme}10`,
    paddingHorizontal: moderateScale(12),
    marginVertical: moderateScale(3),
    borderRadius: moderateScale(20),
    paddingVertical: moderateScale(2),
  },
  textLabel: {
    fontFamily: fontFamily.Poppins_SemiBold,
    fontSize: moderateScale(14),

    color: colors.theme,
    textAlign: 'center',
  },
});
