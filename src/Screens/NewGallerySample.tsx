import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  CameraRoll,
  PhotoIdentifier,
} from '@react-native-camera-roll/camera-roll';
import {moderateScale} from '../styles/responsiveSize';
import Video from 'react-native-video';

const NewGallerySample = () => {
  const [photos, setPhotos] = useState<PhotoIdentifier[]>([]);
  const [video, setVideo] =useState('')

  useEffect(() => {
    (async () => {
      const res = await CameraRoll.getPhotos({assetType:"All",first:4});
      
      setPhotos(res?.edges);
    })();
  }, []);
   
  const handleClick = (item:any)=>{
        // return ;
        setVideo(item?.node?.image?.uri);
        
  }

  return (
    <View>
      <Text>NewGallerySample</Text>
      <View style={{backgroundColor:"red"}}>
        <FlatList
          data={photos}
          numColumns={3}
          
          renderItem={({item}) => {
            return (
              <TouchableOpacity onPress={()=>handleClick(item)}>
                <Image
                  source={{uri: item?.node?.image?.uri}}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: moderateScale(12),
                  }}
                />
                {/* {item?.node?.type==="video" && <Video source={{uri: item?.node?.image?.uri}}/>} */}
                {/* <Text key={item?.node?.image?.uri}>{item?.node?.image?.uri}</Text> */}
              </TouchableOpacity>
            );
          }}
        />
       {/* {video && <Video source={{uri:video}}  style={{width:200,height:200}}/>} */}
       <Video source={{uri:'ph://6AEAE08A-B309-470B-A22A-486B05BEC70D/L0/001.mp4'}}  style={{width:200,height:200}}/>
      </View>
    </View>
  );
};

export default NewGallerySample;

const styles = StyleSheet.create({});
