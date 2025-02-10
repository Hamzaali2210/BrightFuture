import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import ImagePicker from 'react-native-image-crop-picker';
import {URL} from 'react-native-url-polyfill';
import UploadIcon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import {
  constantpayload,
  mainStrings,
} from '../../../../../constants/mainstrings';
import {
  File,
  LessonChapter,
  LessonChapterError,
  Progress2,
  ProgressVideo,
  ResumableUpload,
  ShaText,
  ThumbnailResponseNew,
  Video,
} from '../../../../../redux/slice/chapterSlice';
import {AppDispatch} from '../../../../../redux/store';
import colors from '../../../../../styles/colors';
import fontFamily from '../../../../../styles/fontFamily';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from '../../../../../styles/responsiveSize';
import {showError, showSuccess} from '../../../../../utils/helperFunctions';
import CommonButton from '../../../../CommonButton';
import CustomTextInput from '../../../../CustomTextInput';
import ErrorMessage from '../../../../Forms/ErrorMessage';
import usePostData from '../../../../../hooks/usePostData';
import {endpoints} from '../../../../../utils/endpoints';
import * as Progress from 'react-native-progress';
import commonStyles from '../../../../../styles/commonStyles';
import imagePath from '../../../../../constants/imagePath';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ParamListBase, useNavigation} from '@react-navigation/native';

interface AddNewModalInterface {
  toggleModal?: () => void;
  refetch?: () => void;
  handleModal: (id: number) => void;
}

const AddTypeModal: React.FC<AddNewModalInterface> = ({
  toggleModal,
  refetch,
  handleModal,
}) => {
  const [selected, setSelected] = useState<number>(0);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const data = [
    {
      id: 0,
      title: 'Add Videos',
      imagePathBlack: imagePath.videoBlack,
      imagePathWhite: imagePath.videoWhite,
    },
    {
      id: 1,
      title: 'Add Notes',
      imagePathBlack: imagePath.notesBlack,
      imagePathWhite: imagePath.notesWhite,
    },
    // {
    //   id: 2,
    //   title: 'Add Files',
    //   imagePathBlack: imagePath.fileBlack,
    //   imagePathWhite: imagePath.fileWhite,
    // },
  ];

  function handleSelect(id) {
    setSelected(id);
  }

  function handleNext() {}

  return (
    <View style={[commonStyles.spacingCommon,{paddingHorizontal:moderateScale(8)}]}>
      <Text style={styles.textHeading}>First Chapter</Text>
      <View>
        <FlatList
          style={{marginVertical: moderateScale(14)}}
          data={data}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                style={[
                  styles.selectButton,
                  {
                    backgroundColor:
                      selected === item.id ? colors.theme : '#F3F6F9',
                  },
                ]}
                onPress={() => handleSelect(item?.id)}>
                <Image
                  source={
                    selected === item.id
                      ? item.imagePathWhite
                      : item.imagePathBlack
                  }
                  style={styles.img}
                  resizeMode='contain'
                />
                <Text
                  style={[
                    styles.buttonTxt,
                    {color: selected === item.id ? colors.white : colors.black},
                  ]}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      <TouchableOpacity
        style={[
          styles.selectButton,
          {backgroundColor: colors.theme, marginBottom: moderateScale(18)},
        ]}
        onPress={() => handleModal(selected)}>
        <Text style={[styles.buttonTxt]}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddTypeModal;

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
