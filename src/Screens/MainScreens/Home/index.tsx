import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  InteractionManager,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import RNSecureStorage from 'rn-secure-storage';
import imagePath from '../../../constants/imagePath';
import colors from '../../../styles/colors';
import {default as WarningIcon} from 'react-native-vector-icons/FontAwesome';
import CheckCircle from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  moderateScale,
  moderateScaleVertical,
  textScale,
  verticalScale,
} from '../../../styles/responsiveSize';

import {mainStrings} from '../../../constants/mainstrings';
import commonStyles from '../../../styles/commonStyles';

import {useDispatch, useSelector} from 'react-redux';
import CategoryList from '../../../Components/Screens/Home/CategoryList';
import CoursesHomeList from '../../../Components/Screens/Home/CoursesHomeList';
import FeatureList from '../../../Components/Screens/Home/FeatureList';
import InstructorsList from '../../../Components/Screens/Home/InstructorsList';
import navigationStrings from '../../../constants/navigationStrings';
import {IsSignIn, userPayload} from '../../../redux/slice/authSlice';

import MyLoader from '../../../Components/Loader/RectangleLoader';
import StoryList from '../../../Components/Screens/Home/StoryList';
import Lingarkaran from '../../../assets/images/Icons/CurlyLineback.svg';
import useGetData from '../../../hooks/useGetData';
import {endpoints} from '../../../utils/endpoints';
import ModalCard from '../../../Components/Layout/Card/ModalCard';
import fontFamily from '../../../styles/fontFamily';
import ModalDelete from '../../../Components/Layout/Card/ModalDelete';

function Home() {
  const {params}: any = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.auth.userPayload);
  const [again, setAgain] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSubsVisible, setIsSubsVisible] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState('');

  const {
    data: profileData,
    refetch,
    isLoading: showProfileLoader,
    isRefetching: showProfileFetching,
    status,
  } = useGetData(endpoints.SHOW_PROFILE, ['SHOW_PROFILE', again]);
  const {
    data: isExpired,
    status: expiredStatus,
    isLoading: expiredLoader,
    isRefetching: expiredFetching,
    refetch: refetchExpired,
  }: any = useGetData(endpoints.IS_EXPIRED, ['IS_EXPIRED', again]);

  console.log('isExpiredisExpiredisExpiredisExpiredisExpired', isExpired);

  useEffect(() => {
    const handleFirstView = async () => {
      try {
        if (expiredStatus === 'success') {
          const viewedBefore = await AsyncStorage.getItem('isExpiredViewed');
          if ((!viewedBefore || viewedBefore === 'false') && !isExpired?.data) {
            setIsSubsVisible(true);
            await AsyncStorage.setItem('isExpiredViewed', 'true');
          } else if (isExpired?.data) {
            await AsyncStorage.setItem('isExpiredViewed', 'false');
          }
        }
      } catch (error) {
        console.error('Error handling AsyncStorage:', error);
      }
    };

    handleFirstView();
  }, [isExpired, expiredStatus]);

  useEffect(() => {
    setTimeout(() => {
      if (isSubsVisible) {
        setIsSubsVisible(false);
      }
    }, 4000);
  }, [isSubsVisible]);

  useEffect(() => {
    if (params?.payment === 'done') {
      setPaymentMessage('Payment Done Successfully');
      setIsModalVisible(true);
    } else if (params?.payment === 'notDone') {
      setPaymentMessage('there was error while doing payment');

      setIsModalVisible(true);
    }
  }, [params]);

  const toggleModal = () => {
    setIsModalVisible(false);
  };
  const toggleSubsModal = () => {
    setIsSubsVisible(false);
  };

  console.log(
    'userDatauserDatauserDatauserDatauserDatauserDatauserDatauserData',
    userData,
  );

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch();
    refetchExpired();
    const getUniqueNumber = (() => {
      const used = new Set();
      return () => {
        let num;
        do {
          num = Math.floor(Math.random() * 1000) + 1;
        } while (used.has(num));
        used.add(num);
        return num;
      };
    })();

    setAgain(getUniqueNumber);
    setRefreshing(false);
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      console.log('yeah chala rha ha aaaaaa', userData, profileData?.user);

      dispatch(IsSignIn({userData: profileData?.user}));
      setRefreshing(false);
    }, [status]),
  );

  useFocusEffect(
    React.useCallback(() => {
      onRefresh();
    }, []),
  );

  useEffect(() => {
    console.log('yeah chala rha ha aaaaaa', userData, profileData?.user);
    if (status === 'success') {
      setRefreshing(false);
    }
  }, [userData]);

  const {
    categoryList,
    couponList,
    featureList,
    finalLoader,
    instructorList,
    packageList,
  } = useSelector((state: any) => state.loaderReducer);

  const [refreshing, setRefreshing] = React.useState(false);

  const [newLoader, setNewLoader] = useState(false);

  useEffect(() => {
    if (
      !categoryList &&
      !couponList &&
      !featureList &&
      !instructorList &&
      !packageList
    ) {
      setNewLoader(true);
    }
  }, [categoryList, couponList, featureList, instructorList, packageList]);

  useEffect(() => {
    (async () => {
      const data: any = await RNSecureStorage.getItem('userData');
      if (JSON.parse(data)) {
        dispatch(userPayload({userPayload: JSON.parse(data)}));
      }
    })();
  }, []);

  if (false) {
    return (
      <View style={{flex: 1}}>
        <MyLoader />
      </View>
    );
  }

  if (showProfileLoader || showProfileFetching || expiredLoader || expiredFetching)
    return <View style={{ display: 'flex', alignItems: 'center', marginTop: '50%'}}><ActivityIndicator /></View>

  return (
    <ScrollView
      contentContainerStyle={[styles.container]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={[styles.header, commonStyles.spacing]}>
        <Lingarkaran
          width={655}
          height={250}
          style={{
            position: 'absolute',
            top: moderateScaleVertical(0),
            left: moderateScaleVertical(0),
          }}
        />
        <View style={[styles.headerChild]}>
          <View style={[styles.logoContainer]}>
            <View>
              <Image
                source={imagePath.logoBig}
                resizeMode="contain"
                style={{
                  width: moderateScale(60),
                  height: moderateScaleVertical(60),
                }}
              />
            </View>
            <View style={[styles.headingMain]}>
              <Text style={[styles.headingMainStyle]}>
                {mainStrings.headingMain}
              </Text>
              <Text style={[styles.headingSecondStyle]}>
                {mainStrings.headingSecond}
              </Text>
            </View>
            {/* <Image source={imagePath.homeLogo} style={{width:moderateScale(180),height:moderateScaleVertical(50)}}/> */}
          </View>
          <View style={[styles.batchContainer]}>
            {userData?.role === 2 && (
              <TouchableOpacity
                style={[styles.batch]}
                onPress={() => {
                  navigation.navigate(navigationStrings.Cart as never);
                }}>
                <Icon
                  name="shopping-bag"
                  size={moderateScale(14)}
                  color={colors.theme}
                />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[styles.batch]}
              onPress={() => {
                navigation.navigate(navigationStrings.Notifications as never);
              }}>
              <Icon name="bell" size={moderateScale(14)} color={colors.theme} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.main}>
        <StoryList again={again} />
        {userData?.course_type_available && <FeatureList again={again} />}
        <CategoryList again={again} />
        {userData?.role === 2 ? <CoursesHomeList again={again} /> : null}
        <InstructorsList again={again} />
        {/* <CouponsList /> */}
        {/* <ResumeList /> */}
      </View>
      <ModalDelete
        isModalVisible={isModalVisible}
        toggleModal={toggleModal}
        modalContent={{backgroundColor: colors.lightThemeBlue}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: moderateScaleVertical(40),
          }}>
          {params?.payment === 'done' ? (
            <CheckCircle
              color={colors.green}
              size={moderateScale(55)}
              name="checkcircle"
            />
          ) : (
            <WarningIcon
              color={colors.themeYellow}
              size={moderateScale(55)}
              name="warning"
            />
          )}
          <Text
            style={{
              fontFamily: fontFamily.Poppins_Medium,
              color: colors.black,
              fontSize: textScale(21),
              textAlign: 'center',
              marginVertical: moderateScaleVertical(11),
            }}>
            {params?.payment == 'done'
              ? 'Payment Successfull'
              : 'Payment Failed'}
          </Text>
          <Text
            style={{
              fontFamily: fontFamily.Poppins_Regular,
              color: colors.black,
              fontSize: textScale(14),
              textAlign: 'center',
            }}>
            {paymentMessage}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: moderateScale(20),
              marginTop: moderateScale(12),
            }}>
            <TouchableOpacity
              onPress={() => {
                setIsModalVisible(false);
                if (params?.payment == 'done') {
                  InteractionManager.runAfterInteractions(() => {
                    setTimeout(() => {
                      navigation.navigate(
                        navigationStrings.MySubscriptions as never,
                      );
                    }, 50);
                  });
                }
              }}
              style={{
                // paddingHorizontal: moderateScale(16),
                borderRadius: moderateScale(8),
                backgroundColor: colors.theme,
                paddingVertical: moderateScaleVertical(12),
                width: moderateScale(150),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: colors.white,
                  fontFamily: fontFamily.Poppins_Medium,
                  fontSize: textScale(16),
                }}>
                Confirm
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ModalDelete>
      <ModalDelete
        isModalVisible={isSubsVisible}
        toggleModal={toggleSubsModal}
        modalContent={{backgroundColor: colors.lightThemeBlue}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: moderateScaleVertical(40),
          }}>
          <WarningIcon
            color={colors.themeYellow}
            size={moderateScale(55)}
            name="warning"
          />
          <Text
            style={{
              fontFamily: fontFamily.Poppins_Medium,
              color: colors.black,
              fontSize: textScale(21),
              textAlign: 'center',
              marginVertical: moderateScaleVertical(11),
            }}>
            Subscription Ended
          </Text>
          <Text
            style={{
              fontFamily: fontFamily.Poppins_Regular,
              color: colors.black,
              fontSize: textScale(14),
              textAlign: 'center',
            }}>
            Thank you for choosing Us and we wish to see you next time. Tap
            "View Course" to view our courses
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: moderateScale(20),
              marginTop: moderateScale(12),
            }}>
            <TouchableOpacity
              onPress={() => {
                setIsSubsVisible(false);
              }}
              style={{
                // paddingHorizontal: moderateScale(16),
                borderRadius: moderateScale(8),
                backgroundColor: colors.white,
                paddingVertical: moderateScaleVertical(12),
                width: moderateScale(150),
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
              }}>
              <Text
                style={{
                  color: colors.black,
                  fontFamily: fontFamily.Poppins_Medium,
                  fontSize: textScale(16),
                }}>
                Ok
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setIsSubsVisible(false);
                navigation.navigate(navigationStrings.Courses as never);
              }}
              style={{
                // paddingHorizontal: moderateScale(16),
                borderRadius: moderateScale(8),
                backgroundColor: colors.theme,
                paddingVertical: moderateScaleVertical(12),
                width: moderateScale(150),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: colors.white,
                  fontFamily: fontFamily.Poppins_Medium,
                  fontSize: textScale(16),
                }}>
                View Courses
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ModalDelete>
    </ScrollView>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },

  paymentContainer: {
    backgroundColor: 'rgba(255,255,255,0.6)',
    height: moderateScaleVertical(120),

    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
  },

  // headerStyle
  header: {
    borderBottomWidth: verticalScale(4),
    borderBottomColor: colors.themeYellow,
    backgroundColor: colors.themeDark,
    justifyContent: 'center',
    paddingBottom: moderateScale(10),
    // overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,

    elevation: 5,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(10),
    flex: 2,
  },
  headerChild: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScaleVertical(65),
    marginBottom: moderateScale(12),
  },
  headingMain: {
    gap: moderateScale(5),
  },
  headingMainStyle: {
    color: colors.white,
    fontFamily: 'KumbhSans-Bold',
    textTransform: 'uppercase',
    fontSize: textScale(10),
  },
  headingSecondStyle: {
    color: colors.themeYellow,
    textTransform: 'uppercase',
    fontFamily: 'KumbhSans-SemiBold',
    letterSpacing: moderateScale(2.5),
    fontSize: textScale(8),
  },

  batchContainer: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: moderateScale(10),
  },

  batch: {
    padding: moderateScale(8),

    backgroundColor: colors.white,
    borderRadius: moderateScale(1000),
  },

  // main

  main: {},

  //
});
