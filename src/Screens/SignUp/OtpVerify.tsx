import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import WrapperContainer from '../../Components/WrapperContainer';
import {useNavigation, useRoute} from '@react-navigation/native';
import commonStyles from '../../styles/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
  verticalScale,
} from '../../styles/responsiveSize';
import colors from '../../styles/colors';
import fontFamily from '../../styles/fontFamily';
import CommonButton from '../../Components/CommonButton';
import {useDispatch, useSelector} from 'react-redux';
import usePostData from '../../hooks/usePostData';
import {endpoints} from '../../utils/endpoints';
import {showError, showSuccess} from '../../utils/helperFunctions';
import {IsSignIn, IsTempVar} from '../../redux/slice/authSlice';
import navigationStrings from '../../constants/navigationStrings';
import RNSecureStorage, {ACCESSIBLE} from 'rn-secure-storage';
// to be deleted
import {
  getHash,
  removeListener,
  startOtpListener,
  useOtpVerify,
} from 'react-native-otp-verify';
import {useLoginHandler} from '../../hooks/useLoginHandler';

const OtpVerify = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [newOtp, setNewOtp] = useState('');
  const [seconds, setSeconds] = useState(120);
  const userPayLoad = useSelector((state: any) => state?.auth?.userPayload);
  console.log('This is user payload: ', userPayLoad);

  const dispatch = useDispatch();
  const {params}: any = useRoute();

  useEffect(() => {
    if (seconds > 0) {
      const timer = setInterval(() => setSeconds(seconds - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [seconds]);

  const formatTime = (t: number) =>
    `${Math.floor(t / 60)
      .toString()
      .padStart(2, '0')}:${(t % 60).toString().padStart(2, '0')}`;

  const {
    mutate: sendOtp,
    isSuccess,
    error: sendOtpError,
    isError,
    data: otpData,
  } = usePostData(
    endpoints.SEND_OTP,
    ['SEND_OTP'],
    'post',
    data => {
      showSuccess(data?.message);
      setSeconds(120);
    },
    error => {
      showError(error?.message);
    },
  );

  const {
    mutate: verifyOtp,
    isSuccess: verifySuccess,
    error: verifyOtpError,
    isError: verifyError,
    data: verifyOtpData,
  } = usePostData(
    endpoints.VERIFY_OTP,
    ['VERIFY_OTP'],
    'post',
    data => {
      if (params?.forgotMobile) {
        navigation.navigate(navigationStrings.ResetPassword);
        return;
      }
      showSuccess(data?.message);
      register(userPayLoad);
    },
    err => {
      showError(err?.message);
    },
  );

  const {
    mutate: register,
    isSuccess: registerSuccess,
    error: registerErrorMessage,
    isError: registerError,
    data: registerData,
  } = usePostData(
    endpoints.STUDENT_REGISTER,
    ['STUDENT_REGISTER'],
    'post',
    data => {},
    err => {},
  );

  const {
    mutate: sendOtpForgot,
    isSuccess: otpSuccess,
    data,
    isPending,
    isError: otpError,
    error,
  } = usePostData(
    endpoints.FORGOT_PASSWORD,
    ['FORGOT_PASSWORD'],
    'post',
    data => {},
    err => {},
  );

  const otpInputs: React.MutableRefObject<any>[] = [
    useRef(),
    useRef(),
    useRef(),
    useRef(),
  ];

  useEffect(() => {
    if (otpInputs[0].current) {
      otpInputs[0].current.focus();
    }
  }, []);

  useEffect(() => {
    if (userPayLoad?.mobile) {
      sendOtp({
        country_code: userPayLoad?.country_code,
        mobile: userPayLoad?.mobile,
      });
    }
  }, [userPayLoad]);

  useEffect(() => {}, [params?.forgotMobile]);

  const {handleLogin} = useLoginHandler();

  useEffect(() => {
    (async () => {
      if (registerSuccess) {
        showSuccess(registerData?.message);

        if (registerData?.data) {
          dispatch(IsSignIn({userData: registerData?.data}));
          await handleLogin({
            mobile: userPayLoad?.mobile,
            password: userPayLoad?.password,
          });

          dispatch(IsTempVar({tempVar: true}));
          await RNSecureStorage.setItem(
            'userData',
            JSON.stringify(registerData?.data),
            {
              accessible: ACCESSIBLE.WHEN_UNLOCKED,
            },
          );
        }
      } else if (isError) {
        showError(registerErrorMessage?.message);
      }
    })();
  }, [registerSuccess]);

  useEffect(() => {
    if (otpSuccess) {
      showSuccess(data?.message);
    } else if (otpError) {
      showError(error?.message);
    }
  }, [otpSuccess, otpError]);

  const {
    hash,
    otp: autoOtp,
    message,
    timeoutError,
    stopListener,
    startListener,
  } = useOtpVerify({numberOfDigits: 4});

  useEffect(() => {
    getHash()
      .then(hash => {
        // use this hash in the message.
      })
      .catch(console.log);

    startOtpListener(message => {
      // extract the otp using regex e.g. the below regex extracts 4 digit otp from message
      const otp = /(\d{4})/g.exec(message)[1];
      setNewOtp(otp);
    });
    return () => removeListener();
  }, []);

  const handleOtpChange = (text: any, index: number) => {
    // Update the OTP digit at the specified index
    otp[index] = text;

    setOtp([...otp]);

    // If a number is entered and the input is not the last one, focus on the next input field
    if (text !== '' && index < otp.length - 1) {
      otpInputs[index + 1]?.current?.focus();
    }
    if (text === '') {
      otpInputs[index - 1]?.current?.focus();
    }
  };

  const navigation = useNavigation<any>();
  async function handlePress() {
    const finalOtp = +otp.join('');

    console.log(
      finalOtp,
      finalOtp.toString().length,
      'ther ewill adasdasdasdas',
    );

    if (finalOtp !== 0 && finalOtp.toString().length < 4) {
      showError('Please fill the otp');
      return;
    }

    if (params?.forgotMobile) {
      verifyOtp({
        otp: finalOtp,
        mobile: params?.forgotMobile,
        country_code: params?.countryCode,
      });
    } else {
      verifyOtp({
        otp: finalOtp,
        mobile: userPayLoad?.mobile,
        country_code: userPayLoad?.country_code,
      });
    }
  }

  function handleResend() {
    if (userPayLoad?.mobile) {
      sendOtp({
        country_code: userPayLoad?.country_code,
        mobile: userPayLoad?.mobile,
      });
    } else if (params?.forgotMobile) {
      sendOtpForgot({
        mobile: params?.forgotMobile,
        country_code: params?.countryCode,
      });
    }
  }

  return (
    <WrapperContainer>
      <ScrollView style={{position: 'relative'}}>
        {
          <View style={styles.logoContainer}>
            <View>
              <Text
                style={[
                  commonStyles.greyText,
                  commonStyles.spacingCommon,

                  commonStyles.greyTextScale,

                  {fontFamily: fontFamily.Poppins_Regular, textAlign: 'left'},
                ]}>
                Enter the otp sent on
                <Text
                  style={{
                    fontFamily: fontFamily.Poppins_Bold,
                    color: colors.black,
                  }}>
                  {` +93${userPayLoad?.mobile || params?.forgotMobile}`}{' '}
                </Text>
              </Text>
            </View>
            <View style={styles.inputContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={otpInputs[index]}
                  style={styles.input}
                  keyboardType="numeric"
                  maxLength={1}
                  autoComplete="sms-otp"
                  textContentType="oneTimeCode"
                  secureTextEntry
                  value={digit}
                  onChangeText={text => handleOtpChange(text, index)}
                />
              ))}
            </View>

            <CommonButton
              btnText="Verify"
              mainViewStyle={{marginHorizontal: 0}}
              onPressBtn={handlePress}
            />

            <Text
              style={[
                styles.otpResend,
                {
                  marginVertical: moderateScaleVertical(12),
                  fontSize: textScale(14),
                  color: colors.theme,
                  textAlign: 'center',
                },
              ]}>
              {formatTime(seconds)}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={[
                  commonStyles.greyText,
                  commonStyles.greyTextScale,
                  {alignItems: 'center', margin: 0},
                ]}>
                Didn’t receive a OTP?
              </Text>
              <TouchableOpacity onPress={handleResend}>
                <Text style={[styles.otpResend]}> Resend OTP</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
      </ScrollView>
    </WrapperContainer>
  );
};

export default OtpVerify;

const styles = StyleSheet.create({
  logoContainer: {},
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    justifyContent: 'center',
  },
  otpResend: {
    color: colors.theme,
    fontFamily: fontFamily.Urbanist_Bold,
  },
  input: {
    width: moderateScale(60),
    height: moderateScale(60),
    borderWidth: 1,
    borderColor: colors.blackOpacity70,
    color: colors.darkGrey,
    opacity: 0.65,
    textAlign: 'center',
    borderRadius: moderateScale(6),

    fontSize: textScale(24),
    margin: verticalScale(10),
  },
});
