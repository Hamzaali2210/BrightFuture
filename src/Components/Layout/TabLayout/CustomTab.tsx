import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';

import PagerView from 'react-native-pager-view';

import {
  moderateScale,
  moderateScaleVertical,
  scale,
  textScale,
} from '../../../styles/responsiveSize';

import {CustomTabProps} from '../../../types/uiType';
import colors from '../../../styles/colors';
import fontFamily from '../../../styles/fontFamily';
import DeviceInfo from 'react-native-device-info';

const CustomTab: React.FC<CustomTabProps> = ({
  children,
  tabTitle,
  tabStyle,
  customTabStyle,
  pagerViewStyle,
  highlightedColor,
  textStyle,
  pageCurrent,
  setPageCurrent,
}) => {
  const ref = useRef<any>(PagerView);

  const handlePageScroll = (e: any) => {
    if (pageCurrent != e.nativeEvent.position && setPageCurrent) {
      setPageCurrent(e.nativeEvent.position);
    }
  };

  function refPress(index: number) {
    ref.current.setPage(index);
  }
  return (
    <View style={[customTabStyle]}>
      <View
        style={{
          flexDirection: 'row',
          // marginTop: scale(50),
        }}>
        {tabTitle.map(item => (
          <TouchableOpacity
            onPress={() => {
              refPress(item.index as number);
            }}
            key={item.index}
            style={[
              styles.tabStyleInside,
              {
                // borderBottomColor:
                //   pageCurrent == item.index
                //     ? highlightedColor || colors.theme
                //     : 'transparent',
                // borderBottomWidth:moderateScaleVertical(4),
              },
              tabStyle,
            ]}>
            <View>
              <Text
                numberOfLines={1}
                style={[
                  styles.itemText,
                  {
                    fontFamily:
                      pageCurrent === item?.index
                        ? fontFamily.Poppins_Medium
                        : fontFamily.Poppins_Regular,
                    fontSize:
                      pageCurrent == item.index ? DeviceInfo.isTablet()?textScale(12):textScale(15) : DeviceInfo?.isTablet()?textScale(10):textScale(12),
                    color:
                      pageCurrent === item?.index ? colors.black : '#828283',
                  },
                  textStyle,
                ]}>
                {item.label}
              </Text>
              {pageCurrent == item.index && (
                <View
                  style={{
                    height: moderateScale(3),
                    borderRadius: moderateScale(120),
                    marginTop:2,
                    backgroundColor: highlightedColor,
                  }}
                />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <PagerView
        style={[styles.pagerView, pagerViewStyle]}
        initialPage={0}
        onPageScroll={handlePageScroll}
        ref={ref}>
        {children}
      </PagerView>
    </View>
  );
};

export default CustomTab;

const styles = StyleSheet.create({
  pagerView: {
    // flex: 2,
    // height:"100%",
    // backgroundColor:colors.red
  },
  pageStyle: {},

  tabStyleInside: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // borderBottomWidth: 4,
    paddingBottom: moderateScaleVertical(8),

    marginHorizontal: moderateScale(8),
  },
  itemText: {
    fontFamily: fontFamily.Poppins_Regular,
    fontSize: textScale(12),
    color: '#828283',
  },
});
