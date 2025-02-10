import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../styles/responsiveSize';
import colors from '../../../styles/colors';
import fontFamily from '../../../styles/fontFamily';
import commonStyles from '../../../styles/commonStyles';

interface commonButtonProps {
  chapter?: string;
  price?: string;
  mainViewStyle?: ViewStyle;
  onPressBtn?: () => void;
}

const ProceddButton: React.FC<commonButtonProps> = ({
  chapter,
  price,
  contentType,
  mainViewStyle,
  onPressBtn,
}) => (
  <TouchableOpacity
    onLayout={({nativeEvent}) => {
      const {height} = nativeEvent.layout;
    }}
    style={[{...styles.btnStyle}, commonStyles.spacing, mainViewStyle]}
    onPress={onPressBtn}>
    <View style={[styles.chapterContainer]}>
      <Text
        style={[
          styles.txtStyle,
          {
            // flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: fontFamily.Poppins_Bold,
            fontSize: textScale(18),
          },
        ]}>
        {contentType === 'full' ? '1' : chapter}
      </Text>
    </View>
    <Text style={[styles.txtStyle, {marginHorizontal: textScale(8)}]}>
      {contentType === 'full'
        ? 'Course '
        : contentType === 'main'
        ? chapter <= 1
        ? 'Course '
        : 'Courses '
        : chapter <= 1
        ? 'Chapter '
        : 'Chapters '}
      Added
    </Text>
    <View
      style={[
        styles.flexContainer,
        {
          justifyContent: 'flex-end',
          flex: 1,
        },
      ]}>
      {!!price && (
        <Text
          style={[
            styles.txtStyle,
            {marginRight: textScale(4), fontSize: textScale(20)},
          ]}>
          {price}
          KD
        </Text>
      )}
      <Text>
        <Icon name="arrowright" color={colors.white} size={24} />
      </Text>
    </View>
  </TouchableOpacity>
);

export default ProceddButton;

const styles = StyleSheet.create({
  btnStyle: {
    // margin: moderateScale(16),
    backgroundColor: colors.theme,
    paddingVertical: moderateScale(10),
    // height:40,
    borderRadius: moderateScale(16),
    // justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  txtStyle: {
    color: colors.white,
    fontSize: textScale(16),
    textAlign: 'center',

    fontFamily: fontFamily.Montserrat_Bold,
  },
  chapterContainer: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    // padding:moderateScale(12),
    height: moderateScaleVertical(40),
    width: moderateScale(40),
    borderRadius: moderateScale(6),
  },
  flexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
