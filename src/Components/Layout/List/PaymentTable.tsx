import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../styles/responsiveSize';
import fontFamily from '../../../styles/fontFamily';
import colors from '../../../styles/colors';
import Animated, {FadeIn, FadeInDown, FadeInUp} from 'react-native-reanimated';
import {PaymentListInterface} from '../../../types/componentInterface';
import dayjs from 'dayjs';
import CheckIcon from 'react-native-vector-icons/AntDesign';

const PaymentTable: React.FC<PaymentListInterface> = ({
  handlePayNowButton,
  checklist,
  toBePaid,
  data,
  paymentCheck,
}) => {
  console.log('toBePaidtoBePaidtoBePaidtoBePaidtoBePaidtoBePaid', toBePaid);

  return (
    <Animated.View
      entering={FadeInDown}
      exiting={FadeInUp}
      style={styles.tableContainer}>
      <FlatList
        scrollEnabled={false}
        data={data}
        ListHeaderComponent={() => {
          return (
            <View
              style={[
                styles.tableContainerHeader,
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                },
              ]}>
              {checklist && <View style={{width: moderateScale(20)}} />}
              <Text
                style={{
                  fontFamily: fontFamily.Poppins_Medium,
                  fontSize: textScale(10),
                  color: colors.blueGrey,
                  width: moderateScale(18),
                  textAlign:"center"
                }}>
                Sr.
              </Text>
              <Text
                style={{
                  fontFamily: fontFamily.Poppins_Medium,
                  fontSize: textScale(10),
                  color: colors.blueGrey,
                  width: moderateScale(50),
                  textAlign:"center"
                }}>
                Amount
              </Text>
              <Text
                style={{
                  fontFamily: fontFamily.Poppins_Medium,
                  fontSize: textScale(10),
                  color: colors.blueGrey,
                  textAlign:"center",
                  width: moderateScale(60),
                }}>
                {checklist ? 'Due date' : 'Date'}
              </Text>
              {/* <Text
                style={{
                  fontFamily: fontFamily.Poppins_Medium,
                  fontSize: textScale(12),
                  color: colors.blueGrey,
                  width:moderateScale(55),
                }}>
                {checklist ? "Status" :"Action"}
              </Text> */}
              {checklist && (
                <Text
                  style={{
                    fontFamily: fontFamily.Poppins_Medium,
                    fontSize: textScale(10),
                    color: colors.blueGrey,
                    textAlign:"center",
                    width: moderateScale(75),
                  }}>
                  {'Status'}
                </Text>
              )}
            </View>
          );
        }}
        renderItem={({item, index}) => {
          console.log('single single payment', item);

          return (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginVertical: moderateScaleVertical(12),
              }}>
              {checklist && (
                <TouchableOpacity
                  style={{width: moderateScale(16)}}
                  onPress={() => handlePayNowButton(item)}
                  disabled={!!item?.paid || !item?.is_payable }>
                  <CheckIcon
                    name={'checksquare'}
                    size={moderateScale(16)}
                    color={
                      (item?.paid || (item?.is_payable)) && paymentCheck
                        ? 'green'
                        : colors.grey1
                    }
                  />
                </TouchableOpacity>
              )}
              <Text
                style={{
                  fontFamily: fontFamily.Poppins_SemiBold,
                  color: colors.black,
                  fontSize: textScale(10),
                  width: moderateScale(20),
                  textAlign:"center"
                }}>
                {index + 1}
              </Text>
              <Text
                style={{
                  fontFamily: fontFamily.Poppins_SemiBold,
                  color: colors.black,
                  alignItems:"center",
                  alignSelf:"center",
                  fontSize: textScale(10),
                  width: moderateScale(45),
                  // marginTop:12,
                }}>
                {item?.amount??0}KD
              </Text>
              <Text
                style={{
                  fontFamily: fontFamily.Poppins_SemiBold,
                  color: colors.black,
                  fontSize: textScale(10),
                  width: moderateScale(65),
                  textAlign:"center",
                  
                }}>
                {dayjs(item?.due_date).format('DD/MM/YY')}
              </Text>
              {/* {!!checklist && (
                <View>
                  <Text
                    style={[
                      styles.paymentStatus,
                      
                      {
                        color:
                            item?.paid
                            ? 'green'
                            : colors.themeYellow,
                            width:moderateScale(55),
                      },
                    ]}>
                    {item?.paid?'Completed':"Pending"}
                  </Text>
                </View>
              ) } */}

              <TouchableOpacity
              style={[styles.totalPaymentBlueWe,{flexDirection:"row",alignItems:"center",gap:moderateScale(4),width: moderateScale(70),}]}
                // style={[
                //   styles.totalPaymentBlueWe,
                //   {
                //     backgroundColor: item?.paid ? colors.green : colors.theme,
                //     width: moderateScale(70),
                //     opacity: item?.is_payable ? 1 : 0.4,
                //   },
                // ]}
                // onPress={() => handlePayNowButton(item)}
                // disabled={!!item?.paid || !item?.is_payable}

                >
                    <CheckIcon
                          size={moderateScale(9)}
                          name="checkcircle"
                          color={
                            item?.due_date_passed? colors.red:item?.paid ? colors.green :colors.themeYellow
                          }
                        />

                <Text
                  style={[
                    {
                      color: item?.due_date_passed? colors.red:item?.paid ? colors.green :colors.themeYellow,
                      fontFamily: fontFamily.Poppins_SemiBold,
                      fontSize:textScale(10),
                      textAlign: 'center',
                    },
                  ]}>
                  {item?.due_date_passed?"due":item?.paid ? 'Paid' : item?.is_payable?"Now":"Pending"}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </Animated.View>
  );
};

export default PaymentTable;

const styles = StyleSheet.create({
  totalPaymentBlue: {
    backgroundColor: colors.theme,
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(16),
    borderRadius: moderateScale(6),
  },
  totalPaymentBlueWe: {
    // backgroundColor: colors.theme,
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
  paymentStatus: {
    fontFamily: fontFamily.Poppins_SemiBold,
    fontSize: textScale(11),
    color: 'green',
  },
});
