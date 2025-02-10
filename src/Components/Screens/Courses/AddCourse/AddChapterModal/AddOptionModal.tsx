import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import imagePath from '../../../../../constants/imagePath';
import colors from '../../../../../styles/colors';
import commonStyles from '../../../../../styles/commonStyles';
import fontFamily from '../../../../../styles/fontFamily';

import TrashIcon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import {
    moderateScale,
    moderateScaleVertical,
    textScale
} from '../../../../../styles/responsiveSize';

interface AddNewModalInterface {
  toggleModal?: () => void;
  refetch?: () => void;
  handleModal: (id: number) => void;
}

const AddOptionModal: React.FC<AddNewModalInterface> = ({
  toggleModal,
  refetch,
  handleModal,
  chapterName,
  handleEdit,
  deleteChapterModal,
  setDeleteChapterModal
}) => {
  const [selected, setSelected] = useState<number>(0);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  
  function handleSelect(id) {
    setSelected(id);
  }

  function handleNext() {}

  return (
    <View style={[commonStyles.spacingCommon,{paddingHorizontal:moderateScale(8)}]}>
      <Text style={styles.textHeading}>{chapterName}asdasd</Text>
      <View>
         { (
                <TouchableOpacity
                  style={{
                    overflow: 'hidden',
                    height: moderateScale(30),
                    width: moderateScale(30),
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: colors.white,
                    borderRadius: moderateScale(8),
                  }}
                  onPress={() => {
                    handleEdit && handleEdit(chapterId as number);
                    // handleEdit && handleEdit(item as number);
                    // handleEditNotes && handleEditNotes(undefined, item);
                  }}>
                  <Icon5
                    color={colors.theme}
                    size={moderateScale(16)}
                    name="pencil-alt"
                  />
                </TouchableOpacity>
              )}
              { (
                <TouchableOpacity
                  style={{
                    overflow: 'hidden',
                    height: moderateScale(30),
                    width: moderateScale(30),
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: colors.white,
                    borderRadius: moderateScale(8),
                  }}
                  onPress={() => {
                    setDeleteChapterModal(!deleteChapterModal);
                  }}>
                  <TrashIcon
                    size={moderateScale(16)}
                    color={colors.red}
                    name="trash-o"
                  />
                </TouchableOpacity>
              )}
      </View>

      
    </View>
  );
};

export default AddOptionModal;

const styles = StyleSheet.create({
  textHeading: {
    fontFamily: fontFamily.Poppins_SemiBold,
    fontSize: textScale(16),
    color: colors.black,
  },
  img: {
    width: moderateScale(20),
    height: moderateScaleVertical(20),
    marginRight: moderateScale(10),
  },
  selectButton: {
    borderRadius: moderateScale(15),
    backgroundColor: '#F3F6F9',
    padding: moderateScale(12),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: moderateScale(10),
  },
  buttonTxt: {
    fontFamily: fontFamily.Poppins_Regular,
    fontSize: textScale(16),
    color: colors.white,
  },
});
