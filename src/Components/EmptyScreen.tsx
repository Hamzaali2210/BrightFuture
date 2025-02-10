import { Image, ImageSourcePropType, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import { height, moderateScale, moderateScaleVertical, textScale, width } from '../styles/responsiveSize'
import CommonButton from './CommonButton'
import { mainStrings } from '../constants/mainstrings'
import navigationStrings from '../constants/navigationStrings'
import colors from '../styles/colors'
import fontFamily from '../styles/fontFamily'
import imagePath from '../constants/imagePath'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'


interface EmptyScreenProps{
    image:ImageSourcePropType;
    heading:string;
    description:string;
    btnEnabled?:boolean;
    handlePress?:()=>void;
    style?:ViewStyle
}



const EmptyScreen:React.FC<EmptyScreenProps> = ({image,heading,description,btnEnabled,handlePress,style}) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
                <View
                  style={[{
                    height: height - 140,
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: moderateScale(18),
                    position: 'relative',
                  },style]}>
                  <Image
                    
                    resizeMode="contain"
                    source={image}
                  />
                  <Text
                    style={{
                      fontFamily: fontFamily.Poppins_Medium,
                      color: colors.black,
                      fontSize:  width>350?textScale(12) :textScale(18),
                    }}>
                    {heading}
                  </Text>
                  <Text
                    style={{
                      fontFamily: fontFamily.Poppins_Light,
                      color: colors.black,
                      textAlign: 'center',
                      fontSize: width>350?textScale(10) : textScale(14),
                    }}>
                    {description}
                  </Text>
                {btnEnabled &&  <CommonButton
                    btnText={mainStrings.ContinueShopping}
                    // onPressBtn={() =>
                    //   navigation.navigate(navigationStrings.Courses)
                    // }
                    onPressBtn={handlePress}
                    mainViewStyle={{
                      marginHorizontal: moderateScale(0),
                      position: 'absolute',
                      left: '-50%',
                      top: moderateScaleVertical(160),
                    }}
                  />}
                </View>
  )
}

export default EmptyScreen

const styles = StyleSheet.create({})