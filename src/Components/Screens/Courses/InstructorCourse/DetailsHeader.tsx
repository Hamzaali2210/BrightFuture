import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import React, {useEffect, useState} from 'react';
import { URL } from 'react-native-url-polyfill';

import Icon from 'react-native-vector-icons/FontAwesome6';
import OnIcon from 'react-native-vector-icons/Octicons';
import SendMsgIcon from '../../../../assets/images/Icons/sendMsgIcon.svg';
import BackBtn from '../../../../assets/images/Icons/backBtn.svg';
import colors from '../../../../styles/colors';
import fontFamily from '../../../../styles/fontFamily';
import CartIcon from '../../../../assets/images/Icons/cart.svg';
import VerifyTickIcon from '../../../../assets/images/Icons/verifyBlack.svg';

import IconAnt from 'react-native-vector-icons/AntDesign';

import {
  moderateScale,
  moderateScaleVertical,
  scale,
  textScale,
} from '../../../../styles/responsiveSize';
import commonStyles from '../../../../styles/commonStyles';
import imagePath from '../../../../constants/imagePath';
import usePostData from '../../../../hooks/usePostData';
import {endpoints} from '../../../../utils/endpoints';
import {showError, showSuccess} from '../../../../utils/helperFunctions';

import {CourseDataInterface} from '../../../../types/uiType';
import CustomTab from '../../../Layout/TabLayout/CustomTab';
import useGetData from '../../../../hooks/useGetData';
import { useNavigation } from '@react-navigation/native';
import navigationStrings from '../../../../constants/navigationStrings';
import SampleVimeo from '../../../Layout/Video/SampleVimeo';

type courseDataType = {
  data: CourseDataInterface;
};
interface DetailsHeaderProps {
  handleBack: () => void;
  videoIdBack:string;
 chapterData: any;
 lessonNo:number,
}




const DetailsHeader: React.FC<DetailsHeaderProps> = ({
  handleBack,
  chapterData,
  lessonNo,
  videoIdBack,
}) => {

  const navigation = useNavigation<any>()
    const [videoId,setVideoId]=useState('')
  useEffect(()=>{
    try {
      
      const urlNew = new URL(chapterData?.data?.videos[0]?.video_url)
       const videoPath =  urlNew.pathname.split('/')[1]

       setVideoId(videoPath as string)
       
      // console.log('pathnamepathnamepathnamepathnamepathnamepathnamepathname',chapterData);
      // navigation.navigate(navigationStrings.SampleVideoScreen,{videoId:videoPath})
    } catch (error) {
    }
  },[])

  

  // const handlePlay=(chapterData:any)=>{
    
    
    
      
      
  // }

 



  return (
    <View style={{marginBottom: moderateScale(10)}}>
      <View style={{height: 150}}>
        <ImageBackground
          source={imagePath.mathBlue}
          resizeMode="cover"
          style={styles.backImg}>
          <View style={[styles.backImgContainer, commonStyles.spacingCommon]}>
            <TouchableOpacity style={{flex: 1}} onPress={handleBack}>
              <BackBtn />
            </TouchableOpacity>
          </View>
         
        
        </ImageBackground>
      </View>
      <View style={styles.thumbnailContainer}>
        {/* <View style={styles.thumbnailImageContainer}>
          <Image source={imagePath.sampleThumbanail} style={styles.img} />
          <View
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              height: moderateScale(55),
              position: 'absolute',
              bottom: 0,
              width: '100%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                height: '100%',
              }}>
              <TouchableOpacity>
                <Icon name="shuffle" color={colors.white} size={25} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon name="backward-step" color={colors.white} size={30} />
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>handlePlay(chapterData)}>
                <Icon name="play-circle" color={colors.white} size={40} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon name="forward-step" color={colors.white} size={30} />
              </TouchableOpacity>
              <TouchableOpacity>
                <OnIcon name="screen-full" color={colors.white} size={25} />
              </TouchableOpacity>
            </View>
          </View>
        </View> */}
        {/* <View style={styles.thumbnailImageContainer}>
          <SampleVimeo videoId={videoIdBack}/>
        </View> */}
      </View>
      <View style={[{gap: moderateScale(6)}, commonStyles.spacingCommon,{marginTop:moderateScaleVertical(30)}]}>
        {/* <Text style={[styles.headerTitle]}>{name}</Text> */}
        <Text style={[styles.headerTitle, {fontSize: textScale(22)}]}>
          Lesson {lessonNo}
        </Text>
        <Text style={[styles.headerTitle]}>
         {chapterData?.data?.name}
         
        </Text>
      </View>

      <View style={[styles.aboutContainer, commonStyles.spacingCommon]}>
        <Text style={[styles.headerTitle, {fontSize: textScale(16)}]}>
          About
        </Text>
        <Text style={[styles.aboutTitle, {fontSize: textScale(12)}]}>
         {chapterData?.data?.courses?.description}
        </Text>
       
      </View>


    </View>
  );
};

export default DetailsHeader;

const styles = StyleSheet.create({
  backImg: {
    // flex: 1,
    paddingVertical: moderateScaleVertical(40),
    flexDirection: 'row',

    alignItems: 'center',
  },
  img: {
    width: '100%',
  },
  backImgContainer: {
    marginTop: moderateScaleVertical(20),
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  headerTitle: {
    fontFamily: fontFamily.Poppins_SemiBold,
    fontSize: textScale(18),
    color: colors.black,
  },
  instructorDetail: {},
  buyCourseDetail: {
    alignItems: 'center',
    marginBottom: moderateScale(20),
    // height:150,
  },
  instructorDetailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  instructorDetailImageContainer: {
    width: moderateScale(25),
    height: moderateScaleVertical(25),
    overflow: 'hidden',
    borderRadius: moderateScale(100),
    marginLeft: moderateScale(12),
    marginRight: moderateScale(6),
    justifyContent: 'center',
  },
  instructorDetailImage: {
    width: '100%',
    height: '100%',
  },
  backGreyContainer: {
    backgroundColor: colors.containerGrey,

    marginTop: moderateScaleVertical(14),
    paddingVertical: moderateScaleVertical(18),
  },
  greyContainerTextContainer: {
    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'space-between',
  },
  greyContainerText: {
    alignItems: 'center',
    color: colors.black,
  },
  greyContTextHeading: {
    fontFamily: fontFamily.Poppins_Medium,
    color: colors.black,
    fontSize: textScale(18),
  },
  greyContTextSubHeading: {
    fontFamily: fontFamily.Poppins_Regular,
    color: colors.blackGreyDark,
    fontSize: textScale(14),
  },
  thumbnailContainer: {
    alignItems: 'center',
    // flex: 0.4,
    // backgroundColor:"pink"
  },

  thumbnailImageContainer: {
    width: '100%',
    // borderRadius: moderateScale(12),
    // height: '100%',
    height:moderateScaleVertical(220),

    position: 'relative',
    bottom: moderateScale(20),
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.theme,
  },
  btnContainer: {
    backgroundColor: colors.themeDark,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(40),
    paddingVertical: moderateScale(12),
    borderRadius: moderateScale(20),
    gap: moderateScale(10),
    justifyContent: 'center',
  },
  aboutContainer: {
    marginVertical: moderateScaleVertical(12),
  },
  aboutTitle:{
    fontFamily:fontFamily.Poppins_Regular,
    color:colors.grey1,
    marginTop:moderateScaleVertical(12),
  }
});
