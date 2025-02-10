import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import Carousel, {ICarouselInstance} from 'react-native-reanimated-carousel';
import {Pagination} from 'react-native-snap-carousel';
import {mainStrings} from '../../../constants/mainstrings';
import useGetData from '../../../hooks/useGetData';
import colors from '../../../styles/colors';
import commonStyles from '../../../styles/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../../styles/responsiveSize';
import {endpoints} from '../../../utils/endpoints';
import CourseLoader from '../../Loader/CourseLoader';
import SingleCourse from '../Courses/SingleCourse';
import MySubscriptionsCard from './MySubscriptionsCard';
import EmptyScreen from '../../EmptyScreen';
import imagePath from '../../../constants/imagePath';
import DeviceInfo from 'react-native-device-info';
// import Carousel from 'react-native-snap-carousel';
// const data = [...new Array(6).keys()];
const data = [
  {
    title: 'Aenean leo',
    body: 'Ut tincidunt tincidunt erat. Sed cursus turpis vitae tortor. Quisque malesuada placerat nisl. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.',
    imgUrl: 'https://picsum.photos/id/11/200/300',
  },
  {
    title: 'In turpis',
    body: 'Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ',
    imgUrl: 'https://picsum.photos/id/10/200/300',
  },
  {
    title: 'Lorem Ipsum',
    body: 'Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.',
    imgUrl: 'https://picsum.photos/id/12/200/300',
  },
];

const MySubscriptionsDetail = () => {
  const [refreshing, setIsRefreshing] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);
  const [courses, setCourses] = useState([]);
  const [dueDate, setDueDate] = useState('');
  const [locked, setLocked] = useState<boolean>(false);
  const [purchasedId,setPurchasedId]=useState<number>(0);
  const [disableCourses, setDisableCourses] = useState<boolean>(false);
  const [paymentType, setPaymentType] = useState('');
  const SLIDER_WIDTH = Dimensions.get('window').width + 80;
  const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const SAMPLE_COURSE_IMAGE =
    'https://images.unsplash.com/photo-1560785496-3c9d27877182?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  const {
    data: courseData,
    status,
    refetch,
    isLoading,
    isRefetching,
  }: any = useGetData(`${endpoints.PURCHASED_COURSES}`, ['INSTRUCTOR_COURSES']);

  // const {
  //   isLoading: purchasedDetailLoading,
  //   data: purchasedCourseDetail,
  //   isError,
  //   isSuccess,
  // } = useGetData(`${endpoints.PURCHASED_COURSES_DETAIL}/order_id/course_id`, [
  //   'PURCHASED_COURSES_DETAIL',courses
  // ]);

  // console.log(
  //   'coursescoursescoursescoursescoursescoursescourses',
  //   courseData?.data,
  //   dueDate,
  // );
  console.log("courseDatacourseDatacourseDatacourseDatacourseDatacourseData",courseData);

  useEffect(() => {
    setPurchasedId(courseData?.data[0]?.id)
    // setCourses(courseData?.data[0]?.purchased_courses);
    setCourses(courseData?.data?.map((item:{purchased_courses:[]})=>item?.purchased_courses).flat());
    setDueDate(courseData?.data[0]?.due_date);
    setLocked(courseData?.data[0]?.is_locked);
    setPaymentType(courseData?.data[0]?.payment_type);

    setDisableCourses(courseData?.dueDate === 'true');
  }, [courseData]);

  useEffect(() => {
    if (!isRefetching) {
      setIsRefreshing(false);
    }
  }, [isRefetching]);

  const onRefresh = () => {
    refetch();
    setIsRefreshing(true);
  };

  // useEffect(() => {
  //   refetch();
  // }, [index]);

  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue(0);

  const baseOptions = {
    vertical: false,
    width: width * 0.9,
    height: width / 2,
  } as const;

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      /**
       * Calculate the difference between the current index and the target index
       * to ensure that the carousel scrolls to the nearest index
       */
      count: index - progress.value,
      animated: true,
    });
  };

  const onProgressChange = (
    offsetProgress: number,
    absoluteProgress: number,
  ) => {
    progress.value = absoluteProgress;
  };

  const handleSnap = (index: number) => {
    const newData = courseData?.data[index];
    // setCourses(newData?.purchased_courses);
    setDueDate(courseData?.data[index]?.due_Date);
    setLocked(courseData?.data[index]?.is_locked)
    setPurchasedId(courseData?.data[index]?.id)
    setIndex(index);
  };
  console.log("courseData?.datacourseData?.datacourseData?.datacourseData?.datacourseData?.data",courseData?.data);
  if (isLoading || isRefetching) return <View style={{ display: 'flex', alignItems: 'center', marginTop: '50%'}}><ActivityIndicator /></View>
  return (
    <View style={[styles.container, commonStyles.spacingCommon]}>
      {/* <TouchableOpacity
        onPress={() => {
          navigation.navigate(navigationStrings.NewUpgrade);
        }}>
        <MySubscriptionsCard />
      </TouchableOpacity> */}
      <View>
        {courseData?.data?.length > 0 && (
          <Carousel
            {...baseOptions}
            // loop={true}
            // scrollAnimationDuration={0}
            ref={ref}
            // mode="parallax"
            style={{width: '100%'}}
            // data={[1,2,3]}
            data={courseData?.data}
            pagingEnabled={true}
            onSnapToItem={handleSnap}
            renderItem={({item,index}) => (
              <View style={{flex: 1}}>
                <MySubscriptionsCard
                  index={index}
                  progress={progress}
                  data={item}
                  isLocked={locked}
                />
              </View>
            )}
          />
          // <Carousel

          //   // data={courseData?.data}
          //   data={data}
          //   renderItem={({index}) => (
          //     <View style={{flex: 1,width:width}}>
          //       <MySubscriptionsCard
          //         index={index}
          //         progress={progress}
          //         data={{...courseData?.data[index]}}
          //       />
          //     </View>
          //   )}
          //   sliderWidth={SLIDER_WIDTH}
          //   itemWidth={width}
          //   layout={'default'}
          // />
        )}
      </View>
      {courseData?.data?.length>=2  && <Pagination
        dotsLength={courseData?.data?.length }
        // dotsLength={3}
        activeDotIndex={index}
        containerStyle={{
          // marginTop: -moderateScale(10),
          marginTop:DeviceInfo?.isTablet()?width/2-160 :width / 2 - 30,
          marginBottom:moderateScale(-20)
        }}
        dotStyle={styles.dotStyle}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.8}
      />}

      {status === 'pending'  ? (
        <View
          style={{
            flex: 1,
            marginTop:width / 2,
            // paddingHorizontal: -16,
            gap: moderateScale(10),
            left:moderateScale(5),
          }}>
          <View>
            <CourseLoader />
          </View>
          <View style={{marginTop: moderateScaleVertical(300)}}>
            <CourseLoader />
          </View>
        </View>
      ) : (
        <FlatList
          // data={[1,2,3,3,4,5]}
          data={courses}
          // style={[]}
          // scrollEnabled={!!(courseData?.data?.length)}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          numColumns={DeviceInfo.isTablet()?2:1}
          // style={{marginTop:DeviceInfo.isTablet()?courseData?.data?.length<2?width*0.35+50:0:courseData?.data?.length?width*0.45+30:0}}
          style={{marginTop:courseData?.data?.length<2?courseData?.data?.length===0?0:width/2:0}}
          ListEmptyComponent={() => {
            return (
              <View style={styles.container}>
                  <EmptyScreen image={imagePath.subsEmpty} heading={`You're not enrolled in any class`} description={mainStrings.subscriptionEmpty} />
              </View>
            );
          }}
          renderItem={({item}: any) => (
            <TouchableOpacity onPress={() => {}}>
              <SingleCourse
                course={item}
                numLesson={item?.chapters_count}
                heading={item?.name}
                author={item?.instructor?.full_name}
                authorAvatar={item?.instructor?.avatar}
                description={item?.description}
                dueDate={dueDate}
                purchasedId={purchasedId}
                courseType={paymentType}
                courseCode={item?.code}
                thumbnail
                dueDatePassed={item?.due_date_passed}
                isLocked={item?.is_locked || disableCourses}
                groupLink={item?.whatsapp_link}
                purchasedCourse
                imageUrl={
                  (item?.image != 0 && item?.image) || SAMPLE_COURSE_IMAGE
                }
              />
            </TouchableOpacity>
          )}
          // keyExtractor={item => item?.id}
        />
      )}
    </View>
  );
};

export default MySubscriptionsDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  slide: {
    backgroundColor: '#f9c2ff',
    borderRadius: 5,
    height: 250,
    padding: 50,
    marginLeft: 25,
    marginRight: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  dotStyle: {
    width: moderateScale(7),
    height: moderateScale(7),
    borderRadius: 5,
    backgroundColor: colors.theme,
    marginHorizontal: -moderateScale(8),
    // marginTop:120,
  },
});
