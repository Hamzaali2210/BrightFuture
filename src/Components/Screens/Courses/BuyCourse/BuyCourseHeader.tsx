import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import React, {useEffect, useState} from 'react';

import Icon from 'react-native-vector-icons/FontAwesome6';
import OnIcon from 'react-native-vector-icons/Octicons';
import SendMsgIcon from '../../../../assets/images/Icons/sendMsgIcon.svg';
import BackBtn from '../../../../assets/images/Icons/backBtn.svg';
import colors from '../../../../styles/colors';
import fontFamily from '../../../../styles/fontFamily';
import CartIcon from '../../../../assets/images/Icons/cart.svg';
import VerifyTickIcon from '../../../../assets/images/Icons/verifyBlack.svg';

import IconMat from 'react-native-vector-icons/MaterialIcons';

import {
  moderateScale,
  moderateScaleVertical,
  scale,
  textScale,
} from '../../../../styles/responsiveSize';
import commonStyles from '../../../../styles/commonStyles';
import imagePath from '../../../../constants/imagePath';
import usePostData from '../../../../hooks/usePostData';
import {endpoints} from '../../../../utils/endpoints';
import {showError, showSuccess} from '../../../../utils/helperFunctions';

import {CourseDataInterface} from '../../../../types/uiType';
import FastImage from 'react-native-fast-image';

import HeartIcon from 'react-native-vector-icons/AntDesign';
import { IMAGE_API_URL } from '../../../../utils/urls';

type courseDataType = {
  data: CourseDataInterface;
};

const SAMPLE_COURSE_IMAGE =
  'https://images.unsplash.com/photo-1560785496-3c9d27877182?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

interface BuyCourseHeaderProps {
  handleBack: () => void;
  handleCart: (item: any, type: string) => void;
  courseData: courseDataType;
  cartLoading: boolean;
}

const BuyCourseHeader: React.FC<BuyCourseHeaderProps> = ({
  handleBack,
  handleCart,

  courseData,
  cartLoading,
}) => {
  console.log(
    'courseData?.datacourseData?.datacourseData?.datacourseData?.datacourseData?.datacourseData?.data',
    courseData,
  );


  const {
    mutate: sendToWishlist,
    isSuccess,
    isError,
    error,
    data: wishlistData,
  } = usePostData(endpoints.STUDENT_WISHLIST, ['STUDENT_WISHLIST']);

  const [heartColor, setHeartColor] = useState(courseData?.data?.is_favourite);

  const handleWishlist = () => {
    sendToWishlist({course_id: courseData?.data?.id});
  };

  useEffect(() => {
    if (isSuccess) {
      if (wishlistData?.status === 'success') {
        showSuccess('Course Added to wishlist to successfully');
        setHeartColor(true);
      }
    } else if (isError) {
      showError(error);
    }
  }, [isSuccess, isError]);

  return (
    <View style={{marginBottom: moderateScale(10)}}>
      <View style={{height: 150}}>
        <ImageBackground
          source={imagePath.mathBlue}
          resizeMode="cover"
          style={styles.backImg}>
          <View style={[styles.backImgContainer, commonStyles.spacingCommon]}>
            <TouchableOpacity style={{flex: 1}} onPress={handleBack}>
              <BackBtn />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleWishlist}
              style={styles.squareWhiteBtn}>
                {/* <Image
                resizeMode='contain'
                source={imagePath.messageEmpty}
                style={{
                  // width:moderateScale(9)
                }}
                /> */}
              {/* <HeartIcon
                size={moderateScale(20)}
                color={heartColor ? colors.red : colors.theme}
                name="heart"
              /> */}
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.thumbnailContainer}>
        <View style={styles.thumbnailImageContainer}>
          <FastImage
            source={{uri: `${IMAGE_API_URL}${courseData?.data?.image}` || courseData?.data?.image || SAMPLE_COURSE_IMAGE}}
            style={styles.img}
          />
          <View
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              height: moderateScale(55),
              position: 'absolute',
              bottom: 0,
              width: '100%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                height: '100%',
              }}>
              <TouchableOpacity>
                <Icon name="shuffle" color={colors.white} size={25} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon name="backward-step" color={colors.white} size={30} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon name="play-circle" color={colors.white} size={40} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon name="forward-step" color={colors.white} size={30} />
              </TouchableOpacity>
              <TouchableOpacity>
                <OnIcon name="screen-full" color={colors.white} size={25} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <View style={[{marginTop: moderateScale(16)}]}>
        <View style={[{gap: moderateScale(6)}, commonStyles.spacingCommon]}>
          <Text style={[styles.headerTitle]}>{courseData?.data?.name}</Text>
          <View style={[styles.instructorDetailContainer]}>
            <Text
              style={[
                {
                  fontSize: textScale(14),
                  fontFamily: fontFamily.Poppins_Medium,
                  color: colors.black,
                },
              ]}>
              Instructor
            </Text>
            <View style={[styles.instructorDetailContainer]}>
              <View style={[styles.instructorDetailImageContainer]}>
                <Image
                  style={styles.instructorDetailImage}
                  source={imagePath.instuctorSample}
                />
              </View>
              <Text
                style={{
                  fontFamily: fontFamily.Poppins_Light,
                  color: colors.themeDark,
                  fontSize: textScale(14),
                }}>
                {courseData?.data?.instructor?.full_name}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.backGreyContainer}>
          <View style={[styles.buyCourseDetail]}>
            <View style={{alignItems: 'center', gap: moderateScale(10)}}>
              <View
                style={{
                  flexDirection: 'row',
                  gap: moderateScale(5),
                  alignItems: 'center',
                }}>
                <View
                  style={
                    {
                      // backgroundColor: 'black',
                      // borderRadius: 500,
                    }
                  }>
                  <IconMat color={colors.black} name="verified" size={25} />
                </View>
                <Text style={{color: colors.black}}>
                  Get full Course for just
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: moderateScale(4),
                  marginBottom:moderateScale(10),
                }}>
                <Text
                  style={{
                    fontFamily: fontFamily.Poppins_Regular,
                    textDecorationLine: 'line-through',
                    color: colors.black,
                  }}>
                  3500KD
                  {/* discount price */}
                </Text>
                <Text
                  style={{
                    fontFamily: fontFamily.Poppins_SemiBold,
                    color: colors.themeDark,
                    fontSize: textScale(14),
                  }}>
                  {/* full price  */}
                  {courseData?.data?.full_price}
                  KD
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => handleCart(courseData, 'fullCourse')}
                disabled={cartLoading}>
                <View style={styles.btnContainer}>
                  <View>
                    <CartIcon />
                  </View>
                  <Text
                    style={{
                      fontFamily: fontFamily.Poppins_Medium,
                      color: colors.white,
                    }}>
                    {cartLoading ? 'Loading...' : 'Add to Cart'}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={[
              styles.greyContainerTextContainer,
              commonStyles.spacingCommon,
            ]}>
            <View style={[styles.greyContainerText]}>
              <Text style={styles.greyContTextHeading}>
                {courseData?.data?.chapters_count}
              </Text>
              <Text style={styles.greyContTextSubHeading}>Lectures</Text>
            </View>
            <View style={[styles.greyContainerText]}>
              <Text style={styles.greyContTextHeading}>25,000</Text>
              <Text style={styles.greyContTextSubHeading}>Students</Text>
            </View>
            <View style={[styles.greyContainerText]}>
              <Text style={styles.greyContTextHeading}>13h 40m</Text>
              <Text style={styles.greyContTextSubHeading}>
                {' '}
                Course Duration
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default BuyCourseHeader;

const styles = StyleSheet.create({
  backImg: {
    // flex: 1,
    paddingVertical: moderateScaleVertical(40),
    flexDirection: 'row',

    alignItems: 'center',
  },
  img: {
    width: '100%',
    backgroundColor: colors.black,
    height: moderateScale(200),
  },
  backImgContainer: {
    marginTop: moderateScaleVertical(20),
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  headerTitle: {
    fontFamily: fontFamily.Poppins_SemiBold,
    fontSize: textScale(18),
    color: colors.black,
  },
  instructorDetail: {},
  buyCourseDetail: {
    alignItems: 'center',
    marginBottom: moderateScale(20),
    // height:150,
  },
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
  squareWhiteBtn: {
    backgroundColor: colors.white,
    width: moderateScale(35),
    height: moderateScale(35),
    borderRadius: moderateScale(6),
    justifyContent: 'center',
    alignItems: 'center',
  },

  backGreyContainer: {
    backgroundColor: colors.containerGrey,

    marginTop: moderateScaleVertical(14),
    paddingVertical: moderateScaleVertical(18),
  },
  greyContainerTextContainer: {
    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'space-between',
  },
  greyContainerText: {
    alignItems: 'center',
    color: colors.black,
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
  },
  thumbnailContainer: {
    alignItems: 'center',
    // flex: 0.4,
    // backgroundColor:"pink"
  },

  thumbnailImageContainer: {
    width: '90%',
    borderRadius: moderateScale(12),
    // height: '100%',

    position: 'relative',
    bottom: moderateScale(20),
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.white,
  },
  btnContainer: {
    backgroundColor: colors.themeDark,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(40),
    paddingVertical: moderateScale(12),
    borderRadius: moderateScale(20),
    gap: moderateScale(10),
    justifyContent: 'center',
  },
});
