import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Linking,
  Platform,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import imagePath from '../../../constants/imagePath';
import navigationStrings from '../../../constants/navigationStrings';
import useGetData from '../../../hooks/useGetData';
import usePostData from '../../../hooks/usePostData';
import {couponCodeData} from '../../../redux/slice/couponSlice';
import colors from '../../../styles/colors';
import commonStyles from '../../../styles/commonStyles';
import fontFamily from '../../../styles/fontFamily';
import Clipboard from '@react-native-clipboard/clipboard';
import CheckCircle from 'react-native-vector-icons/AntDesign'


import {
  height,
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../styles/responsiveSize';
import {endpoints} from '../../../utils/endpoints';
import {showError, showSuccess} from '../../../utils/helperFunctions';
import {getDate} from '../../../utils/logicFunctions';
import CustomTextInput from '../../CustomTextInput';
import ErrorBox from '../../ErrorBox';
import GroupCardCreate from '../../Layout/Card/GroupCardCreate';
import ModalCard from '../../Layout/Card/ModalCard';
import CourseLoader from '../../Loader/CourseLoader';
import EmptyScreen from '../../EmptyScreen';
import { mainStrings } from '../../../constants/mainstrings';
import BoxLoader from '../../Loader/BoxLoader';
import CourseBoxLoader from '../../Loader/CourseBoxLoader';
import { useKeyboard } from '../../../hooks/useKeyboard';
import ModalDelete from '../../Layout/Card/ModalDelete';
import { default as WarningIcon } from 'react-native-vector-icons/FontAwesome';


const MyVoucherGroup = () => {
  const {status, data, refetch,isFetching}: any = useGetData(
    `${endpoints.GET_GROUP_COUPONS}`,
    ['getcoupons'],
  );
  const userData = useSelector((state: any) => state?.auth?.userPayload);

  console.log("userDatauserDatauserDatauserDatauserData",userData);
  
  const keyboardHeight = useKeyboard(); 

  const {
    mutate: addGroupMember,
    status: addGroupStatus,
    error,
  } = usePostData(endpoints.ADD_GROUP, ['ADD_GROUP']);
  const [refreshing, setRefreshing] = React.useState(false);
  const [isSubsVisible,setIsSubsVisible]=useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [code, setCode] = React.useState('');
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [couponID,setCouponID]=useState(0);

  const [voucherDeleteId, setVoucherDeleteId] = useState();
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const {params}: any = useRoute();
  console.log('paramsparamsparamsparamsparamsparamsparams', userData);

  const {mutate: deleteCoupons, status: deleteStatus} = usePostData(
    `${endpoints.COUPONS_DELETE}`,
    ['COUPONS_DELETE'],
    'delete',
    (data: any) => {
      showSuccess(data?.message || 'coupons has been deleted successfully');
      refetch()
    },
    (error: any) => {
      if (error?.message) {
        showSuccess(error?.message || 'there was error while delete coupons');
        refetch()
      } else {
        showError(error || 'there was error while delete coupons');
      }
    },
  );

  const {data:checkDiscount,status:checkDiscountStatus,refetch:checkDiscountRefetch}= useGetData(`${endpoints.CHECK_GROUP_DISCOUNT}?coupon_id=${couponID}`,[couponID])
  const {mutate:refundWallet}= usePostData(`${endpoints.REFUND_WALLET}`,[checkDiscount],'post',(data)=>{
    showSuccess('Money Refunded');
    toggleSubsModal();
    refetch()
    checkDiscountRefetch();
  },(error)=>{
    checkDiscountRefetch();
    showError('error While doing the Refund, Please tr')
  })
  // useEffect(() => {
  //   if (deleteStatus === 'success') {
  //     showSuccess('Coupon Deleted Successfully');
  //   } else if (deleteStatus === 'error') {
  //     showError('Error while deleting the coupon');
  //   }
  // }, [deleteStatus]);

  useEffect(() => {
    if (voucherDeleteId) {
      deleteCoupons({id: voucherDeleteId});
    }
  }, [voucherDeleteId]);

  const handleDeleteVoucher = (item: any) => {
    setVoucherDeleteId(item?.id);
  };

  // useEffect(() => {
  //   if (params?.joinGroup) {
  //     setIsModalVisible2(!isModalVisible2);
  //   }
  // }, []);

  console.log("checkDiscountcheckDiscountcheckDiscountcheckDiscount",checkDiscount);
  

  useEffect(() => {
    if (status === 'success') {
      showSuccess('Coupons fetched');
      refetch();
    } else if (status === 'error') {
      showSuccess('error while fetching coupons');
      refetch();
    }
  }, [status]);

  useEffect(() => {
    if (addGroupStatus === 'success') {
      showSuccess('Coupons fetched');
      setIsModalVisible(!isModalVisible);
      setIsModalVisible2(!isModalVisible2);
      refetch();
    } else if (addGroupStatus === 'error') {
      // showSuccess('error while fetching coupons');
      setIsModalVisible(!isModalVisible);
      setIsModalVisible2(!isModalVisible2);
      refetch();
    }
  }, [addGroupStatus]);

  if (status === 'pending' || isFetching) {
    return (
      <View style={{flex: 1, marginHorizontal: 10}}>
        <CourseBoxLoader/>
        <CourseBoxLoader/>
        {/* <CourseLoader /> */}
        {/* <CourseLoader /> */}
      </View>
    );
  }

  const handleCheckCode = () => {
    // let payload = {
    //   user_id: userData?.id,
    //   coupon_code: code,
    //   is_owner: 0,
    // };
    // addGroupMember(payload);
    setIsModalVisible(!isModalVisible);
  };

  const handleJoinGroup = () => {
    let payload = {
      user_id: userData?.id,
      coupon_code: code,
      is_owner: 0,
    };

    addGroupMember(payload);
  };

  const handleRefund= ()=>{
      setIsSubsVisible(!isSubsVisible)
  }

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
  const toggleSubsModal = ()=>{
    setIsSubsVisible(false);
  }
  return (
    <View style={[commonStyles.spacing, {}]}>
      {true ? (
        <FlatList
          data={data?.data}
          scrollEnabled={false}
          ListEmptyComponent={() => {
            return (
              <EmptyScreen
                image={imagePath.noGroup}
                heading={'No Group Coupons is created'}
                description={mainStrings.noGroupEmpty}
              />
            );
          }}
          renderItem={({item}) => {
            console.log("asdasdasdasdasdsadasdadasd",item);
           
            return (
              <GroupCardCreate
                member={item?.max_members}
                price={item?.discount_amount}
                type={'Group Coupon'}
                couponId={item?.id}
                setCouponID={setCouponID}
                couponCode={item?.code}
                dateInfo={getDate(item?.created_at, item.expiry_date)}
                discountType={
                  item?.discount_type === 'Amount' ? 'price' : 'percentage'
                }
                date={item?.expiry_date}
                createButtonChange={() => {
                  navigation.navigate(navigationStrings.GroupCouponsDetail, {
                    couponID: item?.id,
                  });
                }}
                editable={!!+item?.is_owner}
                refetchGroupCoupon={refetch}
                voucherScreen
                isJoined={!!+item?.is_joined}
                handleDeleteVoucher={() => handleDeleteVoucher(item)}
                handleShare={() => {
                  handleShare(item?.code);
                }}
                handleRefund = {handleRefund}
                memberList={item?.groupCouponMember}
                extend
                enterCode
                pivot={item?.pivot}
                isOwner={!!+item?.is_owner}
                isPaidOwner = {!!item?.coupon_paid_status}
                customGroupCoupon={false}
                handleCopyCode={() => {
                  Clipboard.setString(item?.code);
                  // dispatch(couponCodeData({codeDetail: item?.code}));
                  showSuccess('message is copied to clipboard');
                }}
                // colorsArr={
                //   item?.backgroud_color
                //     ? [item?.backgroud_color, item?.backgroud_color]
                //     : ['#ebf1f5', '#ebf1f5']
                // }
              />
              // <>
              // {/* <GroupCoupons/> */}
              // <GroupCard />
              // </>
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
      {/* <TouchableOpacity style={styles.applyButton} onPress={handleCheckCode}>
        <Text style={styles.applyText}>Apply</Text>
      </TouchableOpacity> */}

      {!!data?.data?.length && (
        <Text
          style={{
            fontFamily: fontFamily.Poppins_Medium,
            color: colors.red,
            fontSize: textScale(12),
            marginTop: moderateScale(8),
            textAlign: 'center',
          }}>
          {
            getDate(data?.data[0]?.created_at, data?.data[0].expiry_date)
              .daysPending
          }{' '}
          days left
        </Text>
      )}
      {!!data?.data?.length &&
        data?.data[0]?.groupCouponMember?.length <
          data?.data[0]?.max_members && (
          <Text
            style={{
              fontFamily: fontFamily.Poppins_Medium,
              color: colors.theme,
              fontSize: textScale(22),
              marginTop: moderateScale(24),
              textAlign: 'center',
            }}>
            {data?.data[0]?.max_members -
              data?.data[0]?.groupCouponMember?.length}{' '}
            More students hurry up !!
          </Text>
        )}
      {!!data?.data?.length && false && (
        <View
          style={{
            borderRadius: moderateScale(14),
            backgroundColor: '#ECF1F6',
            padding: moderateScale(14),
            marginHorizontal: moderateScale(20),
            marginTop: moderateScale(12),
          }}>
          <Text
            style={{
              color: colors.red,
              fontFamily: fontFamily.Poppins_Regular,
              fontSize: textScale(12),
              marginVertical: moderateScale(6),
            }}>
            Note:
          </Text>
          <Text
            style={{
              color: colors.black,
              fontFamily: fontFamily.Poppins_Regular,
              fontSize: textScale(12),
            }}>
            Please note, the coupon will only be activated if all group members
            initiate payment. If payment is not initiated within the specified
            time, the coupon will be disabled. In that case, if you have already
            made a payment, you will receive a refund within 24 hours.
          </Text>
        </View>
      )}

      {/* <ModalSuccess
        isModalVisible={false}
        toggleModal={() => {
          setIsModalVisible(!isModalVisible);
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: moderateScaleVertical(20),
          }}>
          <FastImage
            source={imagePath.verify}
            style={{width: moderateScale(120), height: moderateScale(120)}}
          />
          <Text
            style={{
              marginTop: moderateScale(18),
              fontFamily: fontFamily.Poppins_Medium,
              fontSize: textScale(19),
              color: colors.black,
              textAlign: 'center',
              width: '80%',
            }}>
            {mainStrings.chapterSuccess}
          </Text>

          <BlueLabelButton
            text="Ok"
            handleChange={() => {
              setIsModalVisible(!isModalVisible);
            }}
            txtStyle={{
              textAlign: 'center',
              width: '100%',
              fontFamily: fontFamily.Poppins_SemiBold,
            }}
            btnStyle={{
              borderRadius: moderateScale(8),
              width: moderateScale(155),
              height: moderateScale(40),
              marginTop: moderateScale(18),
            }}
          />
        </View>
      </ModalSuccess> */}

      {/* <ModalSuccess
        isModalVisible={isModalVisible}
        toggleModal={() => {
          setIsModalVisible(!isModalVisible);
        }}>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            gap: moderateScale(10),
          }}>
          <Text
            style={[
              styles.applyText,
              {
                color: colors.black,
                fontFamily: fontFamily.Poppins_Medium,
                fontSize: textScale(14),
                textAlign: 'center',
              },
            ]}>
            Enter your Code To Join the Group
          </Text>
          <CustomTextInput
            value={code}
            placeholder="Enter BRIGHTXXXX"
            containerStyle={{height: moderateScale(60), width: '100%'}}
            onChangeText={e => setCode(e)}
          />
          <TouchableOpacity
            style={styles.applyButton}
            onPress={handleCheckCode}>
            <Text style={styles.applyText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </ModalSuccess> */}
      <ModalCard
        isModalVisible={isModalVisible2}
        isCancel
        toggleModal={() => {
          setIsModalVisible2(!isModalVisible2);
        }}>
          <View style={{marginBottom: Platform.OS === 'ios' ? keyboardHeight : 0}}>
          <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: moderateScaleVertical(20),
            
          }}>
          <Text
            style={{
              fontFamily: fontFamily.Poppins_SemiBold,
              color: colors.black,
              fontSize: textScale(18),
              marginTop: moderateScale(8),
              width: '100%',
            }}>
            Join a Group
          </Text>

          <CustomTextInput
            value={code}
            placeholder="Enter Code here"
            containerStyle={{
              height: moderateScale(60),
              width: '100%',
              marginTop: moderateScale(24),
            }}
            onChangeText={e => setCode(e)}
          />
          {/* <Text
            style={{
              fontFamily: fontFamily.Poppins_Medium,
              color: colors.red,
              fontSize: textScale(12),
              marginTop: moderateScale(8),
            }}>
            12 days left
          </Text>
          <Text
            style={{
              fontFamily: fontFamily.Poppins_Medium,
              color: colors.theme,
              fontSize: textScale(22),
              marginTop: moderateScale(24),
            }}>
            2 More students hurry up !!
          </Text>
          <View
            style={{
              borderRadius: moderateScale(14),
              backgroundColor: '#ECF1F6',
              padding: moderateScale(14),
              // marginHorizontal: moderateScale(20),
              marginTop: moderateScale(12),
            }}>
            <Text
              style={{
                color: colors.red,
                fontFamily: fontFamily.Poppins_Regular,
                fontSize: textScale(12),
              }}>
              Note:
            </Text>
            <Text
              style={{
                color: colors.black,
                fontFamily: fontFamily.Poppins_Regular,
                fontSize: textScale(12),
              }}>
              Please note, the coupon will only be activated if all group
              members initiate payment. If payment is not initiated within the
              specified time, the coupon will be disabled. In that case, if you
              have already made a payment, you will receive a refund within 24
              hours.
            </Text>
          </View> */}
        </View>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: moderateScale(12),
            backgroundColor: '#FFE500',
            paddingVertical: moderateScaleVertical(12),
            justifyContent: 'center',
            borderRadius: moderateScale(15),
            marginBottom: moderateScale(12),
          }}
          onPress={handleJoinGroup}>
          <FastImage
            source={imagePath.joinButton}
            style={{width: moderateScale(24), height: moderateScale(24)}}
          />
          <Text
            style={{
              fontFamily: fontFamily.Montserrat_SemiBold,
              color: colors.black,
              fontSize: textScale(16),
            }}>
            Join a Group
          </Text>
        </TouchableOpacity>
          </View>
     
      </ModalCard>
      <ModalDelete isModalVisible={isSubsVisible} toggleModal={toggleSubsModal} modalContent={{backgroundColor:colors.lightThemeBlue}}>
      <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: moderateScaleVertical(40),
          }}>
           {!!checkDiscount?.all_paid_status?  <CheckCircle
              color={colors.green}
              size={moderateScale(55)}
              name="checkcircle"
            />:
        <WarningIcon
            color={colors.themeYellow}
            size={moderateScale(55)}
            name="warning"
          />}
          <Text
            style={{
              fontFamily: fontFamily.Poppins_Medium,
              color: colors.black,
              fontSize: textScale(21),
              textAlign: 'center',
              marginVertical: moderateScaleVertical(11),
            }}>
            {!!checkDiscount?.all_paid_status?'Congratulations':"Attention"}
          </Text>
        {!checkDiscount?.all_paid_status?  <Text
            style={{
              fontFamily: fontFamily.Poppins_Regular,
              color: colors.black,
              fontSize: textScale(14),
              textAlign: 'left',
            }}>
           Because not all members in your group have paid, you will only receive
           <Text style={{fontFamily:fontFamily.Poppins_Bold}}>
           {' '+checkDiscount?.data?.discount}KD
           </Text> {" "}
           Would you like to procedd?

          </Text>
         : <Text
            style={{
              fontFamily: fontFamily.Poppins_Regular,
              color: colors.black,
              fontSize: textScale(14),
              textAlign: 'center',
            }}>
          Congratulation You Will receive
           <Text style={{fontFamily:fontFamily.Poppins_Bold}}>
           {' '+checkDiscount?.data?.discount} KD
           </Text>{" "}
           in your wallet as all member have paid

          </Text>}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: moderateScale(20), 
              marginTop: moderateScale(12),

            }}>
                 <TouchableOpacity
              onPress={()=>{
                setIsSubsVisible(false)
               
             
              }}
              style={{
                // paddingHorizontal: moderateScale(16),
                borderRadius: moderateScale(8),
                backgroundColor: colors.white,
                paddingVertical: moderateScaleVertical(12),
                width:moderateScale(150),
                 justifyContent:"center",
                   alignItems:"center",
                   borderWidth:1,
              }}>
              <Text
                style={{
                  color: colors.black,
                  fontFamily: fontFamily.Poppins_Medium,
                  fontSize:textScale(16),
                  
                }}>
                Cancel
              </Text>
            </TouchableOpacity>
       
            <TouchableOpacity
              onPress={()=>{
                let payload = {coupon_id:couponID}
                refundWallet(payload)
                // setIsSubsVisible(false)
                
             
              }}
              style={{
                // paddingHorizontal: moderateScale(16),
                borderRadius: moderateScale(8),
                backgroundColor: colors.theme,
                paddingVertical: moderateScaleVertical(12),
                width:moderateScale(150),
                 justifyContent:"center",
                   alignItems:"center"
              }}>
              <Text
                style={{
                  color: colors.white,
                  fontFamily: fontFamily.Poppins_Medium,
                  fontSize:textScale(16),
                  
                }}>
               Proceed
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ModalDelete>
    </View>
  );
};

export default MyVoucherGroup;

const styles = StyleSheet.create({
  applyButton: {
    backgroundColor: colors.themeDark,
    color: colors.white,
    borderRadius: moderateScale(12),
    padding: moderateScale(12),
    justifyContent: 'center',
    height: moderateScaleVertical(58),
    width: '100%',
  },
  applyText: {
    fontFamily: fontFamily.Poppins_Bold,
    color: colors.white,
    fontSize: textScale(14),
    textAlign: 'center',
  },
});
