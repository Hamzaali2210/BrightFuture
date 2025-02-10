import React, {useEffect, useState} from 'react';
import {Button, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import RightIcon from 'react-native-vector-icons/AntDesign';
import imagePath from '../../../../../constants/imagePath';
import colors from '../../../../../styles/colors';
import fontFamily from '../../../../../styles/fontFamily';
import Collapsible from 'react-native-collapsible';

import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../../styles/responsiveSize';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

interface ChapterDetailProgressInterface {
  notesNumber?: number;
  duration?: string;
}

const ChapterDetailProgressEdit: React.FC<ChapterDetailProgressInterface> = ({
  notesNumber,
  duration,
}) => {
  const [calculateHeight, setCalculateHeight] = useState('60%');
  const [isCollapsed,setIsCollapsed] = useState(true);
  const steps = [0,1,2,3,4];
  const [currentStep, setCurrentStep] = useState(0);


  console.log("currentStepcurrentStepcurrentStepcurrentStepcurrentStepcurrentStep", currentStep);
  const handleNextStep = () => {
       setCurrentStep(prevStep => (prevStep < steps.length - 1 ? prevStep + 1 : prevStep));
  };
  const handleCollapsed = ()=>{
      setIsCollapsed(!isCollapsed)
  }
 
  return (
    <View style={styles.container}>
      
      <TouchableOpacity style={styles.flexContainer} onPress={handleCollapsed}>
        <View style={[styles.btnContainer]}>
          <Image
            style={{width: moderateScale(28), height: moderateScale(28)}}
            source={imagePath.playIcon}
          />
        </View>
        <View style={[styles.lessonTitleContainer]}>
          <View style={[styles.chapterNameContainer]}>
            <Text style={[styles.chapterNameText]}>First Chapter</Text>
            <View
              style={[
                styles.chapterDetailFeatureContainer,
                {gap: moderateScale(4)},
              ]}>
              <View style={styles.priceLabel}>
                <Text style={styles.textLabel}>200 kD</Text>
              </View>
              <View style={[styles.chapterIconRow]}>
                <Image
                  style={{width: moderateScale(14), height: moderateScale(14)}}
                  source={imagePath.notesIcon}
                />
                <Text
                  style={[
                    {
                      color: colors.black,
                      fontSize: textScale(12),
                      marginLeft: moderateScale(2),
                    },
                  ]}>
                  {notesNumber}3 Lessons
                </Text>
              </View>
              <View style={[styles.chapterIconRow]}>
                <Image
                  style={{
                    width: moderateScale(12),
                    height: moderateScaleVertical(10),
                  }}
                  source={imagePath.eyeIcon}
                />

                <Text
                  style={[
                    {
                      color: colors.black,
                      fontSize: textScale(12),
                      marginLeft: moderateScale(2),
                    },
                  ]}>
                  {duration} 1m30s
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View>
          <RightIcon
            name="right"
            color={'rgba(0,0,0,0.5)'}
            size={moderateScale(14)}
          />
        </View>
      </TouchableOpacity>
      

      <Collapsible collapsed={isCollapsed}>
      {Array(5)
        .fill()
        .map((_, index) => {
          const progress = useSharedValue(currentStep >= index ? 1 : 0);

          useEffect(() => {
              progress.value = withTiming(currentStep >= index ? 1 : 0);
          }, [currentStep]);

          const animatedIconStyle = useAnimatedStyle(() => {
              return {
                  backgroundColor: progress.value === 1 ? colors.theme : 'grey',
                  transform: [{ scale: withSpring(progress.value === 1 ? 1.2 : 1) }],
              };
          });

          const animatedLineStyle = useAnimatedStyle(() => {
              return {
                  backgroundColor: progress.value === 1 ? colors.theme : 'grey',
                  height: withTiming(progress.value === 1 ? 80 : 80),
              };
          });
          return <View style={styles.lessonContainer}>
            <View key={index} style={styles.lesson}>
              <View style={{alignItems:"center", marginRight: moderateScale(16),}}>
              <Image
                style={{
                  width: moderateScale(15),
                  height: moderateScale(15),
                 
                }}
                source={index<=currentStep+1?imagePath?.blueIcon:imagePath.greyIcon}
              />
               {index<steps.length-1 && (
                            <Animated.View style={[styles.line, animatedLineStyle]} />
                        )}
              </View>
             
              <View style={[styles.lessonTitleContainer]}>
                <View style={[styles.chapterNameContainer]}>
                  <Text style={[styles.chapterNameText]}>First Chapter</Text>
                  <View
                    style={[
                      styles.chapterDetailFeatureContainer,
                      {gap: moderateScale(4)},
                    ]}>
                    <View style={[styles.chapterIconRow]}>
                      <Image
                        style={{
                          width: moderateScale(12),
                          height: moderateScale(12),
                        }}
                        source={imagePath.timeBlack}
                      />
                      <Text
                        style={[
                          {
                            color: colors.black,
                            fontSize: textScale(12),
                            marginLeft: moderateScale(2),
                          },
                        ]}>
                        {notesNumber}3 Lessons
                      </Text>
                    </View>
                    <View style={[styles.chapterIconRow]}>
                      <Image
                        style={{
                          width: moderateScale(12),
                          height: moderateScaleVertical(10),
                        }}
                        source={imagePath.notesIcon}
                      />

                      <Text
                        style={[
                          {
                            color: colors.black,
                            fontSize: textScale(12),
                            marginLeft: moderateScale(2),
                          },
                        ]}>
                        {duration} 1m30s
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{alignSelf:"flex-start"}}>
              <TouchableOpacity style={styles.playButton}>
                <Text style={styles.playButtonText}>Play</Text>
              </TouchableOpacity>
              </View>
            
            </View>
            <View
              style={[
                ,
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 0,
                  paddingHorizontal: moderateScale(38),
                  paddingTop: moderateScaleVertical(12),
                },
              ]}>
              <Image
                style={{
                  width: moderateScale(20),
                  height: moderateScale(20),
                  marginRight: moderateScale(16),
                }}
                source={imagePath.notesLight}
              />
              <Text
                style={{
                  fontFamily: fontFamily.Poppins_Medium,
                  color: colors.black,
                  fontSize: textScale(12),
                }}>
                Photosynthesis.pdf
              </Text>
            </View>
          </View>
        })}
      </Collapsible>
     
    </View>
  );
};

export default ChapterDetailProgressEdit;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightThemeBlue,
    padding: moderateScale(16),
    borderRadius: moderateScale(12),
    marginVertical: moderateScaleVertical(12),
    overflow:"hidden",
    // flexGrow: 1,
    // alignItems: 'center'
  },
  flexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: 1,
    paddingVertical: moderateScaleVertical(12),
  },
  lessonContainer: {
    paddingVertical: moderateScaleVertical(16),
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: 1,
   
    // marginBottom:moderateScaleVertical(12),
  },
  chapter: {
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
  },
  chapterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  chapterInfo: {
    fontSize: 14,
    color: '#888',
  },
  lesson: {
    // width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // overflow:"hidden",
    // backgroundColor:"yellow",

    // paddingVertical:moderateScaleVertical(10),
    paddingHorizontal: moderateScale(12),

    // borderLeftWidth: 3,
    // borderLeftColor: '#007BFF',
    // paddingLeft: 10,
    // backgroundColor: '#fff',
    // padding: 10,
    // borderRadius: 5,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 5,
    elevation: 5,
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  lessonDetails: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  lessonLink: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileIcon: {
    width: 16,
    height: 16,
    marginRight: 5,
  },
  playButton: {
    backgroundColor: colors.theme,
    paddingVertical: moderateScaleVertical(4),
    paddingHorizontal: moderateScaleVertical(8),
    borderRadius: 500,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  playButtonText: {
    color: '#fff',
    fontFamily: fontFamily.Poppins_Medium,
    fontSize: textScale(12),
  },
  btnContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lessonTitleContainer: {
    flex: 5,
    alignSelf:"flex-start",
  },
  chapterNameContainer: {},

  chapterDetailFeatureContainer: {
    flexDirection: 'row',
    gap: moderateScale(20),
  },
  chapterIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(2),
  },
  chapterNameText: {
    fontSize: textScale(14),
    color: '#101828',
    fontFamily: fontFamily.Poppins_Medium,
  },
  line: {
    width: 2,
    marginVertical: 5,
    position:"absolute",
    top:14,

    // bottom:12
    
},
priceLabel:{
  backgroundColor:`${colors.theme}10`,
  padding:moderateScale(2),
  paddingHorizontal:moderateScale(8),
  borderRadius:moderateScale(120),
},
textLabel:{
  fontFamily:fontFamily.Poppins_SemiBold,
  fontSize:moderateScale(12),
  color:colors.theme,


}
});
