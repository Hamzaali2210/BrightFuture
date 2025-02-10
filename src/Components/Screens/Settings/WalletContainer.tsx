import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import WalletIcon from '../../../assets/images/Icons/settingsIcon/walletBlackIcon.svg';
import {moderateScale, textScale, verticalScale} from '../../../styles/responsiveSize';
import colors from '../../../styles/colors';
import commonStyles from '../../../styles/commonStyles';
import Wallet from 'react-native-vector-icons/Fontisto'
import { useSelector } from 'react-redux';
import fontFamily from '../../../styles/fontFamily';
import useGetData from '../../../hooks/useGetData';
import { endpoints } from '../../../utils/endpoints';
import imagePath from '../../../constants/imagePath';
import DeviceInfo from 'react-native-device-info';
import { useIsFocused } from '@react-navigation/native';

function WalletContainer() {
  const focused=useIsFocused()
  const userData = useSelector((state: any) => state?.auth?.userPayload);
  console.log("userDatauserDatauserDatauserDatauserDatauserDatauserDatauserData", userData);
  const {data}:any=useGetData(endpoints.WALLET,['WALLET',focused])
  console.log("datadatadatadatadatadatadatadata",data);
  
  return (
    <View style={[styles.walletContainer, commonStyles.spacing]}>
      <Text style={[styles.walletContainerMainText,{color:colors.white,opacity:0.5}]}>Wallet Balance</Text>
      <View style={[styles.walletContainerBottom]}>
        <View style={[styles.walletIconMoneyContainer]}>
          <View style={[styles.walletIconContainer]}>
            <Wallet name='wallet' color={colors.white} size={moderateScale(20)}/>
          </View>
          <Text style={[styles.walletMoneyText,{color:colors.white}]}> {data?.wallet??0}KD</Text>
        </View>
       {false &&  <TouchableOpacity style={[styles.blueContainer]}>
          <Text style={[styles.walletButtonText]}>Withdraw</Text>
        </TouchableOpacity>}
      </View>
      <View style={styles.absolute}>
        <Image source={imagePath.wallteWhite} />
      </View>
    </View>
  );
}

export default WalletContainer;

const styles = StyleSheet.create({
  walletContainer: {
    backgroundColor: `${colors.theme}`,
    // borderWidth: moderateScale(2),
    // borderStyle: 'dotted',
    // borderColor: colors.themeDark,
    padding: moderateScale(14),
    gap: moderateScale(10),
    paddingHorizontal: moderateScale(16),
    borderRadius: moderateScale(12),
    marginVertical: verticalScale(14),
  },
  absolute:{
      position:"absolute",
      bottom:0,
      right:10,
      resizeMode:"cover",
  },
  walletContainerMainText: {
    fontFamily: 'Poppins-regular',
    fontSize:DeviceInfo.isTablet()?textScale(10): textScale(15),
    color: colors.dustyGray,
    marginLeft: moderateScale(10),
  },
  walletContainerBottom: {
    flexDirection: 'row',
    gap:moderateScale(20),
    marginLeft: moderateScale(10),
    alignItems: 'center',
  },
  walletIconMoneyContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems:"center",
   
  },
  walletIconContainer: {
    marginRight:moderateScale(6),
  },
  walletMoneyText: {
    fontFamily: 'Poppins-Bold',
    fontSize:DeviceInfo?.isTablet()?textScale(18) :textScale(24),
    color: colors.white,
  },
  walletButtonText: {
    fontFamily: fontFamily.Poppins_Medium,
    fontSize: textScale(16),
    color: colors.theme,
  },
  blueContainer:{
    backgroundColor:colors.white,
    alignItems:"center",
    justifyContent:"center",
    padding:moderateScale(8),
    paddingHorizontal:moderateScale(12),
    borderRadius:moderateScale(500),

  }
});
