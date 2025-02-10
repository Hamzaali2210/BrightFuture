import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import React from 'react';
import colors from '../../styles/colors';
import fontFamily from '../../styles/fontFamily';



interface ErrorProps{
    message:string;
    errorStyle:ViewStyle;

}

const ErrorMessage:React.FC<ErrorProps> = ({message,errorStyle}) => {
  return <Text style={[styles.textContainer,errorStyle]}>{message}</Text>;
};

export default ErrorMessage;

const styles = StyleSheet.create({
    textContainer:{
        color:colors.red,
        fontFamily:fontFamily.Poppins_Regular,
        
    }
});
