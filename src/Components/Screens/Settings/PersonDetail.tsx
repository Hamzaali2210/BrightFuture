import {
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  moderateScale,
  textScale,
  verticalScale,
} from '../../../styles/responsiveSize';
import colors from '../../../styles/colors';

import EditIcon from '../../../assets/images/Icons/settingsIcon/PenIcon.svg';
import imagePath from '../../../constants/imagePath';
import navigationStrings from '../../../constants/navigationStrings';
import {useDispatch, useSelector} from 'react-redux';
import ImageCropPicker from 'react-native-image-crop-picker';
import usePostData from '../../../hooks/usePostData';
import {endpoints} from '../../../utils/endpoints';
import {showError, showSuccess} from '../../../utils/helperFunctions';
import {API_URL_2, IMAGE_API_URL} from '../../../utils/urls';
import useGetData from '../../../hooks/useGetData';
import RNSecureStorage, {ACCESSIBLE} from 'rn-secure-storage';
import {userPayload} from '../../../redux/slice/authSlice';
import FastImage from 'react-native-fast-image';
import DeviceInfo from 'react-native-device-info';
import WalletContainer from './WalletContainer';
import ContainerList from './ContainerList';

function PersonDetail() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.auth.userPayload);

  const [profilePicture, setProfilePicture] = useState(userData?.avatar);

  console.log('userDatauserDatauserDatauserData', userData?.avatar);
  const {
    data: studentData,
    isLoading,
    isRefetching,
    refetch: stuRefetch,
  }: any = useGetData(endpoints.SHOW_PROFILE, ['SHOW_PROFILE']);
  const {data: instructorData, refetch: insRefetch}: any = useGetData(
    endpoints.SHOW_INS_PROFILE,
    ['SHOW_INS_PROFILE'],
  );

  const {mutate: instructorProfile, status: insStatus} = usePostData(
    endpoints.UPDATE_INS_PROFILE,
    ['UPDATE_INS'],
    'post',
    () => {
      insRefetch();
    },
  );

  const {mutate: studentProfile, status: studentStatus} = usePostData(
    endpoints.UPDATE_PROFILE,
    ['UPDATE_INS'],
    'put',
    () => {
      stuRefetch();
    },
  );

  useEffect(() => {
    console.log('studentData', studentData, 'instructorData', instructorData);

    if (
      insStatus === 'success' ||
      studentStatus === 'success' ||
      studentData?.user?.id ||
      studentData?.user?.id
    ) {
      if (userData?.role === 2) {
        RNSecureStorage.setItem('userData', JSON.stringify(studentData?.user), {
          accessible: ACCESSIBLE.ALWAYS,
        }).then(() => {
          dispatch(userPayload({userPayload: studentData?.user}));
        });
      } else if (userData?.role === 3) {
        RNSecureStorage.setItem(
          'userData',
          JSON.stringify(instructorData?.user),
          {
            accessible: ACCESSIBLE.ALWAYS,
          },
        ).then(() => {
          dispatch(userPayload({userPayload: instructorData?.user}));
        });
      }
    }
  }, [insStatus, studentStatus]);

  const handlePress = async () => {
    try {
      const result = await ImageCropPicker.openPicker({
        cropping: true,
        compressVideoPreset: 'Passthrough',
        mediaType: 'photo',
      });

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

      console.log('datadatadatadatadatadatadatadatadata', data?.data);

      if (data?.data?.status === 200 || data?.status === 'success') {
        setProfilePicture(
          Platform.OS === 'ios' ? result?.sourceURL : result?.path,
        );
        showSuccess('photo Uploaded SuccessFully');
        if (userData?.role === 3) {
          instructorProfile({avatar: data?.data[0]});
        } else if (userData?.role === 2) {
          studentProfile({avatar: data?.data[0]});
        }

        return data;
      }
    } catch (err) {
      showError('error while uploading the photo');
    }
    return;
  };

  if (isLoading || isRefetching) {
    return (
      <View style={{display: 'flex', alignItems: 'center', marginTop: '50%'}}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <>
      <View style={[styles.profileContainer]}>
        <View style={[styles.profileNameContainer]}>
          <TouchableOpacity
            style={[styles.profileImageContainer]}
            onPress={handlePress}>
            <FastImage
              resizeMode="cover"
              style={[styles.profileImage]}
              source={{
                uri: profilePicture,
              }}
            />
          </TouchableOpacity>
          <View style={[styles.profileName]}>
            <Text style={[styles.userNameText]}>{userData?.full_name}</Text>
            <Text style={[styles.userNameEmail]}>{userData?.mobile}</Text>
          </View>
        </View>
        <View>
          {userData?.role === 2 && (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(navigationStrings.EditProfile as never);
              }}
              style={{
                width: moderateScale(54),
                height: moderateScale(54),
                overflow: 'hidden',
              }}>
              <Image
                source={imagePath.editPen}
                resizeMode="contain"
                style={{width: '100%', height: '100%'}}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <WalletContainer />
      <ContainerList />
    </>
  );
}

export default PersonDetail;

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row',
    paddingVertical: moderateScale(16),
  },
  profileNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: moderateScale(10),
  },
  profileImageContainer: {
    overflow: 'hidden',
    backgroundColor: colors.lightThemeBlue,
    width: DeviceInfo.isTablet() ? moderateScale(35) : moderateScale(55),
    height: DeviceInfo.isTablet() ? moderateScale(35) : moderateScale(55),
    borderRadius: moderateScale(800),
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  profileName: {},
  userNameText: {
    fontFamily: 'Poppins-Bold',
    color: colors.black,
    fontSize: DeviceInfo.isTablet() ? textScale(12) : textScale(16),
  },
  userNameEmail: {
    fontFamily: 'Poppins-Regular',
    color: colors.dustyGray,
  },
});
