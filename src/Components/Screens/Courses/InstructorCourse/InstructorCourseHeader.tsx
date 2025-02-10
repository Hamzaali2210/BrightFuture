import {
  Alert,
  ImageBackground,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

import React, {useEffect, useState} from 'react';

import IconMat from 'react-native-vector-icons/MaterialIcons';
import BackBtn from '../../../../assets/images/Icons/backBtn.svg';
import CartIcon from '../../../../assets/images/Icons/cart.svg';
import colors from '../../../../styles/colors';
import fontFamily from '../../../../styles/fontFamily';

import LockIcon from 'react-native-vector-icons/Entypo'

import IconAnt from 'react-native-vector-icons/AntDesign';
import TooltipIcon from 'react-native-vector-icons/AntDesign';

import imagePath from '../../../../constants/imagePath';
import usePostData from '../../../../hooks/usePostData';
import commonStyles from '../../../../styles/commonStyles';
import CrossIcon from 'react-native-vector-icons/Entypo';

import {
  height,
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from '../../../../styles/responsiveSize';
import {endpoints} from '../../../../utils/endpoints';
import {showError, showSuccess} from '../../../../utils/helperFunctions';

import HeartIcon from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import Newhsl from '../../../../Screens/Newhsl';
import BtnWhite from '../../../../assets/images/Icons/btnWhiteAdd.svg';
import {CourseDataInterface} from '../../../../types/uiType';
import {formatTime, videoIdGenerator} from '../../../../utils/logicFunctions';
import {mainStrings} from '../../../../constants/mainstrings';
import Square from 'react-native-vector-icons/FontAwesome';
import {Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import ModalCard from '../../../Layout/Card/ModalCard';
import Orientation from 'react-native-orientation-locker';
import DeviceInfo from 'react-native-device-info';
import {useIsFocused} from '@react-navigation/native';

import MessageIcon from 'react-native-vector-icons/AntDesign';
import SampleVimeo from '../../../Layout/Video/SampleVimeo';
import AddCourse from '../../../../Screens/SampleVideoScreen';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useGetData from '../../../../hooks/useGetData';
import { IMAGE_API_URL } from '../../../../utils/urls';

type courseDataType = {
  data: CourseDataInterface;
};
interface InstructorCourseHeaderProps {
  handleBack: () => void;
  handleAdd: () => void;
  handleCart?: (item: any, type: string) => void;
  cartLoading?: boolean;
  toggleMark: () => void;
  fullCart?: boolean;

  currentVideo: string;
  toggleModal: () => void;
  isStudent?: boolean;
  markComplete?: boolean;

  courseData: courseDataType;
}

const STATIC_IMAGE =
  'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

const InstructorCourseHeader: React.FC<InstructorCourseHeaderProps> = ({
  handleBack,
  currentVideo,
  handleAdd,
  toggleModal,
  handleCart,
  cartLoading,
  isStudent,
  markComplete,
  toggleMark,
  fullCart,

  courseData,
}) => {
  console.log('courseDatacourseDatacourseDatacourseDatacourseData',courseData);

  // let videoUrl = courseData?.data?.chapters[0]?.videos[0]?.video_url;
  const userRecording = useSelector(state => state?.tag?.userRecording);
  const userData = useSelector((state: any) => state?.auth?.userPayload);

  const {data:BunnyData, status:bunnyStatus, isFetching,} = useGetData(endpoints.BUNNY_KEY, ['bunny']);

  const {data}=useQuery({queryKey:['file',BunnyData],queryFn:async ()=>{
    try {
      if(bunnyStatus==="success"){
        const url = `https://video.bunnycdn.com/library/${BunnyData?.data?.LIB_ID}/videos/${currentVideo?.video_url}`;
        const response = await axios.get(url)
        const data = response?.data;

        return data;
      }
    } catch (error:any) {
      if (error?.response?.data?.message) {
        throw new Error(error?.response?.data?.message);
      } else {
        throw new Error(error);
      }
    }


  }})

  console.log("datadatadatadatadatadata",data);


  const [heartColor, setHeartColor] = useState(courseData?.data?.is_favourite);
  const [showTooltip, setShowTooltip] = useState(false);
  const [orientation, setOrientation] = useState(
    Orientation.getInitialOrientation(),
  );
  const dimensions = useWindowDimensions();
  const isTablet = DeviceInfo?.isTablet();

  const handleWishlist = async (phone: number) => {
    console.log('phonephonephonephonephonephonephonephonephone', phone);

    const whatsappUrl = `whatsapp://send?phone=${phone}`;
    try {
      const canOpen = await Linking.canOpenURL(whatsappUrl);

      if (canOpen) {
        await Linking.openURL(whatsappUrl);
      } else {
        throw new Error('Unable to open the URl');
      }
    } catch (error) {
      showError('Unable to open the URL');
      console.error('Error opening WhatsApp:', error);
    }
    // sendToWishlist({course_id: courseData?.data?.id});
  };
  const toggleTooltip = () => {
    setShowTooltip(!showTooltip);
  };
  const handleOrientationChange = newOrientation => {
    setOrientation(newOrientation);
    console.log('Orientation changed:', newOrientation);
  };

  useEffect(() => {
    Orientation.addOrientationListener(handleOrientationChange);

    // Clean up listener on component unmount
    return () => {
      Orientation.removeOrientationListener(handleOrientationChange);
    };
  }, []);

  let videoId = currentVideo && videoIdGenerator(currentVideo);
  console.log(
    'userDatauserDatauserDatauserDatauserData',
    courseData,
    currentVideo,
  );

  const {
    mutate: sendToWishlist,
    isSuccess,
    isError,
    error,
    data: wishlistData,
  } = usePostData(endpoints.STUDENT_WISHLIST, ['STUDENT_WISHLIST']);

  useEffect(() => {
    if (isSuccess) {
      if (wishlistData?.status === 'success') {
        showSuccess('Course Added to wishlist to successfully');
      }
    } else if (isError) {
      showError(error);
    }
  }, [isSuccess, isError]);

  const isFocused = useIsFocused(); // Hook for navigation focus status

  useEffect(() => {
    if (isFocused) {
      // Allow both portrait and landscape
      // Orientation.unlockAllOrientations();
    }
    // Lock back to portrait when leaving the screen
    // Orientation.lockToPortrait();

    // }, [isFocused]);
  }, []);

  //   if(dimensions?.width>=dimensions?.height){
  //  return (
  //   <View style={{backgroundColor:colors.black}}>
  //    <View style={{top:width>768?"10%":0,backgroundColor:colors.black}} >
  //     <Newhsl videoId={currentVideo?.video_url} orientation={orientation}/>
  //     </View>
  //   </View>

  // )
  //   }

  console.log(
    '{courseData?.data?.instructor{courseData?.data?.instructor{courseData?.data?.instructor',
    courseData,
  );

  // return <></>
  return (
    <View style={{}}>
      <>
        <View>
          <ImageBackground
            source={imagePath?.mathBlue}
            resizeMode="cover"
            style={styles.backImg}>
            <View style={[styles.backImgContainer, commonStyles.spacingCommon]}>
              <TouchableOpacity style={{}} onPress={handleBack}>
                <BackBtn
                  width={
                    DeviceInfo?.isTablet()
                      ? moderateScale(30)
                      : moderateScale(50)
                  }
                  height={
                    DeviceInfo?.isTablet()
                      ? moderateScale(30)
                      : moderateScale(50)
                  }
                />
              </TouchableOpacity>
            </View>
            {userData?.role === 3 ? (
              <View
                style={[
                  styles.backImgContainer,
                  commonStyles.spacingCommon,
                  {justifyContent: 'flex-end', alignItems: 'flex-end'},
                  // {borderRadius:moderateScale(120)}
                ]}>
                <TouchableOpacity
                  style={{alignItems: 'flex-end'}}
                  onPress={toggleModal}>
                  <BtnWhite
                    width={
                      DeviceInfo?.isTablet()
                        ? moderateScale(30)
                        : moderateScale(48)
                    }
                    height={
                      DeviceInfo?.isTablet()
                        ? moderateScale(30)
                        : moderateScale(48)
                    }
                  />
                </TouchableOpacity>
              </View>
            ) : !courseData?.data?.is_purchased ? (
              <TouchableOpacity
                onPress={() =>
                  handleWishlist(
                    courseData?.data?.instructor?.country_code +
                      +courseData?.data?.instructor?.mobile,
                  )
                }
                style={styles.squareWhiteBtn}>
                {/* <HeartIcon
                size={moderateScale(20)}
                color={heartColor ? colors.red : colors.theme}
                name="heart"
              /> */}
                {/* <CrossIcon
              name="paper-plane"
              size={moderateScale(24)}
              color={colors.theme}


              /> */}

                <Image
                  resizeMode="contain"
                  source={imagePath.messageIcon}
                  style={
                    {
                      // width:moderateScale(9)
                    }
                  }
                />
                {/* <MessageIcon
                name="message1"
                size={moderateScale(22)}
                color={colors.theme}
              /> */}
              </TouchableOpacity>
            ) : null}
          </ImageBackground>
        </View>

        <View
          style={[
            styles.thumbnailContainer,
            // {height:width > 700 ? height / 2.3 : moderateScaleVertical(235)},
            // {height:height}
          ]}>
          {userData?.role === 3 ||
          (userData?.course_type_available && currentVideo?.video_url) ? (
            currentVideo?.isMaximum? (
              <Newhsl
                videoId={currentVideo?.video_url}
                isMaximum={false}
              />
            ) : (
              <Newhsl
                videoId={currentVideo?.video_url}
                isMaximum={true}
              />
            )
          ) : (
            // <AddCourse/>

            <View
              style={{
                borderBottomColor: colors.themeYellow,
                borderBottomWidth: moderateScale(5),
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.5,
                shadowRadius: 8.3,
                elevation: 13,
                width: '100%',
                height: '100%',
                position:"relative",
              }}>
              <FastImage
                resizeMode="cover"
                source={{uri: `${IMAGE_API_URL}${courseData?.data?.image}` || courseData?.data?.image}}
                style={{width: '100%', height: '100%'}}
              />

              {/* <Image
              resizeMode="cover"

              source={require('../../../../assets/images/Chemistry.png')}
              style={{width:"100%",height:"100%"}}
            /> */}
            {!courseData?.data?.is_course_locked && <View style={{position:"absolute",height:"100%",width:"100%",justifyContent:"center",alignItems:"center",backgroundColor:"rgba(0,0,0,0.65)"}}>
                <LockIcon

                name='lock'
                color={colors.white}
                size={moderateScaleVertical(20)}
                />
            </View>}
            </View>
          )}

          {/* {courseData?.data?.chapters[courseData?.data?.chapters?.length-1]?.price == 0 ? (
          <Newhsl videoId={currentVideo?.video_url} />
        ) : (
          <View style={styles.thumbnailImageContainer}>
            <FastImage
              resizeMode="cover"
              style={{width:"100%",height:"100%"}}
              source={{uri: courseData?.data?.image}}
            />

          </View>
        )} */}
        </View>
        <View style={[{marginTop: moderateScale(16)}]}>
          <View style={[{gap: moderateScale(6)}, commonStyles.spacingCommon]}>
            {/* <Text style={[styles.headerTitle]}>{name}</Text> */}
            <Text style={[styles.headerTitle]}>
              {courseData?.data?.name}
              {/* {userData?.course_type_available && <Text onPress={toggleTooltip}>{" "}<TooltipIcon size={textScale(18)} color={colors.theme} name='questioncircleo'/> </Text>} */}
            </Text>
          </View>
          {false && (
            <TouchableOpacity
              style={[
                styles.markComplete,
                {borderColor: markComplete ? colors.themeGreen : colors.theme},
              ]}
              onPress={toggleMark}>
              <Square
                name={!markComplete ? 'square-o' : 'check-square'}
                size={textScale(15)}
                color={markComplete ? colors.themeGreen : colors.theme}
              />
              <Text
                style={[
                  styles.markCompleteText,
                  {color: markComplete ? colors.themeGreen : colors.theme},
                ]}>
                {mainStrings.MarkAsComplete}
              </Text>
            </TouchableOpacity>
          )}
          <View
            style={[
              styles.instructorDetailContainer,
              commonStyles.spacingCommon,
              {
                marginVertical: moderateScaleVertical(8),
                gap: moderateScale(12),
              },
            ]}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {/* {userData?.role === 2 && (
              <Text
                style={{
                  fontSize: textScale(14),
                  fontFamily: fontFamily.Poppins_Medium,
                  color: 'rgba(16, 24, 40, 1)',
                }}>
                Instructor
              </Text>
            )} */}
              {userData?.role === 2 && (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <FastImage
                    source={{uri: `${IMAGE_API_URL}${courseData?.data?.instructor?.avatar}` || courseData?.data?.instructor?.avatar}}
                    style={{
                      width: moderateScale(22),
                      height: moderateScale(22),
                      borderRadius: moderateScale(200),
                      marginLeft: moderateScale(4),

                      marginRight: moderateScale(6),
                      backgroundColor: colors.lightThemeBlue,
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: fontFamily.Poppins_Regular,
                      fontSize: DeviceInfo?.isTablet()
                        ? textScale(10)
                        : moderateScale(14),
                      color: colors.theme,
                    }}>
                    {courseData?.data?.instructor?.full_name}
                  </Text>
                </View>
              )}
            </View>
            {courseData?.data?.reviews_count > 0 && (
              <View style={styles.instructorDetailContainer}>
                <IconAnt
                  color={colors.themeYellow}
                  name="staro"
                  size={moderateScale(20)}
                />
                <Text
                  style={{
                    fontFamily: fontFamily.Poppins_Regular,
                    color: colors.grey1,
                    fontSize: isTablet ? textScale(10) : textScale(14),
                    marginLeft: moderateScale(6),
                  }}>
                  {courseData?.data?.average_rating}/5
                </Text>

                <Text
                  style={{
                    fontFamily: fontFamily.Poppins_Regular,
                    color: colors.black,
                    fontSize: isTablet ? textScale(10) : textScale(14),
                    marginLeft: moderateScale(6),
                  }}>
                  {courseData?.data?.reviews_count} Reviews
                </Text>
              </View>
            )}

            {userData?.role === 3 && (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={imagePath.blueClock}
                  resizeMode="contain"
                  style={{
                    width: DeviceInfo?.isTablet()
                      ? moderateScale(12)
                      : moderateScale(16),
                    height: DeviceInfo?.isTablet()
                      ? moderateScale(12)
                      : moderateScale(16),
                  }}
                />
                <Text
                  style={{
                    fontFamily: fontFamily.Poppins_Regular,
                    fontSize: DeviceInfo?.isTablet()
                      ? moderateScale(12)
                      : textScale(14),
                    color: colors.theme,
                    marginLeft: moderateScale(7),
                  }}>
                  {formatTime(courseData?.data?.duration)}
                </Text>
              </View>
            )}

            {/* <View style={styles.instructorDetailContainer}>
            <IconAnt
              color={colors.themeDark}
              name="clockcircleo"
              size={moderateScale(18)}
              style={{marginRight: moderateScale(10)}}
            />
            <Text
              style={{
                fontFamily: fontFamily.Poppins_Medium,
                color: colors.grey1,
                fontSize: textScale(14),
                marginLeft: moderateScale(6),
              }}>
              13hr 60mn
            </Text>
          </View> */}
          </View>
        </View>
      </>

      {!isStudent && userData.role !== 3 && (
        <View
          style={[
            styles.backGreyContainer,
            {backgroundColor: colors.lightGreyColor},
          ]}>
          <View style={[styles.buyCourseDetail]}>
            <View style={{alignItems: 'center', gap: moderateScale(10)}}>
              {!!(
                +courseData?.data?.online_discounted_price > 0 ||
                +courseData?.data?.in_person_discounted_price > 0
              ) &&
                userData?.course_type_available &&
                !courseData?.data?.is_expired && (
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
                    {
                      <Text
                        style={{
                          color: colors.black,
                          fontSize: moderateScale(14),
                        }}>
                        Get full Course for just
                      </Text>
                    }
                  </View>
                )}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: moderateScale(4),
                }}>
                {/* {courseData?.data?.discounted_price!== courseData?.data?.full_price && <Text
                  style={{
                    fontFamily: fontFamily.Poppins_Regular,
                    textDecorationLine: 'line-through',
                    color: colors.black,
                  }}>
                 {courseData?.data?.online_price}KD
                </Text>} */}
                {!!(
                  +courseData?.data?.online_discounted_price > 0 ||
                  +courseData?.data?.in_person_discounted_price > 0
                ) &&
                  !courseData?.data?.is_expired && (
                    <Text
                      style={{
                        fontFamily: fontFamily.Poppins_SemiBold,
                        color: colors.themeDark,
                        fontSize: isTablet ? textScale(12) : textScale(18),
                      }}>
                      {(+courseData?.data?.online_discounted_price ?? 0) ||
                        (courseData?.data?.in_person_discounted_price ?? 0)}
                      KD
                    </Text>
                  )}
              </View>
              {!!(
                +courseData?.data?.online_discounted_price > 0 ||
                +courseData?.data?.in_person_discounted_price > 0
              ) &&
                courseData?.data?.is_purchasable &&
                !courseData?.data?.is_expired && (
                  <TouchableOpacity
                    onPress={() => handleCart(courseData, 'fullCourse')}
                    disabled={cartLoading}
                    style={[
                      styles.btnContainer,
                      {
                        backgroundColor: fullCart ? colors.green : colors.theme,
                        marginBottom: moderateScaleVertical(10),
                      },
                    ]}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: moderateScale(12),
                      }}>
                      {/* <View
                    style={{
                      height: moderateScaleVertical(20),
                      width: moderateScale(20),
                    }}>
                    <Image source={imagePath.cartWhite} resizeMode="contain" style={{width:moderateScale(20),height:moderateScaleVertical(20)}}/>
                  </View> */}
                      {userData?.course_type_available ? (
                        <Text
                          style={{
                            fontFamily: fontFamily.Poppins_Medium,
                            color: colors.white,
                            fontSize: isTablet ? textScale(10) : textScale(14),
                          }}>
                          {cartLoading
                            ? 'Loading...'
                            : fullCart
                            ? 'Subscribed'
                            : // : 'Add to Cart'}
                              'Subscribe'}
                        </Text>
                      ) : (
                        <Text
                          style={{
                            fontFamily: fontFamily.Poppins_Medium,
                            color: colors.white,
                            fontSize: isTablet ? textScale(10) : textScale(14),
                          }}>
                          {cartLoading
                            ? 'Loading...'
                            : fullCart
                            ? 'Ready To Enrolled'
                            : // : 'Add to Cart'}
                              'Enroll Now'}
                        </Text>
                      )}
                    </View>
                  </TouchableOpacity>
                )}
            </View>
          </View>
          <View
            style={[
              styles.greyContainerTextContainer,
              commonStyles.spacingCommon,

              // {left:10}
              // {justifyContent: 'center', gap: moderateScale(20)},
            ]}>
            <View style={[styles.greyContainerText]}>
              <Text style={styles.greyContTextHeading}>
                {courseData?.data?.chapters_count}
              </Text>
              {/* <Text style={styles.greyContTextSubHeading}>Lectures</Text> */}
              <Text style={styles.greyContTextSubHeading}>Chapters</Text>
            </View>
            {userData?.course_type_available && (
              <View
                style={{
                  height: '100%',
                  width: moderateScale(1),
                  opacity: 0.2,
                  backgroundColor: colors.black,
                }}
              />
            )}
            {userData?.course_type_available && (
              <View style={[styles.greyContainerText]}>
                <Text style={styles.greyContTextHeading}>
                  {courseData?.data?.duration > 0
                    ? formatTime(courseData?.data?.duration)
                    : 0}
                </Text>
                <Text style={styles.greyContTextSubHeading}> Duration</Text>
              </View>
            )}

            {userData?.course_type_available && (
              <View
                style={{
                  height: '100%',
                  width: moderateScale(1),
                  opacity: 0.2,
                  backgroundColor: colors.black,
                }}
              />
            )}
            <View style={[styles.greyContainerText]}>
              <Text style={styles.greyContTextHeading}>
                {courseData?.data?.video_count}
              </Text>
              <Text style={styles.greyContTextSubHeading}>Videos</Text>
            </View>
          </View>
        </View>
      )}
      <ModalCard
        isModalVisible={showTooltip}
        toggleModal={toggleTooltip}
        isCancel>
        {/* <View style={{alignItems:"flex-end",marginBottom:moderateScale(13)}}>
            <TouchableOpacity onPress={toggleTooltip}>
            <CrossIcon size={textScale(24)} color={colors.black} name='cross'/>
          </TouchableOpacity>
        </View> */}
        <Text
          style={[
            styles.tooltipText,
          ]}>{`Enrollment to this course mandates attendance to each chapter lectures at our institution`}</Text>
      </ModalCard>
    </View>
  );
};

export default InstructorCourseHeader;

const styles = StyleSheet.create({
  backImg: {
    // flex: 1,
    paddingVertical: DeviceInfo?.isTablet()
      ? moderateScaleVertical(15)
      : moderateScaleVertical(35),
    flexDirection: 'row',
    alignItems: 'center',
    // height:230,
  },
  img: {
    width: '100%',
    height: moderateScale(220),
    backgroundColor: 'black',
  },
  backImgContainer: {
    marginTop: moderateScaleVertical(28),
    flexDirection: 'row',
    alignItems: 'center',
    // width: '100%',
    flex: 1,
  },
  headerTitle: {
    fontFamily: fontFamily.Poppins_SemiBold,
    fontSize: DeviceInfo?.isTablet() ? textScale(14) : textScale(18),
    color: colors.black,
  },
  instructorDetail: {},
  buyCourseDetail: {
    alignItems: 'center',

    // marginVertical:moderateScaleVertical(10),
    // marginBottom: moderateScale(20),
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
  backGreyContainer: {
    // backgroundColor: colors.themeLightBox,
    // backgroundColor: colors.red,

    borderRadius: moderateScale(12),
    marginHorizontal: moderateScale(12),
    // marginTop: moderateScaleVertical(14),
    marginVertical: moderateScaleVertical(8),
    paddingVertical: moderateScaleVertical(12),
  },
  greyContainerTextContainer: {
    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'space-around',
  },
  greyContainerText: {
    alignItems: 'center',
    color: colors.black,
  },
  greyContTextHeading: {
    fontFamily: fontFamily.Poppins_Medium,
    color: colors.black,
    fontSize: DeviceInfo.isTablet() ? textScale(12) : textScale(16),
  },
  greyContTextSubHeading: {
    fontFamily: fontFamily.Poppins_Regular,
    color: colors.black,
    opacity: 0.5,
    fontSize: DeviceInfo?.isTablet() ? textScale(10) : textScale(12),
  },
  thumbnailContainer: {
    alignItems: 'center',
    width: '100%',
    height: DeviceInfo?.isTablet() ? height / 2.3 : moderateScaleVertical(230),
    // backgroundColor:'black',

    // borderBottomColor: colors.themeYellow,
    // borderBottomWidth: moderateScale(5),
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.39,
    // shadowRadius: 8.3,
    // elevation: 13,
    // height: height / 3.8,
    // overflow: 'hidden',

    // flex: 0.4,
  },

  thumbnailImageContainer: {
    width: width,
    // borderRadius: moderateScale(12),
    height: '100%',
    // height: height / 3.75,
    backgroundColor: colors.black,

    position: 'relative',
    // bottom: moderateScale(2),
    overflow: 'hidden',

    // borderBottomColor: colors.red,
    // borderBottomWidth: moderateScale(1),
    // borderWidth: 1,
    // borderColor: colors.theme,
  },
  btnContainer: {
    backgroundColor: colors.theme,
    flexDirection: 'row',
    alignItems: 'center',
    width: 300,
    // width:"100%",
    paddingHorizontal: moderateScale(40),
    paddingVertical: moderateScaleVertical(16),
    borderRadius: moderateScale(120),
    gap: moderateScale(10),
    justifyContent: 'center',
  },
  squareWhiteBtn: {
    backgroundColor: colors.white,
    width: DeviceInfo?.isTablet() ? moderateScale(35) : moderateScale(35),
    height: DeviceInfo?.isTablet() ? moderateScale(35) : moderateScale(35),
    borderRadius: moderateScale(120),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    right: moderateScale(16),
    top: moderateScaleVertical(16),
  },
  markComplete: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.theme,
    borderWidth: moderateScale(1),
    borderStyle: 'solid',
    alignSelf: 'flex-end',
    padding: moderateScale(4),
    gap: moderateScale(5),
    borderRadius: moderateScale(2),
    marginRight: moderateScale(14),
    marginTop: moderateScale(3),
  },
  markCompleteText: {
    fontSize: textScale(15),
    fontFamily: fontFamily.Poppins_Medium,
    textTransform: 'uppercase',
    color: colors.theme,
  },
  tooltipText: {
    fontFamily: fontFamily.Poppins_Regular,
    color: colors.black,
    fontSize: textScale(14),
    paddingBottom: moderateScaleVertical(12),
  },
});
