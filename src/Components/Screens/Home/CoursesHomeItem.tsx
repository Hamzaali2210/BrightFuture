import {ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import imagePath from '../../../constants/imagePath';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
  verticalScale,
  width,
} from '../../../styles/responsiveSize';
import {BlurView} from '@react-native-community/blur';
import {CoursesHomeItemProps} from '../../../types/componentInterface';

import StarIcon from '../../../assets/images/Icons/goldStar.svg';
import colors from '../../../styles/colors';

import HeartIcon from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import usePostData from '../../../hooks/usePostData';
import { endpoints } from '../../../utils/endpoints';
import { showError, showSuccess } from '../../../utils/helperFunctions';
import DeviceInfo from 'react-native-device-info';
import fontFamily from '../../../styles/fontFamily';
import FastImage from 'react-native-fast-image';
import { IMAGE_API_URL } from '../../../utils/urls';

const CoursesHomeItem: React.FC<CoursesHomeItemProps> = ({
  title,
  price,
  rating,
  subject,
  imageCover,
  discountPrice,
  isFavorite,
  handleFavorite,
  containerStyle,
  courseCode,
  refetch,
  itemId,
  fromWishlist,
  isExpired
}) => {
  const userData = useSelector((state: any) => state?.auth?.userPayload);
  const [redColor,setRedColor]=useState(isFavorite);


  const {
    mutate: sendToWishlist,
    status:wishStatus,

  } = usePostData(endpoints.STUDENT_WISHLIST, ['STUDENT_WISHLIST']);

  const {
    mutate: wishlistDataDelete,
    status:wishDeleteSuccess,
    isError: errorWishlist,

  } = usePostData(
    endpoints.STUDENT_WISHLIST,
    ['STUDENT_WISHLIST_DELETE'],
    'delete',
  );



useEffect(()=>{
  if(wishStatus==='error'){
          showError("Error while adding course to the wishlist")
  }else if(wishStatus === 'success'){
        showSuccess("Courses added to wishlist successfully")

        // refetch&&  refetch();

  }

},[wishStatus])

useEffect(()=>{
  if(wishDeleteSuccess==='error'){
        // setRedColor(false)
        showError("Error while removing course from the wishlist")
  }else if(wishDeleteSuccess === 'success'){
        // setRedColor(false)
        showSuccess("Courses removed from wishlist successfully")
        // refetch && refetch();

  }

},[wishDeleteSuccess])


  const handleWishlist = () => {
    console.log("isFavouriteisFavouriteisFavouriteisFavouriteisFavourite",isFavorite);
    if(redColor){
    setRedColor(false)

      wishlistDataDelete({id:itemId});
    }else {
    setRedColor(true)

      sendToWishlist({course_id: itemId});
      return
    }


  };


  return (
    <View style= {styles.courseContainer}>
      <View style={styles.imageContainer}>

      <FastImage style={[styles.imageCourse]}
        source={{uri: (imageCover != '0' && imageCover) || imagePath.imageUrl}}
        resizeMode='cover'

      />
      </View>
      {userData?.role === 2 && (
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              backgroundColor: 'rgba(255,255,255,0.4)',
              borderRadius: moderateScale(100),
              padding: moderateScale(10),
            }}
            onPress={()=>{
              if(isFavorite){
                setRedColor(false)
              }else{
                setRedColor(true)
              }
              handleWishlist();

            }}
            >
            {/* <HeartIcon width={30} height={40} /> */}
            {<HeartIcon name="heart" size={moderateScale(16)} color={redColor?colors.red:colors.white} />}
          </TouchableOpacity>
        )}
      <View style={[styles.detailContainer]}>
        <View style={{flex:1}}>
          <Text style={styles.textCourseName}>{title}</Text>
          <Text style={styles.textInstructor}>{subject}</Text>
        </View>
        <View style={[styles.flexContainer,{width:"100%",marginBottom:moderateScaleVertical(4)}]}>
       {!!rating  &&  !!userData?.course_type_available  ?   <View style={[styles.flexContainer,{flex:1}]}>
              <Text style={[styles.ratingTextGrey]}>{rating} </Text>
              <StarIcon width={moderateScale(12)} height={moderateScale(12)} style={{}}/>

          </View>:null}

         {userData?.course_type_available && !isExpired ? <View style={[styles.flexContainer]}>
          <Text style={[price > discountPrice ? styles.priceTextGrey : styles.priceMoneyGrey]}>{price}KD</Text>
            {price > discountPrice && <Text style={[styles.priceMoneyGrey]}>{discountPrice}KD</Text>}

          </View> : null}
        </View>
      </View>
      <View style={[styles.labelYellow]}>
          <Text style={[styles.labelText]}>{courseCode}</Text>
        </View>
    </View>
  )
};

export default CoursesHomeItem;

const styles = StyleSheet.create({

  flexContainer:{
      flexDirection:"row",
      alignItems:"center"
  },

  container: {
    width: moderateScale(200),
    height: DeviceInfo.isTablet()?moderateScaleVertical(250) :moderateScaleVertical(220),
    overflow: 'hidden',
    borderRadius: moderateScale(12),
    // marginHorizontal: moderateScale(10),
  },
  labelYellow: {
    backgroundColor: '#FFBA00',
    position: 'absolute',
    paddingVertical: moderateScaleVertical(4),
    paddingHorizontal: moderateScale(7),
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    opacity:0.95,

    borderTopRightRadius: moderateScale(20),
    top: 10,
    borderBottomRightRadius: moderateScale(20),
  },
  labelText: {
    fontFamily: 'Urbanist-SemiBold',
    color: colors.black,
    fontSize:moderateScaleVertical(11)
  },
  blurBack: {
    marginHorizontal: moderateScale(10),
    padding: moderateScale(10),
    borderRadius: moderateScale(8),
    marginBottom: moderateScale(10),
  },

  absolute: {
    position: 'absolute',
    borderRadius: moderateScale(8),
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    opacity:0.85
    // opacity:,
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  blurContainer: {
    gap: moderateScale(2),
  },
  textSubject: {
    fontFamily: 'Urbanist-Medium',
    color: colors.white,
    fontSize: DeviceInfo.isTablet()?textScale(10) :textScale(12),
     textAlign:"right",

  },
  textCourse: {
    fontFamily: 'Poppins-Bold',
    color: colors.white,
    fontSize:DeviceInfo.isTablet()?textScale(12) :textScale(14),
  },
  priceText: {
    flexDirection: 'row',
    alignItems:"center"
  },
  starTextCont: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor:"red",
    flex:1,
  },
  ratingText: {
    color: colors.white,
    textAlign:"right",
    fontFamily:fontFamily.Poppins_Medium,
    fontSize:DeviceInfo.isTablet()?textScale(9):textScale(11),
    marginRight:moderateScale(2),
  },
  priceMoney: {
    color: colors.white,
    fontFamily: 'Poppins-SemiBold',
    fontSize:DeviceInfo.isTablet()?textScale(10):textScale(12)
  },
  priceMoneySale: {
    color: '#d9d9d9',
    textDecorationLine: 'line-through',
    fontSize:DeviceInfo.isTablet()?textScale(10):textScale(12)
  },
  courseContainer:{
    width: moderateScale(220),
    height: DeviceInfo.isTablet()?moderateScaleVertical(250) :moderateScaleVertical(220),
    overflow: 'hidden',
    borderRadius: moderateScale(12),
    marginRight:moderateScale(12),
    backgroundColor:colors.cartGrey
  },
  imageContainer:{
        flex:0.65,

  },
  imageCourse:{
        width:"100%",
        overflow:"hidden",
        height:"100%"
  },
  detailContainer:{
          flex:0.40,
          paddingHorizontal:moderateScale(8),
          paddingVertical:moderateScaleVertical(5)
  },
  textCourseName:{
    fontFamily:fontFamily.Poppins_Medium,
    color:colors.black,
    fontSize: DeviceInfo.isTablet()?textScale(10) :textScale(14),
  },
  textInstructor:{
    fontFamily:fontFamily.Poppins_Regular,
    color:colors.grey57,
    fontSize: DeviceInfo.isTablet()?textScale(8) :textScale(9.5),
  },
  ratingTextGrey:{
    fontFamily:fontFamily.Poppins_Regular,
    color:colors.grey57,
    fontSize: DeviceInfo.isTablet()?textScale(8) :textScale(10),
  },
  priceTextGrey:{
    fontFamily:fontFamily.Poppins_Regular,
    color:colors.grey57,
    fontSize: DeviceInfo.isTablet()?textScale(8) :textScale(14),
    textDecorationLine:"line-through",
    marginRight:moderateScale(3),
  },
  priceMoneyGrey:{
    fontFamily:fontFamily.Poppins_SemiBold,
    color:colors.theme,
    fontSize: DeviceInfo.isTablet()?textScale(8) :textScale(16),
  },




});
