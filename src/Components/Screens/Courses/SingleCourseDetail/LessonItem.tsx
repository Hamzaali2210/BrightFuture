import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../styles/responsiveSize';
import fontFamily from '../../../../styles/fontFamily';
import colors from '../../../../styles/colors';

import PlayButton from '../../../../assets/images/Icons/playButton.svg';

import GreyTime from '../../../../assets/images/Icons/timeLine.svg';
import NoteIcon from '../../../../assets/images/Icons/notesGray.svg';
import commonStyles from '../../../../styles/commonStyles';
import { useNavigation } from '@react-navigation/native';
import navigationStrings from '../../../../constants/navigationStrings';

function LessonItem() {
  const navigation = useNavigation();
  const handlePlay=()=>{
      navigation.navigate(navigationStrings.ViewDetails as never)
  }
  return (
    <View style={[styles.lessonContainer, commonStyles.spacingCommon]}>
      <View style={[styles.btnContainer]}>
        <PlayButton />
      </View>
      <View style={[styles.lessonTitleContainer]}>
        <View style={[styles.chapterNameContainer]}>
          <Text style={[styles.chapterNameText]}>1. What is UI/UX design</Text>
          <View style={[styles.chapterDetailFeatureContainer, { gap: moderateScale(4) }]}>
            <View style={[styles.chapterIconRow]}>
              <NoteIcon />

              <Text style={[{ color: '#98A2B3', marginLeft: moderateScale(2) }]}>
                4 Notes
              </Text>
            </View>
            <View style={[styles.chapterIconRow]}>
              <GreyTime />

              <Text style={[{ color: '#98A2B3', marginLeft: moderateScale(2) }]}>
                60m45s
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={[styles.buyBtnContainer]}>
        <TouchableOpacity onPress={handlePlay}>
          <View style={[styles.buyBtn]}>
            <Text style={[styles.buyBtnText]}>Play</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default LessonItem;

const styles = StyleSheet.create({
  lessonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: moderateScaleVertical(5),
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
    flex: 1.5,
  },
  buyBtn: {
    backgroundColor: colors.themeDark,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(5),
    borderRadius: moderateScale(800),
  },
  buyBtnText: {
    color: colors.white,
    fontSize: textScale(16),

    fontFamily: fontFamily.Poppins_SemiBold,
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
