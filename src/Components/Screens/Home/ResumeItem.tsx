import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import PlayIcon from '../../../assets/images/Icons/PlayIcon.svg';
import ScholarMovie from '../../../assets/images/Icons/ScholarMovie.svg';
import imagePath from '../../../constants/imagePath';
import colors from '../../../styles/colors';
import { moderateScale, textScale, verticalScale } from '../../../styles/responsiveSize';

function ResumeItem() {
  return (
    <View style={[styles.container]}>
      <View>
        <View style={[styles.imgContainer]}>
          <Image source={imagePath.resumeSample} style={styles.imgStyle} />
          <View style={[styles.playButton]}>
            <PlayIcon width={25} height={25} />
          </View>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.resumeMain]}>
          Chemical Reaction (CHE348) Cource{' '}
        </Text>
        <View style={[styles.resumeSecond]}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              gap: moderateScale(4),
            }}>
            <ScholarMovie width={20} height={20} />
            <Text style={[styles.uniText]}>AUK</Text>
          </View>
          <View style={[styles.moneyCont]}>
            <Text style={[styles.moneyText]}>50.00 KD</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default ResumeItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.mainGrey,
    borderRadius: moderateScale(10),
    flexDirection: 'row',
    alignItems: 'center',

    overflow: 'hidden',
    padding: moderateScale(6),
    paddingVertical: moderateScale(16),
    gap: moderateScale(10),
  },
  imgContainer: {
    position: 'relative',
  },
  imgStyle: {
    width: 95,
    height: 84,
  },
  playButton: {
    position: 'absolute',

    top: 30,
    left: 35,
  },
  resumeMain: {
    color: colors.black,
    fontSize: textScale(16),
    fontFamily: 'Poppins-Bold',
  },
  uniText: {
    fontSize: textScale(16),
    color: colors.themeDark,
    fontFamily: 'Poppins-Regular',
  },
  moneyText: {
    fontSize: textScale(16),
    color: colors.themeDark,
    fontFamily: 'Poppins-Regular',
  },
  moneyCont: {
    padding: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.secondGrey,
    borderRadius: moderateScale(10),
  },
  resumeSecond: {
    flexDirection: 'row',
    marginTop: verticalScale(10),
  },
});
