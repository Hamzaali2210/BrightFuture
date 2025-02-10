import {default as React, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import imagePath from '../../../constants/imagePath';
import colors from '../../../styles/colors';
import commonStyles from '../../../styles/commonStyles';
import fontFamily from '../../../styles/fontFamily';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
  verticalScale,
  width,
} from '../../../styles/responsiveSize';

import {mainStrings} from '../../../constants/mainstrings';

import navigationStrings from '../../../constants/navigationStrings';

import Lingarkaran from '../../../assets/images/Icons/CurlyLineback.svg';
import RNSecureStorage from 'rn-secure-storage';
import {userPayload} from '../../../redux/slice/authSlice';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import useGetData from '../../../hooks/useGetData';
import {endpoints} from '../../../utils/endpoints';

const InstructorHome = () => {
  const [type, setType] = useState('monthly');
  const [earningType, setEarningType] = useState('monthly');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.auth.userPayload);

  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    (async () => {
      const data: any = await RNSecureStorage.getItem('userData');
      if (JSON.parse(data)) {
        dispatch(userPayload({userPayload: JSON.parse(data)}));
      }
    })();
  }, []);

  const onRefresh = React.useCallback(() => {
    // setRefreshing(true);
    // setTimeout(() => {
    //   RNRestart.restart();
    //   setRefreshing(false);
    // }, 2000);
    setRefreshing(true);
    refetchReport();
  }, []);

  const {
    data: instructorReport,
    status: instructorStatus,
    refetch: refetchReport,
  }: any = useGetData(endpoints.SHOW_REPORT, ['PROFILE_REPORT']);

  console.log(
    'instructorReportinstructorReportinstructorReportinstructorReport',
    instructorReport,
  );

  return (
    <ScrollView
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
                style={{
                  width: moderateScale(40),
                  height: moderateScaleVertical(40),
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
      <View style={[]}>
        <View
          style={[
            styles.flexContainer,
            {marginTop: moderateScaleVertical(12)},
            commonStyles.spacingCommon,
          ]}>
          <Text style={styles.textHeading}>Report & Analytics</Text>
          {/* <View style={[styles.flexContainer, styles.labelBlue]}>
            <Text style={[styles.labelText]}>{type}</Text>
            <Image source={imagePath.downArrow} style={{width: 5, height: 5}} />
          </View> */}
        </View>
        <View style={styles.analyticsCont}>
          {
            <FlatList
              renderItem={({item}) => {
                return (
                  <View style={styles.greyContainer}>
                    <View style={[{gap:2,flexDirection:"row",alignItems:"center"}]}>
                      <View style={styles.imgContainer}>
                        <Image source={item.image} />
                      </View>
                      <Text style={styles.colorBlue}>
                        {' '}
                        {item.id===1?(item.price):item.price}{item?.id===1?"KD":""}
                      </Text>
                    </View>
                    <Text style={styles.greyText}>{item?.title}</Text>
                  </View>
                );
              }}
              data={[
                {
                  id: 1,
                  image: imagePath.earning,
                  price: instructorReport?.data?.total_revenue,
                  title: 'Total Earnings',
                },
                {
                  id: 2,
                  image: imagePath.students,
                  price: instructorReport?.data?.enrolled_students || 0,
                  title: 'Enrolled Students',
                },
                {
                  id: 3,
                  image: imagePath.bookColl,
                  price: instructorReport?.data?.instructor_share || 0,
                  title: 'Instructor Share',
                },
                {
                  id: 4,
                  image: imagePath.book,
                  price: instructorReport?.data?.total_courses || 0,
                  title: 'Total Courses',
                },
              ]}
              // numColumns={2}
              contentContainerStyle={{
                alignItems: 'center',
                marginVertical: moderateScaleVertical(12),
              }}
            />
          }
        </View>
        {/* <View
          style={[
            styles.flexContainer,
            {marginTop: moderateScaleVertical(12)},
          ]}>
          <Text style={styles.textHeading}>Earnings</Text>
          <View style={[styles.flexContainer, styles.capsule]}>
            <TouchableOpacity onPress={()=>{setEarningType('weekly')}} style={[styles.copyContainer,{
                    backgroundColor:
                      earningType === 'weekly' ? colors.white: colors.anaGrey,
                      borderRadius: moderateScale(500),
                    //   borderBottomLeftRadius: moderateScale(500),
                  },]}>
              <Text
                style={[
                  styles.sideText,
                  
                ]}>
                Weekly
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{setEarningType('monthly')}} style={[styles.copyContainer,{
                    backgroundColor:
                      earningType === 'monthly' ? colors.white: colors.anaGrey,
                    //   borderTopRightRadius: moderateScale(500),
                      borderRadius: moderateScale(500),

                    //   borderBottomRightRadius: moderateScale(500),
                  }]}>
              <Text
                style={[
                  styles.sideText,
                  
                ]}>
                Monthly
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={[
            styles.flexContainer,
            {marginTop: moderateScaleVertical(12)},
          ]}>
          <Text style={styles.textHeading}>Earnings</Text>
          <View style={[styles.flexContainer, styles.capsule]}>
            <TouchableOpacity onPress={()=>{setEarningType('weekly')}} style={[styles.copyContainer,{
                    backgroundColor:
                      earningType === 'weekly' ? colors.white: colors.anaGrey,
                      borderRadius: moderateScale(500),
                    //   borderBottomLeftRadius: moderateScale(500),
                  },]}>
              <Text
                style={[
                  styles.sideText,
                  
                ]}>
                Weekly
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{setEarningType('monthly')}} style={[styles.copyContainer,{
                    backgroundColor:
                      earningType === 'monthly' ? colors.white: colors.anaGrey,
                    //   borderTopRightRadius: moderateScale(500),
                      borderRadius: moderateScale(500),

                    //   borderBottomRightRadius: moderateScale(500),
                  }]}>
              <Text
                style={[
                  styles.sideText,
                  
                ]}>
                Monthly
              </Text>
            </TouchableOpacity>
          </View>
        </View> */}
      </View>
    </ScrollView>
  );
};

export default InstructorHome;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  batchContainer: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: moderateScale(10),
  },
  sideText: {
    color: colors.black,
    fontFamily: fontFamily.Poppins_Medium,
    fontSize: textScale(12),
    alignSelf: 'center',
    paddingHorizontal: moderateScale(4),
  },
  imgContainer: {
    width: moderateScale(42),
    height: moderateScale(42),
    borderColor: '#e9e9e9',
    borderWidth: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(5000),
  },

  batch: {
    padding: moderateScale(8),

    backgroundColor: colors.white,
    borderRadius: moderateScale(1000),
  },
  textHeading: {
    fontSize: moderateScale(16),
    color: colors.themeDark,
    fontFamily: fontFamily.Poppins_SemiBold,
    flex: 1,
  },
  copyContainer: {
    padding: moderateScaleVertical(8),
  },

  // headerStyle
  header: {
    borderBottomWidth: verticalScale(4),
    borderBottomColor: colors.themeYellow,
    backgroundColor: colors.themeDark,
    justifyContent: 'center',
    paddingBottom: moderateScale(10),
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.8,
    shadowRadius: 3.84,

    elevation: 5,
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
  flexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelBlue: {
    backgroundColor: colors.themeDark,
    borderRadius: moderateScaleVertical(400),
    width: moderateScale(80),
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: moderateScale(8),
    paddingHorizontal: moderateScale(4),
  },
  capsule: {
    backgroundColor: colors.anaGrey,
    borderColor: '#E9E9E9',
    borderWidth: 1,
    borderRadius: moderateScale(500),
    paddingVertical: moderateScale(4),
    paddingHorizontal: moderateScale(12),
  },
  labelText: {
    fontFamily: fontFamily.Poppins_Medium,
    color: colors.white,
    fontSize: textScale(12),
  },
  analyticsCont: {},
  greyContainer: {
    backgroundColor: colors.cardGrey,
    borderColor: '#E9E9E9',
    borderWidth: 1,
    borderRadius: moderateScale(12),
    padding: moderateScale(14),
    // width: width / 2.3,
    width:width-30,
    justifyContent: 'center',
    // height: width>350? moderateScaleVertical(180):moderateScaleVertical(120),

    margin: moderateScale(6),
  },
  colorBlue: {
    fontFamily: fontFamily.Poppins_Bold,
    fontSize: textScale(18),
    color: colors.themeDark,
  },
  greyText: {
    fontFamily: fontFamily.Poppins_SemiBold,
    fontSize: textScale(12),
    color: '#AFAFAF',
  },
});
