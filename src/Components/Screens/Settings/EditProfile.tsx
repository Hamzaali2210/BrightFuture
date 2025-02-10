import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DatePicker from 'react-native-date-picker';
import {useNavigation} from '@react-navigation/native';
import commonStyles from '../../../styles/commonStyles';

import BackBtn from '../../../assets/images/Icons/btnBlack.svg';
import {mainStrings} from '../../../constants/mainstrings';
import {
  moderateScale,
  moderateScaleVertical,
  scale,
  textScale,
  verticalScale,
} from '../../../styles/responsiveSize';
import fontFamily from '../../../styles/fontFamily';
import colors from '../../../styles/colors';
import imagePath from '../../../constants/imagePath';

import ImagePicker from 'react-native-image-crop-picker';

import EditIcon from '../../../assets/images/Icons/Edit.svg';
import CustomTextInput from '../../CustomTextInput';
import CustomDatePicker from '../../Forms/CustomDatePicker';
import {CustomInputDate} from '../../../types/uiType';
import CommonButton from '../../CommonButton';
import {useDispatch, useSelector} from 'react-redux';
import useGetData from '../../../hooks/useGetData';
import {endpoints} from '../../../utils/endpoints';
import FastImage from 'react-native-fast-image';
import usePostData from '../../../hooks/usePostData';
import {showError, showSuccess} from '../../../utils/helperFunctions';
import CustomNativeDropDown from '../../Forms/CustomNativeDropDown';
import CustomNativeDropDownValue from '../../Forms/CustomNativeDropDownValue';
import {IMAGE_API_URL} from '../../../utils/urls';
import navigationStrings from '../../../constants/navigationStrings';
import {userPayload} from '../../../redux/slice/authSlice';

export interface InputTitle extends CustomInputDate {
  valueData: {
    first_name: string;
    last_name: string;
    university: string;
    department: string;
    mobile: number;
    education_name: string; // not coming
    education_document_url: string; // not coming
    govt_id_document_url: string; // not coming
    govt_id_name: string; // not coming
    about: string;
    countryCode?: string;
  };
  handleChange: (key: string, value: string) => void;
  handleSelectChange: (key: string, value: string) => void;
  schoolData: Array<any>;
  schoolDeptData: Array<any>;
  studentSchool: Array<{id: number; value: string}>;
  studentSchoolDept: Array<{id: number; value: string}>;
}

const InputProfile: React.FC<InputTitle> = ({
  setOpen,
  open,
  date,
  setDate,
  valueData,
  handleChange,
  schoolData,
  schoolDeptData,
}) => {
  // const InputProfile = ({setOpen,open,date,setDate}) => {
  const profile = useSelector((state: any) => state?.auth?.userPayload);
  console.log('profileprofileprofileprofileprofileprofile', profile);

  return (
    <KeyboardAwareScrollView>
      <View style={{marginVertical: verticalScale(16)}}>
        <CustomTextInput
          placeholder="First Name"
          value={valueData.first_name}
          onChangeText={e => handleChange('first_name', e)}
        />
        <CustomTextInput
          placeholder="Last Name"
          value={valueData.last_name}
          onChangeText={e => handleChange('last_name', e)}
        />

        {/* <CustomDatePicker
          placeholder="Date of Birth"
          value=""
          onChangeText={(val: any) => {}}
          open={open}
          setDate={setDate}
          setOpen={setOpen}
          date={date}
        /> */}

        {schoolData?.length > 0 && (
          <CustomNativeDropDownValue
            handleChange={value => handleChange('university', value)}
            data={schoolData}
            disable
            placeholder={{label: 'Select University', value: null}}
            value={valueData.university}
            defaultValue={valueData.university}
          />
        )}
        {/* {console.log('HIHI : ', schoolData[0])} */}
        {/* {valueData.university && (
          <CustomNativeDropDownValue
            data={schoolDeptData}
            placeholder={{label: 'Select School', value: null}}
            handleChange={value => {}}
          />
        )} */}
        {/* <CustomTextInput
          placeholder="Department"
          value=""
          onChangeText={(val: any) => {}}
        /> */}
        <CustomTextInput
          placeholder="Phone Number"
          value={valueData.mobile}
          disable
          onChangeText={e => handleChange('phone_number', e)}
        />
        <CustomTextInput
          placeholder="About"
          value={valueData.about}
          onChangeText={e => handleChange('about', e)}
          multiline
          containerStyle={{
            paddingTop: moderateScale(12),
            height: moderateScaleVertical(120),
          }}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};
function EditProfile() {
  const [date, setDate] = useState(new Date());
  const profile = useSelector((state: any) => state?.auth?.userPayload);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState({ path: profile?.avatar });
  const [studentSchool, setStudentSchool] = useState('');
  const [studentSchoolDept, setStudentSchoolDept] = useState([]);

  const [editProfile, setEditProfile] = useState({
    first_name: profile?.first_name || '',
    last_name: profile?.last_name || '',
    university: `${profile.student.university.id}`,
    department: '',
    mobile: profile?.mobile,
    education_name: '', // not coming
    education_document_url: '', // not coming
    govt_id_document_url: '', // not coming
    govt_id_name: '', // not coming
    about: profile?.about,
    country_code: profile.country_code,
  });

  useEffect(() => {
    console.log('editProfileeditProfileeditProfileeditProfile', editProfile);
  }, [editProfile]);

  const {data: uniData, status: uniStatus}: any = useGetData(
    endpoints.UNIVERSITIES,
    ['UNIVERSITIES'],
  );

  console.log(
    'uniDatauniDatauniDatauniDatauniDatauniDatauniDatauniData',
    uniData,
  );

  const {data: uniDeptData, status: uniDeptStatus}: any = useGetData(
    endpoints.UNIVERSITIES_DEPRATMENT,
    ['UNIVERSITIES_DEPRATMENT'],
  );

  const {data: schoolData, status: schoolStatus} = useGetData(
    endpoints.SCHOOL_TYPE,
    ['SCHOOL_TYPE'],
  );

  const {data: schoolGradeData, status: schoolGradeStatus} = useGetData(
    endpoints.SCHOOL_GRADE,
    ['SCHOOL_GRADE'],
  );

  const {data: trainingData, status: trainingStatus} = useGetData(
    endpoints.TRAINING_FIELD,
    ['TRAINING_FIELD'],
  );

  const {mutate: updateProfile, status: updateProfilieStatus} = usePostData(
    `${endpoints.UPDATE_PROFILE}`,
    ['UPDATE_PROFILE'],
    'post',
    (data: any) => {
      const {first_name, full_name, last_name, about, ...rest} = profile;
      dispatch(
        userPayload({
          userPayload: {
            first_name: data.data.first_name,
            full_name: data.data.full_name,
            last_name: data.data.last_name,
            about: data.data.about,
            ...rest,
          },
        }),
      );
      navigation.navigate(navigationStrings.Settings as never);
      showSuccess('Profile updated successfully');
    },
    (error: any) => {
      showError('Error while updating the profile');
    },
  );

  const [open, setOpen] = useState(false);

  const handlePress = () => {
    const editData: any = {...editProfile};

    for (const key in editData) {
      if (
        editData[key] === '' &&
        editData[key] === null &&
        editData[key] === undefined
      ) {
        delete editData[key];
      }
    }

    if (!editProfile.mobile.startsWith(editProfile.country_code)) {
      editData.mobile = editProfile.country_code + editData.mobile;
    }
    if (avatar?.creationDate) {
      editData.avatar = avatar;
    } else {
      delete editData.avatar;
    }
    updateProfile(editData);
  };

  const handleEditImage = async () => {
    const result = await ImagePicker.openPicker({
      cropping: true,
      compressVideoPreset: 'Passthrough',
    });
    setAvatar(result);
  };

  const handleChange = (key: string, value: string) => {
    if (key === 'university') {
      if (value) {
        setEditProfile({...editProfile, [key]: value});
      }
    } else {
      setEditProfile({...editProfile, [key]: value});
    }
  };

  const handleSelectChange = (key: string, value: string) => {
    setStudentSchoolDept({...studentSchoolDept, [key]: value});
  };

  return (
    <SafeAreaView>
      <ScrollView style={[commonStyles.spacingCommon]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackBtn />
        </TouchableOpacity>
        <View style={[styles.editProfileContainer]}>
          <Text style={styles.heading}>{mainStrings.EditProfile}</Text>
          <TouchableOpacity
            style={[styles.imageContainer]}
            onPress={handleEditImage}>
            {avatar ? (
              <FastImage
                source={{uri: avatar.path}}
                style={[styles.imgStyle]}
              />
            ) : (
              <FastImage
                source={imagePath.sampleEditImage}
                style={[styles.imgStyle]}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              position: 'absolute',
              width: moderateScale(35),
              height: moderateScale(35),
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 500,
              overflow: 'hidden',
              bottom: moderateScaleVertical(-12),
              left: '25%',
            }}
            onPress={handleEditImage}>
            <Image
              source={imagePath.editBlueIcon}
              style={{resizeMode: 'cover', width: '100%', height: '100%'}}
            />
          </TouchableOpacity>
        </View>
        <InputProfile
          setOpen={setOpen}
          date={date}
          setDate={setDate}
          open={open}
          valueData={editProfile}
          handleChange={handleChange}
          schoolData={uniData?.data as []}
          schoolDeptData={uniDeptData?.data as []}
          studentSchool={studentSchool}
          studentSchoolDept={studentSchoolDept}
          handleSelectChange={handleSelectChange}
        />
        <CommonButton
          onPressBtn={handlePress}
          mainViewStyle={{marginHorizontal: 0}}
          btnText="Save"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

export default EditProfile;

const styles = StyleSheet.create({
  editProfileContainer: {
    marginTop: verticalScale(20),
  },
  heading: {
    fontFamily: fontFamily.Poppins_Bold,
    fontSize: textScale(36),
    color: colors.black,
  },
  imageContainer: {
    borderRadius: moderateScale(14),
    overflow: 'hidden',
    width: moderateScale(100),
    height: moderateScale(100),
    marginTop: moderateScaleVertical(12),
  },
  imgStyle: {
    width: '100%',
    height: '100%',
  },
});
