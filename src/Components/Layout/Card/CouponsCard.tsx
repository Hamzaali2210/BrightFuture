import {ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import GoldenTicket from '../../../assets/images/Icons/goldenTicket.svg';
import BlueTicket from '../../../assets/images/Icons/themeTicket.svg';
import {
  moderateScale,
  moderateScaleVertical,
  scale,
  textScale,
  verticalScale,
} from '../../../styles/responsiveSize';
import fontFamily from '../../../styles/fontFamily';
import colors from '../../../styles/colors';
import imagePath from '../../../constants/imagePath';

import GroupIcon from '../../../assets/images/Icons/groupBlueIcon.svg'
import GroupIconName from 'react-native-vector-icons/FontAwesome';


import {CouponCardInterface} from '../../../types/uiType';
import { useNavigation } from '@react-navigation/native';
import navigationStrings from '../../../constants/navigationStrings';

const CouponsCard: React.FC<CouponCardInterface> = ({
  expiryData,
  courseCount,
  discountAmount,
  discountType,
  realPrice,
  code,
  couponStyle,
  couponColor,
  couponType = 'group',
  couponTitle,
  navigationPath
}) => {
  const navigation = useNavigation();
  
  return (
   
    <TouchableOpacity onPress={()=>{{
      if(navigationPath){

        navigation.navigate(navigationPath as never)
      }
      
      }}} style={[styles.container, couponStyle]}>
      <ImageBackground
        source={
          couponType === 'discount' || couponType === 'group'
            ? imagePath.themeTicket
            : imagePath.goldenTicket
        }
        resizeMode="cover"
        style={{
          paddingVertical: verticalScale(20),
          borderRadius: scale(20),
          height: 152,
        }}>
        {/* <View style={[StyleSheet.absoluteFill, styles.ticket]}>
        <BlueTicket />
      </View> */}
        <View style={[]}>
         {couponType !== 'group'  ? 
         <View style={[styles.iconContainer]}>
            {/* <Text
              style={[
                styles.couponsDiscountHeading,
                {
                  color:
                    couponType === 'discount' 
                      ? 'white'
                      : 'black',
                },
              ]}>
              Coupon Voucher
            </Text> */}
            {/* <Text
              style={[
                styles.couponDiscountText,
                {
                  color:
                    couponType === 'discount' 
                      ? 'white'
                      : 'black',
                },
              ]}>
              20% OFF
            </Text> */}
           <View style={[styles.roundContainer]}>
            <GroupIconName
              name={'book'}
              color={colors.white}
              size={moderateScale(24)}
            />
          </View>
          </View>
          :
          <View style={styles.iconContainer}>
                <GroupIcon height={70} width={70}/>
            </View>
            }
          <View style={[styles.couponDetail]}>
            <Text
              style={[
                styles.couponsDetailHeading,
                {
                  color:
                    couponType === 'discount' || couponType === 'group'
                      ? 'white'
                      : 'black',
                },
              ]}
              numberOfLines={2}
              >
              {couponTitle}
            </Text>
            <>
              {couponType !== 'group' && (
                // <Text
                //   style={[
                //     styles.couponDetailText,
                //     {color: couponType === 'discount' ? 'white' : 'black'},
                //   ]}>
                //   <Text
                //     style={{
                //       fontFamily: fontFamily.Poppins_Bold,
                //       fontSize: textScale(18),
                //     }}>
                //     20% OFF{' '}
                //   </Text>
                //   on 3 course
                // </Text>
                <></>
              )}
            </>

            {/* <Text
              style={[
                styles.couponDetailDate,
                {
                  color:
                    couponType === 'discount' || couponType === 'group'
                      ? 'white'
                      : 'black',
                },
              ]}>
              Valid until of february 2024
            </Text> */}
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default CouponsCard;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
   
    // flex:1,
    // height: moderateScaleVertical(200),
    // paddingVertical:verticalScale(20),
    width: moderateScale(370),
    // width:"100%",
    
    overflow: 'hidden',
    marginRight: moderateScale(10),
    // backgroundColor:"red",

    justifyContent: 'center',
  },
  ticket: {
    // top: 10,
    // backgroundColor:"yellow",
  },
  iconContainer:{
    position:"absolute",
   left:moderateScale(20),
   top:moderateScale(20)
  },
  rotateCard: {
    transform: [{rotate: '270deg'}],
    textAlign: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: moderateScale(30),
    top: '32%',
    alignItems: 'center',
  },
  roundContainer: {
    borderRadius: moderateScale(1200),
    backgroundColor: colors.theme,
    width: moderateScale(60),
    height: moderateScaleVertical(60),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft:moderateScale(5),
  },
  couponsDiscountHeading: {
    fontFamily: fontFamily.Poppins_Medium,
    fontSize: textScale(11),
    color: colors.white,
  },
  couponDiscountText: {
    fontSize: textScale(22),
    fontFamily: fontFamily.Poppins_Bold,
    color: colors.white,
  },
  couponDetail: {
    position: 'relative',
    left: '35%',
    // height: '100%',
    padding: moderateScale(12),
    justifyContent: 'center',
    // alignItems:"center",
    // gap:scale(10),
    // top:moderateScale(20),
   

    // paddingLeft:moderateScale(10),
  },
  couponsDetailHeading: {
    fontFamily: fontFamily.Poppins_Bold,
    fontSize: textScale(24),
    color: colors.white,
    width:moderateScale(150),
    
    // marginBottom:moderateScaleVertical(10),
  },
  couponDetailText: {
    fontFamily: fontFamily.Poppins_Medium,
    fontSize: textScale(14),
    color: colors.white,
  },
  couponDetailDate: {
    fontFamily: fontFamily.Poppins_Regular,
    fontSize: textScale(12),
    color: colors.white,
  },
});
