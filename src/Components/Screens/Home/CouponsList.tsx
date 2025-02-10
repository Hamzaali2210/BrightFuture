import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { mainStrings } from '../../../constants/mainstrings';
import navigationStrings from '../../../constants/navigationStrings';
import useGetData from '../../../hooks/useGetData';
import usePostData from '../../../hooks/usePostData';
import { CouponsListLoader } from '../../../redux/slice/loaderSlice';
import commonStyles from '../../../styles/commonStyles';
import { moderateScale, verticalScale } from '../../../styles/responsiveSize';
import { endpoints } from '../../../utils/endpoints';
import { showSuccess } from '../../../utils/helperFunctions';
import GroupCardLight from '../../Layout/Card/GroupCardLight';
import HomeFeatHeading from '../../Layout/Typography/HomeFeatHeading';
import MyLoader from '../../Loader/RectangleLoader';

interface CouponData {
  code: string;
  courses_count: number;
  created_at: string;
  discount_amount: number;
  discount_type: string;
  expiry_date: string;
  fixed_price: string;
  id: number;
  max_members: number;
  type: string;
  updated_at: string;
}

type responseType = {
  data: Array<CouponData>;
};

function CouponsList() {
  const {data, status,isFetching} = useGetData(
    `${endpoints.AVAILABLE_COUPONS}?coupon_type=1`,
    ['COUPONS'],
  );
  const {mutate: addGroupMember, status: addGroupStatus} = usePostData(
    endpoints.ADD_GROUP,
    ['ADD_GROUP'],
  );

  const finalData: responseType = data as responseType;
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state?.auth?.userPayload);
  console.log("userDatauserDatauserDatauserDatauserData", userData);
  

  const navigation = useNavigation<any>();
  // return ;

  const couponData: Array<CouponData> = finalData?.data as Array<CouponData>;

  useEffect(() => {
    if (status === 'pending' || isFetching) {
      dispatch(CouponsListLoader({loader: true}));
    } else if (status === 'success') {
      dispatch(CouponsListLoader({loader: false}));
    }
  }, [status]);

  useEffect(() => {
    if (addGroupStatus === 'success') {
      showSuccess('A New Group Coupon Created');
      navigation.navigate(navigationStrings.MyVouchers);
    } else if (addGroupStatus === 'error') {
      // showSuccess('error while fetching coupons');
    }
  }, [addGroupStatus]);

  if (status === 'pending' || isFetching) {
    return (
      <>
        <MyLoader />
      </>
    );
  }

  return (
    <View
      style={[commonStyles.spacingCommon, {marginVertical: verticalScale(10)}]}>
      <HomeFeatHeading
        title={mainStrings.Coupons}
        routeName={navigationStrings.AvailableOffers}
      />

      <FlatList
        data={couponData?.slice(0, 6)}
        horizontal
        renderItem={({item}) => (
          <View style={{marginRight: moderateScale(12)}}>
            <GroupCardLight
              member={item?.max_members}
              price={item?.segment?.discount}
              type={"Group Coupon"}
              couponCode={item?.code}
              discountType={item?.discount_type === "Amount" ?"price":"percentage"}
              date={item?.expiry_date}
              homeScreenGroupCode
              homeList
              createButtonChange={() => {
                // navigation.navigate(navigationStrings.GroupCouponsDetail, {
                //   couponID: item?.id,
                // });
                // console.log("yooyoyoyoyyooyoyoyoyoyoy");
                
                let payload = {
                  user_id: userData?.id,
                  coupon_code: item?.code,
                  is_owner: 1,
                };
              addGroupMember(payload);
              }}
              cardStyle={{width: moderateScale(320)}}
            />
          </View>
        )}
        keyExtractor={item => `${item.id}`}
      />
    </View>
  );
}

export default CouponsList;

const styles = StyleSheet.create({
  couponsListContainer: {
    flexDirection: 'row',
  },
});
