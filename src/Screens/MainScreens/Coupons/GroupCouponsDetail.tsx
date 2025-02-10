import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Linking, StyleSheet, View } from 'react-native';
import useGetData from '../../../hooks/useGetData';
import { endpoints } from '../../../utils/endpoints';
import { showError, showSuccess } from '../../../utils/helperFunctions';
// import Clipboard from '@react-native-clipboard/clipboard';
import { useDispatch, useSelector } from 'react-redux';
import GroupCardCreate from '../../../Components/Layout/Card/GroupCardCreate';
import usePostData from '../../../hooks/usePostData';
import { couponCodeData } from '../../../redux/slice/couponSlice';
import commonStyles from '../../../styles/commonStyles';

const dataNew = [
  {id:1,
      image:"https://cdn.pixabay.com/photo/2018/07/13/19/56/st-peters-church-3536449_1280.jpg"

  },
  {id:12,
    image:"https://cdn.pixabay.com/photo/2023/06/11/01/24/flowers-8055013_1280.jpg"

},
{id:13,
  image:"https://cdn.pixabay.com/photo/2018/10/21/19/23/flower-3763573_1280.jpg"

},
{id:1213,
  image:"https://cdn.pixabay.com/photo/2018/07/13/19/56/st-peters-church-3536449_1280.jpg"

},
{id:12123,
image:"https://cdn.pixabay.com/photo/2023/06/11/01/24/flowers-8055013_1280.jpg"

},
{id:1123,
image:"https://cdn.pixabay.com/photo/2018/10/21/19/23/flower-3763573_1280.jpg"

},
{id:121,
  image:"https://cdn.pixabay.com/photo/2018/07/13/19/56/st-peters-church-3536449_1280.jpg"

},
{id:1222,
image:"https://cdn.pixabay.com/photo/2023/06/11/01/24/flowers-8055013_1280.jpg"

},
{id:1123,
image:"https://cdn.pixabay.com/photo/2018/10/21/19/23/flower-3763573_1280.jpg"

}
]


const GroupCouponsDetail = () => {
  const {params}: any = useRoute();
  const dataRoute = useRoute();
  const [isOpenedViaLinking, setIsOpenedViaLinking] = useState(false);
  const [memberList, setMemberList] = useState([]);
  const userData = useSelector((state: any) => state?.auth?.userPayload);

  const dispatch = useDispatch();
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

  console.log(
    'params?.couponIDparams?.couponIDparams?.couponIDparams?.couponIDparams?.couponID',
    couponError,
    params?.couponID,
    data,
  );

  const handleGroupChange = (mainCode, code) => {
    // return
    if (mainCode == code) {
      if (!isOpenedViaLinking) {
        let payload = {
          user_id: userData?.id,
          // coupon_id: data?.data?.id,
          coupon_code: mainCode,
          is_owner: 1,
        };
        mutate(payload);
      }
    } else {
      showError('Code is not Matching');
    }
  };

  if (status === 'success') {
    showSuccess('Coupons Detail fetched');
  }

  if (status === 'error') {
    // showSuccess('error while fetching coupons');
  }

  const handleCopyCode = (code: string) => {
    // Clipboard.setString(code);
    dispatch(couponCodeData({code: code}));
    showSuccess('message is copied to clipboard');
  };

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

  useEffect(() => {
    if (groupCouponStatus === 'error') {
      showError(couponError?.message);
      refetch();

    } else if (groupCouponStatus === 'success') {
      showSuccess();
    
      refetch();
      
    }
  }, [groupCouponStatus]);

  return (
    <View style={[commonStyles.spacingCommon]}>
      <GroupCardCreate
        type="Group Coupon"
        couponCode={data?.data?.code}
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
        handleAddToVoucher={() => handleAddToVoucher()}
      />
      {/* {isOpenedViaLinking ? (
        <Text>Screen opened via deep link</Text>
      ) : (
        <Text>Screen opened directly</Text>
      )} */}
    

    
    </View>
  );
};

export default GroupCouponsDetail;

const styles = StyleSheet.create({});
