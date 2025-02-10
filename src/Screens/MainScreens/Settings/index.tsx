import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import colors from '../../../styles/colors';

import commonStyles from '../../../styles/commonStyles';
import PersonDetail from '../../../Components/Screens/Settings/PersonDetail';
import WalletContainer from '../../../Components/Screens/Settings/WalletContainer';

import ContainerList from '../../../Components/Screens/Settings/ContainerList';
import useGetData from '../../../hooks/useGetData';
import {endpoints} from '../../../utils/endpoints';
import {useDispatch} from 'react-redux';
import {IsSignIn} from '../../../redux/slice/authSlice';
import Newhsl from '../../Newhsl';

function Setting() {
  // return <View>
  //     <Newhsl videoId={"7e7f671c-70e1-4b4f-9746-5a3a7a2cd316"} orientation={undefined}/>
  // </View>
  return (
    <ScrollView
      contentContainerStyle={[styles.container, commonStyles.spacingCommon]}>
      <PersonDetail />
    </ScrollView>
  );
}

export default Setting;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
});
