import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../../../styles/colors';
import commonStyles from '../../../styles/commonStyles';
import fontFamily from '../../../styles/fontFamily';
import {
  moderateScaleVertical,
  moderateScale,
  textScale,
} from '../../../styles/responsiveSize';
import CustomIconInput from '../../Forms/CustomIconInput';

import EyeIcon from '../../../assets/images/Icons/EyeIcon.svg';
import TickIcon from '../../../assets/images/Icons/blueTickAbout.svg';
import CommonButton from '../../CommonButton';
import {useDispatch, useSelector} from 'react-redux';
import usePostData from '../../../hooks/usePostData';
import {endpoints} from '../../../utils/endpoints';
import {showError, showSuccess} from '../../../utils/helperFunctions';
import {validationErrorMessage} from '../../../constants/mainstrings';
import RNSecureStorage from 'rn-secure-storage';
import { IsTempVar } from '../../../redux/slice/authSlice';

const ChangePassword = () => {
  const userData = useSelector((state: any) => state?.auth?.userPayload);
  const dispatch=useDispatch()
  console.log('this is what we willbe getting into this', userData);
  const {
    mutate: changePassword,
    isSuccess,
    data,
    isError,
    error,
  } = usePostData(`${endpoints.CHANGE_PASSWORD}`, ['CHANGE_PASSWORD']);
  const [changePass, setChangePass] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [changeSecure, setChangeSecure] = useState({
    oldPassword: true,
    newPassword: true,
    confirmPassword: true,
  });

  console.log(
    'changePasschangePasschangePasschangePasschangePasschangePass',
    changePass,
  );

  useEffect(() => {
    (async () => {
      if (isSuccess) {
        showSuccess('Password Changed SuccessFully');
        await RNSecureStorage.removeItem('token')
        dispatch(IsTempVar({ tempVar: false }));
      } else if (isError) {
        console.log('passow passow passow passow', error);
        
        showError(error);
      }
    })();
  }, [isSuccess,isError]);

  const handleChangePassword = async () => {
    if (!changePass?.oldPassword) {
      showError(validationErrorMessage.oldPasswordError);
      return;
    } else if (!changePass?.newPassword) {
      showError(validationErrorMessage.passwordError);
      return;
    } else if (!changePass?.confirmPassword) {
      showError(validationErrorMessage.confPasswordError);
      return;
    } else if (changePass.newPassword !== changePass.confirmPassword) {
      showError(validationErrorMessage.validateConfirmError);
      return;
    }
    const payloadData = {
      old_password: changePass.oldPassword,
      new_password: changePass.newPassword,
    };
    console.log('payloadDatapayloadDatapayloadDatapayloadData',payloadData);
    
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
            color: colors.blackGreyMedium,
          }}>
          Old Password
        </Text>
        <CustomIconInput
          placeholder={'Old Password'}
          onChangeText={(val: any) => {
            setChangePass({...changePass, oldPassword: val});
          }}
          secure={changeSecure.oldPassword}
          icon={<EyeIcon />}
          handleIconPress={() => {
            setChangeSecure({
              ...changeSecure,
              oldPassword: !changeSecure.oldPassword,
            });
          }}
          value={changePass.oldPassword}
        />
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
              confirmPassword: !changeSecure.newPassword,
            });
          }}
        />
      </View>
      <CommonButton
        mainViewStyle={{
          marginHorizontal: moderateScale(0),
          marginBottom: moderateScale(30),
        }}
        btnText="Submit"
        onPressBtn={handleChangePassword}
      />
    </ScrollView>
  );
};

export default ChangePassword;

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
