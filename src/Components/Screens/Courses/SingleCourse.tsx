import React, {useEffect, useState} from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import colors from '../../../styles/colors';
import fontFamily from '../../../styles/fontFamily';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from '../../../styles/responsiveSize';
import {CourseItem} from '../../../types/componentInterface';

import BlueCircle from '../../../assets/images/Icons/blueCircle.svg';
import GreyCircle from '../../../assets/images/Icons/greyCircle.svg';

import StarO from 'react-native-vector-icons/AntDesign';
import ImageIcon from 'react-native-vector-icons/Feather';
import AppIcon, {
  default as WarningIcon,
} from 'react-native-vector-icons/FontAwesome';
import BookIcon from 'react-native-vector-icons/FontAwesome6';

import {useSelector} from 'react-redux';
import usePostData from '../../../hooks/usePostData';
import {endpoints} from '../../../utils/endpoints';
import {showError, showSuccess} from '../../../utils/helperFunctions';

import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import dayjs from 'dayjs';
import imagePath from '../../../constants/imagePath';
import navigationStrings from '../../../constants/navigationStrings';
import ModalDelete from '../../Layout/Card/ModalDelete';
import {cartCallData} from '../../../redux/slice/apiSlice';
import DeviceInfo from 'react-native-device-info';
import HeartIcon from 'react-native-vector-icons/AntDesign';
import {IMAGE_API_URL} from '../../../utils/urls';

const SingleCourse: React.FC<CourseItem> = ({
  numLesson,
  dueDatePassed,
  heading,
  isLocked,
  getDataAgain,
  isExpired,
  isPurchasable,
  authorAvatar,
  author,
  course,
  description,
  discountPrice,
  purchasedId,
  refetch,
  imageUrl,
  isAddedToCart,
  price,
  dueDate,
  isFavorite,
  courseDiscount,
  couponCourse,
  thumbnail,
  courseId,
  handleCouponSelection,
  courseDiscountType,
  getCourseDataAgain,
  purchasedCourse,
  courseType,
  groupLink,
  courseCode,
}) => {
  const [image, setImage] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [redColor, setRedColor] = useState(isFavorite);
  const [addToCart, setAddToCart] = useState(isAddedToCart);

  const userData = useSelector((state: any) => state?.auth?.userPayload);
  const cartCall = useSelector((state: any) => state.apiCall.cartCall);

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  console.log('descriptiondescriptiondescription', dueDate);

  // const [redColor,setRedColor]=useState();

  const {mutate: sendToWishlist, status: wishStatus} = usePostData(
    endpoints.STUDENT_WISHLIST,
    ['STUDENT_WISHLIST'],
  );

  const {
    mutate: wishlistDataDelete,
    status: wishDeleteSuccess,
    isError: errorWishlist,
  } = usePostData(
    endpoints.STUDENT_WISHLIST,
    ['STUDENT_WISHLIST_DELETE'],
    'delete',
  );

  const {
    mutate: cartPackage,
    data: cartData,
    status: cartStatus,
    error,
  } = usePostData(`${endpoints.ADD_TO_CART}`, ['ADD_PACKAGE_CART']);

  // const handleWishlist = () => {
  //   sendToWishlist({course_id: courseData?.data?.id});
  // };

  useEffect(() => {
    if (wishStatus === 'error') {
      setRedColor(false);
      showError('Error while adding course to the wishlist');
    } else if (wishStatus === 'success') {
      setRedColor(true);
      showSuccess('Courses added to wishlist successfully');

      // refetch&&  refetch();
    }
  }, [wishStatus]);
  useEffect(() => {
    if (wishDeleteSuccess === 'error') {
      // setRedColor(false)
      showError('Error while removing course from the wishlist');
    } else if (wishDeleteSuccess === 'success') {
      // setRedColor(false)
      showSuccess('Courses removed from wishlist successfully');
      // refetch && refetch();
    }
  }, [wishDeleteSuccess]);
  const handleWishlist = () => {
    console.log(
      'isFavouriteisFavouriteisFavouriteisFavouriteisFavourite',
      isFavorite,
      courseId,
    );
    if (redColor) {
      setRedColor(false);
      wishlistDataDelete({id: courseId});
    } else {
      setRedColor(true);
      sendToWishlist({course_id: courseId});
      return;
    }
  };

  const {
    mutate: removeCartPackage,
    status: cartStatusRemove,
    // error,
  } = usePostData(`${endpoints.REMOVE_FROM_CART}`, ['ADD_PACKAGE_CART']);

  useEffect(() => {
    console.log('cartDatacartDatacartDatacartData', cartData, cartStatus);
    if (cartStatus === 'success') {
      showSuccess('Package of course added to cart');
      getDataAgain && getDataAgain();
      // getCourseDataAgain && getCourseDataAgain();
      // refetch && refetch();
      cartCallData({cartCall: cartCall + 1});
      // setAddToCart(true)
    } else if (cartStatus === 'error') {
      showError(error?.message);

      // getCourseDataAgain && getCourseDataAgain();
      // refetch && refetch();
    }
  }, [cartStatus, cartData]);

  useEffect(() => {
    if (cartStatusRemove === 'success') {
      showSuccess('Package of course remove from cart');
      cartCallData({cartCall: cartCall + 1});
      getDataAgain && getDataAgain();
      // getCourseDataAgain && getCourseDataAgain();
      // refetch && refetch();
      // setAddToCart(false);
    } else if (cartStatusRemove === 'error') {
      showError(error?.message);
      cartCallData({cartCall: cartCall + 1});
      // getCourseDataAgain && getCourseDataAgain();
      // refetch && refetch();
    }
  }, [cartStatusRemove, cartData]);

  const handleLessons = () => {
    if (isLocked) {
      toggleModal();
      return;
    }

    if (userData?.role === 3) {
      navigation.navigate(navigationStrings.InstructorCourses, {
        CourseId: course?.id,
      });
      return;
    }
    navigation.navigate(navigationStrings.SingleCourseDetail, {
      courseId: course?.id,
    });
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const openWhatsApp = () => {
    const url = `https://chat.whatsapp.com/${groupLink}`; // replace with your WhatsApp group link
    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log("Don't know how to open URI: " + url);
        }
      })
      .catch(err => console.error('An error occurred', err));
  };

  return (
    <View style={[styles.singleCourseContainer]}>
      <View style={[styles.imageContainer]}>
        {dueDatePassed && (
          <View style={[styles.dueContainer]}>
            <Text
              style={{
                fontFamily: fontFamily.Poppins_SemiBold,
                color: colors.white,
                fontSize: 14,
              }}>
              Due
            </Text>
          </View>
        )}
        {image?.uri ? (
          <View style={{position: 'relative'}}>
            {isLocked ? (
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: colors.black,
                  justifyContent: 'center',
                  alignItems: 'center',
                  opacity: 0.45,
                  zIndex: 1,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                }}>
                <View
                  style={{
                    width: moderateScale(24),
                    height: moderateScaleVertical(24),
                  }}>
                  <Image source={imagePath.whiteLock} resizeMode="cover" />
                </View>
              </View>
            ) : null}
            <FastImage
              source={{uri: `${IMAGE_API_URL}${image.uri}` || image?.uri}}
              style={styles.image}
            />
            {/* <FastImage source={imagePath.SAMPLEIMAGE} style={styles.image} /> */}
          </View>
        ) : (
          <View style={{position: 'relative'}}>
            {isLocked && (
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: colors.black,
                  justifyContent: 'center',
                  alignItems: 'center',
                  opacity: 0.6,
                  zIndex: 1,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                }}>
                <View
                  style={{
                    width: moderateScale(24),
                    height: moderateScaleVertical(24),
                  }}>
                  <Image source={imagePath.whiteLock} resizeMode="cover" />
                </View>
              </View>
            )}
            <FastImage source={{uri: `${IMAGE_API_URL}${imageUrl}` || imageUrl}} style={styles.image} />
            {/* <FastImage source={imagePath.SAMPLEIMAGE} style={styles.image} /> */}
          </View>
        )}

        <View style={[styles.labelYellow]}>
          <Text style={[styles.labelText]}>{courseCode}</Text>
        </View>
        {/* {thumbnail && <TouchableOpacity style={[styles.thumbnailBtn]} onPress={handleImage}>
          <View style={[styles.thumbnailPicture]}>
            <ImageIcon
              size={moderateScale(20)}
              color={colors.white}
              name="images"
            />
          </View>
          <Text style={[styles.thumbnailText]}>Edit Image</Text>
        </TouchableOpacity>} */}
        {couponCourse && (
          <TouchableOpacity
            style={[styles.circlePosition]}
            onPress={handleCouponSelection}>
            {addToCart ? <BlueCircle /> : <GreyCircle />}
          </TouchableOpacity>
        )}

        {!purchasedCourse && (
          <TouchableOpacity
            style={[
              styles.circlePosition,
              {backgroundColor: 'rgba(255,255,255,0.3)'},
            ]}
            onPress={handleWishlist}>
            {/* {isFavorite ? <BlueCircle /> : <GreyCircle />} */}
            {
              <HeartIcon
                name="heart"
                size={20}
                color={redColor ? colors.red : colors.white}
              />
            }
          </TouchableOpacity>
        )}

        <View
          style={[
            styles.labelBlue,
            {flexDirection: 'row', alignItems: 'center', gap: moderateScale(8)},
          ]}>
          <BookIcon
            color={colors.white}
            name="book-bookmark"
            size={moderateScale(14)}
          />
          <Text style={[styles.labelTextBlue]}>Lessons : {numLesson} </Text>
        </View>
      </View>
      <View style={[styles.courseDetailContainer]}>
        <View style={[styles.authorDetail]}>
          <View style={[styles.flexRow]}>
            <Text style={[styles.courseText]}>{heading}</Text>
            {!!purchasedCourse && (
              <View style={[styles.labelCourseType]}>
                <Text style={[styles.labelCourseText]}>
                  {course?.course_type == 1 ? 'online' : 'in-person'}
                </Text>
              </View>
            )}
          </View>

          <View
            style={[
              styles.insContainer,
              {marginBottom: moderateScaleVertical(-4)},
            ]}>
            <View style={[styles.insContainer]}>
              <View style={styles.insImageContainer}>
                <FastImage
                  source={{
                    uri: `${IMAGE_API_URL}${authorAvatar}` || authorAvatar,
                  }}
                  style={{width: '100%', height: '100%'}}
                  resizeMode="cover"
                />
              </View>
              <Text
                style={[
                  styles.authorText,
                  {
                    fontFamily: fontFamily.Poppins_Regular,
                    fontSize: DeviceInfo.isTablet()
                      ? textScale(10)
                      : textScale(14),
                    color: colors.theme,
                  },
                ]}>
                {author}
              </Text>
            </View>

            <View style={[styles.insContainer, {gap: moderateScale(4)}]}>
              <StarO
                name="staro"
                color={colors.themeOrange}
                size={moderateScale(12)}
              />
              <Text style={[styles.authorText]}>
                {isNaN(+course?.average_rating) ? 0 : +course?.average_rating}/5
              </Text>
            </View>
          </View>
        </View>
        <View style={[styles.descriptionContainer]}>
          <Text style={[styles.descriptionText]} numberOfLines={3}>
            {description}
          </Text>
        </View>
        {!!purchasedCourse || userData?.role === 3 ? (
          <View
            style={[
              styles.priceContainer,
              {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                top: DeviceInfo?.isTablet() ? 4 : 4,
                marginTop: moderateScale(5),
                marginBottom: moderateScale(6),
              },
            ]}>
            <TouchableOpacity
              style={[
                DeviceInfo?.isTablet()
                  ? styles.purchasedButtonTablet
                  : styles.purchasedButton,
                {backgroundColor: colors.theme},
              ]}
              onPress={openWhatsApp}>
              <Text
                style={[
                  DeviceInfo?.isTablet()
                    ? styles.purchasedLabelTablet
                    : styles.purchasedLabel,
                  {color: colors.white},
                ]}>
                Join Group
              </Text>
              <AppIcon
                name="whatsapp"
                color={colors.white}
                size={DeviceInfo?.isTablet() ? textScale(12) : textScale(20)}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                DeviceInfo?.isTablet()
                  ? styles.purchasedButtonTablet
                  : styles.purchasedButton,
              ]}
              onPress={handleLessons}>
              <Text
                style={[
                  DeviceInfo?.isTablet()
                    ? styles.purchasedLabelTablet
                    : styles.purchasedLabel,
                  {color: colors.black},
                ]}>
                Lessons
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={[styles.priceContainer]}>
            {/* <Text style={[styles.authorText, {fontSize: textScale(16)}]}>
              Price
            </Text> */}
            {!isExpired && (
              <View style={[styles.priceDisplay]}>
                {price > 0 && (
                  <View style={{flex: 0.7}}>
                    {/* <View style={styles.priceLabel}>
                  <Text style={styles.textLabel}>
                    {price + 'KD'}
                  </Text>
                </View> */}
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      {discountPrice !== price && (
                        <Text style={[styles.priceText]}>{price}KD </Text>
                      )}
                      <Text
                        style={[
                          styles.realPriceText,
                          {
                            color: courseDiscount
                              ? colors.themeGreen
                              : colors.theme,
                          },
                        ]}>
                        {discountPrice}KD
                      </Text>
                    </View>

                    {/* {isAddedToCart && (
                  <Text
                    style={[
                      styles.realPriceText,
                      {
                        color: colors.themeGreen,
                        fontSize: textScale(12),
                        fontFamily: fontFamily.Poppins_Medium,
                      },
                    ]}>
                    Discount Applied
                  </Text>
                )} */}
                  </View>
                )}
                <View style={{flex: 0.2}}>
                  {userData?.role === 2 && isPurchasable && price > 0 && (
                    <TouchableOpacity
                      // style={[styles.circlePosition]}
                      style={{
                        width: moderateScaleVertical(90),
                        flexDirection: 'row',
                        borderRadius: moderateScale(40),
                        justifyContent: 'center',
                        alignItems: 'center',
                        // height: moderateScaleVertical(48),
                        backgroundColor: addToCart
                          ? colors.green
                          : colors.theme,
                        gap: moderateScale(8),
                        paddingVertical: moderateScale(12),
                        // bottom:moderateScale(14)
                      }}
                      onPress={() => {
                        // console.log("asdasdasdasdasd",courseId);
                        // return;
                        if (addToCart) {
                          console.log(
                            'isAddedToCartisAddedToCartisAddedToCartisAddedToCart',
                            addToCart,
                          );

                          const payload = {
                            course_id: courseId,
                          };
                          setAddToCart(false);
                          removeCartPackage(payload);
                        } else {
                          const payload = {
                            course_id: courseId,
                            price_type: 'online',
                          };
                          setAddToCart(true);
                          cartPackage(payload);
                        }
                      }}>
                      {/* <ImageIcon
                      name="shopping-cart"
                      size={moderateScale(18)}
                      color={colors.white}
                    /> */}
                      {userData?.course_type_available ? (
                        <Text
                          style={{
                            color: colors.white,
                            fontSize: DeviceInfo?.isTablet()
                              ? moderateScale(10)
                              : textScale(14),
                            fontFamily: fontFamily.Poppins_Medium,
                          }}>
                          {addToCart ? 'Added' : 'Add'}
                        </Text>
                      ) : (
                        <Text
                          style={{
                            color: colors.white,
                            fontSize: DeviceInfo?.isTablet()
                              ? moderateScale(10)
                              : textScale(14),
                            fontFamily: fontFamily.Poppins_Medium,
                          }}>
                          {addToCart ? 'Enrolled' : 'Enroll'}
                        </Text>
                      )}
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            )}
            {/* {courseDiscountType && courseDiscountType() === 'course' ? (
            <View style={styles.discountContainer}>
              <SaleIcon
                name="sale"
                color={colors.theme}
                size={moderateScaleVertical(24)}
              />
              <Text style={styles.colorText}>
                buy two more course to get 130KD
              </Text>
            </View>
          ) : courseDiscountType && courseDiscountType() === 'group' ? (
            <View style={styles.discountContainer}>
              <SaleIcon
                name="account-group"
                color={colors.theme}
                size={moderateScaleVertical(24)}
              />
              <Text style={styles.colorText}>
                make a group and get 30KD off
              </Text>
            </View>
          ) : courseDiscountType && courseDiscountType() === 'package' ? (
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
            courseDiscountType &&
            courseDiscountType() === 'special' && (
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
          </View>
        )}
      </View>
      <ModalDelete isModalVisible={isModalVisible} toggleModal={toggleModal}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: moderateScaleVertical(20),
          }}>
          <WarningIcon
            color={colors.red}
            size={moderateScale(100)}
            name="warning"
          />
          <Text
            style={{
              fontFamily: fontFamily.Poppins_Medium,
              color: colors.black,
              fontSize: textScale(16),
              textAlign: 'center',
            }}>
            Please complete your payment to access the Lessons
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: moderateScale(20),
              marginTop: moderateScale(12),
            }}>
            <TouchableOpacity
              onPress={toggleModal}
              style={{
                paddingHorizontal: moderateScale(16),
                borderRadius: moderateScale(8),
                backgroundColor: colors.grey1,
                paddingVertical: moderateScaleVertical(12),
                width: width / 3.4,
              }}>
              <Text
                style={{
                  color: colors.white,
                  fontFamily: fontFamily.Poppins_Medium,
                  textAlign: 'center',
                }}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIsModalVisible(!isModalVisible);
                navigation.navigate(navigationStrings.PurchasedCourseDetail, {
                  purchasedId: purchasedId,
                  courseId: course?.id,
                });
              }}
              style={{
                paddingHorizontal: moderateScale(16),
                borderRadius: moderateScale(8),
                backgroundColor: colors.red,
                width: width / 3.4,
                paddingVertical: moderateScaleVertical(12),
              }}>
              <Text
                style={{
                  color: colors.white,
                  fontFamily: fontFamily.Poppins_Medium,
                  textAlign: 'center',
                }}>
                Pay
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ModalDelete>
    </View>
  );
};

export default SingleCourse;

const styles = StyleSheet.create({
  singleCourseContainer: {
    backgroundColor: colors.cardGrey,
    borderRadius: moderateScale(20),
    overflow: 'hidden',
    // width:600,

    width: DeviceInfo.isTablet() ? width / 2.28 : null,

    // height: moderateScaleVertical(370),
    // maxHeight: moderateScaleVertical(370),
    marginVertical: moderateScale(14),

    marginHorizontal: moderateScale(4),
  },
  imageContainer: {
    overflow: 'hidden',
    // height: moderateScaleVertical(180),

    // minHeight: moderateScale(150),
    // maxHeight: moderateScale(150),

    flex: 1,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: moderateScaleVertical(180),
    resizeMode: 'cover',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(8),
    marginBottom: moderateScale(4),
  },

  courseDetailContainer: {
    paddingVertical: moderateScaleVertical(10),
    paddingHorizontal: moderateScaleVertical(16),
    // flex: 1,
  },
  authorDetail: {
    marginBottom: moderateScale(10),
    gap: moderateScale(2),
  },
  courseText: {
    fontFamily: 'Poppins-Medium',
    fontSize: DeviceInfo?.isTablet() ? moderateScale(12) : moderateScale(18),
    color: colors.black,
  },
  labelCourseType: {
    backgroundColor: `${colors.themeOrange}12`,
    paddingVertical: moderateScale(4),
    width: moderateScale(74),
    borderRadius: moderateScale(3000),
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelCourseText: {
    fontFamily: fontFamily.Poppins_Regular,
    color: colors.themeOrange,
    fontSize: DeviceInfo?.isTablet() ? moderateScale(8) : moderateScale(12),
  },

  authorText: {
    fontFamily: 'Poppins-Regular',
    fontSize: DeviceInfo?.isTablet() ? moderateScale(8) : moderateScale(12),
    color: colors.gray1,
  },
  descriptionContainer: {
    // marginVertical: moderateScaleVertical(4),
    marginBottom: moderateScale(0),
    height: moderateScaleVertical(56),
    overflow: 'hidden',
  },
  descriptionText: {
    fontSize: DeviceInfo?.isTablet() ? moderateScale(8) : textScale(12),
    fontFamily: 'Poppins-Regular',
    color: colors.black,
    opacity: 0.8,
  },
  priceContainer: {
    top: moderateScale(12),
    // marginBottom: moderateScaleVertical(10),
  },
  purchasedButton: {
    borderRadius: moderateScale(5000),
    backgroundColor: '#FFBA00',
    paddingVertical: moderateScale(12),
    // paddingHorizontal:moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
    width: moderateScale(140),
    flexDirection: 'row',

    gap: moderateScale(10),
  },
  purchasedButtonTablet: {
    borderRadius: moderateScale(5000),
    backgroundColor: '#FFBA00',
    paddingVertical: moderateScale(7),
    // paddingHorizontal:moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
    width: moderateScale(100),
    flexDirection: 'row',

    gap: moderateScale(8),
  },
  purchasedLabel: {
    fontFamily: fontFamily.Poppins_SemiBold,
    fontSize: DeviceInfo?.isTablet() ? moderateScale(9) : moderateScale(14),
    color: colors.white,
  },
  purchasedLabelTablet: {
    fontFamily: fontFamily.Poppins_SemiBold,
    fontSize: textScale(9),
    color: colors.white,
  },
  priceDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,

    gap: moderateScale(10),
    marginBottom: moderateScale(20),
  },
  priceText: {
    fontFamily: fontFamily.Poppins_Regular,
    fontSize: DeviceInfo?.isTablet()
      ? moderateScaleVertical(15)
      : textScale(22),
    color: colors.blueGrey,
    textDecorationStyle: 'solid',
    textDecorationLine: 'line-through',
  },
  realPriceText: {
    fontFamily: fontFamily.Poppins_SemiBold,
    fontSize: DeviceInfo?.isTablet()
      ? moderateScaleVertical(15)
      : textScale(22),
    color: colors.themeDark,
  },

  labelYellow: {
    backgroundColor: '#FFBA00',
    position: 'absolute',
    paddingVertical: moderateScale(4),
    paddingHorizontal: moderateScale(7),
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',

    borderTopRightRadius: moderateScale(20),
    top: moderateScaleVertical(10),
    borderBottomRightRadius: moderateScale(20),
  },

  thumbnailBtn: {
    flexDirection: 'row',
    backgroundColor: colors.theme,
    padding: moderateScale(8),
    borderRadius: moderateScale(102),
    gap: moderateScale(12),

    position: 'absolute',
    right: moderateScale(12),
    bottom: moderateScaleVertical(12),
  },
  thumbnailText: {
    fontFamily: fontFamily.Poppins_SemiBold,
    color: colors.white,
    fontSize: textScale(12),
  },
  thumbnailPicture: {},

  circlePosition: {
    position: 'absolute',
    top: moderateScaleVertical(14),
    right: moderateScale(14),
    backgroundColor: colors.white,
    padding: moderateScale(10),
    borderRadius: moderateScale(300),
  },
  dueContainer: {
    position: 'absolute',
    top: 20,
    right: 10,
    zIndex: 1000,
    paddingVertical: moderateScale(6),
    paddingHorizontal: moderateScale(16),
    borderRadius: moderateScale(20),
    backgroundColor: colors.red,
  },
  labelText: {
    fontFamily: 'Urbanist-SemiBold',
    fontSize: DeviceInfo?.isTablet() ? moderateScale(12) : textScale(18),
  },

  labelBlue: {
    backgroundColor: colors.theme,
    position: 'absolute',
    borderRadius: moderateScale(20),
    paddingVertical: moderateScale(6),
    paddingHorizontal: moderateScale(10),
    left: moderateScale(12),
    bottom: moderateScale(8),
  },
  labelTextBlue: {
    fontFamily: 'Urbanist-SemiBold',
    color: colors.white,
    fontSize: DeviceInfo?.isTablet() ? moderateScale(10) : textScale(14),
  },
  discountContainer: {
    borderTopColor: colors.grey1,
    borderTopWidth: 1,
    marginTop: moderateScale(10),
    paddingVertical: moderateScaleVertical(8),
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(12),

    overflow: 'hidden',
  },
  colorText: {
    fontFamily: fontFamily.Poppins_Medium,
    color: colors.theme,
    fontSize: textScale(14),
    width: '85%',
  },
  insContainer: {
    flexDirection: 'row',
    gap: moderateScale(8),
    alignItems: 'center',
    // marginTop:moderateScaleVertical(2),
  },
  insImageContainer: {
    width: moderateScale(22),
    height: moderateScale(22),
    borderRadius: moderateScale(1200),
    overflow: 'hidden',
  },
  priceLabel: {
    alignSelf: 'flex-start',
    backgroundColor: `${colors.theme}10`,
    paddingHorizontal: moderateScale(12),
    marginVertical: moderateScale(3),
    borderRadius: moderateScale(20),
    paddingVertical: moderateScaleVertical(4),
  },
  textLabel: {
    fontFamily: fontFamily.Poppins_SemiBold,
    fontSize: moderateScale(16),

    color: colors.theme,
    textAlign: 'center',
  },
});
