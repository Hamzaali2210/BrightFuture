import { StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import imagePath from '../../../constants/imagePath'
import { moderateScale, moderateScaleVertical, textScale } from '../../../styles/responsiveSize'
import { HeaderCardInterface } from '../../../types/componentInterface'
import fontFamily from '../../../styles/fontFamily'
import colors from '../../../styles/colors'
import { useNavigation } from '@react-navigation/native'


const HeaderCard:React.FC<HeaderCardInterface> = ({title,right,rightComponent}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerStyle}>
      <TouchableOpacity style={styles.imgContainer} onPress={()=>navigation.goBack()}>
        <Image source={imagePath.btnBig} resizeMode='contain' style={{width:"100%",height:"100%"}}/>
      </TouchableOpacity>
      <View style={styles.txtContainer}>
        <Text style={styles.txt}>{title}</Text>
      </View>
      <View>
        {right&&rightComponent?rightComponent():null}
      </View>
    </View>
  )
}

export default HeaderCard

const styles = StyleSheet.create({
    headerStyle:{
        flexDirection:"row",
        alignItems:"center"
    },
    imgContainer:{
        width:moderateScaleVertical(52),
        height:moderateScaleVertical(52),
        overflow:"hidden",

    },
    txtContainer:{
        flex:1,
       
        justifyContent:"center",
        alignItems:"center"
    },
    txt:{
        fontFamily:fontFamily.Poppins_SemiBold,
        fontSize: moderateScaleVertical(20),
        color:colors.black,
    }
})