import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Easing,
  Button,
  ScrollView,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Animated, {
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../../../styles/colors';
import { mainStrings } from '../../../../constants/mainstrings';
import fontFamily from '../../../../styles/fontFamily';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
  verticalScale,
} from '../../../../styles/responsiveSize';
import commonStyles from '../../../../styles/commonStyles';

import FolderIcon from '../../../../assets/images/Icons/folderIcon.svg';
import DownloadIcon from '../../../../assets/images/Icons/download.svg';
import PrintIcon from '../../../../assets/images/Icons/print.svg';
import ShareIcon from '../../../../assets/images/Icons/share.svg';

interface Assigments {
  pageCurrent?: number;
}

function NotesFunction() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ marginRight: moderateScale(10) }}>
        <FolderIcon />
      </View>
      <View style={[styles.notesDetailContainer]}>
        <View style={[styles.notesDetailHeading]}>
          <Text style={[styles.notesHeading]}>Notes file Name</Text>
          <View style={{ flexDirection: 'row', gap: moderateScale(12) }}>
            <TouchableOpacity>
              <PrintIcon />
            </TouchableOpacity>
            <TouchableOpacity>
              <DownloadIcon />
            </TouchableOpacity>
            <TouchableOpacity>
              <ShareIcon />
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.notesDetailPara]}>
          <Text
            style={{
              fontFamily: fontFamily.Poppins_Regular,
              fontSize: textScale(13),
              color: colors.blackGreyMedium,
            }}
          >
            Includes all the resources you will need to get started
          </Text>
        </View>
      </View>
    </View>
  );
}

const Assigment: React.FC<Assigments> = ({pageCurrent}) => {
  const width = useSharedValue(0);
  const [progressBar, setProgressBar] = useState({
    init: true,
    assignment: true,
    completed: false,
  });



  useEffect(() => {
    if (pageCurrent == 3) {
      withTiming(width.value + 200, {
        duration: 1000,
        easing: Easing.linear,
      });
    }
  }, [pageCurrent]);

  return (
    <ScrollView
      nestedScrollEnabled
      contentContainerStyle={[styles.container, commonStyles.spacingCommon]}>
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: moderateScaleVertical(12),
          }}>
          <Text
            style={[
              styles.headingText,
              { color: colors.theme, flex: 1, fontSize: textScale(13) },
            ]}
          >
            1. {mainStrings.Assignments} (1/5)
          </Text>
          <Text
            style={[
              styles.headingText,
              {fontFamily: fontFamily.Poppins_Medium, fontSize: textScale(13)},
            ]}>
            Next Assignments
            {'>'}
          </Text>
        </View>
        <View
          style={[styles.greyContainer, {paddingVertical: verticalScale(16)}]}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View
              style={{
                alignItems: 'center',
                flex: 1,
                flexDirection: 'row',
                overflow: 'hidden',
              }}>
              <View style={{alignItems: 'center'}}>
                <Icon
                  name={
                    progressBar?.init
                      ? 'radio-button-on-sharp'
                      : 'radio-button-off-sharp'
                  }
                  color="#094E85"
                  size={26}
                />

                <Text
                  style={{
                    fontFamily: fontFamily.Poppins_Medium,
                    fontSize: textScale(12),
                    color: colors.black,
                  }}>
                  Start
                </Text>
                <Text
                  style={{
                    fontFamily: fontFamily.Poppins_Medium,
                    fontSize: textScale(10),
                    color: colors.black,
                  }}>
                  12 Jan 2023
                </Text>
              </View>
              <View
                style={{
                  height: 2,
                  width: '100%',
                  backgroundColor: progressBar?.assignment
                    ? colors.theme
                    : colors.blackGreyMedium,
                }}>
              </View>
            </View>
            <View
              style={{
                alignItems: 'center',
                flex: 1,
                flexDirection: 'row',
                overflow: 'hidden',
              }}>
              <View style={{alignItems: 'center'}}>
                <Icon
                  name={
                    progressBar?.assignment
                      ? 'radio-button-on-sharp'
                      : 'radio-button-off-sharp'
                  }
                  color="#094E85"
                  size={26}
                />

                <Text
                  style={{
                    fontFamily: fontFamily.Poppins_Medium,
                    fontSize: textScale(12),
                    color: colors.black,
                  }}>
                  Start
                </Text>
                <Text
                  style={{
                    fontFamily: fontFamily.Poppins_Medium,
                    fontSize: textScale(10),
                    color: colors.black,
                  }}>
                  12 Jan 2023
                </Text>
              </View>
              <View
                style={{
                  height: 2,
                  width: '100%',
                  backgroundColor: progressBar?.assignment
                    ? colors.theme
                    : colors.blackGreyMedium,
                }}>
              </View>
            </View>
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                overflow: 'hidden',
              }}>
              <View style={{alignItems: 'center'}}>
                <Icon
                  name={
                    progressBar?.completed
                      ? 'radio-button-on-sharp'
                      : 'radio-button-off-sharp'
                  }
                  color="#094E85"
                  size={26}
                />

                <Text
                  style={{
                    fontFamily: fontFamily.Poppins_Medium,
                    fontSize: textScale(12),
                    color: colors.black,
                  }}>
                  Start
                </Text>
                <Text
                  style={{
                    fontFamily: fontFamily.Poppins_Medium,
                    fontSize: textScale(10),
                    color: colors.black,
                  }}>
                  12 Jan 2023
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View>
        <Text style={styles.headingText}>{mainStrings.Tasks}</Text>
        <View style={[styles.greyContainer]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{marginRight: moderateScale(10)}}>
              <FolderIcon />
            </View>
            <Text style={styles.fileText}>Photosynthesis.pdf</Text>

            <Text style={styles.priceText}>Price : 20 KD</Text>
          </View>
        </View>
      </View>
      <View>
        <Text style={styles.headingText}>{mainStrings.Description}</Text>
        <Text
          style={{
            fontFamily: fontFamily.Poppins_Regular,
            color: colors.black,
            fontSize: textScale(12),
          }}>
          Description: Photosynthesis is a fundamental process in biology, where
          plants, algae, and some bacteria convert light energy into chemical
          energy in the form of glucose. Here's a simplified overview:
        </Text>
      </View>
      <View style={{marginBottom: moderateScale(20)}}>
        <Text style={styles.headingText}>{mainStrings.Notes}</Text>
        <View
          style={[
            styles.greyContainer,
            {
              paddingHorizontal: moderateScale(16),
              gap: moderateScaleVertical(24),
              paddingVertical: moderateScale(16),
            },
          ]}>
          <NotesFunction />
          <NotesFunction />
          <NotesFunction />
          <NotesFunction />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginTop: moderateScaleVertical(10),
    gap: moderateScaleVertical(16),
  },
  headingText: {
    fontFamily: fontFamily.Poppins_SemiBold,
    fontSize: textScale(16),
    marginVertical: moderateScaleVertical(8),
    color: colors.black,
  },
  greyContainer: {
    paddingVertical: moderateScaleVertical(10),
    paddingHorizontal: moderateScale(12),
    backgroundColor: colors.containerGrey,
    borderRadius: moderateScale(4),
    overflow: 'hidden',
  },
  fileText: {
    flex: 1,
    fontFamily: fontFamily.Poppins_Medium,
    fontSize: textScale(13),
    color: colors.black,
  },
  priceText: {
    fontFamily: fontFamily.Poppins_Bold,
    color: colors.themeDark,

    fontSize: textScale(14),
  },
  notesDetailContainer: {
    marginRight: moderateScale(16),
    width: '90%',
    gap: moderateScaleVertical(4),
  },
  notesDetailHeading: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notesHeading: {
    fontSize: textScale(15),
    color: colors.black,
    fontFamily: fontFamily.Poppins_Medium,
    flex: 1,
  },
  notesDetailPara: {},
});

export default Assigment;
