import { StyleSheet, Text, View } from 'react-native'
import React, { useDebugValue } from 'react'
import RNSecureStorage from 'rn-secure-storage';
import { mainStrings } from '../../../constants/mainstrings';
import fontFamily from '../../../styles/fontFamily';
import colors from '../../../styles/colors';
import { moderateScaleVertical, textScale } from '../../../styles/responsiveSize';
import commonStyles from '../../../styles/commonStyles';
import { useNavigation } from '@react-navigation/native';
import usePostData from '../../../hooks/usePostData';
import { endpoints } from '../../../utils/endpoints';
import { showError, showSuccess } from '../../../utils/helperFunctions';
import { useDispatch } from 'react-redux';
import { IsTempVar, userPayload } from '../../../redux/slice/authSlice';


const DeleteAccounts = () => {
  
   const navigation = useNavigation();
   const dispatch = useDispatch();
   const {mutate}=usePostData(endpoints.DELETE_ACCOUNT,['deleteAcc'],'post',async (data)=>{
    const token = await RNSecureStorage.getItem('token');
    if (token) {
          showSuccess("Account Deleted Successfully")
          dispatch(userPayload({}))
          dispatch(IsTempVar({tempVar: false}));
          await RNSecureStorage.removeItem('token');
    }
   },()=>{
            showError("Error While deleting your account Please try again Later")
   })
   const handleDelete = async ()=>{
            mutate({});
  }  
  return (
    <View style={[{flex:1},commonStyles.spacingCommon]}>
      <Text style={styles.headingContainer}>{mainStrings.deleteAccount}</Text>
      <View style={styles.rowContainer}>
        <Text style={styles.btnStyleText} onPress={()=>navigation.goBack()}>Cancel</Text>
        <Text style={[styles.btnStyleText,{color:colors.red}]} onPress={handleDelete}>Confirm</Text>
      </View>

    </View>
  )
}

export default DeleteAccounts

const styles = StyleSheet.create({
    headingContainer:{
      fontFamily:fontFamily.Poppins_Medium,
      color:colors.black,
      fontSize:textScale(16),
      marginVertical:moderateScaleVertical(12),

    },
    rowContainer:{
        flexDirection:"row",
        alignItems:"center",
    },
    btnStyleText:{
        fontFamily:fontFamily.Poppins_Regular,
        color:colors.black,
        fontSize:textScale(14),
        flex:1,
        textAlign:"center",

  
    }

})