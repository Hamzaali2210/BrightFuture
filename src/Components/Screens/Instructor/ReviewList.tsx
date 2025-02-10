import {
  Alert,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import fontFamily from '../../../styles/fontFamily';
import {
  height,
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from '../../../styles/responsiveSize';
// import ThreeDot from '../../../assets/images/Icons/thre'
import {ratingStar} from '../../../utils/logicFunctions';
import ThreeIcon from 'react-native-vector-icons/Entypo';
import colors from '../../../styles/colors';
import commonStyles from '../../../styles/commonStyles';
import CommonButton from '../../CommonButton';
import {endpoints} from '../../../utils/endpoints';
import useGetData from '../../../hooks/useGetData';
import {ParamListBase, useNavigation, useRoute} from '@react-navigation/native';
import navigationStrings from '../../../constants/navigationStrings';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import ErrorBox from '../../ErrorBox';
import {StudentReviewType} from '../../../types/uiType';
import {useSelector} from 'react-redux';
import imagePath from '../../../constants/imagePath';
import usePostData from '../../../hooks/usePostData';
import EmptyScreen from '../../EmptyScreen';
import { mainStrings } from '../../../constants/mainstrings';
import DeviceInfo from 'react-native-device-info';
import dayjs from 'dayjs';
import dayjsReal from 'dayjs/plugin/relativeTime';

interface ReviewSingleInterface {
  avatar: string | null;
  studentId?: string;
  review: string;
  rating: number;
  name: string;
  createdAt?:string;
  courseCode?:number;
  id: number;
  isPublish?: boolean;
  studentInfo: {
    full_name: string;
    avatar: string;
  };
  refetch?: () => {};
}

interface ReviewListInterface {
  buyCourseScreen?: boolean;
  courseId?: string;
  type?: 'course' | 'instructor';
}

type studentReviewType = {
  data: Array<StudentReviewType>;
};

const ReviewSingle: React.FC<ReviewSingleInterface> = ({
  avatar,
  studentId,
  review,
  rating,
  name,
  courseCode,
  createdAt,
  id,
  studentInfo,
  isPublish,
  refetch,
}) => {
  const [star, setStar] = useState([]);
  const [seeMore, setSeeMore] = useState(false);
  const userData = useSelector((state: any) => state?.auth?.userPayload);
  console.log('studentInfostudentInfostudentInfostudentInfo', studentInfo);
  dayjs.extend(dayjsReal)

  const {mutate: publishReview} = usePostData(
    endpoints.PUBLISH_REVIEW,
    ['PUBLISH_REVIEW'],
    'post',
    data => {
      refetch && refetch();
    },
    (error: any) => {},
  );
  const {mutate: deleteReviews} = usePostData(
    endpoints.INSTRUCTORS_REVIEWS,
    ['REVIEWS'],
    'delete',
    data => {
      refetch && refetch();
    },
    (error: any) => {},
  );

  useEffect(() => {
    const ratingStarFunc: any = ratingStar(rating);

    setStar(ratingStarFunc);
  }, []);

  const handlePublish = () => {
    const payload = {
      id: id,
      is_publish: isPublish ? 0 : 1,
    };

    publishReview(payload);
  };

  const handleDelete = () => {
    deleteReviews({id});
  };

  return (
    <View style={styles.reviewContainer}>
      <View style={styles.reviewItem}>
        <Image
          source={{
            uri: studentInfo?.avatar,
          }}
          style={styles.profileImage}
        />
        <View style={styles.reviewText}>
          <View style={styles.ratingStar}>
            <View style={{flex:1}}>
              <View style={styles.rowContaienr}>
                <View style={[styles.rowContaienr,{flex:1}]}>
                <Text style={styles.name}>
              
              {studentInfo?.full_name}
              {/* {<Text style={styles.nameGrey}> ({studentId})</Text>} */}
            </Text>
            <Text style={[styles.name,{fontFamily:fontFamily.Poppins_Medium,opacity:0.5}]}>
              
              ({courseCode})
              {/* {<Text style={styles.nameGrey}> ({studentId})</Text>} */}
            </Text>
                </View>
                <Text style={[styles.name,{fontFamily:fontFamily.Poppins_Regular,opacity:0.6}]}>{dayjs(createdAt).fromNow()}</Text>
            
              </View>
         
            <View style={[styles.ratingStar]}>
            <View style={[styles.ratingStar]}>
              {star.map(item => (
                <View>{item}</View>
              ))}
            </View>
            <Text style={[styles.ratingText]}> {rating}</Text>
            </View>
            </View>
       
           
            {userData?.role === 3  && (
              <View style={styles.rowContaienr}>
                <TouchableOpacity
                  style={[
                    styles.blueBtn,
                    {
                      backgroundColor: isPublish
                        ? `${colors.theme}80`
                        : colors.theme,
                    },
                  ]}
                  onPress={handlePublish}>
                  <Image
                    source={imagePath.shareWhite}
                    style={{
                      width: moderateScaleVertical(12),
                      height: moderateScaleVertical(12),
                    }}
                    resizeMode='contain'
                  />
                  <Text
                    style={{
                      fontFamily: fontFamily.Poppins_SemiBold,
                      fontSize: textScale(10),
                      color: colors.white,
                    }}>
                    {isPublish ? 'Published' : 'Publish'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{marginLeft: moderateScale(4)}}
                  onPress={handleDelete}>
                  <Image
                    source={imagePath.redTrash}
                    style={{
                      width: moderateScaleVertical(20),
                      height: moderateScaleVertical(20),
                    }}

                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
          
        </View>
      </View>
      <Text style={styles.review}>
        {review?.slice(0, seeMore ? review?.length : 70)}
        <Text style={styles.seeMore} onPress={() => setSeeMore(!seeMore)}>
          {review?.length > 40 ? (seeMore ? 'see less' : 'see more') : ''}
        </Text>
      </Text>
    </View>
  );
};

const ReviewList: React.FC<ReviewListInterface> = ({
  buyCourseScreen,
  courseId,
  type,
}) => {
  const {params}: any = useRoute();
  console.log("courseIdcourseIdcourseIdcourseIdcourseId",courseId);
  

  let  url = `${endpoints.REVIEWS}`

  if(courseId){
    url = url+`?course_id=${courseId}`;
  }

  else if(params?.instructorId){
    url += `?instructor_id=${params?.instructorId}`;
  }           
  const {status, error, data, refetch} = useGetData(
    url,
    ['NEWREVIES',courseId],
  );

  const [refreshing, setRefreshing] = useState<boolean>(false);


  // const {status:courseStatus, error:courseError, data:courseReview} = useGetData(
  //   `${endpoints.REVIEWS}?course_id=${params?.courseId}`,
  //   ['STUDENT'],
  // );

  const reviewData: studentReviewType = data as studentReviewType;
  const userData = useSelector((state: any) => state?.auth?.userPayload);

  useEffect(() => {
    if (status === 'error') {
      console.log('there will be in this error', error);
    }
  }, []);

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const handlePress = () => {
    navigation.navigate(navigationStrings.AddReview, {
      // courseName: 'Chemistry',
      instructorId: params?.instructorId,
      instructorName:params?.instructorName,
      instructorImage:params?.instructorImage

    });
  };

  const onRefresh = () => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  };
  return (
    <View style={[{flex: 1, position: 'relative'}]}>
      <FlatList
        // data={[1, 2, 3, 3, 2, 3, 23]}
        data={reviewData?.data}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        style={{marginTop: moderateScale(20),marginBottom:moderateScaleVertical(40),paddingHorizontal:moderateScale(12)}}
        ListEmptyComponent={() => {
          return (
            <EmptyScreen
                image={imagePath.noReview}
                heading={'No Reviews Yet'}
                description={mainStrings.noReviewEmpty}
                style={{height:300}}
              />
          );
        }}
        renderItem={({item}) => {
          return (
            <ReviewSingle
              avatar={item?.avatar}
              studentInfo={item?.user}
              review={
                item?.review 
            
              }
              courseCode={item?.course?.code}
              rating={item?.rating}
              name={item?.full_name}
              id={item?.id}
              isPublish={!!item?.is_publish}
              refetch={refetch}
              createdAt={item?.created_at}
            />
          );
        }}
      />
      {false && userData?.role === 2 && !buyCourseScreen && (
        <View
          style={{
            position: 'absolute',
            bottom: 30,
            width: '100%',
            padding: moderateScale(16),
          }}>
          <CommonButton
            btnText="Add Review"
            mainViewStyle={{margin: 0, width: '100%'}}
            onPressBtn={handlePress}
          />
        </View>
      )}
    </View>
  );
};

export default ReviewList;

const styles = StyleSheet.create({
  reviewItem: {
    flexDirection: 'row',
    alignItems:"center",

    borderRadius: moderateScale(8),
  },
  reviewContainer: {
    marginBottom: moderateScaleVertical(16),
    padding: moderateScale(8),
    paddingBottom: moderateScaleVertical(16),
    borderBottomColor: '#00000020',
    borderBottomWidth: moderateScale(1),
  },
  blueBtn: {
    backgroundColor: colors.theme,
    borderRadius: moderateScale(200),
    paddingVertical: moderateScaleVertical(8),
    paddingHorizontal: moderateScale(12),
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(4),
  },
  ratingStar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowContaienr: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText:{
    color:colors.black,
    fontFamily:fontFamily.Poppins_Regular,
    fontSize:DeviceInfo?.isTablet()?textScale(8):textScale(12),

  },
  profileImage: {
    width: moderateScaleVertical(40),
    height: moderateScaleVertical(40),
    borderRadius: moderateScale(25),
    marginRight: moderateScale(12),
    marginTop: moderateScaleVertical(8),
    backgroundColor: colors.lightThemeBlue,
  },
  reviewText: {
    flex: 1,
    gap: moderateScale(2),
    // backgroundColor:"red"
  },
  name: {
    fontSize: DeviceInfo?.isTablet()? textScale(10): textScale(12),
    fontFamily: fontFamily.Poppins_Bold,
    // flex: 1,
    opacity:0.85,
  },
  nameGrey: {
    color: '#00000050',
    fontFamily: fontFamily.Poppins_Medium,
    fontSize: textScale(11),
  },
  rating: {
    fontSize: textScale(12),
    color: 'black',
    marginVertical: 4,
    fontFamily: fontFamily.Poppins_Regular,
  },
  review: {
    fontSize: DeviceInfo?.isTablet()? textScale(10): textScale(12),
    color: '#000',
    fontFamily: fontFamily.Poppins_Medium,
    opacity: 0.6,
    marginTop: moderateScaleVertical(8),
  },
  seeMore: {
    fontSize: DeviceInfo?.isTablet()?moderateScale(8) :moderateScale(14),
    fontFamily: fontFamily.Poppins_Regular,
    color: colors.theme,
    textDecorationLine: 'underline',
  },
});
