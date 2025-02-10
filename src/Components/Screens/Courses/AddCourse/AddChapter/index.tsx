import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { createThumbnail } from 'react-native-create-thumbnail';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/AntDesign';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import Font5Icon from 'react-native-vector-icons/FontAwesome5';
import {
  constantpayload,
  mainStrings,
  validationErrorMessage,
} from '../../../../../constants/mainstrings';
import colors from '../../../../../styles/colors';
import commonStyles from '../../../../../styles/commonStyles';
import fontFamily from '../../../../../styles/fontFamily';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
  verticalScale
} from '../../../../../styles/responsiveSize';
import CustomTextInput from '../../../../CustomTextInput';
import DottedButton from '../../../../Layout/Button/DottedButton';
import ChapterDetail from './ChapterDetail';

import { useDispatch, useSelector } from 'react-redux';

import { CourseData } from '../../../../../redux/slice/cartSlice';

import { CourseChapter, NotesType } from '../../../../../types/uiType';
import { endpoints } from '../../../../../utils/endpoints';
import { showError, showSuccess } from '../../../../../utils/helperFunctions';
import CommonButton from '../../../../CommonButton';
import DottedButtonGrey from '../../../../Layout/Button/DottedButtonGrey';
import NotesBox from './NotesBox';

import { useNavigation, useRoute } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import * as Progress from 'react-native-progress';
import { URL } from 'react-native-url-polyfill';
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage';
import navigationStrings from '../../../../../constants/navigationStrings';
import useGetData from '../../../../../hooks/useGetData';
import usePostData from '../../../../../hooks/usePostData';
import { displayAlert } from '../../../../../utils/logicFunctions';
import { API_URL_2, IMAGE_API_URL } from '../../../../../utils/urls';
import ErrorMessage from '../../../../Forms/ErrorMessage';

import axios from 'axios';
import CryptoJS from 'crypto-js';
import * as tus from 'tus-js-client';
import {
  AddNote,
  ChapterData,
  ChapterDataError,
  ChapterId,
  ChapterInit,
  ChapterUpdate,
  DocUploading,
  File,
  IsModalVisible,
  LessonChapter,
  LessonChapterError,
  LessonChapterId,
  LessonUpdate,
  Loading,
  NotesAdded,
  NotesData,
  NotesDataError,
  NotesInit,
  NotesUpdate,
  NotesVideoLoading,
  Progress2,
  ProgressVideo,
  SelectedChapter,
  ShaText,
  SubFile,
  SubVideo,
  ThumbnailResponse,
  Upload,
  Video,
  VideoType
} from '../../../../../redux/slice/chapterSlice';
import ErrorBox from '../../../../ErrorBox';

/*
checksquare

video-camera
photo

paperclip
cloud

*/

interface MediaTypeProps {
  iconName?: any;
  children: React.ReactNode;
}

// type documentFile = {
//   size: number;

//   fileCopyUri: string;
//   name: string;
//   uri: string;
//   type: string;
// };

interface ChapterType {
  notesName: string;
  notesDescription: string;
  documentFile: DocumentPickerResponse | undefined;
}

interface notesType {
  notesName: string;
  notesDescription: string;
  documentFile: DocumentPickerResponse | undefined;
}

interface NotesListInterface {
  thumbnail: string;
  notesName?: string;
  notesVideoLink?: string;
}
interface LessonInterface {
  chapter_id?: number;
  video: string;
  name: string;
  video_id?: number;
}
interface ModalInterface {
  notes: NotesType;
  addNote: boolean;
  progress2: string;
  notesError: NotesType;
  loading: boolean;
  lessonChapterId: string;
  notesLoading: boolean;

  setNotesError: React.Dispatch<React.SetStateAction<any>>;
  setNotes: React.Dispatch<React.SetStateAction<NotesType>>;
  setAddNote: React.Dispatch<React.SetStateAction<boolean>>;

  handleDocument: () => void;
  handleUpdateLesson: () => void;
  notesVideo: Array<NotesListInterface>;
  handleSaveNotes: (para: notesType) => void;
  handleVideo: (type: string) => void;
  handleSubChapterVideo: () => void;
  thumbnail: any;
  lessonChapter: LessonInterface;
  setLessonChapterError: React.Dispatch<React.SetStateAction<LessonInterface>>;
  setLessonChapter: React.Dispatch<React.SetStateAction<LessonInterface>>;
  lessonChapterError: LessonInterface;
  lessonUpdate: boolean;
  setLessonUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NotesList: React.FC<NotesListInterface> = ({
  thumbnail,
  notesName,
}) => {
  return (
    <View style={[styles.thumbnailImage]}>
      <View style={styles.notesImgContainer}>
        <FastImage style={styles.notesImg} source={{uri: `${IMAGE_API_URL}${thumbnail}` || thumbnail}} />
      </View>
      <Text style={styles.notesThumbText}>{notesName}</Text>
    </View>
  );
};

const ModalView: React.FC<ModalInterface> = ({
  notes,
  setNotes,
  handleDocument,
  handleUpdateLesson,
  addNote,
  setAddNote,
  progress2,

  loading,
  notesError,
  notesLoading,
  lessonUpdate,
  setNotesError,
  handleSaveNotes,
  handleVideo,
  handleSubChapterVideo,
  notesVideo,

  notesUpdate,
  thumbnail,
  lessonChapter,
  lessonChapterError,
  setLessonChapter,
  lessonChapterId,
  setLessonChapterError,
}) => {
  const handleAddNote = () => {
    // if (!lessonChapterId) {
    //   showError('Please add lesson first');
    //   return;
    // }
    dispatch(AddNote({addNote: true}));

    // setAddNote(true);
  };
  const dispatch = useDispatch();

  return (
    <View style={styles.modal}>
      <View>
        <View style={styles.notesVideoContainer}>
          <Text
            style={[
              styles.textHeading,
              {marginVertical: moderateScaleVertical(12)},
            ]}>
            {mainStrings.UploadNoteVideo}
          </Text>

          <View>
            <Text style={styles.textInputHeading}>
              {mainStrings.lessonName}
            </Text>
            <CustomTextInput
              placeholder={mainStrings.lessonName}
              containerStyle={{}}
              isError={!!lessonChapterError.name}
              onChangeText={e => {
                // dispatch(CourseData({...courseData,chapterName:e}));
                if (lessonChapter?.name) {
                  dispatch(
                    LessonChapterError({
                      lessonChapterError: {...lessonChapterError, name: ''},
                    }),
                  );
                  // setLessonChapterError({...lessonChapterError, name: ''});
                }
                dispatch(
                  LessonChapter({lessonChapter: {...lessonChapter, name: e}}),
                );

                // setLessonChapter({...lessonChapter, name: e});
              }}
              value={lessonChapter.name}
            />
            {lessonChapterError?.name && (
              <ErrorMessage
                message={lessonChapterError?.name}
                errorStyle={{marginLeft: moderateScaleVertical(10)}}
              />
            )}
            {
              <>
                <View
                  style={[
                    styles.mediaTypeContainer,
                    {marginTop: moderateScale(10)},
                  ]}>
                  <TouchableOpacity
                    onPress={() => handleSubChapterVideo()}
                    disabled={notesLoading}>
                    <MediaType>
                      {+progress2 > 0 ? (
                        <Text>{`${progress2}%`}</Text>
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
                    <Font5Icon
                      name="cloud"
                      color={colors.themeDark}
                      size={16}
                    />
                  </MediaType>
                </View>
              </>
            }
            {lessonUpdate && (
              <CommonButton
                mainViewStyle={{marginHorizontal: 0}}
                btnText="Update Lesson Detail"
                onPressBtn={handleUpdateLesson}
              />
            )}

            {/* <View style={styles.notesListContainer}>
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
            </View> */}

            <View
              style={{
                alignItems: 'center',
                width: '100%',
              }}>
              {thumbnail && (
                <NotesList
                  thumbnail={thumbnail}
                  // notesName={`${thumbnail?.notesName}`}
                />
              )}
            </View>
          </View>
        </View>
        <View style={{marginTop: moderateScaleVertical(8)}}>
          <View style={{marginVertical: moderateScaleVertical(12)}}>
            <DottedButton btnText={'+Add Notes'} onPressBtn={handleAddNote} />
          </View>
        </View>
        {addNote ? (
          <>
            <Text
              style={{
                fontSize: textScale(16),
                fontFamily: fontFamily.Poppins_Bold,
                textAlign: 'left',
              }}>
              Add Notes
            </Text>
            <View style={styles.textInputContainer}>
              <Text style={styles.textInputHeading}>{mainStrings.name}</Text>
              <CustomTextInput
                placeholder={mainStrings.name}
                containerStyle={{}}
                isError={!!notesError.notesName}
                onChangeText={e => {
                  // dispatch(CourseData({...courseData,chapterName:e}));
                  if (notesError?.notesName) {
                    dispatch(
                      NotesDataError({
                        notesError: {...notesError, notesName: ''},
                      }),
                    );
                    // setNotesError({...notesError, notesName: ''});
                  }
                  dispatch(NotesData({notes: {...notes, notesName: e}}));
                  // setNotes({...notes, notesName: e});
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
              <Text style={styles.textInputHeading}>
                {mainStrings.Description}
              </Text>
              <CustomTextInput
                placeholder={mainStrings.Description}
                containerStyle={{}}
                isError={!!notesError.notesDescription}
                onChangeText={e => {
                  // dispatch(CourseData({...courseData,chapterName:e}));
                  if (notesError?.notesDescription) {
                    dispatch(
                      NotesDataError({
                        notesError: {...notesError, notesDescription: ''},
                      }),
                    );

                    // setNotesError({...notesError, notesDescription: ''});
                  }
                  dispatch(NotesData({notes: {...notes, notesDescription: e}}));
                  // setNotes({...notes, notesDescription: e});
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
              <FlatList
                data={notes.documentFile}
                ListEmptyComponent={() => {
                  return <ErrorBox message={mainStrings.noCourseFound} />;
                }}
                renderItem={({item}) => (
                  <View style={styles.notesContainer}>
                    <Text
                      style={{
                        fontFamily: fontFamily.Poppins_SemiBold,
                        fontSize: textScale(14),
                      }}>
                      {item.name}
                    </Text>
                  </View>
                )}
              />
            </View>
            <DottedButtonGrey
              btnText={loading ? 'loading...' : 'Upload PDF'}
              onPressBtn={handleDocument}
            />

            {notes?.documentFile && !notesUpdate && (
              <CommonButton
                btnText="Save note"
                loading={notesLoading || loading}
                onPressBtn={() => handleSaveNotes(notes)}
                mainViewStyle={{marginLeft: moderateScale(0)}}
              />
            )}
          </>
        ) : null}
      </View>
    </View>
  );
};

export const MediaType: React.FC<MediaTypeProps> = ({children}) => (
  <View style={[styles.mediaType]}>{children}</View>
);

function AddChapter() {
  const {params}: any = useRoute();
  const dispatch = useDispatch();
  const courseData = useSelector((state: any) => state.cart.courseData);
  const navigation = useNavigation();
  const courseChapterData = useSelector(
    (state: any) => state?.cart?.courseData?.chapterData,
  );

  const scrollRef = useRef<ScrollView>(null);

  const chapterData = useSelector((state: any) => state?.chapter?.chapterData);
  const chapterDataError = useSelector(
    (state: any) => state?.chapter?.chapterDataError,
  );
  const notes = useSelector((state: any) => state?.chapter?.notes);
  const notesError = useSelector((state: any) => state?.chapter?.notesError);
  const lessonChapter = useSelector(
    (state: any) => state?.chapter?.lessonChapter,
  );
  const lessonChapterError = useSelector(
    (state: any) => state?.chapter?.lessonChapterError,
  );
  const selectedChapter = useSelector(
    (state: any) => state?.chapter?.selectedChapter,
  );
  const lessonChapterId = useSelector(
    (state: any) => state?.chapter?.lessonChapterId,
  );
  const notesAdded = useSelector((state: any) => state?.chapter?.notesAdded);
  const notesInit = useSelector((state: any) => state?.chapter?.notesInit);
  const isModalVisible = useSelector(
    (state: any) => state?.chapter?.isModalVisible,
  );
  const chapterInit = useSelector((state: any) => state?.chapter?.chapterInit);
  const chapterId = useSelector((state: any) => state?.chapter?.chapterId);
  const loading = useSelector((state: any) => state?.chapter?.loading);
  const docUploading = useSelector(
    (state: any) => state?.chapter?.docUploading,
  );
  const notesVideoLoading = useSelector(
    (state: any) => state?.chapter?.notesVideoLoading,
  );
  const thumbnailResponse = useSelector(
    (state: any) => state?.chapter?.thumbnailResponse,
  );
  // const notesVideo = useSelector((state:any) => state?.chapter?.notesVideo);
  const chapterUpdate = useSelector(
    (state: any) => state?.chapter?.chapterUpdate,
  );
  const notesUpdate = useSelector((state: any) => state?.chapter?.notesUpdate);
  const lessonUpdate = useSelector(
    (state: any) => state?.chapter?.lessonUpdate,
  );
  const addNote = useSelector((state: any) => state?.chapter?.addNote);
  const file = useSelector((state: any) => state?.chapter?.file);
  const subFile = useSelector((state: any) => state?.chapter?.subFile);
  const video = useSelector((state: any) => state?.chapter?.video);
  const videoType = useSelector((state: any) => state?.chapter?.videoType);
  const shaText = useSelector((state: any) => state?.chapter?.shaText);
  const subVideo = useSelector((state: any) => state?.chapter?.subVideo);
  const progress = useSelector((state: any) => state?.chapter?.progress);
  const progress2 = useSelector((state: any) => state?.chapter?.progress2);
  const upload = useSelector((state: any) => state?.chapter?.upload);

  // console.log(
  //   "chater Data ki state aa rasdasd", chapterDataState
  // );

  const onPressTouch = () => {};

  // const [chapterData, setChapterData] = useState<CourseChapter>({
  //   chapterName: '',
  //   accessType: 'free',
  //   price: '',
  //   chapterVideoLink: '',
  //   chapterVideoName: '',
  //   notes: [],
  //   id: '',
  // });
  // const [chapterDataError, setChapterDataError] = useState({
  //   chapterName: '',
  //   coverPhoto: '',
  //   price: '',
  //   chapterVideoLink: '',
  // });

  // const [notes, setNotes] = useState<NotesType>({
  //   notesName: '',
  //   notesDescription: '',
  //   documentFile: '',
  //   documentFileUrl: '',
  //   notesVideo: [],
  //   id: '',
  // });
  // const [notesError, setNotesError] = useState({
  //   notesName: '',
  //   notesDescription: '',
  //   documentFile: undefined,
  //   documentFileUrl: '',
  //   id: '',
  // });
  // const [lessonChapter, setLessonChapter] = useState<LessonInterface>({
  //   chapter_id: 0,
  //   video: '',
  //   name: '',
  // });
  // const [lessonChapterError, setLessonChapterError] = useState<LessonInterface>(
  //   {
  //     video: '',
  //     name: '',
  //   },
  // );
  // const [selectedChapter, setSelectedChapter] = useState();

  // const [lessonChapterId, setLessonChapterId] = useState(null);
  // const [notesAdded, setNotesAdded] = useState<Array<string>>([]);
  // const [notesInit, setNotesInit] = useState(false);
  // const [isModalVisible, setModalVisible] = useState(false);
  // const [chapterInit, setChapterInit] = useState(true);
  // const [chapterId, setChapterId] = useState('');
  // const [loading, setLoading] = useState(false);
  // const [notesVideoLoading, setNotesVideoLoading] = useState(false);
  // const [lessonLoading, setLessonLoading] = useState(false);
  // const [thumbnailResponse, setThumbnailResponse] = useState('');
  const [notesVideo, setNotesVideo] = useState<Array<NotesListInterface>>([]);
  // const [docUploading, setDocUploading] = useState(false);

  // const [chapterUpdate, setChapterUpdate] = useState(false);
  // const [notesUpdate, setNotesUpdate] = useState(false);
  // const [lessonUpdate, setLessonUpdate] = useState(false);
  // const [addNote, setAddNote] = useState(false);

  const [lessonId, setLessonId] = useState(0);
  const [notesId, setNotesId] = useState(0);
  const [deleteChapterId, setDeleteChapterId] = useState(0);

  // const [file, setFile] = useState(null);
  // const [subFile, setSubFile] = useState(null);
  // const [video, setVideo] = useState('');
  // const [videoType, setVideoType] = useState('');
  // const [shaText, setShaText] = useState('');
  // const [subVideo, setSubVideo] = useState('');
  // const [progress, setProgress] = useState('0');
  // const [progress2, setProgress2] = useState('0');
  // const [upload, setUpload] = useState<any>('');

  const libId = constantpayload.LIB_ID;
  const apiKey = constantpayload?.API_KEY;
  const expireTime = constantpayload?.EXPIRE_TIME;
  // const shaText = libId + apiKey + expireTime + type==='chapter'?video:subVideo;
  // const videoId = '51232432-6b72-41c4-87b3-e84f5ab05d35';

  useEffect(() => {
    if (videoType === 'chapter') {
      const shaTex = libId + apiKey + expireTime + video;
      dispatch(ShaText({shaText: shaTex}));

      // setShaText(shaTex);
    } else if (videoType === 'lesson') {
      const shaTex = libId + apiKey + expireTime + subVideo;

      dispatch(ShaText({shaText: shaTex}));

      // setShaText(shaTex);
    }
  }, [subVideo, video, videoType]);

  const {
    isSuccess: getChapterSuccess,
    data: getChapterData,
    isLoading: getChapterLoading,
    refetch: refetchChapterData,
  } = useGetData(`${endpoints.CHAPTERS}?course_id=${params?.courseId}`, [
    notesAdded,
  ]);

  // one free // two paid //
  const {
    isSuccess,
    mutate: addChapterData,
    error: chapterError,
    data: successData,
  } = usePostData(endpoints.CHAPTERS, ['CHAPTERS']);

  const {
    isSuccess: sendVideoSuccess,
    mutate: addVideoData,
    error: videoChaperError,
    data: successVideoData,
  } = usePostData(endpoints.ADD_CHAPTER_VIDEOS, ['ADD_CHAPTER_VIDEOS']);
  const {
    isSuccess: sendUpdateVideoSuccess,
    mutate: updateVideoData,
    error: updateVideoError,
    data: successUpdateVideoData,
  } = usePostData(endpoints.UPDATE_CHAPTER_VIDEOS, ['UPDATE_CHAPTER_VIDEOS']);

  const {
    isSuccess: notesSuccess,
    mutate: addNotesData,
    error: addNotesError,
    data: notesData,
  } = usePostData(endpoints.NOTES, ['NOTES']);

  const {
    isSuccess: updateSuccess,
    mutate: updateChapter,
    error: updateChapterError,
    data: updateChapterData,
  } = usePostData(`${endpoints.CHAPTERS}/${chapterId}`, ['UDPATE_CHAPTER']);

  const {
    isSuccess: updateNotesSuccess,
    mutate: updateNotes,
    error: updateNotesError,
    data: updateNotesData,
  } = usePostData(`${endpoints.UPDATE_NOTES}/${notes.id}`, ['UDPATE_NOTES']);

  const {
    isSuccess: getNotesSuccess,
    error: getNotesError,
    data: getNotesData,
    refetch: getNotesRefetch,
  } = useGetData(`${endpoints.GET_NOTES}?video_id=${lessonChapter?.video_id}`, [
    'GET_NOTES',
    lessonChapter?.video_id,
    notesData,
    updateNotesData,
    notesInit,
  ]);

  // delete apis

  const {
    mutate: deleteNotes,
    isPending: deletePending,
    error: deleteError,
    isSuccess: deleteNotesSuccess,
  } = usePostData(
    `${endpoints.DELETE_NOTES}`,
    ['DELETE_NOTES'],
    'delete',
    (data: any) => {
      showSuccess(data?.message || 'notes has been deleted successfully');
      getNotesRefetch();
    },
    (error: any) => {
      if (error?.message) {
        showSuccess(error?.message || 'there was error while delete notes');
      } else {
        showError(error || 'there was error while delete notes');
      }
    },
  );

  const {
    mutate: deleteChapter,
    isPending: deletePendingChapter,
    error: deleteErrorChapter,
    isSuccess: deleteChapterSuccess,
  } = usePostData(
    `${endpoints.CHAPTERS}`,
    ['DELETE_CHAPTER'],
    'delete',
    (data: any) => {
      showSuccess(data?.message || 'chapter has been deleted successfully');
      refetchChapterData();
    },
    (error: any) => {
      if (error?.message) {
        showSuccess(error?.message || 'there was error while delete chapter');
      } else {
        showError(error || 'there was error while delete chapter');
      }
    },
  );

  const {
    mutate: deleteLesson,
    isPending: deletePendingLesson,
    error: deleteErrorLessons,
    isSuccess: deleteLessonSuccess,
  } = usePostData(
    `${endpoints.DELETE_VIDEOS}`,
    ['DELETE_LESSONS'],
    'delete',
    (data: any) => {
      showSuccess(data?.message || 'Lesson has been deleted successfully');
      refetchChapterData();
      dispatch(
        ChapterData({
          chapterData: {
            ...chapterData,
            chapterName: '',
            price: '',
            accessType: 'free',
          },
        }),
      );
      // setChapterData({
      //   ...chapterData,
      //   chapterName: '',
      //   price: '',
      //   accessType: 'free',
      // });
      dispatch(
        NotesAdded({notesAdded: [...notesAdded, `${Math.random() * 100}aqq`]}),
      );
      // setNotesAdded([...notesAdded, `${Math.random() * 100}aqq`]);
      // setLessonChapterId(successVideoData?.data?.id);
      // setSelectedChapter(undefined);
      dispatch(
        SelectedChapter({
          selectedChapter: undefined,
        }),
      );
      dispatch(ChapterUpdate({chapterUpdate: false}));

      // setChapterUpdate(false);
      dispatch(
        NotesData({
          notes: {
            notesName: '',
            notesDescription: '',
            documentFile: '',
            id: '',
            notesVideo: [],
            documentFileUrl: '',
          },
        }),
      );
      // setNotes({
      //   notesName: '',
      //   notesDescription: '',
      //   documentFile: '',
      //   id: '',
      //   notesVideo: [],
      //   documentFileUrl: '',
      // });
      dispatch(
        LessonChapter({
          lessonChapter: {
            notesName: '',
            notesDescription: '',
            documentFile: '',
            id: '',
            notesVideo: [],
            documentFileUrl: '',
          },
        }),
      );

      // setLessonChapter({
      //   ...lessonChapter,
      //   name: '',
      //   video: '',
      //   chapter_id: 0,
      //   video_id: 0,
      // });
      dispatch(ProgressVideo({progress: '0'}));
      dispatch(Progress2({progress2: '0'}));
      // setProgress('0');
      // setProgress2('0');
    },
    (error: any) => {
      if (error?.message) {
        showSuccess(error?.message || 'there was error while deleting lesson');
      } else {
        showError(error || 'there was error while deleting lesson');
      }
    },
  );

  useEffect(() => {

  }, [deletePending, deleteNotesSuccess, deleteError]);

  useEffect(() => {
    if (successData?.data?.id || successData?.status === 'success') {
      dispatch(IsModalVisible({isModalVisible: !isModalVisible}));
      dispatch(ChapterInit({chapterInit: false}));
      dispatch(ChapterId({chapterId: successData?.data?.id}));

      // setModalVisible(!isModalVisible);
      // setChapterId(successData?.data?.id);
      // setChapterInit(false);
      dispatch(NotesInit({notesInit: !notesInit}));
      // setNotesInit(!notesInit);
    }
  }, [successData]);

  useEffect(() => {
    if (successData?.data?.id || getChapterData?.status === 'success') {
      dispatch(IsModalVisible({isModalVisible: !isModalVisible}));

      // setModalVisible(!isModalVisible);
      dispatch(ChapterInit({chapterInit: false}));

      // setChapterInit(false);
    }
  }, [successData]);

  useEffect(() => {
    if (successVideoData?.message || successVideoData?.status === 'success') {
      showSuccess(successVideoData?.message);
      // setLessonChapterId(successVideoData?.data?.id);
      dispatch(LessonChapterId({lessonChapterId: successVideoData?.data?.id}));
    }
  }, [successVideoData]);

  useEffect(() => {
    if (updateChapterData?.message || updateChapterData?.status === 'success') {
      showSuccess('Chapter updated Successfully');
      dispatch(
        ChapterData({
          chapterData: {
            ...chapterData,
            chapterName: '',
            price: '',
            accessType: 'free',
          },
        }),
      );
      // setChapterData({
      //   ...chapterData,
      //   chapterName: '',
      //   price: '',
      //   accessType: 'free',
      // });
      dispatch(
        NotesAdded({notesAdded: [...notesAdded, `${Math.random() * 100}aqq`]}),
      );

      // setNotesAdded([...notesAdded, `${Math.random() * 100}aqq`]);
      // setLessonChapterId(successVideoData?.data?.id);
      // setSelectedChapter(undefined);
      dispatch(
        SelectedChapter({
          selectedChapter: undefined,
        }),
      );
      dispatch(ChapterUpdate({chapterUpdate: false}));

      // setChapterUpdate(false);
      dispatch(
        NotesData({
          notes: {
            notesName: '',
            notesDescription: '',
            documentFile: '',
            id: '',
            notesVideo: [],
            documentFileUrl: '',
          },
        }),
      );
      // setNotes({
      //   notesName: '',
      //   notesDescription: '',
      //   documentFile: '',
      //   id: '',
      //   notesVideo: [],
      //   documentFileUrl: '',
      // });
      dispatch(
        LessonChapter({
          lessonChapter: {
            ...lessonChapter,
            name: '',
            video: '',
            chapter_id: 0,
            video_id: 0,
          },
        }),
      );
      // setLessonChapter({
      //   ...lessonChapter,
      //   name: '',
      //   video: '',
      //   chapter_id: 0,
      //   video_id: 0,
      // });
    } else if (updateChapterError) {
      showError(updateChapterError?.message);
    }
  }, [updateChapterData, updateChapterError]);

  useEffect(() => {
    if (
      successUpdateVideoData?.message ||
      successUpdateVideoData?.status === 'success'
    ) {
      showSuccess('Lesson updated Successfully');
      // setChapterData({
      //   ...chapterData,
      //   chapterName: '',
      //   price: '',
      //   accessType: 'free',
      // });
      dispatch(
        LessonChapter({
          lessonChapter: {
            ...lessonChapter,
            chapter_id: 0,
            video_id: 0,
            name: '',
            video: '',
          },
        }),
      );
      // setLessonChapter({
      //   ...lessonChapter,
      //   chapter_id: 0,
      //   video_id: 0,
      //   name: '',
      //   video: '',
      // });
      dispatch(
        NotesAdded({notesAdded: [...notesAdded, `${Math.random() * 100}aqq`]}),
      );

      // setNotesAdded([...notesAdded, `${Math.random() * 100}aqq`]);
      dispatch(Video({video: ''}));
      // setVideo('');
      dispatch(SubVideo({subVideo: ''}));

      // setSubVideo('');

      // setLessonChapterId(successVideoData?.data?.id);
    } else if (updateVideoError) {
      showError(updateVideoError?.message);
    }
  }, [successUpdateVideoData, updateVideoError]);

  useEffect(() => {
    if (updateNotesSuccess) {
      showSuccess('Notes Update Successfully');
      dispatch(NotesUpdate({notesUpdate: false}));

      // setNotesUpdate(false);
      dispatch(
        NotesData({
          notes: {
            notesName: '',
            notesDescription: '',
            documentFile: '',
            id: '',
            notesVideo: [],
            documentFileUrl: '',
          },
        }),
      );
      // setNotes({
      //   notesName: '',
      //   notesDescription: '',
      //   documentFile: '',
      //   id: '',
      //   notesVideo: [],
      //   documentFileUrl: '',
      // });
    } else if (updateNotesError) {
      showSuccess('Notes Error Successfully');
    }
  }, [updateNotesSuccess, updateNotesError]);

  useEffect(() => {
    if (selectedChapter?.id) {
      dispatch(
        ChapterData({
          chapterData: {
            ...chapterData,
            chapterName: selectedChapter?.name,
            price: selectedChapter?.price,
            accessType: +selectedChapter?.price > 0 ? 'paid' : 'free',
          },
        }),
      );
      // setChapterData({
      //   ...chapterData,
      //   chapterName: selectedChapter?.name,
      //   price: selectedChapter?.price,
      //   accessType: +selectedChapter?.price > 0 ? 'paid' : 'free',
      // });
      // setModalVisible(!isModalVisible);
      // setChapterId(selectedChapter?.id);
      dispatch(ChapterId({chapterId: selectedChapter?.id}));

      dispatch(ChapterInit({chapterInit: false}));

      // setChapterInit(false);
      // setNotesInit(!notesInit);
      dispatch(LessonChapter({lessonChapter: {...lessonChapter}}));
      // setLessonChapter({...lessonChapter});
    }
  }, [selectedChapter]);

  useEffect(() => {
    if (notesData?.data?.id || notesData?.status === 'success') {
      // setChapterData({
      //   ...chapterData,
      //   notes: [
      //     ...(chapterData?.notes as any[]),
      //     {...notes, id: Math.random() * 100},
      //   ],
      // });
      dispatch(
        ChapterData({
          chapterData: {
            ...chapterData,
            notes: [
              ...(chapterData?.notes as any[]),
              {...notes, id: Math.random() * 100},
            ],
          },
        }),
      );
      dispatch(
        NotesData({
          notes: {
            notesName: '',
            notesDescription: '',
            documentFile: '',
            id: '',
            notesVideo: [],
            documentFileUrl: '',
          },
        }),
      );
      // setNotes({
      //   notesName: '',
      //   notesDescription: '',
      //   documentFile: '',
      //   id: '',
      //   notesVideo: [],
      //   documentFileUrl: '',
      // });

      // setThumbnailResponse('');
      // setLessonChapter({
      //   video:"",
      //   chapter_id:0,
      //   name:'',
      // })
      // setLessonChapterId('');
      // setNotesVideo([]);
      dispatch(IsModalVisible({isModalVisible: !isModalVisible}));

      // setModalVisible(!isModalVisible);
    } else if (addNotesError) {
      showError('Error While Uploading note');
    }
  }, [notesData, addNotesError]);

  useEffect(() => {
    if (chapterError) {
      showError(chapterError?.message);
    }
  }, [chapterError]);

  useEffect(() => {
  }, [notesId]);

  useEffect(() => {
    if (file?.uri && video && shaText) {
      tusUpload(file, 'chapter');
    } else if (subFile?.uri && subVideo && shaText) {
      tusUpload(subFile, 'lesson');
    }
  }, [file, subFile, shaText]);

  useEffect(() => {
    // Check if there's a stored upload URL and resume the upload if available
    RNSecureStorage.getItem('uploadUrl').then(url => {
      if (url) {
        resumeUpload(url);
      }
    });
  }, []);

  const tusUpload = (file, type: string) => {
    const shText = CryptoJS.SHA256(shaText).toString();


    var upload = new tus.Upload(file, {
      endpoint: 'https://video.bunnycdn.com/tusupload',
      retryDelays: [0, 3000, 5000, 10000, 20000, 60000, 60000],
      headers: {
        AuthorizationSignature: shText, // SHA256 signature (library_id + api_key + expiration_time + video_id)
        AuthorizationExpire: expireTime.toString(), // Expiration time as in the signature,
        VideoId: type === 'chapter' ? video : subVideo, // The guid of a previously created video object through the Create Video API call
        LibraryId: `${libId}`,
      },
      metadata: {
        filetype: file?.type,
        title: file?.name,
        // collection: "collectionID"
      },
      onError: function (error) {
        showError('error while uploading the video');
        dispatch(Loading({loading: false}));
        // setLoading(false);
      },
      onProgress: function (bytesUploaded, bytesTotal) {
        var percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
        if (type === 'chapter') {
          dispatch(ProgressVideo({progress: percentage}));

          // setProgress(percentage);
        } else if (type === 'lesson') {
          dispatch(Progress2({progress2: percentage}));

          // setProgress2(percentage);
        }
      },
      onSuccess: function () {

        if (type === 'chapter') {
          // setChapterData({
          //   ...chapterData,
          //   chapterVideoLink: video,
          //   chapterVideoName: file.name,
          // });
          dispatch(
            ChapterData({
              chapterData: {
                ...chapterData,
                chapterVideoLink: video,
                chapterVideoName: file.name,
              },
            }),
          );
          dispatch(
            ChapterDataError({
              chapterDataError: {
                ...chapterDataError,
                chapterVideoLink: '',
              },
            }),
          );
          // setChapterDataError({
          //   ...chapterDataError,
          //   chapterVideoLink: '',
          // });
        } else if (type === 'lesson') {
          dispatch(
            LessonChapter({lessonChapter: {...lessonChapter, video: subVideo}}),
          );

          // setLessonChapter({...lessonChapter, video: subVideo});
          let payload = {
            name: lessonChapter.name,
            video: subVideo,
            chapter_id: successData?.data?.id || chapterId,
            library_id: libId,
          };
          if (!lessonUpdate) {
            addVideoData(payload);
          }
        }

        // setLoading(false);

        //  if (type === 'notes') {
        //   setNotesVideoLoading(false);
        // } else {
        //   setLoading(false);
        // }
        RNSecureStorage.removeItem('uploadUrl');
        dispatch(Loading({loading: false}));

        // setLoading(false);
      },
    });

    // Check if there are any previous uploads to continue.
    dispatch(Upload({upload: upload}));
    // setUpload(upload);
    upload.findPreviousUploads().then(function (previousUploads) {
      // Found previous uploads so we select the first one.
      if (previousUploads.length) {
        upload.resumeFromPreviousUpload(previousUploads[0]);
      }

      // Start the upload
      upload.start();
    });
  };

  const resumeUpload = async (url: string) => {
    const upload = new tus.Upload(null, {
      endpoint: url,
      resume: true,
      onError: error => {
      },
      onProgress: (bytesUploaded, bytesTotal) => {
      },
      onSuccess: () => {
        RNSecureStorage.removeItem('uploadUrl'); // Remove stored URL after successful upload
      },
    });
    dispatch(Upload({upload: upload}));

    // setUpload(upload);
    upload.start();
  };

  const cancelUpload = async () => {
    if (upload) {
      upload.abort();
      const urlset = await RNSecureStorage.setItem('uploadUrl', upload.url, {
        accessible: ACCESSIBLE.WHEN_UNLOCKED,
      }); // Store the upload URL for resuming later
    }
  };

  const handleSaveNotes = (notesinfo: notesType) => {
    if (!notes.notesName) {
      // setNotesError(prevError => ({
      //   ...prevError,
      //   notesName: validationErrorMessage.notesNameError,
      // }));
      dispatch(
        NotesDataError({
          notesError: {
            ...notesError,
            notesName: validationErrorMessage.notesNameError,
          },
        }),
      );

      return false;
    }
    if (!notes.notesDescription) {
      // setNotesError(prevError => ({
      //   ...prevError,
      //   notesDescription: validationErrorMessage.notesDescription,
      // }));
      dispatch(
        NotesDataError({
          notesError: {
            ...notesError,
            notesDescription: validationErrorMessage.notesDescription,
          },
        }),
      );

      return false;
    }

    const notesVideoLinks = notesVideo?.map(item => ({
      video_url: item?.notesVideoLink,
      name: item?.notesName,
    }));

    let notesPayload = {
      name: notes?.notesName,
      description: notes?.notesDescription,
      file: notes?.documentFileUrl,
      video_id: lessonChapterId || lessonChapter?.video_id,
      // videos:notesVideoLinks,
    };



    addNotesData(notesPayload);

    if (notesinfo?.documentFile?.name) {
      // setModalVisible(!isModalVisible);
      // setNotes({
      //   notesName: '',
      //   notesDescription: '',
      //   documentFile: undefined,
      //   id: '',
      //   documentFileUrl: '',
      // });
    }
  };

  const handleDeleteNotes = (item: any) => {
    deleteNotes({id: item?.id});
    const sampleData = chapterData.notes?.filter(item => item.id !== id);
    // setChapterData({...chapterData, notes: sampleData});
    dispatch(ChapterData({chapterData: {...chapterData, notes: sampleData}}));
  };
  const handleDeleteChapter = (id: number) => {
    deleteChapter({id: id});
    const sampleData = chapterData.notes?.filter(item => item.id !== id);
    dispatch(ChapterData({chapterData: {...chapterData, notes: sampleData}}));

    // setChapterData({...chapterData, notes: sampleData});
  };

  const handleDeleteLesson = async (id: number, video_url: string) => {
    try {
      const response = await axios.delete(
        `https://video.bunnycdn.com/library/${libId}/videos/${video_url}`,
        {
          headers: {
            AccessKey: apiKey,
          },
        },
      );

      deleteLesson({id: id});
    } catch (error) {
      showError('Error while deleting the lesson');
    }

    // const sampleData = chapterData.notes?.filter(item => item.id !== id);
    // setChapterData({...chapterData, notes: sampleData});
  };

  const handleLessonEdit = (item: string) => {
    // return;
    // return;
    dispatch(IsModalVisible({isModalVisible: !isModalVisible}));

    // setModalVisible(!isModalVisible);
    dispatch(ChapterId({chapterId: selectedChapter?.id}));

    // setChapterId(selectedChapter?.id);
    // setChapterInit(false);
    dispatch(LessonUpdate({lessonUpdate: true}));

    // setLessonUpdate(true);
    dispatch(
      LessonChapter({
        lessonChapter: {
          ...lessonChapter,
          name: item?.name,
          video: item?.video_url,
          video_id: item?.id,
        },
      }),
    );

    // setLessonChapter({
    //   ...lessonChapter,
    //   name: item?.name,
    //   video: item?.video_url,
    //   video_id: item?.id,
    // });

    getNotesRefetch();
    // setNotesInit(true);
    dispatch(NotesInit({notesInit: true}));
  };

  const handleNotesEdit = (item: any) => {
    dispatch(AddNote({addNote: true}));
    // setAddNote(true);
    dispatch(
      NotesData({
        notes: {
          ...notes,
          notesDescription: item.description,
          notesName: item.name,
          id: item.id,
          documentFileUrl: item.file,
          documentFile:{
            name:item?.file_name
          }
        },
      }),
    );
    // setNotes({
    //   ...notes,
    //   notesDescription: item.description,
    //   notesName: item.name,
    //   id: item.id,
    //   documentFileUrl: item.file,
    // });
    dispatch(NotesUpdate({notesUpdate: true}));

    // setNotesUpdate(true);
    dispatch(AddNote({addNote: true}));

    // setAddNote(true);
  };

  const handleDocument = async () => {
    try {
      dispatch(DocUploading({docUploading: true}));
      // setDocUploading(true);
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
        // setNotes({
        //   ...notes,
        //   documentFile: result,
        //   documentFileUrl: data?.data[0],
        // });
        dispatch(
          NotesData({
            notes: {
              ...notes,
              documentFile: result,
              documentFileUrl: data?.data[0],
            },
          }),
        );
        dispatch(DocUploading({docUploading: false}));
        // setDocUploading(false);

        return data;
      }
    } catch (err) {
      showError('error while uploading the pdf');
      dispatch(DocUploading({docUploading: false}));

      // setDocUploading(false);
    }
    return;
  };

  useEffect(() => {
    if (courseChapterData?.length > 0) {
    }
  }, [courseChapterData]);

  const handleAddChapter = () => {
    // dispatch(
    //   CourseData({
    //     courseData: {
    //       ...courseData,
    //       chapterData: [...courseData?.chapterData, chapterData],
    //     },
    //   }),
    // );
    dispatch(
      ChapterData({
        chapterData: {
          chapterName: '',
          accessType: 'free',
          price: '',
          chapterVideoLink: '',
          chapterVideoName: '',
          notes: [],
          id: '',
        },
      }),
    );

    // setChapterData({
    //   chapterName: '',
    //   accessType: 'free',
    //   price: '',
    //   chapterVideoLink: '',
    //   chapterVideoName: '',
    //   notes: [],
    //   id: '',
    // });
    dispatch(
      NotesData({
        notes: {
          notesName: '',
          notesDescription: '',
          documentFile: undefined,
          documentFileUrl: '',
          notesVideo: [],
          id: '',
        },
      }),
    );
    // setNotes({
    //   notesName: '',
    //   notesDescription: '',
    //   documentFile: undefined,
    //   documentFileUrl: '',
    //   notesVideo: [],
    //   id: '',
    // });
    // setLessonChapterId('');
    dispatch(LessonChapterId({lessonChapterId: '',position:null}));


    dispatch(
      LessonChapter({lessonChapter: {video: '', chapter_id: 0, name: ''}}),
    );
    // setLessonChapter({video: '', chapter_id: 0, name: ''});
    dispatch(ProgressVideo({progress: '0'}));

    // setProgress('0');
    dispatch(Progress2({progress2: '0'}));

    // setProgress2('0');
    dispatch(Video({video: ''}));

    // setVideo('');
    dispatch(SubVideo({subVideo: ''}));

    // setSubVideo('');
    dispatch(ThumbnailResponse({thumbnailResponse: ''}));
    // setThumbnailResponse('');
    dispatch(
      NotesAdded({notesAdded: [...notesAdded, `${Math.random() * 100}aqq`]}),
    );

    // setNotesAdded([...notesAdded, `${Math.random() * 100}aqq`]);
    dispatch(ChapterInit({chapterInit: true}));

    // setChapterInit(true);
    // setNotesInit(false);
    dispatch(NotesInit({notesInit: false}));
  };

  const errorChecker = (errorCheck: string) => {
    if (!chapterData.chapterName) {
      // setChapterDataError(prevError => ({
      //   ...prevError,
      //   chapterName: validationErrorMessage.chapterNameError,
      // }));
      dispatch(
        ChapterDataError({
          chapterDataError: {
            ...chapterDataError,
            chapterName: validationErrorMessage.chapterNameError,
          },
        }),
      );
      return false;
    }
    // if (!chapterData.chapterVideoLink) {
    //   setChapterDataError(prevError => ({
    //     ...prevError,
    //     chapterVideoLink: validationErrorMessage.introVideoError,
    //   }));
    //   return false;
    // }

    if (chapterData.accessType === 'paid' && !chapterData.price) {
      // setChapterDataError(prevError => ({
      //   ...prevError,
      //   price: validationErrorMessage.paidError,
      // }));
      dispatch(
        ChapterDataError({
          chapterDataError: {
            ...chapterDataError,
            price: validationErrorMessage.paidError,
          },
        }),
      );
      return false;
    }

    if (chapterData.accessType === 'paid' && isNaN(+chapterData?.price)) {
      // setChapterDataError(prevError => ({
      //   ...prevError,
      //   price: validationErrorMessage.paidError2,
      // }));
      dispatch(
        ChapterDataError({
          chapterDataError: {
            ...chapterDataError,
            price: validationErrorMessage.paidError2,
          },
        }),
      );
      return false;
    }

    return true;
  };

  const handleAddNotes = () => {
    const errorFree = errorChecker('chapter');
    dispatch(LessonUpdate({lessonUpdate: false}));

    // setLessonUpdate(false);
    // setThumbnailResponse('');
    dispatch(ThumbnailResponse({thumbnailResponse: ''}));

    if (lessonChapterId) {
      // setLessonChapterId('');
      dispatch(LessonChapterId({lessonChapterId: '',position:null}));

      dispatch(
        LessonChapter({lessonChapter: {video: '', chapter_id: 0, name: ''}}),
      );

      // setLessonChapter({video: '', chapter_id: 0, name: ''});
      // setProgress2('0');
      dispatch(ProgressVideo({progress: '0'}));
      dispatch(Progress2({progress2: '0'}));

      // setProgress('0');
      dispatch(Video({video: ''}));

      // setVideo('');
      dispatch(SubVideo({subVideo: ''}));

      // setSubVideo('');
    }

    if (errorFree) {
      let payload = {
        name: chapterData?.chapterName,
        course_id: params?.courseId,
        type: chapterData?.accessType === 'free' ? 1 : 2,
        price: chapterData?.accessType === 'free' ? 0 : chapterData.price,
        video: chapterData?.chapterVideoLink || '',
      };


      if (chapterInit) {
        if (selectedChapter?.id) {
          // setModalVisible(!isModalVisible);
          dispatch(ChapterId({chapterId: selectedChapter?.id}));

          // setChapterId(selectedChapter?.id);
          dispatch(ChapterInit({chapterInit: false}));

          // setChapterInit(false);
          dispatch(NotesInit({notesInit: false}));

          // setNotesInit(false);
        } else {
          addChapterData(payload);
        }
      } else {
        dispatch(NotesInit({notesInit: !notesInit}));

        // setNotesInit(!notesInit);
      }
    }
  };

  const handlePress = () => {
    // ImageCropPicker.openPicker({
    //   mediaType: 'video',
    // })
    //   .then(image => {
    //     setChapterData({...chapterData, coverPhoto: image.path});
    //   })
    //   .catch(err => {
    //     showError(err.message);
    //   });
  };

  const handleSubChapterVideo = async () => {
    if (!lessonChapter.name) {
      // setLessonChapterError(prevError => ({
      //   ...prevError,
      //   name: validationErrorMessage.lessonName,
      // }));
      dispatch(
        LessonChapterError({
          lessonChapterError: {
            ...lessonChapterError,
            name: validationErrorMessage.lessonName,
          },
        }),
      );
      return false;
    }

    try {
      // const result = await DocumentPicker.pickSingle({
      //   type: [DocumentPicker.types.video],
      // });
      const result = await ImagePicker.openPicker({
        mediaType: 'video',
        compressVideoPreset: 'Passthrough',
      });

      // return ;
      let formData = new FormData();
      const url = new URL(result?.path);
      const newPathName = url?.pathname?.split('/');
      const urlVideo = `https://video.bunnycdn.com/library/${libId}/videos`;
      const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          AccessKey: apiKey,
        },
        body: JSON.stringify({
          title: result?.filename || newPathName[newPathName.length - 1],
        }),
      };

      const response = await fetch(urlVideo, options);
      const data = await response?.json();

      if (Platform.OS === 'ios') {
        // formData.append('video', {
        //   name: result?.filename,
        //   uri: result?.sourceURL,
        //   type: result?.mime,
        // });
        dispatch(SubVideo({subVideo: data?.guid}));

        // setSubVideo(data?.guid);
        dispatch(
          SubFile({
            subFile: {
              name: result?.filename,
              uri: result?.sourceURL,
              type: result?.mime,
            },
          }),
        );
        // setSubFile({
        //   name: result?.filename,
        //   uri: result?.sourceURL,
        //   type: result?.mime,
        // });
        dispatch(VideoType({videoType: 'lesson'}));

        // setVideoType('lesson');
      } else if (Platform.OS === 'android') {
        dispatch(SubVideo({subVideo: data?.guid}));

        // setSubVideo(data?.guid);
        dispatch(
          SubFile({
            subFile: {
              name: result?.filename,
              uri: result?.sourceURL,
              type: result?.mime,
            },
          }),
        );
        // setSubFile({
        //   name: newPathName[newPathName.length - 1],
        //   uri: result?.path,
        //   type: result?.mime,
        // });
        dispatch(VideoType({videoType: 'lesson'}));

        // setVideoType('lesson');

        // formData.append('video', {
        //   name: newPathName[newPathName.length - 1],
        //   uri: result?.path,
        //   type: result?.mime,
        // });
      }
      dispatch(NotesVideoLoading({notesVideoLoading: true}));
      // setNotesVideoLoading(true);

      const thumbnailResponse = await createThumbnail({
        url: result?.path,
        timeStamp: 2000,
      });

      // let response = await fetch(`${API_URL_2}upload-video`, {
      //   method: 'post',
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      //   body: formData,
      // });

      // const data = await response.json();
      dispatch(NotesVideoLoading({notesVideoLoading: false}));

      // setNotesVideoLoading(false);
      if (thumbnailResponse) {
        dispatch(
          ThumbnailResponse({thumbnailResponse: thumbnailResponse?.path}),
        );

        // setThumbnailResponse(thumbnailResponse?.path);
      }
    } catch (error) {
      // return;

      showError(error?.message);
      if (error?.message == 'User did not grant library permission.') {
        if (Platform.OS === 'ios') {
          Linking.openURL('app-settings:');
        } else {
          Linking.openSettings();
        }
      }
      dispatch(NotesVideoLoading({notesVideoLoading: false}));

      // setNotesVideoLoading(false);
    }
  };

  const handleVideo = async (type: string) => {
    try {
      // const result = await DocumentPicker.pickSingle({
      //   type: [DocumentPicker.types.video],
      // });
      const result = await ImagePicker.openPicker({
        mediaType: 'video',
        compressVideoPreset: 'Passthrough',
      });

      // return ;
      let formData = new FormData();
      const url = new URL(result?.path);
      const newPathName = url?.pathname?.split('/');
      const urlVideo = `https://video.bunnycdn.com/library/${libId}/videos`;
      const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          AccessKey: apiKey,
        },
        body: JSON.stringify({
          title: result?.filename || newPathName[newPathName.length - 1],
        }),
      };

      const response = await fetch(urlVideo, options);
      const data = await response?.json();

      // return;

      if (Platform.OS === 'ios') {
        // formData.append('video', {
        //   name: result?.filename,
        //   uri: result?.sourceURL,
        //   type: result?.mime,
        // });

        if (data) {
          dispatch(Video({video: data?.guid}));

          // setVideo(data?.guid);
          dispatch(
            File({
              file: {
                name: result?.filename,
                uri: result?.sourceURL,
                type: result?.mime,
              },
            }),
          );

          // setFile({
          //   name: result?.filename,
          //   uri: result?.sourceURL,
          //   type: result?.mime,
          // });
          dispatch(VideoType({videoType: 'chapter'}));

          // setVideoType('chapter');
        }
      } else if (Platform.OS === 'android') {
        if (data) {
          dispatch(Video({video: data?.guid}));

          // setVideo(data?.guid);
          dispatch(
            File({
              file: {
                name: newPathName[newPathName.length - 1],
                uri: result?.path,
                type: result?.mime,
              },
            }),
          );

          // setFile({
          //   name: newPathName[newPathName.length - 1],
          //   uri: result?.path,
          //   type: result?.mime,
          // });
          dispatch(VideoType({videoType: 'chapter'}));

          // setVideoType('chapter');
        }

        // formData.append('video', {
        //   name: newPathName[newPathName.length - 1],
        //   uri: result?.path,
        //   type: result?.mime,
        // });
      }

      if (type === 'notes') {
        dispatch(NotesVideoLoading({notesVideoLoading: true}));

        // setNotesVideoLoading(true);
      } else {
        dispatch(Loading({loading: true}));

        // setLoading(true);
      }

      const thumbnailResponse = await createThumbnail({
        url: result?.path,
        timeStamp: 10000,
      });

      // let response = await fetch(`${API_URL_2}upload-video`, {
      //   method: 'post',
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      //   body: formData,
      // });

      // const data = await response.json();  ˝˛≤
      // console.log('videovideovideovideovideovideovideovideo', data);

      // if (data?.data?.status === 200 || data?.status === 'success') {
      //   if (type === 'chapter') {
      //     setChapterData({
      //       ...chapterData,
      //       chapterVideoLink: data?.data?.body?.link,
      //       chapterVideoName:
      //         Platform.OS === 'ios'
      //           ? (result?.filename as string)
      //           : (newPathName[newPathName.length - 1] as string),
      //     });
      //     setChapterDataError({
      //       ...chapterDataError,
      //       chapterVideoLink: '',
      //     });
      //   } else if (type === 'notes') {
      //     setNotesVideo([
      //       ...notesVideo,
      //       {
      //         notesName:
      //           Platform.OS === 'ios'
      //             ? (result?.filename as string)
      //             : (newPathName[newPathName.length - 1] as string),
      //         thumbnail: thumbnailResponse?.path,
      //         notesVideoLink: data?.data?.body?.link,
      //       },
      //     ]);
      //     let payloadNotes = {
      //       name:
      //         Platform.OS === 'ios'
      //           ? (result?.filename as string)
      //           : (newPathName[newPathName.length - 1] as string),
      //       description: 'sample',

      //       videos: [{video_url: data?.data?.body?.link}],
      //       chapter_id: successData?.data?.id || chapterId,
      //     };
      //     console.log(
      //       'this is the payload we are sending in this time',
      //       payloadNotes,
      //     );

      //     addNotesData(payloadNotes);
      //   }

      //   if (type === 'notes') {
      //     setNotesVideoLoading(false);
      //   } else {
      //     setLoading(false);
      //   }
      //   showSuccess('Video Uploaded SuccessFully');
      //   return data;
      // }
    } catch (err) {
      if (err?.message == 'User did not grant library permission.') {
        if (Platform.OS === 'ios') {
          Linking.openURL('app-settings:');
        } else {
          Linking.openSettings();
        }
      }
      showError('error while uploading the video');
    }
    return;
  };
  const handleSave = () => {

    dispatch(CourseData({courseData: {}}));
    navigation.navigate(navigationStrings.MyCourses as never);
  };

  const handleCheck = (type: string) => {
    // setChapterData({...chapterData, accessType: type});
    dispatch(ChapterData({chapterData: {...chapterData, accessType: type}}));
  };

  const handleEditChapter = (chapter: CourseChapter) => {};

  const handleUpdateChapter = () => {
    let payload = {
      name: chapterData?.chapterName,
      course_id: params?.courseId,
      type: chapterData?.accessType === 'free' ? 1 : 2,
      price: chapterData?.accessType === 'free' ? 0 : chapterData.price,
      video: chapterData?.chapterVideoLink || '',
    };
    if (payload) {
      updateChapter(payload);
    }
  };
  const handleUpdateNotes = () => {
    let notesPayload = {
      name: notes?.notesName,
      description: notes?.notesDescription,
      file: notes?.documentFileUrl,
      video_id: lessonChapterId || lessonChapter?.video_id,
      // videos:notesVideoLinks,
    };
    if (notesPayload) {
      updateNotes(notesPayload);
    }
  };
  const handleUpdateLesson = () => {
    let payload = {
      id: lessonChapter.video_id,
      video: lessonChapter?.video,
      name: lessonChapter?.name,
    };
    if (payload) {
      updateVideoData(payload);
      dispatch(LessonUpdate({lessonUpdate: false}));

      // setLessonUpdate(false);
    }
  };

  return (
    <ScrollView
      ref={scrollRef}
      contentContainerStyle={[
        commonStyles.spacingCommon,
        {backgroundColor: 'white'},
      ]}>
      <View style={{marginTop: moderateScaleVertical(12)}}>
        {getChapterLoading ? (
          <View
            style={{
              height: 120,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Progress.Circle
              color={colors.theme}
              size={moderateScale(50)}
              indeterminate
            />
          </View>
        ) : (
          <FlatList
            data={getChapterData?.data as Array<CourseChapter>}
            // data={[{name:"prince",notes:[1,2,3]},{name:"prince",notes:[1,2,3]},{name:"prince",notes:[1,2,3]}]}
            renderItem={({item}) => (
              <ChapterDetail
                handleEdit={() => {
                  handleEditChapter(item);
                  // setSelectedChapter(item);
                  dispatch(
                    SelectedChapter({
                      selectedChapter: item,
                    }),
                  );
                  dispatch(ChapterUpdate({chapterUpdate: true}));

                  // setChapterUpdate(true);
                  scrollRef.current?.scrollToEnd({
                    animated: true,
                  });
                  dispatch(NotesInit({notesInit: !false}));

                  // setNotesInit(false);
                }}
                edit
                handleDelete={() => {
                  displayAlert(
                    'Delete Chapter',
                    'Are you sure want to Delete chapter?',
                    () => handleDeleteChapter(item?.id as number),
                  );
                }}
                deleteChapter
                chapterName={item?.name}
                canSee
                notesNumber={item?.videos?.length as any}
                // duration={'30min 40sec'}
                notesInfo={item?.videos}
              />
            )}
          />
        )}
      </View>

      <View style={styles.addNewChapterContainer}>
        <Text style={styles.textHeading}>{mainStrings.AddNewChapter}</Text>
        <View style={styles.textInputContainer}>
          <Text style={styles.textInputHeading}>{mainStrings.Chapter}</Text>
          <CustomTextInput
            placeholder={mainStrings.ChapterName}
            containerStyle={{}}
            isError={!!chapterDataError?.chapterName}
            onChangeText={e => {
              // dispatch(CourseData({...courseData,chapterName:e}));
              if (chapterDataError?.chapterName) {
                // setChapterDataError({...chapterDataError, chapterName: ''});
                dispatch(
                  ChapterDataError({
                    chapterDataError: {...chapterDataError, chapterName: ''},
                  }),
                );
              }
              dispatch(
                ChapterData({chapterData: {...chapterData, chapterName: e}}),
              );

              // setChapterData({...chapterData, chapterName: e});
            }}
            value={chapterData?.chapterName}
          />
          {chapterDataError?.chapterName && (
            <ErrorMessage
              message={chapterDataError?.chapterName}
              errorStyle={{marginLeft: moderateScaleVertical(10)}}
            />
          )}
        </View>

        {!getChapterData?.data?.length && (
          <View style={styles.textInputContainer}>
            <Text style={styles.textHeading}>
              {mainStrings.UploadIntroductionVideo}
            </Text>
            <TouchableOpacity onPress={() => handleVideo('chapter')}>
              {!chapterData.chapterVideoLink ? (
                loading ? (
                  <View
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'row',
                      padding: moderateScaleVertical(12),
                    }}>
                    <Progress.Circle
                      color={colors.theme}
                      size={moderateScale(20)}
                      indeterminate
                    />
                    {+progress > 0 && <Text>{`${progress}%`}</Text>}
                  </View>
                ) : (
                  <View style={styles.uploadPhotoContainer}>
                    <Text style={styles.textHeading}>+</Text>
                    <Text
                      style={{
                        fontFamily: fontFamily.Poppins_Regular,
                        fontSize: textScale(14),

                        color: colors.gray1,
                      }}>
                      {mainStrings.UploadIntroductionVideo}
                    </Text>
                  </View>
                )
              ) : (
                <View style={styles.uploadPhotoContainer}>
                  <Text
                    style={{
                      fontFamily: fontFamily.Poppins_Regular,
                      fontSize: textScale(14),

                      color: colors.gray1,
                    }}>
                    {chapterData?.chapterVideoName}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        )}
        {/* {!!courseChapterData?.length && (
          <>
            <Text
              style={[styles.textHeading, {marginVertical: moderateScale(12)}]}>
              {mainStrings.MediaType}
            </Text>
            <View style={[styles.mediaTypeContainer]}>
              <TouchableOpacity onPress={handleVideo}>
                <MediaType>
                  {loading ? (
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
        )} */}
        {chapterDataError?.chapterVideoLink && (
          <ErrorMessage
            message={chapterDataError?.chapterVideoLink}
            errorStyle={{marginLeft: moderateScaleVertical(10)}}
          />
        )}

        {!!getChapterData?.data?.length && (
          <>
            <Text
              style={[styles.textHeading, {marginVertical: moderateScale(12)}]}>
              {mainStrings.Access}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: moderateScale(12),
              }}>
              <TouchableOpacity onPress={() => handleCheck('free')}>
                <View style={[styles.checkContainer]}>
                  <Icon
                    name="checksquare"
                    size={20}
                    color={
                      chapterData.accessType === 'free'
                        ? colors.theme
                        : colors.grey1
                    }
                  />

                  <Text
                    style={[
                      styles.textHeading,
                      {marginVertical: moderateScale(12)},
                    ]}>
                    {mainStrings.Free}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleCheck('paid')}>
                <View style={[styles.checkContainer]}>
                  <Icon
                    name="checksquare"
                    size={20}
                    color={
                      chapterData?.accessType === 'paid'
                        ? colors.theme
                        : colors.grey1
                    }
                  />

                  <Text
                    style={[
                      styles.textHeading,
                      {marginVertical: moderateScale(12)},
                    ]}>
                    {mainStrings.Paid}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </>
        )}
        {chapterData?.accessType === 'paid' && (
          <View
            style={[
              styles.textInputContainer,
              {
                marginTop: moderateScaleVertical(16),
              },
            ]}>
            <Text style={styles.textHeading}>
              {mainStrings.EnterPriceforthisChapter}
            </Text>
            <CustomTextInput
              placeholder={mainStrings.Price}
              inputStyle={{fontFamily: fontFamily.Poppins_SemiBold}}
              value={chapterData.price}
              isError={!!chapterDataError.price}
              keyboardType="numeric"
              onChangeText={e => {
                if (
                  chapterDataError?.price &&
                  chapterData.accessType === 'paid'
                ) {
                  dispatch(
                    ChapterDataError({
                      chapterDataError: {...chapterDataError, price: ''},
                    }),
                  );

                  // setChapterDataError({...chapterDataError, price: ''});
                }
                dispatch(
                  ChapterData({chapterData: {...chapterData, price: e}}),
                );

                // setChapterData({...chapterData, price: e});
              }}
            />
            {!!chapterDataError?.price && (
              <ErrorMessage
                message={chapterDataError?.price}
                errorStyle={{marginLeft: moderateScaleVertical(10)}}
              />
            )}
          </View>
        )}

        {chapterUpdate ? (
          <CommonButton
            mainViewStyle={{marginHorizontal: 0}}
            btnText="Update Chapter Detail"
            onPressBtn={handleUpdateChapter}
          />
        ) : null}
        <View style={styles.textInputContainer}>
          {(!!selectedChapter?.videos?.length as any) && (
            <>
              <Text style={styles.textInputHeading}>
                {mainStrings.lessonName}
              </Text>
              <View>
                <FlatList
                  data={selectedChapter?.videos}
                  renderItem={({item}) => (
                    <NotesBox
                      notesName={item?.name}
                      notesDesc={''}
                      notesFile={''}
                      edit
                      deleteCurr
                      handleDelete={() =>
                        displayAlert(
                          'Delete Lessons',
                          'Are you sure want to Delete it?',
                          () => handleDeleteLesson(item?.id, item?.video_url),
                        )
                      }
                      handleEdit={() => {
                        displayAlert(
                          'Edit Lessons',
                          'Are you sure want to edit it?',
                          () => handleLessonEdit(item),
                        );
                      }}
                    />
                  )}
                />
              </View>
            </>
          )}

          {!!notesInit && !!chapterData?.chapterName ? (
            <ModalView
              notes={notes}
              handleUpdateLesson={handleUpdateLesson}
              lessonUpdate={lessonUpdate}
              // setLessonUpdate={setLessonUpdate}
              lessonChapterId={lessonChapterId ?? ''}
              notesError={notesError}
              notesUpdate={notesUpdate}
              addNote={addNote}
              // setAddNote={setAddNote}
              handleSubChapterVideo={handleSubChapterVideo}
              // setNotesError={setNotesError}
              // setNotes={setNotes}
              thumbnail={thumbnailResponse}
              notesVideo={notesVideo}
              loading={docUploading}
              notesLoading={notesVideoLoading}
              handleVideo={handleVideo}
              handleDocument={handleDocument}
              handleSaveNotes={handleSaveNotes}
              lessonChapter={lessonChapter}
              // setLessonChapterError={setLessonChapterError}
              // setLessonChapter={setLessonChapter}
              progress2={progress2}
              lessonChapterError={lessonChapterError}
            />
          ) : null}
        </View>

        {(!!getNotesData?.data?.length as any) ? (
          <>
            <Text style={styles.textInputHeading}>{mainStrings.Notes}</Text>
            <View>
              <FlatList
                scrollEnabled={false}
                data={getNotesData?.data}
                renderItem={({item}) => (
                  <NotesBox
                    notesName={item?.name}
                    notesDesc={item?.description}
                    notesFile={(item?.file as any) || ''}
                    edit
                    deleteCurr
                    handleEdit={() => {
                      displayAlert(
                        'Edit Notes',
                        'Are you sure want to edit it?',
                        () => handleNotesEdit(item),
                      );
                    }}
                    handleDelete={() =>
                      displayAlert(
                        'Delete Notes',
                        'Are you sure want to Delete it?',
                        () => handleDeleteNotes(item),
                      )
                    }
                  />
                )}
              />
            </View>
          </>
        ) : null}
        {notesUpdate ? (
          <CommonButton
            mainViewStyle={{marginHorizontal: 0}}
            btnText="Update Notes Detail"
            onPressBtn={handleUpdateNotes}
          />
        ) : null}

        {!lessonUpdate && (
          <View style={{marginVertical: moderateScaleVertical(12)}}>
            <DottedButton
              btnText={
                chapterData?.notes?.length ? '+Add more Lessons' : '+Add Lesson'
              }
              onPressBtn={handleAddNotes}
            />
          </View>
        )}

        <View>
          <View
            style={{
              marginVertical: moderateScaleVertical(12),
            }}>
            <DottedButton
              btnText={'+ Add More Chapters'}
              onPressBtn={handleAddChapter}
            />
          </View>
          <CommonButton
            btnText="Save"
            onPressBtn={handleSave}
            mainViewStyle={{marginLeft: 0, marginBottom: verticalScale(30)}}
          />
        </View>
      </View>
      <View style={{height: 2, backgroundColor: colors.grey2}}></View>
    </ScrollView>
  );
}

export default AddChapter;

const styles = StyleSheet.create({
  addNewChapterContainer: {
    marginTop: moderateScaleVertical(20),
  },

  textHeading: {
    fontFamily: fontFamily.Poppins_SemiBold,
    fontSize: textScale(15),
    color: colors.black,
  },

  textInputHeading: {
    fontFamily: fontFamily.Poppins_Regular,
    fontSize: textScale(14),
    color: colors.grey1,
  },
  textInputContainer: {
    marginVertical: moderateScaleVertical(8),
  },
  uploadPhotoContainer: {
    height: moderateScaleVertical(50),

    justifyContent: 'center',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 0.5,
    alignItems: 'center',

    borderColor: colors.blackOpacity25,
    marginVertical: moderateScaleVertical(10),
  },

  mediaType: {
    width: moderateScale(45),
    height: moderateScaleVertical(45),
    backgroundColor: colors.lightThemeBlue,
    borderRadius: moderateScale(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  mediaTypeContainer: {
    flexDirection: 'row',
    gap: moderateScale(16),
    marginBottom: moderateScaleVertical(12),
  },
  notesContainer: {
    backgroundColor: colors.lightThemeBlue,
    padding: moderateScale(16),
    paddingVertical: moderateScale(10),
    borderRadius: moderateScale(12),
    marginVertical: moderateScaleVertical(12),
  },
  checkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(12),
  },
  modal: {
    backgroundColor: 'white',

    marginVertical: moderateScale(12),
    // padding: moderateScale(16),
    // paddingVertical: moderateScaleVertical(20),
  },
  notesVideoContainer: {},
  thumbnailImage: {
    // height:moderateScale(120),
    width: '100%',

    overflow: 'hidden',
    borderRadius: moderateScale(12),
    // backgroundColor:"red",
    marginRight: moderateScale(16),
  },
  notesImgContainer: {
    width: '100%',
    height: moderateScaleVertical(150),
    borderRadius: moderateScale(12),
    overflow: 'hidden',
  },
  notesImg: {
    width: '100%',
    height: '100%',
  },
  notesThumbText: {
    color: colors.black,
    fontFamily: fontFamily.Poppins_SemiBold,
    fontSize: textScale(14),
    textAlign: 'center',
    marginTop: moderateScaleVertical(8),
  },
  notesListContainer: {
    // height:moderateScaleVertical(120),
  },
});
