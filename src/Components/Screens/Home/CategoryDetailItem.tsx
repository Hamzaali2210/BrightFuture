import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { BlurView } from '@react-native-community/blur';
import imagePath from '../../../constants/imagePath';
import { moderateScale, textScale, verticalScale } from '../../../styles/responsiveSize';
import {CategoryDetailItemProp} from '../../../types/componentInterface';

import StarIcon from '../../../assets/images/Icons/goldStar.svg';
import colors from '../../../styles/colors';

import HeartIcon from '../../../assets/images/Icons/HeartWhiteIcon.svg';
import fontFamily from '../../../styles/fontFamily';


const DEFAULT_PHOTO='https://images.unsplash.com/photo-1577415124269-fc1140a69e91?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

const CategoryDetailItem: React.FC<CategoryDetailItemProp> = ({
  title,
  containerStyle,
  coverPhoto,
  handlePress
}) => (
  <TouchableOpacity style={[styles.container, containerStyle]} onPress={handlePress}>
    <ImageBackground
      source={{uri:coverPhoto||DEFAULT_PHOTO}}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={styles.blurBack}>
        <View style={[styles.blurContainer]}>
          <Text style={[styles.textSubject]} numberOfLines={2}>{title}</Text>
        </View>
      </View>
    </ImageBackground>
  </TouchableOpacity>
);

export default CategoryDetailItem;

const styles = StyleSheet.create({
  container: {
    width: moderateScale(200),
    height: verticalScale(220),
    overflow: 'hidden',
    borderRadius: moderateScale(12),
    marginHorizontal: moderateScale(10),
  },
  labelYellow: {
    backgroundColor: '#FFBA00',
    position: 'absolute',
    paddingVertical: moderateScale(4),
    paddingHorizontal: moderateScale(7),
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',

    borderTopRightRadius: moderateScale(20),
    top: 10,
    borderBottomRightRadius: moderateScale(20),
  },
  labelText: {
    fontFamily: 'Urbanist-SemiBold',
  },
  blurBack: {
    backgroundColor: 'rgba(67, 67, 67, 0.38)',
    height: '100%',
    padding: verticalScale(10),
    justifyContent: 'flex-end',
  },

  absolute: {
    position: 'absolute',
    borderRadius: moderateScale(8),
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  blurContainer: {
    gap: moderateScale(6),
  },
  textSubject: {
    fontFamily: fontFamily.Merriweather_BoldItalic,
    color: colors.white,
    fontSize: textScale(24),
    textAlign: 'center',
    fontStyle: 'italic',
  },
  textCourse: {
    fontFamily: 'Poppins-Bold',
    color: colors.white,
    fontSize: textScale(12),
  },
  priceText: {
    flexDirection: 'row',
  },
  starTextCont: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: colors.white,
  },
  priceMoney: {
    color: colors.white,
    fontFamily: 'Poppins-SemiBold',
  },
  priceMoneySale: {
    color: '#d9d9d9',
    textDecorationLine: 'line-through',
  },
});
