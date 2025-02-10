import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import colors from '../../../../styles/colors';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
  verticalScale,
} from '../../../../styles/responsiveSize';
import fontFamily from '../../../../styles/fontFamily';

import {
  PaymentInterface,
  PaymentTextInterface,
} from '../../../../types/componentInterface';
import CommonButton from '../../../CommonButton';
import navigationStrings from '../../../../constants/navigationStrings';
import usePostData from '../../../../hooks/usePostData';
import {endpoints} from '../../../../utils/endpoints';
import DeviceInfo from 'react-native-device-info';

const PaymentText: React.FC<PaymentTextInterface> = ({title, total}) => {
  return (
    <View style={[styles.priceContainer]}>
      <Text style={[styles.priceText, {flex: 1}]}>{title}</Text>
      <Text style={[styles.priceText]}>{total}KD</Text>
    </View>
  );
};

const PaymentStructure: React.FC<PaymentInterface> = ({
  paymentButton,
  paymentBoxStyle,
  totalPrice,
  subTotalPrice,
  discountPrice,
  walletBalance,
  cartId,
  handleCheckout,
  courseId,
  orderType
}) => {
  const navigation = useNavigation<any>();
  const [btnText, setBtnTxt] = useState(false);
  const {
    mutate: makePayment,
    data: paymentData,
    error: paymentError,
    isPending,
  } = usePostData(endpoints.PAYMENTS, ['PAYMENTS']);

  useEffect(() => {
    if (isPending) {
      setBtnTxt(true);
    } else if (paymentData) {
      console.log(
        'paymentDatapaymentDatapaymentDatapaymentDatapaymentData',
        paymentData,
      );

      setBtnTxt(false);
      navigation.navigate(navigationStrings.WebView,{url:paymentData?.Data?.invoiceURL})
    }
  }, [isPending, paymentData]);
  const handlePress = () => {
    // console.log('totaltotaltotaltotaltotaltotaltotaltotal', totalPrice);
    // makePayment({amount: +totalPrice});
    navigation.navigate(navigationStrings.PaymentStructure ,{
      subTotalPrice:subTotalPrice,
      totalPrice:totalPrice,
      discountPrice:discountPrice,
      cartId:cartId,
      orderType:orderType
    })
  };

  return (
    <View style={[styles.container, paymentBoxStyle]}>
      <Text style={styles.paymentText}>Payment Structure</Text>

      <PaymentText total={subTotalPrice} title="Subtotal" />
      <PaymentText total={(+discountPrice)} title="Discount" />
      <PaymentText total={walletBalance} title="Wallet Balance" />

      <View style={[styles.dottedLine]} />

      <View style={[styles.totalPriceContainer]}>
        <Text style={[styles.totalPriceText, {flex: 1}]}>Total</Text>
        <Text style={[styles.totalPriceText]}>{isNaN(totalPrice as number) ? 0 :totalPrice-walletBalance<=0?0:+(totalPrice-walletBalance)} KD</Text>
        
      </View>

      <View>
        {paymentButton && (
          <CommonButton
            btnText={btnText ? 'Loading...' : 'Checkout'}
            onPressBtn={handleCheckout}
            mainViewStyle={{marginHorizontal: moderateScale(0)}}
          />
        )}
      </View>
    </View>
  );
};

export default PaymentStructure;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.boxGreyBlue,
    // backgroundColor: 'rgba(9, 78, 133, 0.07)',
    padding: moderateScale(20),
    borderRadius: moderateScale(18),
  },
  paymentText: {
    fontSize:DeviceInfo?.isTablet()?textScale(12): textScale(16),
    color: colors.black,

    fontFamily: fontFamily.Poppins_SemiBold,
    marginBottom: moderateScale(10),
  },
  priceContainer: {
    flexDirection: 'row',
  },
  priceText: {
    fontSize:DeviceInfo?.isTablet()?textScale(11) :textScale(15),
    fontFamily: fontFamily.Poppins_Medium,
    color: colors.manatee,
    marginVertical: moderateScaleVertical(6),
  },
  dottedLine: {
    borderTopWidth: moderateScaleVertical(2),
    marginVertical: moderateScaleVertical(10),
    borderColor: colors.manatee,
  },
  totalPriceContainer: {
    flexDirection: 'row',
  },
  totalPriceText: {
    fontSize:DeviceInfo?.isTablet()?textScale(11) :textScale(15),
    fontFamily: fontFamily.Poppins_Bold,
    color: colors.black,
  },
});


