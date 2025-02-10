import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  height,
  moderateScale,
  moderateScaleVertical,
  textScale,
  verticalScale,
  width,
} from '../../../styles/responsiveSize';
import colors from '../../../styles/colors';

import ScienceIcon from '../../../assets/images/Icons/ScienceIcon.svg';

import {categoryDataType} from '../../../types/uiType';
import DeviceInfo from 'react-native-device-info';
import {SvgUri} from 'react-native-svg';
import {IMAGE_API_URL} from '../../../utils/urls';

const CategoryItem: React.FC<categoryDataType> = ({title, svgIcon}) => {
  const isSvg = svgIcon?.toLowerCase()?.endsWith('.svg');
  return (
    <View style={[styles.box]}>
      <View style={{overflow: 'hidden'}}>
        {isSvg ? (
          <SvgUri
            uri={`${IMAGE_API_URL}${svgIcon}`}
            width={moderateScale(40)}
            height={moderateScale(40)}
          />
        ) : (
          <Image
            source={{uri: `${IMAGE_API_URL}${svgIcon}`}}
            style={{
              width: moderateScale(40),
              height: moderateScale(40),
              resizeMode: 'contain',
            }}
          />
        )}
      </View>
      {/* Uncomment if needed */}
      {/* <Text
        style={{
          fontFamily: 'Poppins-Regular',
          fontStyle: 'italic',
          color: colors.black,
          fontSize: textScale(12),
          marginTop: moderateScaleVertical(3),
          paddingHorizontal: moderateScale(2),
        }}
        numberOfLines={1}
      >
        {title}
      </Text> */}
    </View>
  );
};

// console.log(width,height,"popopopopopopopopopopopopopopopopopopo");

export default CategoryItem;

const styles = StyleSheet.create({
  box: {
    height: DeviceInfo?.isTablet()
      ? moderateScaleVertical(90)
      : moderateScaleVertical(70),
    // height:
    //   height > 1000 ? moderateScaleVertical(120) : moderateScaleVertical(70),
    // width: width / 5.4,
    width: DeviceInfo.isTablet()
      ? moderateScaleVertical(90)
      : moderateScale(70),

    borderRadius: moderateScale(14),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: moderateScale(8),
    backgroundColor: colors.mainGrey,
  },
});
