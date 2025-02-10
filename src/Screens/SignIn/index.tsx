import React, {useEffect, useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import EyeIcon from '../../assets/images/Icons/EyeIcon.svg';
import BtnBlack from '../../assets/images/Icons/btnBlack.svg';
import HatIcon from '../../assets/images/Icons/shadowHat.svg';

import {useNavigation, useRoute} from '@react-navigation/native';
import CommonButton from '../../Components/CommonButton';
import CustomTextInput from '../../Components/CustomTextInput';
import CustomIconInput from '../../Components/Forms/CustomIconInput';
import ErrorMessage from '../../Components/Forms/ErrorMessage';
import {
  constantpayload,
  validationErrorMessage,
} from '../../constants/mainstrings';
import navigationStrings from '../../constants/navigationStrings';
import usePostData from '../../hooks/usePostData';
import colors from '../../styles/colors';
import commonStyles from '../../styles/commonStyles';
import fontFamily from '../../styles/fontFamily';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
  verticalScale,
} from '../../styles/responsiveSize';
import {endpoints} from '../../utils/endpoints';
import {showError, showSuccess} from '../../utils/helperFunctions';
import {validatePassword} from '../../utils/logicFunctions';

import DeviceInfo from 'react-native-device-info';
import {useDispatch} from 'react-redux';
import RNSecureStorage, {ACCESSIBLE} from 'rn-secure-storage';
import {IsSignIn, IsTempVar, userPayload} from '../../redux/slice/authSlice';

const SignIn = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {params}: any = useRoute();

  const postLogin = usePostData(endpoints.LOGIN, ['POSTDATA'],'post',async (data)=>{
   
    await RNSecureStorage.setItem('userData', JSON.stringify(data?.data), {
      accessible: ACCESSIBLE.WHEN_UNLOCKED,
    })
    dispatch(userPayload({userPayload: data?.data}));
    showSuccess('login successfully');
    
  },(error)=>{
    showError(error?.message);
  });
  const instructorLogin = usePostData(endpoints.LOGIN_INS, ['LOGIN_INS'],'post',async (data)=>{
    showSuccess('login successfully');
    dispatch(userPayload({userPayload: insSignInData?.data}));
    await RNSecureStorage.setItem('userData', JSON.stringify(data?.data), {
      accessible: ACCESSIBLE.WHEN_UNLOCKED,
    })
  },(error)=>{
    showError(error?.message);
  });

  const {
    mutate: addLogin,
    isPending: loginLoading,
    isSuccess,
    isError,

    error: loginError,
    data: signInData,
  } = postLogin;

  const {
    mutate: insLogin,
    isPending: insLoginLoading,
    isSuccess: insSuccess,
    isError: insError,
    error: insloginError,
    data: insSignInData,
  } = instructorLogin;
  const [cred, setCred] = useState({
    mobile: '',
    password: '',
  });

  const [passVisible, setPassVisible] = useState(true);

  const [credError, setCredError] = useState({
    mobile: '',
    password: '',
  });

  function handlePress() {
    navigation.goBack();
  }

  // useEffect(() => {
  //   if (isSuccess) {
  //     showSuccess('login successfully');
  //   } else if (isError) {
  //     showError(loginError?.message);
  //   }
  // }, [isSuccess, isError, loginError]);

  // useEffect(() => {
  //   if (insSuccess) {
  //     showSuccess('login successfully');
  //   } else if (insError) {
  //     showError(insloginError?.message);
  //   }
  // }, [insSuccess, insError, insloginError]);

  // useEffect(() => {
  //   if (signInData?.authorization?.token) {
      
  //     // dispatch(IsSignIn({userData: signInData}));
  //     RNSecureStorage.setItem('userData', JSON.stringify(signInData?.data), {
  //       accessible: ACCESSIBLE.WHEN_UNLOCKED,
  //     }).then(() => {
  //       dispatch(userPayload({userPayload: signInData?.data}));
  //     });
      
  //   }
  // }, [signInData]);

  // useEffect(() => {
  //   if (insSignInData?.authorization?.token) {
  //     // dispatch(IsSignIn({userData: insSignInData}));
  //     RNSecureStorage.setItem('userData', JSON.stringify(insSignInData?.data), {
  //       accessible: ACCESSIBLE.WHEN_UNLOCKED,
  //     }).then(() => {
  //       dispatch(userPayload({userPayload: insSignInData?.data}));
  //     });
      
  //   }
  // }, [insSignInData]);

  async function handleSignIn() {
    if (!cred?.mobile) {
      setCredError(prevError => ({
        ...prevError,
        mobile: validationErrorMessage.phoneError,
      }));
      return;
    }
    if (!cred?.password) {
      setCredError(prevError => ({
        ...prevError,
        password: validationErrorMessage.passwordError,
      }));
      return;
    }
    if (!validatePassword(cred?.password)) {
      setCredError(prevError => ({
        ...prevError,
        password: validationErrorMessage.passwordRuleError,
      }));
      return;
    }
    setCredError(prevError => ({
      ...prevError,
      mobile: '',
      password: '',
    }));

    const result = await DeviceInfo.getUniqueId();

    // return ;
    if (result) {
      const payload = {
        ...cred,
        operating_system: DeviceInfo.getBrand(),
        mac_address: result,
        country_code: constantpayload.COUNTRY_CODE,
      };

      const insPayload = {
        mobile: cred?.mobile,
        password: cred?.password,
      };
      // return;
      addLogin(payload);
    } else {
    }
  }

  return (
    <KeyboardAvoidingView behavior="height" style={{flex: 1}}>
      <View style={[styles.container, commonStyles.spacingCommon]}>
        <View style={[styles.hatIconStyle]}>
          <HatIcon />
        </View>
        <View style={[styles.backBtnStyle]}>
          <TouchableOpacity onPress={handlePress}>
            <BtnBlack />
          </TouchableOpacity>
        </View>
        <View style={{marginTop: moderateScaleVertical(22)}}>
          <Text
            style={{
              fontSize:DeviceInfo.isTablet()?40: moderateScale(34),
              fontFamily: fontFamily.Montserrat_Bold,
              color: colors.theme,
            }}>
            Sign In
          </Text>
          <Text
            style={{
              fontSize:DeviceInfo.isTablet()?20: moderateScale(14),
              fontFamily: fontFamily.Montserrat_Medium,
              color: colors.blackOpacity70,
              marginVertical: moderateScaleVertical(8),
            }}>
            Please enter your valid Email/ phone number.
          </Text>
        </View>

        <View style={styles.signInContainer}>
          <CustomTextInput
            placeholder={'Phone Number'}
            value={cred.mobile}
            keyboardType="numeric"
            isError={!!credError.mobile}
            inputStyle={{
            
            }}
            containerStyle={{
             
             
            }}
            onChangeText={(val: any) => {
              if (cred.mobile) {
                setCredError({...credError, mobile: ''});
              }
              const cleanedInput = val.replace(/[^0-9]/g, '');
              setCred({...cred, mobile: cleanedInput});
            }}
            key={1}
          />

          {credError?.mobile && (
            <ErrorMessage
              message={credError?.mobile}
              errorStyle={{marginLeft: moderateScaleVertical(10)}}
            />
          )}
          <CustomIconInput
            placeholder={'Password'}
            value={cred.password}
            isError={!!credError.password}
            onChangeText={(val: any) => {
              if (cred.password) {
                setCredError({...credError, password: ''});
              }
              setCred({...cred, password: val});
            }}
            secure={passVisible}
            icon={<EyeIcon />}
            handleIconPress={() => {
              setPassVisible(!passVisible);
            }}
          />
          {credError?.password && (
            <ErrorMessage
              message={credError?.password}
              errorStyle={{marginLeft: moderateScaleVertical(10)}}
            />
          )}
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(navigationStrings.ForgotPassword as never);
            }}>
            <Text
              style={{
                fontFamily: fontFamily.Poppins_SemiBold,
                textAlign: 'right',
              }}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <CommonButton
            btnText={loginLoading || insLoginLoading ? 'Loading' : 'Sign In'}
            mainViewStyle={{marginHorizontal: 0}}
            onPressBtn={handleSignIn}
            loading={loginLoading || insLoginLoading}
          />
        </View>

        {/* <Text style={styles.smallText}>
          Don't have an account?
          <Text style={{fontFamily: fontFamily.KumbhSans_Bold}}> Sign Up</Text>
        </Text> */}
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            // bottom: 10,
            // position: 'relative',
            marginBottom: verticalScale(30),
          }}>
          <Text style={[styles.smallText]}
          >Don't have an account ?</Text>
          {/* <TouchableOpacity
            onPress={() =>
              navigation.navigate(navigationStrings.SignUp as never)
            }> */}
            <Text
              style={{
                fontFamily: fontFamily.KumbhSans_Bold,
                color: colors.black,
                fontSize: DeviceInfo.isTablet()? 16:textScale(12),
              }}
              onPress={() =>
                navigation.navigate(navigationStrings.SignUp as never)
              }
              >
              {' '}
              Sign Up
            </Text>
          {/* </TouchableOpacity> */}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  backBtnStyle: {
    marginTop: moderateScaleVertical(60),
  },
  hatIconStyle: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  signInContainer: {
    marginVertical: moderateScaleVertical(20),
    // gap: moderateScaleVertical(12),
  },
  smallText: {
    fontSize: DeviceInfo.isTablet()?20:textScale(14),
    fontFamily: fontFamily.KumbhSans_Regular,
    alignSelf: 'center',
    color: colors.black,
    // marginBottom: verticalScale(30),
    // position: 'absolute',
    // bottom: 20,
  },
});
