import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CommonButton from '../../../Components/CommonButton';
import PaymentTable from '../../../Components/Layout/List/PaymentTable';
import PaymentStructure from '../../../Components/Screens/Courses/Cart/PaymentStructure';
import WrapperContainer from '../../../Components/WrapperContainer';
import navigationStrings from '../../../constants/navigationStrings';
import usePostData from '../../../hooks/usePostData';
import colors from '../../../styles/colors';
import fontFamily from '../../../styles/fontFamily';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../styles/responsiveSize';
import {endpoints} from '../../../utils/endpoints';
import useGetData from '../../../hooks/useGetData';
import AntIcon from 'react-native-vector-icons/AntDesign';
import MinusSmall from '../../../assets/images/Icons/minusSmall.svg';
import PlusSmall from '../../../assets/images/Icons/plusSmall.svg';
import {showError, showSuccess} from '../../../utils/helperFunctions';
import CustomTextInput from '../../../Components/CustomTextInput';
import DeviceInfo from 'react-native-device-info';
import {mainStrings} from '../../../constants/mainstrings';

type paymentType = 'emi' | 'full';

function Payment() {
  const {params}: any = useRoute();
  const navigation = useNavigation<any>();
  const [btnText, setBtnTxt] = useState(false);
  const [paymentType, setPaymentType] = useState<paymentType>('full');
  const [installmentMonth, setInstallmentMonth] = useState<number>(2);
  const [payPrice, setPayPrice] = useState(0);
  const [downPrice, setDownPrice] = useState('');
  const [payInstallmentid, setPayInstallmentId] = useState<number | undefined>(undefined);
  const [installmentData, setInstallmentData] = useState([]);
  const [downPaymentMessage, setDownPaymentMessage] = useState('');
  const [paymentCheck, setPaymentCheck] = useState(false);

  const priceData = {
    subTotalPrice: params?.subTotalPrice,
    totalPrice: params?.totalPrice,
    discountPrice: params?.discountPrice,
    courseId: params?.courseId,
    orderType: params?.orderType,
  };

  const handleGoto = () => {
    // navigation.navigate(navigationStrings.PaymentCard)
  };

  const {
    mutate: makePayment,
    data: paymentData,
    error: paymentError,
    isPending,
  } = usePostData(endpoints.PAYMENTS, ['PAYMENTS']);

  const {status, data, refetch}: any = useGetData(
    `${endpoints.INSTALLMENT}?order_id=${params?.cartId}`,
    ['INSTALLMENT',installmentMonth],
  );
  const {
    status: emiStatus,
    data: createInstallment,
    mutate: addEmi,
  } = usePostData(endpoints.CREATE_INSTALLMENT, ['INSTALLMENT'],'post',()=>{},(error)=>
  {
      showError(error)
  });

  const {
    status: downPaymentStatus,
    data: downPaymentData,
    mutate: createDownPayment,
    error: downPaymentError,
  } = usePostData(endpoints.GET_INSTALLMENT_PREVIEW, ['INSTALLMENT']);

  useEffect(() => {
    const payload = {
      installments: installmentMonth,
      total_amount: params?.totalPrice,
      order_id: params?.cartId,
    };
    addEmi(payload);
  }, [installmentMonth]);

  useEffect(() => {
    if (status === 'success') {
      // setInstallmentData(data?.data)
      setDownPrice(data?.minimum_down_payment)
    }
    if (emiStatus === 'success') {
      refetch();
    }
  }, [emiStatus]);

  // useEffect(() => {
  //   if (downPaymentStatus === 'success' && downPaymentData?.data?.length > 0) {
  //     // setInstallmentData(data?.data)
  //     const payload = {
  //       order_id: params?.cartId,
  //       down_payment: +downPrice,
  //       data: downPaymentData?.data,
  //     };
  //     addEmi(payload);

  //     // setPayPrice(price / installmentMonth);
  //     setPayPrice(+downPrice);

  //     console.log(
  //       'downPaymentDatadownPaymentDatadownPaymentDatadownPaymentData',
  //       downPaymentData,
  //     );
  //   }
  //   if (downPaymentStatus === 'error') {
  //     setPayPrice(0);
  //     showError(downPaymentError?.message);
  //     // console.log("downPaymentErrordownPaymentErrordownPaymentErrordownPaymentError",downPaymentError);
  //   }
  // }, [downPaymentStatus, downPaymentData, downPaymentError]);

  useEffect(() => {
    if (isPending) {
      setBtnTxt(true);
    } else if (paymentData) {
      setBtnTxt(false);
      console.log(
        'paymentDatapaymentDatapaymentDatapaymentDatapaymentData',
        paymentData,
      );
      if (paymentData?.is_wallet) {
        navigation.navigate(navigationStrings.Home, {payment: 'done'});
        showSuccess('Payment Done successfully');
      } else {
        navigation.navigate(navigationStrings.WebView, {
          url: paymentData?.Data?.invoiceURL,
        });
      }
    }
  }, [isPending, paymentData]);

  useEffect(() => {
    if (paymentType === 'full') {
      setPayPrice(+priceData?.totalPrice);
    } else {
      setPayPrice(0);
    }
  }, [paymentType]);

  const handlePayment = () => {



    if(downPrice < data?.minimum_down_payment && paymentType === 'emi'){
        showError(`Down Payment must be greater than ${data?.minimum_down_payment}`)
        return;
    }

    if (payPrice > 0) {
      if (paymentType === 'emi' && +downPrice > 0 && downPrice >= data?.minimum_down_payment) {
        makePayment({
          amount: payPrice,
          payment_type: 'installment',
          installment_id: payInstallmentid,
          is_wallet: params?.walletContained,
          order_type: priceData?.orderType,
        });
      } else if (paymentType === 'full') {
        makePayment({
          amount: payPrice,
          payment_type: 'full',
          is_wallet: params?.walletContained,
          order_type: priceData?.orderType,
        });
      }
    }
  };

  const handleEmiPrice = (price: number) => {
    if (price > 0) {
      // setPayPrice(price / installmentMonth);
      setPayPrice(price);
      setPaymentCheck(true);
    }
  };

  const handleDownPayment = () => {
    if (downPrice < data?.minimum_down_payment && paymentType === 'emi') {
      setDownPaymentMessage(
        `Down Payment must be greater than ${data?.minimum_down_payment}`,
      );
      return;
    }

    const payloadDownPayment = {
      course_id: priceData?.courseId,
      amount: priceData?.totalPrice,
      down_payment: +downPrice,
      installments: installmentMonth,
    };
    console.log(
      'payloadDownPaymentpayloadDownPaymentpayloadDownPayment',
      payloadDownPayment,
    );

    // return ;
    createDownPayment(payloadDownPayment);
  };

  return (
    <>
      <WrapperContainer>
        <ScrollView contentContainerStyle={{padding: moderateScale(8)}}>
          {/* <View style={{marginVertical: moderateScale(10)}}>
            <PaymentStructure
              paymentButton={false}
              paymentBoxStyle={{backgroundColor: colors.containerGrey}}
              totalPrice={priceData?.totalPrice}
              discountPrice={priceData?.discountPrice}
              subTotalPrice={priceData?.subTotalPrice}
            />
          </View> */}

          <Text style={styles.paymentText}>Choose Payment Structure</Text>

          <View
            style={[
              styles.paymentType,
              {marginBottom: moderateScale(20), flexDirection: 'row'},
            ]}>
            <TouchableOpacity
              style={[
                styles.radioStyle,
                {marginRight: moderateScale(10), flex: 1},
              ]}
              onPress={() => {
                setPaymentType('full');
              }}>
              <View
                style={{
                  borderRadius: moderateScale(1000),

                  width: moderateScale(20),
                  height: moderateScale(20),
                  borderWidth: moderateScale(1),
                  borderColor: colors.black,
                  padding: moderateScale(4),
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: moderateScale(4),
                }}>
                <View
                  style={{
                    width: moderateScale(14),
                    height: moderateScale(14),
                    borderRadius: moderateScale(1000),
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor:
                      paymentType === 'full' ? colors.theme : colors.white,
                  }}
                />
              </View>
              <Text style={[styles.paymentTypeText]}>By Full Payment</Text>
            </TouchableOpacity>
            <View style={[styles.totalPaymentContainer]}>
              {/* <View style={styles.priceLabel}>
                <Text style={styles.textLabel}> {(+priceData?.totalPrice).toFixed(2)} KD</Text>
              </View> */}
              <Text
                style={[
                  {
                    // flex: 1,
                    fontSize: textScale(18),
                    fontFamily: fontFamily.Poppins_Medium,
                    color: colors.black,
                    // marginVertical:moderateScaleVertical(10),
                  },
                ]}>
                {+priceData?.totalPrice} KD
              </Text>
              {/* <TouchableOpacity
                disabled={paymentType === 'emi'}
                style={[
                  styles.totalPaymentBlue,
                  {opacity: paymentType === 'emi' ? 0.2 : 1},
                ]}
                onPress={() => {
                  setPayPrice(+priceData?.totalPrice);
                }}>
                <Text
                  style={[
                    {
                      color: colors.white,
                      fontFamily: fontFamily.Poppins_Bold,
                      fontSize: moderateScale(16),
                    },
                  ]}>
                  Pay Now
                </Text>
              </TouchableOpacity> */}
            </View>
          </View>
          {priceData?.orderType === 'Full' && (
            <View style={[styles.paymentType]}>
              <TouchableOpacity
                style={[styles.radioStyle]}
                onPress={() => {
                  setPaymentType('emi');
                }}>
                <View
                  style={{
                    borderRadius: moderateScale(1000),

                    width: moderateScale(20),
                    height: moderateScale(20),
                    borderWidth: moderateScale(1),
                    borderColor: colors.black,
                    padding: moderateScale(4),
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: moderateScale(4),
                  }}>
                  <View
                    style={{
                      width: moderateScale(14),
                      height: moderateScale(14),
                      borderRadius: moderateScale(1000),
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor:
                        paymentType === 'emi' ? colors.theme : colors.white,
                    }}
                  />
                </View>
                <Text style={[styles.paymentTypeText]}>
                  By Installment Payment
                </Text>
              </TouchableOpacity>
              <View style={[styles.totalPaymentContainer]}>
                {/* <Text
                style={[
                  {
                    flex: 1,
                    fontSize: textScale(18),
                    fontFamily: fontFamily.Poppins_SemiBold,
                    color: colors.black,
                  },
                ]}>
                 {(+priceData?.totalPrice).toFixed(2)} KD
              </Text> */}
              </View>

              {paymentType === 'emi' && (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginVertical: moderateScale(8),
                  }}>
                  {/* <FlatList
                  horizontal
                  scrollEnabled={false}
                  data={[3,6,12]}
                  ListEmptyComponent={()=>{
                    return <Text style={{fontFamily:fontFamily.Poppins_SemiBold,color:colors.black,fontSize:textScale(16)}}>No Installment Option found</Text>
                  }}
                  renderItem={({item}) => {
                    return (
                      <TouchableOpacity
                        style={[
                          styles.radioStyle,
                          {marginRight: moderateScale(12)},
                        ]}
                        onPress={() => {
                          setInstallmentMonth(item);
                        }}>
                        <View
                          style={{
                            borderRadius: moderateScale(1000),

                            width: moderateScale(20),
                            height: moderateScale(20),
                            borderWidth: moderateScale(1),
                            borderColor: colors.black,
                            padding: moderateScale(4),
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginRight: moderateScale(4),
                          }}>
                          <View
                            style={{
                              width: moderateScale(14),
                              height: moderateScale(14),
                              borderRadius: moderateScale(1000),
                              justifyContent: 'center',
                              alignItems: 'center',
                              backgroundColor:
                                item === 3 && installmentMonth === 3
                                  ? colors.theme
                                  : item === 6 && installmentMonth === 6
                                  ? colors.theme
                                  : item === 12 && installmentMonth === 12
                                  ? colors.theme
                                  : colors.white,
                            }}
                          />
                        </View>
                        <Text style={[styles.paymentTypeText]}>
                          {item} Month
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                /> */}
                  <Text
                    style={{
                      fontFamily: fontFamily.Poppins_Bold,
                      color: colors.black,
                      fontSize: textScale(15),
                    }}>
                    Installment Plan
                  </Text>
                  <View>
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
                          if (installmentMonth >= 0) {
                            setInstallmentMonth(prev => {
                              if (prev > 2) {
                                return prev - 1;
                              }
                              return prev;
                            });
                          }
                          setPayPrice(0);
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
                          fontSize: moderateScale(14),
                          color: colors.black,
                        }}>
                        {installmentMonth}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          setInstallmentMonth(prev => {
                            if (prev < 12) {
                              return prev + 1;
                            }
                            return prev;
                          });
                          setPayPrice(0);
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
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <PlusSmall />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}

              {/* {paymentType === 'emi' && (
                <Text
                  style={{
                    fontFamily: fontFamily.Poppins_Medium,
                    fontSize: textScale(12),
                    color: colors.black,
                    // marginTop:moderateScale(12),
                  }}>
                  {mainStrings.downPayment}
                </Text>
              )} */}
              {/* {paymentType === 'emi' && (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <CustomTextInput
                    containerStyle={{
                      flex: 1,
                      padding: moderateScale(2),
                      height: moderateScaleVertical(35),
                    }}
                    onChangeText={e => {
                      setDownPrice(e);
                    }}
                    keyboardType="numeric"
                    value={downPrice.toString()}
                    placeholder="Enter Down Payment"
                    inputStyle={{fontSize: textScale(10)}}
                  />
                  <TouchableOpacity
                    style={{
                      paddingHorizontal: moderateScale(16),
                      paddingVertical: moderateScaleVertical(8),
                      borderRadius: moderateScale(123),
                      backgroundColor: colors.theme,
                      marginHorizontal: moderateScale(4),
                    }}
                    onPress={handleDownPayment}>
                    <Text
                      style={{
                        color: colors.white,
                        fontFamily: fontFamily.Poppins_SemiBold,
                        fontSize: DeviceInfo?.isTablet()
                          ? textScale(8)
                          : textScale(12),
                      }}>
                      Calculate
                    </Text>
                  </TouchableOpacity>
                </View>
              )} */}

          {paymentType === 'emi' && downPrice<data?.minimum_down_payment && <Text
                style={{
                  fontSize: moderateScaleVertical(8),
                  color: colors.red,
                  fontFamily: fontFamily.Poppins_Regular,
                  marginBottom: moderateScaleVertical(6),

                }}>
                {downPaymentMessage}
              </Text>}
              {paymentType === 'emi' && (
                <PaymentTable
                  checklist={true}
                  handlePayNowButton={(item: {id: number}) => {
                    // console.log('item item item item item', item);
                    setPayInstallmentId(item?.id);
                    handleEmiPrice(item?.amount);
                  }}
                  paymentCheck={paymentCheck}
                  toBePaid
                  data={data?.data}
                />
              )}
            </View>
          )}
        </ScrollView>
        <View
          style={{
            backgroundColor: 'white',
            width: '100%',
            padding: 20,
            shadowColor: 'black',
          }}>
          <CommonButton
            btnText={
              btnText
                ? 'Loading...'
                : paymentType === 'emi'
                ? `Pay 1st Installment | ${+payPrice} KD`
                : `Checkout | ${payPrice} KD`
            }
            mainViewStyle={{margin: 0, marginBottom: moderateScale(20)}}
            onPressBtn={() => handlePayment()}
            loading={isPending}
          />
        </View>
      </WrapperContainer>
    </>
  );
}

export default Payment;

const styles = StyleSheet.create({
  paymentText: {
    fontSize: textScale(18),
    color: colors.black,

    fontFamily: fontFamily.Poppins_SemiBold,
    // marginBottom: moderateScale(10),
    marginVertical: moderateScale(16),
  },
  radioStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentType: {
    backgroundColor: colors.containerGrey,
    borderRadius: textScale(14),
    padding: moderateScale(20),
  },
  paymentTypeText: {
    fontFamily: fontFamily.Poppins_SemiBold,
    fontSize: textScale(14),
    color: colors.black,
  },
  totalPaymentContainer: {
    flexDirection: 'row',

    // padding: moderateScale(10),
    alignItems: 'center',
  },
  totalPaymentBlue: {
    backgroundColor: colors.theme,
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(16),
    borderRadius: moderateScale(6),
  },
  totalPaymentBlueWe: {
    backgroundColor: colors.theme,
    paddingVertical: moderateScale(8),
    paddingHorizontal: moderateScale(8),
    borderRadius: moderateScale(6),
  },
  tableContainer: {},
  tableContainerHeader: {
    borderTopWidth: moderateScale(1),
    borderBottomWidth: moderateScale(1),
    borderTopColor: colors.grey1,
    borderBottomColor: colors.grey1,
    paddingVertical: moderateScale(4),
  },
  priceLabel: {
    alignSelf: 'flex-start',
    backgroundColor: `${colors.theme}10`,
    paddingHorizontal: moderateScale(12),
    marginVertical: moderateScale(3),
    borderRadius: moderateScale(20),
    paddingVertical: moderateScaleVertical(4),
  },
  textLabel: {
    fontFamily: fontFamily.Poppins_SemiBold,
    fontSize: moderateScale(16),
    color: colors.theme,
    textAlign: 'center',
  },
});
