import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../../../styles/colors';
import {
  moderateScaleVertical,
  moderateScale,
  textScale,
} from '../../../styles/responsiveSize';
import fontFamily from '../../../styles/fontFamily';
import {ratingStar} from '../../../utils/logicFunctions';
import imagePath from '../../../constants/imagePath';

import NoteIcon from '../../../assets/images/Icons/notesGray.svg';

import CalenderIcon from '../../../assets/images/Icons/calenderDark.svg';

const StudentCard = () => {
  const [star, setStar] = useState([]);
  useEffect(() => {
    const ratingStarFunc: any = ratingStar(3);

    setStar(ratingStarFunc);
  }, []);
  return (
    <View style={styles.container}>
      <View style={[styles.imgContainer]}>
        <Image
          source={imagePath.profileDp}
          style={{resizeMode: 'cover', width: '100%', height: '100%'}}
        />
      </View>
      <View style={[styles.detailContainer]}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.headingText}>Johns Yan</Text>
          <View style={[styles.ratingStar]}>
            {star.map(item => (
              <View>{item}</View>
            ))}
          </View>
          <Text style={[styles.ratingText]}>4.5</Text>
        </View>

        <Text style={[styles.textContainer]}>
          <Text
            style={{
              fontFamily: fontFamily.Poppins_Bold,
              fontSize: textScale(14),
              color: colors.black,
            }}>
            {' '}
            Course :
          </Text>
          Complete Mathematics Masterclass: College & University Level
        </Text>

        <View
          style={[
            styles.chapterDetailFeatureContainer,
            {gap: moderateScale(4)},
          ]}>
          <View style={[styles.chapterIconRow]}>
            <NoteIcon />

            <Text style={[styles.greyText]}>4 Notes</Text>
          </View>
          <View style={[styles.chapterIconRow]}>
            <CalenderIcon />
             <Text style={[styles.greyText]}>12 jan, 2023</Text>
          </View>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.price}>$220</Text>
          <View style={[styles.labelBlue]}>
            <Text style={[styles.labelTextBlue]}>Lessons : 8</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default StudentCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.grey2,
    borderRadius: moderateScale(8),
    padding: moderateScale(12),
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    marginVertical: moderateScaleVertical(12),
  },
  ratingText: {},
  detailContainer: {
    overflow: 'hidden',
    flex: 1,
    gap: moderateScale(6),
  },
  textContainer: {
    fontFamily: fontFamily.Poppins_Medium,
    color: colors.black,
  },
  imgContainer: {
    overflow: 'hidden',
    width: moderateScale(40),
    height: moderateScaleVertical(40),

    borderRadius: moderateScale(200),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(12),
  },
  labelBlue: {
    backgroundColor: 'green',

    borderRadius: moderateScale(20),
    paddingVertical: moderateScale(6),
    paddingHorizontal: moderateScale(10),
  },
  ratingStar: {
    flexDirection: 'row',
  },
  headingText: {
    fontFamily: fontFamily.Poppins_Bold,
    color: colors.black,
    fontSize: textScale(18),
    marginRight: 16,
  },
  labelTextBlue: {
    fontFamily: 'Urbanist-SemiBold',
    color: colors.white,
  },
  price: {
    fontFamily: fontFamily.Poppins_Bold,
    color: colors.black,
    fontSize: textScale(16),
    marginRight: 16,
  },
  chapterDetailContainer: {
    flexDirection: 'row',
    gap: moderateScale(10),
  },
  chapterDetailFeatureContainer: {
    flexDirection: 'row',
    gap: moderateScale(20),
  },
  chapterIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(6),
  },
  greyText: {
    color: colors.themeDark,
    fontSize: textScale(14),
    fontFamily: fontFamily.Poppins_Regular,
  },
});
