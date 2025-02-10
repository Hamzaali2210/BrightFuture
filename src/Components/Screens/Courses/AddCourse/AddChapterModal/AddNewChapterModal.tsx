import React, {useEffect, useState} from 'react';
import {
  Image,
  InteractionManager,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {
  mainStrings,
  validationErrorMessage,
} from '../../../../../constants/mainstrings';
import usePostData from '../../../../../hooks/usePostData';
import SwitchIcon from 'react-native-vector-icons/Fontisto';

import {
  ChapterData,
  ChapterDataError,
  ChapterId,
} from '../../../../../redux/slice/chapterSlice';
import {AppDispatch} from '../../../../../redux/store';
import colors from '../../../../../styles/colors';
import fontFamily from '../../../../../styles/fontFamily';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../../styles/responsiveSize';
import {endpoints} from '../../../../../utils/endpoints';
import {showError, showSuccess} from '../../../../../utils/helperFunctions';
import CommonButton from '../../../../CommonButton';
import CustomTextInput from '../../../../CustomTextInput';
import ErrorMessage from '../../../../Forms/ErrorMessage';
import ModalSuccess from '../../../../Layout/Card/ModalSuccess';
import imagePath from '../../../../../constants/imagePath';
import {useKeyboard} from '../../../../../hooks/useKeyboard';
import DeviceInfo from 'react-native-device-info';

interface AddNewChapterModalInterface {
  courseId: number;
  toggleModal?: () => void;
  refetch?: () => void;
}

const AddNewChapterModal: React.FC<AddNewChapterModalInterface> = ({
  courseId,
  toggleModal,
  refetch,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const keyboardHeight = useKeyboard();

  //state
  const chapterData = useSelector((state: any) => state?.chapter?.chapterData);
  const chapterId = useSelector((state: any) => state?.chapter?.chapterId);

  const chapterDataError: any = useSelector(
    (state: any) => state?.chapter?.chapterDataError,
  );

  //local State

  const [loading, setLoading] = useState(false);
  const [chapterTickModal, setChapterTickModal] = useState(false);

  //api handlers and effects

  const {status: chapterStatus, mutate: addChapterData} = usePostData(
    endpoints.CHAPTERS,
    ['CHAPTERS'],
  );

  const {
    mutate: updateChapter,
    status: updateChapterStatus,
    error: updateChapterError,
  } = usePostData(`${endpoints.CHAPTERS}/${chapterId}`, ['UDPATE_CHAPTER']);

  useEffect(() => {
    if (chapterStatus === 'success') {
      toggleSuccess();
      setLoading(false);

      dispatch(ChapterId({chapterId: ''}));

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

      refetch && refetch();
    } else if (chapterStatus === 'error') {
      showError('Error while Adding the Chapter');
      toggleModal && toggleModal();
      setLoading(false);
      refetch && refetch();
      dispatch(ChapterId({chapterId: ''}));
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
            isSubscribed: false,
          },
        }),
      );
    } else if (chapterStatus === 'pending') {
      setLoading(true);
    }
  }, [chapterStatus]);

  useEffect(() => {
    if (updateChapterStatus === 'success') {
      toggleSuccess();

      dispatch(
        ChapterData({
          chapterData: {
            ...chapterData,
            chapterName: '',
            price: '',
            accessType: 'free',
            isSubscribed: false,
          },
        }),
      );
      dispatch(
        ChapterData({
          chapterData: {
            ...chapterData,
            chapterName: '',
            price: '',
            accessType: 'free',
            isSubscribed: false,
          },
        }),
      );
      refetch && refetch();
      toggleModal && toggleModal();
      setLoading(false);
    } else if (updateChapterStatus === 'error') {
      refetch && refetch();
      setLoading(false);
      showError(updateChapterError?.message);
    } else if (updateChapterStatus === 'pending') {
      setLoading(true);
    }
  }, [updateChapterStatus]);

  //logic functions

  const toggleSuccess = () => {
    setChapterTickModal(!chapterTickModal);
    InteractionManager.runAfterInteractions(() => {
      setTimeout(() => {
        toggleModal && toggleModal();
      }, 500);
    });
  };

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

  const handleSave = () => {
    const errorFree = errorChecker();
    if (errorFree) {
      let payload = {
        name: chapterData?.chapterName,
        course_id: courseId,
        type: chapterData?.accessType === 'free' ? 1 : 2,
        price: chapterData?.accessType === 'free' ? 0 : chapterData.price,
        video: chapterData?.chapterVideoLink || '',
        is_subscribe: chapterData?.isSubscribed ? 1 :0,
      };
      if (chapterId) {
        updateChapter(payload);
      } else {
        addChapterData(payload);
      }
    }
  };

  const handleCheck = (type: string) => {
    dispatch(ChapterData({chapterData: {...chapterData, accessType: type}}));
  };

  return (
    <View style={{marginBottom: Platform.OS === 'ios' ? keyboardHeight : 0}}>
      <Text style={styles.textHeading}>{mainStrings.AddNewChapter}</Text>
      <View style={styles.textInputContainer}>
        <Text style={styles.textInputHeading}>{mainStrings.Chapter}</Text>
        <CustomTextInput
          placeholder={mainStrings.ChapterName}
          containerStyle={{}}
          isError={!!chapterDataError?.chapterName}
          onChangeText={e => {
            if (chapterDataError?.chapterName) {
              dispatch(
                ChapterDataError({
                  chapterDataError: {...chapterDataError, chapterName: ''},
                }),
              );
            }
            dispatch(
              ChapterData({chapterData: {...chapterData, chapterName: e}}),
            );
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

      <Text style={[styles.textHeading, {marginVertical: moderateScale(12)}]}>
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
                chapterData.accessType === 'free' ? colors.theme : colors.grey1
              }
            />

            <Text
              style={[styles.textHeading, {marginVertical: moderateScale(12)}]}>
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
                chapterData?.accessType === 'paid' ? colors.theme : colors.grey1
              }
            />

            <Text
              style={[styles.textHeading, {marginVertical: moderateScale(12)}]}>
              {mainStrings.Paid}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {chapterData?.accessType === 'paid' && (
        <>
          <Text
            style={[styles.textHeading, {marginVertical: moderateScale(12)}]}>
            {mainStrings.subscription}
          </Text>
          <TouchableOpacity
            onPress={() => {
              dispatch(
                ChapterData({
                  chapterData: {
                    ...chapterData,
                    isSubscribed: !chapterData?.isSubscribed,
                  },
                }),
              );
            }}
            style={{marginRight: moderateScale(12)}}>
            <SwitchIcon
              name={`${
                !chapterData?.isSubscribed ? 'toggle-off' : 'toggle-on'
              }`}
              size={moderateScaleVertical(42)}
              color={`${
                !chapterData?.isSubscribed ? colors.grey1 : colors.theme
              }`}
            />
          </TouchableOpacity>
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
              }
              dispatch(ChapterData({chapterData: {...chapterData, price: e}}));
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
      <CommonButton
        btnText={chapterId ? 'Update Chapter' : 'Save'}
        loading={loading}
        onPressBtn={handleSave}
        mainViewStyle={{marginLeft: 0, marginBottom: moderateScaleVertical(30)}}
      />

      <ModalSuccess
        isModalVisible={chapterTickModal}
        toggleModal={toggleSuccess}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: moderateScaleVertical(20),
          }}>
          <View
            style={{
              width: moderateScale(60),
              height: moderateScale(60),
            }}>
            <Image
              source={imagePath.tickSuccess}
              style={{width: '100%'}}
              resizeMode="contain"
            />
          </View>

          <Text
            style={{
              fontFamily: fontFamily.Poppins_Medium,
              fontSize: moderateScale(16),
              color: colors.black,
            }}>
            Chapter Added Succesfully
          </Text>

          {/* <CommonButton btnText="Ok" onPressBtn={toggleSuccess} mainViewStyle={{width:180}}/> */}
        </View>
      </ModalSuccess>
    </View>
  );
};

export default AddNewChapterModal;

const styles = StyleSheet.create({
  textHeading: {
    fontFamily: fontFamily.Poppins_SemiBold,
    fontSize: DeviceInfo.isTablet() ? textScale(11) : textScale(15),
    color: colors.black,
  },

  textInputHeading: {
    fontFamily: fontFamily.Poppins_Regular,
    fontSize: DeviceInfo.isTablet() ? textScale(11) : textScale(14),
    color: colors.grey1,
  },
  textInputContainer: {
    marginVertical: moderateScaleVertical(8),
  },

  checkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(12),
  },
});
