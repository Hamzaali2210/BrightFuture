import {ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import imagePath from '../../../constants/imagePath';
import {
  height,
  moderateScale,
  moderateScaleVertical,
  scale,
  textScale,
  verticalScale,
} from '../../../styles/responsiveSize';
import commonStyles from '../../../styles/commonStyles';
import GroupIcon from 'react-native-vector-icons/FontAwesome';
import colors from '../../../styles/colors';
import fontFamily from '../../../styles/fontFamily';
import dayjs from 'dayjs'



interface GroupCardProps{
    imageUrl:string; 
    type:string; 
    valid :Date;
    
}

const GroupCard:React.FC<GroupCardProps> = ({imageUrl}) => {
  return (
    <TouchableOpacity onPress={}>
  <ImageBackground
      source={imagePath.themeTicket}
      resizeMode="cover"
      style={[
        {
          paddingVertical: verticalScale(20),
          // backgroundColor: 'red',
          borderRadius: scale(20),
          height: moderateScale(150),
        },

        styles.cardContainer,
      ]}>
      <View style={[styles.iconContainer]}>
        <View style={[styles.roundContainer]}>
          <GroupIcon
            name="group"
            color={colors.white}
            size={moderateScale(30)}
          />
        </View>
      </View>
      <View style={[styles.contentContainer]}>
          <Text style={[styles.headingText]}>Group Coupon</Text>
          <Text style={[styles.validityText]}>valid till of {dayjs("2023-05-03").format("MMMM DD, YYYY")}</Text>
      </View>
    </ImageBackground>
    </TouchableOpacity>
  
  );
};

export default GroupCard;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roundContainer: {
    borderRadius: moderateScale(1200),
    backgroundColor: colors.themeDark,
    width: moderateScale(70),
    height: moderateScaleVertical(70),
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    flex: 3,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 7,
    height: '100%',
    justifyContent: 'center',
    marginLeft:moderateScale(20),
  },
  rotateCard: {
    transform: [{rotate: '270deg'}],
    textAlign: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    top: '20%',
    alignItems: 'center',
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
  headingText:{
     fontFamily:fontFamily.Poppins_Bold,
     fontSize:textScale(25),
     color:colors.white
  },
  validityText:{
    fontSize:textScale(14),
    color:colors.white,
    marginTop:moderateScale(6),
    fontFamily:fontFamily.Poppins_Regular,

  },

});



