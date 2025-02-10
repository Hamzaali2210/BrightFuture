import {
 Platform, StyleSheet, Text, View 
} from 'react-native';
import React, { useState } from 'react';
import CustomTab from '../../Components/Layout/TabLayout/CustomTab';
import { height, textScale, verticalScale } from '../../styles/responsiveSize';
import colors from '../../styles/colors';
import { TabType } from '../../types/uiType';
import AllPayments from '../../Components/Screens/Settings/Payments/AllPayments';
import commonStyles from '../../styles/commonStyles';

function Payments() {
  const [pageCurrent, setPageCurrent] = useState(0);

  const tabArray: Array<TabType> = [
    {
      index: 0,
      label: 'All',
    },
    {
      index: 1,
      label: 'Completed',
    },
    {
      index: 2,
      label: 'Upcoming',
    },
  ];
  return (
    <View>
      <CustomTab
        tabTitle={tabArray}
        pagerViewStyle={{ height: Platform.OS === 'ios' ? height - 180 : height }}
        highlightedColor={colors.themeYellow}
        pageCurrent={pageCurrent}
        setPageCurrent={setPageCurrent}
        tabStyle={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          // borderBottomWidth: 2,
          marginTop: verticalScale(12),
          paddingBottom: verticalScale(10),
        }}
        textStyle={{ fontSize: textScale(14) }}
      >
        <View key={1} style={[commonStyles.spacingCommon]}>
          <AllPayments paymentListType={"all"} />
        </View>
        <View key={2}>
        <AllPayments paymentListType={"completed"} />

        </View>
        <View key={3}>
        <AllPayments paymentListType={"pending"} />
        </View>
      </CustomTab>
    </View>
  );
}

export default Payments;

const styles = StyleSheet.create({});
