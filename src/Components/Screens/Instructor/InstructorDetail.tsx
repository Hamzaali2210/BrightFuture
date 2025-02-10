import {ParamListBase, useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, TouchableOpacity, ScrollView, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import DateIcon from '../../../assets/images/Icons/date.svg';
import GeoIcon from '../../../assets/images/Icons/geo.svg';
import StarIcon from '../../../assets/images/Icons/goldStar.svg';
import VideoIcon from '../../../assets/images/Icons/video.svg';
import CircleLine from '../../../assets/images/circleLine.svg';
import imagePath from '../../../constants/imagePath';
import {mainStrings} from '../../../constants/mainstrings';
import navigationStrings from '../../../constants/navigationStrings';
import colors from '../../../styles/colors';
import fontFamily from '../../../styles/fontFamily';
import Lingarkaran from '../../../assets/images/Icons/CurlyLineback.svg';

import {
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from '../../../styles/responsiveSize';
import FilterSelector from '../../Forms/FilterSelector';
import SingleCourseList from '../Courses/SingleCourseList';
import useGetData from '../../../hooks/useGetData';
import { endpoints } from '../../../utils/endpoints';
import { showError } from '../../../utils/helperFunctions';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import dayjs from 'dayjs';
import CourseInput from '../Courses/CourseInput';
import Animated, { SlideInDown, SlideInLeft } from 'react-native-reanimated';
import ProceddButton from '../../Layout/Button/ProceddButton';
import commonStyles from '../../../styles/commonStyles';
import { SafeAreaView } from 'react-native';
import { IMAGE_API_URL } from '../../../utils/urls';
// import {TouchableOpacity} from 'react-native-gesture-handler';

const InstructorDetail = () => {
  const [selected, setSelected] = useState(0);
  const  [value,setValue]=useState('');
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [spaceBottom, setSpaceBottom] = useState<number>(0);

  const {params}:any =useRoute()


  const {status, data}: any = useGetData(
    `${endpoints.INSTRUCTOR}/${params?.instructorId}`,
    ['segement'],
  );

  const {
    data: uniDeptData,
    status:uniDeptStatus
  }:any = useGetData(endpoints.UNIVERSITIES_DEPRATMENT, [
    'UNIVERSITIES_DEPRATMENT',
  ]);
  const {
    data: getData,
    refetch: getDataAgain,
    isRefetching,
    status: getDataStatus,
    error: carterror,
  } = useGetData(`${endpoints.GET_CART}?order_type=${'Full'}`, [
    'GET_CART',

  ]);


  const {
    data: uniData,
    status:uniStatus
  }:any = useGetData(endpoints.UNIVERSITIES, ['UNIVERSITIES']);


  console.log("uniData?.datauniData?.datauniData?.data",uniData,uniDeptData);



  const instructorData:any= data?.data


  useEffect(()=>{
    if(status === "success"){

    }else if(status === 'error'){
      // showError("Error while Fetching Profile")
    }
},[status])



console.log('instructorDatainstructorDatainstructorDatainstructorDatainstructorData', instructorData);



const handleChange = (
  val: string,
) => {


  setValue(val as string);
};

const handleCancel = () =>{
  setValue('');
}



  const selectedTab: Array<{id: number; label: string}> = [
    {
      id: 0,
      label: 'University',
    },
    {
      id: 1,
      label: 'Department',
    },
    {
      id: 2,
      label: 'Courses',
    },
  ];

  const handleSelect = (id: number) => {
    setSelected(id);
  };
    async function handleProceed() {


        try {
          navigation.navigate(navigationStrings.Cart);
        } catch (error) {

        }
      }
  return (
    <View style={[styles.container]}>
<ScrollView style={[styles.container]}>


      <View style={[styles.backContainer]}>
      {/* <CircleLine style={{position: 'absolute', top: 0, zIndex: 1}} /> */}
      <Lingarkaran
          width={moderateScale(755)}
          height={moderateScaleVertical(350)}
          style={{
            position: 'absolute',
            top: moderateScaleVertical(0),
            left: moderateScaleVertical(0),
          }}
        />

      <TouchableOpacity
          style={[styles.backImgContainer]}
          onPress={() => {

            navigation.goBack();
          }}>
          <Image
            source={imagePath.whiteBtn}
            style={{width: '100%', height: '100%'}}
            resizeMode='contain'
          />
        </TouchableOpacity>
        <View style={[styles.headerContainer]}>
          <View style={[styles.flexContainer]}>
            <Text style={[styles.mainText]}>
              {mainStrings.InstructorProfile}
            </Text>
          </View>
        </View>
        <View style={[styles.imageContainer]}>
          <View style={[styles.imgContainer]}>
            <FastImage source={{uri: `${IMAGE_API_URL}${instructorData?.avatar}` || instructorData?.avatar || "https://images.unsplash.com/photo-1530667912788-f976e8ee0bd5?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}} style={{width: '100%', height: '100%'}}  resizeMode='cover'/>
          </View>
          <Text style={[styles.mainText, {fontSize: moderateScale(18)}]}>
          {instructorData?.full_name}
          </Text>
        </View>
      </View>
      <View style={[styles.descContainer]}>
        <View style={[styles.flexContainer]}>
          <Text style={[styles.aboutText]}>About Me</Text>
          <View>
            <View style={[styles.ratingContainer]}>
              <StarIcon />
              <Text style={[styles.insPosition]}> {instructorData?.average_rating} | {instructorData?.reviews_count} Reviews</Text>
            </View>
            <Text
              style={[styles.seeText]}
              onPress={() => {
                navigation.navigate(navigationStrings.Reviews,{instructorId:params.instructorId,instructorName:instructorData?.full_name,instructorImage:instructorData?.avatar});
              }}>
              See All
            </Text>
          </View>
        </View>
        <View style={[styles.listContainer]}>

          <View style={[styles.flexContainer, {gap: 10}]}>
            <DateIcon />
            <Text style={[styles.listText]}>Joined {dayjs(instructorData?.created_at).format('D MMMM YYYY')}</Text>
          </View>
          {/* <View style={[styles.flexContainer, {gap: 10}]}>
            <GeoIcon />
            <Text style={[styles.listText]}>
              Based on Los Angeles, California
            </Text>
          </View> */}
          <View style={[styles.flexContainer, {gap: 10}]}>
            <VideoIcon />
            <Text style={[styles.listText]}>{instructorData?.total_courses} Courses posted</Text>
          </View>
        </View>

        <View
          style={{
            height: 1,
            backgroundColor: '#EFEFF5',
            marginVertical: moderateScale(16),

          }}
        />
        <Text style={[styles.descText]}>
          {instructorData?.about}

        </Text>

        {/* <View style={[styles.courseContainer]}>
          {selectedTab.map((item, index) => {
            return (
              <>
                <View
                  // onPress={() => setSelected(item.id)}
                  style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Text
                    style={{
                      fontFamily: fontFamily.Poppins_Regular,
                      fontSize: textScale(12),
                      color:colors.white,
                      textAlign: 'center',
                    }}>
                    {item.label}
                  </Text>
                </View>
                <View
                  style={[
                    {
                      width: selectedTab.length - 1 !== index ? 1 : 0,
                      backgroundColor: '#9F9F9F',
                      height: '100%',
                    },
                  ]}
                />
              </>
            );
          })}
        </View> */}
        {(
          <>
            {/* <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: moderateScale(6),
              }}>
              <FilterSelector
                viewContainerStyle={{width: width / 3.4}}
                handleChange={() => {}}
                placeholder={{
                  label: 'University',
                  value: null,
                }}
                data={uniData?.data}
              />
              <FilterSelector
                viewContainerStyle={{width: width / 3.4}}
                handleChange={() => {}}
                placeholder={{
                  label: 'Department',
                  value: null,
                }}
                data={uniDeptData?.data}
              />
              <FilterSelector
                viewContainerStyle={{width: width / 3.4}}
                handleChange={() => {}}
                placeholder={{
                  label: 'Courses',
                  value: null,
                }}
                data={[
                  {name: 'uni', id: 'AUK'},
                  {name: 'name', id: 'AaUK'},
                  {name: 'unasdasdi', id: 'AarUK'},
                ]}
              />
            </View> */}
             <CourseInput value={value} handleChange={handleChange} handleCancel={handleCancel} />
              <View style={{marginBottom:spaceBottom}}>

            <SingleCourseList value={value} instuctorId={params?.instructorId} getDataAgain={getDataAgain}/>
              </View>
          </>
        )}
      </View>

    </ScrollView>
    {getData?.data?.id ? (
        <Animated.View
          onLayout={({nativeEvent}) => {
            const {height} = nativeEvent.layout;
            setSpaceBottom(height);

          }}
          style={[styles.paymentContainer, commonStyles.spacingCommon]}
          entering={SlideInDown.duration(600)}
          exiting={SlideInLeft.duration(500)}>
          <ProceddButton
            price={'0'}
            chapter={getData?.data?.courses?.length}
            onPressBtn={handleProceed}
          />
        </Animated.View>
      ) : null}
    </View>

  );
};

export default InstructorDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  backContainer: {
    height: moderateScale(285),
    backgroundColor: colors.themeDark,
    borderBottomColor: colors.themeYellow,
    paddingHorizontal: moderateScale(16),
    paddingTop: moderateScaleVertical(24),
    borderWidth: moderateScale(3),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 13,
    position:"relative",
  },
  listContainer: {},
  headerContainer: {},
  backImgContainer: {
    width: moderateScale(55),
    height: moderateScaleVertical(55),
    backgroundColor: 'rgba(0,0,0,0)',
    zIndex: 20,
    position: 'absolute',
    left:moderateScale(12),

    top: moderateScale(45),
  },
  flexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(22),
  },
  aboutText: {
    fontFamily: fontFamily.Poppins_Medium,
    fontSize: textScale(26),
    color: colors.themeDark,
    flex: 1,
  },
  seeText: {
    color: colors.theme,
    textDecorationLine: 'underline',
    textAlign: 'right',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(6),
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: moderateScale(18),
  },
  mainText: {
    fontFamily: fontFamily.Poppins_SemiBold,
    fontSize: moderateScale(20),
    color: colors.white,
    flex: 1,
    textAlign: 'center',
    marginTop: moderateScale(12),
  },
  imgContainer: {
    width: moderateScale(128),
    height: moderateScale(128),
    borderRadius: moderateScale(500),
    backgroundColor: '#EFF7FE',

    borderWidth: moderateScale(4),
    borderColor: '#fff',
    overflow:"hidden",
  },
  descContainer: {
    paddingHorizontal: moderateScale(16),
  },
  insPosition: {
    textAlign: 'left',
    color: colors.insGrey,
    fontSize: textScale(12),
    fontFamily: fontFamily.Poppins_SemiBold,
  },
  listText: {
    fontFamily: fontFamily.Poppins_Regular,
    color: colors.themeDark,
    fontSize: textScale(14),
  },
  descText: {
    fontFamily: fontFamily.Poppins_Regular,
    fontSize: textScale(12),
    color: '#858690',
    lineHeight: 22,
  },
  courseContainer: {
    backgroundColor: colors.theme,
    borderRadius: moderateScale(8),

    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(12),
    marginVertical: moderateScale(6),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
