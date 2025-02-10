import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import WebView from 'react-native-autoheight-webview';
// import WebView from 'react-native-webview';

import colors from '../styles/colors';
import {useSelector} from 'react-redux';
import {moderateScale, moderateScaleVertical} from '../styles/responsiveSize';
import {constantpayload} from '../constants/mainstrings';
import Orientation from 'react-native-orientation-locker';
import DeviceInfo from 'react-native-device-info';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const Newhsl = ({videoId, orientation,isMaximum}) => {
  console.log(
    'there is the video coming in this and here we have in this and you have to be in this ',
    isMaximum
  );
  const {width, height} = useWindowDimensions();
  const [isInline, setIsInline] = useState(false);
  const [ori, setOri] = useState('portrait');
  const [isFullscreen, setIsFullscreen] = useState(false); // Fullscreen state
  const [loading, setLoading] = useState(true);
  let isTablet = DeviceInfo.isTablet();

  // const handleOrientationChange = () => {

  //   if (height >= width) {
  //     setOri('portrait');
  //   } else {
  //     setOri('landscape');
  //   }
  // };

  const toggleIsInline = () => {
    setIsInline(!isInline);
  };

  // useEffect(()=>{
  //   const subscription = Dimensions.addEventListener('change', handleOrientationChange);

  //   // Cleanup on unmount
  //   return () => {
  //     subscription?.remove();
  //   };
  // },[])

  // useFocusEffect(
  //   React.useCallback(() => {
  //     Orientation.lockToLandscape();
  //     return () => {
  //        Orientation.lockToPortrait();
  //     };
  //   }, [])
  // );

  const userRecording = useSelector(state => state?.tag?.userRecording);
  const webViewRef = useRef(null);

  return (
    <SafeAreaView
      style={{
        // height: height,
        position: 'relative',
        overflow: 'hidden',
        height: '100%',
        width: '100%',
        flex: 1,

        //  height:orientation!=="PORTRAIT"?height:'100%',
        // height:moderateScale(230),
        //  backgroundColor:"red",

        //  top:orientation!=="PORTRAIT"?0:width>768?"40%":0,
        //  width:  isTablet ? width : width<=height?width: width - 120,
        //  width:width
      }}>
      {loading && ( // Show loader if loading is true
        <ActivityIndicator
          size="large"
          color={colors.theme}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: [{translateX: -25}, {translateY: -25}],
          }}
        />
      )}
      {!!userRecording ? (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: width,
            height: '100%',
            overflow: 'hidden',
            opacity: 1,
            elevation: 100,
            zIndex: 1000,
          }}
        />
      ) : (
        <WebView
          key={isMaximum?"fullscreen":"nofullscreen"}
          ref={webViewRef}
          style={{
            height: '100%',
            width: '100%',
            // width:width>=height && !DeviceInfo.isTablet()?width-180:width,
            // left:width>=height && !DeviceInfo.isTablet()?"5%":0,
            // width: width,
            // justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            // backgroundColor:"black",
            // backgroundColor:"black",
            // borderBottomColor: colors.themeYellow,
            // borderBottomWidth: moderateScaleVertical(5),
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.3,
            shadowRadius: 6.3,
            elevation: 13,
          }}
          bounces={false}
          overScrollMode="never"
          onError={() => {}}
          allowsFullscreenVideo={true}
          scrollEnabled={false}

          allowsInlineMediaPlayback={isMaximum}
          automaticallyAdjustContentInsets={false}
          onLoadStart={() => setLoading(true)} // Start loader when page starts loading
          onLoadEnd={() => setLoading(false)} // Stop loader when page finishes loading
//           source={{
//             html: `
          
//           <html>
// <head>
//   <title>{page_title}</title>
// </head>
// <body>

//   <iframe src="https://player.vimeo.com/video/347119375" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

//   <script src="https://player.vimeo.com/api/player.js"></script>
//   <script>
//     <!- Your Vimeo SDK player script goes here ->
//   </script>

// </body>
// </html>
//           `,
//           }}
                source={{
                  html: `
             <html>
             <head>
             </head>
             <script type="text/javascript" src="//cdn.embed.ly/player-0.1.0.min.js"></script>
             <script type="text/javascript" src="//assets.mediadelivery.net/playerjs/player-0.1.0.min.js"></script>
             <script>
             </script>
              <body style="overflow:hidden;width:100%">
                <div style="position: relative; padding-top: 56.5%;background-color:black">
                  <iframe src="https://iframe.mediadelivery.net/embed/${constantpayload.LIB_ID}/${videoId}?autoplay=true"
                    playsinline
                   loading="lazy" style="border: none; position: absolute; top: 0;background-color:black ;height: 100%; width: 100%; border-bottom:5px solid ${colors.themeYellow}"
                   allow="accelerometer; gyroscope; encrypted-media;" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true">
                  </iframe>
                </div>
              </body>

             </html>
           `,
                }}
        />
      )}
    </SafeAreaView>
  );
};

export default Newhsl;

const styles = StyleSheet.create({});
