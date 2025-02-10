import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../../styles/colors';
import commonStyles from '../../styles/commonStyles';
import fontFamily from '../../styles/fontFamily';
import {
  moderateScaleVertical,
  moderateScale,
  textScale,
} from '../../styles/responsiveSize';
// import CustomIconInput from '../Forms/CustomIconInput';



import EyeIcon from '../../assets/images/Icons/EyeIcon.svg';
import TickIcon from '../../assets/images/Icons/blueTickAbout.svg';
// import CommonButton from '../../CommonButton';


import {useDispatch, useSelector} from 'react-redux';
// import usePostData from '../../../hooks/usePostData';

// import {endpoints} from '../../../utils/endpoints';
import {showError, showSuccess} from '../../utils/helperFunctions';
import {validationErrorMessage} from '../../constants/mainstrings';
import RNSecureStorage from 'rn-secure-storage';
import { IsTempVar } from '../../redux/slice/authSlice';
import CommonButton from '../../Components/CommonButton';
import usePostData from '../../hooks/usePostData';
import { endpoints } from '../../utils/endpoints';
import CustomIconInput from '../../Components/Forms/CustomIconInput';
import { useNavigation, useRoute } from '@react-navigation/native';
import navigationStrings from '../../constants/navigationStrings';
const ResetPassword = () => {
  const userNumber = useSelector((state: any) => state?.auth?.mobileNumber);

  
  const dispatch=useDispatch()
  const {params}:any=useRoute()
  const navigation =  useNavigation<any>()
  const otpFinal:number=params?.otp;
  const {
    mutate: changePassword,
    isSuccess,
    data,
    isPending,
    isError,
    error,
  } = usePostData(`${endpoints.RESET_PASSWORD}`, ['CHANGE_PASSWORD']);
  const [changePass, setChangePass] = useState({
   
    newPassword: '',
    confirmPassword: '',
  });
  const [changeSecure, setChangeSecure] = useState({
    
    newPassword: true,
    confirmPassword: true,
  });



  useEffect(() => {
    (async () => {
      if (isSuccess) {
        showSuccess('Password Changed SuccessFully');
        // navigation.navigate(navigationStrings.SignIn as never)
        navigation.navigate(navigationStrings.SignIn,{type:"student"});

        // await RNSecureStorage.removeItem('token')
        // dispatch(IsTempVar({ tempVar: false }));
      } else if (isError) {
        
        showError(error); 
      }
    })();
  }, [isSuccess,isError]);

  const handleChangePassword = async () => {
    if (!changePass?.newPassword) {
      showError(validationErrorMessage.passwordError);
      return;
    } else if (!changePass?.confirmPassword) {
      showError(validationErrorMessage.confPasswordError);
      return;
    } else if (changePass?.newPassword !== changePass?.confirmPassword) {
      showError(validationErrorMessage.validateConfirmError);
      return;
    }
    const payloadData = {
        mobile:userNumber,
        country_code:91,
        password:changePass?.newPassword,
        // otp:otpFinal,
    };
    
    changePassword(payloadData);
  };

  return (
    <ScrollView
      contentContainerStyle={[styles.container, commonStyles.spacingCommon]}>
      <Text style={styles.passHeading}>
        The new password must be different from the current password
      </Text>

      <View style={[styles.passContainer]}>
       
        <Text
          style={{
            fontFamily: fontFamily.Poppins_Regular,
            fontSize: textScale(14),
            marginTop: moderateScaleVertical(12),
            color: colors.blackGreyMedium,
          }}>
          New Password
        </Text>
        <CustomIconInput
          placeholder={'New Password'}
          onChangeText={(val: any) => {
            setChangePass({...changePass, newPassword: val});
          }}
          secure={changeSecure.newPassword}
          icon={<EyeIcon />}
          handleIconPress={() => {
            setChangeSecure({
              ...changeSecure,
              newPassword: !changeSecure.newPassword,
            });
          }}
          value={changePass.newPassword}
        />

        <View
          style={{
            alignItems: 'center',
            gap: moderateScale(6),
            flexDirection: 'row',
            marginVertical: moderateScale(10),
          }}>
          <TickIcon />
          <Text
            style={{
              color: colors.theme,
              fontFamily: fontFamily.Poppins_Medium,
            }}>
            There must be at least 8 characters
          </Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            gap: moderateScale(6),
            flexDirection: 'row',
          }}>
          <TickIcon />
          <Text
            style={{
              color: colors.theme,
              fontFamily: fontFamily.Poppins_Medium,
            }}>
            There must be a unique code like @!#
          </Text>
        </View>

        <Text
          style={{
            fontFamily: fontFamily.Poppins_Regular,
            fontSize: textScale(14),
            color: colors.blackGreyMedium,
            marginTop: moderateScale(26),
          }}>
          Confirm Password
        </Text>
        <CustomIconInput
          placeholder={'Confirm Password'}
          onChangeText={(val: any) => {
            setChangePass({...changePass, confirmPassword: val});
          }}
          secure={changeSecure.confirmPassword}
          value={changePass.confirmPassword}
          icon={<EyeIcon />}
          handleIconPress={() => {
            setChangeSecure({
              ...changeSecure,
              confirmPassword: !changeSecure.confirmPassword,
            });
          }}
        />
      </View>
      <CommonButton
        mainViewStyle={{
          marginHorizontal: moderateScale(0),
          marginBottom: moderateScale(30),
        }}
        
        loading={isPending}
        
        btnText={isPending?"Submitting":"Submit"}
        onPressBtn={handleChangePassword}
      />
    </ScrollView>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  passHeading: {
    fontFamily: fontFamily.Poppins_Regular,
    fontSize: textScale(16),
    color: colors.black,
    marginTop: moderateScale(12),
  },
  passContainer: {
    marginTop: moderateScaleVertical(26),
    flex: 1,
  },
});
