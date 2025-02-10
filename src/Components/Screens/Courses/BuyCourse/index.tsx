import React, {useEffect, useState} from 'react';
import {Alert, ScrollView, StyleSheet, View} from 'react-native';

import {useNavigation, useRoute} from '@react-navigation/native';
import colors from '../../../../styles/colors';
import {moderateScale, moderateScaleVertical} from '../../../../styles/responsiveSize';
import CustomTab from '../../../Layout/TabLayout/CustomTab';
// import ReviewList from '../SingleCourseDetail/ReviewList';
import * as Progress from 'react-native-progress';
import commonStyles from '../../../../styles/commonStyles';
import ProceddButton from '../../../Layout/Button/ProceddButton';
import AboutCourse from '../SingleCourseDetail/AboutCourse';

import Animated, {SlideInDown, SlideInLeft} from 'react-native-reanimated';

import {useDispatch, useSelector} from 'react-redux';
import navigationStrings from '../../../../constants/navigationStrings';
import useGetData from '../../../../hooks/useGetData';
import usePostData from '../../../../hooks/usePostData';
import {IsCartData} from '../../../../redux/slice/cartSlice';
import {TabType} from '../../../../types/uiType';
import {endpoints} from '../../../../utils/endpoints';
import {showError, showSuccess} from '../../../../utils/helperFunctions';
import ReviewList from '../../Instructor/ReviewList';
import InstructorCourseHeader from '../InstructorCourse/InstructorCourseHeader';
import CartLessonNewList from './CartLessonNewList';
import BuyCourseLoader from '../../../Loader/BuyCourseLoader';
import ChapterLoader from '../../../Loader/ChapterLoader';

const BuyCourse = () => {
  // api data to be send for the cart
  const {
    mutate: sendToCart,
    data: addedCartData,
    isPending: cartLoading,
    isSuccess: cartSuccess,
    isError: isCartError,
    error: cartError,
  } = usePostData(endpoints.ADD_TO_CART, ['ADD_TO_CART']);
  const {
    mutate: deleteFromCart,
    data: deleteData,
    isPending: cartDeleteLoading,
    isSuccess: cartDeleteSuccess,
    error: cartDeleteError,
  } = usePostData(endpoints.REMOVE_FROM_CART, ['REMOVE_CART']);

  useEffect(() => {
    if (cartSuccess) {
      showSuccess(addedCartData?.message);
      setbuyCourse(true);
      refetchData()
      refetchCourseAgain()
      // refetchCourse();
      // refetch();
    } else if (isCartError) {
      refetchData()
      refetchCourseAgain()
      showError('Error while Adding to the cart');
      // refetch();
      // refetchCourse();
    }
  }, [cartSuccess, cartError]);

  useEffect(() => {
    if (cartDeleteSuccess) {
      showSuccess(deleteData?.message);
      refetchData()
      refetchCourseAgain()
      // refetchCourse();
      // refetch();
    } else if (isCartError) {
      showError('Error while Deleting from the cart');
      refetchData()
      refetchCourseAgain()
      // refetch();
      // refetchCourse();
    }
  }, [cartDeleteSuccess, cartDeleteError]);

  const navigation = useNavigation<any>();
  const cartDataRed = useSelector((state: any) => state.cart.cartData);

  const cartState: any = useSelector((state: any) => {
    return state.cart;
  });
  const addedCartDataState = useSelector(
    (state: any) => state.cart.addedCartData,
  );

  const dispatch = useDispatch();
  let cartData: any = [];
  const {params}: any = useRoute();

  const handleBack = () => {
    navigation.goBack();
  };
  const [pageCurrent, setPageCurrent] = useState<number>(0);
  const [buyCourse, setbuyCourse] = useState<boolean>(false);
  const [courseType, setCourseType] = useState('');
  const [spaceBottom, setSpaceBottom] = useState<number>(0);
  const [currentVideo, setCurrentVideo] = useState('');

  const {
    isError: isCourseError,
    error: courseError,
    data: courseDa,
    isSuccess: courseSuccess,
    isLoading: courseLoading,
    refetch: refetchCourse,
    isFetching
  } = useGetData(`${endpoints.COURSES_DETAIL}/${params?.CourseId}`, [
    'COURSES_DETAIL',
  ]);
  const {
    data: courseDataRefetch,
    refetch: refetchCourseAgain,
  }:any = useGetData(`${endpoints.COURSES_DETAIL}/${params?.CourseId}`, [
    'COURSES_DETAIL','kjjkjkjkjkjk'
  ]);

  let finalCourseData: any = [];
  let courseData: any = courseDa;
  console.log('courseDacourseDacourseDacourseDacourseDacourseDa', courseDa);

  const {
    data: chapterData,
    status,

    refetch,
  } = useGetData(`${endpoints.CHAPTERS}?course_id=${params?.CourseId}&type=purchaseable`, [
    'CourseData',params?.CourseId
  ]);
  const {
    data: chapterDataCalculation,

    refetch:refetchData,
  } = useGetData(`${endpoints.CHAPTERS}?course_id=${params?.CourseId}&type=purchaseable`, [
    'JJJJJJJ',params?.CourseId
  ]);

  console.log('chapterDatachapterDatachapterDatachapterData', chapterDataCalculation);

  useEffect(()=>{
    // setCurrentVideo(courseData?.data[0]?.videos[0]);
  },[])

  useEffect(() => {
    if (isCourseError) {
      showError(courseError);
      navigation.goBack();
    }
  }, [courseSuccess, courseLoading, courseError]);

  useEffect(() => {
    if (courseSuccess) {
      dispatch(IsCartData({cartData: finalCourseData}));
    }
  }, [courseSuccess, courseDa]);

  if (courseData?.data?.chapters) {
    finalCourseData = courseData?.data?.chapters?.map((item: any) => {
      return {...item, isAddedToCart: false};
    });
  }

  if (Array.isArray(cartDataRed)) {
    cartData = cartDataRed?.filter((item: any) => item?.isAddedToCart);
  }

  const lessonData = useSelector((state: any) => state.cart.cartData);

  const tabArray: Array<TabType> = [
    {
      index: 0,
      // label: 'Lessons',
      // label: 'Lectures',
      label: 'Chapters',
    },
    {
      index: 1,
      label: 'Reviews',
    },
    {
      index: 2,
      label: 'About',
    },
  ];
  // this here function is handling the add cart flow it will take whole of the object and a type
  // @param2 - type (full course or chapter) logic is handled based upon this argument
  function handleToCart(item: any, type: string,setCart?:React.Dispatch<React.SetStateAction<boolean>>) {
    // return ;
    let payload: any = {};
    console.log('item item item itme item bharat ', item, type);

    if (type === 'fullCourse') {
      // Handle full course logic if needed
      setCourseType('full');
      payload = {
        course_id: item?.data?.id,
        price_type: 'online',
      };

      if (payload?.course_id && !fullCart) {
        sendToCart(payload);
        setbuyCourse(true);
        setFullCart(true)
      } else if (fullCart) {
        let payloadDelete = {
          course_id: item?.data?.id,
        };
        setFullCart(false)
        deleteFromCart(payloadDelete);

      }
    }
    else if (type === 'chapter') {
      setCourseType('chap')
      // payload = {
      //   chapter_id: item?.id,
      //   course_id: item?.courses?.id,
      //   price_type: 'online',
      // };

      // if (payload?.course_id && payload?.chapter_id && !item?.in_cart) {
      //   setCart && setCart(true)
      //   sendToCart(payload);
      // } else if (item?.in_cart) {
      //   setCart && setCart(false)
      //   let payloadDelete = {
      //     chapter_id: item?.id,
      //     course_id: item?.courses?.id,
      //   };

      //   deleteFromCart(payloadDelete);
      // }
    }

    //   const finalArray = cartDataRed?.map((it2: any) => {
    //     if (item?.isAddedToCart) {
    //       return {...it2, isAddedToCart: false};
    //     } else {
    //       return {...it2, isAddedToCart: true};
    //     }
    //   });

    //   dispatch(IsCartData({cartData: finalArray, fullCourse: courseData}));
    // }
    //else if (type === 'chapter') {
    //   console.log("idhar andar aa rhe hai hummmmmm", item);

    //   payload = {
    //     chapter_id: item?.id,
    //     course_id: item?.courses?.id,
    //     price_type: 'online',
    //   };

    //   if (payload?.course_id && payload?.chapter_id && !item?.in_cart) {
    //     setbuyCourse(true);
    //     sendToCart(payload);
    //   }else if(item?.in_cart){
    //     let payloadDelete = {
    //       chapter_id: item?.id,
    //       course_id: item?.courses?.id,
    //     }
    //     setbuyCourse(false)
    //     deleteFromCart(payloadDelete)
    //   }

    //   const finalArray = cartDataRed?.map((it2: any) => {
    //     if (it2.id === item.id) {
    //       if (item?.isAddedToCart) {
    //         return {...it2, isAddedToCart: false};
    //       } else {
    //         return {...it2, isAddedToCart: true};
    //       }
    //     } else {
    //       return {...it2};
    //     }
    //   });

    //   dispatch(IsCartData({cartData: finalArray, fullCourse: courseData}));

    //   const checkBtn = cartDataRed?.find((it: any) => it.id === item.id);

    //   if (checkBtn) {
    //     setbuyCourse(true);
    //   } else {
    //     setbuyCourse(false);
    //   }
    // }
  }

  // this here we have handled the logic for procedding the paymnet more to the cart button and that cart will be hte one hwere all of the payment will be done
  // in this what we have done is that we are checking as well if the data is not available then fetch from async storage.

  async function handleProceed() {

    try {
      if (
        chapterDataCalculation?.data?.filter((item: any) => item?.in_cart)?.length > 0 ||
        !!courseDataRefetch?.data?.in_cart
      ) {
        navigation.navigate(navigationStrings.Cart, {
          CourseId: params?.CourseId,
          fromCart: true,
        });
      }
    } catch (error) {
      showError(error);
    }
  }



  console.log(
    'courseDatacourseDatacourseDatacourseDatacourseDatacourseData',
    courseData,
  );
  const chapterInCart = chapterDataCalculation?.data?.filter((item: any) => item?.in_cart);
  const chapterLength = chapterDataCalculation?.data?.filter(
    (item: any) => item?.in_cart,
  )?.length;

  const totalChapterCount = courseData?.data?.chapters_count;
  console.log(
    'chapterLengthchapterLengthchapterLengthchapterLengthchapterLength',
    chapterInCart,
    chapterLength,
  );

  const priceCalc = () => {
    const totalprice = chapterInCart?.reduce((acc, value) => {
      return acc + Number(value.price);
    }, 0);

    if (chapterLength !== totalChapterCount) {
      return totalprice;
    }

    return courseData?.data?.online_discounted_price;
  };
  const [fullCart,setFullCart] = useState(courseData?.data?.in_cart);


  console.log("courseDatacourseDatacourseDatacourseDatacourseDatacourseData",courseData?.data?.chapters[0]?.videos[0]);
  if (courseLoading || isFetching) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.white,
          justifyContent: 'center',
          alignItems: 'center',
          top:100,
        }}>
        <BuyCourseLoader />
      </View>
    );
  }
  return (
    <View>
      <ScrollView contentContainerStyle={styles.container}>
        {/* <BuyCourseHeader
          handleBack={handleBack}
          handleCart={handleToCart}
          courseData={courseData}
          cartLoading = {cartLoading}
        /> */}
        {/* purchase course waala header ye hai */}
        <InstructorCourseHeader
          handleBack={handleBack}
          courseData={courseData as any}
          handleCart={handleToCart}
          cartLoading={cartLoading}
          currentVideo={currentVideo}
          fullCart={fullCart}
          // currentVideo={courseData?.data?.chapters[0]?.videos[0]}
        />

        <CustomTab
          tabTitle={tabArray}
          pagerViewStyle={{minHeight: moderateScaleVertical(350)}}
          highlightedColor={colors.themeYellow}
          pageCurrent={pageCurrent}
          setPageCurrent={setPageCurrent}
          tabStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            // borderBottomWidth: 2,
          }}>
          <View
            key={0}
            style={[
              commonStyles.spacingCommon,
              {backgroundColor: colors.white},
            ]}>
          {status ==="pending"  ?
              <ChapterLoader/>
          :  <CartLessonNewList
              handleCart={handleToCart}
              spaceBottom={spaceBottom}
              lessonData={chapterData?.data}
              courseId={courseData?.id}
              coursePurchasable={courseData?.data?.is_purchasable}
              cartLoading={cartLoading || cartDeleteLoading}
              setCurrentVideo={setCurrentVideo}
              isExpired = {courseData?.data?.is_expired}
              refetchData = {refetchData}
            />}
          </View>
          <View key={1} style={[{backgroundColor: colors.white},commonStyles.spacingCommon]}>
            <ReviewList buyCourseScreen courseId={params?.CourseId} />
          </View>
          <View key={2} style={{backgroundColor: colors.white,marginBottom:moderateScale(40)}}>
            <AboutCourse
              aboutInfo={courseData?.data?.description}
              duration={courseData?.data?.duration}
              chapterCount={courseData?.data?.chapters_count}
            />
          </View>
        </CustomTab>
      </ScrollView>
      {chapterLength > 0 || !!courseDataRefetch?.data?.in_cart ? (
        <Animated.View
          onLayout={({nativeEvent}) => {
            const {height} = nativeEvent.layout;
            setSpaceBottom(height);
          }}
          style={[styles.paymentContainer, commonStyles.spacingCommon]}
          entering={SlideInDown.duration(600)}
          exiting={SlideInLeft.duration(500)}>
          <ProceddButton
            price={priceCalc()}
            contentType={courseType}
            chapter={chapterLength}
            onPressBtn={handleProceed}
          />
        </Animated.View>
      ) : null}
    </View>
  );
};

export default BuyCourse;

const styles = StyleSheet.create({
  container: {
    // flex: 2,
    backgroundColor: colors.white,
    gap: moderateScaleVertical(10),
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
});
