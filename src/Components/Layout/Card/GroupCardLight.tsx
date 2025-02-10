import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import GroupIcon from 'react-native-vector-icons/FontAwesome';
import ShareIcon from 'react-native-vector-icons/FontAwesome5';
import GrIcon from 'react-native-vector-icons/Ionicons';
import MinusSmall from '../../../assets/images/Icons/minusSmall.svg';
import PlusSmall from '../../../assets/images/Icons/plusSmall.svg';
import colors from '../../../styles/colors';
import fontFamily from '../../../styles/fontFamily';
import TwoBook from '../../../assets/images/twoBook.svg';
import ThreeBook from '../../../assets/images/threeBook.svg';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
  verticalScale,
  width,
} from '../../../styles/responsiveSize';
import BlueLabelButton from '../Button/BlueLabelButton';
import imagePath from '../../../constants/imagePath';
import navigationStrings from '../../../constants/navigationStrings';
import TrashIcon from 'react-native-vector-icons/FontAwesome';
import {endpoints} from '../../../utils/endpoints';
import usePostData from '../../../hooks/usePostData';
import {showSuccess} from '../../../utils/helperFunctions';
import DeviceInfo from 'react-native-device-info';

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
  tapToApply?: boolean;
  cardStyle?: ViewStyle;
  memberList: Array<any>;
  isAdded: boolean;
  isOwner?: boolean;
  handleGroupChange: () => void;
  handleAddToVoucher?: () => void;
  voucherScreen?: boolean;
  customGroupCoupon?: boolean;
  homeScreenGroupCode?: boolean;
  homeList?: boolean;
  groupMembers?: any;
  cartCoupon?: boolean;
  newCode?: string;
  viewBtn?: boolean;
  totalCourses?: [];
  toggleCode?: () => void;
  joinGroupButton?: () => void;
  outerCardStyle?: ViewStyle;
  memberCount?: number;
  // createdDate?:string;
  // currentDate?:string;
  detailScreen?: boolean;
  cartDiscount?: boolean;
  dateInfo?: {
    daysCompleted: number;
    daysTotal: number;
    daysPending: number;
  };
  groupDetail?: any;
  textDescription?: string;
  removeCoupon?: ({}) => void;
  setMemberCount?: React.Dispatch<React.SetStateAction<number>>;
}

const GroupCardLight: React.FC<GroupCardLightProps> = ({
  colorsArr = [colors.boxGreyBlue, colors.boxGreyBlue],
  extend = false,
  type = 'Group Coupon',
  groupDetail,
  price = 0,
  cartDiscount,
  newCode,
  totalCourses,
  dateInfo,
  toggleCode,
  memberCount,
  setMemberCount,
  outerCardStyle,
  // createdDate,
  // currentDate,

  btnLabel = 'Create a Group',
  detailScreen,
  // date,
  member = 4,
  courses,
  couponCode,
  groupMembers,
  cardStyle,
  cartCoupon,
  homeList,
  enterCode = false,
  discountType = 'price',
  createButtonChange,
  handleCopyCode,
  joinGroupButton,
  courseDiscountDetail,
  handleCourseCopyCode,
  homeScreenGroupCode,
  handleShare,
  tapToApply,
  handleTapToApply,
  memberList,
  handleGroupChange,
  handleAddToVoucher,
  voucherScreen,
  customGroupCoupon,
  isOwner,
  viewBtn,
  removeCoupon,
  textDescription,
}) => {
  const SIMPLE_DAY_WIDTH = moderateScale(180);
  const TOTAL_DAY = 20;
  const COMPLETED_DAY = 8;
  const [text, setText] = useState<string>('');
  const navigation = useNavigation();
  const selectedCourse = totalCourses?.filter(
    (item: any) => item?.course?.in_cart,
  )?.length;
  console.log('there will be member count in this', totalCourses, groupDetail);

  const isTablet = DeviceInfo?.isTablet();

  return (
    <View
      style={[
        {
          borderColor: colors.theme,
          borderStyle: 'dashed',
          borderWidth: moderateScale(1),
          borderRadius: moderateScale(12),
          marginVertical: moderateScaleVertical(8),
          // backgroundColor:colors.boxGreyBlue
        },
        outerCardStyle,
      ]}>
      <LinearGradient
        // colors={groupDetail?.gradient_type==="horizontal"?[groupDetail?.gradient_from,groupDetail?.to]:[groupDetail?.up,groupDetail?.down]}
        // colors={ type === 'Group Coupon' ?colorsArr:}
        colors={colorsArr}
        // colors={ type === 'Group Coupon' ? colorsArr :(groupDetail?.gradient_type==="horizontal" && type === "Course Discount") ?[groupDetail?.gradient_from,groupDetail?.to]:[groupDetail?.up,groupDetail?.down]}
        style={[styles.cardLinearContainer, cardStyle]}
        useAngle
        angle={groupDetail?.gradient_type === 'horizontal' ? 180 : 90}>
        <View style={[styles.cardBlueContainer]}>
          {!cartCoupon && type === 'Group Coupon' ? (
            <TouchableOpacity
              onPress={handleAddToVoucher}
              style={{
                position: 'absolute',
                // width: moderateScale(40),
                // height: moderateScale(40),
                backgroundColor: colors.theme,
                top: moderateScaleVertical(-6),
                right: moderateScale(12),
                borderRadius: moderateScale(200),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1,
                paddingHorizontal: moderateScale(12),
                paddingVertical: moderateScaleVertical(9),
                gap: moderateScale(4),
              }}>
              <ShareIcon
                name="share"
                color={colors.white}
                size={moderateScale(14)}
              />
              <Text
                style={{
                  fontFamily: fontFamily.Poppins_SemiBold,
                  color: colors.white,
                  fontSize: isTablet ? textScale(8) : textScale(12),
                }}>
                Share
              </Text>
            </TouchableOpacity>
          ) : (
            <></>
          )}
          {viewBtn && (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(navigationStrings.MyVouchers as never)
              }
              style={{
                position: 'absolute',
                // width: moderateScale(40),
                // height: moderateScale(40),
                backgroundColor: colors.theme,
                top: moderateScale(-6),
                right: moderateScale(12),
                borderRadius: moderateScale(200),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1,
                paddingHorizontal: moderateScale(12),
                paddingVertical: moderateScale(9),
                gap: moderateScale(4),
              }}>
              <GrIcon
                name="people"
                color={colors.white}
                size={moderateScale(14)}
              />
              <Text
                style={{
                  fontFamily: fontFamily.Poppins_SemiBold,
                  color: colors.white,
                  fontSize: DeviceInfo?.isTablet()
                    ? textScale(8)
                    : textScale(12),
                }}>
                View
              </Text>
            </TouchableOpacity>
          )}
          {cartDiscount && (
            <View
              style={{
                position: 'absolute',
                // width: moderateScale(40),
                // height: moderateScale(40),

                top: moderateScaleVertical(-6),
                right: moderateScale(12),

                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1,

                gap: moderateScale(4),
              }}>
              <TouchableOpacity
                onPress={handleAddToVoucher}
                style={{
                  backgroundColor: colors.theme,
                  paddingHorizontal: moderateScale(12),
                  paddingVertical: moderateScaleVertical(9),
                  borderRadius: moderateScale(200),
                }}>
                <Text
                  style={{
                    fontFamily: fontFamily.Poppins_SemiBold,
                    color: colors.white,
                    fontSize: isTablet ? textScale(8) : textScale(12),
                  }}>
                  Applied
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  removeCoupon && removeCoupon({});
                }}
                style={{
                  paddingHorizontal: moderateScale(12),
                  paddingVertical: moderateScaleVertical(9),
                  borderRadius: moderateScale(200),
                }}>
                {/* <RecycleBin width={25} height={25} /> */}
                <TrashIcon
                  size={moderateScaleVertical(25)}
                  color={colors.red}
                  name="trash-o"
                />
              </TouchableOpacity>
            </View>
          )}

          <View style={[styles.leftContainer]}>
            <View style={[styles.roundContainer]}>
              {type === 'Group Coupon' && (
                <GrIcon
                  name={'people'}
                  color={colors.white}
                  size={moderateScaleVertical(24)}
                />
              )}

              {type === 'Course Discount' && courses === 1 ? (
                <GrIcon
                  name={'book'}
                  color={colors.white}
                  size={moderateScaleVertical(24)}
                />
              ) : courses == 2 ? (
                <TwoBook
                  width={moderateScaleVertical(24)}
                  height={moderateScaleVertical(24)}
                />
              ) : (
                type === 'Course Discount' && (
                  <ThreeBook
                    width={moderateScaleVertical(24)}
                    height={moderateScaleVertical(24)}
                  />
                )
              )}
            </View>
            {(type === 'Group Coupon' || type === 'Course Discount') && (
              <Text
                style={[
                  {
                    fontFamily: fontFamily.Poppins_Regular,
                    fontSize: isTablet ? textScale(16) : textScale(20),
                    color: colors.theme,
                    marginBottom:
                      type === 'Course Discount'
                        ? moderateScaleVertical(-10)
                        : undefined,
                  },
                ]}
                numberOfLines={1}>
                {price + (discountType == 'price' ? ' KD' : '%')}
              </Text>
            )}
            {(type === 'Group Coupon' || type === 'Course Discount') && (
              <Text
                style={[
                  {
                    fontFamily: fontFamily.Poppins_SemiBold,
                    fontSize: isTablet ? textScale(16) : textScale(22),
                    color: colors.theme,
                  },
                ]}>
                OFF
              </Text>
            )}
          </View>
          <Image source={imagePath.verticalLine} resizeMode="contain" />
          <View style={[styles.rightContiner]}>
            {type === 'Course Discount' && (
              <Text
                style={[
                  {
                    fontFamily: fontFamily.Poppins_SemiBold,
                    fontSize: isTablet ? textScale(10) : textScale(18),
                    textAlign: 'left',
                    color: colors.theme,
                    marginBottom: moderateScaleVertical(-10),
                  },
                ]}
                numberOfLines={2}>
                {courses + ' Courses'}
              </Text>
            )}
            <View>
              {!!customGroupCoupon || cartCoupon ? (
                <Text
                  style={[
                    styles.memberText,
                    {
                      fontFamily: fontFamily.Urbanist_Bold,
                      fontSize: isTablet ? textScale(16) : textScale(22),
                    },
                  ]}>
                  {memberCount} Members
                </Text>
              ) : (
                <Text style={[styles.memberText]}>
                  {type === 'Group Coupon' ? `${member} Members` : ``}
                </Text>
              )}
              {type === 'Course Discount' && (
                <Text
                  style={[
                    {
                      fontFamily: fontFamily.Poppins_SemiBold,
                      fontSize: isTablet ? textScale(14) : textScale(24),
                      color: colors.theme,
                      marginVertical: moderateScale(-5),
                      textTransform: 'uppercase',
                    },
                  ]}>
                  {price}
                  {discountType == 'price' ? 'KD' : '%'} Off
                </Text>
              )}
              {type === 'Group Coupon' && (
                <Text style={[styles.validityText]}>
                  {textDescription}
                  {/* Use this coupon code to enjoy a special discount. */}
                </Text>
              )}

              {/* {!customGroupCoupon &&  <Text style={[styles.validityText]}>
              valid till of {dayjs(date).format('MMMM DD, YYYY')}
            </Text>} */}

              {/* {!cartCoupon && !cartDiscount ? (
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
                      {dateInfo?.daysCompleted}/{dateInfo?.daysTotal}
                    </Text>
                  </View>
                  <View
                    style={{
                      borderRadius: moderateScale(10),
                      width: 180,
                      backgroundColor: '#094E8530',
                      height: 3,
                      overflow: 'hidden',
                    }}>
                    <View
                      style={{
                        borderRadius: moderateScale(10),
                        width:
                          dateInfo?.daysCompleted &&
                          `${
                            (dateInfo?.daysCompleted / dateInfo?.daysTotal) *
                            100
                          }%`,
                        backgroundColor: colors.theme,
                        height: '100%',
                      }}
                    />
                  </View>
                </View>
              ) : null} */}
              {!cartCoupon && !cartDiscount ? (
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
                        color: colors.red,
                        fontSize: textScale(12),
                      }}>
                      {/* {dateInfo?.daysCompleted}/{dateInfo?.daysTotal}
                       */}
                      {selectedCourse > courses ? courses : selectedCourse}/
                      {courses}
                    </Text>
                  </View>
                  <View
                    style={{
                      borderRadius: moderateScale(10),
                      width: 180,
                      backgroundColor: '#094E8530',
                      height: 3,
                      overflow: 'hidden',
                    }}>
                    <View
                      style={{
                        borderRadius: moderateScale(10),
                        // width:
                        //   dateInfo?.daysCompleted &&
                        //   `${
                        //     (dateInfo?.daysCompleted / dateInfo?.daysTotal) *
                        //     100
                        //   }%`,
                        width:
                          selectedCourse &&
                          courses &&
                          `${(selectedCourse / courses) * 100}%`,
                        backgroundColor: colors.theme,
                        height: '100%',
                      }}
                    />
                  </View>
                </View>
              ) : null}
              {type === 'Course Discount' && (
                <Text
                  style={{
                    textAlign: 'right',
                    marginRight: moderateScale(12),
                    color: colors.red,
                    fontSize: textScale(11),
                    top: -7,
                    fontFamily: fontFamily.Poppins_Medium,
                  }}>
                  {dateInfo?.daysPending} days left
                </Text>
              )}

              {/* {!!cartCoupon ||
                (cartDiscount && (
                  <Text style={[styles.validityText]}>
                    Use this coupon code to enjoy a special discount.
                  </Text>
                ))}
              {!!customGroupCoupon && (
                <Text style={[styles.validityText]}>
                  Use this coupon code to enjoy a special discount.
                </Text>
              )} */}
            </View>

            {type === 'Course Discount' && !detailScreen && (
              <BlueLabelButton
                handleChange={() => {
                  createButtonChange && createButtonChange();
                }}
                disabled={
                  selectedCourse && courses && selectedCourse >= courses
                    ? false
                    : true
                }
                text={'Use this Coupon'}
                btnStyle={{
                  backgroundColor: colors.theme,
                  marginTop: moderateScaleVertical(8),
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '80%',
                  opacity:
                    selectedCourse && courses && selectedCourse >= courses
                      ? 1
                      : 0.6,
                }}
                txtStyle={{
                  fontFamily: fontFamily.Poppins_Medium,
                  color: colors.white,
                  fontSize: DeviceInfo.isTablet()
                    ? textScale(9)
                    : textScale(11),
                }}
              />
            )}

            {!!customGroupCoupon ||
              (cartCoupon && (
                <View
                  style={{
                    flexDirection: 'row',
                    gap: moderateScale(5),
                    // justifyContent: 'center',
                    marginLeft: moderateScale(32),
                    marginVertical: moderateScaleVertical(12),
                  }}>
                  <View
                    style={{
                      width: moderateScale(100),
                      backgroundColor: '#F9F9F9',
                      borderRadius: moderateScale(120),
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 7,
                      },
                      shadowOpacity: 0.09,
                      shadowRadius: 9.51,
                      elevation: 15,
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
                          setMemberCount &&
                            setMemberCount(prev => {
                              if (prev > 2) {
                                return prev - 1;
                              }
                              return prev;
                            });
                        }
                      }}
                      style={{
                        width: moderateScaleVertical(30),
                        height: moderateScaleVertical(30),
                        backgroundColor: colors.white,
                        borderWidth: 0.5,
                        borderColor: '#EAEAEA',
                        justifyContent: 'center',
                        alignContent: 'center',
                        borderRadius: moderateScale(120),
                      }}>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <MinusSmall />
                      </View>
                    </TouchableOpacity>
                    <Text
                      style={{
                        fontFamily: fontFamily.Poppins_Bold,
                        fontSize: isTablet ? textScale(11) : textScale(14),
                        color: colors.black,
                      }}>
                      {memberCount}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        setMemberCount &&
                          setMemberCount(prev => {
                            if (prev < 100) {
                              return prev + 1;
                            }
                            return prev;
                          });
                      }}
                      style={{
                        width: moderateScaleVertical(30),
                        height: moderateScaleVertical(30),
                        backgroundColor: colors.white,
                        borderWidth: 0.5,
                        borderColor: '#EAEAEA',
                        justifyContent: 'center',
                        alignContent: 'center',
                        borderRadius: moderateScale(120),
                      }}>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <PlusSmall />
                      </View>
                    </TouchableOpacity>
                  </View>
                  {/* {cartCoupon && <View>

                <BlueLabelButton handleChange={()=>{toggleCode && toggleCode()}} text={`BRIGHT${newCode}`} btnStyle={{backgroundColor:colors.themeYellow}} txtStyle={{color:colors.black}}/>


              </View>} */}
                </View>
              ))}

            {(!!couponCode || customGroupCoupon) && false && (
              <>
                <BlueLabelButton
                  handleChange={() => {
                    handleCopyCode && handleCopyCode();
                  }}
                  text={couponCode}
                  btnStyle={{
                    backgroundColor: colors.themeYellow,
                    marginTop: moderateScaleVertical(8),
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '70%',
                  }}
                  txtStyle={{
                    fontFamily: fontFamily.Poppins_Medium,
                    color: colors.black,
                    fontSize: textScale(16),
                  }}
                />
              </>
            )}
            <View
              style={{
                alignSelf: 'flex-start',
                marginTop: verticalScale(10),
                flexDirection: 'row',
                gap: moderateScale(10),
              }}>
              {couponCode && type === 'Group Coupon' && !homeScreenGroupCode ? (
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
                        size={moderateScaleVertical(12)}
                      />
                    }
                  />
                </View>
              ) : (!courseDiscountDetail || homeScreenGroupCode) && false ? (
                <>
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
                </>
              ) : (
                <>
                  {!!detailScreen && !cartDiscount && (
                    <BlueLabelButton
                      handleChange={() =>
                        handleCourseCopyCode && handleCourseCopyCode()
                      }
                      text={btnLabel}
                      icon={
                        <GrIcon
                          name="copy-outline"
                          color={colors.white}
                          size={moderateScale(22)}
                        />
                      }
                      btnStyle={{
                        backgroundColor: colors.theme,
                        marginTop: moderateScaleVertical(8),

                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '80%',
                      }}
                      txtStyle={{
                        fontFamily: fontFamily.Poppins_Medium,
                        color: colors.white,
                        fontSize: textScale(18),
                      }}
                    />
                  )}
                </>
              )}
            </View>
          </View>
        </View>

        {type === 'Group Coupon' && (
          <Image
            source={imagePath.whiteLine}
            style={{width: '100%'}}
            resizeMode="cover"
          />
        )}

        {type === 'Group Coupon' && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: moderateScale(6),
              // borderTopColor: '#094E8530',
              borderStyle: 'solid',
              // borderTopWidth: moderateScale(3),
              paddingTop: moderateScale(12),
            }}>
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
            {!homeList && (
              <BlueLabelButton
                handleChange={() => {
                  joinGroupButton && joinGroupButton();
                }}
                text={'Join a Group'}
                txtStyle={{color: colors.black}}
                icon={
                  <GrIcon
                    name="log-in"
                    color={colors.black}
                    size={moderateScale(20)}
                  />
                }
                btnStyle={{
                  backgroundColor: '#FFE500',

                  justifyContent: 'center',
                  alignItems: 'center',
                  // width: '90%',
                }}
              />
            )}
          </View>
        )}

        {!!tapToApply && (
          <TouchableOpacity
            onPress={handleTapToApply}
            style={{
              marginTop: moderateScale(12),
              paddingTop: moderateScaleVertical(10),
              // borderTopColor: colors.theme,
              // borderTopWidth: moderateScaleVertical(1),
            }}>
            <Text
              style={{
                fontFamily: fontFamily.Poppins_Medium,
                color: colors.theme,
                textAlign: 'center',
                fontSize: textScale(18),
                letterSpacing: moderateScale(4),
                textTransform: 'uppercase',
              }}>
              Tap to Apply
            </Text>
          </TouchableOpacity>
        )}

        {type === 'Group Coupon' && !!memberList?.length && (
          <>
            <View
              style={{
                height: moderateScale(1),
                borderStyle: 'dashed',
                borderWidth: moderateScale(1.2),
                marginVertical: moderateScaleVertical(10),

                borderColor: 'rgba(9,78,133,0.2)',
                marginRight: moderateScale(10),
              }}
            />
            <View
              style={[
                styles.groupContainer,
                {paddingHorizontal: moderateScale(16)},
              ]}>
              <FlatList
                data={memberList}
                scrollEnabled={false}
                renderItem={() => {
                  return (
                    <View style={styles.memberContainer}>
                      <View style={styles.imgContainer}>
                        <FastImage
                          source={{
                            priority: 'high',

                            uri: 'https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg',
                          }}
                          resizeMode="contain"
                          style={styles.img}
                        />
                      </View>
                      <View style={styles.txtContainer}>
                        <Text style={styles.memberName}>Johns Yani</Text>
                        <Text style={styles.memberOccupation}>Student</Text>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
          </>
        )}

        {/* {type === 'Group Coupon' && !!extend && ( */}
        {!!voucherScreen && (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TextInput
              style={styles.input}
              onChangeText={setText}
              value={text}
              placeholder="Enter A Code"
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

                justifyContent: 'center',
                alignItems: 'center',
                width: '90%',
              }}
              txtStyle={{
                fontFamily: fontFamily.Poppins_Medium,
                color: colors.black,
                fontSize: isTablet ? textScale(9) : textScale(12),
              }}
            />
          </View>
        )}
        {false && (
          <View style={styles.labelContainer}>
            <Text style={styles.labelText}>Active</Text>
          </View>
        )}
      </LinearGradient>
    </View>
  );
};

export default GroupCardLight;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    // borderWidth: 1,
    padding: 10,
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
    fontSize: DeviceInfo.isTablet() ? textScale(10) : textScale(14),
  },

  cardLinearContainer: {
    overflow: 'hidden',
    position: 'relative',
    // borderStyle: 'solid',
    // borderWidth: 1,
    // borderColor: colors.theme,

    // width:moderateScale( width-1),

    // backgroundColor: 'rgba(9, 78, 133, 0.07)',

    borderRadius: moderateScale(12),
    // height:160,
    // flexDirection: 'row',
    // alignItems: 'center',
    // padding: moderateScale(22),
    paddingVertical: moderateScale(16),
    // marginVertical: moderateScale(12),
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
    flex: 9.5,
    // height: '100%',
    justifyContent: 'center',
    marginLeft: moderateScale(20),
  },
  roundContainer: {
    borderRadius: moderateScale(1200),
    backgroundColor: colors.theme,
    width: moderateScale(50),
    height: moderateScale(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  validityText: {
    fontSize: DeviceInfo.isTablet() ? textScale(10) : textScale(13),
    color: colors.black,
    marginTop: moderateScale(12),
    width: '95%',
    fontFamily: fontFamily.Urbanist_Medium,
  },
  groupContainer: {},
  imgContainer: {
    width: moderateScale(45),
    height: moderateScale(45),
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
    fontFamily: fontFamily.Poppins_SemiBold,
    fontSize: textScale(14),
    color: colors.black,
  },
  txtContainer: {},
  memberOccupation: {
    fontFamily: fontFamily.Poppins_Regular,
    fontSize: DeviceInfo?.isTablet() ? textScale(9) : textScale(12),
    color: colors.black,
  },
});
