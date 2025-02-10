import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  InteractionManager,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import RightIcon from 'react-native-vector-icons/AntDesign';
import SwitchIcon from 'react-native-vector-icons/Fontisto';
import imagePath from '../../../../../constants/imagePath';
import colors from '../../../../../styles/colors';
import fontFamily from '../../../../../styles/fontFamily';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import usePostData from '../../../../../hooks/usePostData';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../../styles/responsiveSize';
import {endpoints} from '../../../../../utils/endpoints';
import {showError, showSuccess} from '../../../../../utils/helperFunctions';
import ModalCard from '../../../../Layout/Card/ModalCard';
import PdfViewContainer from '../../../../PdfViewContainer';

import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Plussquare from 'react-native-vector-icons/AntDesign';
import navigationStrings from '../../../../../constants/navigationStrings';

import TrashIcon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import ModalDelete from '../../../../Layout/Card/ModalDelete';

import WarningIcon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {formatTime, handlePressInfo} from '../../../../../utils/logicFunctions';
import SegementIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MoreIcon from 'react-native-vector-icons/Feather';
import EyeIcon from 'react-native-vector-icons/AntDesign';
import AddTypeModal from '../AddChapterModal/AddTypeModal';
import AddNewLesson from '../AddChapterModal/AddNewLesson';
import BookIcon from 'react-native-vector-icons/AntDesign';
import DeviceInfo from 'react-native-device-info';
import { ChapterId, LessonChapterId, PositionId } from '../../../../../redux/slice/chapterSlice';

import PlayIcon from '../../../../../assets/images/Icons/Play.svg'
import Arrowsalt from 'react-native-vector-icons/AntDesign'

interface ChapterDetailProgressInterface {
  chapterName: string;
  edit?: boolean;
  deleteChapter?: boolean;
  views?: string;
  notesNumber: number;
  coursePurchasable?:boolean
  handleEdit?: (id: number) => void;
  handleDelete?: (id: number) => void;
  isPurchased?: boolean;
  handleEditVideo?: (id?: number, item?: any) => void;
  // handleDeleteNotes?: (id?:number) => void;
  handleAdd?: (id: number) => void;
  handleAddNotes?: (id: number) => void;
  handleEditNotes?: () => void;
  handleCart?: (item: any, type: string) => void;
  refetch?: () => {};
  handleAddOption?: (item?: any) => void;
  chapterDetail?: any;
  duration?: string;
  canSee?: boolean;
  chapterId?: number;
  notesInfo?: any;
  studentCourse?: boolean;
  isCollapsed2?: boolean;
  setIsCollapsed2?: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentVideo?: React.Dispatch<React.SetStateAction<string>>;
  lessonNo?: number;
  addBtn?: boolean;
  segmentIcon?: boolean;
  price?: string;
  buyCourse?: boolean;
  cartLoading?: boolean;
}

const NotesInfoData: React.FC<any> = ({
  index,
  currentStep,
  buyCourse,
  notesInfo,
  item,
  length,
  views,
  addBtn,
  refetch,
  edit,
  handleSegement,
  setCurrentVideo,
  toggleModalPdf,
  handleEdit,
  handleEditNotes,
  setIsModalVisible2,
  isModalVisible2,
  setIsModalVisible,
  userData,
  handleEditVideo,
  handleAddNotes,
  deleteChapter,
  isModalVisible,
  isPurchased,
  chapterId,
  courseId,
  chapterDetail,
  // setDeleteNotesModal,
  // deleteNotesModal,
}) => {
  const progress = useSharedValue(currentStep >= index ? 1 : 0);
  const userDataPayload = useSelector((state: any) => state?.auth?.userPayload);

  const [isNotesCollapsed, setIsNotesCollapsed] = useState(true);
  const [containerHeight, setContainerHeight] = useState(0);
  const [notesModal, setNotesModal] = useState(false);
  const [notesVideoModal, setNotesVideoModal] = useState(false);
  const [deleteNotesModal, setDeleteNotesModal] = useState(false);
  const [typeModal, setTypeModal] = useState(false);
  const [lessonModal, setLessonModal] = useState(false);



  const [seletedNotes,setSelectedNotes]=useState({});
  const dispatch= useDispatch()
  console.log('indexindexindexindexindexindexindexindexindex', index, length,chapterDetail);

  useEffect(() => {
    progress.value = withTiming(currentStep >= index ? 1 : 0);
  }, [currentStep]);

  const animatedIconStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: progress.value === 1 ? colors.theme : colors.theme,
      transform: [{scale: withSpring(progress.value === 1 ? 1.2 : 1)}],
    };
  });

  const handleCollapsed = () => {
    setIsNotesCollapsed(!isNotesCollapsed);
  };

  const toggleNotesModal = () => {
    setNotesModal(!notesModal);
  };

  const toggleNotesVideoModal = () => {
    setNotesVideoModal(!notesVideoModal);
  };
  const toggleTypeModal = () => {
    setTypeModal(!typeModal);
  };

  const toggleLessonModal = () => {
    setLessonModal(!lessonModal);
  };

  const handleOpen = (id: number) => {
    setTypeModal(false);
    if (id === 0) {
      InteractionManager.runAfterInteractions(() => {
        setTimeout(() => {
          toggleLessonModal();
        }, 50);
      });
    } else if (id === 1) {
      InteractionManager.runAfterInteractions(() => {
        setTimeout(() => {
          handleAddNotes && handleAddNotes(item);
        }, 50);
      });
    }
  };

  const {mutate: deleteLesson, status: deleteLessonStatus} = usePostData(
    `${endpoints.DELETE_VIDEOS}`,
    ['DELETE_LESSONS'],
    'delete',
    (data: any) => {
      showSuccess('Lesson deleted successfully');
      setIsModalVisible(false);
      refetch && refetch();
    },
    (error: any) => {
      showSuccess('Error while deleting the Lesson');
      setIsModalVisible(false);
    },
  );

  const {mutate: deleteNotes} = usePostData(
    `${endpoints.DELETE_NOTES}`,
    ['DELETE_NOTES'],
    'delete',
    (data: any) => {
      showSuccess(data?.message || 'notes has been deleted successfully');
      refetch && refetch();
    },
    (error: any) => {
      if (error?.message) {
        showSuccess(error?.message || 'there was error while delete notes');
      } else {
        showError(error || 'there was error while delete notes');
      }
    },
  );

  const animatedLineStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: buyCourse
        ? colors.theme
        : progress.value === 1
        ? colors.theme
        : colors.theme,
      height: withTiming(
        progress.value === 1 ? containerHeight : containerHeight,
      ),
    };
  });
  return (
    <View
      style={[styles.lessonContainer]}
      onLayout={e => {
        console.log(
          'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa ',
          e.nativeEvent.layout.height,
        );
        setContainerHeight(e.nativeEvent.layout.height);
      }}>
          <ModalDelete
        isModalVisible={isModalVisible}
        toggleModal={() => {
          setIsModalVisible(!isModalVisible);
        }}>
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
            Are you sure want to delete the lesson? {item?.name}
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
                setIsModalVisible(!isModalVisible);
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
                // setIsModalVisible(!isModalVisible);
                deleteLesson({id: item?.id});
                // console.log("chapterDetailchapterDetailchapterDetail",item);
                // InteractionManager.runAfterInteractions(() => {
                //   setTimeout(() => {
                //     setIsModalVisible(!isModalVisible);
                //   }, 50);
                // });

                // Alert.alert("item item item ",JSON.stringify(item))
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
      <TouchableOpacity onPress={handleCollapsed}>
      {!!item?.is_parent && index!==0   &&  <View
        style={{
          // borderTopColor:item?.is_parent? '#D9D9D9':"transparent",
          // borderTopColor:'#D9D9D9',
          marginTop:0,
          backgroundColor:"#D9D9D9",
          // borderTopColor:item?.is_parent? 'red':'black',
          // borderTopWidth:1,
          // borderTopWidth:1,
          opacity: 0.6,
          // backgroundColor:"red",

          height:1,
          marginVertical: moderateScaleVertical(10),
          width: '80%',
          alignSelf: 'flex-end',
        }}></View>
        }
        {/* <View style={{width:2,backgroundColor:colors.greyline,flex:1,position:"absolute",height:"100%",marginLeft:moderateScale(19),marginTop:"7%"}}/> */}
        <View key={index} style={[styles.lesson]}>

          <View
            style={[
              {
                alignItems: 'center',
                marginRight: moderateScale(8),
              },
            ]}>
            {!!item?.video_url?<View
            // {true?<View
              style={{
                borderWidth:!buyCourse? moderateScale(4):moderateScale(4),
                borderColor: !buyCourse?colors.lightGreyColor:'transparent',
                borderRadius: 5000,
                backgroundColor: colors.lightGreyColor,
                bottom:moderateScaleVertical(4),

                overflow: 'hidden',
              }}>
              <Image
                style={{
                  width: moderateScale(15),
                  height: moderateScale(15),
                  // backgroundColor:"red",
                }}
                // source={
                //   buyCourse
                //     ? imagePath.radioBuy
                //     : index <= currentStep + 1
                //     ? imagePath?.blueIcon
                //     : imagePath.radioBuy
                // }
                source={buyCourse && chapterDetail?.price>0 ? imagePath.radioBuy :  imagePath?.blueIcon }
                // source={
                //   buyCourse
                //     ? imagePath.radioBlue
                //     : index <= currentStep + 1
                //     ? imagePath?.radioBlue
                //     : imagePath.radioBlue
                // }
                resizeMode='contain'
              />
            </View>:<View style={{width:moderateScale(23),height:moderateScale(23)}}>
              </View>}

            {/* {length - 1 != index || true && (
              <View style={[styles.line,{backgroundColor:colors.theme,height:containerHeight}]} />
              // <Animated.View style={[styles.line, animatedLineStyle,{backgroundColor:colors.theme,height:containerHeight}]} />
              // <></>
            )} */}
            {true && (
              <View
                style={[
                  styles.line,
                  {
                    backgroundColor: buyCourse && chapterDetail?.price>0 ? '#D1D1D1' : colors.theme,
                    height:containerHeight+moderateScale(30),
                  },
                ]}
              />
              // <Animated.View style={[styles.line, animatedLineStyle,{backgroundColor:colors.theme,height:containerHeight}]} />
              // <></>
            )}
          </View>

          <View style={[styles.lessonTitleContainer]}>
            <View style={[styles.chapterNameContainer]}>
              <View style={[styles.chapterIconRow]}>
                {!item?.video_url ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: moderateScale(3),
                    }}>
                    <TouchableOpacity
                      style={[
                        ,
                        {
                          flexDirection: 'row',
                          alignItems: 'center',
                          padding: 0,
                          flex: 1,
                        },
                      ]}
                      onPress={() => {
                        if(isPurchased || userData?.role===3 || chapterDetail?.price=='0' ){
                          toggleModalPdf(item);

                        }
                      }}>
                      <Image
                        style={{
                          width: moderateScale(20),
                          height: moderateScale(20),
                          marginRight: moderateScale(8),
                          // marginLeft:moderateScale(12),
                        }}
                        tintColor={isPurchased || userData?.role === 3 || chapterDetail?.price=='0' ?undefined:colors.grey1}
                        source={imagePath.notesLight}
                      />
                      <Text
                        style={{
                          fontFamily: fontFamily.Poppins_Medium,
                          color: colors.black,
                          fontSize: DeviceInfo.isTablet()?moderateScale(8) :textScale(10),
                        }}>
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                    {userData?.role === 3 && (
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: moderateScale(5),
                          // backgroundColor:"red",
                          left:moderateScale(18)
                        }}>
                        {edit && (
                          <TouchableOpacity
                            style={{
                              height: moderateScale(26),
                              width: moderateScale(26),
                              justifyContent: 'center',
                              alignItems: 'center',
                              backgroundColor: colors.white,
                              borderRadius: moderateScale(8),
                            }}
                            onPress={() => {
                              // handleEdit && handleEdit(item as number);
                              console.log(
                                "handleEditNoteshandleEditNoteshandleEditNoteshandleEditNotes",item
                              );
                              dispatch(ChapterId({chapterId: chapterId}));
                              dispatch(PositionId({position:item?.position}))
                              handleEditNotes &&
                                handleEditNotes(undefined, item);
                            }}>
                            <Icon5
                              color={colors.theme}
                              size={moderateScale(15)}
                              name="pencil-alt"
                            />
                          </TouchableOpacity>
                        )}
                        {deleteChapter && (
                          <TouchableOpacity
                            style={{
                              height: moderateScale(26),
                              width: moderateScale(26),
                              justifyContent: 'center',
                              alignItems: 'center',
                              backgroundColor: colors.white,
                              borderRadius: moderateScale(8),
                            }}
                            onPress={() => {
                              setDeleteNotesModal(!deleteNotesModal);
                            }}>
                            <TrashIcon
                              size={moderateScale(15)}
                              color={colors.red}
                              name="trash-o"
                            />
                          </TouchableOpacity>
                        )}
                        <TouchableOpacity
              style={{
                height: moderateScaleVertical(30),
                width: moderateScale(24),
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                // backgroundColor: colors.white,
                // top:2,
                borderRadius: moderateScale(8),
              }}
              onPress={() => {
                // Alert.alert(JSON.stringify(item?.position))
                // handleAddNotes && handleAddNotes(item?.id);
                // console.log("positionpositionpositionpositionpositionpositionposition",item);
                // return;

                dispatch(PositionId({position: item?.position}));
                toggleNotesModal();

                // handleAddNotes && handleAddNotes(item?.id);
              }}>
              <MoreIcon
                color={colors.gray1}
                name="more-vertical"
                size={moderateScale(20)}
              />
            </TouchableOpacity>

                      </View>
                    )}
                  </View>
                ) : (
                  <Text
                    style={[styles.chapterNameText, {fontSize:DeviceInfo?.isTablet()?textScale(10):textScale(13)}]}
                    numberOfLines={1}>
                    {item.name}
                  </Text>
                )}
              </View>
              {!!item?.video_url && (userDataPayload?.course_type_available || userDataPayload?.role===3) && (
                <View
                  style={[
                    styles.chapterDetailFeatureContainer,
                    {gap: moderateScale(4)},
                  ]}>
                  <View style={[styles.chapterIconRow]}>
                    <Image
                      style={{
                        width: moderateScaleVertical(10),
                        height: moderateScaleVertical(10),
                      }}
                      source={imagePath.clockBlueGrey}
                    />
                    <Text
                      style={[
                        {
                          color: 'rgba(152, 162, 179, 1)',
                          fontSize: DeviceInfo?.isTablet()?textScale(9):textScale(11),
                          marginLeft: moderateScale(2),
                        },
                      ]}>
                      {formatTime(item?.duration)}
                    </Text>
                  </View>
                  {/* <View style={[styles.chapterIconRow]}>
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
               {notesNumber} Lessons
            </Text>
          </View> */}

                  {userData?.role === 3 && (
                    <View style={[styles.chapterIconRow]}>
                      {/* <Image
                        style={{
                          width: moderateScale(10),
                          height: moderateScaleVertical(10),
                        }}
                        source={imagePath.eyeIcon}
                      /> */}
                      <EyeIcon
                        color={'rgba(152, 162, 179, 1)'}
                        name="eyeo"
                        size={moderateScaleVertical(11)}
                      />

                      <Text
                        style={[
                          {
                            color: 'rgba(152, 162, 179, 1)',
                            fontSize: DeviceInfo?.isTablet()?textScale(9):textScale(11),
                            marginLeft: moderateScale(2),
                          },
                        ]}>
                        {item?.views}
                      </Text>
                    </View>
                  )}
                </View>
              )}
            </View>
          </View>
          {userData?.role === 3 || chapterDetail?.price =='0' ? (
            <View
              style={{
                alignSelf: 'flex-start',
                flexDirection: 'row',
                alignItems: 'center',
                gap: moderateScale(2),
                left:userData?.role === 3 ?moderateScale(20): moderateScale(0),
              }}>
              {!!item?.video_url && (
                <View
                  style={{
                    alignSelf: 'flex-start',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: moderateScale(2),
                    marginLeft: moderateScale(3),
                  }}>
                  <TouchableOpacity
                    style={styles.playButton}
                    onPress={() => {
                      console.log('yeah play button chl rha he',item);

                      // setCurrentVideo && setCurrentVideo({video_url:item.video_url,id:chapterId});
                      setCurrentVideo && setCurrentVideo(item);
                    }}>
                    <Text style={styles.playButtonText}>Play</Text>
                  </TouchableOpacity>
                </View>
              )}
                {!!item?.video_url && DeviceInfo.isTablet() && (
                <View
                  style={{
                    alignSelf: 'flex-start',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: moderateScale(2),
                    marginLeft: moderateScale(3),
                  }}>
                  <TouchableOpacity
                    style={styles.playButton}
                    onPress={() => {
                      console.log('yeah play button chl rha he',item);

                      // setCurrentVideo && setCurrentVideo({video_url:item.video_url,id:chapterId});
                      setCurrentVideo && setCurrentVideo({...item,isMaximum:true});
                    }}>

                      <Arrowsalt name='arrowsalt' color={colors.white} size={textScale(11)}/>

                  </TouchableOpacity>
                </View>
              )}

              {addBtn && item?.video_url ? (
                <TouchableOpacity
                  style={{
                    height: moderateScaleVertical(30),
                    width: moderateScale(30),
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                    // backgroundColor: colors.white,
                    top:2,
                    borderRadius: moderateScale(8),
                  }}
                  onPress={() => {
                    // Alert.alert(JSON.stringify(item?.position))
                    // handleAddNotes && handleAddNotes(item?.id);
                    // console.log("positionpositionpositionpositionpositionpositionposition",item);
                    // return;

                    dispatch(PositionId({position: item?.position}));
                    toggleNotesModal();

                    // handleAddNotes && handleAddNotes(item?.id);
                  }}>
                  <MoreIcon
                    color={colors.gray1}
                    name="more-vertical"
                    size={moderateScale(20)}
                  />
                </TouchableOpacity>
              ) :  null}

              {/* {item?.video_url ||&& ( */}
            </View>
          ):<></>}

          {isPurchased &&
          item?.video_url &&
          userDataPayload?.course_type_available ? (
            <TouchableOpacity
              style={styles.playButton}
              onPress={() => {
                setCurrentVideo && setCurrentVideo(item);
              }}>
              <Text style={styles.playButtonText}>Play</Text>
            </TouchableOpacity>
          ) : null}
           {isPurchased &&
          item?.video_url && DeviceInfo.isTablet() &&
          userDataPayload?.course_type_available ? (
            <TouchableOpacity
              style={styles.playButton}
              onPress={() => {
                setCurrentVideo && setCurrentVideo({...item,isMaximum:true});
              }}>
             <Arrowsalt name='arrowsalt' color={colors.white} size={textScale(11)}/>
            </TouchableOpacity>
          ) : null}
        </View>
      </TouchableOpacity>
      <Collapsible collapsed={isNotesCollapsed}>
        <FlatList
          // data={[1,2]}
          data={item?.video_and_notes}
          scrollEnabled={false}
          renderItem={({item}) => {
            console.log('asdasdasdasdasdasdasd', item);

            return (
              <>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: moderateScaleVertical(8),
                  }}>

                  <TouchableOpacity
                    style={[
                      ,
                      {
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 0,
                        flex: 1,
                        paddingHorizontal: !item?.video_url
                          ? moderateScale(38)
                          : moderateScale(12),
                        paddingTop: moderateScaleVertical(12),
                      },
                    ]}
                    onPress={() => {
                      if (
                        !item?.video_url &&
                        userDataPayload?.course_type_available
                      ) {
                        toggleModalPdf(item);
                      }
                    }}>
                    {
                     !!item?.video_url && <View
                        style={{
                          borderWidth: moderateScale(4),
                          borderColor: colors.lightGreyColor,
                          borderRadius: 5000,
                          backgroundColor: colors.lightGreyColor,

                          overflow: 'hidden',
                        }}>
                        <Image
                          style={{
                            width: !!item?.video_url
                              ? moderateScale(15)
                              : moderateScale(24),
                            height: !!item?.video_url
                              ? moderateScale(15)
                              : moderateScale(24),
                            marginRight: moderateScale(16),
                          }}
                          source={
                            !!item?.video_url
                              ? imagePath.radioBlue
                              : imagePath.notesLight
                          }
                          // source={item?.video_url ? imagePath?.playIcon :imagePath.notesLight}
                        />
                      </View>
                    }
                    <Text
                      numberOfLines={1}
                      style={{
                        fontFamily: fontFamily.Poppins_Medium,
                        color: colors.black,
                        fontSize:DeviceInfo?.isTablet()?moderateScale(8):textScale(12),
                      }}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                  {userData?.role === 3 && !item?.video_url && (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: moderateScale(3),
                      }}>
                      {edit && (
                        <TouchableOpacity
                          style={{
                            height: moderateScale(30),
                            width: moderateScale(30),
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: colors.white,
                            borderRadius: moderateScale(8),
                          }}
                          onPress={() => {
                            // handleEdit && handleEdit(item as number);
                            if (!item?.video_url) {
                              handleEditNotes &&
                                handleEditNotes(undefined, item);
                            }
                          }}>
                          <Icon5
                            color={colors.theme}
                            size={moderateScale(18)}
                            name="pencil-alt"
                          />
                        </TouchableOpacity>
                      )}
                      {deleteChapter && (
                        <TouchableOpacity
                          style={{
                            height: moderateScale(30),
                            width: moderateScale(30),
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: colors.white,
                            borderRadius: moderateScale(8),
                          }}
                          onPress={() => {
                            if (!item?.video_url) {
                              setIsModalVisible2(!isModalVisible2);
                            }
                          }}>
                          <TrashIcon
                            size={moderateScale(18)}
                            color={colors.green}
                            name="trash-o"
                          />
                          {/* <Text >Prince saaaa</Text> */}
                        </TouchableOpacity>
                      )}
                    </View>
                  )}

                <View
              style={{
                alignSelf: 'flex-start',
                flexDirection: 'row',
                alignItems: 'center',
                gap: moderateScale(2),
                left: moderateScale(8),
              }}>
 {!!item?.video_url && (
                    <View
                      style={{
                        alignSelf: 'flex-start',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: moderateScale(2),
                        marginLeft: moderateScale(4),
                        top: 3,

                      }}>
                      <TouchableOpacity
                        style={styles.playButton}
                        onPress={() => {
                          console.log('yeah play button chl rha he');

                          // setCurrentVideo && setCurrentVideo({video_url:item.video_url,id:chapterId});
                          setCurrentVideo && setCurrentVideo(item);
                        }}>
                        <Text style={styles.playButtonText}>Play</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  {addBtn && item?.video_url ? (
                    <TouchableOpacity
                      style={{
                        height: moderateScale(30),
                        width: moderateScale(30),
                        justifyContent: 'center',
                        alignItems: 'center',
                        overflow: 'hidden',
                        // backgroundColor: colors.white,
                        borderRadius: moderateScale(8),
                      }}
                      onPress={() => {
                        // handleAddNotes && handleAddNotes(item?.id);
                        // toggleNotesModal();
                        setSelectedNotes(item)
                        toggleNotesVideoModal();
                        // handleAddNotes && handleAddNotes(item?.id);
                      }}>
                      <MoreIcon
                        color={colors.gray1}
                        name="more-vertical"
                        size={moderateScale(20)}
                      />
                    </TouchableOpacity>
                  ) : null}
                </View>

                  <ModalCard
                    isModalVisible={notesVideoModal}
                    isCancel
                    toggleModal={toggleNotesVideoModal}>
                    <Text
                      style={{
                        fontFamily: fontFamily.Poppins_SemiBold,
                        color: colors.black,
                        fontSize: textScale(16),
                        marginVertical: moderateScaleVertical(12),
                      }}>
                      {seletedNotes.name}
                    </Text>
                    {userData?.role === 3 && (
                      <View
                        style={{
                          alignSelf: 'flex-start',
                          flexDirection: 'row',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                          justifyContent:"space-around",
                          gap: moderateScale(8),
                        }}>
                        {/* {addBtn && seletedNotes?.video_url ? (
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
                              setNotesVideoModal(false);
                              InteractionManager.runAfterInteractions(() => {
                                toggleTypeModal();
                              });

                              // toggleNotesModal()
                              // handleAddNotes && handleAddNotes(item?.id);
                            }}>
                            <Plussquare
                              color={colors.theme}
                              size={moderateScale(30)}
                              name="plus"
                            />
                          </TouchableOpacity>
                        ) : null} */}
                        {edit && seletedNotes?.video_url ? (
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
                              setNotesVideoModal(false);
                              InteractionManager.runAfterInteractions(() => {
                                setTimeout(() => {
                                  handleEditVideo &&
                                    handleEditVideo(undefined, seletedNotes);
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
                        ) : null}
                        {deleteChapter && seletedNotes?.video_url ? (
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
                              setNotesVideoModal(false);
                              InteractionManager.runAfterInteractions(() => {
                                setTimeout(() => {
                                  setIsModalVisible(!isModalVisible);
                                }, 50);
                              });
                            }}>
                            <TrashIcon
                              size={moderateScale(30)}
                              color={colors.red}
                              name="trash-o"
                            />
                          </TouchableOpacity>
                        ) : null}
                        <TouchableOpacity
              style={{
                height: moderateScaleVertical(30),
                width: moderateScale(30),
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                // backgroundColor: colors.white,
                // top:2,
                borderRadius: moderateScale(8),
              }}
              onPress={() => {
                // Alert.alert(JSON.stringify(item?.position))
                // handleAddNotes && handleAddNotes(item?.id);
                // console.log("positionpositionpositionpositionpositionpositionposition",item);
                // return;

                dispatch(PositionId({position: item?.position}));
                toggleNotesModal();

                // handleAddNotes && handleAddNotes(item?.id);
              }}>
              <MoreIcon
                color={colors.gray1}
                name="more-vertical"
                size={moderateScale(20)}
              />
            </TouchableOpacity>
                        {edit && seletedNotes?.video_url ? (
                          <TouchableOpacity
                            onPress={() => {
                              setNotesVideoModal(false);
                              InteractionManager.runAfterInteractions(() => {
                                setTimeout(() => {
                                  handleSegement(seletedNotes);
                                }, 50);
                              });
                            }}
                            style={{
                              overflow: 'hidden',
                              height: moderateScale(80),
                              width: moderateScale(80),
                              justifyContent: 'center',
                              alignItems: 'center',

                              backgroundColor: colors.themeLightColor,
                              borderRadius: moderateScale(800),
                              borderColor: colors.theme,
                            }}>
                            <SegementIcon
                              name={'segment'}
                              color={colors.themeYellow}
                              size={moderateScale(30)}
                            />
                          </TouchableOpacity>
                        ) : null}
                        {/* {item?.video_url ||&& ( */}
                      </View>
                    )}
                  </ModalCard>
                </View>

                <ModalDelete
                  isModalVisible={isModalVisible2}
                  toggleModal={() => {
                    setIsModalVisible2(!isModalVisible2);
                  }}>
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
                      Are you sure want to delete the Note?
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
                          setIsModalVisible2(!isModalVisible2);
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
                          setIsModalVisible2(!isModalVisible2);

                          deleteNotes({id: item?.id});
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
              </>
            );
          }}
        />
      </Collapsible>

      <ModalCard isModalVisible={typeModal} toggleModal={toggleTypeModal} isCancel>
        <AddTypeModal
          toggleModal={toggleTypeModal}
          refetch={refetch}
          handleModal={handleOpen}
        />
      </ModalCard>
      <ModalCard isModalVisible={notesModal} toggleModal={toggleNotesModal} isCancel>
        <Text
          style={{
            fontFamily: fontFamily.Poppins_SemiBold,
            color: colors.black,
            fontSize: textScale(16),
            marginVertical: moderateScaleVertical(12),
          }}>
          {item.name}
        </Text>
        {userData?.role === 3 && (
          <View
            style={{
              alignSelf: 'flex-start',
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: moderateScale(2),
            }}>
            {addBtn || item?.video_url ? (
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
                  // Alert.alert("ye aa rhi he yaha pe position",item?.position)
                  setNotesModal(false);
                  dispatch(ChapterId({chapterId: chapterId}));
                  // dispatch(PositionId({position:item?.position}))
                  InteractionManager.runAfterInteractions(() => {
                    toggleTypeModal();
                  });

                  // toggleNotesModal()
                  // handleAddNotes && handleAddNotes(item?.id);
                }}>
                <Plussquare
                  color={colors.theme}
                  size={moderateScale(30)}
                  name="plus"
                />
              </TouchableOpacity>
            ) : null}
            {edit && item?.video_url ? (
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
                  setNotesModal(false);
                  InteractionManager.runAfterInteractions(() => {
                    setTimeout(() => {
                      handleEditVideo && handleEditVideo(undefined, item);
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
            ) : null}
            {deleteChapter && item?.video_url ? (
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
                  setNotesModal(false);
                  InteractionManager.runAfterInteractions(() => {
                    setTimeout(() => {
                      setIsModalVisible(!isModalVisible);
                    }, 50);
                  });
                }}>
                <TrashIcon
                  size={moderateScale(30)}
                  color={colors.red}
                  name="trash-o"
                />
              </TouchableOpacity>
            ) : null}
            {edit && item?.video_url ? (
              <TouchableOpacity
                onPress={() => {
                  setNotesModal(false);
                  InteractionManager.runAfterInteractions(() => {
                    setTimeout(() => {
                      handleSegement(item);
                    }, 50);
                  });
                }}
                style={{
                  overflow: 'hidden',
                  height: moderateScale(80),
                  width: moderateScale(80),
                  justifyContent: 'center',
                  alignItems: 'center',

                  backgroundColor: colors.themeLightColor,
                  borderRadius: moderateScale(800),
                  borderColor: colors.theme,
                }}>
                <SegementIcon
                  name={'segment'}
                  color={colors.themeYellow}
                  size={moderateScale(30)}
                />
              </TouchableOpacity>
            ) : null}
            {/* {item?.video_url ||&& ( */}
          </View>
        )}
      </ModalCard>
      <ModalCard isModalVisible={lessonModal} toggleModal={toggleLessonModal}>
        <AddNewLesson
          courseId={courseId}
          toggleModal={toggleLessonModal}
          videoId={item?.id}
          refetch={refetch}
          chapterBackId={chapterId}
          position ={item?.position}
        />
        {/* <Text>prince sa</Text> */}
      </ModalCard>

      <ModalDelete
        isModalVisible={deleteNotesModal}
        toggleModal={() => {
          setDeleteNotesModal(!deleteNotesModal);
        }}>
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
            Are you sure want to delete {item?.name}?
          </Text>
          <Text></Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: moderateScale(20),
              marginTop: moderateScale(12),
            }}>
            <TouchableOpacity
              onPress={() => {
                setDeleteNotesModal(!deleteNotesModal);
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
                setDeleteNotesModal(!deleteNotesModal);
                deleteNotes({id: item?.id});
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

const ChapterDetailProgress: React.FC<ChapterDetailProgressInterface> = ({
  notesNumber,
  duration,
  chapterName,
  isPurchased,
  handleAddOption,
  setCurrentVideo,
  chapterDetail,
  cartLoading,
  refetchData,
  videoNumber,

  views,
  lessonNo,
  handleEdit,
  handleDelete,
  handleAdd,
  handleAddNotes,
  refetch,
  handleEditVideo,
  coursePurchasable,
  handleEditNotes,
  // handleDeleteNotes,
  canSee,
  edit,
  deleteChapter,
  segmentIcon,
  setDeleteChapterModal,
  deleteChapterModal,
  courseId,

  addBtn,

  chapterId,
  studentCourse,
  notesInfo,
  price,
  isExpired,

  buyCourse,

  handleCart,
}) => {
  console.log(
    'notesInfonotesInfonotesInfonotesInfonotesInfonotesInfo',
    chapterDetail,
  );

  const [calculateHeight, setCalculateHeight] = useState('60%');
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [notesCollapsed, setNotesCollapsed] = useState(false);

  const [chapterModal, setChapterModal] = useState<boolean>(false);
  const [notesModal, setNotesModal] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState<boolean>(false);
  const [isOnline, setIsOnline] = useState(canSee);
  const [cart,setCart] = useState(chapterDetail?.in_cart)
  // const [toggle, setToggle] = useState(canSee);

  const steps = [0, 1, 2, 3, 4];
  const [currentStep, setCurrentStep] = useState(0);
  const [isModalVisiblePdf, setIsModalVisiblePdf] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [source, setSource] = useState('');

  const dispatch= useDispatch()

  const userData = useSelector((state: any) => state?.auth?.userPayload);

  console.log(
    'currentStepcurrentStepcurrentStepcurrentStepcurrentStepcurrentStep',
    source,
  );

  console.log( 'notesInfoData',notesInfo);
  const handleNextStep = () => {
    setCurrentStep(prevStep =>
      prevStep < steps.length - 1 ? prevStep + 1 : prevStep,
    );
  };
  const handleCollapsed = () => {
    if(userData?.course_type_available){
      setIsCollapsed(!isCollapsed);
    }

    // if (buyCourse) {
    //   )
    //   return;
    // } else {
    //   setIsCollapsed(!isCollapsed);
    // }
  };

  const toggleModalPdf = (item?: any) => {
    console.log('there will be new promise', item);

    setIsModalVisiblePdf(!isModalVisiblePdf);
    setSource(item);
  };

  const handleSegement = (item: any) => {
    navigation.navigate(navigationStrings.SegmentationChapter, {
      chapterInfo: item,
      videoId: item?.video_url,
    });
  };

  function totalDuration(item: any) {
    const total = item.reduce(
      (accumulator: number, currentValue: {duration: number}) => {
        return accumulator + currentValue?.duration;
      },
      0,
    );

    return total;
  }

  const {mutate: deleteChapterPost, status: deleteStatus} = usePostData(
    `${endpoints.CHAPTERS}`,
    ['DELETE_CHAPTER'],
    'delete',
    (data: any) => {
      showSuccess(data?.message || 'chapter has been deleted successfully');
      refetch && refetch();
      setDeleteChapterModal(false);
    },
    (error: any) => {
      if (error?.message) {
        showSuccess(error?.message || 'there was error while delete chapter');
        setDeleteChapterModal(false);
      } else {
        showError(error || 'there was error while delete chapter');
        setDeleteChapterModal(false);
      }
    },
  );

  const {mutate: canSeeChapter,isPending} = usePostData(
    `${endpoints.CANSEE}`,
    ['CAN_SEE_CHAPTER'],
    'post',
    (data: any) => {

      refetch && refetch();
    },
    (error: any) => {
      if (error?.message) {
        showSuccess(error?.message || 'there was error while delete notes');
      } else {
        showError(error || 'there was error while delete notes');
      }
    },
  );

  const toggleSwitch = () => {
    setIsOnline(!isOnline);
    let payload = {
      can_view: isOnline?0:1,
      id: chapterDetail?.id,
    };
    canSeeChapter(payload);
  };

  const {
    mutate: sendToCart,

    isPending: singleCartLoading,

  } = usePostData(endpoints.ADD_TO_CART, ['ADD_TO_CART'],'post',()=>{
    refetchData()

  },()=>{
    showError('Error while Adding to the cart');
  });
  const {
    mutate: deleteFromCart,

    isPending: cartDeleteLoading,

  } = usePostData(endpoints.REMOVE_FROM_CART, ['REMOVE_CART'],'post',()=>{
    refetchData()

  },()=>{
    showError('Error while Removing from the cart');
  });



  const handleToCart = ()=>{
      handleCart({}, 'chapter')
      let payload:any = {}
      if(chapterDetail){

        payload = {
          chapter_id: chapterDetail?.id,
          course_id: chapterDetail?.courses?.id,
          price_type: 'online',
        };

        if (payload?.course_id && payload?.chapter_id && !cart) {
          setCart && setCart(true)
          sendToCart(payload);
        } else if (cart) {
          setCart && setCart(false)
          let payloadDelete = {
            chapter_id: chapterDetail?.id,
            course_id: chapterDetail?.courses?.id,
          };

          deleteFromCart(payloadDelete);
        }
      }


  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.flexContainer,
          {
            borderBottomColor: `rgba(217, 217, 217, 0.6)`,
            borderBottomWidth: !isCollapsed ? 1 : 0,
          },
        ]}
        onPress={handleCollapsed}>
        <View style={[styles.btnContainer]}>
          {userData?.course_type_available ? (
            // <Image
            //   style={{width: moderateScale(30), height: moderateScale(30)}}
            //   source={imagePath.playIcon}
            //   resizeMode='contain'
            // />
            <View style={{marginRight:moderateScale(15)}}>
   <PlayIcon
            width={moderateScale(34)}
            height={moderateScale(34)}



            />
            </View>

          ) : (
            <>
              <BookIcon
                name="book"
                color={colors.theme}
                size={moderateScale(28)}
              />
            </>
          )}
        </View>
        <View
          style={[
            styles.lessonTitleContainer,
            {flexDirection: 'row', alignItems: 'center'},
          ]}>
          <View style={[styles.chapterNameContainer]}>
            <Text style={[styles.chapterNameText]} numberOfLines={1}>
              {chapterName}
            </Text>
            <View
              style={[
                styles.chapterDetailFeatureContainer,
                {
                  gap: moderateScale(2),
                  flexDirection: userData?.role === 3 ? 'column' : 'row',
                },
                // {flexDirection:"row"}
              ]}>
              {!isPurchased && userData?.role === 2 && !isExpired ? (
                <View style={styles.priceLabel}>
                  <Text style={styles.textLabel}>
                    {price > 0 ? price + 'KD' : 'Free'}
                  </Text>
                </View>
              ) : null}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: moderateScale(8),
                }}>
                {/* <View style={[styles.chapterIconRow]}>
                <Image
                  style={{width: moderateScale(12), height: moderateScale(12)}}
                  source={imagePath.notesIcon}
                />
                <Text
                  style={[
                    {
                      color: colors.black,
                      fontSize: textScale(10),
                      marginLeft: moderateScale(2),
                    },
                  ]}>
                  {notesNumber} Notes
                </Text>
              </View> */}
                <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: moderateScale(3),}}>
                  <Image
                    source={imagePath.notesGrey}
                    style={{
                      width: moderateScale(10),
                      height: moderateScale(10),
                    }}
                    resizeMode='contain'
                  />
                  <Text
                    style={[
                      {
                        color: 'rgba(152, 162, 179, 1)',
                        fontSize:DeviceInfo?.isTablet()?textScale(9): textScale(11),
                        marginLeft: moderateScale(2),
                      },
                    ]}>
                    {notesNumber} Notes
                    {/* {notesNumber} Lectures */}
                  </Text>
                </View>
              {userData?.course_type_available && userData?.role === 2 && isPurchased &&   <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: moderateScale(3),}}>
                  <Arrowsalt
                    name={'playcircleo'}
                    style={{
                      width: moderateScale(10),
                      height: moderateScale(10),
                      marginRight:2
                    }}
                    size={moderateScale(10)}
                    color={'rgba(152, 162, 179, 1)'}

                  />
                  <Text
                    style={[
                      {
                        color: 'rgba(152, 162, 179, 1)',
                        fontSize:DeviceInfo?.isTablet()?textScale(9): textScale(11),
                        marginLeft: moderateScale(2),
                      },
                    ]}>
                    {videoNumber} Videos
                    {/* {notesNumber} Lectures */}
                  </Text>
                </View>}
                {userData?.role === 2 && userData?.course_type_available && (
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={imagePath.clockBlueGrey}
                      resizeMode="contain"
                      style={{
                        width: moderateScaleVertical(10),
                        height: moderateScaleVertical(10),
                      }}
                    />
                    <Text
                      style={[
                        {
                          color: 'rgba(152, 162, 179, 1)',
                          fontSize:DeviceInfo?.isTablet()?textScale(9): textScale(11),
                          marginLeft: moderateScale(2),
                        },
                      ]}>

                      {duration+" "}
                    </Text>
                  </View>
                )}
                {userData?.role === 3 && (
                  <View style={[styles.chapterIconRow]}>
                    {/* <Image
                      style={{
                        width: moderateScale(6),
                        height: moderateScaleVertical(6),
                      }}

                      source={imagePath.eyeIcon}
                    /> */}
                    <EyeIcon
                      color={'rgba(152, 162, 179, 1)'}
                      name="eyeo"
                      size={moderateScale(8)}
                    />

                    <Text
                      style={[
                        {
                          color: 'rgba(152, 162, 179, 1)',
                          fontSize: textScale(10),
                          marginLeft: moderateScale(2),
                        },
                      ]}>
                      {views}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
          {userData?.role === 3 && (
            <View
              style={[
                styles.lessonLink,
                {
                  gap: moderateScale(4),
                  marginLeft: moderateScale(6),
                  marginRight: moderateScale(4),
                },
              ]}>
              {/* {
                addBtn &&  <TouchableOpacity
                  onPress={() => {
                    setToggle(!toggle);
                  }}
                  style={{marginRight: moderateScale(7)}}>
                  <SwitchIcon
                    name={`${!toggle ? 'toggle-off' : 'toggle-on'}`}
                    size={moderateScale(30)}
                    color={colors.theme}
                  />
                </TouchableOpacity>
              } */}
              {addBtn && (
                <TouchableOpacity onPress={toggleSwitch} disabled={isPending}>
                  <SwitchIcon
                    name={`${!isOnline ? 'toggle-off' : 'toggle-on'}`}
                    size={moderateScale(32)}
                    color={`${!isOnline ? colors.grey1 : colors.theme}`}
                    style={{opacity:isPending?0.5:1}}
                  />
                </TouchableOpacity>
              )}

              {addBtn && (
                <TouchableOpacity
                  style={{
                    height: moderateScaleVertical(30),
                    // width: moderateScale(30),
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                    // backgroundColor: colors.white,
                    // borderRadius: moderateScale(8),
                    marginLeft: 2,
                  }}
                  onPress={() => {
                     dispatch(PositionId({position:null}))
                    if (chapterId) {
                      // handleAdd && handleAdd(chapterId);
                      handleAddOption && handleAddOption(chapterId);
                    }
                  }}>
                  {/* <Plussquare
                    color={colors.theme}
                    size={moderateScale(22)}
                    name="plus"
                  /> */}
                  <MoreIcon
                    color={colors.gray1}
                    name="more-vertical"
                    size={moderateScale(24)}
                  />
                </TouchableOpacity>
              )}

              {/* {edit && (
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
              )} */}
              {/* {deleteChapter && (
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
              )} */}
            </View>
          )}
            {isPurchased && userData?.role === 2 && <View>
                  <RightIcon
                    name={isCollapsed?'right':'down'}
                    size={moderateScale(16)}
                    color={colors.grey1}
                    // style={{opacity:isPending?0.5:1}}
                  />
                </View>}
        </View>
        {userData?.role === 2 && !isPurchased && price > 0 && coursePurchasable && !isExpired ? (
          <TouchableOpacity
            style={{
              width: moderateScaleVertical(52),
              height: moderateScaleVertical(52),
              alignItems: 'center',
              justifyContent: 'center',
            }}
            // onPress={() => handleCart && handleCart(chapterDetail, 'chapter')}
            onPress={handleToCart}
            disabled={cartDeleteLoading || singleCartLoading}>
            {cart? (
              // <View
              //   style={{
              //     paddingVertical: moderateScale(4),
              //     paddingHorizontal: moderateScale(6),
              //     backgroundColor: colors.theme,
              //     borderRadius: moderateScale(20),
              //   }}>
              //   <Text
              //     style={{
              //       fontFamily: fontFamily.Poppins_Regular,
              //       fontSize: textScale(10),
              //       color: colors.white,
              //     }}>
              //     Added
              //   </Text>
              // </View>
              <>
                <EyeIcon
                  color={colors.green}
                  size={moderateScaleVertical(32)}
                  name="checkcircle"
                />
              </>
            ) : (
              <Image source={imagePath.cartBlue} resizeMode="contain" />
            )}
          </TouchableOpacity>
        ) : null}
        {/* <View>
          <RightIcon
            name="right"
            color={'rgba(0,0,0,0.5)'}
            size={moderateScale(14)}
          />
        </View> */}
      </TouchableOpacity>

      <Collapsible collapsed={isCollapsed}>
        {/* {notesInfo?.length > 0 &&
          notesInfo.map((item: any, index: any) => {
            // [1,2,3,4,4,5,3,2].map((item: any, index: any) => {


            return (
              <NotesInfoData
                index={index}
                currentStep={currentStep}
                buyCourse={buyCourse}
                notesInfo={notesInfo}
                item={item}
                length={notesInfo?.length}
                isPurchased={isPurchased}
                views={views}
                addBtn={addBtn}
                edit={edit}
                handleSegement={handleSegement}
                setCurrentVideo={setCurrentVideo}
                toggleModalPdf={toggleModalPdf}
                handleEdit={handleEdit}
                handleEditNotes={handleEditNotes}
                setIsModalVisible2={setIsModalVisible2}
                isModalVisible2={isModalVisible2}
                setIsModalVisible={setIsModalVisible}
                userData={userData}
                handleEditVideo={handleEditVideo}
                handleAddNotes={handleAddNotes}
                deleteChapter={deleteChapter}
                isModalVisible={isModalVisible}
                chapterId={chapterId}
                refetch={refetch}
                deleteNotesModal={deleteNotesModal}
                setDeleteNotesModal={setDeleteNotesModal}
              />
            );
          })} */}
        <FlatList
          data={notesInfo}
          // data={[]}
          scrollEnabled={false}
          renderItem={({item, index}) => {
            return (
              <NotesInfoData
                index={index}
                currentStep={currentStep}
                buyCourse={buyCourse}
                notesInfo={notesInfo}
                item={item}
                length={notesInfo?.length}
                isPurchased={isPurchased}
                views={views}
                addBtn={addBtn}
                edit={edit}
                handleSegement={handleSegement}
                setCurrentVideo={setCurrentVideo}
                toggleModalPdf={toggleModalPdf}
                handleEdit={handleEdit}
                handleEditNotes={handleEditNotes}
                setIsModalVisible2={setIsModalVisible2}
                isModalVisible2={isModalVisible2}
                setIsModalVisible={setIsModalVisible}
                userData={userData}
                handleEditVideo={handleEditVideo}
                handleAddNotes={handleAddNotes}
                deleteChapter={deleteChapter}
                isModalVisible={isModalVisible}
                chapterId={chapterDetail?.id}
                chapterDetail={chapterDetail}
                refetch={refetch}
                courseId={courseId}
              />
            );
          }}
        />
      </Collapsible>

      <ModalCard
        isModalVisible={isModalVisiblePdf}
        toggleModal={toggleModalPdf}
        isSwipe

        modalContent={{
          height: Dimensions.get('window').height - 40,
          backgroundColor: colors.lightGreyColor,
        }}>
        <PdfViewContainer source={source} toggleModal={toggleModalPdf} />
      </ModalCard>

      <ModalDelete
        isModalVisible={deleteChapterModal}
        toggleModal={() => {
          setDeleteChapterModal(!deleteChapterModal);
        }}>
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
            Are you sure want to delete {chapterId?.name}?
          </Text>
          <Text></Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: moderateScale(20),
              marginTop: moderateScale(12),
            }}>
            <TouchableOpacity
              onPress={() => {
                setDeleteChapterModal(!deleteChapterModal);
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
                console.log(
                  'idhar aaa this chapter id ',
                  chapterDetail,
                  chapterId,
                );

                deleteChapterPost({id: chapterId?.id});
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

export default ChapterDetailProgress;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightGreyColor,
    paddingHorizontal: moderateScale(18),
    paddingVertical:moderateScaleVertical(2),
    borderRadius: moderateScale(12),
    marginVertical: moderateScaleVertical(4),
    overflow: 'hidden',

    // flexGrow: 1,
    // alignItems: 'center'
  },
  flexContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingVertical: moderateScaleVertical(6),
  },
  lessonContainer: {
    paddingVertical: moderateScaleVertical(8),
    // borderBottomColor: '#D9D9D9',
    // borderBottomWidth: 1,
    position: 'relative',

    // marginBottom:moderateScaleVertical(12),
  },
  chapter: {
    width: '100%',
    // marginBottom: 20,
    alignItems: 'center',
  },
  chapterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    // marginBottom: 5,
  },
  chapterInfo: {
    fontSize: 14,
    color: '#888',
  },
  lesson: {
    // width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // overflow:"hidden",
    // backgroundColor:"yellow",

    // paddingVertical:moderateScaleVertical(10),
    paddingHorizontal: moderateScale(12),

    // borderLeftWidth: 3,
    // borderLeftColor: '#007BFF',
    // paddingLeft: 10,
    // backgroundColor: '#fff',
    // padding: 10,
    // borderRadius: 5,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 5,
    elevation: 5,
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    // marginBottom: 5,
  },
  lessonDetails: {
    fontSize: 14,
    color: '#888',
    // marginBottom: 5,
  },
  lessonLink: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileIcon: {
    width: 16,
    height: 16,
    marginRight: 5,
  },
  playButton: {
    backgroundColor: colors.theme,
    paddingVertical: moderateScaleVertical(4),
    paddingHorizontal: moderateScaleVertical(8),
    borderRadius: 500,
    marginLeft: 12,
    justifyContent: 'center',
    alignItems: 'center',
    top:4
  },
  playButtonText: {
    color: '#fff',
    fontFamily: fontFamily.Poppins_Medium,
    fontSize:DeviceInfo.isTablet()?textScale(8):textScale(10),

  },
  btnContainer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',

  },
  lessonTitleContainer: {
    flex: 5,
    alignSelf: 'flex-start',
    // paddingBottom: moderateScale(2),

    // alignItems:"center",
  },
  chapterNameContainer: {
    flex: 1,
    justifyContent:"center"
    // backgroundColor:"red"
  },

  chapterDetailFeatureContainer: {
    flexDirection: 'row',
    gap: moderateScale(20),
  },
  chapterIconRow: {
    flexDirection: 'row',
    alignItems: 'center',

    gap: moderateScale(2),
  },
  chapterNameText: {
    fontSize:DeviceInfo?.isTablet()?textScale(12): textScale(14),
    color: '#101828',
    fontFamily: fontFamily.Poppins_Medium,
  },
  line: {
    width: moderateScale(2),
    marginVertical: moderateScaleVertical(5),
    position: 'absolute',
    zIndex: -10,
    // top: 9,

    // bottom:12
  },
  priceLabel: {
    alignSelf: 'flex-start',
    backgroundColor: `${colors.theme}10`,
    paddingHorizontal: moderateScale(4),
    marginVertical: moderateScale(3),
    borderRadius: moderateScale(20),
  },
  textLabel: {
    fontFamily: fontFamily.Poppins_SemiBold,
    fontSize:DeviceInfo?.isTablet()?moderateScale(10):moderateScale(14),

    color: colors.theme,
    textAlign: 'center',
  },
});
