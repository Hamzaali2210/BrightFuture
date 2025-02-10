import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import Orientation from 'react-native-orientation-locker';
import { Vimeo } from 'react-native-vimeo-iframe';
import HandleBackBtn from '../assets/images/Icons/backBtnBlack.svg';
import { moderateScale } from '../styles/responsiveSize';
function AddCourse() {
  const [fullScreen, setFullScreen] = useState(
    Orientation.getInitialOrientation(),
  );

  const [loading, setLoading] = useState(true);
  const {params}: any = useRoute();
  const navigation = useNavigation();

  useEffect(() => {}, []);

  const handlePlay = (data: any) => {
    if (Platform.OS === 'ios') {
      Orientation.getOrientation(orientation => {
        if (orientation === 'PORTRAIT') {
          Orientation.lockToLandscape();
        }
      });
    }
  };

  const handleFullScreen = (data: any) => {

    if (data?.orientation === 'portrait') {
      Orientation.lockToPortrait();
    } else if (data?.orientation === 'landscape') {
      Orientation.lockToLandscape();
    }
    // setFullScreen(!fullScreen);
  };

  const handlePause = (data: any) => {
    if (Platform.OS === 'ios') {
      Orientation.lockToPortrait();
      Orientation.getOrientation(orientation => {
        if (orientation === 'PORTRAIT') {
          Orientation.lockToPortrait();
        }
      });
    }
  };

  const handleSeeked = (data: any) => console.log('ended: ', data);
  const handleEnded = (data: any) => {
    setTimeout(() => {
      navigation.goBack();
    }, 500);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleWaiting = aa => {
  };

  const videoCallbacks = {
    timeupdate: (data: any) => {},
    durationchange: (data: any) => {},
    play: handlePlay,
    pause: handlePause,
    fullscreenchange: handleFullScreen,
    ended: handleEnded,
    seeked: handleSeeked,
    loadeddata: handleWaiting,
    controlschange: (data: any) => console.log('controlschange: ', data),
  };

  return (
    <View style={{flex: 1, position: 'relative'}}>
      <TouchableOpacity
        style={{marginTop: moderateScale(40), marginLeft: moderateScale(20)}}
        onPress={handleBack}>
        <HandleBackBtn />
      </TouchableOpacity>

      
        <Vimeo
          style={{position: 'relative'}}
          videoId={'6701902'}
          params="api=1&autoplay=0"
          // params="api=1&autoplay=0#t=1m2s"
          handlers={videoCallbacks}
         
          onLoad={() => {
            setLoading(false);
          }}
          containerStyle={{backgroundColor: 'black'}} 
        />
            
    </View>
  );
}

export default AddCourse;

const styles = StyleSheet.create({});
