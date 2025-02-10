import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import imagePath from '../../../../constants/imagePath';
import {
  height,
  moderateScale,
  moderateScaleVertical,
  scale,
  textScale,
  verticalScale,
} from '../../../../styles/responsiveSize';

import {ReviewItemProp} from '../../../../types/componentInterface';
import fontFamily from '../../../../styles/fontFamily';
import colors from '../../../../styles/colors';

import GoldButton from '../../../../assets/images/Icons/goldButton.svg';

const ReviewItem: React.FC<ReviewItemProp> = ({
  courseName,
  title,
  containerStyle,
}) => (
  <View style={[styles.container, containerStyle]}>
    <View style={[styles.imageContainer]}>
      <Image
        source={imagePath.businessPhoto}
        resizeMode="contain"
        style={styles.image}
      />
      <View style={styles.playContainer}>
        <GoldButton />
      </View>
    </View>

    <View style={styles.textContainer}>
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.courseText}>{courseName}</Text>
    </View>
  </View>
);

export default ReviewItem;

const styles = StyleSheet.create({
  container: {
    // width: scale(200),
    height: height / 3,
    overflow: 'hidden',
  },
  imageContainer: {
    borderRadius: moderateScale(12),
    height: '80%',
    overflow: 'hidden',
    position: 'relative',
  },
  playContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(21, 21, 21, 0.4)',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: moderateScale(10),
    marginTop: moderateScale(10),
  },
  image: {
    flex: 1,
    width: '100%',

    justifyContent: 'flex-end',
  },
  titleText: {
    fontSize: textScale(14),
    fontFamily: fontFamily.Poppins_Medium,
    color: colors.black,
  },
  courseText: {
    fontSize: textScale(12),
    fontFamily: fontFamily.Poppins_Regular,
    color: '#c3c3c3',
  },
});
