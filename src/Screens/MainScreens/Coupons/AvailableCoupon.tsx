import {Alert, FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CourseDiscountDetail from './CourseDiscountDetail';
import GroupCardLight from '../../../Components/Layout/Card/GroupCardLight';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import navigationStrings from '../../../constants/navigationStrings';
import commonStyles from '../../../styles/commonStyles';
import CouponsCard from '../../../Components/Layout/Card/CouponsCard';
import {moderateScale} from '../../../styles/responsiveSize';
import {useDispatch, useSelector} from 'react-redux';
import {couponCodeData} from '../../../redux/slice/couponSlice';
import useGetData from '../../../hooks/useGetData';
import {endpoints} from '../../../utils/endpoints';
import * as Progress from 'react-native-progress';
import colors from '../../../styles/colors';
import ErrorBox from '../../../Components/ErrorBox';
import { getDate } from '../../../utils/logicFunctions';
import Clipboard from '@react-native-clipboard/clipboard';

import usePostData from '../../../hooks/usePostData';
import { showError, showSuccess } from '../../../utils/helperFunctions';
import { cartCallData } from '../../../redux/slice/apiSlice';
import CourseLoader from '../../../Components/Loader/CourseLoader';
import CourseBoxLoader from '../../../Components/Loader/CourseBoxLoader';


interface paramsType {
  id?: number;
}

const AvailableCoupon = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const cartCall= useSelector((state:any)=>state.apiCall.cartCall)
  const {params} = useRoute();

  const {status, data,refetch,isFetching} = useGetData(`${endpoints.AVAILABLE_COUPONS}?coupon_type=2`, [
    'AVAILABLE_COUPONS',
  ]);
  const {mutate: isValid,isPending} = usePostData(
    endpoints.APPLY_COUPON as never,
    ['APPLY_COUPON'],
    'post',
    data => {
      showSuccess(data?.message);
      navigation.navigate(navigationStrings.Cart)

    },
    error => {

      const newError = JSON.parse(error?.message);
      if (newError?.error_type === 'all_required_courses') {
        showError(newError?.message);
        return;
      }
      navigation.navigate(navigationStrings.Cart)
      showError('error while applying coupon');
    },
  );

  if (status === 'pending' || isFetching) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {/* <Progress.Circle size={50} color={colors.theme} /> */}
        <CourseBoxLoader />
        <CourseBoxLoader />
      </View>
    );
  } else if (status === 'error') {
    return <ErrorBox message="No Coupons Found" />;
  }


  return (
    <View style={[commonStyles.spacingCommon]}>
      <FlatList
        data={data?.data}
        // data={[1,2,3,4] }
        renderItem={({item}) => {
          console.log("itemitemitemitemitemitemitemitem", item );

         return (
            <View>
              {item.type === 'Course Discount' ? (
                <GroupCardLight
                  price={item?.discount_amount}
                  type={'Course Discount'}
                  dateInfo={getDate(item?.created_at, item.expiry_date)}
                  courses={item?.courses_count}
                  createButtonChange={() => {
                    navigation.navigate(
                      navigationStrings.CourseDiscountDetail,
                      {couponID: item?.id, couponCourseList: item?.courses},
                    );
                  }}
                  discountType={item?.discount_type}
                  colorsArr={['#FFFDE8', '#FFE501']}
                  btnLabel={'View Available courses'}
                />
              ) : item.type === 'Group Coupon' ? (
                <CouponsCard
                  couponStyle={{
                    marginRight: 0,
                    marginVertical: moderateScale(12),
                    right: moderateScale(3),
                  }}
                  couponType="group"
                  expiryData={item.expiry_date}
                  courseCount={item.courses_count}
                  discountAmount={item.discount_amount}
                  discountType={item.discount_type}
                  realPrice={item.fixed_price}
                  code={item.code}
                  couponTitle="Group Coupon"
                  navigationPath={navigationStrings.GroupCoupons}
                />
              ) : item.type === 'specialDiscount' ? (
                <GroupCardLight
                  price={item?.discount_amount}
                  type={'Special Discount'}
                  date={item?.expiry_date}
                  createButtonChange={() => {}}
                  tapToApply
                  handleTapToApply={() => {
                    dispatch(couponCodeData({codeDetail: {code: item?.code}}));
                    navigation.navigate(navigationStrings.Cart);
                  }}
                  btnLabel={item?.code}
                  extend={false}
                  discountType={item?.discount_type}
                />
              ) : item.type === 'Course Discount' ? (
                <GroupCardLight
                  price={item?.discount_amount}
                  groupDetail={item}
                  type={'Course Discount'}
                  dateInfo={getDate(item?.created_at, item.expiry_date)}
                  courses={item?.courses_count}
                  totalCourses={item?.courses}
                  createButtonChange={() => {
                    Clipboard.setString(item?.code);
                    dispatch(couponCodeData({codeDetail: item?.code}));
                    isValid({coupon_code: item?.code});
                    cartCallData({cartCall: cartCall + 1});
                    // navigation.navigate(
                    //   navigationStrings.CourseDiscountDetail,
                    //   {couponID: item?.id, couponCourseList: item?.courses},
                    // );
                  }}
                  discountType={
                    item?.discount_type == 1 ? 'price' : 'percentage'
                  }
                  colorsArr={
                    item?.gradient_type === 'horizontal'
                      ? [item?.gradient_from, item?.gradient_to]
                      : [item?.gradient_top, item?.gradient_bottom]
                  }
                  btnLabel={'View Available courses'}
                />
              ) : null}
            </View>
          );
        }}
        ListEmptyComponent={() => {
          return <ErrorBox message="No Coupons Found" />;
        }}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default AvailableCoupon;

const styles = StyleSheet.create({});
