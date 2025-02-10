import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../styles/responsiveSize';
import fontFamily from '../../../../styles/fontFamily';
import colors from '../../../../styles/colors';

import PlayButton from '../../../../assets/images/Icons/playButton.svg';
import LightPlayButton from '../../../../assets/images/Icons/lightPlayIcon.svg';

import GreyTime from '../../../../assets/images/Icons/timeLine.svg';
import NoteIcon from '../../../../assets/images/Icons/notesGray.svg';
import commonStyles from '../../../../styles/commonStyles';
import {BuyLesson} from '../../../../types/uiType';
import navigationStrings from '../../../../constants/navigationStrings';
import {mainStrings} from '../../../../constants/mainstrings';
import { URL } from 'react-native-url-polyfill';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import IconFeat from 'react-native-vector-icons/AntDesign';
import Collapsible from 'react-native-collapsible';
import { ChapterNotes, LessonDetail } from '../AddCourse/AddChapter/ChapterDetail';


const CartLesson: React.FC<BuyLesson> = ({
  chapterName,
  notesQuantity,
  priceLesson,
  timing,
  isFree,
  item,
  instructor,
  handleDetail,

  handleCart,
}) => {
  const [add, setAdd] = useState(false);
  console.log("ohadsodhisioaioadshiaihodsad", item);
  
  const [isCollapsed,setIsCollapsed]=useState(true);
  
  const navigation = useNavigation<any>();
  const fullCourse = useSelector((state: any) => state.cart.fullCourse);
  const handlePlay = (chapterData: any) => {
    
    try {
     

      const urlNew = new URL(chapterData?.videos[0]?.video_url);
      const videoPath = urlNew.pathname.split('/')[1];
      // console.log('pathnamepathnamepathnamepathnamepathnamepathnamepathname',chapterData);
      navigation.navigate(navigationStrings.SampleVideoScreen, {
        videoId: videoPath,
      });
    } catch (error) {
    }
  };
  const documentNameGen = (videoUrl: string) => {
    try {
      const urlNew = new URL(videoUrl);

      const videoPath = urlNew.pathname.split('/')[2];

      return videoPath;
    } catch (error) {}
  };
  return (
    <View style={[commonStyles.spacingCommon]}>
       <View style={[styles.lessonContainer]}>
      <TouchableOpacity style={[styles.btnContainer]} onPress={()=>handlePlay(item)}>
        {isFree || instructor ? <PlayButton /> : <LightPlayButton />}
      </TouchableOpacity>
        
      <TouchableOpacity style={[styles.lessonTitleContainer]} onPress={()=>{setIsCollapsed(!isCollapsed)}}>
        <View style={[styles.chapterNameContainer]}>
          <Text style={[styles.chapterNameText]}>{chapterName}</Text>
          <View
            style={[
              styles.chapterDetailFeatureContainer,
              {gap: moderateScale(4)},
            ]}>
            <View style={[styles.chapterIconRow]}>
              {!isFree && (
                <Text
                  style={[
                    {
                      color: colors.black,
                      marginLeft: moderateScale(2),
                      marginRight: moderateScale(4),
                      fontFamily: fontFamily.Poppins_Bold,
                      fontSize: textScale(14),
                    },
                  ]}>
                  {priceLesson}
                  KD
                </Text>
              )}
              <NoteIcon />
              <Text style={[{color: '#98A2B3', marginLeft: moderateScale(2)}]}>
                {notesQuantity} Notes
              </Text>
            </View>
            <View style={[styles.chapterIconRow]}>
              <GreyTime />

              <Text style={[{color: '#98A2B3', marginLeft: moderateScale(2)}]}>
                  {timing}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      {instructor ? (
        <TouchableOpacity
          onPress={handleDetail}
          style={{width: moderateScale(60)}}>
          <Text
            style={{
              fontFamily: fontFamily.Poppins_Bold,
              fontSize: textScale(14),
              textAlign: 'center',
              color:colors.theme
            }}>
            {mainStrings.ViewDetails}
          </Text>
        </TouchableOpacity>
      ) : (

        <TouchableOpacity style={[styles.buyBtnContainer, {alignItems: 'center'}]}>
          {isFree ? (
            <View style={[styles.buyBtn]}>
              <Text style={[styles.buyBtnText]}>Free</Text>
            </View>
          ) : (
            <>
                <TouchableOpacity
              onPress={() => {
                handleCart(item, 'chapter');
              }}>
              {item?.in_cart ? (
                <View style={[styles.buyBtn]}>
                  <Text style={[styles.buyBtnText]}>Added</Text>
                </View>
              ) : (
                <View
                  style={[
                    styles.buyBtn,
                    {
                      width: moderateScale(40),
                      height: moderateScaleVertical(40),
                      borderRadius: moderateScale(400),
                    },
                  ]}>
                  <Text style={[styles.buyBtnText]}>
                    <Icon name="shopping-cart" color={colors.white} size={16} />
                  </Text>
               
                </View>
              )}
            </TouchableOpacity>
            
            </>
        
          )}
        </TouchableOpacity>
      )}
          <TouchableWithoutFeedback
            style={{padding: moderateScale(6), paddingRight: moderateScale(2)}}
            onPress={() => {
              setIsCollapsed(!isCollapsed);
            }}>
            <IconFeat
              name={isCollapsed ? 'down' : 'up'}
              color={colors.themeDark}
              size={12}
            />
          </TouchableWithoutFeedback>
         
    </View>

     <Collapsible collapsed={isCollapsed}>
        {true && (
          <>
            <FlatList
              renderItem={({item, index}) => 
               {
                
                return  <LessonDetail
                  index={index}
                  item={item}
                  documentNameGen={documentNameGen}
                  canSee={true}
                  segmentIcon={false}
                  
                
                />}
              }
              data={item?.videos}
            />
          </>
        )}
      </Collapsible>
    </View>
 
  );
};

export default CartLesson;

const styles = StyleSheet.create({
  lessonContainer: {
    flexDirection: 'row',
    backgroundColor:"#ff000030",
    alignItems: 'center',
    marginVertical: moderateScaleVertical(12),
  },
  lessonTitleContainer: {
    flex: 5,
  },
  chapterNameContainer: {},

  chapterDetailFeatureContainer: {
    flexDirection: 'row',
    gap: moderateScale(20),
  },
  btnContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyBtnContainer: {
    flex: 1.75,
    marginLeft: moderateScaleVertical(2),
  },
  buyBtn: {
    backgroundColor: colors.themeDark,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(8),
    borderRadius: moderateScale(800),
  },
  buyBtnText: {
    color: colors.white,
    fontSize: textScale(14),
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: fontFamily.Poppins_Regular,
  },
  chapterIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chapterNameText: {
    fontSize: textScale(14),
    color: colors.black,
    fontFamily: fontFamily.Poppins_Medium,
  },
});
