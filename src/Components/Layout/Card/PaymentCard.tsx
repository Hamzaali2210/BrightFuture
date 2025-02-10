import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import commonStyles from '../../../styles/commonStyles';
import {
  moderateScale,
  textScale,
  verticalScale,
} from '../../../styles/responsiveSize';
import colors from '../../../styles/colors';
import fontFamily from '../../../styles/fontFamily';

import {PaymentCardInterface} from '../../../types/componentInterface';
import {Status} from '../../../types/uiType';

const PaymentCard: React.FC<PaymentCardInterface> = ({
  paymentTitle,
  paymentParagraph,
  price,
  date,
  status,
  handlePaymentCard,
}) => (
  <TouchableOpacity
    style={[styles.paymentCardContainer]}
    onPress={handlePaymentCard}>
    <View style={[styles.paymentTitleContainer]}>
      <Text style={[styles.paymentHeading]}>{paymentTitle}</Text>
      <Text style={[styles.paymentPara]}>{paymentParagraph}</Text>
    </View>
    <View style={[styles.paymentPriceContainer]}>
      <Text style={[styles.paymentPrice]}>{price} KD</Text>
      <Text style={[styles.paymentDate]}>{date}</Text>
      <Text
        style={[
          styles.paymentStatus,
          {color: status === 'Completed' ? 'green' : colors.themeYellow},
        ]}>
        {status}
      </Text>
    </View>
  </TouchableOpacity>
);

export default PaymentCard;

const styles = StyleSheet.create({
  paymentCardContainer: {
    marginTop: verticalScale(10),
    borderBottomWidth: moderateScale(1),
    borderBottomColor: '#CFCAE4',
    // backgroundColor: 'red',
    flexDirection: 'row',
    padding: moderateScale(16),
  },
  paymentTitleContainer: {
    flex: 2,
  },
  paymentHeading: {
    fontFamily: fontFamily.Poppins_Medium,
    fontSize: textScale(16),
    color: colors.theme,
  },
  paymentPara: {
    fontFamily: fontFamily.Poppins_Regular,
    fontSize: textScale(13),
    color: colors.blackGreyMedium,
  },
  paymentPriceContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  paymentPrice: {
    fontFamily: fontFamily.Poppins_SemiBold,
    fontSize: textScale(16),
    color: colors.theme,
  },
  paymentDate: {
    fontFamily: fontFamily.Poppins_Regular,
    fontSize: textScale(12),
    color: colors.black,
  },
  paymentStatus: {
    fontFamily: fontFamily.Poppins_Medium,
    fontSize: textScale(14),
    color: 'green',
  },
});
