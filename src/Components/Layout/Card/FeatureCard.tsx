import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import LinearGradient from 'react-native-linear-gradient';
import RightArrow from 'react-native-vector-icons/AntDesign';
import imagePath from '../../../constants/imagePath';
import navigationStrings from '../../../constants/navigationStrings';
import colors from '../../../styles/colors';
import fontFamily from '../../../styles/fontFamily';
import {
  moderateScale,
  moderateScaleVertical,
  textScale
} from '../../../styles/responsiveSize';
import { FeatureCardInterface } from '../../../types/componentInterface';

/*
[
    {
        "id": 15,
        "code": "BRIGHT0KQQF",
        "type": "Group Coupon",
        "image": null,
        "user_type": "student",
        "is_owner": "1",
        "is_joined": "0",
        "backgroud_color": null,
        "text_color": null,
        "text": null,
        "button_color": null,
        "discount_amount": 10,
        "discount_type": "Amount",
        "max_members": 2,
        "courses_count": null,
        "fixed_price": null,
        "expiry_date": "2024-07-19T10:58:40.000000Z",
        "created_at": "2024-07-12T10:58:40.000000Z",
        "updated_at": "2024-07-12T10:58:40.000000Z",
        "university_id": null,
        "departments": [],
        "courses": [],
        "segment": {
            "id": 4,
            "min": 1,
            "max": 5,
            "discount_type": "1",
            "discount": 10,
            "created_at": "2024-06-12T08:18:23.000000Z",
            "updated_at": "2024-06-12T08:18:23.000000Z"
        },
        "groupCouponMember": [
            {
                "id": 189,
                "first_name": "Tyler",
                "last_name": "Durden",
                "email": null,
                "country_code": "965",
                "mobile": "9998887776",
                "avatar": null,
                "role": 2,
                "last_login": "2024-07-17 06:53:56 am",
                "dark": 0,
                "wallet": 0,
                "referred_by": null,
                "referral_code": "BF-5930",
                "about": null,
                "location": null,
                "lat": null,
                "long": null,
                "state": null,
                "town": null,
                "is_location_enable": 1,
                "status": 1,
                "no_of_logins": 2,
                "created_at": "2024-07-01 09:59:19 am",
                "updated_at": "2024-07-17 06:55:22 am",
                "pivot": {
                    "coupon_id": 15,
                    "user_id": 189,
                    "is_owner": 1,
                    "id": 1,
                    "is_paid": 0
                }
            },
            {
                "id": 181,
                "first_name": "John",
                "last_name": "Doe",
                "email": "johndoe@gmail.com",
                "country_code": "91",
                "mobile": "1234567890",
                "avatar": null,
                "role": 3,
                "last_login": "2024-07-27 01:29:59 pm",
                "dark": 0,
                "wallet": 0,
                "referred_by": null,
                "referral_code": null,
                "about": null,
                "location": null,
                "lat": null,
                "long": null,
                "state": null,
                "town": null,
                "is_location_enable": 1,
                "status": 1,
                "no_of_logins": 2,
                "created_at": "2024-06-14 12:41:50 pm",
                "updated_at": "2024-07-27 01:29:59 pm",
                "pivot": {
                    "coupon_id": 15,
                    "user_id": 181,
                    "is_owner": 1,
                    "id": 2,
                    "is_paid": 0
                }
            }
        ],
        "universities": [],
        "student": null
    }
]


*/

const STAT_IMAGE =
'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=3032&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

const FeatureCard: React.FC<FeatureCardInterface> = ({
  text,
  cardId,
  courses,
  colorGrad = ['#4F88B4', '#112A50'],
  imageBack = STAT_IMAGE,
  svgImage,
  textPara,
  specialCourse,
  textColor,
  textDescColor,
  textSize,
  duration = 1234567,
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  function convertSeconds(seconds: number) {
    const days = Math.floor(seconds / (24 * 3600));
    seconds %= 24 * 3600;
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);
    seconds %= 60;

    return {days, hours, minutes, seconds};
  }
  const time = convertSeconds(duration);

  return (
    <View
      // source={{uri: imageBack}}
      style={styles.card}
      // resizeMode="cover"
    >
      <TouchableOpacity
        onPress={() => {
          // navigation.navigate(navigationStrings.SpecialOffers);
        }}
        activeOpacity={0.95}

        >
        <LinearGradient
          style={[styles.cardGradient]}
          colors={colorGrad}
          angle={290}
          useAngle>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={[styles.cardHeading, {width: '60%',color:textColor?textColor:colors.themeYellow,fontSize:textSize==="s"?moderateScale(16):textSize==="m"?moderateScale(20):moderateScale(24)}]}
              numberOfLines={2}>
              {text}
              {/* Enroll in our courses */}

            </Text>
            {/* <View
              style={[
                styles.rowContainer,
                {
                  gap: moderateScale(8),
                  marginTop: moderateScale(8),
                  position: 'absolute',
                  right: 0,
                },
              ]}>
              <View style={styles.clockContainer}>
                <CountdownCircleTimer
                  size={moderateScale(35)}
                  strokeWidth={3}
                  trailStrokeWidth={2}
                  isPlaying
                  duration={duration}
                  colors={['#ffffff']}
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
                  duration={duration}
                  colors={['#ffffff']}
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
                  duration={duration}
                  colors={['#ffffff']}
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
            </View> */}
          </View>
          <View style={styles.cardInfo}>
            <View style={styles.cardInfoPara}>
              <Text
                style={[
                  {
                    fontFamily: fontFamily.Poppins_Regular,
                    fontSize: textScale(13),
                    color: textDescColor?textDescColor:colors.white,
                  },
                ]}
                numberOfLines={2}>
                {textPara}
                {/* Enroll in our courses at institution and get 25% for this semester */}
              </Text>

              {/* <FlatList
            // data={courses}
            data={[1, 2, 4, 4, 5].slice(0,3)}
            scrollEnabled={false}
            renderItem={({item}) => {
              return (
                <>
                  <CourseName
                    // heading={`${item?.course?.name.slice(0,40)}...` || 'asdasdasdasd'.slice(0,5)}
                    heading={'asdasdasdasdas da s asd as  as da sd'.slice(0,30)}
                    instructorName={
                      item?.courses?.instructor?.first_name || 'prince sapra'
                    }
                    price={item?.courses?.total_amount || 200}
                    courseNameStyle={{marginVertical: moderateScaleVertical(0)}}
                  />
                </>
              );
            }}
          /> */}


                  <TouchableOpacity
                  style={styles.cardButton}
                onPress={() => {
                    !specialCourse
                      ? navigation.navigate(navigationStrings.Courses, { cardId: cardId })
                      : navigation.navigate(navigationStrings.SpecialOffers, { cardId: cardId });
                    }}
                  >
                <Text style={styles.cardButtonText}>View Courses</Text>
                <RightArrow name='arrowright' size={moderateScale(18)} color={colors.black}/>
              </TouchableOpacity>

              {/* <View style={styles.priceContainer}>
            <Text style={styles.totalPriceTextContainer}>Total Price ({courses.length})</Text>
            <View style={styles.priceTextContainer}>
              <Text style={styles.priceText}>300KD</Text>
              <Text
                style={[
                  styles.priceText,
                  {
                    color: colors.themeYellow,
                    textDecorationLine: 'none',
                    marginLeft: moderateScale(10),
                  },
                ]}>
                100KD
              </Text>
            </View>
          </View> */}
            </View>
            <View style={styles.cardInfoImage}>
              <Image
                source={imagePath.offerOne}
                resizeMode="contain"
                style={{
                  width:DeviceInfo.isTablet()?moderateScale(105) : moderateScale(85),
                  height:DeviceInfo?.isTablet()?moderateScale(105): moderateScale(85),
                  top:DeviceInfo?.isTablet()?40:0
                }}
              />
            </View>
            <View>
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
                  {courses?.length} courses
                </Text>
              </View> */}
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default FeatureCard;

const styles = StyleSheet.create({
  card: {
    // width: moderateScale(346),
    // width: width-60,
    // height: moderateScaleVertical(180),
    marginHorizontal: moderateScale(4),
    backgroundColor: colors.themeDark,

    borderRadius: moderateScale(18),
    overflow: 'hidden',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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

  cardGradient: {
    padding: moderateScale(20),
    gap: moderateScale(10),
    height: '100%',
   justifyContent:"center"
  },
  cardInfoImage: {
    // overflow: 'hidden',

    position: 'relative',
    left: moderateScale(10),
  },
  cardHeading: {
    fontSize: textScale(18),
    fontFamily: 'Poppins-SemiBold',
    color: colors.themeYellow,
  },
  cardPara: {
    fontSize: textScale(12),
    fontFamily: 'Poppins-Regular',
    color: colors.white,
  },
  cardInfo: {
    flexDirection: 'row',
  },
  cardButton: {
    width: moderateScale(100),
    gap: moderateScale(2),
    height: moderateScaleVertical(28),
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(4),
    marginTop: moderateScale(10),
    flexDirection: 'row',
  },
  cardButtonText: {
    fontFamily: 'Urbanist-SemiBold',
    color: colors.black,
    fontSize:textScale(10),
  },
  cardInfoPara: {
    width: '70%',
  },
  totalPriceTextContainer: {
    fontFamily: fontFamily.Poppins_Regular,
    fontSize: textScale(13),
    color: colors.white,
  },
  priceTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: moderateScaleVertical(6),
  },
  priceContainer: {
    marginVertical: moderateScaleVertical(12),
  },
  priceText: {
    fontFamily: fontFamily.Urbanist_Medium,
    fontSize: textScale(16),
    color: colors.white,
    textDecorationLine: 'line-through',
  },
  imgContainer: {
    // flex: 1,
    height: moderateScaleVertical(120),
    // backgroundColor: 'red',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    elevation: 13,
  },
  imgCont: {
    position: 'relative',
    // height: '90%',
  },
});
