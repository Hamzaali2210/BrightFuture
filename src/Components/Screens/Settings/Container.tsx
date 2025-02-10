import {
 StyleSheet, Text, TouchableOpacity, View 
} from 'react-native';
import React from 'react';
import RightArrow from '../../../assets/images/Icons/settingsIcon/rightArrow.svg';

import { moderateScale, moderateScaleVertical, textScale } from '../../../styles/responsiveSize';
import commonStyles from '../../../styles/commonStyles';
import {ContractItemProps} from '../../../types/componentInterface';
import colors from '../../../styles/colors';
import DeviceInfo from 'react-native-device-info';

const Container: React.FC<ContractItemProps> = ({
  svgImage,
  title,
  overcomeStyleText,
  handlePress,
}) => (
  <TouchableOpacity onPress={handlePress}>
    <View style={[commonStyles.spacingCommon, styles.settingBox]}>
      <View style={[styles.settingBoxSide]}>
        {!!svgImage && <View style={[styles.settingBoxIcon,{overflow:"hidden",width:moderateScaleVertical(30),height:moderateScaleVertical(30),justifyContent:"center",alignItems:"center"}]}>{svgImage}</View>}
        <Text
          style={[
            {
              fontFamily: 'Poppins-Regular',
              fontSize:DeviceInfo?.isTablet()?textScale(12) :textScale(16),
              color: colors.black,
            },
            overcomeStyleText,
          ]}
        >
          {title}
        </Text>
      </View>
      <View style={[styles.rightArrowContainer]}>
        <RightArrow />
      </View>
    </View>
  </TouchableOpacity>
);

export default Container;

const styles = StyleSheet.create({
  settingBox: {
    flexDirection: 'row',
    // backgroundColor: '#F0F4F8',
    alignItems: 'center',
    padding: moderateScale(12),
    borderRadius: moderateScale(10),
    // marginVertical: moderateScale(12),
  },
  settingBoxSide: {
    flexDirection: 'row',
    alignItems: 'center',

    gap: moderateScale(10),
    flex: 1,
  },
  settingBoxIcon: {},
  rightArrowContainer: {},
});
