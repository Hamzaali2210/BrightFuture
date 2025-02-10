import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  InteractionManager,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Progress from 'react-native-progress';
import navigationStrings from '../../../../constants/navigationStrings';
import useGetData from '../../../../hooks/useGetData';
import colors from '../../../../styles/colors';
import commonStyles from '../../../../styles/commonStyles';
import fontFamily from '../../../../styles/fontFamily';

import {
  height,
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../styles/responsiveSize';
import {CourseChapter, TabType} from '../../../../types/uiType';
import {endpoints} from '../../../../utils/endpoints';
import {formatTime} from '../../../../utils/logicFunctions';
import CustomTab from '../../../Layout/TabLayout/CustomTab';
import ChapterDetail from '../AddCourse/AddChapter/ChapterDetail';
import InstructorCourseHeader from './InstructorCourseHeader';
import {useDispatch, useSelector} from 'react-redux';

import TrashIcon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import {
  ChapterData,
  ChapterDataError,
  ChapterId,
  ChapterLength,
  LessonChapter,
  LessonChapterId,
  LessonUpdate,
  NotesData,
  PositionId,
  Video,
} from '../../../../redux/slice/chapterSlice';
import ModalCard from '../../../Layout/Card/ModalCard';
import AddNewChapterModal from '../AddCourse/AddChapterModal/AddNewChapterModal';
import AddNewLesson from '../AddCourse/AddChapterModal/AddNewLesson';
import AddNewNotes from '../AddCourse/AddChapterModal/AddNewNotes';
import ModalDelete from '../../../Layout/Card/ModalDelete';
import WarningIcon from 'react-native-vector-icons/FontAwesome';
import usePostData from '../../../../hooks/usePostData';
import {showError, showSuccess} from '../../../../utils/helperFunctions';
import {mainStrings, validationErrorMessage} from '../../../../constants/mainstrings';
import AddTypeModal from '../AddCourse/AddChapterModal/AddTypeModal';
import ChapterDetailProgress from '../AddCourse/AddChapter/ChapterDetailProgress';
import ReviewList from '../../Instructor/ReviewList';
import ModalSuccess from '../../../Layout/Card/ModalSuccess';
import imagePath from '../../../../constants/imagePath';
import CommonButton from '../../../CommonButton';
import AddOptionModal from '../AddCourse/AddChapterModal/AddOptionModal';
import EnrolledStudents from './EnrolledStudents';
import EmptyScreen from '../../../EmptyScreen';
import ChapterLoader from '../../../Loader/ChapterLoader';
import Orientation from 'react-native-orientation-locker';
// import ReviewList from '../SingleCourseDetail/ReviewList';

const tabArray: Array<TabType> = [
  {
    index: 0,
    label: 'Lessons',
  },
  {
    index: 1,
    label: 'Reviews',
  },
  {
    index: 2,
    label: 'My Students',
  },
];

const InstructorCourse = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  

  const handleBack = () => {
    navigation.goBack();
  };
  const {params}: any = useRoute();
  const [pageCurrent, setPageCurrent] = useState<number>(0);
  const [currentVideo, setCurrentVideo] = useState('');
  const [chapterIdDetail, setChapterIdDetail] = useState({});
  const [chapterDataLocal, setChapterDataLocal] = useState();
  const [deleteChapterModal, setDeleteChapterModal] = useState<boolean>(false);

  const chapId = useSelector((state: any) => state?.chapter?.chapterId);
  const lessonUpdate = useSelector(
    (state: any) => state?.chapter?.lessonUpdate,
  );
  const lessonChapter = useSelector(
    (state: any) => state?.chapter?.lessonChapter,
  );
  const isFocused= useIsFocused();

  useEffect(()=>{
        // if(isFocused){
        //   Orientation.unlockAllOrientations();
        // }else{
        //   Orientation.lockToPortrait()
        // }
        Orientation.lockToPortrait()
       
  // },[isFocused])
},[])

const courseId = params?.CourseId ?? null;
  

  const {
    isError: isInstructorCourseError,
    error: instructorCourseError,
    data: instructorCourseDa,
    isSuccess: instructorCourseSuccess,
    isLoading: instructorCourseLoading,
  } = useGetData(`${endpoints.INSTRUCTOR_COURSES}/${courseId ? `${endpoints.CHAPTERS}?course_id=${courseId}` : null}`, [
    'INSTRUCTOR_COURSES_DETAIL',
  ]);
  console.log("new view is this",params?.CourseId);
  

  const instructorCourseData: any = {instructorCourseDa};

  console.log("instructorChapterRR",instructorCourseData);


  const {
    isError: isInstructorChapterError,
    error: instructorChapterError,
    data: instructorChapterDa,
    isSuccess: instructorChapterSuccess,
    isLoading: instructorChapterLoading,
    refetch,
  } = useGetData(`${endpoints.CHAPTERS}?course_id=${params?.CourseId}`, [
    'INSTRUCTOR_CHAPTER_DETAIL',
    instructorCourseDa,
  ]);


  console.log(
    'instructorCourseDainstructorCourseDainstructorCourseDainstructorCourseDa',
    instructorCourseData,
  );


  console.log("isLoading",instructorChapterLoading);

  useEffect(() => {
    if (instructorChapterDa) {
      const info = instructorChapterDa?.data[0]?.video_and_notes?.find(item=>item?.video_url);
      setCurrentVideo(info);
    }
    if (instructorChapterDa?.data?.length) {
      dispatch(
        ChapterLength({chapterLength: instructorChapterDa?.data?.length}),
      );
    }
  }, [instructorChapterDa]);

  function handleAddCourse() {
    navigation.navigate(navigationStrings.AddChapter, {
      courseId: params?.CourseId,
    });
  }

  function totalDuration(item: any) {
    const total = item?.reduce(
      (accumulator: number, currentValue: {duration: number}) => {
        return accumulator + currentValue?.duration;
      },
      0,
    );

    return total;
  }

  function totalViews(item: any) {
    const total = item?.reduce(
      (accumulator: number, currentValue: {views: number}) => {
        return accumulator + currentValue?.views;
      },
      0,
    );

    return total;
  }

  const handleAdd = () => {};

  const chapterData = useSelector((state: any) => state?.chapter?.chapterData);
  const notes = useSelector((state: any) => state?.chapter?.notes);
  const video = useSelector((state: any) => state?.chapter?.video);
 

  const chapterDataError: any = useSelector(
    (state: any) => state?.chapter?.chapterDataError,
  );

  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);
  const [isModalVisible3, setModalVisible3] = useState(false);
  const [isModalVisible4, setModalVisible4] = useState(false);
  const [isModalVisible5, setModalVisible5] = useState(false);

  const [addModal, setAddModal] = useState<boolean>(false);

  const [lessonTickModal, setLessonTickModal] = useState(false);
  const [notesTickModal, setNotesTickModal] = useState(false);

  const [markComplete, setMarkComplete] = useState(false);

  const toggleMark = () => {
    console.log(
      'markCompletemarkCompletemarkCompletemarkComplete',
      currentVideo,
    );

    setMarkComplete(!markComplete);
  };

  const toggleAddModal = (item?: any) => {
    
    console.log('asdasdasdasdasdasdadasd', item);

    dispatch(ChapterId({chapterId: item.id}));
    dispatch(
      ChapterData({
        chapterData: {
          ...chapterData,
          accessType: Number(item?.price) > 0 ? 'paid' : 'free',
          price: item?.price,
          chapterName: item?.name,
          id: item?.id,
        },
      }),
    );
    setChapterIdDetail({id: item.id, name: item?.name});
    setAddModal(!addModal);
  };

  const toggleModal = (item?: any) => {
    dispatch(ChapterId({chapterId: item?.id}));
    dispatch(
      ChapterData({
        chapterData: {
          ...chapterData,
          accessType: Number(item?.price) > 0 ? 'paid' : 'free',
          price: item?.price,
          chapterName: item?.chapterName,
          id: item?.id,
        },
      }),
    );
    // setModalVisible5(!isModalVisible5);
    setModalVisible(!isModalVisible);
  };

  const toggleModal2 = (chapterId?: number, lessonItem?: any) => {
    console.log("lessonUpdatelessonUpdatelessonUpdatelessonUpdatelessonUpdate",lessonItem);
    
    if (lessonItem?.id) {
      dispatch(LessonUpdate({lessonUpdate: true}));

      dispatch(
        LessonChapter({
          lessonChapter: {
            ...lessonChapter,
            name: lessonItem?.name,
            video:lessonItem?.video_url,
            video_id: lessonItem?.id,
            file_name: lessonItem?.file_name,
          },
        }),
      );
      dispatch(Video({video: lessonItem?.id}));
    }

    // dispatch(ChapterId({chapterId: chapterId}));
    // setModalVisible5(!isModalVisible5);
    setModalVisible2(!isModalVisible2);
  };
  const toggleModal5 = (chapterId?: number, lessonItem?: any) => {
    // dispatch(ChapterId({chapterId: chapterId}));
    setModalVisible5(!isModalVisible5);
    // setModalVisible2(!isModalVisible2);
  };
  const toggleModal3 = (
    lessonId?: number,
    notesItem?: any,
    chapterNotes?: boolean,
  ) => {
    console.log(
      'chapterNoteschapterNoteschapterNoteschapterNoteschapterNotes',
      lessonId,
      chapId,
      notesItem,
    );
    // return;
   


    if (notesItem) {
      dispatch(
        NotesData({
          notes: {
            ...notes,
            notesName: notesItem?.name,
            id: notesItem?.id,
            isLesson: chapterNotes,
            documentFileUrl: notesItem?.file ?? '',
            documentFile:{
                name:notesItem?.file_name
            }
          },
        }),
      );
    } else {
      dispatch(
        NotesData({
          notes: {
            ...notes,
            notesName: '',
            id: '',
            documentFileUrl: '',
            documentFile:'',
            isLesson: chapterNotes,
          },
        }),
      );
    }
    // dispatch(LessonChapterId({lessonChapterId: lessonId?.id}));
    InteractionManager.runAfterInteractions(() => {
      setTimeout(() => {
        setModalVisible3(!isModalVisible3);
      }, 50);
    });
  };

  const toggleModal4 = (lessonId?: number) => {
    setModalVisible4(!isModalVisible4);
  };

  const handleDelete = (id: number) => {
    setModalVisible4(!isModalVisible4);
    setChapterId(id);
  };

  // handle delete use post data

  const {mutate: deleteNotes, status: deleteNotesStatus} = usePostData(
    `${endpoints.DELETE_NOTES}`,
    ['DELETE_NOTES'],
    'delete',
    (data: any) => {
      showSuccess(data?.message || 'notes has been deleted successfully');
      refetch();
    },
    (error: any) => {
      if (error?.message) {
        showSuccess(error?.message || 'there was error while delete notes');
      } else {
        showError(error || 'there was error while delete notes');
      }
    },
  );

  const errorChecker = () => {
    if (!chapterData.chapterName) {
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

    if (chapterData.accessType === 'paid' && !chapterData.price) {
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

  const handleEditChapter = (item: any) => {
    // return;
    // const errorFree= errorChecker()
    // setChapterDataLocal()
    toggleModal(item);

    return;
  };

  const handleOpen = (id: number) => {
    if (id === 0) {
      InteractionManager.runAfterInteractions(() => {
        setTimeout(() => {
          toggleModal2();
        }, 50);
      });
    } else if (id === 1) {
      console.log('idhar khulna to chaiye na');
      InteractionManager.runAfterInteractions(() => {
        setTimeout(() => {
          // setModalVisible3(true)
          toggleModal3(undefined, undefined, true);
        }, 50);
      });
    }
    setModalVisible5(false);
  };

  useEffect(()=>{
    if(!isModalVisible2){
      dispatch(
        LessonChapter({
          lessonChapter: {
            ...lessonChapter,
            name: '',
            video_id: '',
            file_name:"",
          },
        }),
      );
     
    }
    if(!lessonUpdate){
      dispatch(LessonUpdate({lessonUpdate: false}));
    }

    if(video){
      dispatch(Video({video: ''}));
    }
},[isModalVisible2])

console.log("instructorDATA1122",instructorChapterDa);


  return (
    <View>
      <InstructorCourseHeader
        handleBack={handleBack}
        handleAdd={handleAdd}
        courseData={instructorCourseDa as any}
        toggleModal={toggleModal}
        currentVideo={currentVideo}
        toggleMark={toggleMark}
        markComplete={markComplete}
      />

      <CustomTab
        tabTitle={tabArray}
        pagerViewStyle={{minHeight: moderateScaleVertical(350)}}
        highlightedColor={colors.themeYellow}
        pageCurrent={pageCurrent}
        setPageCurrent={setPageCurrent}
        tabStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          // borderBottomWidth: 2,
        }}>
        <View key={0}>
          <View style={[commonStyles.spacingCommon]}>
            {/* {instructorChapterLoading ? (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                }}>
                <Progress.Circle size={80} indeterminate color={colors.theme} />
              </View>
            ) : (
              <FlatList
                data={instructorChapterDa?.data as Array<CourseChapter>}
                style={{marginTop: moderateScale(16)}}
                // data={[{name:"prince",notes:[1,2,3]},{name:"prince",notes:[1,2,3]},{name:"prince",notes:[1,2,3]}]}
                renderItem={({item, index}) => {
                  return (
                    <ChapterDetail
                      handleEdit={() => handleEditChapter(item)}
                      chapterId={item?.id as number}
                      chapterName={item?.name}
                      canSee
                      edit
                      addBtn
                      deleteChapter
                      setCurrentVideo={setCurrentVideo}
                      refetch={refetch}
                      // handleAdd={() => toggleModal2(item?.id as number)}
                      handleAdd={() => toggleModal5(item?.id as number)}
                      handleAddNotes={toggleModal3}
                      handleEditVideo={toggleModal2}
                      handleEditNotes={toggleModal3}
                      handleDelete={() => handleDelete(item?.id as number)}
                      lessonNo={index + 1}
                      notesNumber={item?.videos?.length as any}
                      duration={formatTime(totalDuration(item?.videos))}
                      views={totalViews(item?.videos)}
                      notesInfo={item?.videos}
                    />
                  );
                }}
              />
            )} */}
            {instructorChapterLoading ? (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                }}>
                  <ChapterLoader/>
                {/* <Progress.Circle size={moderateScale(80)} indeterminate color={colors.theme} /> */}
              </View>
            ) : (
              <FlatList
                data={instructorChapterDa?.data as Array<CourseChapter>}
                style={{marginTop: moderateScale(8),marginBottom:moderateScaleVertical(20)}}
                ListEmptyComponent={() => {
                  return (
                    <EmptyScreen
                      image={imagePath.noChapter}
                      style={{height:350}}
                      heading={'No Chapters Added'}
                      description={mainStrings.noChapterEmpty}
                    />
                  );
                }}
                // data={[{name:"prince",notes:[1,2,3]},{name:"prince",notes:[1,2,3]},{name:"prince",notes:[1,2,3]}]}
                renderItem={({item, index}) => {
                  const newArr = [
                    ...(item.notes || []),
                    ...(item.videos || []),
                  ];
                  // const newArr = [
                  //   ...(item.notes || []),
                  //   ...(item.videos || []),
                  // ];

                  newArr.sort(
                    (a: any, b: any) =>
                      new Date(b.created_at).getTime() -
                      new Date(a.created_at).getTime(),
                  );
                  console.log(
                    'file file file file new new new new ',
                    newArr,
                    item.notes,
                    item.videos,
                  );
                  // return <></>
                  return (
                    <ChapterDetailProgress
                      handleEdit={() => handleEditChapter(item)}
                      chapterId={chapterIdDetail as number || chapId}
                      chapterName={item?.name}
                      price={item?.price}
                      canSee={item?.can_view}
                      edit
                      addBtn
                      deleteChapter
                      setCurrentVideo={setCurrentVideo}
                      // deleteChapter={}
                      refetch={refetch}
                      chapterDetail={item}
                      // handleAdd={() => toggleModal2(item?.id as number)}
                      handleAdd={() => toggleModal5(item?.id as number)}
                      handleAddOption={() => toggleAddModal(item)}
                      handleAddNotes={toggleModal3}
                      handleEditVideo={toggleModal2}
                      handleEditNotes={toggleModal3}
                      handleDelete={() => handleDelete(item?.id as number)}
                      setDeleteChapterModal={setDeleteChapterModal}
                      deleteChapterModal={deleteChapterModal}
                      lessonNo={index + 1}
                      courseId={instructorCourseData?.instructorCourseDa?.data?.id}
                      notesNumber={
                        item?.notes_count
                      }
                      videoNumber={item?.videos_count}
                      
                      duration={formatTime(totalDuration(item?.video_and_notes?.filter((item)=>item?.duration)))}
                      views={totalViews(item?.video_and_notes?.filter((item)=>item?.views))}
                      notesInfo={item.courses.related_notes.filter(note => 
                        note.chapter_id === item.courses.chapters[index]?.id
                      )}
                    />
                  );
                }}
              />
            )}
          </View>
        </View>
        <View
          key={1}
          style={[{backgroundColor: colors.white}, commonStyles.spacingCommon]}>
          <ReviewList
            courseId={instructorCourseData?.instructorCourseDa?.data?.id}
            type={'course'}
          />
        </View>
        <View key={2} style={{backgroundColor: colors.white,marginBottom:moderateScaleVertical(80)}}>
          <EnrolledStudents courseId={params?.CourseId} />
        </View>
      </CustomTab>
      {/* <TouchableOpacity onPress={() => handleAddCourse()} style={styles.addBtn}>
        <Text style={styles.addBtnText}>+ Add Chapter</Text>
      </TouchableOpacity> */}

      <ModalCard isModalVisible={addModal} toggleModal={toggleAddModal} isCancel>
        <View
          style={[
            commonStyles.spacingCommon,
            {paddingHorizontal: moderateScale(8)},
          ]}>
          <Text
            style={{
              fontFamily: fontFamily.Poppins_Bold,
              fontSize: textScale(18),
              color: colors.black,
              marginVertical: moderateScale(12),
            }}>
            {chapterData?.chapterName}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            {
              <TouchableOpacity
                style={{
                  overflow: 'hidden',
                  height: moderateScale(80),
                  width: moderateScale(80),
                  justifyContent: 'center',
                  alignItems: 'center',

                  backgroundColor: colors.themeLightColor,
                  borderRadius: moderateScale(800),
                  borderColor: colors.theme,
                }}
                onPress={() => {
                  // handleEdit && handleEdit(chapterId as number);
                  // handleEdit && handleEdit(item as number);
                  // handleEditNotes && handleEditNotes(undefined, item);
                  setAddModal(false);

                  InteractionManager.runAfterInteractions(() => {
                    setTimeout(() => {
                      toggleModal5();
                    }, 50);
                  });
                }}>
                <Icon5
                  color={colors.theme}
                  size={moderateScale(30)}
                  name="photo-video"
                />
                {/* <Text numberOfLines={1} style={{fontFamily:fontFamily.Poppins_Regular,color:colors.black,fontSize:moderateScale(12)}}>Gallery</Text> */}
              </TouchableOpacity>
            }
            {
              <TouchableOpacity
                style={{
                  overflow: 'hidden',
                  height: moderateScale(80),
                  width: moderateScale(80),
                  justifyContent: 'center',
                  alignItems: 'center',

                  backgroundColor: colors.themeLightColor,
                  borderRadius: moderateScale(800),
                  borderColor: colors.theme,
                }}
                onPress={() => {
                  setAddModal(false);
                  InteractionManager.runAfterInteractions(() => {
                    setTimeout(() => {
                      // setChapterDataLocal()
                      handleEditChapter &&
                        handleEditChapter(chapterData as number);
                    }, 50);
                  });

                  // handleEdit && handleEdit(item as number);
                  // handleEditNotes && handleEditNotes(undefined, item);
                }}>
                <Icon5
                  color={colors.theme}
                  size={moderateScale(30)}
                  name="pencil-alt"
                />
              </TouchableOpacity>
            }
            {
              <TouchableOpacity
                style={{
                  overflow: 'hidden',
                  height: moderateScale(80),
                  width: moderateScale(80),
                  justifyContent: 'center',
                  alignItems: 'center',

                  backgroundColor: colors.themeLightColor,
                  borderRadius: moderateScale(800),
                  borderColor: colors.theme,
                }}
                onPress={() => {
                  setAddModal(false);
                  InteractionManager.runAfterInteractions(() => {
                    setTimeout(() => {
                      setDeleteChapterModal(!deleteChapterModal);
                    }, 50);
                  });
                }}>
                <TrashIcon
                  size={moderateScale(30)}
                  color={colors.red}
                  name="trash-o"
                />
              </TouchableOpacity>
            }
          </View>
        </View>
      </ModalCard>

      <ModalCard isModalVisible={isModalVisible5} toggleModal={toggleModal5} isCancel>
        <AddTypeModal
          toggleModal={toggleModal5}
          refetch={refetch}
          handleModal={handleOpen}
        />
      </ModalCard>

      <ModalCard isModalVisible={isModalVisible} toggleModal={toggleModal} isCancel>
        <AddNewChapterModal
          courseId={instructorCourseData?.instructorCourseDa?.data?.id}
          toggleModal={toggleModal}
          refetch={refetch}
        />
      </ModalCard>

      <ModalCard isModalVisible={isModalVisible2} toggleModal={toggleModal2} isCancel>
        <AddNewLesson
          courseId={instructorCourseData?.instructorCourseDa?.data?.id}
          toggleModal={toggleModal2}
          refetch={refetch}
        />
        {/* <Text>prince sa</Text> */}
      </ModalCard>

      {
        <ModalCard
          isModalVisible={isModalVisible3}
          isCancel
          toggleModal={toggleModal3}>
          <AddNewNotes toggleModal={toggleModal3} refetch={refetch} />
        </ModalCard>
      }

      <ModalDelete isModalVisible={isModalVisible4} toggleModal={toggleModal4}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: moderateScaleVertical(20),
          }}>
          <WarningIcon
            color={colors.red}
            size={moderateScale(100)}
            name="warning"
          />
          <Text
            style={{
              fontFamily: fontFamily.Poppins_Medium,
              color: colors.black,
              fontSize: textScale(16),
              textAlign: 'center',
            }}>
            Are you sure want to delete it?
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: moderateScale(20),
              marginTop: moderateScale(12),
            }}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible4(!isModalVisible4);
              }}
              style={{
                paddingHorizontal: moderateScale(16),
                borderRadius: moderateScale(8),
                backgroundColor: colors.grey1,
                paddingVertical: moderateScaleVertical(12),
              }}>
              <Text
                style={{
                  color: colors.white,
                  fontFamily: fontFamily.Poppins_Medium,
                }}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalVisible4(!isModalVisible4);
                // deleteChapter({id: chapterId});
              }}
              style={{
                paddingHorizontal: moderateScale(16),
                borderRadius: moderateScale(8),
                backgroundColor: colors.red,
                paddingVertical: moderateScaleVertical(12),
              }}>
              <Text
                style={{
                  color: colors.white,
                  fontFamily: fontFamily.Poppins_Medium,
                }}>
                Confirm
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ModalDelete>
    </View>
  );
};

export default InstructorCourse;

const styles = StyleSheet.create({
  addBtn: {
    position: 'absolute',
    backgroundColor: colors.themeDark,
    padding: moderateScale(12),
    paddingHorizontal: moderateScale(16),
    borderRadius: moderateScale(100),
    bottom:
      height < 700 ? moderateScaleVertical(120) : moderateScaleVertical(40),
    right: moderateScale(20),
  },
  addBtnText: {
    fontFamily: fontFamily.Poppins_Medium,
    fontSize: textScale(14),
    color: colors.white,
  },
});
