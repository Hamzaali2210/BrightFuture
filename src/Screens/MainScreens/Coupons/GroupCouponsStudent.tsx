import {Linking, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import commonStyles from '../../../styles/commonStyles';
import GroupCardLight from '../../../Components/Layout/Card/GroupCardLight';
import {showError, showSuccess} from '../../../utils/helperFunctions';
import {ParamListBase, useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {couponCodeData} from '../../../redux/slice/couponSlice';
import useGetData from '../../../hooks/useGetData';
import usePostData from '../../../hooks/usePostData';
import {endpoints} from '../../../utils/endpoints';
import {moderateScale} from '../../../styles/responsiveSize';
import GroupCardCreate from '../../../Components/Layout/Card/GroupCardCreate';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import navigationStrings from '../../../constants/navigationStrings';

const GroupCouponsStudent = () => {
  const {params}: any = useRoute();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const dataRoute = useRoute();
  const [isOpenedViaLinking, setIsOpenedViaLinking] = useState(false);
  const [memberList, setMemberList] = useState([]);
  const userData = useSelector((state: any) => state?.auth?.userPayload);
  const dispatch = useDispatch();

  const {status, data, refetch, error} = useGetData(
    `${endpoints.COUPONS_DETAIL}/${params?.couponID}`,
    ['COUPONS_DETAIL'],
  );

  const {
    mutate,
    status: groupCouponStatus,
    error: couponError,
    data: groupCouponData,
  } = usePostData(`${endpoints.APPLY_GROUP_COUPON}`, ['APPLY_GROUP_COUPON']);

  const handleCopyCode = (code: string) => {
    // Clipboard.setString(code);
    dispatch(couponCodeData({code: code}));
    showSuccess('message is copied to clipboard');
  };

  const handleGroupChange = (mainCode, code) => {
    // return
    if (mainCode == code) {
      if (!isOpenedViaLinking) {
        let payload = {
          user_id: userData?.id,
          coupon_id: data?.data?.id,
          is_owner: 1,
        };
        mutate(payload);
      }
    } else {
      showError('Code is not Matching');
    }
  };

  useEffect(() => {
    // Check if the screen was opened via a deep link
    Linking.getInitialURL().then(url => {
      if (url) {
        // Screen was opened via a deep link
        setIsOpenedViaLinking(true);
      }
    });

    // You can also add a listener for handling incoming links when the app is already open
    const linkingListener = Linking.addEventListener('url', event => {
      setIsOpenedViaLinking(true);
    });

    // Clean up the event listener
    return () => {
      linkingListener.remove();
    };
  }, []);

  useEffect(() => {
    if (groupCouponStatus === 'success') {
      showSuccess('');
      navigation.navigate(navigationStrings.GroupCouponsCustom);
    } else if (groupCouponStatus === 'error') {
      showError('Error while creating Coupon');
    }
  }, [groupCouponStatus]);

  const handleShare = async (code: string) => {
    // const deepLink = 'brightfutureuser://groupcouponsdetail/1234'; // Replace with your app's deep link URL
    const message =
      'Check out my Group Code and get discount on Bright Future: ' + code;
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

  const handleAddToVoucher = () => {
    if (!isOpenedViaLinking) {
      let payload = {
        user_id: userData?.id,
        coupon_id: data?.data?.id,
        is_owner: 1,
      };
      mutate(payload);
    }
  };

  return (
    <SafeAreaView style={[commonStyles.spacingCommon]}>
      {/* <GroupCardLight
        type="Group Coupon"
        couponCode={"BRIGHT30456"}
        price={data?.data?.discount_amount}
        member={data?.data?.max_members}
        enterCode={isOpenedViaLinking}
        date={data?.data?.expiry_date}
        handleCopyCode={()=>handleCopyCode(data?.data?.code)}
        handleShare={()=>handleShare(data?.data?.code)}
        memberList={memberList}
        handleGroupChange={(text)=>handleGroupChange(data?.data?.code,text,data?.id)}
        voucherScreen={data}
        customGroupCoupon
        handleAddToVoucher={()=>handleAddToVoucher()}
      /> */}
      <GroupCardCreate
        type="Group Coupon"
        couponCode={''}
        price={data?.data?.discount_amount}
        member={data?.data?.max_members}
        enterCode={isOpenedViaLinking}
        date={data?.data?.expiry_date}
        handleCopyCode={() => handleCopyCode(data?.data?.code)}
        handleShare={() => handleShare(data?.data?.code)}
        memberList={memberList}
        handleGroupChange={text =>
          handleGroupChange(data?.data?.code, text, data?.id)
        }
        voucherScreen={data}
        customGroupCoupon
        isOwner={true}
        editable={false}
        handleAddToVoucher={() => handleAddToVoucher()}
      />
    </SafeAreaView>
  );
};

export default GroupCouponsStudent;

const styles = StyleSheet.create({});
