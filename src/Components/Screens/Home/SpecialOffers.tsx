import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import imagePath from '../../../constants/imagePath';
import navigationStrings from '../../../constants/navigationStrings';
import useGetData from '../../../hooks/useGetData';
import colors from '../../../styles/colors';
import commonStyles from '../../../styles/commonStyles';
import fontFamily from '../../../styles/fontFamily';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../styles/responsiveSize';
import {endpoints} from '../../../utils/endpoints';
import ErrorBox from '../../ErrorBox';

import * as Progress from 'react-native-progress';
import ImageIcon from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import usePostData from '../../../hooks/usePostData';
import {PackageList} from '../../../redux/slice/loaderSlice';
import {showError, showSuccess} from '../../../utils/helperFunctions';
import EmptyScreen from '../../EmptyScreen';
import {mainStrings} from '../../../constants/mainstrings';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import CourseBoxLoader from '../../Loader/CourseBoxLoader';
import {IMAGE_API_URL} from '../../../utils/urls';

interface CourseNameInterface {
  heading: string;
  price: number;
  instructorName: string;
  courseNameStyle?: ViewStyle;
}

export const CourseName: React.FC<CourseNameInterface> = ({
  heading,
  price,
  instructorName,
  courseNameStyle,
}) => {
  return (
    <View style={[styles.courseNameContainer, courseNameStyle]}>
      <View style={styles.bulletPoint} />
      <View style={styles.courseNameTextContainer}>
        <View style={[styles.courseHeadingContainer]}>
          <View style={{flex: 1}}>
            <Text
              style={{
                fontFamily: fontFamily.Poppins_Medium,
                fontSize: textScale(14),
                color: colors.white,
                // width:"75%"
              }}>
              {heading}{' '}
            </Text>
          </View>

          <View>
            <Text
              style={{
                fontFamily: fontFamily.Poppins_Bold,
                color: colors.white,
                fontSize: textScale(14),
              }}>
              {price}KD
            </Text>
          </View>
        </View>
        <Text style={[styles.courseHeadingInstructor]} numberOfLines={1}>
          {instructorName}
        </Text>
      </View>
    </View>
  );
};

const SpecialOffers = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // const {data: listPackage, status}: any = useGetData(
  //   `${endpoints.GET_PACKAGE}`,
  //   ['AVAILABLE_COUPONS_PACKAGE'],
  // );

  const {cardId} = useRoute().params;

  const {data: listPackage, status}: any = useGetData(
    `${endpoints.AVAILABLE_COUPONS}?coupon_type=3`,
    ['AVAILABLE_COUPONS_PACKAGE'],
  );
  function convertSeconds(seconds: number) {
    const days = Math.floor(seconds / (24 * 3600));
    seconds %= 24 * 3600;
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);
    seconds %= 60;

    return {days, hours, minutes, seconds};
  }
  const time = convertSeconds(1234567);

  const {
    mutate: cartPackage,
    data: cartData,
    status: cartStatus,
    error,
  } = usePostData(`${endpoints.ADD_TO_CART}`, ['ADD_PACKAGE_CART']);
  const userData = useSelector((state: any) => state?.auth?.userPayload);

  useEffect(() => {
    console.log('cartDatacartDatacartDatacartData', cartData, cartStatus);
    if (cartStatus === 'success') {
      showSuccess('Package of course added to cart');
      navigation.navigate(navigationStrings.Cart as never);
    } else if (cartStatus === 'error') {
      showError(error?.message);
    }
  }, [cartStatus, cartData]);

  useEffect(() => {
    if (status === 'pending') {
      dispatch(PackageList({loader: true}));
    } else if (status === 'success') {
      dispatch(PackageList({loader: false}));
    }
  }, [status]);

  if (status === 'pending') {
    return (
      <View style={{flex: 1, marginHorizontal: 10}}>
        <CourseBoxLoader />
        <CourseBoxLoader />
        <CourseBoxLoader />
        {/* <CourseLoader /> */}
        {/* <CourseLoader /> */}
      </View>
    );
  }

  if (status === 'error') {
    return <ErrorBox message="No special package found for you" />;
  }

  const packageDetail = listPackage?.data[0];

  return (
    <View style={[commonStyles.spacingCommon]}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        scrollEnabled={!!listPackage?.data[0]?.universities?.length}
        ListEmptyComponent={() => {
          return (
            <EmptyScreen
              image={imagePath.OffersEmpty}
              heading={'Your Offers is empty'}
              description={mainStrings.noOffersEmpty}
            />
          );
        }}
        renderItem={({item}) => {
          return (
            <LinearGradient
              colors={['#094E85', '#094E85']}
              style={styles.packageBox}
              useAngle
              angle={120}>
              <View style={styles.absPosition}>
                <Image
                  source={{uri: `${IMAGE_API_URL}${item.image}`}}
                  resizeMode="contain"
                  style={{
                    height: moderateScaleVertical(120),
                    width: moderateScale(180),
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  position: 'relative',
                  marginBottom: moderateScaleVertical(12),
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'flex-left',
                  }}>
                  <View
                    style={[
                      styles.rowContainer,
                      {
                        gap: moderateScale(8),
                        marginTop: moderateScale(8),
                        // position: 'absolute',
                        // backgroundColor:"red",

                        right: 0,
                      },
                    ]}>
                    <View style={styles.clockContainer}>
                      <CountdownCircleTimer
                        size={moderateScale(35)}
                        strokeWidth={3}
                        trailStrokeWidth={2}
                        isPlaying
                        duration={item?.expiry_in}
                        colors={item?.text_color}
                        trailColor="rgba(255,255,255,0.5)"
                        // colorsTime={[7, 5, 2, 0]}
                      >
                        {({remainingTime}) => (
                          <Text style={styles.clockTextHeading}>
                            {Math.floor(remainingTime / (24 * 3600))}
                          </Text>
                        )}
                      </CountdownCircleTimer>
                      <Text style={styles.clockText}>Days</Text>
                    </View>
                    <View style={styles.clockContainer}>
                      <CountdownCircleTimer
                        size={moderateScale(35)}
                        strokeWidth={3}
                        trailStrokeWidth={2}
                        isPlaying
                        duration={item?.expiry_in}
                        colors={item.text_color}
                        // trailColor='rgb(1,2,2,)'
                        trailColor="rgba(255,255,255,0.5)"
                        // colorsTime={[7, 5, 2, 0]}
                      >
                        {({remainingTime}) => (
                          <Text style={styles.clockTextHeading}>
                            {Math.floor((remainingTime % (24 * 3600)) / 3600)}
                          </Text>
                        )}
                      </CountdownCircleTimer>
                      <Text style={styles.clockText}>Hours</Text>
                    </View>
                    <View style={styles.clockContainer}>
                      <CountdownCircleTimer
                        size={moderateScale(35)}
                        strokeWidth={3}
                        trailStrokeWidth={2}
                        isPlaying
                        duration={item?.expiry_in}
                        colors={item.text_color}
                        trailColor="rgba(255,255,255,0.5)"
                        // colorsTime={[7, 5, 2, 0]}
                      >
                        {({remainingTime}) => (
                          <Text style={styles.clockTextHeading}>
                            {Math.floor((remainingTime % 3600) / 60)}
                          </Text>
                        )}
                      </CountdownCircleTimer>
                      <Text style={styles.clockText}>Mins</Text>
                    </View>
                    <View style={styles.clockContainer}>
                      <CountdownCircleTimer
                        size={moderateScale(35)}
                        strokeWidth={3}
                        trailStrokeWidth={2}
                        isPlaying
                        duration={item?.expiry_in}
                        colors={item.text_color}
                        trailColor="rgba(255,255,255,0.5)"
                        // colorsTime={[7, 5, 2, 0]}
                      >
                        {({remainingTime}) => (
                          <Text style={styles.clockTextHeading}>
                            {Math.floor(remainingTime % 60)}
                          </Text>
                        )}
                      </CountdownCircleTimer>
                      <Text style={styles.clockText}>Secs</Text>
                    </View>
                  </View>
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: textScale(14),
                      color: colors.white,
                      alignSelf: 'flex-end',
                    }}>
                    {item?.courses?.length} courses
                  </Text>
                </View>

                {/* <View style={styles.mainTextContainer}>
                <Text style={styles.mainHeading}>Special Package</Text>
                <Text
                  style={[
                    styles.paraHeading,
                    {fontFamily: fontFamily.Poppins_SemiBold, width: '80%'},
                  ]}>
                 {item?.description}
                </Text>
              </View> */}
                {/* <View style={styles.imgContainer}>
                <View style={styles.imgCont}>
                  <View
                    style={{
                      height: moderateScale(100),
                      borderRadius: moderateScale(12),
                      width: moderateScale(90),
                      position: 'absolute',
                      left: 15,
                      overflow: 'hidden',
                      top: 0,
                      borderWidth: 1,
                      borderColor: colors.gray1,
                      transform: [{rotate: '20deg'}],
                    }}>
                    <FastImage
                      source={imagePath.businessPhoto}
                      style={{width: '100%', height: '100%'}}
                      resizeMode="cover"
                    />
                  </View>
                  <View
                    style={{
                      height: moderateScale(100),
                      borderRadius: moderateScale(12),
                      width: moderateScale(90),
                      position: 'absolute',
                      left: 10,
                      top: 0,
                      overflow: 'hidden',
                      borderWidth: 1,
                      borderColor: colors.gray1,
                      transform: [{rotate: '10deg'}],
                    }}>
                    <FastImage
                      source={imagePath.businessPhoto}
                      style={{width: '100%', height: '100%'}}
                      resizeMode="cover"
                    />
                  </View>
                  <View
                    style={{
                      height: moderateScale(100),
                      borderRadius: moderateScale(12),
                      width: moderateScale(90),
                      position: 'absolute',
                      top: 0,
                      overflow: 'hidden',
                      borderWidth: 1,
                      borderColor: colors.gray1,
                      transform: [{rotate: '0deg'}],
                    }}>
                    <FastImage
                      source={imagePath.businessPhoto}
                      style={{width: '100%', height: '100%'}}
                      resizeMode="cover"
                    />
                  </View>
                </View>
                <Text
                  style={{
                    fontSize: textScale(12),
                    fontFamily: fontFamily.Poppins_Medium,
                    color: colors.white,
                    width: '100%',
                    zIndex: 10,
                    textAlign: 'center',
                    marginTop: moderateScaleVertical(10),
                  }}>
                  {item?.courses?.length} courses
                </Text>
              </View> */}
              </View>
              <View style={[]}>
                <Text style={styles.paraHeading}>Included Courses:</Text>
                <View style={{position: 'relative'}}>
                  <FlatList
                    renderItem={({item}) => {
                      console.log(
                        'itemitemitemitemitemitemitemitemitemitemitem11',
                        Object.keys(item.course),
                      );
                      console.log(
                        'itemitemitemitemitemitemitemitemitemitemitem22',
                        item.course,
                      );
                                       console.log(
                        'itemitemitemitemitemitemitemitemitemitemitem33',
                        item,
                      );

                      return (
                        <CourseName
                          heading={item?.course?.name}
                          price={
                            (+item?.course?.online_price || +item?.course?.in_person_price) ?? 0
                          }
                          instructorName={item?.course?.category?.name}
                        />
                      );
                    }}
                    data={item?.courses}
                    scrollEnabled={false}
                  />
                  <View
                    style={{
                      width: 2,
                      height: '100%',
                      backgroundColor: 'rgba(255, 255, 255, 1)',
                      opacity: 0.3,
                      position: 'absolute',
                      left: '1.3%',
                      top: 0,
                    }}
                  />
                </View>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={[styles.priceContainer, {flex: 1}]}>
                  <Text style={styles.totalPriceTextContainer}>
                    Total Price
                  </Text>
                  <View style={styles.priceTextContainer}>
                    <Text style={styles.priceText}>
                      {item?.onlinePrice > 0
                        ? item?.onlinePrice
                        : item?.inPersonPrice ?? 0}
                      KD
                    </Text>
                    <Text
                      style={[
                        styles.priceText,
                        {
                          color: colors.themeYellow,
                          fontFamily: fontFamily.Urbanist_Bold,
                          textDecorationLine: 'none',
                          marginLeft: moderateScale(10),
                        },
                      ]}
                      numberOfLines={1}>
                      {item?.discounted_online_price > 0
                        ? item?.discounted_online_price
                        : item?.discounted_in_person_price ?? 0}
                      KD
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  // style={[styles.circlePosition]}
                  style={{
                    width: moderateScale(120),
                    flexDirection: 'row',
                    borderRadius: moderateScale(40),
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: moderateScaleVertical(48),
                    backgroundColor: colors.themeYellow,
                    gap: moderateScale(8),
                  }}
                  onPress={() => {
                    // console.log("asdasdasdasdasd",item.id);

                    // return

                    const payload = {
                      coupon_university_id: item?.course?.id,
                      coupon_id: item?.coupon_id,
                      price_type: 'online',
                    };
                    cartPackage(payload);
                  }}>
                  <ImageIcon
                    name="shopping-cart"
                    size={moderateScale(18)}
                    color={colors.black}
                  />
                  <Text
                    style={{
                      color: colors.black,
                      fontSize: textScale(14),
                      fontFamily: fontFamily.Poppins_Medium,
                    }}>
                    {'Add'}
                  </Text>
                </TouchableOpacity>
              </View>

              {userData?.role === 2 && false && (
                <TouchableOpacity
                  onPress={() => {
                    console.log('yeah chal rha hai , idhar bhi chalega');

                    const payload = {
                      coupon_id: item?.course?.id,
                    };
                    cartPackage(payload);
                  }}
                  style={{
                    marginTop: moderateScale(12),
                    paddingTop: moderateScaleVertical(10),
                    borderTopColor: colors.white,
                    borderTopWidth: moderateScaleVertical(1),
                  }}>
                  <Text
                    style={{
                      fontFamily: fontFamily.Poppins_Medium,
                      color: colors.white,
                      textAlign: 'center',
                      fontSize: textScale(18),
                      letterSpacing: moderateScale(4),
                      textTransform: 'uppercase',
                    }}>
                    Add to Cart
                  </Text>
                </TouchableOpacity>
              )}
            </LinearGradient>
          );
        }}
        data={listPackage?.data}
      />
    </View>
  );
};

export default SpecialOffers;

const styles = StyleSheet.create({
  packageBox: {
    padding: moderateScale(18),
    borderRadius: moderateScale(12),
    marginVertical: moderateScale(12),
  },
  mainTextContainer: {
    marginVertical: moderateScaleVertical(12),
    flex: 1.8,
  },
  mainHeading: {
    fontSize: textScale(16),
    fontFamily: fontFamily.Poppins_SemiBold,
    color: colors.white,
    textTransform: 'uppercase',
  },
  paraHeading: {
    fontFamily: fontFamily.Poppins_SemiBold,
    color: colors.white,
    fontSize: textScale(12),
    textTransform: 'uppercase',
    opacity: 0.7,
    marginVertical: moderateScaleVertical(4),
  },
  imgContainer: {
    flex: 1,
    height: moderateScaleVertical(120),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    elevation: 13,
  },
  courseNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: moderateScale(6),
  },
  bulletPoint: {
    width: moderateScale(10),
    height: moderateScale(10),
    backgroundColor: colors.white,
    borderRadius: moderateScale(1000),
    marginRight: moderateScale(12),
  },
  courseNameTextContainer: {
    // alignItems:"center",
    // backgroundColor:"red",
    width: '90%',
  },
  courseHeadingContainer: {
    // fontFamily: fontFamily.Poppins_Medium,
    // fontSize: textScale(14),
    // color: colors.white,
    width: '100%',

    flexDirection: 'row',
    alignItems: 'center',
  },
  courseHeadingInstructor: {
    fontFamily: fontFamily.Poppins_Regular,
    fontSize: textScale(10),
    color: colors.white,
  },
  absPosition: {
    position: 'absolute',
    bottom: 0,
    right: moderateScale(12),
  },
  priceContainer: {
    marginVertical: moderateScaleVertical(12),
  },
  totalPriceTextContainer: {
    fontFamily: fontFamily.Poppins_Regular,
    fontSize: textScale(13),
    color: colors.white,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: moderateScaleVertical(12),
  },
  imgCont: {
    position: 'relative',
    height: '90%',
  },
  priceText: {
    fontFamily: fontFamily.Urbanist_Medium,
    fontSize: textScale(22),
    color: colors.white,
    textDecorationLine: 'line-through',
  },
  clockContainer: {},
  clockText: {
    fontFamily: fontFamily.Poppins_Regular,
    fontSize: textScale(12),
    color: colors.white,
  },
  clockTextHeading: {
    fontFamily: fontFamily.Poppins_Bold,
    fontSize: textScale(14),
    color: colors.white,
  },
});
