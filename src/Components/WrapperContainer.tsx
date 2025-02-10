import React, {FC, ReactNode} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import colors from '../styles/colors';
import {moderateScale} from '../styles/responsiveSize';

interface wrapperContainerProps {
  children?: ReactNode;
  statusBarAvailable?: boolean;
  isSafeAreaAvailable?: boolean;
  onlyScrollViewAvailable?: boolean;
  scrollViewBouncesEnable?: boolean;
  paddingAvailable?: boolean;
  mainViewStyle?: object;
  refreshControl?: any;
  contentContainerStyle?: object;
  stickyHeaderIndices?: any;
  barStyle?: any;
}

const WrapperContainer: FC<wrapperContainerProps> = ({
  children,
  statusBarAvailable = true,
  isSafeAreaAvailable = true,
  onlyScrollViewAvailable = false,
  scrollViewBouncesEnable = false,
  paddingAvailable = true,
  mainViewStyle,
  refreshControl,
  contentContainerStyle,
  stickyHeaderIndices,
  barStyle = 'light-content',
}) => {
  function WithOnlyScrollView() {
    return (
      <ScrollView
        keyboardShouldPersistTaps={'always'}
        bounces={scrollViewBouncesEnable}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: moderateScale(60),
          flexGrow: 1,
          ...contentContainerStyle,
        }}
        refreshControl={refreshControl}
        stickyHeaderIndices={stickyHeaderIndices ? [0] : undefined}>
        {children}
      </ScrollView>
    );
  }

  return (
    <View
      style={{
        ...styles.container,
        paddingHorizontal: paddingAvailable ? moderateScale(16) : 0,
        backgroundColor: colors.white,
        ...barStyle,
        ...mainViewStyle,
      }}>
      {statusBarAvailable ? (
        <StatusBar
          animated={true}
          backgroundColor={isSafeAreaAvailable ? colors.black : colors.black}
          barStyle={!isSafeAreaAvailable ? barStyle : barStyle}
          showHideTransition={'none'}
          hidden={false}
        />
      ) : (
        <></>
      )}
      {isSafeAreaAvailable ? <SafeAreaView /> : <></>}
      {onlyScrollViewAvailable ? WithOnlyScrollView() : children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default React.memo(WrapperContainer);
