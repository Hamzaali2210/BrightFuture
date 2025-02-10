import { BlurView } from '@react-native-community/blur';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
  verticalScale,
  width
} from '../../../styles/responsiveSize';
import { CoursesHomeItemProps } from '../../../types/componentInterface';

import StarIcon from '../../../assets/images/Icons/goldStar.svg';
import colors from '../../../styles/colors';

import navigationStrings from '../../../constants/navigationStrings';
import ModalCard from '../../Layout/Card/ModalCard';
import AddReview from '../Courses/AddReview';
import DeviceInfo from 'react-native-device-info';
import fontFamily from '../../../styles/fontFamily';


const SAMPLE_IMAGE =
'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

const PurchasedCourseItem: React.FC<CoursesHomeItemProps> = ({
  title,
  subject,
  price,
  dueDate,
  discountPrice,
  rating,
  courseId,
  imageCover,
  orderNumber,
  orderStatus,
  itemId,
  courseCode,
  reviewAdded,
  instrutorAvatar,
  instructorName,
  refetch,
  
}) => {
  const navigation = useNavigation<any>();
  const [isModalVisible,setIsModalVisible]=useState(false);
  
  const handleAddReview=()=>{
        setIsModalVisible(!isModalVisible)
  }

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(navigationStrings.PurchasedCourseDetail,{purchasedId:itemId,courseId:courseId});
      }}>
      <View style={[styles.container]}>

         {dueDate && <View style={[styles.dueContainer]}>
            <Text style={{fontFamily:fontFamily.Poppins_SemiBold,color:colors.white,fontSize:14,}}>Due</Text>
          </View>}

        <ImageBackground
          source={{uri:imageCover || SAMPLE_IMAGE}}
          resizeMode="cover"
          style={styles.image}>
          <View style={styles.blurBack}>
            <BlurView
              style={styles.absolute}
              blurType="ultraThinMaterialDark"
              blurAmount={5}
              reducedTransparencyFallbackColor="white"
            />
            <View style={[styles.blurContainer]}>
              <View style={[styles.textRowContainer]}>
                <View style={styles.courseYellow}>
                <Text style={[styles.textSubject,{marginTop:DeviceInfo?.isTablet()?moderateScaleVertical(2):0}]}>{subject}</Text>
                </View>
               
                <View style={[styles.starTextCont]}>
                  <Text style={[styles.ratingText]}>{(Number(rating))}</Text>
                  <StarIcon width={textScale(10)} height={textScale(10)} />
                </View>
              </View>
              <Text style={[styles.textCourse]}>{title}</Text>
              
              <View style={[styles.priceText]}>
                <View
                  style={[
                    styles.starTextCont,
                    {
                      flex: 1,
                      gap: moderateScale(4),
                      justifyContent: 'flex-start',
                    },
                  ]}>
                  <View style={[styles.labelContainer]}>
                    <View style={[styles.labelGreen]}>
                      <Text style={[styles.labelTextWhite]}>{orderStatus}</Text>
                    </View>
                   {!reviewAdded &&  <TouchableOpacity onPress={handleAddReview}
                      style={[styles.labelGreen, {backgroundColor: '#094E85'}]}>
                      <Text style={[styles.labelTextWhite]}>Add Review</Text>
                    </TouchableOpacity>}
                  </View>

                  {/* <Text style={[styles.priceMoney]}>{price}KD</Text> */}
                </View>
              </View>
            </View>
          </View>
          <View style={[styles.labelYellow]}>
            <Text style={[styles.labelText]}>{orderNumber}</Text>
          </View>
        </ImageBackground>
      
      </View>

      <ModalCard isModalVisible={isModalVisible} toggleModal={handleAddReview} isCancel>
          <AddReview courseId={courseId} toggleModal={handleAddReview} title={title} refetch={refetch}/>
      </ModalCard>
     
    </TouchableOpacity>
  );
};

export default PurchasedCourseItem;

const styles = StyleSheet.create({
  dueContainer:{
      position:"absolute",
      top:20,
      right:10,
      zIndex:1000,
      paddingVertical:moderateScale(6),
      paddingHorizontal:moderateScale(16),
      borderRadius:moderateScale(20),
      backgroundColor:colors.red,
  },
  container: {
    width: DeviceInfo?.isTablet()?width-120:null,
    position:"relative",
    height:DeviceInfo?.isTablet()?moderateScaleVertical(320):moderateScaleVertical(220),
    overflow: 'hidden',
    marginHorizontal:DeviceInfo.isTablet()?moderateScale(6):"auto",
    
    borderRadius: moderateScale(12),
    marginVertical:DeviceInfo.isTablet()?moderateScaleVertical(12):moderateScaleVertical(20),
  },
  textRowContainer: {
    flexDirection: 'row',
    alignItems:"center"
  },
  courseYellow:{
    backgroundColor: '#FFBA00',
    paddingVertical: moderateScaleVertical(4),
    paddingHorizontal: moderateScale(7),
    height:moderateScaleVertical(30),
    // alignSelf:"flex-start",
    // marginBottom:moderateScaleVertical(3),
    // justifyContent: 'flex-end',
    alignItems: 'center',
   
    justifyContent:"center",
    marginRight:moderateScale(10),
    // flexDirection: 'row',

    borderRadius: moderateScale(20),
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
  labelContainer: {
    flexDirection: 'row',
    gap: moderateScale(10),
  },
  labelGreen: {
    backgroundColor: '#53B914',
    paddingVertical: moderateScaleVertical(4),
    paddingHorizontal: moderateScale(10),
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',

    borderRadius: moderateScale(20),
  },
  labelText: {
    fontFamily: 'Urbanist-SemiBold',
    color: colors.black,
    fontSize:DeviceInfo?.isTablet()?textScale(9):textScale(16),
  },
  labelTextWhite: {
    fontFamily: 'Urbanist-Bold',
    color: colors.white,
    fontSize:DeviceInfo?.isTablet()?textScale(8):textScale(14)
  },
  blurBack: {
    marginHorizontal: moderateScale(10),
    padding: moderateScale(10),
    paddingVertical: moderateScaleVertical(16),
    borderRadius: moderateScale(8),
    marginBottom: moderateScaleVertical(10),
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
    fontFamily: 'Urbanist-SemiBold',
    color: colors.black,
    fontSize: DeviceInfo?.isTablet()?textScale(8):textScale(16),
    flex: 1,
    textAlign:"center",
  },
  textCourse: {
    fontFamily: 'Poppins-Bold',
    color: colors.white,
    fontSize:  DeviceInfo?.isTablet()?textScale(12):textScale(16),
  },
  priceText: {
    flexDirection: 'row',
  },
  starTextCont: {
    flexDirection: 'row',
    alignItems: 'center',
    gap:moderateScale(2)
  },
  ratingText: {
    color: colors.white,
    fontFamily: 'Poppins-SemiBold',
    fontSize: DeviceInfo?.isTablet()?textScale(10):textScale(14),
  },
  priceMoney: {
    color: '#FFBA00',
    fontFamily: 'Poppins-Bold',
    fontSize:DeviceInfo?.isTablet()?textScale(12):textScale(16),
    flex: 1,
    textAlign: 'right',
  },
  priceMoneySale: {
    color: '#d9d9d9',
    textDecorationLine: 'line-through',
  },
});
