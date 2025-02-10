import {FlatList, RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import GroupCard from '../../../Components/Layout/Card/GroupCard';
import CouponsCard from '../../../Components/Layout/Card/CouponsCard';
import GroupCardLight from '../../../Components/Layout/Card/GroupCardLight';
import commonStyles from '../../../styles/commonStyles';
import useGetData from '../../../hooks/useGetData';
import {endpoints} from '../../../utils/endpoints';
import {showSuccess} from '../../../utils/helperFunctions';
import fontFamily from '../../../styles/fontFamily';
import {moderateScale, textScale} from '../../../styles/responsiveSize';
import colors from '../../../styles/colors';
import GroupCoupons from './GroupCoupons';
import navigationStrings from '../../../constants/navigationStrings';

const data = {
  id: 13,
  code: 'rt56',
  type: 'Voucher',
  image: null,
  backgroud_color: '#a43737',
  text_color: '#594a4a',
  text: null,
  button_color: '#d4a1a1',
  discount_amount: 9,
  discount_type: 'Percentage',
  max_members: 0,
  courses_count: 0,
  fixed_price: null,
  expiry_date: '2024-05-02',
  created_at: '2024-04-30 09:07:47 am',
  updated_at: '2024-04-30 09:07:47 am',
};

const AvailableOffer = () => {


  return (
    <ScrollView contentContainerStyle={[commonStyles.spacing, {flex: 1}]}>
      {/* <GroupCard /> */}
      <CouponsCard
        couponStyle={{marginRight: 0, marginVertical:moderateScale(12), right:moderateScale(3),}}
        couponType="group"
        expiryData={''}
        courseCount={''}
        discountAmount={0}
        discountType={'percentage'}
        realPrice={0}
        code={''}
        couponTitle='Group Coupon '
        navigationPath={navigationStrings.GroupCoupons}
      />
      <CouponsCard
        couponStyle={{marginRight: 0, marginVertical:moderateScale(12), right:moderateScale(3),}}
        couponType="package"
        expiryData={''}
        courseCount={''}
        discountAmount={0}
        discountType={'percentage'}
        realPrice={0}
        code={''}
        couponColor={''}
        couponTitle='Course Discount'
        navigationPath={navigationStrings.CourseDiscount}

      />
      <CouponsCard
        couponStyle={{marginRight: 0, marginVertical:moderateScale(12),  right:moderateScale(3),}}
        couponType="special"
        expiryData={''}
        courseCount={''}
        discountAmount={0}
        realPrice={0}
        code={''}
        couponTitle='Special Discount'
        navigationPath={navigationStrings.AvailableOffers}

        couponColor={''}
      />
      {/* <CouponsCard
        couponStyle={{marginRight: 0, marginVertical:moderateScale(12),  right:moderateScale(3),}}
        couponType="discount"
        expiryData={''}
        courseCount={''}
        discountAmount={0}
        realPrice={0}
        couponTitle='Special Package'
        navigationPath={navigationStrings.AvailableOffers}

        code={''}
        couponColor={''}
      /> */}

    

      {/* <GroupCardLight
        colorsArr={['#FFFDE8', '#FFE501']}
        price={20}
        type={'book'}
        btnLabel={'View Available courses under this Offer'}
        date={'2024-06-12'}
      /> */}
      {/* </> */}
    </ScrollView>
  );
};

export default AvailableOffer;

const styles = StyleSheet.create({});
