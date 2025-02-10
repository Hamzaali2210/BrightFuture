import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useEffect, useRef, useState} from 'react';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import Animated, {
  useSharedValue,
  withTiming,
  Easing,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { NavigationAction, useNavigation } from '@react-navigation/native';
import {
  height,
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from '../../styles/responsiveSize';
import imagePath from '../../constants/imagePath';
import CommonButton from '../../Components/CommonButton';
import colors from '../../styles/colors';
import fontFamily from '../../styles/fontFamily';
import navigationStrings from '../../constants/navigationStrings';
import DeviceInfo from 'react-native-device-info';

interface onBoardingScreenProps {
  navigation?: NavigationAction;
}

const OnBoarding: FC<onBoardingScreenProps> = () => {
  const navigation = useNavigation();
  const carouselRef = useRef<any>(null);
  let intervalId = useRef<NodeJS.Timeout | null>(null);
  const [mainIndex, setMainIndex] = useState<any>(0);
  const [onBoardingData, setOnBoardingData] = useState<Array<{image:string}>>([
    {image: imagePath.onBoardingPic},
    {image: imagePath.onBoardingPic2},
  ]);

  const fadeInOpacity = useSharedValue(0);

  useEffect(() => {
    fadeInOpacity.value = withTiming(1, {
      duration: 1500,
      easing: Easing.circle,
    });
  }, [mainIndex]);
  const startAutoPlay = () => {
   
    intervalId.current = setInterval(() => {
      if (carouselRef.current) {
        const nextIndex = (mainIndex + 1) % onBoardingData.length;
        carouselRef.current.snapToItem(nextIndex);
      }
    }, 3000);
  
 
};

  useEffect(()=>{
    startAutoPlay()

    return ()=>{
      clearInterval(intervalId.current)
    }
  },[mainIndex])


  

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: fadeInOpacity.value,
  }));

  

  function renderCarousal({item}: any) {
    return (
      <View style={{overflow: 'hidden', backgroundColor: colors.white,height:DeviceInfo.isTablet()?height/2+60:null}}>
        <View
          style={[
            styles.carousalView,
            {
              height:
                Platform.OS === 'android' ? moderateScaleVertical(450) : height<700?350:null,
            },
          ]}>
          <Image
            source={item?.image}
            style={{width: width, alignSelf: 'center',height:DeviceInfo.isTablet()?height/2+60:height/2.2}}
          />
        </View>
      </View>
    );
  }

  function pagination() {
    return (
      <Pagination
        dotsLength={2}
        autoPlay
        activeDotIndex={mainIndex}
        containerStyle={{
          marginTop: -moderateScale(10),
        }}
        dotStyle={styles.dotStyle}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.8}
        
      />
    );
  }
  return (
    <View style={{flex:1, backgroundColor: colors.white}}>
      <View>
        <Carousel
          ref={carouselRef}
          data={onBoardingData}
          renderItem={renderCarousal}
          sliderWidth={width}
          itemWidth={width}
          onSnapToItem={(index: any) => {
            setMainIndex(index);
          }}
        />
      </View>
      <View>{pagination()}</View>
      {mainIndex == 0 ? (
        <Animated.View style={[styles.mainTextView, animatedStyle]}>
          <Text style={styles.mainText}>
            Finding the
            <Text style={{color: colors.yellow}}>
              {' '}
              Perfect Class{' '}
            </Text>{' '}
            for you
          </Text>
        </Animated.View>
      ) : (
        <Animated.View style={[styles.mainTextView, animatedStyle]}>
          <Text style={styles.mainText}>
            Easy 
{' '}
<Text style={{color: colors.yellow}}>enrollment</Text> in all
{' '}
            <Text style={{color: colors.yellow}}>Professional</Text> Classes
          </Text>
        </Animated.View>
      )}

      <View style={styles.staticText}>
        <Text
          style={{
            ...styles.smallText,
            color: colors.blackOpacity40,
            textAlign: 'center',
          }}>
          Discover the things you want to learn and grow with them
        </Text>
        <CommonButton
          btnText="Create an account"
          onPressBtn={() => {
            navigation.navigate(navigationStrings.SignUp as never);
          }}
          mainViewStyle={{marginLeft: 0}}
        />
      </View>

      <View
        style={[
          styles.bottomView,
          {
            position: Platform.OS === 'ios' ? 'absolute' : undefined,
            bottom: moderateScaleVertical(20),
          },
        ]}>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom:moderateScale(20)
          }}>
          <Text style={styles.smallText}>Already have an account?</Text>
          {/* <TouchableOpacity
            onPress={() =>
              navigation.navigate(navigationStrings.SignIn as never)
            }> */}
            <Text
              style={{
                fontFamily: fontFamily.KumbhSans_Bold,
                color: colors.black,
                fontSize:DeviceInfo.isTablet()?20:textScale(12),
              }}
            
              onPress={() =>
                navigation.navigate(navigationStrings.SignIn as never)
              }
              >
              {' '}
              Sign In
            </Text>
          {/* </TouchableOpacity> */}
        </View>
      </View>
    </View>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  smallText: {
    fontSize: DeviceInfo.isTablet()?20:textScale(14),
    fontFamily: fontFamily.KumbhSans_Regular,
    alignSelf: 'center',
    alignItems: 'center',
    color: colors.black,
  },
  bottomView: {
    // flex: 1,
    backgroundColor: colors.white,
    // position:"absolute",
    // bottom:10,
    // position:"relative",
    // bottom:moderateScaleVertical(24),
    width: '100%',
    justifyContent: 'flex-end',
    // paddingVertical: moderateScaleVertical(30),
    paddingHorizontal: moderateScale(20),
  },
  staticText: {
    backgroundColor: colors.white,
    color: colors.black,
    paddingHorizontal: moderateScale(40),
    // alignItems:"center",
    width: '100%',
    paddingVertical: moderateScaleVertical(10),
  },
  mainText: {
    fontSize:DeviceInfo.isTablet()?40: textScale(24),
    fontFamily: fontFamily.Urbanist_ExtraBold,
    textAlign: 'center',
    color: colors.black,
  },
  mainTextView: {
    backgroundColor: colors.white,
    paddingHorizontal: moderateScale(50),
    color: colors.black,
  },
  carousalView: {
    borderBottomLeftRadius: moderateScale(400),
    borderBottomRightRadius: moderateScale(400),
    overflow: 'hidden',
    width: width * 2,
    // height:moderateScaleVertical(450),
    alignSelf: 'center',
    backgroundColor: colors.blackOpacity05,
  },
  dotStyle: {
    width: moderateScale(7),
    height: moderateScale(7),
    borderRadius: 5,
    backgroundColor: colors.themeYellow,
    marginHorizontal: -moderateScale(8),
  },
});
