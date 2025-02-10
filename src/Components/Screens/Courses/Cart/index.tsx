import {
  ParamListBase,
  RouteProp,
  useFocusEffect,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import * as Progress from 'react-native-progress';
import SwitchIcon from 'react-native-vector-icons/Fontisto';
import PigIcon from 'react-native-vector-icons/FontAwesome6';
import {useDispatch, useSelector} from 'react-redux';
import RNSecureStorage from 'rn-secure-storage';
import imagePath from '../../../../constants/imagePath';
import {mainStrings} from '../../../../constants/mainstrings';
import navigationStrings from '../../../../constants/navigationStrings';
import useGetData from '../../../../hooks/useGetData';
import usePostData from '../../../../hooks/usePostData';
import {
  CouponApplied,
  IsAddedCartData,
} from '../../../../redux/slice/cartSlice';
import {couponCodeData} from '../../../../redux/slice/couponSlice';
import colors from '../../../../styles/colors';
import ToggleOff from '../../../../assets/images/Icons/toggleOff.svg';
import ToggleOn from '../../../../assets/images/Icons/toggleOn.svg';
import fontFamily from '../../../../styles/fontFamily';
import CrossIcon from 'react-native-vector-icons/Entypo';

import {
  height,
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../styles/responsiveSize';
import {endpoints} from '../../../../utils/endpoints';
import {showError, showSuccess} from '../../../../utils/helperFunctions';
import ErrorBox from '../../../ErrorBox';
import BlueLabelButton from '../../../Layout/Button/BlueLabelButton';
import GroupCardLight from '../../../Layout/Card/GroupCardLight';
import ModalCard from '../../../Layout/Card/ModalCard';
import WrapperContainer from '../../../WrapperContainer';
import CartCourseDetail, {cartCourseType} from './CartCourseDetail';
import PaymentStructure from './PaymentStructure';
import HeaderCard from '../../../Layout/Card/HeaderCard';
import CommonButton from '../../../CommonButton';
import Clipboard from '@react-native-clipboard/clipboard';
import ModalDelete from '../../../Layout/Card/ModalDelete';
import TooltipIcon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {default as WarningIcon} from 'react-native-vector-icons/FontAwesome';
import DeviceInfo from 'react-native-device-info';
import CourseLoader from '../../../Loader/CourseLoader';
import CourseBoxLoader from '../../../Loader/CourseBoxLoader';
import SimpleBoxLoader from '../../../Loader/InstructorLoader';
import {useKeyboard} from '../../../../hooks/useKeyboard';
import CustomTextInput from '../../../CustomTextInput';

function Cart() {
  const addedCartData = useSelector((state: any) => state.cart.addedCartData);
  const congratsModal = useSelector((state: any) => state.cart.couponApplied);
  const {params}: RouteProp<{params: paramsType}> = useRoute();
  const [loading, setLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(true);
  const [disPrice, setDisPrice] = useState(0);
  const [newCode, setNewCode] = useState('');
  const [refreshing, setIsRefreshing] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const dispatch = useDispatch();

  const isTablet = DeviceInfo?.isTablet();

  const [cartCoursePayload, setCartCoursePayload] = useState<
    cartCourseType | []
  >([]);

  console.log(
    'cartCoursePayloadcartCoursePayloadcartCoursePayloadcartCoursePayloadcartCoursePayload',
    cartCoursePayload,
  );

  const [tagDelete, setTagDelete] = useState<Array<string>>([]);
  const [selectedType, setSelectedType] = useState('Full');

  const toggleCode = () => {
    // const characters =
    //   'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const characters = '0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    setNewCode(result);
  };
  const toggleTooltip = () => {
    setTooltipVisible(!tooltipVisible);
  };

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const userData = useSelector((state: any) => state?.auth?.userPayload);
  const cartCall = useSelector((state: any) => state.apiCall.cartCall);
  const isFocused = useIsFocused();
  const [code, setCode] = React.useState('');

  const [price, setPrice] = useState({
    totalPrice: '',
    subTotalPrice: '',
    discountPrice: '',
  });

  const [errorCoupon, setErrorCoupon] = useState('');

  const [toggle, setToggle] = useState(false);
  const [newModal, setNewModal] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);

  type paramsType = {
    CourseId: number;
    backCode: string;
    courseType: string;
    fromCart: boolean;
    couponID: string;
  };
  const {status: cartTypeStatus, data: cartTypeData}: any = useGetData(
    `${endpoints.CHECK_CART_STATUS}`,
    ['CHECK_CART_STATUS'],
  );

  useEffect(() => {
    if (cartTypeData?.data) {
      setSelectedType(cartTypeData.data);
    }
  }, [cartTypeStatus, cartTypeData]);

  const {
    data: getData,
    refetch: getDataAgain,
    isRefetching,
    status: getDataStatus,
    error: carterror,
  } = useGetData(`${endpoints.GET_CART}?order_type=${selectedType}`, [
    'GET_CART',
    ...tagDelete,
    cartCall,
    isFocused,
    selectedType,
    cartTypeData,
  ]);

  console.log(
    'carterrorcarterrorcarterrorcarterrorcarterrorcarterrorcarterror',
    carterror,
  );

  const {
    mutate: deleteFromCart,
    isSuccess: cartDeleteSuccess,
    error: cartDeleteError,
  } = usePostData(endpoints.REMOVE_FROM_CART, ['REMOVE_CART']);

  const codeDetail = useSelector((state: any) => state?.coupon?.codeDetail);

  const {status: couponStatus, data: couponData}: any = useGetData(
    `${endpoints.COUPONS_DETAIL}/${params?.couponID}`,
    ['COUPONS_DETAIL', cartCall, isFocused],
  );

  const {status: addCouponStatus, mutate: addCoupon} = usePostData(
    `${endpoints.STUDENT_COUPONS}`,
    ['STUDENT_COUPONS', cartCall],
  );

  console.log(
    'getDatagetDatagetDatagetDatagetDatagetDatagetDatagetData',
    couponData,
  );

  const {mutate: cartUpgrade, status: cartUpgradeStatus} = usePostData(
    endpoints.CART_UPGRADE as never,
    ['CART_UPGRADE'],
    'post',
    data => {
      console.log(
        'CART_UPGRADECART_UPGRADECART_UPGRADECART_UPGRADECART_UPGRADE',
      );

      // navigation.navigate(navigationStrings.PaymentStructure, {
      //   orderType: finalGetData?.data?.order_type,
      //   subTotalPrice: finalGetData?.data?.order_price,
      //   totalPrice: +finalGetData?.data?.order_total - Number(disPrice),
      //   discountPrice: finalGetData?.data?.order_total_discount || disPrice,
      //   cartId: finalGetData?.data?.id,
      //   walletContained: toggle ? 1 : 0,
      // });
    },
    error => {
      console.log('errorerrorerrorerrorerrorerrorerror', error);
    },
  );

  const finalGetData: any = getData;

  console.log('cartUpgradeStatuscartUpgradeStatuscartUpgradeStatus', cartCall);

  const [segementData, setSegmentData] = useState({
    discountAmount: 0,
    segementId: null,
  });
  const [memberCount, setMemberCount] = useState(2);

  const {status, data, refetch}: any = useGetData(
    `${endpoints.SEGEMENT_COUPON}?segment=${memberCount}`,
    ['segement', memberCount, cartCall, isFocused],
  );
  const {data: walletBalance}: any = useGetData(endpoints.WALLET, ['WALLET']);
  const keyboardHeight = useKeyboard();

  const {
    status: groupCouponStatus,
    data: groupCouponData,
    refetch: refetchCoupon,
  }: any = useGetData(`${endpoints.GET_GROUP_COUPONS}`, [
    'getcoupons',
    cartCall,
    isFocused,
  ]);
  console.log(
    'groupCouponDatagroupCouponDatagroupCouponDatagroupCouponDatagroupCouponData',
    groupCouponData,
  );

  const {
    mutate: addGroupMember,
    status: addGroupStatus,
    error,
  } = usePostData(endpoints.ADD_GROUP, ['ADD_GROUP']);
  const {
    mutate: isValid,
    status: isValidStatus,
    error: couponError,
  } = usePostData(
    endpoints.APPLY_COUPON as never,
    ['APPLY_COUPON'],
    'post',
    () => {
      // Alert.alert('Coupon applied',"Coupon Applied SuccessFully", [

      //   {
      //     text: 'OK', // Text for confirm button
      //     onPress: () => console.log('OK Pressed'),
      //   },
      // ],)
      dispatch(CouponApplied({couponApplied: true}));
      getDataAgain();
    },
    error => {
      console.log(
        'couponErrorcouponErrorcouponErrorcouponError',
        error,
        couponError,
      );

      // Alert.alert(JSON.stringify(couponError));
      // Alert.alert('Coupon Not applied', error?.message, [
      //   {
      //     text: 'OK', // Text for confirm button
      //     onPress: () => console.log('OK Pressed'),
      //   },
      // ]);
      setErrorCoupon(error?.message);
    },
  );

  const {mutate: removeCoupon} = usePostData(
    `${endpoints.REMOVE_COUPON}`,
    ['DELETE_LESSONS'],
    'post',
    (data: any) => {
      // showSuccess('Lesson deleted successfully');
      refetch();
      getDataAgain();
    },
    (error: any) => {
      // showSuccess('Error while deleting the Lesson');
      refetch();
      getDataAgain();
    },
  );

  useEffect(() => {
    if (addGroupStatus === 'success') {
      navigation.navigate(navigationStrings.MyVouchers, {cartScreen: true});
      setIsModalVisible2(false);
    } else if (addGroupStatus === 'error') {
      showSuccess('error while Joining the group');
      setIsModalVisible2(false);
    }
  }, [addGroupStatus]);

  useEffect(() => {
    if (couponStatus === 'success') {
      showSuccess('A New Group Coupon Created');
      dispatch(couponCodeData({codeDetail: couponData?.data?.code}));
    } else if (couponStatus === 'error') {
      // showSuccess('error while fetching coupons');
    }
  }, [couponStatus]);

  useEffect(() => {
    if (congratsModal) {
      setTimeout(() => {
        dispatch(CouponApplied({couponApplied: false}));
      }, 2000);
    }
  }, [congratsModal]);

  useEffect(() => {
    console.log(
      'memberCountmemberCountmemberCountmemberCountmemberCountmemberCount',
      data?.data[0],
    );

    if (memberCount >= 2 && status === 'success') {
      if (data?.data[0]?.id) {
        setSegmentData({
          ...segementData,
          segementId: data?.data[0]?.id,
          discountAmount: data?.data[0]?.discount,
        });
      }
    }
  }, [memberCount]);

  useEffect(() => {
    refetch();
  }, [memberCount]);

  useEffect(() => {
    if (cartDeleteSuccess) {
      showSuccess('Course removed from cart successfully');
      setTagDelete([...tagDelete, `tag${Math.random() * 100}`]);
    } else if (cartDeleteError) {
      showError(cartDeleteError?.message);
    }
  }, [cartDeleteSuccess, cartDeleteError]);

  useEffect(() => {
    if (addCouponStatus === 'success') {
      showSuccess('A New Group Coupon Created');
      let payload = {
        user_id: userData?.id,
        coupon_code: `BRIGHT${newCode}`,
        is_owner: 1,
        order_id: finalGetData?.data?.id,
      };

      addGroupMember(payload);
      toggleModal();
      // navigation.navigate(navigationStrings.MyVouchers, {cartScreen: true});
    } else if (addCouponStatus === 'error') {
      // showSuccess('error while fetching coupons');
      toggleModal();
    }
  }, [addCouponStatus]);

  useEffect(() => {
    if (addedCartData?.length > 0) {
      let totalPrice: number = 0;
      addedCartData.forEach((item: any) => {
        item?.cartData?.forEach((item: any) => {
          totalPrice = +item.price + totalPrice;
        });
      });
      setPrice({
        ...price,
        totalPrice: totalPrice + '',
        discountPrice: '0.00',
        subTotalPrice: totalPrice + '',
      });
    }
  }, [addedCartData]);

  useEffect(() => {
    // we will get the cart from async storage if it is not present within the redux
    if (addedCartData?.length === 0) {
      (async () => {
        try {
          const cartData: any = await RNSecureStorage.getItem('cartData');
          if (JSON.parse(cartData)?.length > 0) {
            // this here we will reset the value in redux
            dispatch(IsAddedCartData({addedCartData: JSON.parse(cartData)}));
            setLoading(false);
          } else {
            setLoading(false);
          }
        } catch (error) {
          setLoading(false);
        }
      })();
    } else {
      setLoading(false);
    }
  }, [addedCartData]);

  useEffect(() => {
    toggleCode();
  }, [memberCount, isFocused]);

  // useEffect(() => {
  //   if (finalGetData?.data?.coupon_id) {
  //     // Alert.alert('Congratulations',"Coupon Applied SuccessFully", [

  //     //   {
  //     //     text: 'OK', // Text for confirm button
  //     //     onPress: () => console.log('OK Pressed'),
  //     //   },
  //     // ],)

  //     setCongratsModal(true);
  //   }
  // }, [finalGetData?.data?.coupon_id]);

  useEffect(() => {
    console.log(
      'finalGetData?.datafinalGetData?.datafinalGetData?.datafinalGetData?.data',
      finalGetData?.data,
    );

    const upgradeMap = finalGetData?.data?.courses?.map((item: any) => {
      console.log(
        'finalGetDatafinalGetDatafinalGetDatafinalGetDatafinalGetData',
        item,
      );

      let payload = {
        cart_id: finalGetData?.data?.id,
        course_id: item?.id,
        add_ons: [],
        course_type: item?.course_type,
      };
      return payload;
    });
    setCartCoursePayload(upgradeMap);
  }, [finalGetData]);
  // we are handling the value of the filter when we will delete it from the cart
  const handleDelete = async (id: any) => {
    let payload = {
      course_id: id,
    };
    removeCoupon({});
    cartUpgrade(cartCoursePayload);
    deleteFromCart(payload);
  };

  const addPayment = log => {
    console.log('asdasdasdasdasd', log);
  };

  const handleCreateCoupon = () => {
    if (groupCouponData?.data?.length > 0) {
      setIsModalVisible(true);
      return;
    }
    let payload = {
      code: `BRIGHT${newCode}`,
      type: 1,
      // discount_amount: segementData?.discountAmount,
      discount_amount: data?.data[0]?.amount,
      segment_id: data?.data[0]?.id,
      max_members: memberCount,
      discount_type: '1',
    };

    if (payload?.segment_id) {
      addCoupon(payload);
    }
  };

  // const handleJoinGroup = () => {

  //   // navigation.navigate(navigationStrings.MyVouchers, {joinGroup: true});
  // };
  const handleJoinGroup = () => {
    let payload = {
      user_id: userData?.id,
      coupon_code: code,
      is_owner: 0,
    };

    addGroupMember(payload);
  };
  const toggleModal = () => {
    setIsModalVisible(false);
  };
  const toggleCongratsModal = () => {
    dispatch(CouponApplied({couponApplied: false}));
  };

  const handleCheckCode = async () => {
    console.log('ddsfppdsfipsdofpsdfidsfpsdofpsdfip', codeDetail);
    const text = await Clipboard.getString();
    // return;
    if (text) {
      isValid({coupon_code: text});
    } else {
      isValid({coupon_code: codeDetail});
    }
  };

  console.log(
    'cartCoursePayloadcartCoursePayloadcartCoursePayloadcartCoursePayloadcartCoursePayload',
    cartCoursePayload,
  );

  const handleClearCart = () => {
    let payload = {
      clear_cart: true,
    };
    deleteFromCart(payload);

    dispatch(
      couponCodeData({
        codeDetail: {
          code: '',
          price: '',
          couponId: '',
        },
      }),
    );
  };

  const handleCheckout = () => {
    console.log('check cehkcccccc', cartCoursePayload);
    // Alert.alert(`${finalGetData?.data?.order_type} asdasdassdasdad`)
    // return;
    navigation.navigate(navigationStrings.PaymentStructure, {
      subTotalPrice: finalGetData?.data?.order_price,
      totalPrice: +finalGetData?.data?.order_total - Number(disPrice),
      discountPrice: finalGetData?.data?.order_total_discount || disPrice,
      cartId: finalGetData?.data?.id,
      walletContained: toggle ? 1 : 0,
      orderType: finalGetData?.data?.order_type,
      courseId: finalGetData?.data?.courses[0]?.id,
    });

    // cartUpgrade(cartCoursePayload);
  };
  console.log('userDatauserDatauserDatauserDatauserData', cartCoursePayload);

  useEffect(() => {
    if (!isRefetching) {
      setIsRefreshing(false);
    }
  }, [isRefetching]);

  const onRefresh = () => {
    getDataAgain();
    refetch();

    setIsRefreshing(true);
  };

  if (
    loading ||
    getDataStatus === 'pending' ||
    groupCouponStatus === 'pending'
  ) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.white,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{position: 'absolute', top: 30}}>
          <SimpleBoxLoader />
        </View>

        <View style={{top: 20}}>
          <CourseBoxLoader />
          <CourseBoxLoader />
        </View>
      </View>
    );
  }

  console.log(
    'getDataStatusgetDataStatusgetDataStatusgetDataStatusgetDataStatus',
    finalGetData?.data,
  );

  return (
    <WrapperContainer>
      <HeaderCard
        title={'Cart'}
        right
        rightComponent={() => (
          <TouchableOpacity onPress={handleClearCart}>
            <Text style={{fontSize: textScale(12), color: colors.black}}>
              clear cart
            </Text>
          </TouchableOpacity>
        )}
      />
      <ScrollView
        contentContainerStyle={[{backgroundColor: colors.white}]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {true && (
          <FlatList
            // data={[]}
            data={finalGetData?.data?.courses}
            ListHeaderComponent={() => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    // gap: moderateScale(12),
                    marginVertical: moderateScaleVertical(6),
                    backgroundColor: colors.white,
                    borderWidth: 1,
                    borderColor: colors.theme,
                    borderRadius: moderateScale(10),
                    overflow: 'hidden',
                  }}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: moderateScale(4),
                      padding: moderateScale(12),

                      backgroundColor:
                        selectedType === 'Full' ? colors.theme : 'white',
                    }}
                    // disabled={!(courseDetail?.online_price>0)}
                    onPress={() => {
                      setSelectedType('Full');
                    }}>
                    {selectedType === 'Full' ? (
                      <MaterialCommunityIcons
                        color={colors.white}
                        name="bookshelf"
                        size={moderateScaleVertical(24)}
                      />
                    ) : (
                      <MaterialCommunityIcons
                        color={colors.black}
                        name="bookshelf"
                        size={moderateScaleVertical(24)}
                      />
                    )}
                    <Text
                      style={{
                        fontFamily: fontFamily.Poppins_Medium,
                        color:
                          selectedType === 'Full' ? colors.white : colors.black,
                        fontSize: isTablet ? textScale(11) : textScale(14),
                      }}>
                      Course
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: moderateScale(4),
                      padding: moderateScale(12),
                      opacity: 1,

                      backgroundColor:
                        selectedType === 'Individual' ? colors.theme : 'white',
                    }}
                    onPress={() => {
                      setSelectedType('Individual');
                    }}>
                    {selectedType === 'Individual' ? (
                      <MaterialCommunityIcons
                        color={colors.white}
                        name="book"
                        size={moderateScaleVertical(24)}
                      />
                    ) : (
                      <MaterialCommunityIcons
                        color={colors.black}
                        name="book"
                        size={moderateScaleVertical(24)}
                      />
                    )}
                    <Text
                      style={{
                        fontFamily: fontFamily.Poppins_Medium,
                        color:
                          selectedType === 'Individual'
                            ? colors.white
                            : colors.black,
                        fontSize: isTablet ? textScale(11) : textScale(14),
                      }}>
                      Chapter
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }}
            ListEmptyComponent={() => {
              return (
                <View
                  style={{
                    height: height - 140,
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: moderateScale(18),
                    position: 'relative',
                  }}>
                  <Image
                    style={{
                      width: moderateScale(90),
                      height: moderateScaleVertical(90),
                    }}
                    resizeMode="cover"
                    source={imagePath.cartIll}
                  />
                  <Text
                    style={{
                      fontFamily: fontFamily.Poppins_Medium,
                      color: colors.black,
                      fontSize: textScale(18),
                    }}>
                    Your cart is empty
                  </Text>
                  <Text
                    style={{
                      fontFamily: fontFamily.Poppins_Light,
                      color: colors.black,
                      textAlign: 'center',
                      fontSize: textScale(14),
                    }}>
                    Looks like you have not added anything to you cart yet. Go
                    ahead & explore top categories.
                  </Text>
                  <CommonButton
                    btnText={mainStrings.ContinueShopping}
                    onPressBtn={() =>
                      navigation.navigate(navigationStrings.Courses)
                    }
                    mainViewStyle={{
                      marginHorizontal: moderateScale(0),
                      position: 'absolute',
                      left: '-50%',
                      top: moderateScaleVertical(90),
                    }}
                  />
                </View>
              );
            }}
            renderItem={({item}) => (
              <CartCourseDetail
                courseDetail={item}
                handleDelete={() => {
                  handleDelete(item?.id);
                }}
                fullCourse={item?.fullCourse}
                courseId={params?.CourseId}
                setTagDelete={setTagDelete}
                cartCoursePayload={cartCoursePayload as Array<cartCourseType>}
                setCartCoursePayload={setCartCoursePayload}
                orderId={finalGetData?.data?.id}
                getDataAgain={getDataAgain}
                refetchData={refetch}
              />
            )}
          />
        )}
        {finalGetData?.data?.courses?.length > 0 &&
          finalGetData?.data?.order_type === 'Full' && (
            <Text
              style={{
                color: colors.black,
                fontFamily: fontFamily.Poppins_Medium,
                fontSize: textScale(14),
                marginBottom: moderateScale(5),
                alignItems: 'center',
              }}>
              {params?.fromCart ? 'Apply Coupon ' : ''}
              {/* {<Text onPress={toggleTooltip}><TooltipIcon size={textScale(18)} color={colors.theme} name='questioncircleo'/> </Text>} */}
            </Text>
          )}
        {finalGetData?.data?.courses?.length > 0 &&
          finalGetData?.data?.order_type === 'Full' && (
            <GroupCardLight
              type="Group Coupon"
              cartCoupon
              viewBtn={groupCouponData?.data?.length > 0}
              createButtonChange={handleCreateCoupon}
              joinGroupButton={() => {
                setIsModalVisible2(!isModalVisible2);
              }}
              newCode={newCode}
              toggleCode={toggleCode}
              memberCount={memberCount}
              setMemberCount={setMemberCount}
              colorsArr={[colors.boxGreyBlue, colors.boxGreyBlue]}
              price={data?.data[0]?.discount}
              textDescription="Create a group with your friends and become a leader to enjoy a special discount"
            />
          )}

        {/* {finalGetData?.data?.courses?.length > 0 && finalGetData?.data?.coupon_id && (
          <GroupCardLight
            type="Course Discount"
            detailScreen
            courses={finalGetData?.data?.couponDetail?.courses_count || 0}
            cartDiscount
            discountType={finalGetData?.data?.couponDetail?.discount_type==2?"percentage":"price"}
            // couponCode={data?.data?.code}
            courseDiscountDetail
            price={finalGetData?.data?.couponDetail?.discount_amount || 0}
            // member={4}
            btnLabel={finalGetData?.data?.couponDetail?.code}
            colorsArr={['#FFFDE8', '#FFE501']}
            handleAddToVoucher={() => {
              console.log('');
            }}
            removeCoupon={()=>{

              removeCoupon({})
            }}
            // discountType={}
            // colorsArr={['rgba(9, 78, 133, 0.07)', 'rgba(9, 78, 133, 0.07)']}
            date={couponData?.data?.expiry_date}
          />
        )} */}

        {finalGetData?.data?.courses?.length > 0 &&
          finalGetData?.data?.order_type === 'Full' && (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(navigationStrings.AvailableCoupons);
              }}>
              <Text
                style={{
                  fontFamily: fontFamily.Poppins_SemiBold,
                  fontSize: isTablet ? textScale(11) : textScale(14),
                  color: colors.themeDark,
                  textAlign: 'right',
                  marginTop: moderateScale(14),
                }}>
                {mainStrings.ViewAvailableOffers}
              </Text>
            </TouchableOpacity>
          )}

        {finalGetData?.data?.courses?.length > 0 &&
          finalGetData?.data?.order_type === 'Full' && (
            <View
              style={{
                paddingTop: moderateScale(10),
                marginBottom: moderateScaleVertical(10),
              }}>
              <View style={styles.greyContainer}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: moderateScale(10),
                  }}>
                  <TextInput
                    style={styles.inputCode}
                    placeholder={mainStrings.EnterPromoCode}
                    placeholderTextColor={'#00000080'}
                    value={codeDetail}
                    onChangeText={e => {
                      dispatch(couponCodeData({codeDetail: e}));
                    }}
                  />
                  <TouchableOpacity
                    style={styles.applyButton}
                    onPress={() => {
                      handleCheckCode();
                    }}>
                    <Text style={styles.applyText}>Apply</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        <Text
          style={{
            fontFamily: fontFamily.Poppins_Regular,
            color: congratsModal ? colors.green : colors.red,
            fontSize: DeviceInfo.isTablet() ? textScale(10) : textScale(12),
          }}>
          {!!congratsModal ? 'Coupon Applied successfully' : errorCoupon}
        </Text>

        {finalGetData?.data?.courses?.length > 0 && (
          <View>
            <Text
              style={{
                color: colors.black,
                fontFamily: fontFamily.Poppins_Medium,
                fontSize: isTablet ? textScale(12) : textScale(14),
                marginVertical: moderateScale(5),
              }}>
              Use wallet balance
            </Text>
            <View
              style={{
                backgroundColor: colors.boxGreyBlue,
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: moderateScaleVertical(16),
                paddingHorizontal: moderateScale(10),
                borderRadius: moderateScale(16),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: moderateScale(12),
                  flex: 1,
                }}>
                <PigIcon
                  name="piggy-bank"
                  color={colors.theme}
                  size={moderateScaleVertical(32)}
                />
                <View>
                  <Text
                    style={{
                      fontFamily: fontFamily.Poppins_Regular,
                      fontSize: isTablet ? textScale(12) : textScale(14),
                      color: colors.black,
                    }}>
                    Wallet
                  </Text>
                  <Text>
                    <Text
                      style={{
                        fontFamily: fontFamily.Poppins_Light,
                        fontSize: isTablet ? textScale(9) : textScale(14),
                        color: colors.grey1,
                      }}>
                      Balance:{' '}
                    </Text>
                    <Text
                      style={{
                        fontFamily: fontFamily.Poppins_SemiBold,
                        fontSize: isTablet ? textScale(9) : textScale(14),
                        color: colors.theme,
                      }}>
                      {walletBalance?.wallet} KD
                    </Text>
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setToggle(!toggle);
                }}
                style={{marginRight: moderateScale(12)}}>
                <SwitchIcon
                  name={`${!toggle ? 'toggle-off' : 'toggle-on'}`}
                  size={moderateScaleVertical(42)}
                  color={`${!toggle ? colors.grey1 : colors.theme}`}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {finalGetData?.data?.courses?.length > 0 && (
          <View style={{marginTop: moderateScaleVertical(24)}}>
            <PaymentStructure
              handleCheckout={handleCheckout}
              paymentButton
              subTotalPrice={finalGetData?.data?.order_price}
              walletBalance={toggle ? walletBalance?.wallet : 0}
              totalPrice={+finalGetData?.data?.order_total}
              courseId={finalGetData?.data?.courses[0]?.id}
              orderType={finalGetData?.data?.order_type}
              cartId={finalGetData?.data?.id}
              discountPrice={
                finalGetData?.data?.order_total_discount || disPrice
              }
            />
          </View>
        )}
      </ScrollView>
      <ModalCard
        toggleModal={() => {
          setNewModal(!newModal);
        }}
        isCancel
        isModalVisible={newModal}>
        <View style={{alignItems: 'center'}}>
          <FastImage
            style={styles.gifImage}
            source={imagePath.CongratsGif}
            resizeMode={FastImage.resizeMode.contain}
          />
          <Text
            style={{
              fontFamily: fontFamily.Poppins_Medium,
              fontSize: textScale(21),
              color: colors.black,
              marginVertical: moderateScaleVertical(8),
            }}>
            {mainStrings.Congratulations}
          </Text>
          <Text
            style={{
              fontFamily: fontFamily.Poppins_Regular,
              fontSize: textScale(14),
              color: colors.black,
              marginBottom: moderateScaleVertical(12),
            }}>
            {mainStrings.EligibleCoupon}
          </Text>
          <BlueLabelButton
            text="View"
            handleChange={() => {}}
            btnStyle={{
              width: '100%',
              borderRadius: moderateScale(10),
              marginVertical: moderateScale(12),
            }}
            txtStyle={{
              fontFamily: fontFamily.Montserrat_SemiBold,
              color: colors.white,
              fontSize: textScale(14),
              textAlign: 'center',
              marginVertical: moderateScaleVertical(10),
              width: '100%',
            }}
          />
        </View>
      </ModalCard>
      <ModalDelete
        isModalVisible={isModalVisible}
        toggleModal={toggleModal}
        modalContent={{backgroundColor: colors.lightThemeBlue}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: moderateScaleVertical(40),
          }}>
          <WarningIcon
            color={colors.themeYellow}
            size={moderateScale(55)}
            name="warning"
          />
          <Text
            style={{
              fontFamily: fontFamily.Poppins_Medium,
              color: colors.black,
              fontSize: textScale(21),
              textAlign: 'center',
              marginVertical: moderateScaleVertical(11),
            }}>
            Group Creation Restriction
          </Text>
          <Text
            style={{
              fontFamily: fontFamily.Poppins_Regular,
              color: colors.grey1,
              fontSize: textScale(14),
              textAlign: 'center',
            }}>
            You cannot create a new group while you are already in an existing
            one. To create a new group, please leave your current group first.
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: moderateScale(20),
              marginTop: moderateScale(12),
            }}>
            <TouchableOpacity
              onPress={toggleModal}
              style={{
                // paddingHorizontal: moderateScale(16),
                borderRadius: moderateScale(8),
                backgroundColor: '#ECECEC',
                paddingVertical: moderateScaleVertical(12),
                width: moderateScale(150),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: colors.black,
                  fontFamily: fontFamily.Poppins_SemiBold,
                  fontSize: textScale(16),
                }}>
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                let payload = {
                  code: `BRIGHT${newCode}`,
                  type: 1,
                  discount_amount: data?.data[0].amount,
                  segment_id: data?.data[0].id,
                  max_members: memberCount,
                  discount_type: '1',
                };

                if (payload?.segment_id) {
                  addCoupon(payload);
                }
              }}
              style={{
                // paddingHorizontal: moderateScale(16),
                borderRadius: moderateScale(8),
                backgroundColor: colors.theme,
                paddingVertical: moderateScaleVertical(12),
                width: moderateScale(150),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: colors.white,
                  fontFamily: fontFamily.Poppins_SemiBold,
                  fontSize: textScale(16),
                }}>
                Procedd
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ModalDelete>
      <ModalCard
        isModalVisible={tooltipVisible}
        toggleModal={toggleTooltip}
        isCancel>
        {/* <View style={{alignItems:"flex-end",marginBottom:moderateScale(13)}}>
            <TouchableOpacity onPress={toggleTooltip}>
            <CrossIcon size={textScale(24)} color={colors.black} name='cross'/>
          </TouchableOpacity>
        </View> */}
        <Text style={[styles.tooltipText]}>{mainStrings.applyTooltip}</Text>
      </ModalCard>
      <ModalCard
        isModalVisible={congratsModal}
        toggleModal={toggleCongratsModal}
        modalView={{justifyContent: 'center'}}
        modalContent={{
          margin: moderateScaleVertical(20),
          borderRadius: moderateScale(20),
        }}>
        {/* <View style={{alignItems:"flex-end",marginBottom:moderateScale(13)}}>
            <TouchableOpacity onPress={toggleTooltip}>
            <CrossIcon size={textScale(24)} color={colors.black} name='cross'/>
          </TouchableOpacity>
        </View> */}
        <View
          style={{justifyContent: 'center', alignItems: 'center', padding: 20}}>
          <Image source={imagePath.congratsIcon} resizeMode="contain" />
          <Text style={styles.congratsText}>Congratulations!</Text>
          <Text style={styles.congratsTextDescription}>
            You're eligible for the discount
          </Text>
        </View>
      </ModalCard>
      <ModalCard
        isModalVisible={isModalVisible2}
        isCancel
        toggleModal={() => {
          setIsModalVisible2(!isModalVisible2);
        }}>
        <View
          style={{marginBottom: Platform.OS === 'ios' ? keyboardHeight : 0}}>
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
    </WrapperContainer>
  );
}

export default Cart;

const styles = StyleSheet.create({
  greyContainer: {
    backgroundColor: colors.boxGreyBlue,
    padding: moderateScale(20),
    borderRadius: moderateScale(18),
  },
  tooltipText: {
    fontFamily: fontFamily.Poppins_Regular,
    color: colors.black,
    fontSize: textScale(14),
    paddingBottom: moderateScaleVertical(12),
  },
  inputCode: {
    backgroundColor: colors.white,
    color: colors.black,
    flex: 0.85,
    borderRadius: moderateScale(12),
    paddingVertical: moderateScaleVertical(12),
    paddingHorizontal: moderateScale(10),
    fontSize: DeviceInfo.isTablet() ? textScale(11) : textScale(14),
    fontFamily: fontFamily.Poppins_Medium,
  },
  applyButton: {
    backgroundColor: colors.theme,
    color: colors.white,
    borderRadius: moderateScale(80),
    padding: moderateScale(12),
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.25,
  },
  applyText: {
    fontFamily: fontFamily.Poppins_Bold,
    color: colors.white,
    fontSize: DeviceInfo.isTablet() ? textScale(9) : textScale(12),
  },
  gifImage: {
    width: moderateScale(200),
    height: moderateScaleVertical(200),
  },
  congratsText: {
    color: colors.black,
    fontFamily: fontFamily.Poppins_Medium,
    fontSize: DeviceInfo.isTablet() ? textScale(16) : textScale(21),
  },
  congratsTextDescription: {
    color: colors.black,
    fontFamily: fontFamily.Poppins_Regular,
    textAlign: 'center',
    fontSize: DeviceInfo.isTablet() ? textScale(11) : textScale(14),
  },
});
