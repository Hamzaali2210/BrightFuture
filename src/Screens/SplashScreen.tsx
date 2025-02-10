import React, {useEffect, useRef, useState} from 'react';
import {Animated, Image, Platform, StyleSheet, Text} from 'react-native';
import imagePath from '../constants/imagePath';
import {
  height,
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from '../styles/responsiveSize';
import colors from '../styles/colors';
import fontFamily from '../styles/fontFamily';
import FastImage from 'react-native-fast-image';
import DeviceInfo from 'react-native-device-info';

export default function WithSplashScreen({
  children,
  isAppReady,
}: {
  isAppReady: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      {isAppReady && children}

      <Splash isAppReady={isAppReady} />
    </>
  );
}

const LOADING_IMAGE = 'Loading image';
const FADE_IN_IMAGE = 'Fade in image';
const WAIT_FOR_APP_TO_BE_READY = 'Wait for app to be ready';
const FADE_OUT = 'Fade out';
const HIDDEN = 'Hidden';

export function Splash({isAppReady}: {isAppReady: boolean}) {
  const containerOpacity = useRef(new Animated.Value(1)).current;
  const imageOpacity = useRef(new Animated.Value(0)).current;

  const [state, setState] = useState<
    | typeof LOADING_IMAGE
    | typeof FADE_IN_IMAGE
    | typeof WAIT_FOR_APP_TO_BE_READY
    | typeof FADE_OUT
    | typeof HIDDEN
  >(LOADING_IMAGE);

  useEffect(() => {
    if (state === FADE_IN_IMAGE) {
      Animated.timing(imageOpacity, {
        toValue: 1,
        duration: 1000, // Fade in duration
        useNativeDriver: true,
      }).start(() => {
        setState(WAIT_FOR_APP_TO_BE_READY);
      });
    }
  }, [imageOpacity, state]);

  useEffect(() => {
    if (state === WAIT_FOR_APP_TO_BE_READY) {
      if (isAppReady) {
        setState(FADE_OUT);
      }
    }
  }, [isAppReady, state]);

  useEffect(() => {
    if (state === FADE_OUT) {
      Animated.timing(containerOpacity, {
        toValue: 0,
        duration: 500, // Fade out duration
        delay: 500, // Minimum time the logo will stay visible
        useNativeDriver: true,
      }).start(() => {
        setState(HIDDEN);
      });
    }
  }, [containerOpacity, state]);

  if (state === HIDDEN) return null;

  return (
    <Animated.View
      collapsable={false}
      style={[style.container, {opacity: containerOpacity}]}>
      {/* <Animated.Image
        // source={Platform.OS==="ios"?imagePath.splashNewGif:imagePath.logoBig}
        source={Platform.OS==="ios"?imagePath.splashNewGif:imagePath.splashNewGif}
        fadeDuration={0}
        onLoad={() => {
          setState(FADE_IN_IMAGE);
        }}
        style={[
          style.image,
          // {
          //   opacity: imageOpacity,
          //   height: Platform.OS === 'ios' ? height : moderateScaleVertical(200),
          //   width: Platform.OS === 'ios' ? width - 10 : moderateScale(200),
          // },
        ]}
        resizeMode="cover"
      /> */}
       <FastImage
        // source={Platform.OS==="ios"?imagePath.splashNewGif:imagePath.logoBig}
        // fadeDuration={0}
      
        // source={Platform.OS==="android"?imagePath.splashNewGifFast:imagePath.splashNewGif}
        source={DeviceInfo.isTablet()?imagePath.splashNewGifTab:imagePath.splashNewGifFast}
        onLoad={() => {
          setState(FADE_IN_IMAGE);
        }}
        style={[
          style.image,
          // {
          //   opacity: imageOpacity,
          //   height: Platform.OS === 'ios' ? height : moderateScaleVertical(200),
          //   width: Platform.OS === 'ios' ? width - 10 : moderateScale(200),
          // },
        ]}
        resizeMode="cover"
      />
      {/* {Platform.OS==="android"  &&<Text style={{marginTop:moderateScaleVertical(100),color:colors.white,width:"60%",fontSize:textScale(24),textAlign:"center",fontFamily:fontFamily.Poppins_Bold}}>Bright Future</Text>} */}
    </Animated.View>
  );
}

const style = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#094E85',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: width - 10,
    height: height,
  },
});
