import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import commonStyles from '../../../styles/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../styles/responsiveSize';
import fontFamily from '../../../styles/fontFamily';
import colors from '../../../styles/colors';
import imagePath from '../../../constants/imagePath';
import ThreeDot from 'react-native-vector-icons/Entypo'
import CommonButton from '../../CommonButton';

const DowngradeCourse = () => {
  return (
    <ScrollView>
      <View style={[commonStyles.spacingCommon]}>
        <Text
          style={{
            fontFamily: fontFamily.Poppins_Regular,
            fontSize: textScale(16),
            color: colors.black,
            paddingVertical: moderateScaleVertical(12),
          }}>
          Select Course
        </Text>
        <View style={[styles.courseContainer]}>
          <FlatList
            data={[1, 2, 3]}
            renderItem={() => {
              return (
                <View
                  style={[
                    styles.flexContainer,
                    {
                      borderBottomColor: 'rgba(217, 217, 217, 1)',
                      borderBottomWidth: 1,
                      padding: 16,
                    },
                  ]}>
                  <View>
                    <Image source={imagePath.tickGrey} />
                  </View>

                  <View style={{flex: 1, marginLeft: moderateScale(12)}}>
                    <View style={[styles.flexContainer, {flex: 1,marginBottom:moderateScale(4)}]}>
                      <Text
                        style={{
                          fontFamily: fontFamily.Poppins_Medium,
                          fontSize: moderateScaleVertical(16),
                          color: '#101828',
                          marginRight:moderateScale(8),
                          // flex: 1,
                        }}>
                        Full Course
                      </Text>
                      <View style={[styles.labelCourseType]}>
                        <Text style={[styles.labelCourseText]}>in-person</Text>
                      </View>
                    </View>
                    <Text style={styles.description}>
                      In-Person course features will be downgraded to Online
                    </Text>
                  </View>

                  {
                    <TouchableOpacity style={styles.playButton}>
                      <Text style={styles.playButtonText}>Downgrade</Text>
                    </TouchableOpacity>
                  }
                </View>
              );
            }}
          />
        </View>

        <View style={[styles.newSubsContainer]}>
          <Text
            style={{
              fontFamily: fontFamily.Poppins_SemiBold,
              color: colors.black,
              fontSize: textScale(16),
            }}>
            New Subscription
          </Text>
        </View>

        <FlatList
          data={[1, 2, 3]}
          renderItem={() => {
            return (
                <View style={{
                    borderBottomColor: 'rgba(217, 217, 217, 1)',
                    borderBottomWidth: 1,
                    // padding: moderateScaleVertical(16),
                }}>
  <View
                style={[
                  styles.flexContainer,
                  {
                    paddingHorizontal: moderateScaleVertical(16),
                    
                    marginTop:moderateScale(12),
                  },
                ]}>
                <Text
                  style={{
                    fontFamily: fontFamily.Poppins_Medium,
                    fontSize: textScale(14),
                    color: colors.black,
                    marginRight:moderateScale(3),
                  }}>
                  Course 2
                </Text>

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
                    1m30s
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
                    1m30s
                  </Text>
                </View>
              </View>
              <View style={[styles.flexContainer,{padding: 16}]}>
                <View style={[styles.flexContainer,{flex:1}]}>
                <Text
                  style={{
                    fontFamily: fontFamily.Poppins_Medium,
                    fontSize: textScale(14),
                    color: colors.black,
                  }}>
                 Subscription : {" "}
                </Text>
                <View style={[styles.labelCourseType]}>
                        <Text style={[styles.labelCourseText]}> Online</Text>
                </View>
                    
                </View>
                <TouchableOpacity>
                    <ThreeDot name='dots-three-vertical' color={colors.black} size={moderateScale(16)}/>
                </TouchableOpacity>
             
              </View>
                </View>
            
            );
          }}
        />
      <CommonButton onPressBtn={()=>{}} btnText='Submit Request' mainViewStyle={{marginHorizontal:0,marginTop:moderateScale(40)}}/>
      </View>


    </ScrollView>
  );
};

export default DowngradeCourse;

const styles = StyleSheet.create({
  flexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  courseContainer: {
    backgroundColor: '#F0F4F8',
    // paddingVertical: moderateScale(16),
    // paddingHorizontal: moderateScale(20),
    overflow: 'hidden',
    borderRadius: moderateScale(12),
  },
  labelCourseType: {
    backgroundColor: `${colors.themeOrange}12`,
    paddingVertical: moderateScale(4),
    width: moderateScale(74),
    borderRadius: moderateScale(300),
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelCourseText: {
    fontFamily: fontFamily.Poppins_Regular,
    color: colors.themeOrange,
    fontSize: moderateScale(12),
  },
  description: {
    fontFamily: fontFamily.Poppins_Regular,
    color: colors.black,
    fontSize: moderateScale(12),
  },
  newSubsContainer: {
    marginVertical: moderateScale(24),
  },
  chapterIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(2),
  },
});
