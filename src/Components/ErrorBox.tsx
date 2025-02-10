import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import EmptyBox from '../assets/images/Icons/EmptyBox.svg';
import colors from '../styles/colors';
import fontFamily from '../styles/fontFamily';
import { moderateScale, moderateScaleVertical, textScale } from '../styles/responsiveSize';

interface ErrorBoxInterface {
  message?: string;
  
  extraComp ?: React.ReactNode
}

const ErrorBox: React.FC<ErrorBoxInterface> = ({message,extraComp}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <EmptyBox width={moderateScale(250)} height={moderateScale(250)} style={{marginVertical:moderateScaleVertical(20)}}/>
    {message ?  <Text
        style={{
          fontSize: textScale(24),
          fontFamily: fontFamily.Poppins_Medium,
          color: colors.themeDark,
        }}>
        {message}
      </Text> : 
      <>
      {extraComp}
      </>
      }
    </View>
  );
};

export default ErrorBox;

const styles = StyleSheet.create({});
