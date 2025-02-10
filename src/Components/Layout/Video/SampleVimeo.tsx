import {Platform, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import WebView from 'react-native-autoheight-webview';
import { width } from '../../../styles/responsiveSize';
import colors from '../../../styles/colors';
import { useSelector } from 'react-redux';


interface SampleVimeoInterface{
    videoId:string
}


const SampleVimeo:React.FC<SampleVimeoInterface> = ({videoId}) => {

  const userRecording=useSelector((state)=>state?.tag?.userRecording);
  
  
  function onError() {
  }
 

  return (
    <View style={{height:"100%",position:"relative"}}>
      {!!userRecording ? <View style={{position:"absolute",top:0,left:0,width:width,height:"100%",backgroundColor:colors.black,opacity:1,elevation:100,zIndex:1000}}/>:null}
 <WebView
      style={{
        height: '100%',
        backgroundColor: 'black',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        
      }}
      onError={onError}
      scrollEnabled={false}
      allowsInlineMediaPlayback={true}
      automaticallyAdjustContentInsets
      source={{
        html: `
          <html >
            <body>
              <iframe src="https://player.vimeo.com/video/${videoId}?muted=${!!userRecording}&background=${!!userRecording}" width='100%' height="100%" style="background-color:black;" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
              <script src="https://player.vimeo.com/api/player.js"></script>
            </body>
          </html>
        `,
      }}
    />
    </View>
   
  );
};

export default SampleVimeo;

const styles = StyleSheet.create({});
