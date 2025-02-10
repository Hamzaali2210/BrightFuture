import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import WrapperContainer from '../../Components/WrapperContainer';
import CommonHeader from '../../Components/CommonHeader';
import {
  moderateScale,
  moderateScaleVertical,
  scale,
  textScale,
  verticalScale,
} from '../../styles/responsiveSize';
import fontFamily from '../../styles/fontFamily';
import colors from '../../styles/colors';
import CustomTextInput from '../../Components/CustomTextInput';
import CommonButton from '../../Components/CommonButton';
import {
  constantpayload,
  mainStrings,
  validationErrorMessage,
} from '../../constants/mainstrings';
import {useRoute} from '@react-navigation/native';
import CustomDropDown from '../../Components/Forms/CustomDropDown';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomIconInput from '../../Components/Forms/CustomIconInput';
import EyeIcon from '../../assets/images/Icons/EyeIcon.svg';
import navigationStrings from '../../constants/navigationStrings';
import useGetData from '../../hooks/useGetData';
import {endpoints} from '../../utils/endpoints';
import {isNumeric, validatePassword} from '../../utils/logicFunctions';
import ErrorMessage from '../../Components/Forms/ErrorMessage';
import {useDispatch} from 'react-redux';
import {userPayload} from '../../redux/slice/authSlice';
import CustomNativeDropDown from '../../Components/Forms/CustomNativeDropDown';
import CountryPicker from 'react-native-country-picker-modal';
interface signUpParams {
  navigation?: any;
}
const countries = ['Egypt', 'Canada', 'Australia', 'Ireland'];

const SignUp: FC<signUpParams> = ({navigation}) => {
  const route = useRoute();
  const dispatch = useDispatch();

  const {
    data: uniData,
    isSuccess: uniSuccess,
    isLoading: uniLoading,
    isError: uniErrorBool,
    error: uniError,
  }:any = useGetData(endpoints.UNIVERSITIES, ['UNIVERSITIES']);

  const {data, isLoading, error, status, isSuccess} = useGetData(
    endpoints.LOGIN,
    ['TUTUTUTUT'],
  );
  const {
    data: schoolData,
    isSuccess: schSuccess,
    isLoading: schLoading,
    isError: schErrorBool,
    error: schError,
  } = useGetData(endpoints.SCHOOL_TYPE, ['SCHOOL_TYPE']);

  const {
    data: schoolGradeData,
    isSuccess: schoolGradeSuccess,
    isLoading: schoolGradeLoading,
    isError: schoolGradeErrorBool,
    error: schoolGradeError,
  } = useGetData(endpoints.SCHOOL_GRADE, ['SCHOOL_GRADE']);

  const {
    data: trainingData,
    isSuccess: traSuccess,
    isLoading: traLoading,
    isError: traErrorBool,
    error: traError,
  } = useGetData(endpoints.TRAINING_FIELD, ['TRAINING_FIELD']);



  const [mainIndex, setMainIndex] = useState(2); // 2 is used for University SignUp part

  const [studentData, setStudentData] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    // referredBy: '',
    countryCode: 'AF',
    countryCodeNumber: '93',
    pass: '',
    confPass: '',
    school: '',
    schoolType: '',
    grade: '',
  });
  const [studentDataError, setStudentDataError] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    // referredBy: '',
    countryCode: 'KW',
    countryCodeNumber: '965',
    pass: '',
    confPass: '',
    school: '',
    schoolType: '',
    grade: '',
  });

  const [generalData, setGeneralData] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    // referredBy: '',
    countryCode: 'KW',
    countryCodeNumber: '965',
    pass: '',
    confPass: '',
    training: '',
    trainingFieldType: '',
  });
  const [universityData, setUniversityData] = useState({
    firstName: '',
    lastName: '',
    countryCode: 'KW',
    countryCodeNumber: '965',
    mobileNumber: '',
    pass: '',
    confPass: '',
    university: '',
    universityDept: '',
  });
  const [universityDataError, setUniversityDataError] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    countryCode: '',
    pass: '',
    confPass: '',
    university: '',
    universityDept: '',
  });
  const [generalDataError, setGeneralDataError] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    countryCode: '',
    pass: '',
    confPass: '',
    training: '',
    trainingFieldType: '',
  });

  const [passwordShow, setPasswordShow] = useState(true);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(true);

  const {
    data: uniDeptData,

  } = useGetData(`${endpoints.UNIVERSITIES_DEPRATMENT}?university_id=${universityData?.university || 1}`, [
    'UNIVERSITIES_DEPRATMENT',universityData?.university
  ]);


  const finalSchoolData: any = {
    schoolData,
    schSuccess,
    schLoading,
    schErrorBool,
    schError,
    schoolGradeData,
    schoolGradeSuccess,
    schoolGradeLoading,
    schoolGradeErrorBool,
    schoolGradeError,
    uniDeptData,
    uniData,

    traSuccess,
    traLoading,
    traError,
    traErrorBool,
    trainingData,
  };

  // useEffect(() => {
  //   if (mainIndex === 0) {
  //     setGeneralData({
  //       firstName: '',
  //       lastName: '',
  //       mobileNumber: '',
  //       referredBy: '',
  //       pass: '',
  //       confPass: '',
  //       training: '',
  //       trainingFieldType: '',
  //     });
  //     setUniversityData({
  //       firstName: '',
  //       lastName: '',
  //       mobileNumber: '',
  //       referredBy: '',
  //       pass: '',
  //       confPass: '',
  //       university: '',
  //       universityDept: '',
  //     });
  //   } else if (mainIndex === 1) {
  //     setGeneralData({
  //       firstName: '',
  //       lastName: '',
  //       mobileNumber: '',
  //       referredBy: '',
  //       pass: '',
  //       confPass: '',
  //       training: '',
  //       trainingFieldType: '',
  //     });
  //     setStudentData({
  //       firstName: '',
  //       lastName: '',
  //       mobileNumber: '',
  //       referredBy: '',
  //       pass: '',
  //       confPass: '',
  //       school: '',
  //       schoolType: '',
  //       grade: '',
  //     });
  //   } else if (mainIndex === 2) {
  //     setUniversityData({
  //       firstName: '',
  //       lastName: '',
  //       mobileNumber: '',
  //       referredBy: '',
  //       pass: '',
  //       confPass: '',
  //       university: '',
  //       universityDept: '',
  //     });
  //     setStudentData({
  //       firstName: '',
  //       lastName: '',
  //       mobileNumber: '',
  //       referredBy: '',
  //       pass: '',
  //       confPass: '',
  //       school: '',
  //       schoolType: '',
  //       grade: '',
  //     });
  //   }
  // }, [mainIndex]);

  const handleSelectedValue = (value: string, key: string) => {
    if (key === 'school') {
      setStudentDataError({
        ...studentDataError,
        school: '',
      });
    } else if (key === 'grade') {
      setStudentDataError({
        ...studentDataError,
        grade: '',
      });
    }
    setStudentData({...studentData, [key]: value});
  };

  const selectedItemFunc = (selItem: any, index: number, key: string) => {
    if (mainIndex === 0) {
      if (key === 'school') {
        setStudentDataError({
          ...studentDataError,
          school: '',
        });
      } else if (key === 'grade') {
        setStudentDataError({
          ...studentDataError,
          grade: '',
        });
      }
      setStudentData({...studentData, [key]: selItem});
    } else if (mainIndex === 1) {
      if (key === 'university') {
        setUniversityDataError({...universityDataError, university: ''});
      }
      if (key === 'universityDept') {
        setUniversityDataError({...universityDataError, universityDept: ''});
      }

      setUniversityData({...universityData, [key]: selItem});
    } else if (mainIndex === 2) {
      setGeneralData({...generalData, [key]: selItem});
    }
  };

  function studentSignIn() {
    return (
      <View>
        <CustomTextInput
          placeholder={'First Name'}
          value={studentData.firstName}
          isError={!!studentDataError?.firstName}
          onChangeText={(val: any) => {
            if (studentDataError?.firstName) {
              setStudentDataError({...studentDataError, firstName: ''});
            }
            setStudentData({...studentData, firstName: val});
          }}
        />

        {!!studentDataError?.firstName && (
          <ErrorMessage
            message={studentDataError?.firstName}
            errorStyle={{marginLeft: moderateScaleVertical(10)}}
          />
        )}
        <CustomTextInput
          placeholder={'Last Name'}
          value={studentData.lastName}
          isError={!!studentDataError?.lastName}
          onChangeText={(val: any) => {
            if (studentDataError?.lastName) {
              setStudentDataError({...studentDataError, lastName: ''});
            }
            setStudentData({...studentData, lastName: val});
          }}
        />
        {!!studentDataError?.lastName && (
          <ErrorMessage
            message={studentDataError?.lastName}
            errorStyle={{marginLeft: moderateScaleVertical(10)}}
          />
        )}
        {!!schSuccess &&
          !!finalSchoolData?.schoolData?.data?.length &&
          !!finalSchoolData?.schoolGradeData?.data?.length && (
            <>
              <CustomNativeDropDown
                data={finalSchoolData?.schoolData?.data}
                placeholder={{label: 'Select School', value: null}}
                handleChange={value => {
                  if (studentDataError?.school) {
                    setStudentDataError({...studentDataError, school: ''});
                  }
                  setStudentData({...studentData, school: value});
                }}
              />
            </>
          )}
        {!!studentDataError?.school && (
          <ErrorMessage
            message={studentDataError?.school}
            errorStyle={{marginLeft: moderateScaleVertical(10)}}
          />
        )}

        {!!studentData?.school && (
          <>
            <CustomNativeDropDown
              data={finalSchoolData?.schoolGradeData?.data}
              placeholder={{label: 'Select Grade', value: null}}
              handleChange={value => {
                if (studentDataError?.grade) {
                  setStudentDataError({...studentDataError, grade: ''});
                }
                setStudentData({...studentData, grade: value});
              }}
            />
          </>
        )}
        {!!studentDataError?.grade && (
          <ErrorMessage
            message={studentDataError?.grade}
            errorStyle={{marginLeft: moderateScaleVertical(10)}}
          />
        )}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width:"100%"
          }}>
          <View
            style={{
              borderRadius: moderateScale(24),
              padding: moderateScale(12),
              borderWidth: 0.5,
              justifyContent:"center",
              alignItems:"center",
              borderColor: colors.blackOpacity25,
              flexDirection:"row",


            }}>
            <CountryPicker
              // visible
              // onSelect={value => {
              //   setStudentData({
              //     ...studentData,
              //     countryCode: value?.cca2,
              //     countryCodeNumber: value?.callingCode[0],
              //   });
              // }}
              withCallingCode
              withFilter
              countryCode={studentData?.countryCode as any}
            />
            <Text style={{fontFamily:fontFamily.Montserrat_Medium,color:colors.blackOpacity80,fontSize:textScale(12)}}>+{studentData?.countryCodeNumber}</Text>
          </View>

          <CustomTextInput
            placeholder={'Mobile Number'}
            keyboardType='numeric'
            value={studentData.mobileNumber}
            containerStyle={{flex:1,marginLeft:moderateScale(10)}}
            isError={!!studentDataError?.mobileNumber}
            onChangeText={(val: any) => {
              if (studentDataError?.mobileNumber) {
                setStudentDataError({...studentDataError, mobileNumber: ''});
              }
              const cleanedInput = val.replace(/[^0-9]/g, '');
              setStudentData({...studentData, mobileNumber: cleanedInput});
            }}
          />
        </View>

        {!!studentDataError?.mobileNumber && (
          <ErrorMessage
            message={studentDataError?.mobileNumber}
            errorStyle={{marginLeft: moderateScaleVertical(10)}}
          />
        )}
        {/* <CustomTextInput
          placeholder={'Referred By'}
          value={studentData.referredBy}
          onChangeText={(val: any) => {
            setStudentData({...studentData, referredBy: val});
          }}
        /> */}
        <CustomIconInput
          placeholder={'Password'}
          value={studentData?.pass}
          isError={!!studentDataError?.pass}
          onChangeText={(val: any) => {
            if (studentDataError?.pass) {
              setStudentDataError({...studentDataError, pass: ''});
            }
            setStudentData({...studentData, pass: val});
          }}
          secure={passwordShow}
          icon={<EyeIcon />}
          handleIconPress={() => setPasswordShow(!passwordShow)}
        />
        {!!studentDataError?.pass && (
          <ErrorMessage
            message={studentDataError?.pass}
            errorStyle={{marginLeft: moderateScaleVertical(10)}}
          />
        )}
        <CustomIconInput
          placeholder={'Confirm Password'}
          isError={!!studentDataError?.confPass}
          value={studentData?.confPass}
          onChangeText={(val: any) => {
            if (studentDataError?.confPass) {
              setStudentDataError({...studentDataError, confPass: ''});
            }
            setStudentData({...studentData, confPass: val});
          }}
          secure={confirmPasswordShow}
          icon={<EyeIcon />}
          handleIconPress={() => setConfirmPasswordShow(!confirmPasswordShow)}
        />
        {!!studentDataError?.confPass && (
          <ErrorMessage
            message={studentDataError?.confPass}
            errorStyle={{marginLeft: moderateScaleVertical(10)}}
          />
        )}
      </View>
    );
  }

  function generalSignIn() {
    return (
      <View>
        <CustomTextInput
          placeholder={'First Name'}
          value={generalData.firstName}
          isError={!!generalDataError?.firstName}
          onChangeText={(val: any) => {
            if (generalData?.firstName) {
              setGeneralDataError({...generalDataError, firstName: ''});
            }
            setGeneralData({...generalData, firstName: val});
          }}
        />
        {!!generalDataError?.firstName && (
          <ErrorMessage
            message={generalDataError?.firstName}
            errorStyle={{marginLeft: moderateScaleVertical(10)}}
          />
        )}
        <CustomTextInput
          placeholder={'Last Name'}
          value={generalData.lastName}
          isError={!!generalDataError?.lastName}
          onChangeText={(val: any) => {
            if (generalData?.lastName) {
              setGeneralDataError({...generalDataError, lastName: ''});
            }
            setGeneralData({...generalData, lastName: val});
          }}
        />
        {!!generalDataError?.lastName && (
          <ErrorMessage
            message={generalDataError?.lastName}
            errorStyle={{marginLeft: moderateScaleVertical(10)}}
          />
        )}
        {!!traSuccess && !!finalSchoolData?.trainingData?.data?.length && (
          <CustomNativeDropDown
            data={finalSchoolData?.trainingData?.data}
            placeholder={{label: 'Select Status', value: null}}
            handleChange={value => {
              if (generalData?.training) {
                setGeneralDataError({...generalDataError, training: ''});
              }
              setGeneralData({...generalData, training: value});
            }}
          />
        )}
        {!!generalDataError?.training && (
          <ErrorMessage
            message={generalDataError?.training}
            errorStyle={{marginLeft: moderateScaleVertical(10)}}
          />
        )}

        {!!generalData?.training && (
          <>
            <CustomNativeDropDown
              data={finalSchoolData?.trainingData?.data}
              placeholder={{label: 'Select Training Field', value: null}}
              handleChange={value => {
                if (generalData?.trainingFieldType) {
                  setGeneralDataError({
                    ...generalDataError,
                    trainingFieldType: '',
                  });
                }
                setGeneralData({...generalData, trainingFieldType: value});
              }}
            />
            {!!generalDataError?.training && (
              <ErrorMessage
                message={generalDataError?.training}
                errorStyle={{marginLeft: moderateScaleVertical(10)}}
              />
            )}
          </>
        )}
       <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width:"100%"
          }}>
          <View
            style={{
              borderRadius: moderateScale(24),
              padding: moderateScale(12),
              borderWidth: 0.5,
              justifyContent:"center",
              alignItems:"center",
              borderColor: colors.blackOpacity25,
              flexDirection:"row",


            }}>
            <CountryPicker
              // visible
              onSelect={value => {
                setGeneralData({
                  ...generalData,
                  countryCode: value?.cca2,
                  countryCodeNumber: value?.callingCode[0],
                });
              }}

              withCallingCode
              withFilter
              countryCode={generalData?.countryCode as any}
            />
            <Text style={{fontFamily:fontFamily.Montserrat_Medium,color:colors.blackOpacity80,fontSize:textScale(12)}}>+{generalData?.countryCodeNumber}</Text>
          </View>

          <CustomTextInput
            placeholder={'Mobile Number'}
            keyboardType='numeric'
            value={generalData.mobileNumber}
            containerStyle={{flex:1,marginLeft:moderateScale(10)}}
            isError={!!generalDataError?.mobileNumber}
            onChangeText={(val: any) => {
              if (generalDataError?.mobileNumber) {
                setGeneralDataError({...generalDataError, mobileNumber: ''});
              }
              const cleanedInput = val.replace(/[^0-9]/g, '');
              setGeneralData({...generalData, mobileNumber: cleanedInput});
            }}
          />
        </View>
        {!!generalDataError?.mobileNumber && (
          <ErrorMessage
            message={generalDataError?.mobileNumber}
            errorStyle={{marginLeft: moderateScaleVertical(10)}}
          />
        )}
        {/* <CustomTextInput
          placeholder={'Referred By'}
          value={generalData.referredBy}

          onChangeText={(val: any) => {

            setGeneralData({...generalData, referredBy: val});
          }}
        />
          */}
        <CustomIconInput
          placeholder={'Password'}
          value={generalData.pass}
          isError={!!generalDataError?.pass}
          onChangeText={(val: any) => {
            if (generalData?.pass) {
              setGeneralDataError({...generalDataError, pass: ''});
            }
            setGeneralData({...generalData, pass: val});
          }}
          secure={passwordShow}
          icon={<EyeIcon />}
          handleIconPress={() => setPasswordShow(!passwordShow)}
        />
        {!!generalDataError?.pass && (
          <ErrorMessage
            message={generalDataError?.pass}
            errorStyle={{marginLeft: moderateScaleVertical(10)}}
          />
        )}
        <CustomIconInput
          placeholder={'Confirm Password'}
          isError={!!generalDataError?.confPass}
          value={generalData.confPass}
          onChangeText={(val: any) => {
            if (generalData?.confPass) {
              setGeneralDataError({...generalDataError, confPass: ''});
            }
            setGeneralData({...generalData, confPass: val});
          }}
          secure={confirmPasswordShow}
          icon={<EyeIcon />}
          handleIconPress={() => setConfirmPasswordShow(!confirmPasswordShow)}
        />
        {!!generalDataError?.confPass && (
          <ErrorMessage
            message={generalDataError?.confPass}
            errorStyle={{marginLeft: moderateScaleVertical(10)}}
          />
        )}
      </View>
    );
  }

  function instructorSignIn() {
    return (
      <View>
        <CustomTextInput
          placeholder={'First Name'}
          value={universityData.firstName}
          isError={!!universityDataError?.firstName}
          onChangeText={(val: any) => {
            if (universityDataError?.firstName) {
              setUniversityDataError({...universityDataError, firstName: ''});
            }
            setUniversityData({...universityData, firstName: val});
          }}
        />

        {!!universityDataError?.firstName && (
          <ErrorMessage
            message={universityDataError?.firstName}
            errorStyle={{marginLeft: moderateScaleVertical(10)}}
          />
        )}
        <CustomTextInput
          placeholder={'Last Name'}
          value={universityData.lastName}
          isError={!!universityDataError?.lastName}
          onChangeText={(val: any) => {
            if (universityDataError?.lastName) {
              setUniversityDataError({...universityDataError, lastName: ''});
            }
            setUniversityData({...universityData, lastName: val});
          }}
        />
        {!!universityDataError?.lastName && (
          <ErrorMessage
            message={universityDataError?.lastName}
            errorStyle={{marginLeft: moderateScaleVertical(10)}}
          />
        )}

        {!!uniSuccess &&
          !!uniData?.data?.length  && (
            <>
              <CustomNativeDropDown
                data={finalSchoolData?.uniData?.data}
                placeholder={{label: 'Select University', value: null}}
                handleChange={value => {
                  if (universityDataError?.university) {
                    setUniversityDataError({
                      ...universityDataError,
                      university: '',
                    });
                  }
                  setUniversityData({...universityData, university: value});
                }}
              />
            </>
          )}
        {!!universityDataError?.university && (
          <ErrorMessage
            message={universityDataError?.university}
            errorStyle={{marginLeft: moderateScaleVertical(10)}}
          />
        )}

        {!!universityData?.university && finalSchoolData?.uniDeptData?.data?.length>0  && (
          <>
            <CustomNativeDropDown
              data={finalSchoolData?.uniDeptData?.data}
              placeholder={{label: 'Select University Department', value: null}}
              handleChange={value => {
                if (universityDataError?.universityDept) {
                  setUniversityDataError({
                    ...universityDataError,
                    university: '',
                  });
                }
                setUniversityData({...universityData, universityDept: value});
              }}
            />
          </>
        )}
        {!!universityDataError?.universityDept && (
          <ErrorMessage
            message={universityDataError?.universityDept}
            errorStyle={{marginLeft: moderateScaleVertical(10)}}
          />
        )}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width:"100%"
          }}>
          <View
            style={{
              borderRadius: moderateScale(24),
              padding: moderateScale(12),
              borderWidth: 0.5,
              justifyContent:"center",
              alignItems:"center",
              borderColor: colors.blackOpacity25,
              flexDirection:"row",


            }}>
            <CountryPicker
              // visible
              onSelect={value => {
                setUniversityData({
                  ...universityData,
                  countryCode: value?.cca2,
                  countryCodeNumber: value?.callingCode[0],
                });
              }}
              withCallingCode
              withFilter
              countryCode={universityData?.countryCode as any}
            />
            <Text style={{fontFamily:fontFamily.Montserrat_Medium,color:colors.blackOpacity80,fontSize:textScale(12)}}>+{universityData?.countryCodeNumber}</Text>
          </View>

          <CustomTextInput
            placeholder={'Mobile Number'}
            keyboardType='numeric'
            value={universityData.mobileNumber}
            containerStyle={{flex:1,marginLeft:moderateScale(10)}}
            isError={!!universityDataError?.mobileNumber}
            onChangeText={(val: any) => {
              if (universityDataError?.mobileNumber) {
                setUniversityDataError({...universityDataError, mobileNumber: ''});
              }
              const cleanedInput = val.replace(/[^0-9]/g, '');
              setUniversityData({...universityData, mobileNumber: cleanedInput});
            }}
          />
        </View>

        {!!universityDataError?.mobileNumber && (
          <ErrorMessage
            message={universityDataError?.mobileNumber}
            errorStyle={{marginLeft: moderateScaleVertical(10)}}
          />
        )}
        {/* <CustomTextInput
          placeholder={'Referred By'}
          value={universityData.referredBy}
          onChangeText={(val: any) => {
            setUniversityData({...universityData, referredBy: val});
          }}
        /> */}

        <CustomIconInput
          placeholder={'Password'}
          value={universityData.pass}
          isError={!!universityDataError?.pass}
          onChangeText={(val: any) => {
            if (universityDataError?.pass) {
              setUniversityDataError({...universityDataError, pass: ''});
            }
            setUniversityData({...universityData, pass: val});
          }}
          secure={passwordShow}
          icon={<EyeIcon />}
          handleIconPress={() => setPasswordShow(!passwordShow)}
        />
        {!!universityDataError?.pass && (
          <ErrorMessage
            message={universityDataError?.pass}
            errorStyle={{marginLeft: moderateScaleVertical(10)}}
          />
        )}
        <CustomIconInput
          placeholder={'Confirm Password'}
          isError={!!universityDataError?.confPass}
          value={universityData.confPass}
          onChangeText={(val: any) => {
            if (universityDataError?.confPass) {
              setUniversityDataError({...universityDataError, confPass: ''});
            }
            setUniversityData({...universityData, confPass: val});
          }}
          secure={confirmPasswordShow}
          icon={<EyeIcon />}
          handleIconPress={() => setConfirmPasswordShow(!confirmPasswordShow)}
        />
        {!!universityDataError?.confPass && (
          <ErrorMessage
            message={universityDataError?.confPass}
            errorStyle={{marginLeft: moderateScaleVertical(10)}}
          />
        )}
      </View>
    );
  }

  function handleNext() {
    let payload: any = {
      first_name: '',
      last_name: '',
      mobile: '',
      password: '',
      country_code: '',
      referred_by: '',

      student_type: 0, // condition

      school_id: '',
      school_class: '',

      university_id: '',
      university_dep_id: '',

      general_student_status: '',
      training_field: '',

      training_program: '', //opt
      school_type: '', // opt
    };

    switch (mainIndex) {

      // Case for Handling School SignUp. Use it when enable school SignUp
      // case 0: {
      //   let {
      //     firstName,
      //     lastName,
      //     mobileNumber,
      //     // referredBy,
      //     pass,
      //     confPass,

      //     schoolType,
      //     // grade,
      //     countryCodeNumber,
      //     // school,
      //   } = studentData;

      //   function setValidationError(fieldName: string, errorMessage: string) {
      //     setStudentDataError(prevError => ({
      //       ...prevError,
      //       [fieldName]: errorMessage,
      //     }));
      //   }

      //   if (!firstName) {
      //     setStudentDataError(prevError => ({
      //       ...prevError,
      //       firstName: validationErrorMessage.firstNameError,
      //     }));
      //     return;
      //   }


      //   if((/[^a-zA-Z0-9]/).test(firstName)){
      //     setStudentDataError(prevError => ({
      //       ...prevError,
      //       firstName: validationErrorMessage.nameError,
      //     }));
      //     return;
      //   }

      //   if (!lastName) {
      //     setStudentDataError(prevError => ({
      //       ...prevError,
      //       lastName: validationErrorMessage.lastNameError,
      //     }));
      //     return;
      //   }

      //   if((/[^a-zA-Z0-9]/).test(lastName)){
      //     setStudentDataError(prevError => ({
      //       ...prevError,
      //       lastName: validationErrorMessage.nameError,
      //     }));
      //     return;
      //   }

      //   if (!mobileNumber) {
      //     setStudentDataError(prevError => ({
      //       ...prevError,
      //       mobileNumber: validationErrorMessage.phoneError,
      //     }));
      //     return;
      //   }

      //   if (!isNumeric(mobileNumber)) {
      //     setStudentDataError(prevError => ({
      //       ...prevError,
      //       mobileNumber: validationErrorMessage.phoneNumberWrong,
      //     }));
      //     return;
      //   }

      //   // if (!school) {
      //   //   setStudentDataError(prevError => ({
      //   //     ...prevError,
      //   //     school: validationErrorMessage.schoolError,
      //   //   }));
      //   //   return;
      //   // }

      //   // if (!grade) {
      //   //   setStudentDataError(prevError => ({
      //   //     ...prevError,
      //   //     grade: validationErrorMessage.schoolGrade,
      //   //   }));
      //   //   return;
      //   // }

      //   if (!pass) {
      //     setStudentDataError(prevError => ({
      //       ...prevError,
      //       pass: validationErrorMessage.passwordError,
      //     }));
      //     return;
      //   }

      //   if (!validatePassword(pass)) {
      //     setStudentDataError(prevError => ({
      //       ...prevError,
      //       pass: validationErrorMessage.passwordRuleError,
      //     }));
      //     return;
      //   }

      //   if (!confPass) {
      //     setStudentDataError(prevError => ({
      //       ...prevError,
      //       confPass: validationErrorMessage.confPasswordError,
      //     }));
      //     return;
      //   }

      //   if (pass !== confPass) {
      //     setStudentDataError(prevError => ({
      //       ...prevError,
      //       confPass: validationErrorMessage.validateConfirmError,
      //     }));
      //     return;
      //   }

      //   payload = {
      //     first_name: firstName,
      //     last_name: lastName,
      //     mobile: mobileNumber,
      //     country_code: countryCodeNumber,
      //     // referred_by: referredBy,
      //     password: pass,
      //     student_type: mainIndex + 1,
      //     // school_id: school,
      //     // school_class: grade,
      //   };
      //   break;
      // }
      case 2: {
        let {
          firstName,
          lastName,
          mobileNumber,
          // referredBy,
          pass,
          confPass,
          countryCodeNumber,
          university,
          universityDept,
        } = universityData;

        function setValidationError(fieldName: string, errorMessage: string) {
          setUniversityDataError(prevError => ({
            ...prevError,
            [fieldName]: errorMessage,
          }));
        }

        if (!firstName) {
          setUniversityDataError(prevError => ({
            ...prevError,
            firstName: validationErrorMessage.firstNameError,
          }));
          return;
        }

        if((/[^a-zA-Z0-9]/).test(firstName)){
          setUniversityDataError(prevError => ({
            ...prevError,
            firstName: validationErrorMessage.nameError,
          }));
          return;
        }

        if (!lastName) {
          setUniversityDataError(prevError => ({
            ...prevError,
            lastName: validationErrorMessage.lastNameError,
          }));
          return;
        }

        if((/[^a-zA-Z0-9]/).test(lastName)){
          setUniversityDataError(prevError => ({
            ...prevError,
            lastName: validationErrorMessage.nameError,
          }));
          return;
        }



        if (!mobileNumber) {
          setUniversityDataError(prevError => ({
            ...prevError,
            mobileNumber: validationErrorMessage.phoneError,
          }));
          return;
        }

        if (!university) {
          setUniversityDataError(prevError => ({
            ...prevError,
            university: validationErrorMessage.uniError,
          }));
          return;
        }

        if (!universityDept) {
          setUniversityDataError(prevError => ({
            ...prevError,
            universityDept: validationErrorMessage.uniDepError,
          }));
          return;
        }

        if (!pass) {
          setUniversityDataError(prevError => ({
            ...prevError,
            pass: validationErrorMessage.passwordError,
          }));
          return;
        }

        if (!validatePassword(pass)) {
          setUniversityDataError(prevError => ({
            ...prevError,
            pass: validationErrorMessage.passwordRuleError,
          }));
          return;
        }

        if (!confPass) {
          setUniversityDataError(prevError => ({
            ...prevError,
            confPass: validationErrorMessage.confPasswordError,
          }));
          return;
        }

        if (pass !== confPass) {
          setUniversityDataError(prevError => ({
            ...prevError,
            confPass: validationErrorMessage.validateConfirmError,
          }));
          return;
        }

        payload = {
          first_name: firstName,
          last_name: lastName,
          mobile: mobileNumber,
          country_code: countryCodeNumber,
          // referred_by: referredBy,
          password: pass,
          student_type: mainIndex + 1,
          university_id: university,
          university_dep_id: universityDept,
        };
        break;
      }

      // Case for General Sign Up
      // case 2: {
      //   let {
      //     firstName,
      //     lastName,
      //     mobileNumber,
      //     // referredBy,
      //     pass,
      //     confPass,
      //     training,
      //     trainingFieldType,
      //     countryCodeNumber,
      //   } = generalData;

      //   function setValidationError(fieldName: string, errorMessage: string) {
      //     setGeneralDataError(prevError => ({
      //       ...prevError,
      //       [fieldName]: errorMessage,
      //     }));
      //   }

      //   if (!firstName) {
      //     setGeneralDataError(prevError => ({
      //       ...prevError,
      //       firstName: validationErrorMessage.firstNameError,
      //     }));
      //     return;
      //   }

      //   if((/[^a-zA-Z0-9]/).test(firstName)){
      //     setGeneralDataError(prevError => ({
      //       ...prevError,
      //       firstName: validationErrorMessage.nameError,
      //     }));
      //     return;
      //   }


      //   if (!lastName) {
      //     setGeneralDataError(prevError => ({
      //       ...prevError,
      //       lastName: validationErrorMessage.lastNameError,
      //     }));
      //     return;
      //   }


      //   if((/[^a-zA-Z0-9]/).test(lastName)){
      //     setGeneralDataError(prevError => ({
      //       ...prevError,
      //       lastName: validationErrorMessage.nameError,
      //     }));
      //     return;
      //   }

      //   if (!mobileNumber) {
      //     setGeneralDataError(prevError => ({
      //       ...prevError,
      //       mobileNumber: validationErrorMessage.phoneError,
      //     }));
      //     return;
      //   }

      //   if (!training) {
      //     setGeneralDataError(prevError => ({
      //       ...prevError,
      //       training: validationErrorMessage.trainingStatusError,
      //     }));
      //     return;
      //   }

      //   if (!trainingFieldType) {
      //     setGeneralDataError(prevError => ({
      //       ...prevError,
      //       trainingFieldType: validationErrorMessage.trainingFieldError,
      //     }));
      //     return;
      //   }

      //   if (!pass) {
      //     setGeneralDataError(prevError => ({
      //       ...prevError,
      //       pass: validationErrorMessage.passwordError,
      //     }));
      //     return;
      //   }

      //   if (!validatePassword(pass)) {
      //     setGeneralDataError(prevError => ({
      //       ...prevError,
      //       pass: validationErrorMessage.passwordRuleError,
      //     }));
      //     return;
      //   }

      //   if (!confPass) {
      //     setGeneralDataError(prevError => ({
      //       ...prevError,
      //       confPass: validationErrorMessage.confPasswordError,
      //     }));
      //     return;
      //   }

      //   if (pass !== confPass) {
      //     setGeneralDataError(prevError => ({
      //       ...prevError,
      //       confPass: validationErrorMessage.validateConfirmError,
      //     }));
      //     return;
      //   }

      //   payload = {
      //     first_name: firstName,
      //     last_name: lastName,
      //     mobile: mobileNumber,
      //     country_code: countryCodeNumber,
      //     // referred_by: referredBy,
      //     password: pass,
      //     student_type: mainIndex + 1,
      //     general_student_status: training,
      //     training_field: trainingFieldType,
      //   };
      //   break;
      // }
  }
    if (payload) {
      dispatch(userPayload({userPayload: payload}));
      navigation.navigate(navigationStrings.OtpVerify, payload);
    }
  }

  return (
    <WrapperContainer>
      <CommonHeader onPressBack={() => navigation.goBack()} />
      <ScrollView>
        <View style={{marginTop: moderateScaleVertical(22)}}>
          <Text
            style={{
              fontSize: textScale(34),
              fontFamily: fontFamily.Montserrat_Bold,
              color: colors.theme,
            }}>
            Sign Up
          </Text>
          <Text
            style={{
              fontSize: textScale(14),
              fontFamily: fontFamily.Montserrat_Regular,
              color: colors.blackOpacity70,
              marginVertical: moderateScaleVertical(8),
            }}>
            Please enter your valid Email/ phone number...
          </Text>
        </View>


        {/* //todo: Commented Code for School and General Sign Up, Remove or add up School and General */}
        {/* <View
          style={{
            flexDirection: 'row',
            marginVertical: moderateScaleVertical(14),
          }}> */}
          {/* <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              flex: 0.33,
            }}
            onPress={() => setMainIndex(0)}>
            {mainIndex == 0 ? (
              <View style={styles.filledCircle}>
                <View style={styles.filledInnerCircle} />
              </View>
            ) : (
              <View
                style={{
                  ...styles.filledCircle,
                  borderColor: colors.blackOpacity40,
                }}>
                <View
                  style={{
                    ...styles.filledInnerCircle,
                    backgroundColor: colors.blackOpacity40,
                  }}
                />
              </View>
            )} */}
            {/* <Text
              style={{
                fontSize: textScale(14),
                fontFamily: fontFamily.Poppins_Medium,
                color: colors.black,
              }}>
              {mainStrings.school}
            </Text> */}
          {/* </TouchableOpacity> */}
          {/* <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              flex: 0.33,
            }}
            onPress={() => setMainIndex(1)}>
            {mainIndex == 1 ? (
              <View style={styles.filledCircle}>
                <View style={styles.filledInnerCircle} />
              </View>
            ) : (
              <View
                style={{
                  ...styles.filledCircle,
                  borderColor: colors.blackOpacity40,
                }}>
                <View
                  style={{
                    ...styles.filledInnerCircle,
                    backgroundColor: colors.blackOpacity40,
                  }}
                />
              </View>
            )} */}
            {/* <Text
              style={{
                fontSize: textScale(14),
                fontFamily: fontFamily.Poppins_Medium,
                color: colors.black,
              }}>
              University
            </Text>
          </TouchableOpacity> */}
          {/* <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              flex: 0.33,
            }}
            onPress={() => setMainIndex(2)}>
            {mainIndex == 2 ? (
              <View style={styles.filledCircle}>
                <View style={styles.filledInnerCircle} />
              </View>
            ) : (
              <View
                style={{
                  ...styles.filledCircle,
                  borderColor: colors.blackOpacity40,
                }}>
                <View
                  style={{
                    ...styles.filledInnerCircle,
                    backgroundColor: colors.blackOpacity40,
                  }}
                />
              </View>
            )}
            {/* <Text
              style={{
                fontSize: textScale(14),
                fontFamily: fontFamily.Poppins_Medium,
                color: colors.black,
              }}>
              General
            </Text> */}
          {/* </TouchableOpacity> */}
        {/* </View> */} 

        {/* Set the University , General and School Option toggle */}
        <KeyboardAwareScrollView>
          {instructorSignIn()}
        </KeyboardAwareScrollView>

        <View>
          <CommonButton
            btnText={'Get OTP'}
            mainViewStyle={{marginHorizontal: 0}}
            onPressBtn={handleNext}
          />
        </View>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            bottom: 10,
            position: 'relative',
            marginTop: verticalScale(10),
            marginBottom: verticalScale(20),
          }}>
          <Text style={[styles.smallText]}>Already have an account?</Text>
          {/* <TouchableOpacity
            onPress={() =>
              // navigation.navigate(navigationStrings.SignIn as never)
              navigation.navigate(navigationStrings.SignIn, {type: 'student'})
            }> */}
            <Text
              style={{
                fontFamily: fontFamily.KumbhSans_Bold,
                color: colors.black,
                fontSize: textScale(12),
              }}
              onPress={() =>
                // navigation.navigate(navigationStrings.SignIn as never)
                navigation.navigate(navigationStrings.SignIn, {type: 'student'})
              }>

              Sign In
            </Text>
          {/* </TouchableOpacity> */}
        </View>
      </ScrollView>
    </WrapperContainer>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  filledCircle: {
    backgroundColor: colors.white,
    borderWidth: 0.6,
    height: moderateScale(20),
    width: moderateScale(20),
    borderColor: colors.theme,
    borderRadius: 200,
    padding: moderateScale(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  filledInnerCircle: {
    backgroundColor: colors.theme,
    height: moderateScale(12),
    width: moderateScale(12),
    borderRadius: 200,
  },
  smallText: {
    fontSize: textScale(14),
    fontFamily: fontFamily.KumbhSans_Regular,
    alignSelf: 'center',
    color: colors.black,
    // marginBottom:verticalScale(30),
  },
});
