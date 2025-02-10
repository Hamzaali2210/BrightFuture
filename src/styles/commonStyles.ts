import {StyleSheet} from 'react-native';
import {
  moderateScaleVertical,
  moderateScale,
  textScale,
  verticalScale,
} from './responsiveSize';
import colors from './colors';
import fontFamily from './fontFamily';

export const hitSlopProp = {
  top: 12,
  right: 12,
  left: 12,
  bottom: 12,
};
export default StyleSheet.create({
  fontSize10: {
    fontSize: textScale(10),
    color: colors.black,
    fontFamily: fontFamily.Poppins_Regular,
  },

  fontSize12: {
    fontSize: textScale(12),
    color: colors.theme,
    fontFamily: fontFamily.Poppins_Regular,
  },
  fontSize11: {
    fontSize: textScale(11),
    color: colors.theme,
    fontFamily: fontFamily.Poppins_Regular,
  },
  fontSize14: {
    fontSize: textScale(14),
    color: colors.black,
    fontFamily: fontFamily.Poppins_Regular,
  },

  fontSize13: {
    fontSize: textScale(13),
    color: colors.black,
    fontFamily: fontFamily.Poppins_Regular,
  },
  fontSize15: {
    fontSize: textScale(15),
    color: colors.theme,
    fontFamily: fontFamily.Poppins_Regular,
  },

  fontSize16: {
    fontSize: textScale(16),
    color: colors.black,
    fontFamily: fontFamily.Poppins_Regular,
  },
  fontSize17: {
    fontSize: textScale(17),
    color: colors.blackOpacity70,
    fontFamily: fontFamily.Poppins_Regular,
  },

  fontSize18: {
    fontSize: textScale(18),
    color: colors.black,
    fontFamily: fontFamily.Poppins_Regular,
  },

  fontSize24: {
    fontSize: textScale(24),
    color: colors.black,
    fontFamily: fontFamily.Poppins_Regular,
  },
  fontSize26: {
    fontSize: textScale(26),
    color: colors.black,
    fontFamily: fontFamily.Poppins_Regular,
  },
  fontBold16: {
    fontSize: textScale(16),
    color: colors.black,
    fontFamily: fontFamily.Poppins_Bold,
  },
  fontBold18: {
    fontSize: textScale(18),
    color: colors.black,
    fontFamily: fontFamily.Poppins_Bold,
  },
  fontBold24: {
    fontSize: textScale(24),
    color: colors.black,
    fontFamily: fontFamily.Poppins_Bold,
  },
  fontBold21: {
    fontSize: textScale(21),
    color: colors.black,
    fontFamily: fontFamily.Poppins_Bold,
  },
  loader: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },

  shadowStyle: {
    backgroundColor: colors.white,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 2,
    // borderColor: colors.lightWhiteGrayColor,
    // borderWidth: 0.7,
  },

  fontSize40: {
    fontFamily: fontFamily.Poppins_Bold,
    fontSize: textScale(40),
    color: colors.white,
  },
  flexView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexContainerCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  headingText: {
    fontSize: textScale(22),
    fontWeight: '500',
    color: colors.black,
    textAlign: 'center',
    marginTop: moderateScale(3),
  },
  greyText: {
    fontSize: moderateScale(18),
    color: colors.black,
    textAlign: 'center',
    marginTop: moderateScale(10),
    marginBottom: moderateScale(10),
    justifyContent: 'center',
    opacity: 0.5,
  },
  greyTextScale: {
    // width: moderateScale(279),
    marginTop: verticalScale(15),
    marginBottom: verticalScale(15),
    fontSize: textScale(14),
  },

  fontGrey14: {
    fontSize: textScale(14),
    color: '#b3b3b3',
    fontWeight: '400',
  },

  spacing: {
    paddingHorizontal: moderateScale(10),
  },
  spacingCommon: {
    paddingHorizontal: moderateScale(20),
  },
  fontHeading: {
    fontSize: moderateScale(18),
    color: colors.black,
    fontWeight: '500',
    flex: 1,
    textTransform: 'capitalize',
  },
});
