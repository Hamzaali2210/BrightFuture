import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import CoursesHomeItem from './CoursesHomeItem';
import {mainStrings} from '../../../constants/mainstrings';
import HomeFeatHeading from '../../Layout/Typography/HomeFeatHeading';
import commonStyles from '../../../styles/commonStyles';
import {moderateScale, width} from '../../../styles/responsiveSize';
import {categoryDataType} from '../../../types/uiType';
import navigationStrings from '../../../constants/navigationStrings';
import useGetData from '../../../hooks/useGetData';
import {endpoints} from '../../../utils/endpoints';
import * as Progress from 'react-native-progress';
import {showError, showSuccess} from '../../../utils/helperFunctions';
import colors from '../../../styles/colors';
import {useNavigation} from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { CouponsListLoader } from '../../../redux/slice/loaderSlice';
import MyLoader from '../../Loader/RectangleLoader';
import usePostData from '../../../hooks/usePostData';
import { IMAGE_API_URL } from '../../../utils/urls';

const  CoursesHomeList:React.FC<{again: number}> = ({again}) => {
  type ItemProps = {
    title: string;
    subject: string;
    price: number|string;
    discountPrice: number|string;
    rating: string;
    itemId: any;
    imageCover: string;
    isFavorite:boolean;
    courseCode:string;
    isExpired?:boolean;
    code:string;
  };

  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const tag=useSelector((state:any)=>state?.tag?.wishlistTag)
  const paymentCall= useSelector((state:any)=>state.apiCall.paymentCall)


  const {
    isError: isCourseError,
    error: courseError,
    data: courseData,
    isSuccess: courseSuccess,
    isLoading: courseLoading,
    status,
    refetch,
  } = useGetData(`${endpoints.COURSES}?per_page=10`, ['COURSES',tag,again,paymentCall]);

  console.log('courseLoadingcourseLoadingcourseLoadingcourseLoadingcourseLoading', courseData);


  const {
    mutate: sendToWishlist,
    status:wishStatus,
    error

  } = usePostData(endpoints.STUDENT_WISHLIST, ['STUDENT_WISHLIST',again]);

  const {
    mutate: wishlistDataDelete,
    status:wishDeleteSuccess,
    isError: errorWishlist,

  } = usePostData(
    endpoints.STUDENT_WISHLIST,
    ['STUDENT_WISHLIST_DELETE'],
    'delete',
  );



  useEffect(() => {
    if (isCourseError) {
      showError(courseError);
    }
  }, [courseSuccess, courseLoading, courseError]);

  const finalCoursedata: any = {courseData};
  console.log("finalCoursedatafinalCoursedatafinalCoursedata>>>>", finalCoursedata);




  useEffect(()=>{
    if(status==='pending'){
          dispatch(CouponsListLoader({loader:true}))
    }else if(status === 'success'){
          dispatch(CouponsListLoader({loader:false}))
    }

},[status])

useEffect(()=>{
  if(wishStatus==='error'){
          console.log("errorerrorerrorerrorerrorerrorerrorerror", error);

          showError("Error while adding course to the wishlist")
  }else if(wishStatus === 'success'){
        showSuccess("Courses added to wishlist successfully")
        refetch();
  }

},[wishStatus])

useEffect(()=>{
  if(wishDeleteSuccess==='error'){
          showError("Error while removing course from the wishlist")
  }else if(wishDeleteSuccess === 'success'){
        showSuccess("Courses removed from wishlist successfully")
        refetch();
  }

},[wishDeleteSuccess])

  const handlePress = async (item: any) => {

    navigation.navigate(navigationStrings.BuyCourse, {
      CourseId: item,
    });
  };





  function Item({title, subject, price, rating, itemId,discountPrice,imageCover,isFavorite,courseCode,code,isExpired}: ItemProps) {
    console.log("ratingratingratingratingratingratingratingrating",title,rating);

    return (
      <TouchableOpacity
        onPress={() => {
          handlePress(itemId);
        }}>
        <CoursesHomeItem
          title={title}
          subject={subject}
          price={price as number}
          rating={rating}
          imageCover={imageCover}
          isFavorite={isFavorite}
          discountPrice={discountPrice as number}
          // handleFavorite={()=>handleWishlist(itemId,isFavorite)}
          containerStyle={{
            marginRight: moderateScale(12),
            // width: width / 2.2,
          }}

          itemId={itemId}
          refetch={refetch}
          courseCode={code}
          isExpired={isExpired}
          // itemId={''}
          />
      </TouchableOpacity>
    );
  }

  if (courseLoading) {
    return (
      <>
          <MyLoader/>
      </>
    );
  }
  console.log("finalCoursedatafinalCoursedatafinalCoursedata",finalCoursedata);

  return (
    <View style={[commonStyles.spacingCommon, , {marginTop: moderateScale(12)}]}>
      <HomeFeatHeading
        title={mainStrings.AllCourses}
        routeName={navigationStrings.Courses}
        tooltip
        tooltipContent={mainStrings.courseTooltip}
      />
      <View style={styles.coursesItemStyle}>
        {(finalCoursedata?.courseData?.data?.length > 0 || true) && (
        // { true && (
          <FlatList
            data={finalCoursedata?.courseData?.data }
            renderItem={({item}: any) => (
              <Item
                itemId={item?.id}
                title={item?.name}
                subject={item?.instructor?.full_name}
                price={item?.online_price>0?item?.online_price:item?.in_person_price>0?item?.in_person_price:0}
                discountPrice={item?.online_discounted_price>0?item?.online_discounted_price:item?.in_person_discounted_price>0?item?.in_person_discounted_price:0}
                imageCover={`${IMAGE_API_URL}${item.image}`}
                isFavorite={item?.is_favourite}
                courseCode = {item?.code}
                rating={item?.average_rating}
                code={item?.code}
                isExpired = {item?.is_expired}
              />
            )}
            keyExtractor={item => `${item.id}`}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
}

export default CoursesHomeList;

const styles = StyleSheet.create({
  coursesItemStyle: {},
  container: {
    flex: 1,
  },
});
