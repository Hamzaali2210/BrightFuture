import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Linking,
  Platform,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native';
import FastImage from 'react-native-fast-image';
import CheckIcon from 'react-native-vector-icons/AntDesign';
import CopyIcon from 'react-native-vector-icons/Feather';
import { default as GroupIcon, default as TrashIcon, default as WarningIcon,default as WhatsappIcon } from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import MinusSmall from '../../../assets/images/Icons/minusSmall.svg';
import PlusSmall from '../../../assets/images/Icons/plusSmall.svg';
import useGetData from '../../../hooks/useGetData';
import usePostData from '../../../hooks/usePostData';
import colors from '../../../styles/colors';
import fontFamily from '../../../styles/fontFamily';
import GrIcon from 'react-native-vector-icons/Ionicons';
import ShareMat from 'react-native-vector-icons/MaterialCommunityIcons'

import {
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from '../../../styles/responsiveSize';
import { endpoints } from '../../../utils/endpoints';
import { showError, showSuccess } from '../../../utils/helperFunctions';
import BlueLabelButton from '../Button/BlueLabelButton';
import ModalDelete from './ModalDelete';
import ModalCard from './ModalCard';
import imagePath from '../../../constants/imagePath';
import { IMAGE_API_URL } from '../../../utils/urls';

interface GroupCardLightProps {
  colorsArr?: Array<string>;
  price: number;
  type: 'Group Coupon' | 'Course Discount' | 'Voucher' | 'Special Discount';
  btnLabel?: string;
  date: string;
  member?: number;
  courses?: number;
  extend: boolean;
  couponCode?: string;
  enterCode?: boolean;
  discountType: 'percentage' | 'price';
  createButtonChange?: () => void;
  handleCopyCode?: () => void;
  handleCourseCopyCode?: () => void;
  handleShare?: () => void;
  handleTapToApply?: () => void;
  courseDiscountDetail?: boolean;
  dateInfo?: {
    daysCompleted: number;
    daysTotal: number;
    daysPending: number;
  };
  tapToApply?: boolean;
  cardStyle?: ViewStyle;
  memberList: Array<any>;
  isAdded: boolean;
  isOwner?: boolean;
  handleGroupChange: () => void;
  handleAddToVoucher?: () => void;
  voucherScreen?: boolean;
  editable?: boolean;
  isJoined?: boolean;
  refetchGroupCoupon?: () => void;
  handleDeleteVoucher?: () => void;
  couponId?: number;
  pivot?: any;
  isPaidOwner?:boolean;
  setCouponID?:any;
  handleRefund:()=>void;

  customGroupCoupon?: boolean;
}

const GroupCardCreate: React.FC<GroupCardLightProps> = ({
  price = 5,
  isPaidOwner,
  handleRefund,
  setCouponID,
  btnLabel = 'Create a Group',
  date = '2024-03-04',
  member,
  courses = 3,
  isJoined,
  enterCode = false,
  colorsArr = ['#ebf1f5', '#ebf1f5'],
  type = 'Group Coupon',
  couponCode,
  cardStyle,
  couponId,
  pivot,
  createButtonChange,
  discountType = 'price',
  handleAddToVoucher,
  refetchGroupCoupon,
  memberList,
  dateInfo,
  handleCopyCode,
  handleGroupChange,
  voucherScreen,
  handleShare,
  editable,
  isOwner,
  handleDeleteVoucher,
  customGroupCoupon,
}) => {

  const [createText, setCreateText] = useState<string>(
    couponCode?.substring(6) as string,
  );
  const [memberCount, setMemberCount] = useState(member);
  const [deleteCouponId,setDeleteCouponId]=useState<number|null>(null);
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
  const [memberId, setMemberId] = useState({
    couponId: 0,
    userId: 0,
  });

  useEffect(()=>{
    setCouponID(couponId)
  },[])

  const [currentUser,setCurrentUser]=useState(0)

  const [segementData, setSegmentData] = useState({
    discountAmount: 0,
    segementId: null,
  });
  const {status, data}: any = useGetData(
    `${endpoints.SEGEMENT_COUPON}?segment=${memberCount}`,
    ['segement', memberCount],
  );



  const userData = useSelector((state: any) => state?.auth?.userPayload);

  const {
    status: addCouponStatus,
    mutate: addCoupon,
    data: addCouponData,
    error,
  } = usePostData(`${endpoints.STUDENT_COUPONS}`, ['STUDENT_COUPONS']);

  const {
    status: deleteCouponStatus,
    mutate: deleteCoupon,
    data: deleteCouponData,
  } = usePostData(
    `${endpoints.DELETE_GROUP_COUPONS_MEMBER}`,
    ['STUDENT_COUPONS'],
    'delete',
  );



  useEffect(() => {
    if (addCouponStatus === 'success') {
      showSuccess('Coupon added Successfully');
      refetchGroupCoupon && refetchGroupCoupon();
    } else if (addCouponStatus === 'error') {
      refetchGroupCoupon && refetchGroupCoupon();
      showError(error?.error?.message || 'Error while fetching coupons');
    }
  }, [addCouponStatus]);

  useEffect(() => {
    if (deleteCouponStatus === 'success') {
      refetchGroupCoupon && refetchGroupCoupon();
      showSuccess('Member Deleted Successfully');
    } else if (deleteCouponStatus === 'error') {
      refetchGroupCoupon && refetchGroupCoupon();
      showError('Error while deleting the coupon');
    }
  }, [deleteCouponStatus]);

  useEffect(() => {
    if (memberCount >= 2 && status === 'success') {
      if (data?.data[0]?.id) {
        setSegmentData({
          ...segementData,
          segementId: data?.data[0]?.id,
          discountAmount: data?.data[0]?.discount,
        });
      }
    }
  }, [status]);

  useEffect(() => {

    if (memberId?.couponId && memberId?.userId) {
      console.log("you you you you you", memberId);

      deleteCoupon({id: `${memberId?.couponId}/${memberId?.userId}`});
    }
  }, [memberId]);

  const handleCreateCoupon = () => {
    if (!createText) {
      showError('please Type your code');
      return;
    }
    let payload = {
      code: `BRIGHT${createText}`,
      type: 1,
      discount_amount: segementData?.discountAmount,
      segment_id: segementData?.segementId,
      max_members: memberCount,
      discount_type: '1',
    };
    console.log('paylaod hai payload', payload);

    if (payload?.segment_id && createText) {
      addCoupon(payload);
    }
  };

  const handleDeleteMember = (item:any) => {



    // console.log('there iasdasdasdasdasdasdas', id);
    // setDeleteCouponId(couponId)
    setIsModalDeleteVisible(!isModalDeleteVisible);
    setCurrentUser(item?.id);
    // setMemberId({...memberId,couponId:couponId,userId:item?.id})


  };


  const handleShareWhatsApp = async (item:any)=>{
    let phoneWithCountryCode = item?.country_code+item?.mobile;
    // let mobile =Platform.OS == "ios" ? phoneWithCountryCode : "+" + phoneWithCountryCode;
    let mobile = Platform.OS == "ios" ? phoneWithCountryCode : phoneWithCountryCode;
    const whatsappUrl = `whatsapp://send?text=Check Coupon&phone=${mobile}`;

    try {
      const canOpen = await Linking.canOpenURL(whatsappUrl);
      if (canOpen) {
        await Linking.openURL(whatsappUrl);
      }
    } catch (error) {
      showError('Error While opening Whatsapp');
      console.error("Error opening WhatsApp:", error);
    }
  }

  console.log(
    'memberListmemberListmemberListmemberListmemberListmemberListmemberList',
    memberList,
  );
    // <LinearGradient
    //   colors={colorsArr}
    //   style={[styles.cardLinearContainer, cardStyle]}
    //   useAngle
    //   angle={270}>

  return (

    <View
      style={[styles.cardLinearContainer, cardStyle]}
      // useAngle
      // angle={270}
    >
      <View style={[styles.cardBlueContainer]}>
        {true ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              position: 'absolute',
              top: moderateScale(10),
              gap: moderateScale(10),
              right: moderateScale(18),
              zIndex: 1,
            }}>
            {!!isOwner  && (
              <View style={[styles.binContainer]}>
                <TouchableOpacity onPress={handleDeleteVoucher}>
                  {/* <RecycleBin width={25} height={25} /> */}
                  <TrashIcon
                    size={moderateScale(25)}
                    color={colors.red}
                    name="trash-o"
                  />
                </TouchableOpacity>
              </View>
            )}


          </View>
        ) : (
          <></>
        )}

        <View style={[styles.leftContainer]}>
          <View style={[styles.roundContainer]}>


            <GrIcon
              name={'people'}
              color={colors.white}
              size={moderateScale(24)}
            />
          </View>
          <Text
            style={[
              {
                fontFamily: fontFamily.Poppins_Regular,
                fontSize: textScale(20),
                color: colors.theme,
                marginBottom: moderateScaleVertical(-10),
              },
            ]}>
            {segementData?.discountAmount}{' '}
            {discountType == 'price' ? 'KD' : '%'}
          </Text>
          <Text
            style={[
              {
                fontFamily: fontFamily.Poppins_SemiBold,
                fontSize: textScale(22),
                color: colors.theme,
              },
            ]}>
            OFF
          </Text>
        </View>
        <Image source={imagePath.verticalLine} resizeMode="contain" />
        <View style={[styles.rightContiner]}>
          <View>
            {
              <Text
                style={[
                  styles.memberText,
                  {fontSize: voucherScreen ? textScale(20) : 14},
                ]}>
                {isOwner ? memberCount : member} Members
              </Text>
            }
            {/* <Text style={[styles.headingText]}>
              {segementData?.discountAmount} {discountType == 'price' ? 'KD' : '%'} Off
            </Text> */}
            {true && (
              <Text style={[styles.validityText,{marginTop:moderateScaleVertical(8)}]}>
                {/* Use this coupon code to enjoy a special discount. */}
                Share the code with the friends to join the group.
              </Text>
            )}
          </View>

          {!!isOwner && !voucherScreen  ? (

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: moderateScale(4),
                marginTop: moderateScale(3),
              }}>
              <View
                style={{
                  width: moderateScale(100),
                  backgroundColor: '#F9F9F9',
                  borderRadius: moderateScale(120),
                  // height: moderateScaleVertical(40),
                  borderWidth: 1,
                  borderColor: '#EAEAEA',
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: moderateScale(4),
                  gap: moderateScale(4),
                  // paddingHorizontal:moderateScale(12),

                  justifyContent: 'space-evenly',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    if (memberCount >= 2) {
                      setMemberCount(prev => {
                        if (prev > 2) {
                          return prev - 1;
                        }
                        return prev;
                      });
                    }
                  }}
                  style={{
                    width: moderateScale(30),
                    height: moderateScale(30),
                    backgroundColor: colors.white,
                    borderWidth: 0.5,
                    borderColor: '#EAEAEA',
                    justifyContent: 'center',
                    alignContent: 'center',
                    borderRadius: moderateScale(120),
                  }}>
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <MinusSmall />
                  </View>
                </TouchableOpacity>
                <Text
                  style={{
                    fontFamily: fontFamily.Poppins_Bold,
                    fontSize: moderateScale(14),
                    color: colors.black,
                  }}>
                  {memberCount}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setMemberCount(prev => {
                      if (prev < 12) {
                        return prev + 1;
                      }
                      return prev;
                    });
                  }}
                  style={{
                    width: moderateScale(30),
                    height: moderateScale(30),
                    backgroundColor: colors.white,
                    borderWidth: 0.5,
                    borderColor: '#EAEAEA',
                    justifyContent: 'center',
                    alignContent: 'center',
                    borderRadius: moderateScale(120),
                  }}>
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <PlusSmall />
                  </View>
                </TouchableOpacity>
              </View>
              <BlueLabelButton
                handleChange={() => {
                  handleCopyCode && handleCopyCode();
                }}
                text={couponCode}
                btnStyle={{
                  backgroundColor: colors.themeYellow,
                  justifyContent: 'center',
                  alignItems: 'center',
                  // width: '70%',
                  // marginTop: moderateScaleVertical(8),
                }}
                txtStyle={{
                  fontFamily: fontFamily.Poppins_Medium,
                  color: colors.black,
                  fontSize: textScale(14),
                }}
              />
            </View>
          ) : (
            true && (
              <View
                style={{
                  marginTop: moderateScale(20),
                  marginBottom: moderateScale(10),
                  flexDirection: 'row',
                  gap: moderateScale(6),
                  height: moderateScale(40),
                }}>

                   {memberList?.length !== member || memberList.filter((item)=>item?.pivot?.is_paid===0)?.length!==memberList?.length  || true ?(
                    <BlueLabelButton
                      handleChange={() => {
                        handleCopyCode && handleCopyCode();
                      }}
                      text={couponCode}
                      btnStyle={{
                        backgroundColor: colors.white,
                        justifyContent: 'center',
                        alignItems: 'center',

                        // width: '50%',
                        // marginTop: moderateScaleVertical(8),
                      }}
                      iconBlue={
                        <CopyIcon
                          name="copy"
                          color={colors.theme}
                          size={moderateScale(18)}
                        />
                      }
                      txtStyle={{
                        fontFamily: fontFamily.Poppins_Medium,
                        color: colors.red,
                        fontSize: textScale(14),
                      }}
                    />
                  ):<></>}

                {memberList?.length !== member   && (
                  <View
                    // onPress={handleAddToVoucher}
                    style={{
                      // backgroundColor: colors.theme,
                      // backgroundColor: colors.grey1,

                      borderRadius: moderateScale(200),
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 1,
                      // gap: moderateScale(10),
                    }}>
                    <BlueLabelButton
                      handleChange={() => {
                        handleShare && handleShare();
                      }}
                      btnStyle={{
                      backgroundColor:colors.theme
                        // backgroundColor:"#f3f6f9"
                      }}
                      txtStyle={{
                        color:"white",
                        marginLeft:moderateScale(-6)
                      }}

                      text={'Share'}
                      icon={
                        <ShareMat name='share-outline' color={`white`} size={moderateScale(18)}/>
                        // <GroupIcon
                        //   name="share-square-o"
                        //   color={colors.white}
                        //   size={moderateScale(12)}
                        // />
                      }
                    />
                  </View>
                )}

                {memberList?.length === member ? (
                  <View
                    // onPress={handleAddToVoucher}
                    style={{
                      backgroundColor: colors.green,

                      borderRadius: moderateScale(200),
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 1,
                    }}>

                    <BlueLabelButton
                      handleChange={() => {
                        handleShare && handleShare();
                      }}
                      btnStyle={{backgroundColor: '#25B10E'}}
                      txtStyle={{fontSize: textScale(14)}}
                      text={'Active'}
                    />
                  </View>
                ):null}
              </View>
            )
          )}
          {!!voucherScreen && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: moderateScale(10),
                marginVertical: moderateScale(6),
              }}>
              <View>
                <Text
                  style={{
                    fontFamily: fontFamily.Poppins_SemiBold,
                    color: colors.black,
                    fontSize: textScale(12),
                  }}>
                  {memberList?.length}/{member}
                </Text>
              </View>
              <View
                style={{
                  borderRadius: moderateScale(10),
                  width: '75%',
                  backgroundColor: '#094E8530',
                  height: 3,
                  overflow: 'hidden',
                }}>
                <View
                  style={{
                    borderRadius: moderateScale(10),
                    width: member && `${(memberList?.length / member) * 100}%`,
                    backgroundColor: colors.theme,
                    height: '100%',
                  }}
                />
              </View>
            </View>
          )}

          {true ? (
            <></>
          ) : // <View
          //   style={{
          //     flexDirection: 'row',
          //     alignItems: 'center',
          //     gap: moderateScale(12),
          //   }}>
          //   {edit || customGroupCoupon ? (
          //     <TextInput
          //       style={{
          //         backgroundColor: colors.themeYellow,
          //         marginTop: moderateScaleVertical(8),
          //         justifyContent: 'center',
          //         alignItems: 'center',
          //         width: '70%',
          //         padding: moderateScale(12),
          //         borderRadius: moderateScale(40),
          //         fontFamily: fontFamily.Poppins_SemiBold,
          //         color: colors.black,
          //       }}
          //       onChangeText={e => setCreateText(e)}
          //       placeholder="BRIGHTXXXXX"
          //       maxLength={5}
          //       placeholderTextColor={'#00000050'}
          //       value={createText}
          //     />
          //   ) : (
          //     <BlueLabelButton
          //       handleChange={() => {
          //         handleCopyCode && handleCopyCode();
          //       }}
          //       text={couponCode}
          //       btnStyle={{
          //         backgroundColor: colors.themeYellow,
          //         marginTop: moderateScaleVertical(8),
          //         justifyContent: 'center',
          //         alignItems: 'center',
          //         width: '70%',
          //       }}
          //       txtStyle={{
          //         fontFamily: fontFamily.Poppins_Medium,
          //         color: colors.black,
          //         fontSize: textScale(16),
          //       }}
          //     />
          //   )}
          //   {/* <BlueLabelButton
          //   handleChange={() => {
          //     handleCopyCode && handleCopyCode();
          //   }}
          //   text={couponCode}
          //   btnStyle={{
          //     backgroundColor: colors.themeYellow,
          //     marginTop: moderateScaleVertical(8),
          //     justifyContent: 'center',
          //     alignItems: 'center',
          //     width: '70%',
          //   }}
          //   txtStyle={{
          //     fontFamily: fontFamily.Poppins_Medium,
          //     color: colors.black,
          //     fontSize: textScale(16),
          //   }}
          // /> */}
          //   {editable && <TouchableOpacity
          //     style={{
          //       width: moderateScale(30),
          //       height: moderateScaleVertical(30),
          //       justifyContent: 'center',
          //       alignItems: 'center',
          //       backgroundColor: colors.theme,
          //       borderRadius: moderateScale(40),
          //     }}
          //     onPress={() => {
          //       if(edit){
          //         handleCreateCoupon()
          //         setEdit(!edit)
          //       }
          //       setEdit(!edit);
          //     }}>

          //     {!edit  ? (
          //       <EditIcon
          //         color={colors.white}
          //         size={moderateScale(20)}
          //         name="pencil"
          //       />
          //     ) : (
          //       <CheckIcon
          //         color={colors.white}
          //         name="check"
          //         size={moderateScale(20)}
          //       />
          //     )}
          //   </TouchableOpacity>}
          // </View>
          null}

          {!voucherScreen && (
            <BlueLabelButton
              handleChange={handleCreateCoupon}
              btnStyle={{
                backgroundColor: colors.theme,
                marginTop: moderateScaleVertical(8),
                justifyContent: 'center',
                alignItems: 'center',
                width: '70%',
              }}
              txtStyle={{
                fontFamily: fontFamily.Poppins_Medium,
                color: colors.white,
                fontSize: textScale(14),
              }}
              text={'Create a Group'}
            />
          )}
          {
            !!voucherScreen && null
            // <BlueLabelButton
            //   handleChange={handleCreateCoupon}
            //   btnStyle={{
            //     backgroundColor: colors.theme,
            //     marginTop: moderateScaleVertical(8),
            //     justifyContent: 'center',
            //     alignItems: 'center',
            //     width: '70%',
            //   }}
            //   txtStyle={{
            //     fontFamily: fontFamily.Poppins_Medium,
            //     color: colors.white,
            //     fontSize: textScale(14),
            //   }}
            //   text={'Update Group Detail'}
            // />
          }
          {/* <View
                style={{
                  alignSelf: 'flex-start',
                  marginTop: verticalScale(10),
                  flexDirection: 'row',
                  gap: moderateScale(10),
                }}>
                {(couponCode && type === 'Group Coupon')  ? (
                  <View
                    style={{
                      alignSelf: 'flex-start',
                      flexDirection: 'row',
                      gap: moderateScale(10),
                    }}>
                    <BlueLabelButton
                      handleChange={() => {
                        handleCopyCode && handleCopyCode();
                      }}
                      text={'Copy code'}
                      icon={
                        <GrIcon
                          name="copy-outline"
                          color={colors.white}
                          size={moderateScale(12)}
                        />
                      }
                    />
                    <BlueLabelButton
                      handleChange={() => {
                        handleShare && handleShare();
                      }}
                      text={'Share'}
                      icon={
                        <GrIcon
                          name="share-social-outline"
                          color={colors.white}
                          size={moderateScale(12)}
                        />
                      }
                    />
                  </View>
                ) : !false ? (
                  <BlueLabelButton
                    handleChange={() => {
                      createButtonChange && createButtonChange();
                    }}
                    text={btnLabel}
                    icon={
                      <GrIcon
                        name={type === 'Special Discount' ? 'copy' : 'people'}
                        color={colors.white}
                        size={moderateScale(16)}
                      />
                    }
                  />
                ) : (
                  <>
                    {
                      <BlueLabelButton
                        handleChange={() =>
                          handleCourseCopyCode && handleCourseCopyCode()
                        }
                        text={btnLabel}
                        icon={
                          <GrIcon
                            name="copy-outline"
                            color={colors.white}
                            size={moderateScale(24)}
                          />
                        }
                        btnStyle={{
                          backgroundColor: colors.theme,
                          marginTop: moderateScaleVertical(8),

                          justifyContent: 'center',
                          alignItems: 'center',
                          width: '90%',
                        }}
                        txtStyle={{
                          fontFamily: fontFamily.Poppins_Medium,
                          color: colors.white,
                          fontSize: textScale(24),
                        }}
                      />
                    }
                  </>
                )}
              </View> */}
        </View>
      </View>

      {type === 'Group Coupon' && !!memberList?.length && (
        // { true && (
        <>
          {/* <View
            style={{
              height: moderateScale(2),
              borderStyle: 'dashed',
              borderWidth: moderateScale(1),
              marginVertical: moderateScaleVertical(10),
              // borderColor:colors.theme,
              borderColor: 'rgba(9, 78, 133, 0.1)',
              marginRight: moderateScale(10),
            }}
          /> */}
            <Image
                  source={imagePath.whiteLine}
                  style={{width: '100%'}}
                  resizeMode="cover"
                />

          <View
            style={[
              styles.groupContainer,
              {paddingHorizontal: moderateScale(16)},
            ]}>
            <FlatList
              data={memberList}
              scrollEnabled={false}
              ListHeaderComponent={()=>{
                return <View style={{position:"relative"}}>
                   {/* <View
            style={{
              height: moderateScale(1),
              borderStyle: 'dashed',
              borderWidth: moderateScale(1),
              marginTop:moderateScale(4),
              position:"absolute",
              width:width,
              // bottom:-8,
              top:moderateScaleVertical(-10),
              left:moderateScale(-40),
              // marginVertical: moderateScaleVertical(10),
            // backgroundColor:"red",
              // borderColor:colors.theme,
              borderColor: 'rgba(9, 78, 133, 0.4)',
              marginRight: moderateScale(10),
            }}
          /> */}
                  {/* <View style={{flexDirection:"row",alignItems:"center"}}>
                  <Text style={{flex:1,textAlign:"center",color:colors.theme,fontFamily:fontFamily.Poppins_SemiBold,fontSize:moderateScale(12)}}>Student Name</Text>
                  <Text style={{flex:1,textAlign:"center",color:colors.theme,fontFamily:fontFamily.Poppins_SemiBold,fontSize:moderateScale(12)}}>Payment Status</Text>

                </View> */}
                {/* <View
            style={{
              height: moderateScale(1),
              borderStyle: 'dashed',
              borderWidth: moderateScale(1),
              marginTop:moderateScale(4),
              position:"absolute",
              width:width,
              bottom:moderateScaleVertical(-8),
              // top:4,
              left:moderateScale(-40),
              // marginVertical: moderateScaleVertical(10),
            // backgroundColor:"red",
              // borderColor:colors.theme,
              borderColor: 'rgba(9, 78, 133, 0.4)',
              marginRight: moderateScale(10),
            }}
          /> */}
                </View>

              }}
              renderItem={({item}) => {
                return (
                  <View style={[styles.memberContainer,{}]}>
                    <View style={[styles.memberContainer, {flex: 1}]}>
                      <View style={styles.imgContainer}>
                        <FastImage
                          source={{
                            priority: 'high',
                            uri: `${IMAGE_API_URL}${item?.avatar}` || item?.avatar,
                          }}
                          resizeMode="cover"
                          style={styles.img}
                        />
                      </View>
                      <View style={styles.txtContainer}>
                        <Text style={styles.memberName}>
                          {item?.first_name}
                          {!!item?.pivot?.is_owner && '(owner)'}
                        </Text>
                        <Text style={styles.memberOccupation}>Student</Text>
                      </View>
                    </View>
                    <TouchableOpacity onPress={()=>handleShareWhatsApp(item)}>
                      <WhatsappIcon size={28} color={colors.theme} name='whatsapp'/>
                    </TouchableOpacity>
                    <View
                      style={{
                        backgroundColor: item?.pivot?.is_paid
                          ? '#08DA4F18'
                          : '#FFB92E18',
                        borderRadius: moderateScale(30),
                        paddingVertical: moderateScaleVertical(6),
                        paddingHorizontal: moderateScale(12),
                      }}>
                      <Text
                        style={{
                          color:
                            item?.pivot?.is_paid === 1
                              ? '#1EC055'
                              : '#FF9E0C',
                          fontSize: textScale(12),
                          fontFamily: fontFamily.Poppins_SemiBold,
                          gap: moderateScale(4),
                          alignItems: 'center',
                        }}>
                        <CheckIcon
                          size={moderateScale(12)}
                          name="checkcircle"
                          color={
                            item?.pivot?.is_paid === 1
                              ? '#1EC055'
                              :'#FF9E0C'
                          }
                        />
                        {item?.pivot?.is_paid === 1 ? ' Paid' : ' Pending'}
                      </Text>
                    </View>

                    {/* {editable && !item?.pivot?.is_paid && (
                        <TouchableOpacity
                          style={{
                            height: moderateScaleVertical(30),
                            width: moderateScale(30),
                            backgroundColor: colors.theme,
                            borderRadius: moderateScale(140),
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                          onPress={() => handleDeleteMember(item)}>
                          <View
                            style={{
                              backgroundColor: colors.white,
                              height: moderateScale(3),
                              width: '50%',
                            }}
                          />
                        </TouchableOpacity>
                      )} */}
                    {/* {!editable && !!+item?.pivot?.is_paid && !item?.pivot?.is_owner && (
                      <TouchableOpacity
                        style={{
                          height: moderateScaleVertical(30),
                          width: moderateScale(30),
                          backgroundColor: colors.theme,
                          borderRadius: moderateScale(140),
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        onPress={() => handleDeleteMember(item)}>
                        <View
                          style={{
                            backgroundColor: colors.white,
                            height: moderateScale(3),
                            width: '50%',
                          }}
                        />
                      </TouchableOpacity>
                    )} */}
                  </View>
                );
              }}

            />
          </View>
        </>
      )}


      {/* {type === 'Group Coupon' && !!extend && ( */}
      {/* <View style={{justifyContent:"center",alignItems:"center"}}>
        { isJoined && !editable &&   <BlueLabelButton
            handleChange={() => handleDeleteMember()}
            text={'Left Group'}
            icon={
              <GrIcon
                name="log-in"
                color={colors.white}
                size={moderateScale(20)}
              />
            }
            btnStyle={{
              backgroundColor: `${colors.red}90`,
              marginTop: moderateScaleVertical(8),
              paddingVertical: moderateScaleVertical(14),

              justifyContent: 'center',
              alignItems: 'center',
              width: '90%',

            }}
            txtStyle={{
              fontFamily: fontFamily.Poppins_Medium,
              color: colors.white,
              fontSize: textScale(12),
            }}
          />}
        </View> */}

      {/* {false && (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <TextInput
            style={styles.input}
            onChangeText={setText}
            value={text}
            placeholder="Enter Code Here"
            placeholderTextColor={colors.black}
          />

          <BlueLabelButton
            handleChange={() => handleGroupChange(text)}
            text={'Join a Group'}
            icon={
              <GrIcon
                name="log-in"
                color={colors.black}
                size={moderateScale(20)}
              />
            }
            btnStyle={{
              backgroundColor: colors.yellow,
              marginTop: moderateScaleVertical(8),
              paddingVertical: moderateScaleVertical(14),

              justifyContent: 'center',
              alignItems: 'center',
              width: '90%',
            }}
            txtStyle={{
              fontFamily: fontFamily.Poppins_Medium,
              color: colors.black,
              fontSize: textScale(12),
            }}
          />
        </View>
      )} */}
      {/* <Text
        style={{
          color: colors.red,
          fontFamily: fontFamily.Poppins_Medium,
          fontSize: textScale(12),
          paddingHorizontal: moderateScale(16),
          marginVertical: moderateScaleVertical(10),
        }}>
        Only {memberList?.length - memberCount} more students needed for the
        coupon to be activated!
      </Text> */}
      {false && (
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>Active</Text>
        </View>
      )}

      {!isPaidOwner ? (
        <BlueLabelButton
          text="Leave a Group"
          handleChange={() => {
            if (userData) {
              handleDeleteMember(userData);
            }

          }}
          txtStyle={{
            fontFamily: fontFamily.Poppins_SemiBold,
            textAlign: 'center',
            fontSize: textScale(16),
            width: '100%',
          }}
          btnStyle={{
            paddingVertical: moderateScaleVertical(12),
            marginHorizontal: moderateScale(16),
          }}
        />
      ): <BlueLabelButton
      text="Add Money to Wallet"
      handleChange={() => {
        if (userData) {
          handleRefund()
        }

      }}
      txtStyle={{
        fontFamily: fontFamily.Poppins_SemiBold,
        textAlign: 'center',
        fontSize: textScale(16),
        width: '100%',
      }}
      btnStyle={{
        paddingVertical: moderateScaleVertical(12),
        marginHorizontal: moderateScale(16),
      }}
    />}
        <ModalDelete
        isModalVisible={isModalDeleteVisible}
        modalView={{justifyContent: 'flex-end', padding: 0}}
        modalContent={{
          borderBottomLeftRadius: moderateScale(20),
          borderBottomRightRadius: moderateScale(20),
          backgroundColor: '#ffefe5',
        }}
        // isModalVisible={true}
        toggleModal={() => {
          setIsModalDeleteVisible(!isModalDeleteVisible);
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: moderateScaleVertical(40),
          }}>
          <WarningIcon
            color={colors.red}
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
            Are you sure ?
          </Text>
          <Text
            style={{
              fontFamily: fontFamily.Poppins_Regular,
              color: colors.black,
              fontSize: textScale(14),
              textAlign: 'center',
            }}>
            Do you really want to delete this group. This process can not be
            undone.
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: moderateScale(20),
              marginTop: moderateScale(12),

            }}>
            <TouchableOpacity
              onPress={() => {
                setIsModalDeleteVisible(!isModalDeleteVisible);
              }}
              style={{
                // paddingHorizontal: moderateScale(16),
                borderRadius: moderateScale(8),
                backgroundColor: colors.grey1,
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
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {

                console.log("coupon id aa rhi hia bhia ",deleteCouponId);


                  if(couponId){
                    setMemberId({
                      userId: currentUser,
                      couponId: couponId,
                    });
                  }




              }}
              style={{
                // paddingHorizontal: moderateScale(16),
                borderRadius: moderateScale(8),
                backgroundColor: colors.red,
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
                Confirm
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ModalDelete>


    </View>
  );
};

export default GroupCardCreate;

const styles = StyleSheet.create({
  input: {
    height: moderateScaleVertical(40),
    margin: moderateScale(12),
    // borderWidth: 1,
    padding: moderateScale(10),
    width: '90%',
    backgroundColor: 'white',
    color: colors.black,
    borderRadius: moderateScale(400),
  },
  labelContainer: {
    position: 'absolute',
    right: 0,
    top: moderateScale(20),
    borderTopLeftRadius: moderateScale(200),
    borderBottomLeftRadius: moderateScale(200),
    padding: moderateScale(8),
    paddingHorizontal: moderateScale(12),
    backgroundColor: colors.green,
  },
  labelText: {
    color: colors.white,
    fontFamily: fontFamily.Poppins_Medium,
    fontSize: textScale(14),
  },
  cardLinearContainer: {
    overflow: 'hidden',
    position: 'relative',
    // width:moderateScale( width-1),

    backgroundColor:colors.lightGreyColor,
    borderRadius: moderateScale(12),
    // height:160,
    // flexDirection: 'row',
    // alignItems: 'center',
    // padding: moderateScale(22),
    borderColor: colors.theme,
    borderWidth: moderateScale(1.5),
    borderStyle: 'dashed',
    paddingVertical: moderateScale(16),
    marginVertical: moderateScale(12),
  },
  cardBlueContainer: {
    // overflow: 'hidden',
    // // width:moderateScale( width-1),
    // backgroundColor: '#ebf1f5',
    // borderRadius: moderateScale(12),
    // height:160,
    flexDirection: 'row',
    alignItems: 'center',
    // padding: moderateScale(22),
    // paddingVertical: moderateScale(10),
    // marginVertical: moderateScale(12),
  },
  binContainer: {},
  memberText: {
    fontFamily: fontFamily.Poppins_SemiBold,
    fontSize: textScale(16),
    color: colors.theme,
  },
  headingText: {
    fontFamily: fontFamily.Poppins_Bold,
    fontSize: textScale(25),
    color: colors.theme,
  },
  leftContainer: {
    flex: 3,
    // height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    // borderRightWidth: moderateScale(4),
    // borderRightColor: 'rgba(9, 78, 133, 0.08)',
    marginVertical: 12,

    // :moderateScale(12),
  },
  rightContiner: {
    flex: 9,
    // height: '100%',
    justifyContent: 'center',
    marginLeft: moderateScale(20),
  },
  roundContainer: {
    borderRadius: moderateScale(1200),
    backgroundColor: colors.theme,
    width: moderateScale(50),
    height: moderateScaleVertical(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  validityText: {
    fontSize: textScale(14),
    color: colors.black,
    marginTop: moderateScale(4),
    fontFamily: fontFamily.Poppins_Regular,
  },
  groupContainer: {},
  imgContainer: {
    width: moderateScale(35),
    height: moderateScale(35),
    overflow: 'hidden',
    borderRadius: 1000,
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  memberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(10),
    marginVertical: moderateScaleVertical(10),

  },
  memberName: {
    fontFamily: fontFamily.Urbanist_SemiBold,
    fontSize: textScale(15),
    color: colors.black,
  },
  txtContainer: {},
  memberOccupation: {
    fontFamily: fontFamily.Poppins_Regular,
    fontSize: textScale(12),
    color: colors.black,
  },
});
