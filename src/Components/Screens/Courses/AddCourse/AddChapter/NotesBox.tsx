import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../../styles/responsiveSize';
import colors from '../../../../../styles/colors';
import fontFamily from '../../../../../styles/fontFamily';
import Icon from 'react-native-vector-icons/EvilIcons';
import TrashIcon from 'react-native-vector-icons/FontAwesome';

import {TouchableOpacity} from 'react-native';

interface NotesType {
  notesName: string;
  notesDesc?: string;
  notesFile?: string;
  handleDelete?: () => void;
  handleEdit?: () => void;
  edit?: boolean;
  deleteCurr?: boolean;
}

const NotesBox: React.FC<NotesType> = ({
  notesDesc,
  notesFile,
  notesName,
  handleDelete,
  edit,
  handleEdit,
  deleteCurr,
}) => {
  return (
    <View style={styles.lessonContainer}>
      <View style={{flex: 1}}>
        <Text style={styles.chapterNameText}>{notesName}</Text>
        <Text style={{color: colors.black}}>{notesFile}</Text>
      </View>
      {deleteCurr && (
        <TouchableOpacity
          onPress={handleDelete}
          style={{
            overflow: 'hidden',
            height: moderateScale(40),
            width: moderateScale(40),
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.white,
            borderRadius: moderateScale(8),
            borderColor: colors.theme,
            marginRight:moderateScale(4),
          }}>
          <TrashIcon
            name="trash-o"
            color={colors.red}
            size={moderateScale(20)}
          />
        </TouchableOpacity>
      )}
      {edit && (
        <TouchableOpacity
          onPress={handleEdit}
          style={{
            overflow: 'hidden',
            height: moderateScale(40),
            width: moderateScale(40),
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.white,
            borderRadius: moderateScale(8),
            borderColor: colors.theme,

          }}>
          {
            <TrashIcon
              name="pencil"
              color={colors.themeDark}
              size={moderateScale(20)}
            />
          }
        </TouchableOpacity>
      )}
    </View>
  );
};

export default NotesBox;

const styles = StyleSheet.create({
  lessonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: moderateScaleVertical(5),
    backgroundColor: colors.boxGreyBlue,
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(8),
    borderRadius: moderateScale(10),
    
  },
  chapterNameText: {
    fontSize: textScale(14),
    color: colors.black,
    fontFamily: fontFamily.Poppins_Medium,
  },
});
