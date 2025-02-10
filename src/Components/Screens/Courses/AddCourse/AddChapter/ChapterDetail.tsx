import React, {useMemo, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import colors from '../../../../../styles/colors';
import fontFamily from '../../../../../styles/fontFamily';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../../styles/responsiveSize';

import DocumentButton from '../../../../../assets/images/Icons/documentSvg.svg';
import PlayButton from '../../../../../assets/images/Icons/playButton.svg';
import TrashIcon from 'react-native-vector-icons/FontAwesome';

import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Collapsible from 'react-native-collapsible';
import {URL} from 'react-native-url-polyfill';
import IconFeat from 'react-native-vector-icons/Feather';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import SegementIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import NoteIcon from '../../../../../assets/images/Icons/notesGray.svg';
import GreyTime from '../../../../../assets/images/Icons/timeLine.svg';
import navigationStrings from '../../../../../constants/navigationStrings';
import commonStyles from '../../../../../styles/commonStyles';
import {ChapterDetailInterface} from '../../../../../types/componentInterface';
import {
  handlePdfView,
  handlePressInfo,
} from '../../../../../utils/logicFunctions';
import Plussquare from 'react-native-vector-icons/AntDesign';
import usePostData from '../../../../../hooks/usePostData';
import {endpoints} from '../../../../../utils/endpoints';
import ModalDelete from '../../../../Layout/Card/ModalDelete';
import WarningIcon from 'react-native-vector-icons/FontAwesome';
import {showError, showSuccess} from '../../../../../utils/helperFunctions';
import {useSelector} from 'react-redux';
import ModalCard from '../../../../Layout/Card/ModalCard';
import PdfViewContainer from '../../../../PdfViewContainer';

interface ChapterNotesInterface {
  notesInfo: {};
  canSee: boolean;
  handlePressInfo: () => void;
}

interface LessonDetailInterface {
  item: any;
  index: number;
  canSee: boolean;
  segmentIcon?: boolean;
  setCurrentVideo?: React.Dispatch<React.SetStateAction<string>>;
  documentNameGen: (nu: string) => void;
  addBtn?: boolean;
  deleteChapter?: boolean;
  edit?: boolean;
  deleteChapterVideo?: boolean;
  editVideo?: boolean;
  handleDelete?: () => void;
  handleEdit?: () => void;
  handleDeleteVideo?: (id?: number) => void;
  handleDeleteNotes?: (id?: number) => void;
  handleEditVideo?: (id?: number, item?: any) => void;
  handleAdd?: () => void;
  refetch?: () => void;
  handleAddNotes?: (id: number) => void;
  handleEditNotes?: (id?: number, item?: any) => void;
}

export const ChapterNotes: React.FC<ChapterNotesInterface> = ({
  notesInfo,
  canSee,
  handlePressInfo,
}) => {
  return (
    <>
      <View style={[styles.chapterContainer, commonStyles.spacingCommon]}>
        {notesInfo?.name ? (
          canSee ? (
            <TouchableOpacity
              // onPress={handlePressInfo}
              onPress={() => {
                console.log('kuch bhi frk nhi padarta');
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: colors.lightThemeBlue,
              }}>
              <View
                style={[
                  styles.btnContainer,
                  {flex: 0, marginRight: moderateScale(12)},
                ]}>
                {notesInfo?.documents.length > 0 ? (
                  <DocumentButton />
                ) : (
                  <PlayButton />
                )}
              </View>
              <Text style={[styles.chapterNameText, {flex: 1}]}>
                {notesInfo?.name}
              </Text>
              {/* {notesInfo?.documents.length > 0 && (
                <IconFeat
                  color={colors.blackGreyDark}
                  size={moderateScale(20)}
                  name="download"
                />
              )} */}
            </TouchableOpacity>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: colors.lightThemeBlue,
              }}>
              <View
                style={[
                  styles.btnContainer,
                  {flex: 0, marginRight: moderateScale(12)},
                ]}>
                <DocumentButton />
              </View>
              <Text style={[styles.chapterNameText]}>{notesInfo?.name}</Text>
            </View>
          )
        ) : null}

        {/* <FlatList
          data={notesInfo?.videos as any}
          renderItem={({item}) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: colors.lightThemeBlue,
              }}>
              <View
                style={[
                  styles.btnContainer,
                  {
                    flex: 0,
                    marginRight: moderateScale(12),
                    marginTop: moderateScaleVertical(10),
                  },
                ]}>
                <PlayButton />
              </View>
              <Text style={[styles.chapterNameText]}>{item.name}</Text>
            </View>
          )}
        /> */}
      </View>
    </>
  );
};

interface StudentNotesInterface {
  notesInfo: any;
  docInfo?: any;
  vidInfo?: any;
  handlePress?: () => void;
}

const StudentNotes: React.FC<StudentNotesInterface> = ({
  notesInfo,
  docInfo,
  vidInfo,
  handlePress,
}) => {
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.lightThemeBlue,
        paddingHorizontal: moderateScale(32),
        paddingVertical: moderateScale(8),
      }}>
      <View
        style={[
          styles.btnContainer,
          {flex: 0, marginRight: moderateScale(12)},
        ]}>
        {docInfo ? <DocumentButton /> : <PlayButton />}
      </View>
      <View style={{flexDirection: 'row'}}>
        {/* <Text style={[styles.chapterNameText]}>{vidInfo ? vidInfo?.name : docInfo?.name}</Text> */}
        <Text style={[styles.chapterNameText, {flex: 0.9}]}>
          {notesInfo?.name}
        </Text>
        {docInfo && (
          <TouchableOpacity onPress={() => handlePressInfo(docInfo)}>
            <Icon
              color={colors.blackGreyDark}
              size={moderateScale(20)}
              name="download"
            />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

export const LessonDetail: React.FC<LessonDetailInterface> = ({
  item,
  index,
  canSee,
  setCurrentVideo,
  documentNameGen,
  addBtn,
  deleteChapter,
  edit,
  editVideo,
  deleteChapterVideo,
  handleDelete,
  handleEdit,
  handleAdd,
  refetch,
  handleAddNotes,
  handleEditNotes,
  handleDeleteNotes,

  handleDeleteVideo,
  handleEditVideo,
  segmentIcon,
}) => {
  const [isCollapsed2, setIsCollapsed2] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState<boolean>(false);
  const [isModalVisiblePdf, setIsModalVisiblePdf] = useState(false);
  const [source, setSource] = useState('');
  const userData = useSelector((state: any) => state?.auth?.userPayload);

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const handleSegement = (item: any) => {
    navigation.navigate(navigationStrings.SegmentationChapter, {
      chapterInfo: item,
      videoId: item?.video_url,
    });
  };

  const toggleModalPdf = (item?: any) => {
    console.log('asdasdasdasdasdasdasd');

    setIsModalVisiblePdf(!isModalVisiblePdf);
    setSource(item);
  };

  const {mutate: deleteLesson, status: deleteLessonStatus} = usePostData(
    `${endpoints.DELETE_VIDEOS}`,
    ['DELETE_LESSONS'],
    'delete',
    (data: any) => {
      showSuccess('Lesson deleted successfully');
      refetch && refetch();
    },
    (error: any) => {
      showSuccess('Error while deleting the Lesson');
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

  return (
    <>
      <TouchableWithoutFeedback
        style={{}}
        onPress={() => {
          if (canSee && setIsCollapsed2 !== undefined) {
            setIsCollapsed2(!isCollapsed2);
          }
        }}>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: moderateScale(30),
            paddingVertical: moderateScaleVertical(10),
            paddingLeft: moderateScale(20),
            alignItems: 'center',
            gap: 10,
          }}>
          <TouchableOpacity
            onPress={() => {
               
              setCurrentVideo&&setCurrentVideo(item?.video_url as string);
            }}>
            <PlayButton width={moderateScale(24)} height={moderateScale(24)} />
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              marginRight: moderateScale(12),
              overflow: 'hidden',
            }}>
            <Text
              style={{
                color: colors.black,
                fontSize: moderateScale(14),
                fontFamily: fontFamily.Poppins_Regular,
              }}
              numberOfLines={2}>
              {item?.name || `Lesson ${index + 1}`}
            </Text>
            {userData?.role === 3 && (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon5
                  name="eye"
                  color={colors.grey1}
                  size={moderateScale(10)}
                  style={{marginHorizontal: moderateScale(4)}}
                />
                <Text
                  style={{
                    fontSize: textScale(12),
                    fontFamily: fontFamily.Poppins_Regular,
                    color: colors.grey1,
                  }}>
                  {item?.views}
                </Text>
              </View>
            )}
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: moderateScale(12),
            }}>
            {editVideo && (
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: colors.white,
                  borderRadius: moderateScale(8),
                }}
                onPress={() => {
                  handleEditVideo && handleEditVideo(undefined, item);
                }}>
                <Icon5
                  color={colors.theme}
                  size={moderateScale(14)}
                  name="pencil-alt"
                />
              </TouchableOpacity>
            )}
            {deleteChapterVideo && (
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: colors.white,
                  borderRadius: moderateScale(8),
                }}
                onPress={() => {
                  setIsModalVisible(!isModalVisible);
                }}>
                <TrashIcon
                  size={moderateScale(18)}
                  color={colors.red}
                  name="trash-o"
                />
              </TouchableOpacity>
            )}
            {addBtn && (
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  handleAddNotes && handleAddNotes(item?.id);
                }}>
                <Plussquare
                  color={colors.theme}
                  size={moderateScale(18)}
                  name="plussquare"
                />
              </TouchableOpacity>
            )}
            {segmentIcon && (
              <TouchableOpacity onPress={() => handleSegement(item)}>
                <SegementIcon
                  name={'segment'}
                  color={colors.themeYellow}
                  size={moderateScale(22)}
                />
              </TouchableOpacity>
            )}

            <Icon
              name={isCollapsed2 ? 'down' : 'up'}
              color={colors.themeDark}
              size={moderateScale(10)}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
      <Collapsible collapsed={isCollapsed2}>
        <FlatList
          data={item?.notes}
          // data={[]}
          renderItem={({item}) => {
            return (
              <>
                <View
                  style={{
                    gap: moderateScale(10),

                    paddingLeft: moderateScale(45),
                    paddingVertical: moderateScaleVertical(3),
                  }}>
                  <View
                    style={{
                      gap: moderateScale(10),
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        // console.log("badal se unha ");

                        toggleModalPdf(item);
                      }}
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: moderateScale(10),
                      }}>
                      <DocumentButton />
                      <Text style={{color: colors.black}}>{item.name}</Text>
                    </TouchableOpacity>

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                      }}>
                      {edit && (
                        <TouchableOpacity
                          style={{
                            padding: moderateScale(8),
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: colors.white,
                            borderRadius: moderateScale(8),
                          }}
                          onPress={() => {
                            handleEdit && handleEdit(item as number);
                            handleEditNotes && handleEditNotes(undefined, item);
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
                            padding: moderateScale(6),
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: colors.white,
                            borderRadius: moderateScale(8),
                          }}
                          onPress={() => {
                            setIsModalVisible2(!isModalVisible2);
                          }}>
                          <TrashIcon
                            size={moderateScale(18)}
                            color={colors.red}
                            name="trash-o"
                          />
                        </TouchableOpacity>
                      )}
                      {/* <TouchableOpacity
                        onPress={() => {
                          handlePressInfo(item);
                        }}
                        style={{
                          marginHorizontal: moderateScale(14),
                        }}>
                        <IconFeat
                          color={colors.blackGreyDark}
                          size={moderateScale(20)}
                          name="download"
                        />
                      </TouchableOpacity> */}
                    </View>
                  </View>
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
                <ModalCard
                  isModalVisible={isModalVisiblePdf}
                  toggleModal={toggleModalPdf}
                  modalContent={{height: Dimensions.get('window').height - 40}}>
                  <PdfViewContainer
                    source={source}
                    toggleModal={toggleModalPdf}
                  />
                </ModalCard>
              </>
            );
          }}
        />
      </Collapsible>
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
            Are you sure want to delete the lesson?
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
                setIsModalVisible(!isModalVisible);
                deleteLesson({id: item?.id});
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
};

const ChapterDetail: React.FC<ChapterDetailInterface> = ({
  chapterName,
  setCurrentVideo,
  notesNumber,
  views,
  lessonNo,
  handleEdit,
  handleDelete,
  handleAdd,
  handleAddNotes,
  refetch,
  handleEditVideo,
  handleEditNotes,
  // handleDeleteNotes,
  canSee,
  edit,
  deleteChapter,

  addBtn,

  duration,
  chapterId,
  studentCourse,
  notesInfo,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);

  const documentNameGen = (videoUrl: string) => {
    try {
      const urlNew = new URL(videoUrl);

      const videoPath = urlNew.pathname.split('/')[2];

      return videoPath;
    } catch (error) {}
  };
  const navigation = useNavigation<any>();
  const userData = useSelector((state: any) => state?.auth?.userPayload);

  const handleDeleteVideo = (id?: number) => {
    console.log('idhar bhi aa rha hai >>>>>>>', id);
  };

  const handleDeleteNotes = (id?: number) => {
    console.log('idhar bhi aa rha hai >>>>>>>', id);
  };

  return (
    <View
      style={{
        backgroundColor: colors.lightThemeBlue,
        marginVertical: moderateScaleVertical(6),
        borderRadius: moderateScale(10),
        paddingVertical: moderateScale(10),
        paddingHorizontal: moderateScale(1),
      }}>
      <TouchableWithoutFeedback
        onPress={() => {
          setIsCollapsed(!isCollapsed);
          // if (!canSee) {
          //   setIsCollapsed(!isCollapsed);
          // } else {
          //   // navigation.navigate(navigationStrings.ViewDetails as never, {
          //   //   chapterId: chapterId,
          //   //   lessonNo: lessonNo,
          //   // });
          // }
        }}>
        <View style={[styles.lessonContainer, commonStyles.spacingCommon]}>
          <View style={[styles.btnContainer]}>
            <PlayButton />
          </View>
          <View style={[styles.lessonTitleContainer]}>
            <View style={[styles.chapterNameContainer]}>
              <Text style={[styles.chapterNameText]}>{chapterName}</Text>
              <View
                style={[
                  styles.chapterDetailFeatureContainer,
                  {gap: moderateScale(4)},
                ]}>
                <View style={[styles.chapterIconRow]}>
                  <NoteIcon
                    width={moderateScale(11)}
                    height={moderateScaleVertical(11)}
                  />

                  <Text
                    style={[
                      {
                        color: '#98A2B3',
                        fontSize: textScale(10),
                        marginLeft: moderateScale(2),
                      },
                    ]}>
                    {notesNumber} Lessons
                  </Text>
                </View>
                <View style={[styles.chapterIconRow]}>
                  <GreyTime
                    width={moderateScale(11)}
                    height={moderateScaleVertical(11)}
                  />

                  <Text
                    style={[
                      {
                        color: '#98A2B3',
                        fontSize: textScale(10),
                        marginLeft: moderateScale(2),
                      },
                    ]}>
                    {duration}
                  </Text>
                </View>
                {userData?.role === 3 && (
                  <View style={[styles.chapterIconRow]}>
                    <Icon5
                      name="eye"
                      size={moderateScale(8)}
                      color={'#98A2B3'}
                      style={{marginHorizontal: moderateScale(6)}}
                    />

                    <Text
                      style={[
                        {
                          color: '#98A2B3',
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

          {edit && (
            <TouchableOpacity
              style={{
                padding: moderateScale(8),
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.white,
                marginRight: moderateScale(3),
                borderRadius: moderateScale(8),
              }}
              onPress={() => {
                handleEdit && handleEdit(chapterId as number);
              }}>
              <Icon5
                color={colors.theme}
                size={moderateScale(16)}
                name="pencil-alt"
              />
            </TouchableOpacity>
          )}
          {deleteChapter && (
            <TouchableOpacity
              style={{
                padding: moderateScale(6),
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.white,
                marginRight: moderateScale(3),
                borderRadius: moderateScale(8),
              }}
              onPress={() => {
                handleDelete && handleDelete(chapterId as number);
              }}>
              <TrashIcon
                size={moderateScale(18)}
                color={colors.red}
                name="trash-o"
              />
              {/* <Icon5 color={colors.red} size={moderateScale(18)} name="trash-o" /> */}
            </TouchableOpacity>
          )}
          {addBtn && (
            <TouchableOpacity
              style={{
                padding: moderateScale(6),
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: moderateScale(8),
                backgroundColor: colors.white,
              }}
              onPress={() => {
                console.log("idhar bhi aaaana hi hai aasdadadasdasdasd");
                
                handleAdd && handleAdd();
              }}>
              <Plussquare
                color={colors.theme}
                size={moderateScale(20)}
                name="plussquare"
              />
            </TouchableOpacity>
          )}
          <TouchableWithoutFeedback
            style={{padding: moderateScale(6), paddingRight: moderateScale(2)}}
            onPress={() => {
              setIsCollapsed(!isCollapsed);
            }}>
            <Icon
              name={isCollapsed ? 'down' : 'up'}
              color={colors.themeDark}
              size={12}
            />
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
      <Collapsible collapsed={isCollapsed}>
        {true ? (
          <>
            <FlatList
              renderItem={({item, index}) => (
                <LessonDetail
                  index={index}
                  item={item}
                  documentNameGen={documentNameGen}
                  canSee={canSee as boolean}
                  edit={userData?.role === 3}
                  addBtn={userData?.role === 3}
                  refetch={refetch}
                  deleteChapter={userData?.role === 3}
                  editVideo={userData?.role === 3}
                  segmentIcon={userData?.role === 3}
                  deleteChapterVideo={userData?.role === 3}
                  handleEditVideo={handleEditVideo}
                  handleEditNotes={handleEditNotes}
                  handleAddNotes={handleAddNotes}
                  setCurrentVideo={setCurrentVideo}
                  handleDeleteNotes={handleDeleteNotes}
                  handleDeleteVideo={() => handleDeleteVideo(item?.id)}
                />
              )}
              data={notesInfo}
            />
          </>
        ) : (
          <FlatList
            renderItem={({item}) => (
              <ChapterNotes
                notesInfo={item}
                canSee={canSee as boolean}
                chapterName={''}
                notesNumber={0}
                duration={''}
                handlePressInfo={() => {
                  // handlePressInfo(item);
                  console.log('yeah aise chaleaasdasd');
                }}
              />
            )}
            data={[notesInfo]}
          />
        )}
      </Collapsible>
    </View>
  );
};

export default ChapterDetail;

const styles = StyleSheet.create({
  lessonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: moderateScaleVertical(2),
    backgroundColor: colors.lightThemeBlue,
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
  chapterContainer: {
    marginTop: moderateScaleVertical(12),
  },
});
