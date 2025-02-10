import React, { useState } from 'react';
import { Button, View, Platform, Linking, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import tus, { Upload } from 'tus-js-client';
import { useDispatch, useSelector } from 'react-redux';
import { constantpayload } from '../constants/mainstrings';
import CryptoJS from 'crypto-js';
import { Buffer } from 'buffer';
import { Video,File } from '../redux/slice/chapterSlice';
import useGetData from '../hooks/useGetData';
import { endpoints } from '../utils/endpoints';


// Replace these with your actual library ID and API key
const libId = constantpayload.LIB_ID;
const apiKey = constantpayload.API_KEY;



const UploadVideo: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const state:any= useSelector(state=>state);
  const {data, status,isFetching} = useGetData(endpoints.BUNNY_KEY, ["bunny"]);
  console.log(data,'datattatatat',status,isFetching)


  // Function to handle video selection and initiate upload
  const handleVideo = async () => {
    try {
      const result = await launchImageLibrary({ mediaType: 'video' });
      setLoading(true);

      if (result?.didCancel) {
        setLoading(false);
        Alert.alert('Error', 'No video was selected');
        return;
      }

      if (result?.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        const fileUri = asset.uri;

        if (fileUri) {
        //   const url = new URL(fileUri);
        //   const newPathName = url?.pathname?.split('/');
          const urlVideo = `https://video.bunnycdn.com/library/${libId}/videos`;

          const options = {
            method: 'POST',
            headers: {
              accept: 'application/json',
              'content-type': 'application/json',
              AccessKey: apiKey,
            },
            body: JSON.stringify({
              title: asset.fileName ,
            }),
          };

          const response = await fetch(urlVideo, options);
          const data = await response.json();
          console.log("datadatadatadatadatadatadata",data);
          

          if (data?.guid && fileUri) {

            dispatch(
                File({
                  file: {
                    // name:
                    //   Platform.OS === 'ios'
                    //     ? result?.assets[0].fileName
                    //     : newPathName[newPathName.length - 1],
                        name:asset.fileName,
                    uri: Platform.OS === 'ios' ? fileUri : fileUri,
                    type: asset?.type,
                  },
                }),
              );
              dispatch(Video({video: data?.guid}));

            // Start upload
            await startUpload(fileUri, data.guid,asset?.type);
          }
        }
      }
    } catch (err: any) {
      console.error('Error uploading video', err);

      if (err?.message === 'User did not grant library permission.') {
        if (Platform.OS === 'ios') {
          Linking.openURL('app-settings:');
        } else {
          Linking.openSettings();
        }
      }

      Alert.alert('Error', 'Error while uploading the video');
    } finally {
      setLoading(false);
    }
  };

  // Function to start uploading the file in chunks
  const startUpload = async (fileUri: string, videoId: string,type:string) => {
    const chunkSize = 1 * 1024 * 1024; // 5MB chunk size for large files
    try {
      const fileInfo = await RNFS.stat(fileUri);
      const fileSize = fileInfo.size;
      const totalChunks = Math.ceil(fileSize / chunkSize);


      for (let i = 0; i < totalChunks; i++) {
        const start = i * chunkSize;
        const end = Math.min(start + chunkSize, fileSize);

        // Read the chunk as a base64 encoded string
        const chunk = await RNFS.read(fileUri, end - start, start, 'base64');
        // Convert the base64 string to a Blob
        const blob = base64ToBlob(chunk, type);
        console.log("blobblobblobblobblobblobblobblobblobblobblob",blob,fileInfo);
        

        // Upload the chunk
        await uploadChunk(blob, videoId);
      }

      console.log('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
      Alert.alert('Error', 'Failed to upload video');
    }
  };

  // Helper function to convert base64 to Blob
  const base64ToBlob = (base64: string, mimeType: string): Blob => {
    const byteCharacters = Buffer.from(base64, 'base64').toString('binary');
    
    const byteArrays: Uint8Array[]  = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    console.log("byteArraysbyteArraysbyteArraysbyteArraysbyteArrays",byteArrays);
    
    return new Blob(byteArrays, { type: mimeType });
  };

  // Function to upload a chunk using tus
  const uploadChunk = (chunkBlob: Blob, videoId: string): Promise<void> => {
    console.log("chunkBlobchunkBlobchunkBlobchunkBlobchunkBlobchunkBlob",chunkBlob?._data);
    
    const libId = constantpayload.LIB_ID;
      const expireTime = constantpayload?.EXPIRE_TIME;
     
      const shaText= state?.chapter?.shaText
      const file= state?.chapter?.file;
      const thumbnailPath =state?.chapter?.thumbnailResponse
      const video= state?.chapter?.video
  
      const shText = CryptoJS.SHA256(shaText).toString();
      
      return new Promise((resolve, reject) => {
      const upload = new tus.Upload(chunkBlob?._data, {
        endpoint: 'https://video.bunnycdn.com/tusupload',
        retryDelays: [0, 3000, 5000, 10000, 20000, 60000, 60000],
        headers: {
          AuthorizationSignature: shText, // Replace with actual signature
          AuthorizationExpire:  expireTime.toString(), // Replace with actual expire time
          VideoId: videoId, // The GUID of the video created earlier
          LibraryId: `${libId}`,
        },
        chunkSize: chunkBlob?._data?.size,
        metadata: {
          title: 'chunk file',
          filetype:chunkBlob?._data?.type,
        },
        onError: (error: Error) => {
          console.error('Failed because:', error);
          Alert.alert('Error', 'Failed to upload chunk');
          reject(error);
        },
        onProgress: (bytesUploaded: number, bytesTotal: number) => {
          const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
          console.log(`Chunk uploaded: ${percentage}%`);
        },
        onSuccess: () => {
          console.log('Chunk uploaded successfully');
          resolve();
        },
      });

      upload.start();
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Pick a Video" onPress={handleVideo} disabled={loading} />
    </View>
  );
};

export default UploadVideo;
