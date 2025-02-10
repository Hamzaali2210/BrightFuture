import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import commonStyles from '../../../styles/commonStyles';
import HomeFeatHeading from '../../Layout/Typography/HomeFeatHeading';
import {mainStrings} from '../../../constants/mainstrings';
import {moderateScale, moderateScaleVertical, verticalScale} from '../../../styles/responsiveSize';
import InstructorsItem from './InstructorsItem';

import {InstructorItemProps} from '../../../types/componentInterface';
import imagePath from '../../../constants/imagePath';
import navigationStrings from '../../../constants/navigationStrings';
import useGetData from '../../../hooks/useGetData';
import {endpoints} from '../../../utils/endpoints';
import * as Progress from 'react-native-progress';
import colors from '../../../styles/colors';
import FilterIcon from '../../../assets/images/Icons/fitler.svg';


import {InstructorType} from '../../../types/uiType';
import {useDispatch, useSelector} from 'react-redux';
import {InstructorListLoader} from '../../../redux/slice/loaderSlice';
import MyLoader from '../../Loader/RectangleLoader';
import BoxLoader from '../../Loader/BoxLoader';
import EnrolledStudentsLoader from '../../Loader/EnrolledStudentLoader';
import SimpleBoxLoader from '../../Loader/InstructorLoader';
import CourseInput from '../Courses/CourseInput';
import InstructorsItemBox from './InstructorBox';
import WishlistLoader from '../../Loader/WishListLoader';
import HeaderCard from '../../Layout/Card/HeaderCard';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { URLSearchParams } from 'react-native-url-polyfill';

type instructorDataType = {
  data: Array<InstructorType>;
};

function Item({
  title,
  position,
  imgPath,
  style,
  reviews,
  avgRating,
  id,
}: InstructorItemProps) {
  return (
    <InstructorsItemBox
      title={title}
      position={position}
      imgPath={imgPath}
      style={style}
      reviews={reviews}
      avgRating={avgRating}
      id={id}
    />
  );
}

function InstructorsListDetail() {
  const navigation = useNavigation<any>();
  const departmentData = useSelector((state: any) => state?.filter?.department);
  const ratingData = useSelector((state: any) => state?.filter?.rating);


  const dispatch = useDispatch();
  const [value,setValue] = useState('')

  const handleChange = (e:string) =>{
        setValue(e)
  }
  const handleCancel = () =>{
    setValue('')
  }
  let params:any = {
    
  }
  let url = `${endpoints.INSTRUCTOR}?search=${value}`

  if(value){
    params.search=value
  }

  if(departmentData?.id){
     params.department_id=departmentData?.id
  }

  if(ratingData){
    params.rating=ratingData
  }


  const courseParams = new URLSearchParams(params as any);

  const {
    data: instructorData,
    status,
    isFetching
  } = useGetData(`${url}&${courseParams}`, ['INSTRUCTOR',value,ratingData,departmentData]);


  const finalInstructorData: instructorDataType =
    instructorData as instructorDataType;

  console.log('finalInstructorDatafinal>>>>>>>>>>', finalInstructorData);

  const SAMPLE_IMAGE =
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';



  const InstructorComponent  = ()=>{
    if (status === 'pending' || isFetching)   {
      return (
        <View style={{right:moderateScale(18)}}>
                        <WishlistLoader />

  
          
        </View>
      );
    }
    return <View style={[{paddingVertical: verticalScale(10)}]}>
    <FlatList
      data={finalInstructorData?.data}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      // columnWrapperStyle={{margin:10}}
      contentContainerStyle={{justifyContent:"center"}}
      renderItem={({item}) => (
        <Item
          id={item?.id}
          title={item?.full_name}
          position={item?.instructor_role}
          imgPath={item?.avatar || SAMPLE_IMAGE}
          reviews={item?.reviews_count}
          avgRating={item?.average_rating}
          style={{
            margin: moderateScale(3),
            marginBottom: moderateScale(10),
          }}
        />
      )}
      keyExtractor={item => `${item?.id}`}
      showsHorizontalScrollIndicator={false}
    />
  </View>
  }

  return (
    <SafeAreaView >
      <View style={[styles.container, commonStyles.spacingCommon]}> 
      <HeaderCard
          title={'Instructors'}
          right
          rightComponent={() => (
            <TouchableOpacity
            onPress={() => {
              navigation.navigate(navigationStrings.FilterInstructor as never);
            }}>
            <FilterIcon
              width={moderateScaleVertical(45)}
              height={moderateScaleVertical(45)}
            />
          </TouchableOpacity>
          )}
        />
        <View style={{height:20}}/>
     
      <CourseInput value={value} handleChange={handleChange} handleCancel={handleCancel} placeholder={'Search Instructor'}/>
      <InstructorComponent/>
      </View>
      
    </SafeAreaView>
  );
}

export default InstructorsListDetail;

const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(10),
  },
});
