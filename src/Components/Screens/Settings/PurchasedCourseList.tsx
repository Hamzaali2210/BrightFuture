import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import PurchasedCourseItem from './PurchasedCourseItem';
import useGetData from '../../../hooks/useGetData';
import {endpoints} from '../../../utils/endpoints';
import {showError} from '../../../utils/helperFunctions';
import {useNavigation} from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import navigationStrings from '../../../constants/navigationStrings';
import colors from '../../../styles/colors';
import {height, moderateScale, width} from '../../../styles/responsiveSize';
import {useSelector} from 'react-redux';
import CourseLoader from '../../Loader/CourseLoader';
import ModalCard from '../../Layout/Card/ModalCard';
import AddReview from '../Courses/AddReview';
import EmptyScreen from '../../EmptyScreen';
import imagePath from '../../../constants/imagePath';
import { mainStrings } from '../../../constants/mainstrings';
import DeviceInfo from 'react-native-device-info';

function PurchasedCourseList() {
  const userPayload = useSelector((state: any) => state.auth.userPayload);
  console.log('user user user user user ', userPayload);

  type ItemProps = {
    name: string;
    subject: string;
    order_price: string;
    order_number: string;
    rating: string;
    itemId: any;
    image: string;
  };

  const navigation = useNavigation<any>();

  const {
    isError: isCourseError,
    error: courseError,
    data: courseData,
    isSuccess: courseSuccess,
    isLoading: courseLoading,
    refetch,
  } = useGetData(
    `${endpoints.PURCHASED_COURSES}?can_show=1`,
    ['ORDERS'],
  );

  useEffect(() => {
    if (isCourseError) {
      showError(courseError);
    }
  }, [courseSuccess, courseLoading, courseError]);

  const finalCoursedata: any = {courseData};

  console.log('finalCourseDatafinalCourseData purchased', finalCoursedata);

  const handlePress = async (item: any) => {
    console.log('itemitemitemitemitemitemitemitem', item);
    return;

    navigation.navigate(navigationStrings.BuyCourse, {
      CourseId: item,
    });
  };
  // if (courseLoading) {
  //   return (
  //     <View style={styles.container}>
  //       <Progress.Circle size={80} indeterminate color={colors.theme} />
  //     </View>
  //   );
  // }
  if (courseLoading) {
    return (
      <View style={{flex: 1, height: height}}>
        <CourseLoader />
        <CourseLoader />
      </View>
    );
  }

  return (
    <>
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={DeviceInfo.isTablet()?2:1}
        contentContainerStyle={DeviceInfo?.isTablet()?{alignItems:"center"}:{}}
        renderItem={({item}) => {
          console.log('item item item purchased course', item);

          const {
            order_number,
            order_status,
            order_price,
            order_total_discount,
            order_total,
            id,
            purchased_courses,
            payment_type
          } = item;

          console.log(
            'purchased_coursespurchased_coursespurchased_coursespurchased_courses',
            purchased_courses,
          );

          return (
            <TouchableOpacity
              onPress={() => {
                handlePress(item);
              }}>
              <FlatList
                data={[...purchased_courses]}
                // data={[1,1,2,4] }
                // contentContainerStyle={{backgroundColor:"red"}}
                scrollEnabled={false}
                renderItem={({item}) => {
                  console.log("item item item ",item);
                  // return <></>
                  return (
                  <PurchasedCourseItem
                    itemId={id}
                    courseId={item?.id}
                    refetch={refetch}
                    title={item?.name }
                    subject={item?.course_type_name }
                    price={item?.price as number }
                    rating={item?.average_rating }
                    imageCover={item?.image}
                    orderNumber={item?.code}
                    dueDate = {item?.due_date_passed}
                    orderStatus={payment_type==="full"?"Completed":'Pending'}
                    reviewAdded={item?.is_review_added}
                    instructorName={item?.instructor?.first_name }
                    instrutorAvatar={item?.instructor?.avatar}
                    discountPrice={order_total_discount as number}
                  />
                )}}
              />
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={() => {
          return (
            <View style={styles.container}>
                {/* <EmptyScreen image={imagePath.subsEmpty} heading={'No Course Found'} description={'Looks like you have not added anything to you cart yet. Go ahead & explore top categories.'} /> */}
                <EmptyScreen image={imagePath.subsEmpty} heading={`You're not enrolled in any class`} description={mainStrings.subscriptionEmpty} />
                
            </View>
          );
        }}
        data={finalCoursedata?.courseData?.data}
        // data={[1,2,3,4]}
      />
      
    </>
  );
}

export default PurchasedCourseList;

const styles = StyleSheet.create({
  coursesItemStyle: {},
  container: {
    height: moderateScale(400),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
