import {
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import usePostData from '../../../../hooks/usePostData';
import {endpoints} from '../../../../utils/endpoints';
import {showError, showSuccess} from '../../../../utils/helperFunctions';
import {NotesListInterface, NotesType} from '../../../../types/uiType';
import ErrorMessage from '../../../Forms/ErrorMessage';
import CustomTextInput from '../../../CustomTextInput';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../styles/responsiveSize';
import {
  mainStrings,
  validationErrorMessage,
} from '../../../../constants/mainstrings';
import fontFamily from '../../../../styles/fontFamily';
import colors from '../../../../styles/colors';
import commonStyles from '../../../../styles/commonStyles';
import {MediaType, NotesList} from '../AddCourse/AddChapter';
import DottedButtonGrey from '../../../Layout/Button/DottedButtonGrey';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import Font5Icon from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-crop-picker';
import * as Progress from 'react-native-progress';

import {API_URL_2} from '../../../../utils/urls';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import {createThumbnail} from 'react-native-create-thumbnail';
import CommonButton from '../../../CommonButton';
import {URL} from 'react-native-url-polyfill';

const AddNotes = () => {
  const {params} = useRoute();
  const [notesArr, setNotesArr] = useState<Array<NotesType>>();
  const [notes, setNotes] = useState<NotesType>({
    notesName: '',
    notesDescription: '',
    documentFile: [],
    documentFileUrl: [],
    notesVideo: [],
    id: '',
  });

  const [notesVideo, setNotesVideo] = useState<Array<NotesListInterface>>([]);


  const [documents, setDocumets] = useState<Array<string>>([]);

  const [loading, setLoading] = useState(false);
  const [notesVideoLoading, setNotesVideoLoading] = useState(false);
  const [notesError, setNotesError] = useState({
    notesName: '',
    notesDescription: '',
    documentFile: undefined,
    documentFileUrl: '',
    id: '',
  });
  const {
    isSuccess: notesSuccess,
    mutate: addNotesData,
    error: addNotesError,
    data: notesData,
  } = usePostData(endpoints.NOTES, ['NOTES']);
  const [docUploading, setDocUploading] = useState(false);

  useEffect(() => {
    if (notesData?.data?.id || notesData?.status === 'success') {
      showSuccess('Notes Uploaded Successfully');
      setNotes({
        notesName: '',
        notesDescription: '',
        documentFile: [],
        documentFileUrl: [],
        notesVideo: [],
        id: '',
      });
    } else if (addNotesError) {
      showError('Error While Uploading note');
    }
  }, [notesData, addNotesError]);

  const handleDocument = async () => {
    try {
      setDocUploading(true);
      const result = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        copyTo: 'cachesDirectory',
        type: [
          DocumentPicker.types.pdf,
          DocumentPicker.types.csv,
          DocumentPicker.types.docx,
          DocumentPicker.types.xls,
          DocumentPicker.types.xlsx,
          DocumentPicker.types.ppt,
          DocumentPicker.types.pptx,
          DocumentPicker.types.zip,
        ],
      });

    

      // return ;
      let formData = new FormData();
      formData.append('file', {
        name: result?.name,
        uri: result?.uri,
        type: result?.type,
      });

      let response = await fetch(`${API_URL_2}upload-file`, {
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const data = await response.json();

      if (data?.data?.status === 200 || data?.status === 'success') {
        showSuccess('Pdf Uploaded SuccessFully');
        setNotes({
          ...notes,
          documentFile: [...notes.documentFile, result],
          documentFileUrl: [...notes.documentFileUrl, data?.data[0]],
        });
        setDocUploading(false);

        return data;
      }
    } catch (err) {
      showError('error while uploading the pdf');
      setDocUploading(false);
    }
    return;
  };
  const handleVideo = async (type: string) => {
    try {
      // const result = await DocumentPicker.pickSingle({
      //   type: [DocumentPicker.types.video],
      // });
      const result = await ImagePicker.openPicker({
        mediaType: 'video',
        compressVideoPreset:"Passthrough"
      });
    
      // return ;
      let formData = new FormData();
      const url = new URL(result?.path);
      const newPathName = url?.pathname?.split('/');

      if (Platform.OS === 'ios') {
        formData.append('video', {
          name: result?.filename,
          uri: result?.sourceURL,
          type: result?.mime,
        });
      } else if (Platform.OS === 'android') {
      

        formData.append('video', {
          name: newPathName[newPathName.length - 1],
          uri: result?.path,
          type: result?.mime,
        });
      }
      setNotesVideoLoading(true);

      const thumbnailResponse = await createThumbnail({
        url: result?.path,
        timeStamp: 10000,
      });

      let response = await fetch(`${API_URL_2}upload-video`, {
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const data = await response.json();

      if (data?.data?.status === 200 || data?.status === 'success') {
        setNotesVideo([
          ...notesVideo,
          {
            notesName:
              Platform.OS === 'ios'
                ? (result?.filename as string)
                : (newPathName[newPathName.length - 1] as string),
            thumbnail: thumbnailResponse?.path,
            notesVideoLink: data?.data?.body?.link,
          },
        ]);
        let payloadNotes = {
          name:
            Platform.OS === 'ios'
              ? (result?.filename as string)
              : (newPathName[newPathName.length - 1] as string),
          description: 'sample',

          videos: [{video_url: data?.data?.body?.link}],
          chapter_id: params?.chapterId,
        };
        addNotesData(payloadNotes);
        setNotesVideoLoading(false);

        showSuccess('Video Uploaded SuccessFully');
        return data;
      }
    } catch (err) {
      showError('error while uploading the video');
    }
    return;
  };

  const handleNotes = (type: string) => {
    if (type === 'notes') {
      if (!notes.notesName) {
        setNotesError(prevError => ({
          ...prevError,
          notesName: validationErrorMessage.notesNameError,
        }));
        return false;
      }
      if (!notes.notesDescription) {
        setNotesError(prevError => ({
          ...prevError,
          notesDescription: validationErrorMessage.notesDescription,
        }));
        return false;
      }

      let notesPayload = {
        name: notes?.notesName,
        description: notes?.notesDescription,
        documents: notes?.documentFileUrl,
        chapter_id: params?.chapterId,
      };

    

      addNotesData(notesPayload);
    }
  };

  return (
    <ScrollView contentContainerStyle={[commonStyles.spacingCommon]}>
      <View style={styles.textInputContainer}>
        <Text style={styles.textInputHeading}>{mainStrings.name}</Text>
        <CustomTextInput
          placeholder={mainStrings.name}
          containerStyle={{}}
          isError={!!notesError.notesName}
          onChangeText={e => {
            // dispatch(CourseData({...courseData,chapterName:e}));
            if (notesError?.notesName) {
              setNotesError({...notesError, notesName: ''});
            }
            setNotes({...notes, notesName: e});
          }}
          value={notes.notesName}
        />
        {notesError?.notesName && (
          <ErrorMessage
            message={notesError?.notesName}
            errorStyle={{marginLeft: moderateScaleVertical(10)}}
          />
        )}
      </View>
      <View style={styles.textInputContainer}>
        <Text style={styles.textInputHeading}>{mainStrings.Description}</Text>
        <CustomTextInput
          placeholder={mainStrings.Description}
          containerStyle={{}}
          isError={!!notesError.notesDescription}
          onChangeText={e => {
            // dispatch(CourseData({...courseData,chapterName:e}));
            if (notesError?.notesDescription) {
              setNotesError({...notesError, notesDescription: ''});
            }
            setNotes({...notes, notesDescription: e});
          }}
          value={notes.notesDescription}
        />
        {notesError?.notesDescription && (
          <ErrorMessage
            message={notesError?.notesDescription}
            errorStyle={{marginLeft: moderateScaleVertical(10)}}
          />
        )}
      </View>
      <View>
        {notes?.documentFile?.map(item => (
          <View style={styles.notesContainer}>
            <Text
              style={{
                fontFamily: fontFamily.Poppins_SemiBold,
                fontSize: textScale(14),
              }}>
              {item.name}
            </Text>
          </View>
        ))}
      </View>

      <DottedButtonGrey
        btnText={loading ? 'loading...' : 'Upload PDF'}
        onPressBtn={handleDocument}
      />
      <CommonButton
        btnText="Save Notes"
        mainViewStyle={{marginHorizontal: 0}}
        onPressBtn={() => handleNotes('notes')}
      />
      <View style={styles.notesVideoContainer}>
        <Text
          style={[
            styles.textHeading,
            {marginVertical: moderateScaleVertical(12)},
          ]}>
          {mainStrings.UploadNoteVideo}
        </Text>

        <View>
          <>
            <View style={[styles.mediaTypeContainer]}>
              <TouchableOpacity
                onPress={() => handleVideo('notes')}
                disabled={notesVideoLoading}>
                <MediaType>
                  {notesVideoLoading ? (
                    <Progress.Circle
                      color={colors.theme}
                      size={10}
                      indeterminate
                    />
                  ) : (
                    <FontIcon
                      name="video-camera"
                      color={colors.themeDark}
                      size={16}
                    />
                  )}
                </MediaType>
              </TouchableOpacity>

              <MediaType>
                <FontIcon name="photo" color={colors.themeDark} size={16} />
              </MediaType>
              <MediaType>
                <Font5Icon
                  name="paperclip"
                  color={colors.themeDark}
                  size={16}
                />
              </MediaType>
              <MediaType>
                <Font5Icon name="cloud" color={colors.themeDark} size={16} />
              </MediaType>
            </View>
          </>
          <View style={styles.notesListContainer}>
            <FlatList
              data={notesVideo}
              horizontal
              renderItem={({item}) => (
                <NotesList
                  thumbnail={item?.thumbnail}
                  notesName={`${item?.notesName}`}
                />
              )}
            />
          </View>
        </View>
      </View>
      {/* <CommonButton
        btnText="Save Video Notes"
        mainViewStyle={{marginHorizontal: 0}}
        onPressBtn={() => handleNotes('video')}
      /> */}
    </ScrollView>
  );
};

export default AddNotes;

const styles = StyleSheet.create({
  textInputHeading: {
    fontFamily: fontFamily.Poppins_Regular,
    fontSize: textScale(14),
    color: colors.grey1,
  },
  textInputContainer: {
    marginVertical: moderateScaleVertical(8),
  },

  textHeading: {
    fontFamily: fontFamily.Poppins_SemiBold,
    fontSize: textScale(15),
    color: colors.black,
  },
  notesListContainer: {
    // height:moderateScaleVertical(120),
  },
  notesContainer: {
    backgroundColor: colors.lightThemeBlue,
    padding: moderateScale(16),
    paddingVertical: moderateScale(10),
    borderRadius: moderateScale(12),
    marginVertical: moderateScaleVertical(12),
  },
  mediaTypeContainer: {
    flexDirection: 'row',
    gap: moderateScale(16),
    marginBottom: moderateScaleVertical(12),
  },
  notesVideoContainer: {},
});
