import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { moderateScale, textScale } from '../../styles/responsiveSize'
import fontFamily from '../../styles/fontFamily'
import colors from '../../styles/colors'
import CustomTextInput from '../../Components/CustomTextInput'
import commonStyles from '../../styles/commonStyles'
import { SafeAreaView } from 'react-native'
import CommonButton from '../../Components/CommonButton'
import { useNavigation, useRoute } from '@react-navigation/native'
import navigationStrings from '../../constants/navigationStrings'
import { showError, showSuccess } from '../../utils/helperFunctions'
import usePostData from '../../hooks/usePostData'
import { endpoints } from '../../utils/endpoints'
import { useDispatch } from 'react-redux'
import { userNumber, userPayload } from '../../redux/slice/authSlice'
import CountryPicker from 'react-native-country-picker-modal';


const ForgotPassword = () => {
    const navigation = useNavigation<any>();
    const [number,setNumber]=useState();
    const [countryData,setCountryData]=useState({
        countryCode: 'KW',
        countryCodeNumber: "965",
    })
    const route= useRoute()
    const dispatch=useDispatch()

    const {mutate:sendOtp,isSuccess,data,isPending,isError,error}=usePostData(endpoints.FORGOT_PASSWORD,['FORGOT_PASSWORD']);

    useEffect(()=>{
        if(isSuccess){
            showSuccess(data?.message)
            dispatch(userNumber({mobileNumber:number}))
            dispatch(userPayload({userPayload:{}}))
            
            navigation.navigate(navigationStrings.OtpVerify,{forgotMobile:number,countryCode:countryData.countryCodeNumber})

        }else if(isError){
            showError(error?.message)
        }
    },[isSuccess,isError])

    const handlePress=()=>{
        if(!number){
                showError("Please add your phone number");
        }else {
            const payload={
                mobile:number,
                country_code:countryData.countryCodeNumber,
            }
            sendOtp(payload)
        }
    //    navigation.navigate(navigationStrings.OtpVerify,{mobileNumber:})
    }
  return (
    <SafeAreaView style={[styles.container,commonStyles.spacingCommon]}>

        <View style={[styles.container,commonStyles.spacingCommon,{marginTop:moderateScale(60)}]}>
        <Text
            style={{
              fontSize: textScale(24),
              fontFamily: fontFamily.Montserrat_Bold,
              color: colors.theme,
              marginBottom:moderateScale(12)
            }}>
            Forgot Password
          </Text>

          <View style={{flexDirection:"row",alignItems:"center"}}>
          <View
            style={{
              borderRadius: moderateScale(18),
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
                setCountryData({
                  ...countryData,
                  countryCode: value?.cca2,
                  countryCodeNumber: value?.callingCode[0],
                });
              }}
              withCallingCode
              withFilter
              countryCode={countryData?.countryCode as any}
            />
            <Text style={{fontFamily:fontFamily.Montserrat_Medium,color:colors.blackOpacity80,fontSize:textScale(12)}}>+{countryData?.countryCodeNumber}</Text>
          </View>

          <CustomTextInput
            placeholder={'Phone Number'}
            value={number}
            keyboardType='numeric'
            containerStyle={{flex:1,marginLeft:moderateScale(10)}}
            
            onChangeText={(val: any) => {
                const cleanedInput = val.replace(/[^0-9]/g, '');
                setNumber(cleanedInput)
            }}
            key={1}
          />
          </View>

          
          <CommonButton btnText={isPending?'Sending':'Get Otp'} mainViewStyle={{marginLeft:moderateScale(0)}} onPressBtn={handlePress}/>
        </View>
       
    </SafeAreaView>
  )
}

export default ForgotPassword

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
})