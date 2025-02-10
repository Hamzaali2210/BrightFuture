import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {FlatList, Linking, RefreshControl, View} from 'react-native';
import {useDispatch} from 'react-redux';
import imagePath from '../../../constants/imagePath';
import {mainStrings} from '../../../constants/mainstrings';
import navigationStrings from '../../../constants/navigationStrings';
import useGetData from '../../../hooks/useGetData';
import usePostData from '../../../hooks/usePostData';
import {couponCodeData} from '../../../redux/slice/couponSlice';
import commonStyles from '../../../styles/commonStyles';
import {endpoints} from '../../../utils/endpoints';
import {showError, showSuccess} from '../../../utils/helperFunctions';
import EmptyScreen from '../../EmptyScreen';
import GroupCardLight from '../../Layout/Card/GroupCardLight';
import CourseLoader from '../../Loader/CourseLoader';

const MyVouchers = () => {
  const {status, data, error, refetch,isFetching} = useGetData(
    `${endpoints.GET_VOUCHER}`,
    ['getcoupons'],
  );
  // const {
  //   status: deleteGroupCouponStatus,
  //   mutate: deleteGroupCoupon,
  //   error: deleteGroupCouponError,
  // } = usePostData(endpoints.DELETE_GROUP_COUPONS, ['DELETE_GROUP_COUPONS']);
  const [refreshing, setRefreshing] = React.useState(false);
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  console.log('data aa rha hai', data, status);

  if (status === 'success') {
    showSuccess('Coupons fetched');
  }

  if (status === 'error') {
    // showSuccess('error while fetching coupons');
  }

  if (status === 'pending' || isFetching) {
    return (
      <View>
        <CourseLoader />
      </View>
    );
  }

  const handleCreateAGroup = () => {};
  const handleShare = async (code: string) => {
    const deepLink = 'brightfutureuser://groupcouponsdetail/1234'; // Replace with your app's deep link URL
    const message = 'Check out my Group Code: ' + code;
    const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(message)}`;

    try {
      const canOpen = await Linking.canOpenURL(whatsappUrl);
      if (canOpen) {
        await Linking.openURL(whatsappUrl);
      }
    } catch (error) {
      showError('Unable to open the URL');
      console.error('Error opening WhatsApp:', error);
    }
  };
  return (
    <View style={[commonStyles.spacing, {flex: 1}]}>
      {true ? (
        <FlatList
          data={data?.data?.data}
          ListEmptyComponent={() => {
            return (
              <EmptyScreen
                image={imagePath.noGroup}
                heading={'No Group Coupons already created'}
                description={mainStrings.noGroupEmpty}
              />
            );
          }}
          renderItem={({item}) => {
            console.log('item aa rha hai ', item);

            return (
              <GroupCardLight
                member={item?.max_members}
                price={item?.discount_amount}
                type={'Group Coupon'}
                discountType={item?.discount_type}
                date={item?.expiry_date}
                groupMembers={item?.groupCouponMember}
                createButtonChange={() => {
                  navigation.navigate(navigationStrings.GroupCouponsDetail, {
                    couponID: item?.id,
                  });
                }}
                handleShare={() => {
                  handleShare(item?.code);
                }}
                extend
                enterCode
                isOwner
                handleCopyCode={() => {
                  // Clipboard.setString(code);
                  dispatch(couponCodeData({code: item?.code}));
                  showSuccess('message is copied to clipboard');
                }}
              />
            );
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                refetch();
                if (status === 'success') setRefreshing(false);
                else if (status === 'error') setRefreshing(false);
              }}
            />
          }
        />
      ) : null}
    </View>
  );
};

export default MyVouchers;
