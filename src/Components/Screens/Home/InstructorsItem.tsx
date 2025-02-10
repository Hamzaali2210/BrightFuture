import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {InstructorItemProps} from '../../../types/componentInterface';

import {
  moderateScale,
  moderateScaleVertical,
  scale,
  textScale,
  verticalScale,
} from '../../../styles/responsiveSize';
import colors from '../../../styles/colors';
import FastImage from 'react-native-fast-image';
import imagePath from '../../../constants/imagePath';
import fontFamily from '../../../styles/fontFamily';
import StarIcon from '../../../assets/images/Icons/goldStar.svg';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import navigationStrings from '../../../constants/navigationStrings';
import DeviceInfo from 'react-native-device-info';
import { IMAGE_API_URL } from '../../../utils/urls';

const InstructorsItem: React.FC<InstructorItemProps> = ({
  imgPath,
  title,
  position,
  style,
  avgRating,
  reviews,
  id,
  home,
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        style,
        {width: home ? moderateScale(250) : 'auto'},
      ]}
      onPress={() => {
        navigation.navigate(navigationStrings.InstructorDetail, {
          instructorId: id,
        });
      }}>
      <View style={[styles.imgContainer]}>
        <FastImage
          source={{uri: `${IMAGE_API_URL}${imgPath}` || imgPath}}
          style={[styles.imgStyle]}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>

      <View style={[]}>
        <Text style={[styles.insTitle]} numberOfLines={1}>
          {title}
        </Text>
       {position &&  <Text style={[styles.insPosition,{marginBottom:4}]}>{position}</Text>}

        {!!avgRating && (
        <View
          style={[
            styles.flexContainer,

          ]}>
             <StarIcon width={moderateScaleVertical(14)} height={moderateScaleVertical(14)} />
          <Text style={[styles.insPosition]}>
            {avgRating > 0 && `${avgRating} `} | {' '}
            {reviews > 0 && `${reviews} Reviews`}
          </Text>

        </View>
      )}
      </View>

    </TouchableOpacity>
  );

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={() => {
        navigation.navigate(navigationStrings.InstructorDetail, {
          instructorId: id,
        });
      }}>
      <View style={[styles.imgContainer]}>
        <FastImage
          source={{uri: `${IMAGE_API_URL}${imgPath}` || imgPath}}
          style={[styles.imgStyle]}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
      <View style={[styles.textContainer]}>
        <Text style={[styles.insTitle]} numberOfLines={1}>
          {title}
        </Text>
        <Text style={[styles.insPosition, {marginVertical: moderateScale(4)}]}>
          {position}
        </Text>
        {!!avgRating && !!reviews && (
          <View style={[styles.ratingContainer]}>
            <StarIcon />
            <Text style={[styles.insPosition]}>
              {avgRating > 0 && `${avgRating}`} |{' '}
              {reviews > 0 && `${reviews} Reviews`}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default InstructorsItem;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: scale(8),
    // justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    overflow:"hidden",
    // width: moderateScale(100),
    // height:moderateScaleVertical(120),
    gap: moderateScale(10),
    backgroundColor: colors.mainGrey,
    padding: moderateScale(12),
    paddingHorizontal: moderateScale(12),
    borderRadius: moderateScale(12),
  },
  // container: {
  //   marginHorizontal: scale(8),
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   flexDirection:"row",
  //   // width: moderateScale(100),
  //   height:moderateScaleVertical(120),
  //   gap: moderateScale(10),
  // },
  flexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgContainer: {
    width: moderateScaleVertical(55),
    height: moderateScaleVertical(55),
    overflow: 'hidden',
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgStyle: {
    width: '100%',
    height: '100%',
  },
  insTitle: {
    textAlign: 'left',
    color: colors.black,
    textTransform: 'uppercase',
    // width:"80%",

    fontSize:DeviceInfo.isTablet()?textScale(10):textScale(12),
    fontFamily: fontFamily.Poppins_SemiBold,
  },
  insPosition: {
    textAlign: 'left',
    color: colors.insGrey,
    fontSize: DeviceInfo.isTablet()?textScale(8):textScale(12),
    fontFamily: fontFamily.Poppins_SemiBold,
    marginTop:moderateScaleVertical(2)
  },
});

// const styles = StyleSheet.create({
//   container: {
//     // marginHorizontal: scale(8),
//     // justifyContent: 'center',
//     // alignItems: 'center',
//     width: moderateScale(168),
//     // height: moderateScaleVertical(200),
//     gap: moderateScale(10),
//     backgroundColor: '#F5F6F7',

//     padding: moderateScale(12),
//     borderRadius: moderateScale(12),
//   },
//   textContainer: {},
//   ratingContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: moderateScale(6),
//   },
//   imgContainer: {
//     height: moderateScale(120),
//     overflow: 'hidden',
//     borderRadius: moderateScale(12),
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   imgStyle: {
//     width: '100%',
//     height: '100%',
//   },
//   insTitle: {
//     textAlign: 'left',
//     color: colors.black,
//     textTransform: 'uppercase',
//     fontSize: textScale(18),
//     fontFamily: fontFamily.Poppins_Medium,
//   },
//   insPosition: {
//     textAlign: 'left',
//     color: colors.insGrey,
//     fontSize: textScale(12),
//     fontFamily: fontFamily.Poppins_SemiBold,
//   },
// });
