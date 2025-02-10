import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ErrorBox from '../../../Components/ErrorBox';
import GroupCardLight from '../../../Components/Layout/Card/GroupCardLight';
import CourseLoader from '../../../Components/Loader/CourseLoader';
import SingleCourse from '../../../Components/Screens/Courses/SingleCourse';
import {mainStrings} from '../../../constants/mainstrings';
import navigationStrings from '../../../constants/navigationStrings';
import useGetData from '../../../hooks/useGetData';
import {couponCodeData} from '../../../redux/slice/couponSlice';
import Clipboard from '@react-native-clipboard/clipboard';
import commonStyles from '../../../styles/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from '../../../styles/responsiveSize';
import {endpoints} from '../../../utils/endpoints';
import {showSuccess} from '../../../utils/helperFunctions';
import {getDate} from '../../../utils/logicFunctions';
import BlueLabelButton from '../../../Components/Layout/Button/BlueLabelButton';
import CommonButton from '../../../Components/CommonButton';
import fontFamily from '../../../styles/fontFamily';
import Animated, {SlideInDown, SlideInLeft} from 'react-native-reanimated';
// import Clipboard from '@react-native-clipboard/clipboard';

const CourseDiscountDetail = () => {
  const [inCart, setInCart] = useState([]);
  const [spaceBottom, setSpaceBottom] = useState<number>(0);

  const navigation = useNavigation<any>();
  const SAMPLE_COURSE_IMAGE =
    'https://images.unsplash.com/photo-1560785496-3c9d27877182?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  const {params}: any = useRoute();
  const dispatch = useDispatch();
  const codeDet = useSelector(state => state?.coupon?.codeDetail);
  const couponCourseList = params?.couponCourseList?.map((item: any) => ({
    ...item,
    selected: false,
  }));

  const [couponsData, setCouponsData] = useState([]);
  console.log(
    'couponsDatacouponsDatacouponsDatacouponsDatacouponsDatacouponsData',
    couponsData,
  );

  const {status, data, refetch,isFetching}: any = useGetData(
    `${endpoints.COUPONS_DETAIL}/${params?.couponID}`,
    ['COUPONS_DETAIL'],
  );

  // useEffect(() => {
  //   if (status === 'success') {
  //     setCouponsData(
  //       data?.data?.courses?.map((item: any) => ({...item, selected: false})),
  //     );
  //   }
  // }, [status]);
  console.log('in cart mien andhar hi nhi hai a', inCart);

  useEffect(() => {
    console.log('yeah awpis chala hai bhaiiiiii', status);

    if (status === 'success' && data?.data?.courses?.length > 0) {
      const newData = data?.data?.courses?.filter(
        (item: any) => item?.course?.in_cart,
      );
      console.log('yeah awpis chala hai bhaiiiiii', newData);
      setInCart(newData);
    }
  }, [data?.data?.courses]);

  const handleCopyCode = (item: string) => {
    // return;
    try {
    showSuccess('message is copied to clipboard');
    Clipboard.setString(item?.code);
    return;
    dispatch(
      couponCodeData({
        codeDetail: {
          code: item?.code,
          price: item?.discount_amount,
          couponId: item?.id,
        },
      }),
    );
    showSuccess('message is copied to clipboard');
    } catch (error) {
          console.log("error error eroor", error);
          
    }
    
  };

  const handlePress = (item: any) => {
    navigation.navigate(navigationStrings.BuyCourse, {
      CourseId: item?.id,
    });
  };

  const handleCouponSelection = (id: number) => {
    const newData = couponsData?.map(item => {
      if (item?.id === id) {
        return {...item, selected: !item?.selected};
      } else {
        return {...item};
      }
    });
    setCouponsData(newData);
  };

  if (status === 'pending' || isFetching) {
    return (
      <View style={{alignItems: 'center', flex: 1}}>
        <CourseLoader />
        <CourseLoader />
      </View>
    );
  }

  if (status === 'error') {
    // showSuccess('error while fetching coupons');
  }

  console.log(
    'inCartinCartinCartinCartinCartinCartinCartinCartinCartinCartinCartinCart',
    inCart,
  );

  return (
    <View style={{position: 'relative'}}>
      <ScrollView style={[commonStyles.spacingCommon]}>
        <GroupCardLight
          type="Course Discount"
          detailScreen
          courses={data?.data?.courses_count}
          dateInfo={getDate(data?.data?.created_at, data?.data?.expiry_date)}
          // couponCode={data?.data?.code}
          courseDiscountDetail
          price={data?.data?.discount_amount}
          // member={4}
          btnLabel={data?.data?.code}
          colorsArr={['#FFFDE8', '#FFE501']}
          date={data?.data?.expiry_date}
          handleCourseCopyCode={() => handleCopyCode(data?.data)}
        />

        {
          <FlatList
            data={data?.data?.courses}
            scrollEnabled={false}
            ListEmptyComponent={() => {
              return <ErrorBox message={mainStrings.noCourseFound} />;
            }}
            style={{marginBottom: spaceBottom}}
            renderItem={({item}: any) => {
              console.log('there new in this ', item);

              return (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      handlePress(item);
                    }}>
                    <SingleCourse
                      numLesson={item?.course?.chapters_count}
                      heading={item?.course?.name}
                      author={item?.course?.instructor?.first_name}
                      description={item?.course?.description}
                      discountPrice={item?.course?.discounted_price}
                      imageUrl={item?.image || SAMPLE_COURSE_IMAGE}
                      price={item?.course?.full_price}
                      courseDiscount={item?.course?.in_cart}
                      couponCourse
                      isAddedToCart={item?.course?.in_cart}
                      getCourseDataAgain={refetch}
                      courseId={item?.course?.id}
                      handleCouponSelection={() =>
                        handleCouponSelection(item?.id)
                      }
                      courseCode={item?.course?.code}
                    />
                  </TouchableOpacity>
                </>
              );
            }}
          />
        }
      </ScrollView>
      {inCart?.length > 0 ? (
        <Animated.View
          style={{
            backgroundColor: '#ffffffea',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            width: width,
            height: moderateScale(120),
            bottom: 0,
            paddingHorizontal: moderateScale(16),
          }}
          entering={SlideInDown.duration(600)}
          exiting={SlideInLeft.duration(500)}
          onLayout={({nativeEvent}) => {
            const {height} = nativeEvent.layout;
            setSpaceBottom(height);
          }}>
          <BlueLabelButton
            text={`${inCart?.length} Courses Added`}
            handleChange={() => {
              navigation.navigate(navigationStrings.Cart, {
                fromCart: false,
                couponID: params?.couponID,
              });
            }}
            txtStyle={{
              fontSize: textScale(16),
              textAlign: 'left',
              width: '100%',
              fontFamily: fontFamily.Poppins_SemiBold,
            }}
            btnStyle={{
              borderRadius: moderateScale(12),
              width: '100%',
              paddingVertical: moderateScaleVertical(16),
            }}
          />
        </Animated.View>
      ) : (
        <></>
      )}
    </View>
  );
};

export default CourseDiscountDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScale(12),
  },
});
