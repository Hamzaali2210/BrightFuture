import {
  Button,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import {useNavigation} from '@react-navigation/native';
import CustomTextInput from '../../../CustomTextInput';
import fontFamily from '../../../../styles/fontFamily';
import {
  moderateScaleVertical,
  textScale,
} from '../../../../styles/responsiveSize';
import colors from '../../../../styles/colors';
import commonStyles from '../../../../styles/commonStyles';
import {
  mainStrings,
  validationErrorMessage,
} from '../../../../constants/mainstrings';
import DottedButton from '../../../Layout/Button/DottedButton';
import navigationStrings from '../../../../constants/navigationStrings';
import {useDispatch, useSelector} from 'react-redux';
import {CourseChapter, CourseDetail} from '../../../../types/uiType';
import {CourseData} from '../../../../redux/slice/cartSlice';
import usePostData from '../../../../hooks/usePostData';
import {endpoints} from '../../../../utils/endpoints';
import useGetData from '../../../../hooks/useGetData';
import CustomDropDown from '../../../Forms/CustomDropDown';
import {err} from 'react-native-svg';
import {showError, showSuccess} from '../../../../utils/helperFunctions';
import {API_URL_2, IMAGE_API_URL} from '../../../../utils/urls';
import {URL} from 'react-native-url-polyfill';

function AddCourse() {
  const [courseData, setCourseData] = useState({
    courseName: '',
    description: '',
    coverPhotoUrl: '',
    whatsappLink: '',

    chapterData: [],
  });

  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const [coverPhotoUrl, setCoverPhotoUrl] = useState('');
  const courseDataReal: CourseDetail = useSelector(
    (state: any) => state?.cart?.courseData,
  );
  const {
    mutate: InstructorCourse,
    data,
    error,
    isSuccess,
  } = usePostData(endpoints.INSTRUCTOR_COURSES, ['INSTRUCTOR_COURSES']);
  const {
    mutate: ImageCourse,
    data: imageData,
    error: errorData,
    isSuccess: successData,
  } = usePostData(endpoints.UPLOADVIDEO, ['UPLOADVIDEO']);

  useEffect(() => {
    if (isSuccess) {
      if (data?.status === 'success') {
        navigation.navigate(navigationStrings.AddChapter, {
          courseId: data?.data?.id,
        });
        dispatch(
          CourseData({
            courseData: {
              ...courseDataReal,
              courseName: '',
              description: '',
              coverPhotoUrl: '',
              whatsappLink: '',
              universityId: null,
              categoryId: null,
            },
          }),
        );
      }
    } else if (error) {
      showError(error?.message);
    }
  }, [isSuccess, error]);
  const {data: uniData, isSuccess: uniSuccess} = useGetData(
    endpoints.UNIVERSITIES,
    ['UNIVERSITIES'],
  );
  const {data: categoryData, isSuccess: categorySuccess} = useGetData(
    endpoints.CATEGORIES,
    ['CATEGORIES'],
  );

  const finalSchoolData: any = {
    uniData,
    categoryData,
  };

  // const handlePress = () => {
  //   ImagePicker.openPicker({
  //     cropping: true,
  //   }).then(image => {
  //     dispatch(
  //       CourseData({
  //         courseData: {...courseDataReal, coverPhotoUrl: image.path},
  //       }),
  //     );
  //   });
  // };
  const handlePress = async () => {
    try {
      // const result = await DocumentPicker.pickSingle({
      //   type: [DocumentPicker.types.video],
      // });
      const result = await ImagePicker.openPicker({
        cropping: true,
        compressVideoPreset: 'Passthrough',
      });

      // return ;
      const formData = new FormData();

      if (Platform.OS === 'ios') {
        formData.append('file', {
          name: result?.filename,
          uri: result?.sourceURL,
          type: result?.mime,
        });
      } else if (Platform.OS === 'android') {
        const url = new URL(result.path);
        const newPathName = url?.pathname?.split('/');

        formData.append('file', {
          name: newPathName[newPathName.length - 1],
          uri: result?.path,
          type: result?.mime,
        });
      }

      const response = await fetch(`${API_URL_2}upload-file`, {
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const data = await response.json();

      if (data?.data?.status === 200 || data?.status === 'success') {
        showSuccess('photo Uploaded SuccessFully');

        dispatch(
          CourseData({
            courseData: {...courseDataReal, coverPhotoUrl: data?.data[0]},
          }),
        );
        return data;
      }
    } catch (err) {
      showError('error while uploading the photo');
    }
    return;
  };

  const handleAddChapter = () => {
    let payload = {
      name: '',
      // university_id: '',
      // category_id: '',
      description: '',
      image: '',
      isPublished: 2,
      price: 100,
      whatsapp_link: '',
    };

    const {
      courseName,
      coverPhotoUrl,
      description,
      universityId,
      categoryId,
      whatsappLink,
    } = courseDataReal;

    if (!courseName) {
      showError(validationErrorMessage.courseName);
      return;
    }
    if (!coverPhotoUrl) {
      showError(validationErrorMessage.courseCover);

      return;
    }
    if (!description) {
      showError(validationErrorMessage.courseDesc);

      return;
    }
    if (!whatsappLink) {
      showError(validationErrorMessage.courseLink);

      return;
    }

    payload = {
      ...payload,
      name: courseName,
      image: coverPhotoUrl,
      description: description,
      whatsapp_link: whatsappLink,
      // university_id: universityId,
      // category_id: categoryId,
    };

    InstructorCourse(payload);
  };

  const selectedItemFunc = (selItem: any, index: number, key: string) => {
    if (key === 'university') {
      dispatch(
        CourseData({courseData: {...courseDataReal, universityId: selItem}}),
      );
    } else if (key === 'category') {
      dispatch(
        CourseData({courseData: {...courseDataReal, categoryId: selItem}}),
      );
    }
  };

  return (
    <ScrollView
      contentContainerStyle={[commonStyles.spacingCommon]}
      showsVerticalScrollIndicator={false}>
      <View
        style={[
          styles.textInputContainer,
          {marginTop: moderateScaleVertical(16)},
        ]}>
        <Text style={styles.textHeading}>{mainStrings.CourseName}</Text>
        <CustomTextInput
          placeholder={mainStrings.CourseName}
          onChangeText={e => {
            dispatch(
              CourseData({courseData: {...courseDataReal, courseName: e}}),
            );
          }}
          value={courseDataReal?.courseName}
        />
      </View>
      {/* <View>
        {uniSuccess && finalSchoolData?.categoryData?.data?.length && (
          <CustomDropDown
            data={finalSchoolData?.categoryData?.data}
            keyItem="category"
            setSelectedItemFunc={selectedItemFunc}
            selectedItem={courseDataReal.categoryId}
            placeholderInput="Select Category"
          />
        )}
      </View> */}
      {/* <View>
        {categorySuccess && finalSchoolData?.uniData?.data?.length && (
          <CustomDropDown
            data={finalSchoolData?.uniData?.data}
            keyItem="university"
            setSelectedItemFunc={selectedItemFunc}
            selectedItem={courseDataReal.universityId}
            placeholderInput="Select Univiersity"
          />
        )}
      </View> */}
      <View style={styles.textInputContainer}>
        <Text style={styles.textHeading}>{mainStrings.Description}</Text>
        <CustomTextInput
          placeholder={mainStrings.Description}
          containerStyle={{
            height: moderateScaleVertical(150),
            paddingTop: moderateScaleVertical(10),
          }}
          onChangeText={e => {
            dispatch(
              CourseData({courseData: {...courseDataReal, description: e}}),
            );
          }}
          value={courseDataReal?.description}
          multiline
        />
      </View>
      <View style={styles.textInputContainer}>
        <Text style={styles.textHeading}>{mainStrings.UploadCoverphoto}</Text>
        <TouchableOpacity onPress={handlePress}>
          {!courseDataReal.coverPhotoUrl ? (
            <View style={styles.uploadPhotoContainer}>
              <Text style={styles.textHeading}>+</Text>
              <Text
                style={{
                  fontFamily: fontFamily.Poppins_Regular,
                  fontSize: textScale(14),

                  color: colors.gray1,
                }}>
                {mainStrings.UploadCoverphoto}
              </Text>
            </View>
          ) : (
            <View style={styles.uploadPhotoContainer}>
              <Image
                style={{width: '100%', height: '100%', overflow: 'hidden'}}
                source={{
                  uri:
                    `${IMAGE_API_URL}${courseDataReal.coverPhotoUrl}` ||
                    courseDataReal.coverPhotoUrl,
                }}
              />
            </View>
          )}
        </TouchableOpacity>

        <View
          style={[
            styles.textInputContainer,
            {marginTop: moderateScaleVertical(16)},
          ]}>
          <Text
            style={{
              fontFamily: fontFamily.Poppins_Regular,
              fontSize: textScale(14),
              color: colors.grey1,
            }}>
            {mainStrings.WhatsappLinkHere}
          </Text>
          <CustomTextInput
            placeholder={mainStrings.WhatsappLink}
            onChangeText={e => {
              dispatch(
                CourseData({courseData: {...courseDataReal, whatsappLink: e}}),
              );
            }}
            value={courseDataReal.whatsappLink}
          />
          <View style={{marginVertical: moderateScaleVertical(12)}}>
            <DottedButton
              btnText="+ Add Chapters"
              onPressBtn={handleAddChapter}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default AddCourse;

const styles = StyleSheet.create({
  textInputContainer: {
    marginVertical: moderateScaleVertical(8),
  },

  textHeading: {
    fontFamily: fontFamily.Poppins_Regular,
    fontSize: textScale(14),
    color: colors.grey1,
  },
  uploadPhotoContainer: {
    height: moderateScaleVertical(150),

    justifyContent: 'center',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 0.5,
    alignItems: 'center',

    borderColor: colors.blackOpacity25,
    marginVertical: moderateScaleVertical(10),
  },
});

// import {Button, Image, StyleSheet, Text, View} from 'react-native';
// import React, {useEffect, useState} from 'react';
// import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
// import DocumentPicker from 'react-native-document-picker';

// import {Vimeo} from 'react-native-vimeo-iframe';

// const AddCourse = () => {
//   const [image, setImage] = useState('');
//   return (
//     <View style={{flex: 1}}>
//       <Button
//         title="Open Gallery"
//         onPress={() => {
//           ImagePicker.openPicker({
//             // width: 300,
//             // height: 400,
//             cropping: true,
//           }).then((image: ImageOrVideo) => {
//             console.log(image);
//             setImage(image?.path);
//           })
//         }}/>
//       <Button
//         title="Open Document"
//         onPress={async () => {
//           try {
//             const pickerResult = await DocumentPicker.pickSingle({
//               presentationStyle: 'fullScreen',
//               copyTo: 'cachesDirectory',
//             })
//             console.log({pickerResult});

//           } catch (e) {
//             console.log({e});

//           }
//         }}/>
//       {image && (
//         <Image source={{uri: image}} style={{width: 300, height: 300}} />
//       )}
//       <Text>Add Course ki sccreen</Text>
//     </View>
//   );
// };

// export default AddCourse;

// const styles = StyleSheet.create({});
