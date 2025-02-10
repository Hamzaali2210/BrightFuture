import {
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useInfiniteQuery} from '@tanstack/react-query';
import React, {useEffect, useState} from 'react';
import {URL, URLSearchParams} from 'react-native-url-polyfill';
import {mainStrings} from '../../../constants/mainstrings';
import navigationStrings from '../../../constants/navigationStrings';
import {height, moderateScale, moderateScaleVertical, textScale, width} from '../../../styles/responsiveSize';
import {endpoints} from '../../../utils/endpoints';
import {showError} from '../../../utils/helperFunctions';
import api from '../../../utils/interceptor';
import SingleCourse from './SingleCourse';

import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {
  SignleCourseItemListProps,
  courseDiscountInterface,
} from '../../../types/componentInterface';
import ErrorBox from '../../ErrorBox';
import CourseLoader from '../../Loader/CourseLoader';
import {useSelector} from 'react-redux';
import EmptyScreen from '../../EmptyScreen';
import imagePath from '../../../constants/imagePath';
import useGetData from '../../../hooks/useGetData';
import WishlistLoader from '../../Loader/WishListLoader';
import DeviceInfo from 'react-native-device-info';
import CourseBoxLoader from '../../Loader/CourseBoxLoader';

const SingleCourseList: React.FC<SignleCourseItemListProps> = ({
  categoryId,
  categoryKey,
  value,
  getDataAgain,
  instuctorId,
}) => {
  const navigation = useNavigation<any>();
  const SAMPLE_COURSE_IMAGE =
    'https://images.unsplash.com/photo-1560785496-3c9d27877182?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const universityData = useSelector((state: any) => state?.filter?.university);
  const instructorData = useSelector((state: any) => state?.filter?.instructor);
  const departmentData = useSelector((state: any) => state?.filter?.department);
  const courseName = useSelector((state: any) => state?.filter?.courseName);
  const courseCode = useSelector((state: any) => state?.filter?.courseCode);


  let paramsToSend: { [key: string]: any } = {};
  console.log("universityDatauniversityDatauniversityDatauniversityData",courseName);
  

  if(instuctorId){
    paramsToSend.instructor_id=instuctorId
  }

  if(categoryId){
    paramsToSend.category_id=categoryId
  }
  

  if (universityData?.id) {
    paramsToSend.university_id = universityData.id;
  }
  
  if (instructorData?.id) {
    paramsToSend.instructor_id = instructorData.id;
  }
  
  // if (departmentData?.id) {
  //   paramsToSend.department_id = departmentData.id;
  // }
  
  if (courseName?.name) {
    paramsToSend.name = courseName.name;
  }
  
  if (courseCode?.code) {
    paramsToSend.code = courseCode.code;
  }

  if (value) {
    paramsToSend = {
      ...paramsToSend,
      name: value,
    };
  }


  useFocusEffect(
    React.useCallback(() => {
        refetch()
    }, [universityData,instructorData,departmentData,courseName,courseCode])
  );

  const courseParams = new URLSearchParams(paramsToSend as any);

  const [page, setPage] = useState(1);

  const fetchDataFn = async (pageParams: number) => {
    try {
      const response = await api.get(
        `${
          endpoints.COURSES
        }?per_page=10&is_approved=0&page=${pageParams}&${courseParams?.toString()}`,
      );
      console.log('repsonse data in thie response data ', response);
      if (response?.status === 200) {
        console.log('repsonse data in thie response data ', response);

        const nextPage = response?.data?.paginate?.next_page_url;
        if (nextPage !== null) {
          const url = new URL(nextPage);
          const newSearchParams = url.searchParams.get('page');
          return {data: response?.data?.data, nextPage: newSearchParams};
        }
        return {data: response?.data?.data, nextPage: null};
      }
    } catch (error: any) {
      console.log('error?.response',error?.response);
      
      if (error?.response?.data?.message) {
        throw new Error(error?.response?.data?.message);
      } else {
        throw new Error(error);
      }
    }
  };

  const {
    fetchNextPage,
    hasNextPage,
    isError: isCourseError,
    error: courseError,
    data: courseData,
    isSuccess: courseSuccess,
    isLoading: courseLoading,
    refetch,
    isRefetching,
    isFetching,
  } = useInfiniteQuery<any>({
    queryKey: [categoryKey, value,instructorData,universityData,departmentData,courseCode,courseName],
    queryFn: ({pageParam = 1}) => fetchDataFn(pageParam as number),
    getNextPageParam: lastPage =>
      lastPage?.nextPage !== null ? lastPage?.nextPage : undefined,
    initialPageParam: 1,
  });

  // const daaaaa= useGetData(`${
  //         endpoints.COURSES
  //       }?per_page=10&is_approved=0&page=${1}`,["asdasdasd"])

  const finalCoursedata: any = {courseData};
  const numColumns = DeviceInfo.isTablet() ? 2 : 1;
  console.log(
    'finalCoursedatafinalCoursedatafinalCoursedatafinalCoursedatafinalCoursedata',
    courseData,
    hasNextPage,
    // daaaaa
  );

  const onRefresh = () => {
    setRefreshing(true);
    refetch();
  };

  useEffect(() => {
    if (isCourseError) {
      showError(courseError);
    }
  }, [courseSuccess, courseLoading, courseError]);

  useEffect(() => {
    if (!isRefetching) {
      setRefreshing(false);
    }
  }, [isRefetching]);

  const handlePress = async (item: any) => {
    navigation.navigate(navigationStrings.BuyCourse, {
      CourseId: item?.id,
    });
  };

  const handleRefresh = () => {};

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


  // if(true){
   
  //   return (
  //     <>
  //         <View style={{flex:1}}>
  //       <CourseLoader width={textScale(250)}/>
  //       <CourseLoader width={textScale(250)}/>
     
  //     </View>
  //     </>
   
  //   );
  // }

  if (courseLoading &&!DeviceInfo.isTablet() || isFetching) {
    // if (true) {


       return <>
          <CourseBoxLoader/>
          <CourseBoxLoader/>
          <CourseBoxLoader/>
       </>
    
    
      return (
        <>
            <View style={{flex:1,left:moderateScale(10)}}>
          <CourseLoader width={moderateScale(360)}/>
          <CourseLoader width={moderateScale(360)}/>
       
        </View>
        </>
     
      );
    
  }
  else if(courseLoading && DeviceInfo.isTablet() || isFetching) {
 
    return (
      <>
        <View style={{flex:1,flexDirection:'row',flexWrap:"wrap"}}>
        <CourseLoader width={textScale(250)}/>
        <CourseLoader width={textScale(250)}/>
     
      </View>
      <View style={{flex:1,flexDirection:'row',flexWrap:"wrap"}}>
        <CourseLoader width={textScale(250)}/>
        <CourseLoader width={textScale(250)}/>
     
      </View>
      </>
   
    );
  }

  return (
    <View style={{flex: 1, marginBottom: moderateScaleVertical(20)}}>
      {true ? (
        <Animated.FlatList
          data={
            courseData?.pages?.map((page: any) => page?.data)?.flat() as any
          }
         
          // scrollEnabled={!!courseData?.pages?.length}
          ListEmptyComponent={() => {
            return (
              <EmptyScreen
                image={imagePath.courseEmpty}
                heading={'No Course is Available'}
                description={mainStrings.courseEmpty}
              />
            );
          }}
          entering={FadeIn}
          exiting={FadeOut}
          contentContainerStyle={DeviceInfo?.isTablet()?{
            
            alignItems:"center",
          }:{}}
        
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          numColumns={numColumns}
          onEndReachedThreshold={0.6}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                handlePress(item);
              }}>
              <SingleCourse
                numLesson={item?.chapters?.length}
                heading={item?.name}
                author={item?.instructor?.full_name}
                authorAvatar={item?.instructor?.avatar}
                description={item?.description}
                discountPrice={item?.online_discounted_price || item?.in_person_discounted_price}
                imageUrl={item?.image || SAMPLE_COURSE_IMAGE}
                price={item?.online_price || item?.in_person_price}
                refetch={refetch}
                getDataAgain={getDataAgain}
                courseId={item?.id}
                courseCode={item?.code}
                isFavorite={item?.is_favourite}
                isPurchasable={item?.is_purchasable}
                isAddedToCart={item?.in_cart}
                isExpired={item?.is_expired}
                courseDiscountType={() => couponType(item?.coupon?.type_name)}
              />
            </TouchableOpacity>
          )}
          keyExtractor={item => item?.id}
        />
      ) : (
        <ErrorBox message={mainStrings.noCourseFound} />
      )}
    </View>
  );
};

export default SingleCourseList;

const styles = StyleSheet.create({
  container: {
    height: height - 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
