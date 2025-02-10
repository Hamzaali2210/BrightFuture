import React, {useState} from 'react';
import {View, Text, Button, Platform} from 'react-native';
import * as DocumentPicker from 'react-native-document-picker';
import axios from 'axios';
import tus from 'tus-js-client';
import ImagePicker from 'react-native-image-crop-picker';

// import RNFS from 'react-native-fs';

const VimeoUploader = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Function to initiate tus upload
  const initiateUpload = async (fileUri, size) => {
  
    
    try {
      const response = await axios.post(
        'https://api.vimeo.com/me/videos',
        {
          "upload": {
            "approach": "tus",
            "size": "20798255"
          }
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer 8131c723d3d8ffeaace6318fa7584ca5`,
            Accept: 'application/vnd.vimeo.*+json;version=3.4',
          },
        },
      );
      const uploadUrl = response.data.upload.upload_link;
      console.log("uploadUrluploadUrluploadUrluploadUrl", uploadUrl);
     let  uploadLength = response.headers.get('upload-length');
let uploadOffset = response.headers.get('upload-offset');
console.log(uploadLength,uploadOffset);

      
      // return ;

      // Get file size
      // const { size } = await RNFS.stat(fileUri);

      // Initialize tus upload
      const upload = new tus.Upload(fileUri, {
        endpoint: uploadUrl,
        retryDelays: [0, 1000, 3000, 5000],
        headers: {Authorization: `Bearer 4c33f88c3696a9e410ab0543ee116664`},
        chunkSize: 150 * 1024 * 1024, // 5MB chunk size
        metadata: {
          filename: fileUri.split('/').pop(),
          filetype: 'video/mp4',
          filesize: size,
        },
        onError: function (error) {
          console.error('Upload error:', error);
          setUploading(false);
        },
        onProgress: function (bytesUploaded, bytesTotal) {
          console.log(`${bytesUploaded} bytes uploaded`);
        },
        onSuccess: function () {
          console.log('Upload complete!');
          setUploading(false);
        },
      });
      

      // Start the upload
      setUploading(true);
      upload.start();
    } catch (error) {
      console.error('Error initiating upload:', error);
      setUploading(false);
    }
  };

  // Function to handle file selection
  const selectFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.video],
      });
      console.log("response response ",res);
      
      setSelectedFile(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('Document picker cancelled');
      } else {
        console.error('Error picking file:', err);
      }
    }
  };

  // Render button for file selection and upload
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button title="Select Video" onPress={selectFile} disabled={uploading} />
      {selectedFile && (
        <View style={{marginTop: 20}}>
          <Text>Selected Video: {selectedFile[0].name}</Text>
          <Button
            title="Upload Video"
            onPress={() => initiateUpload(selectedFile[0].uri, selectedFile[0].size)}
            disabled={uploading}
          />
        </View>
      )}
    </View>
  );
};

export default VimeoUploader;
