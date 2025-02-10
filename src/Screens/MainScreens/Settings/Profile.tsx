

import {
  StyleSheet,
  Text,
  View,
  Animated,
  ScrollView,
  Image,
} from 'react-native';
import React, {useRef} from 'react';
import {moderateScale} from '../../../styles/responsiveSize';
import colors from '../../../styles/colors';
import ProfileContainer from '../../../Components/Screens/Settings/ProfileContainer';
import { useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import useGetData from '../../../hooks/useGetData';
import { endpoints } from '../../../utils/endpoints';
import { IMAGE_API_URL } from '../../../utils/urls';

const H_MAX_HEIGHT = 350;
const H_MIN_HEIGHT = 100;
const H_SCROLL_DISTANCE = H_MAX_HEIGHT - H_MIN_HEIGHT;
function Profile() {
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const headerScrollHeight = scrollOffsetY.interpolate({
    inputRange: [0, H_SCROLL_DISTANCE],
    outputRange: [H_MAX_HEIGHT, H_MIN_HEIGHT],
    extrapolate: 'clamp',
  });
  const profile = useSelector((state:any)=>state?.auth?.userPayload);



  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: scrollOffsetY } } },
        ])}
        scrollEventThrottle={16}
      >
        <View
          style={{
            paddingTop: H_MAX_HEIGHT,
            position: 'relative',
            zIndex: 900,
            borderTopLeftRadius: moderateScale(18),
            borderTopRightRadius: moderateScale(20),
          }}
        >
          <ProfileContainer />
        </View>
      </ScrollView>

      <Animated.View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: headerScrollHeight,
          width: '100%',
          overflow: 'hidden',
          zIndex: -1,

          // STYLE

          borderTopLeftRadius: moderateScale(30),
          borderTopRightRadius: moderateScale(30),
        }}
      >
        <FastImage
          source={{
            uri: `${IMAGE_API_URL}${profile?.avatar}` || profile?.avatar,
          }}
          style={{ flex: 1, overflow: 'hidden' }}
          resizeMode="cover"
        />
      </Animated.View>
    </View>
  );
}

export default Profile;

const styles = StyleSheet.create({});
