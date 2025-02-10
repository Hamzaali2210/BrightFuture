import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Progress from 'react-native-progress';
import colors from '../../../../styles/colors';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
  verticalScale,
} from '../../../../styles/responsiveSize';

import NoteIcon from '../../../../assets/images/Icons/notesGray.svg';
import GreyTime from '../../../../assets/images/Icons/timeLine.svg';

import BlutTickRadio from '../../../../assets/images/Icons/blueTick.svg';
import ToggleOff from '../../../../assets/images/Icons/toggleOff.svg';
import ToggleOn from '../../../../assets/images/Icons/toggleOn.svg';
import TooltipIcon from 'react-native-vector-icons/AntDesign';
import CrossIcon from 'react-native-vector-icons/Entypo';

import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {mainStrings} from '../../../../constants/mainstrings';
import navigationStrings from '../../../../constants/navigationStrings';
import useGetData from '../../../../hooks/useGetData';
import usePostData from '../../../../hooks/usePostData';
import {couponCodeData} from '../../../../redux/slice/couponSlice';
import fontFamily from '../../../../styles/fontFamily';
import {endpoints} from '../../../../utils/endpoints';
import {showError, showSuccess} from '../../../../utils/helperFunctions';

import TrashIcon from 'react-native-vector-icons/FontAwesome';
import PersonIcon from 'react-native-vector-icons/FontAwesome6';
import {courseDiscountInterface} from '../../../../types/componentInterface';
import imagePath from '../../../../constants/imagePath';
import dayjs from 'dayjs';
import {formatTime} from '../../../../utils/logicFunctions';
import FastImage from 'react-native-fast-image';
import ModalCard from '../../../Layout/Card/ModalCard';
import DeviceInfo from 'react-native-device-info';
import { IMAGE_API_URL } from '../../../../utils/urls';

export type cartCourseType = {
  cart_id: number;
  course_id: number;
  add_ons: Array<number>;
  course_type: string;
};

interface CartCourseDetailProps {
  handleDelete: () => void;
  getDataAgain?: () => void;
  refetchData?: () => void;
  courseDetail: any;
  courseId: number;
  fullCourse: any;
  orderId?: number;
  courseCode?: string;
  cartCoursePayload?: Array<cartCourseType>;
  setCartCoursePayload?: React.Dispatch<
    React.SetStateAction<cartCourseType | []>
  >;
  setTagDelete?: React.Dispatch<React.SetStateAction<string[]>>;
}

interface ChapterContainerProps {
  item: any;
}

const addOnData = [
  {
    isSelected: false,
    name: 'Pro-subscription',
    price: 10,
    id: 1,
  },
  {
    isSelected: false,
    name: ' Full In-person',
    price: 10,
    id: 2,
  },
  {
    isSelected: false,
    name: 'Collect Printed Notes',
    price: 10,
    id: 3,
  },
];

const addOnDataPro = [
  {
    isSelected: false,
    name: 'Pro-subscription',
    price: 10,
    id: 1,
  },
];

const ChapterContainer: React.FC<ChapterContainerProps> = ({item}) => {
  console.log(
    'ChapterContainerPropsChapterContainerPropsChapterContainerProps',
    item,
  );

  return (
    <View style={[styles.chapterContainer]}>
      <View style={[styles.chapterNameContainer]}>
        <View style={{flex: 1}}>
          <Text style={[styles.chapterNameText]} numberOfLines={1}>
            {item?.name}
          </Text>
          <View
            style={[
              styles.chapterDetailFeatureContainer,
              {gap: moderateScale(4)},
            ]}>
            <View style={[styles.chapterIconRow]}>
              <NoteIcon
                width={moderateScaleVertical(10)}
                height={moderateScaleVertical(10)}
              />
              <Text
                style={[styles.greyText, {color: 'rgba(152, 162, 179, 1)'}]}
                numberOfLines={1}>
                {item?.notes_count ? item?.notes_count : '0'} Lessons
                {/* 12 Jan 2024 */}
              </Text>
            </View>
            <View style={[styles.chapterIconRow]}>
              <GreyTime
                width={moderateScaleVertical(12)}
                height={moderateScaleVertical(12)}
              />

              <Text
                style={[styles.greyText, {color: 'rgba(152, 162, 179, 1)'}]}
                numberOfLines={1}>
                {item?.duration ? item?.duration : '60 min 45sec'}
              </Text>
            </View>
          </View>
        </View>
        {/* <Text
          style={[
            styles.courseTextChapterHeading,
            {fontSize: moderateScale(18)},
          ]}>
          {item?.price ? item?.price : '0'}
          KD
        </Text> */}

        <View style={styles.priceLabel}>
          <Text style={styles.textLabel}>
            {item?.price ? item?.price : '0'} KD
          </Text>
        </View>
      </View>
      {/* this code will not be deleted as it will container info in future */}
    </View>
  );
};

const CartCourseDetail: React.FC<CartCourseDetailProps> = ({
  handleDelete,
  courseDetail,
  fullCourse,
  courseId,
  setTagDelete,
  courseCode,
  setCartCoursePayload,
  cartCoursePayload,
  orderId,
  getDataAgain,
  refetchData,
}) => {
  let courseData: any = fullCourse;
  console.log(
    'courseDetailcourseDetailcourseDetailcourseDetailcourseDetail',
    courseDetail,
  );

  const [selectedType, setSelectedType] = useState<'online' | 'fullInPerson'>(
    'online',
  );
  const userData = useSelector((state: any) => state?.auth?.userPayload);
  console.log(
    'userDatauserDatauserDatauserDatauserDatauserDatauserData',
    userData,
  );

  const [addOnType, setAddOnType] = useState<any>([]);
  const codeDetail = useSelector((state: any) => state?.coupon?.codeDetail);

  const dispatch = useDispatch();

  const navigation = useNavigation<any>();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const isTablet = DeviceInfo?.isTablet();

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const couponType = (type: string): courseDiscountInterface => {
    if (type === 'Special Package') {
      return 'package';
    } else if (type === 'Special Discount') {
      return 'special';
    } else if (type === 'Course Discount') {
      return 'course';
    } else if (type === 'Group Coupon') {
      return 'group';
    }
    return 'special';
  };

  console.log(
    'cartCoursePayloadcartCoursePayloadcartCoursePayload',
    cartCoursePayload,
  );

  const {mutate: isValid} = usePostData(
    endpoints.APPLY_COUPON as never,
    ['APPLY_COUPON'],
    'post',
    data => {
      showSuccess(data?.message);
      setTagDelete && setTagDelete([`tag${Math.random() * 100}`]);
    },
    error => {
      const newError = JSON.parse(error?.message);
      if (newError?.error_type === 'all_required_courses') {
        showError(newError?.message);
        if (codeDetail?.couponId) {
          navigation.navigate(navigationStrings.CourseDiscountDetail, {
            couponID: codeDetail?.couponId,
          });
        }
        return;
      }
      showError('error while applying coupon');
    },
  );

  const {mutate: addOnPrice} = usePostData(
    `${endpoints.CHARGE_COURSE_TYPE}`,
    ['ADS_ONS_PRICE'],
    'post',
    (data: any) => {
      // showSuccess('Lesson deleted successfully');
      refetchData && refetchData();
      getDataAgain && getDataAgain();
    },
    (error: any) => {
      showSuccess('Error while Fetching the Add ons');
      refetchData && refetchData();
      getDataAgain && getDataAgain();
    },
  );
  const {status, data, refetch}: any = useGetData(
    `${endpoints.ADS_ONS}?type=${selectedType === 'online' ? 1 : 2}&course_id=${
      courseDetail?.id
    }&order_id=${orderId}`,
    [selectedType, courseDetail?.id],
  );
  const {data:categories}: any = useGetData(
    `${endpoints.CATEGORIES}?type=${selectedType === 'online' ? 1 : 2}&course_id=${
      courseDetail?.id
    }&order_id=${orderId}`,
    [selectedType, courseDetail?.id],
  );


  console.log("courseDetailcourseDetailcourseDetailcourseDetailcourseDetail",courseDetail);

  const {mutate: adsOnUpgrade} = usePostData(
    endpoints.CART_ADSON_UPGRADE as never,
    ['CART_ADSON_UPGRADE'],
    'post',
    data => {
      // showSuccess(data?.message);
      refetchData && refetchData();
      refetch && refetch();
      getDataAgain && getDataAgain();
    },
    error => {
      refetchData && refetchData();
      refetch && refetch();
      getDataAgain && getDataAgain();
    },
  );

  useEffect(() => {
    const finalData = data?.data?.map((item: any) => ({
      ...item,
      isSelected: false,
    }));
    setAddOnType(finalData);
  }, [selectedType, data]);

  useEffect(() => {
    if (courseDetail?.online_price > 0) {
      setSelectedType('online');
    } else if (courseDetail?.in_person_price) {
      setSelectedType('fullInPerson');
    }
  }, []);

  console.log(
    'courseDetailcourseDetailcourseDetailcourseDetailcourseDetailcourseDetailcourseDetailcourseDetailcourseDetail',
    data?.data,
  );
  const {mutate: cartUpgrade, status: cartUpgradeStatus} = usePostData(
    endpoints.CART_UPGRADE as never,
    ['CART_UPGRADE'],
    'post',
    data => {
      console.log(
        'CART_UPGRADECART_UPGRADECART_UPGRADECART_UPGRADECART_UPGRADE',
      );
      refetchData && refetchData();
      getDataAgain && getDataAgain();
    },
    error => {
      console.log('errorerrorerrorerrorerrorerrorerror', error);
    },
  );

  // useEffect(() => {
  //   console.log('yeah change karne pe chl rha he', cartCoursePayload);
  //   const addOnArr = addOnType
  //     ?.filter((item: any) => item?.isSelected)
  //     .map((item: any) => item?.id);
  //   console.log('addOnArraddOnArraddOnArraddOnArraddOnArraddOnArr', addOnType);

  //   const finalPayload: any = cartCoursePayload?.map((item: any) => {
  //     if (item.course_id === courseDetail?.id) {
  //       return {
  //         ...item,
  //         course_type: selectedType === 'online' ? 1 : 2,
  //         add_ons: addOnArr,
  //       };
  //     } else {
  //       return item;
  //     }
  //   });
  //   cartUpgrade(finalPayload);

  //   setCartCoursePayload && setCartCoursePayload(finalPayload);
  // }, [selectedType, addOnType]);

  const handleCheckCode = () => {
    isValid({coupon_code: codeDetail?.code});
  };

  const handleSelection = (item: {is_selected: boolean; id: number}) => {
    // const newSelectData = addOnType.map((item: any) => {
    //   if (item.id === id && !item.isSelected) {
    //     return {...item, isSelected: true};
    //   } else if (item.id === id && item.isSelected) {
    //     return {...item, isSelected: false};
    //   } else {
    //     return {...item};
    //   }
    // });
    // const addOnArr = data?.data
    // ?.filter((item: any) => item?.is_selected)
    // ?.map((item: any) => item?.id);

    // const finalPayload: any = cartCoursePayload?.map((item: any) => {
    //   if (item.course_id === courseDetail?.id) {
    //     return {...item, course_type: selectedType==="online"?1:2, add_ons: [...new Set([...addOnArr,id])]};
    //   } else {
    //     return item;
    //   }
    // });
    // cartUpgrade(finalPayload)

    // setAddOnType(newSelectData);
    let payload = {
      course_id: courseDetail?.id,
      order_id: orderId,
      subcription_type: selectedType === 'online' ? 1 : 2,
      id: item?.id,
      is_selected: !item?.is_selected,
    };
    adsOnUpgrade(payload);
  };
  const isOnline = selectedType === 'online';
  const originalPrice = parseInt(isOnline ? courseDetail?.online_price : courseDetail?.in_person_price);
  const discountedPrice = parseInt(isOnline ? courseDetail?.online_discounted_price : courseDetail?.in_person_discounted_price);
  const priceUnit = ' KD';

  if (false) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.white,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Progress.Circle size={80} indeterminate color={colors.theme} />
      </View>
    );
  }

  return (
    <View style={[styles.container]}>
      <View style={[styles.chapterDetailContainer,{paddingHorizontal:moderateScale(20)}]}>
        <View style={[styles.imageContainer]}>
          {/* <Image source={imagePath.sampleImage} style={styles.imgStyle} /> */}
          <Image
            source={{uri: `${IMAGE_API_URL}${courseDetail.image}`}}
            style={styles.imgStyle}
            resizeMode="cover"
          />
        </View>
        <View style={[styles.detailContainer]}>
          <View style={[styles.courseNamecontainer]}>
            <View style={[styles.courseHeadingContainer]}>
              <Text style={[styles.courseTextChapterHeading]}>
                {courseDetail?.name}
              </Text>

              <Text style={[styles.courseTextChapterText]}>
                {courseDetail?.instructor_role}
              </Text>
            </View>
            <View style={[styles.binContainer]}>
              <TouchableOpacity onPress={handleDelete}>
                {/* <RecycleBin width={25} height={25} /> */}
                <TrashIcon
                  size={moderateScale(25)}
                  color={colors.red}
                  name="trash-o"
                />
              </TouchableOpacity>
            </View>
          </View>
          {courseDetail?.order_type === 'Full' ? (
            <View style={{marginVertical: moderateScale(7)}}>
              <Text
                style={{
                  // height: moderateScaleVertical(48),
                  fontSize: isTablet ? textScale(11) : textScale(13),
                  fontFamily: fontFamily.Poppins_Regular,
                  color: 'rgba(152, 162, 179, 1)',
                }}
                numberOfLines={2}>
                {courseDetail?.description}
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: moderateScale(4),
                }}>
                <>
                  {originalPrice !== discountedPrice ? (
                    <>
                      <Text
                        style={{
                          fontFamily: fontFamily.Poppins_Regular,
                          color: '#00000060',
                          textDecorationLine: 'line-through',
                          fontSize: isTablet ? textScale(18) : textScale(16),
                        }}>
                        {originalPrice}{priceUnit}
                      </Text>
                      <Text
                        style={{
                          fontFamily: fontFamily.Poppins_Bold,
                          color: colors.theme,
                          fontSize: isTablet ? textScale(18) : textScale(16),
                        }}>
                        {discountedPrice}{priceUnit}
                      </Text>
                    </>
                  ) : (
                    <Text
                      style={{
                      fontFamily: fontFamily.Poppins_Bold,
                      color: colors.theme,
                      fontSize: isTablet ? textScale(18) : textScale(16),
                      }}>
                      {discountedPrice}{priceUnit}
                    </Text>
                  )}
                </>
              </View>
            </View>
          ) : (
            <FlatList
              data={courseDetail?.chapters}
              // data={[1,2]}
              // data={courseDetail?.chapter}
              renderItem={({item}) => <ChapterContainer item={item} />}
            />
          )}
        </View>
      </View>
      {/* <View style={[styles.greyLine]} /> */}
      {/* this code will not be deleted as it will container info in future */}
      <View
        style={[
          styles.chapterDetailFeatureContainer,
          {
            borderTopWidth: moderateScaleVertical(1),
            borderBottomWidth: moderateScaleVertical(1),
            borderBottomColor: 'rgba(217, 217, 217, 0.65)',
            borderTopColor: 'rgba(217, 217, 217, 0.65)',
            paddingVertical: moderateScaleVertical(8),

          },
          {
            gap: moderateScale(5),
            marginTop: moderateScale(10),
            justifyContent: 'space-around',
          },
        ]}>
        <View
          style={[
            styles.chapterIconRow,
            userData?.course_type_available
              ? {
                  borderRightWidth: 1,
                  borderColor: colors.gray,
                  paddingRight: moderateScale(10),
                  gap: moderateScale(3),
                  paddingLeft:moderateScale(12),
                }
              : {},
            // {
            //   borderRightWidth: 2,
            //   borderColor: colors.gray,
            //   paddingRight: moderateScale(10),
            // },
          ]}>
          <Image
            source={imagePath.calenderCart}
            style={{
              width: moderateScaleVertical(10),
              height: moderateScaleVertical(10),
              backgroundColor: colors.anaGrey,
            }}
            resizeMode="contain"
          />

          <Text style={[styles.greyText, {color: colors.darkGrey}]}>
            {' '}
            {dayjs(courseDetail?.order_created_date).format('DD MMM YYYY')}

          </Text>
        </View>
        {userData?.course_type_available && (
          <View
            style={[
              styles.chapterIconRow,
              {
                borderRightWidth: 1,
                borderColor: colors.gray,
                paddingRight: moderateScale(10),
                gap: moderateScale(3),
              },
            ]}>
            <Image
              source={imagePath.clockCart}
              style={{
                width: moderateScaleVertical(10),
                height: moderateScaleVertical(10),
              }}
              resizeMode="contain"
            />

            <Text style={[styles.greyText, {color: colors.darkGrey}]}>
              {formatTime(courseDetail.duration) || ' 0s'}
            </Text>
          </View>
        )}
        <View style={[styles.chapterIconRow]}>
          <View
            style={{
              width: moderateScale(12),
              height: moderateScaleVertical(12),
              borderRadius: 500,
              overflow: 'hidden',
              backgroundColor: colors.lightThemeBlue,
            }}>

            {!!courseDetail?.instructor?.avatar ? (
              <FastImage source={{uri: `${IMAGE_API_URL}${courseDetail?.instructor?.avatar}` || courseDetail?.instructor?.avatar}} resizeMode='contain'  style={{width: '100%', height: '100%'}}/>
            ) : (
              <FastImage
                source={imagePath.sampleImage}
                style={{width: '100%', height: '100%'}}
              />
            )}
          </View>

          <Text style={[styles.greyText, {color: colors.darkGrey}]}>
            {' '}
            {" "+courseDetail?.instructor?.name}
          </Text>
        </View>
      </View>

      {userData?.course_type_available &&
        courseDetail?.order_type === 'Full' && (
          <View style={{marginTop: moderateScale(12),paddingHorizontal:moderateScale(20)}}>
            <Text
              style={{
                marginVertical: moderateScaleVertical(12),
                fontFamily: fontFamily.Poppins_Medium,
                fontSize: isTablet ? textScale(12) : textScale(16),
                color: colors.cartHeading,
                alignItems: 'center',
              }}>
              Choose your Course Type{' '}
              {/* Your Enrollment at our institute will be  */}
              {/* {<Text onPress={toggleModal}><TooltipIcon size={textScale(18)} color={colors.theme} name='questioncircleo'/> </Text>} */}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: moderateScale(12),
              }}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: moderateScale(4),
                  backgroundColor:
                    selectedType === 'online' ? colors.theme : 'white',
                  opacity: courseDetail?.online_price > 0 ? 1 : 0.5,
                  padding: moderateScale(12),
                  borderRadius: moderateScale(8),
                }}
                disabled={!(courseDetail?.online_price > 0)}
                onPress={() => {
                  setSelectedType('online');

                  addOnPrice({
                    cart_id: orderId,
                    course_id: courseDetail?.id,
                    course_type: 1,
                  });
                }}>
                {selectedType === 'online' ? <ToggleOn /> : <ToggleOff />}
                {selectedType === 'online' ? (
                  <CrossIcon
                    name="tablet-mobile-combo"
                    size={moderateScale(18)}
                    color={colors.white}
                  />
                ) : (
                  <CrossIcon
                    name="tablet-mobile-combo"
                    size={moderateScale(18)}
                    color={colors.grey1}
                  />
                )}
                <Text
                  style={{
                    fontFamily: fontFamily.Poppins_Medium,
                    color:
                      selectedType === 'online' ? colors.white : colors.black,
                    fontSize: isTablet ? textScale(11) : textScale(14),
                    opacity: courseDetail?.online_price > 0 ? 1 : 0.5,
                  }}>
                  Online
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: moderateScale(4),
                  backgroundColor:
                    selectedType === 'fullInPerson' ? colors.theme : 'white',
                  padding: moderateScale(12),
                  borderRadius: moderateScale(8),
                  opacity: courseDetail?.in_person_price > 0 ? 1 : 0.3,
                }}
                disabled={!(courseDetail?.in_person_price > 0)}
                onPress={() => {
                  setSelectedType('fullInPerson');

                  addOnPrice({
                    cart_id: orderId,
                    course_id: courseDetail?.id,

                    course_type: 2,
                  });
                }}>
                {selectedType === 'fullInPerson' ? <ToggleOn /> : <ToggleOff />}
                {selectedType === 'fullInPerson' ? (
                  <PersonIcon
                    name="person-walking-arrow-right"
                    size={moderateScaleVertical(18)}
                    color={colors.white}
                  />
                ) : (
                  <PersonIcon
                  name="person-walking-arrow-right"
                  size={moderateScaleVertical(18)}
                  color={colors.black}

                  />
                )}
                <Text
                  style={{
                    fontFamily: fontFamily.Poppins_Medium,
                    color:
                      selectedType === 'fullInPerson'
                        ? colors.white
                        : colors.black,
                    fontSize: isTablet ? textScale(11) : textScale(14),
                  }}>
                  In-person
                </Text>
              </TouchableOpacity>
            </View>
        {data?.data?.length>0 &&    <Text
              style={{
                fontFamily: fontFamily?.Poppins_Bold,
                fontSize: isTablet ? textScale(9) : textScale(14),
                color: colors.black,
                marginVertical: moderateScaleVertical(12),
              }}>
              Add Ons
            </Text>}

            {true ? (
              <>
                <FlatList
                  data={data?.data}
                  // data={addOnType}
                  scrollEnabled={false}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      onPress={() => {
                        handleSelection(item);
                        // cartUpgrade({
                        //    order_id:orderId,
                        //    course_id:courseDetail?.id,
                        // })
                      }}
                      style={{
                        flexDirection: 'row',
                        marginVertical: moderateScaleVertical(4),
                      }}>
                      {/* {item.isSelected ? ( */}
                      {item.is_selected ? (
                        <BlutTickRadio
                          width={textScale(20)}
                          height={textScale(20)}
                        />
                      ) : (
                        <ToggleOff
                          width={textScale(20)}
                          height={textScale(20)}
                        />
                      )}
                      <Text
                        style={{
                          flex: 1,
                          color: colors.black,
                          fontFamily: fontFamily.Poppins_Regular,
                          marginLeft: moderateScale(12),
                          fontSize: isTablet ? textScale(10) : textScale(13),
                        }}>
                        {' '}
                        {item?.name}
                      </Text>
                      <Text
                        style={{
                          fontFamily: fontFamily.Poppins_SemiBold,
                          // fontSize: textScale(12),
                          fontSize: isTablet ? textScale(9) : textScale(12),
                        }}>
                        {item?.price} KD
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </>
            ) : null}
          </View>
        )}
      {false && (
        <View
          style={{
            borderTopColor: colors.grey1,
            borderTopWidth: moderateScale(1),
            paddingTop: moderateScaleVertical(10),
            marginTop: moderateScaleVertical(10),
          }}>
          <View style={styles.greyContainer}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: moderateScaleVertical(10),
              }}>
              <TextInput
                style={styles.inputCode}
                placeholder={mainStrings.EnterPromoCode}
                value={codeDetail?.code}
                onChange={e => {
                  dispatch(couponCodeData({codeDetail: e}));
                }}
              />
              <TouchableOpacity
                style={styles.applyButton}
                onPress={handleCheckCode}>
                <Text style={styles.applyText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      {/* {couponType &&
      couponType(courseDetail?.coupon?.type_name) === 'course' ? (
        <View style={styles.discountContainer}>
          <SaleIcon
            name="sale"
            color={colors.theme}
            size={moderateScaleVertical(24)}
          />
          <Text style={styles.colorText}>buy two more course to get 130KD</Text>
        </View>
      ) : couponType &&
        couponType(courseDetail?.coupon?.type_name) === 'group' ? (
        <View style={styles.discountContainer}>
          <SaleIcon
            name="account-group"
            color={colors.theme}
            size={moderateScaleVertical(24)}
          />
          <Text style={styles.colorText}>make a group and get 30KD off</Text>
        </View>
      ) : couponType &&
        couponType(courseDetail?.coupon?.type_name) === 'package' ? (
        <View style={styles.discountContainer}>
          <SaleIcon
            name="package-variant-closed"
            color={colors.theme}
            size={moderateScaleVertical(24)}
          />
          <Text style={styles.colorText}>
            special package available and get 50% off
          </Text>
        </View>
      ) : (
        couponType &&
        couponType(courseDetail?.coupon?.type_name) === 'special' && (
          <View style={styles.discountContainer}>
            <SaleIcon
              name="sale"
              color={colors.theme}
              size={moderateScaleVertical(24)}
            />
            <Text style={styles.colorText}>50% available on BRIGHT4XX</Text>
          </View>
        )
      )} */}
      {/* <TouchableOpacity
        onPress={() => {
          navigation.navigate(navigationStrings.AvailableCoupons, {
            id: courseDetail?.id,
          });
        }}>
        <Text
          style={{
            fontFamily: fontFamily.Poppins_SemiBold,
            fontSize: textScale(14),
            color: colors.themeDark,
            textAlign: 'center',
            marginVertical: moderateScale(12),
          }}>
          {mainStrings.ViewAvailableOffers}
        </Text>
      </TouchableOpacity> */}
      <ModalCard
        isModalVisible={isModalVisible}
        toggleModal={toggleModal}
        isCancel>
        {/* <View style={{alignItems:"flex-end",marginBottom:moderateScale(13)}}>
            <TouchableOpacity onPress={toggleModal}>
            <CrossIcon size={textScale(24)} color={colors.black} name='cross'/>
          </TouchableOpacity>
        </View> */}
        <Text style={[styles.tooltipText]}>
          {mainStrings.courseTypeTooltip}
        </Text>
      </ModalCard>
    </View>
  );
};

export default CartCourseDetail;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#F0F4F8',
    backgroundColor: colors.boxGreyBlue,
    // backgroundColor: 'red',
    borderRadius: moderateScale(10),
    borderWidth: 1,

    // padding: moderateScaleVertical(20),
    paddingVertical: moderateScaleVertical(24),
    border: moderateScale(1),
    borderColor: colors.cartGrey,
    marginVertical: moderateScaleVertical(12),
  },
  totalContainer: {
    marginVertical: moderateScaleVertical(10),
  },
  chapterContainer: {
    // flexDirection:"row",
    marginTop: moderateScaleVertical(5),
    marginBottom: moderateScaleVertical(10),
    gap: moderateScale(6),
  },
  imageContainer: {
    width: moderateScale(70),
    height: moderateScale(75),
    borderRadius: textScale(10),
    overflow: 'hidden',
  },
  courseNamecontainer: {
    flexDirection: 'row',
  },
  courseHeadingContainer: {
    flex: 1,
    gap: moderateScale(6),
  },
  binContainer: {},
  imgStyle: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  greyText: {
    color: '#98A2B3',
    fontSize: DeviceInfo?.isTablet() ? textScale(10) : textScale(10),
    fontFamily: fontFamily.Poppins_Regular,
  },
  greyLine: {
    height: moderateScaleVertical(2),
    backgroundColor: colors.gray,
  },
  chapterDetailContainer: {
    flexDirection: 'row',
    gap: moderateScaleVertical(10),
  },
  chapterDetailFeatureContainer: {
    flexDirection: 'row',
    gap: moderateScaleVertical(20),
  },
  chapterIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex:1,
  },
  detailContainer: {
    flex: 1,
  },
  chapterNameContainer: {
    flexDirection: 'row',
  },
  courseTextChapterHeading: {
    fontFamily: fontFamily.Poppins_Bold,
    fontSize: DeviceInfo?.isTablet() ? textScale(12) : textScale(16),
    color: colors.cartHeading,
  },
  courseTextChapterText: {
    fontFamily: fontFamily.Poppins_Medium,
    fontSize: DeviceInfo?.isTablet() ? textScale(10) : textScale(14),
    color: '#000000',
    opacity: 0.7,
  },
  chapterNameText: {
    flex: 1,
    fontSize: textScale(12),
    fontFamily: fontFamily.Poppins_Regular,
    color: colors.cartChapterGrey,
  },
  inputCode: {
    backgroundColor: colors.white,
    color: colors.black,
    borderWidth: moderateScale(1),
    borderColor: colors.theme,
    // flex: 0.95,
    flex: 1,
    borderRadius: moderateScale(12),
    paddingVertical: moderateScaleVertical(12),
    paddingHorizontal: moderateScale(10),
    fontSize: textScale(14),
    fontFamily: fontFamily.Poppins_Medium,
  },
  applyButton: {
    backgroundColor: colors.themeDark,
    color: colors.white,
    borderRadius: moderateScale(12),
    padding: moderateScale(12),
  },
  applyText: {
    fontFamily: fontFamily.Poppins_Bold,
    color: colors.white,
    fontSize: DeviceInfo?.isTablet() ? textScale(10) : textScale(14),
  },
  greyContainer: {
    backgroundColor: colors.offWhite1,
    // padding: moderateScale(20),
    marginTop: moderateScaleVertical(12),
    borderRadius: moderateScale(18),
  },
  tooltipText: {
    fontFamily: fontFamily.Poppins_Regular,
    color: colors.black,
    fontSize: textScale(14),
    paddingBottom: moderateScaleVertical(12),
  },
  discountContainer: {
    borderTopColor: colors.grey1,
    borderBottomColor: colors.grey1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginTop: moderateScaleVertical(10),
    paddingVertical: moderateScaleVertical(8),
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScaleVertical(12),

    overflow: 'hidden',
  },
  colorText: {
    fontFamily: fontFamily.Poppins_Medium,
    color: colors.theme,
    fontSize: textScale(14),
    width: '85%',
  },
  priceLabel: {
    alignSelf: 'flex-start',
    backgroundColor: `${colors.theme}10`,
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScaleVertical(4),
    marginVertical: moderateScaleVertical(2),

    borderRadius: moderateScale(20),
  },
  textLabel: {
    fontFamily: fontFamily.Poppins_SemiBold,
    fontSize: DeviceInfo?.isTablet() ? textScale(10) : moderateScale(13),

    color: colors.theme,
    textAlign: 'center',
  },
});
