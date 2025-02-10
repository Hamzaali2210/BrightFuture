import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  moderateScaleVertical,
  scale,
  textScale,
} from '../../../../styles/responsiveSize';
import colors from '../../../../styles/colors';
import fontFamily from '../../../../styles/fontFamily';
import commonStyles from '../../../../styles/commonStyles';
import PlanTab from './PlanTab';
import BlueBox from './BlueBox';
import OtherPlanBox from './OtherPlanBox';
import {useNavigation} from '@react-navigation/native';
import navigationStrings from '../../../../constants/navigationStrings';

const MyPlan = () => {
  const [activeColor, setActiveColor] = useState<number>(0);
  const navigation = useNavigation();
  const handleActive = (type: number) => {
    if (type === 0) {
      setActiveColor(0);
    } else {
      setActiveColor(1);
    }
  };

  return (
    <ScrollView contentContainerStyle={[styles.container]}>
      <PlanTab handleActive={handleActive} activeColor={activeColor} />
      <View style={[commonStyles.spacingCommon]}>
        <Text style={styles.headingStyle}>Active Plan</Text>
        <BlueBox />
        <Text
          style={[
            styles.headingStyle,
            {marginVertical: moderateScaleVertical(12)},
          ]}>
          Other Plans
        </Text>
        <OtherPlanBox />
        <OtherPlanBox />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            gap: scale(12),
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(navigationStrings.Terms as never);
            }}>
            <Text style={styles.colorText}>Terms of Use </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(navigationStrings.Privacy as never);
            }}>
            <Text style={styles.colorText}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>
        <View
          style={[
            commonStyles.spacing,
            {marginVertical: moderateScaleVertical(12)},
          ]}>
          <Text
            style={{
              fontFamily: fontFamily.Poppins_Regular,
              fontSize: textScale(12),
              color: colors.grey1,
              textAlign: 'center',
            }}>
            Payment will be charged to your account at the time of confirmation
            of purchase.The subscription automatically renews unless it is
            cancelled at least 24 hours before the end of current period.Your
            account will be charged for renewal within 24 hours prior to the end
            of the current period.You acn manage and cancel your subscription by
            going to your App store account settings after purchase.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default MyPlan;

const styles = StyleSheet.create({
  container: {},
  headingStyle: {
    fontFamily: fontFamily.Poppins_SemiBold,
    color: colors.black,
    fontSize: textScale(18),
    marginBottom: moderateScaleVertical(12),
  },
  colorText: {
    fontFamily: fontFamily.Poppins_SemiBold,
    fontSize: textScale(16),
    color: colors.theme,
  },
});
