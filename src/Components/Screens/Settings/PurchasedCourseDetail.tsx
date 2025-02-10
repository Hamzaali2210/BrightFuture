import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import commonStyles from '../../../styles/commonStyles';
import WrapperContainer from '../../WrapperContainer';
import imagePath from '../../../constants/imagePath';
import colors from '../../../styles/colors';
import {
  scale,
  moderateScale,
  textScale,
  verticalScale,
  width,
  moderateScaleVertical,
} from '../../../styles/responsiveSize';
import fontFamily from '../../../styles/fontFamily';
import {ratingStar} from '../../../utils/logicFunctions';
import CommonButton from '../../CommonButton';
import navigationStrings from '../../../constants/navigationStrings';
import useGetData from '../../../hooks/useGetData';
import {endpoints} from '../../../utils/endpoints';

import * as Progress from 'react-native-progress';
import FastImage from 'react-native-fast-image';
import PaymentTable from '../../Layout/List/PaymentTable';
import {PurchasedCourseDetailInterface} from '../../../types/componentInterface';
import usePostData from '../../../hooks/usePostData';
import dayjs from 'dayjs';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Animated, {SlideInDown, SlideInLeft} from 'react-native-reanimated';
import {IMAGE_API_URL} from '../../../utils/urls';

const PurchasedCourseDetail: React.FC<PurchasedCourseDetailInterface> = ({
  checklist,
  paymentType,
}) => {
  const {params}: any = useRoute();
  console.log('paramas33333333', params);

  const [star, setStar] = useState([]);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [payAmount, setPayAmount] = useState(0);
  const [payId, setPayId] = useState(null);
  const [btnTxt, setBtnTxt] = useState(false);
  const [paymentCheck, setPaymentCheck] = useState(false);

  const {
    isLoading: purchasedDetailLoading,
    data: purchasedCourseDetail,
    isError,
    isSuccess,
  } = useGetData(
    `${endpoints.PURCHASED_COURSES_DETAIL}/${params?.purchasedId}/${params?.courseId}`,
    ['PURCHASED_COURSES_DETAIL'],
  );

  const {status, data, refetch} = useGetData(
    `${endpoints.INSTALLMENT}?order_id=${purchasedCourseDetail?.data?.order_id}`,
    ['INSTALLMENT'],
  );

  console.log('4321234323222222', purchasedCourseDetail);

  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess]);

  const {
    mutate: makePayment,
    data: paymentData,
    error: paymentError,
    isPending,
  } = usePostData(endpoints.PAYMENTS, ['PAYMENTS']);

  useEffect(() => {
    if (isPending) {
      setBtnTxt(true);
    } else if (paymentData) {
      setBtnTxt(false);
      navigation.navigate(navigationStrings.WebView, {
        url: paymentData?.Data?.invoiceURL,
      });
    }
  }, [isPending, paymentData]);

  const handleInvoice = () => {};

  const handlePayment = () => {
    console.log('idhar aa hua ha ', payId, payAmount);

    makePayment({
      amount: payAmount,
      installment_id: payId,
      payment_type: 'installment',
    });
  };

  console.log(
    purchasedCourseDetail?.data,
    'purchasedCourseDetail?.datapurchasedCourseDetail?.data',
  );

  const navigtion: NavigationProp<ParamListBase> = useNavigation();
  useEffect(() => {
    const ratingStarFunc: any = ratingStar(
      purchasedCourseDetail?.data?.review?.rating,
    );
    // const ratingStarFunc: any = ratingStar(2);
    console.log({
      ratingStarFuncratingStarFuncratingStarFuncratingStarFuncratingStarFunc:
        purchasedCourseDetail?.data,
    });
    setStar(ratingStarFunc);
  }, [purchasedCourseDetail?.data]);

  if (purchasedDetailLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Progress.Circle
          indeterminate
          size={moderateScale(80)}
          color={colors.theme}
        />
      </View>
    );
  }

  return (
    <WrapperContainer>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{}}>
        <View style={[styles.container, commonStyles.spacing]}>
          <TouchableOpacity
            onPress={() => {
              if (
                !purchasedCourseDetail?.data?.is_locked &&
                !purchasedCourseDetail?.data?.course?.is_expired
              ) {
                navigtion.navigate(navigationStrings.SingleCourseDetail, {
                  courseId: params?.courseId,
                });
              }
            }}>
            <View style={[styles.greyContainer]}>
              <Text
                style={[
                  styles.greyContainerText,
                  {textTransform: 'uppercase'},
                ]}>
                Course Details
              </Text>
              <View style={[styles.courseNameDetailContainer]}>
                <View style={[styles.courseImageContainer]}>
                  <FastImage
                    source={{
                      uri:
                        `${IMAGE_API_URL}${purchasedCourseDetail?.data?.course?.image}` ||
                        purchasedCourseDetail?.data?.course?.image,
                    }}
                    style={[styles.courseImageStyle]}
                  />
                </View>
                <View style={[styles.courseNameTextContainer]}>
                  <View style={[]}>
                    <Text
                      style={[styles.courseNameTextHeading]}
                      numberOfLines={2}>
                      {purchasedCourseDetail?.data?.course?.name}(
                      {purchasedCourseDetail?.data?.course?.code})
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={[styles.greyContainerText, {flex: 1}]}>
                      by{' '}
                      {
                        purchasedCourseDetail?.data?.course?.instructor
                          ?.full_name
                      }
                    </Text>
                    <View
                      style={[{flexDirection: 'row', alignItems: 'center'}]}>
                      <Image
                        source={imagePath.thickBook}
                        resizeMode={'cover'}
                      />
                      <Text style={[styles.greyContainerText, {marginLeft: 5}]}>
                        Lessons :
                        {' ' +
                          purchasedCourseDetail?.data?.course?.chapters_count}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          <View style={[styles.greyContainer]}>
            <Text
              style={[styles.greyContainerText, {textTransform: 'uppercase'}]}>
              BILLING DETAILS
            </Text>
            <View style={[styles.billingContainerList]}>
              <View style={[styles.billingContainerHeadingList]}>
                <Text style={[styles.billingHeadingText]}>Date:</Text>
                <Text style={[styles.billingHeadingText]}>Amount Paid:</Text>
                <Text style={[styles.billingHeadingText]}>
                  Payment Structure
                </Text>
                <Text style={[styles.billingHeadingText]}>Payment Method:</Text>
              </View>
              <View style={[styles.billingContainerResponseList]}>
                <Text style={[styles.billingResponseText]}>
                  {dayjs(
                    purchasedCourseDetail?.data?.billing_details
                      ?.transaction_date,
                  ).format('DD MMMM YYYY')}
                </Text>
                <Text style={[styles.billingResponseText]}>
                  {purchasedCourseDetail?.data?.billing_details?.amount} KD
                </Text>
                <Text style={[styles.billingResponseText]}>
                  {purchasedCourseDetail?.data?.billing_details
                    ?.transaction_type === 'full'
                    ? 'By Full Payment'
                    : 'By Installment'}
                </Text>
                <Text style={[styles.billingResponseText]}>
                  {purchasedCourseDetail?.data?.billing_details?.payment_method}
                </Text>
              </View>
            </View>
            {data?.data?.length > 0 &&
              purchasedCourseDetail?.data?.billing_details?.transaction_type !==
                'full' && (
                <PaymentTable
                  checklist={true}
                  data={data?.data}
                  handlePayNowButton={amount => {
                    console.log('yeah amount haia idhar', amount);
                    setPayId(amount?.id);
                    setPaymentCheck(!paymentCheck);
                    setPayAmount(amount?.amount);
                  }}
                  paymentCheck={paymentCheck}
                />
              )}
          </View>
          {!checklist && (
            <View style={[styles.greyContainer]}>
              <Text
                style={[
                  styles.greyContainerText,
                  {textTransform: 'uppercase'},
                ]}>
                Reviews
              </Text>
              <View style={[styles.ratingContainer]}>
                <View style={[styles.ratingStar]}>
                  {star.map(item => (
                    <View>{item}</View>
                  ))}
                </View>
                <Text style={[styles.ratingText]}>
                  {purchasedCourseDetail?.data?.review?.rating}
                </Text>
              </View>
              <View style={[styles.textContainer]}>
                <Text style={[styles.reviewText]}>
                  {purchasedCourseDetail?.data?.review?.review}
                </Text>
              </View>
            </View>
          )}
          {/* <CommonButton
            btnText="Generate Invoice >"
            onPressBtn={handleInvoice}
            mainViewStyle={{margin: 0, marginBottom: moderateScaleVertical(20)}}
          /> */}
          <Animated.View
            style={{position: 'absolute', bottom: 0, width: width}}
            entering={SlideInDown.duration(600)}
            exiting={SlideInLeft.duration(500)}>
            {purchasedCourseDetail?.data?.billing_details?.transaction_type !==
              'full' &&
              paymentCheck &&
              payAmount > 0 && (
                <CommonButton
                  btnText={`Pay Now | ${payAmount}KD`}
                  onPressBtn={handlePayment}
                  loading={btnTxt}
                  mainViewStyle={{
                    margin: 0,
                    width: width - 40,
                    marginVertical: moderateScaleVertical(20),
                    marginLeft: moderateScale(2),
                  }}
                />
              )}
          </Animated.View>
        </View>
      </ScrollView>
    </WrapperContainer>
  );
};

export default PurchasedCourseDetail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  greyContainer: {
    gap: moderateScale(15),
    backgroundColor: colors.containerGrey,
    borderRadius: moderateScale(12),
    padding: moderateScale(12),
    overflow: 'hidden',
    marginVertical: moderateScale(8),
    paddingVertical: verticalScale(18),
  },
  greyContainerText: {
    color: colors.blackGreyLight,
    fontFamily: fontFamily.Poppins_Regular,
  },
  courseNameTextHeading: {
    fontSize: moderateScaleVertical(14),
    fontFamily: fontFamily.Poppins_Bold,
    width: '80%',
    color: colors.black,
  },
  courseNameDetailContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    overflow: 'hidden',
  },
  courseImageContainer: {
    width: moderateScale(70),
    height: moderateScale(80),
    borderRadius: moderateScale(12),
    overflow: 'hidden',
    backgroundColor: colors.themeLightBox,
    marginRight: moderateScale(10),
  },
  courseNameTextContainer: {
    gap: moderateScale(10),
    // width: '100%',
    flex: 1,
  },
  courseImageStyle: {
    width: '100%',
    height: '100%',
  },
  billingContainerHeadingList: {
    gap: moderateScale(12),
  },
  ratingContainer: {
    flexDirection: 'row',
    gap: moderateScale(6),
    alignItems: 'center',
  },
  ratingText: {
    fontFamily: 'Montserrat-Regular',
    color: colors.darkGrey,
  },
  ratingStar: {
    flexDirection: 'row',
  },
  billingContainerList: {
    flexDirection: 'row',
  },
  billingHeadingText: {
    fontFamily: fontFamily.Poppins_Regular,
    color: colors.black,
  },
  billingResponseText: {
    fontFamily: fontFamily.Poppins_SemiBold,
    textAlign: 'right',
    fontSize: moderateScaleVertical(12),
    color: colors.black,
  },
  billingContainerResponseList: {
    flex: 1,
    gap: moderateScale(12),
  },
  textContainer: {
    marginVertical: verticalScale(10),
  },
  reviewText: {
    fontFamily: fontFamily.Montserrat_Regular,
    fontSize: textScale(14),
    color: colors.black,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
