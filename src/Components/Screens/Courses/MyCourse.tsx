import {Alert, FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View,useWindowDimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import SingleCourse from './SingleCourse';
import navigationStrings from '../../../constants/navigationStrings';
import useGetData from '../../../hooks/useGetData';
import {endpoints} from '../../../utils/endpoints';
import {showError} from '../../../utils/helperFunctions';
import {height, moderateScaleVertical, textScale} from '../../../styles/responsiveSize';
import colors from '../../../styles/colors';
import {mainStrings} from '../../../constants/mainstrings';
import RNSecureStorage from 'rn-secure-storage';
import { useSelector } from 'react-redux';
import { MyCourseListInterface } from '../../../types/componentInterface';
import CourseLoader from '../../Loader/CourseLoader';
import EmptyScreen from '../../EmptyScreen';
import imagePath from '../../../constants/imagePath';
import DeviceInfo from 'react-native-device-info';





const MyCourse:React.FC<MyCourseListInterface> = ({value}) => {
  const navigation = useNavigation<any>();
  const profileData= useSelector((state:any)=>state?.auth?.userPayload);
  const {width}=useWindowDimensions()


 
  

  const [refreshing,setIsRefreshing]=useState<boolean>(false)
  
  const {
    isError: isCourseError,
    error: courseError,
    data: courseData,
    isSuccess: courseSuccess,
    isLoading: courseLoading,
    refetch,
    isRefetching,

  } = useGetData(`${endpoints.INSTRUCTOR_COURSES}?name=${value}`, ['INSTRUCTOR_COURSES',value]);

  useEffect(()=>{
      if(!isRefetching){
         setIsRefreshing(false)
      }
  },[isRefetching])

  let finalCoursedata: any = {courseData};
  const SAMPLE_COURSE_IMAGE='https://images.unsplash.com/photo-1560785496-3c9d27877182?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  const numColumns = DeviceInfo.isTablet() ? 2 : 1;



  useEffect(() => {
    if (isCourseError) {
      showError(courseError);
    }
  }, [courseSuccess, courseLoading, courseError]);

  const handlePress = async (item: any) => {
    navigation.navigate(navigationStrings.InstructorCourses, {
      CourseId: item?.id,
    });
   
  };

  const onRefresh=()=>{
      setIsRefreshing(true)
        refetch();
    }


    if (courseLoading && !DeviceInfo.isTablet()) {
      return (
        <View style={{flex:1}}>
           <CourseLoader/>
           <CourseLoader />
           
        </View>
      );
    }

    if (courseLoading && DeviceInfo.isTablet()) {
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

    console.log("LooksLooksLooksLooksLooksLooksLooksLooksLooks",finalCoursedata?.courseData);

  return (
    <View style={{flex: 1, marginBottom: moderateScaleVertical(10)}}>
      {true ? (
        <FlatList
          data={finalCoursedata?.courseData?.data as null}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
          scrollEnabled={!!finalCoursedata?.courseData?.data?.length}
          ListEmptyComponent={() => {
            return (
              <EmptyScreen
                image={imagePath.courseEmpty}
                heading={'Your Course is empty'}
                description={mainStrings.courseEmpty}
              />
            );
          }}
          numColumns={numColumns}
          key={numColumns}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={width>750?{alignItems:"center",marginHorizontal:3}:{}}
         
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                handlePress(item);
              }}>
              <SingleCourse
                numLesson={item?.chapters?.length}
                heading={item?.name}
                author={item?.instructor?.full_name}
                description={item?.description}      
                discountPrice={item?.full_price}
                thumbnail
                course={item}
                imageUrl={item?.image!=0 && item?.image || SAMPLE_COURSE_IMAGE}
                price={item?.full_price}
                authorAvatar={item?.instructor?.avatar}
                courseCode={item?.code}
                groupLink={item?.whatsapp_link}
              />
            </TouchableOpacity>
          )}
          keyExtractor={item => item?.id}
        />
      ) : (
        <View style={styles.container}>
          <Text>{mainStrings.noCourseFound}</Text>
        </View>
      )}
    </View>
  );
}

export default MyCourse;

const styles = StyleSheet.create({
  container: {
    height: height - 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
});