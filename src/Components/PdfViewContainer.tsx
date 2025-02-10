import React, { useState } from 'react';
import {StyleSheet, Dimensions, View, TouchableOpacity, Text, Platform, PermissionsAndroid, Alert} from 'react-native';
import Pdf from 'react-native-pdf';
import {height, moderateScale, moderateScaleVertical, textScale, width} from '../styles/responsiveSize';
import CloseIcon from 'react-native-vector-icons/AntDesign';
import colors from '../styles/colors';
import { handlePressInfo } from '../utils/logicFunctions';
import RNBlobUtil from 'react-native-blob-util';
import Share from 'react-native-share'
import { URL } from 'react-native-url-polyfill';
import ShareIcon from 'react-native-vector-icons/Entypo'
import DeviceInfo from 'react-native-device-info';
import {IMAGE_API_URL } from '../utils/urls';


interface PdfViewContainerInterface {
  source: any;
  toggleModal: (item?: any) => void;
  handleDownload?:()=>void;
}

const PdfViewContainer: React.FC<PdfViewContainerInterface> = ({
  source,
  toggleModal,
  handleDownload
}) => {
    const [loading,setLoading]=useState(false);
  const sourcePdf = {
    uri: `${IMAGE_API_URL}${source?.file}`,
    cache: true,
  };
  // const sourcePdf = {
  //   uri: "https://customsbuckets.s3.us-west-2.amazonaws.com/files/3eaa1e36c138b50a38e37a567d1503d9_ReactNativeBlobUtilTmp_r37o4sqi7gyedx6dhr23.pdf",
  //   cache: true,
  // };
  const requestAndroidPermissions = async () => {
    try {
      if (Platform.OS === 'android') {
        // If Android 11 or above (API 30+), use MANAGE_EXTERNAL_STORAGE
        if (Platform.Version >= 30) {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.MANAGE_EXTERNAL_STORAGE,
            {
              title: 'Storage Permission Required',
              message: 'App needs access to your storage to download the file',
            }
          );
  
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Manage External Storage Permission granted');
            return true;
          } else {
            Alert.alert('Permission Denied', 'Storage permission is required');
            return false;
          }
        } else {
          // For Android below API 30, request WRITE_EXTERNAL_STORAGE
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'Storage Permission Required',
              message: 'App needs access to your storage to download the file',
            }
          );
  
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Write External Storage Permission granted');
            return true;
          } else {
            Alert.alert('Permission Denied', 'Storage permission is required');
            return false;
          }
        }
      }
      return true; // For iOS, no special permission needed
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const shareUrl = async ()=>{
    try {
      await Share.open({
        url:source?.file,
        failOnCancel:false,
        message:"Check out this message"
          
     })
    } catch (error) {
      
    }
  
  }

  const downloadFile = async () => {
    const url = `${IMAGE_API_URL}${source?.file}`; // URL of the file to download
    const fileNameArray = new URL(source?.file).pathname.split('/');
    const fileName=fileNameArray[fileNameArray.length-1]
    console.log(fileName,'fileNameArrayfileNameArrayfileNameArrayfileNameArray')
    // return


    
    // File path for Android (downloads directory) and iOS (documents directory)
    const filePath =
      Platform.OS === 'android'
        ? `${RNBlobUtil.fs.dirs.DownloadDir}/${source?.name}.pdf`
        : `${RNBlobUtil.fs.dirs.DocumentDir}/${source?.name}.pdf`;

    // Request permission for Android (WRITE_EXTERNAL_STORAGE)
  //   const hasPermission = await requestAndroidPermissions();
  // if (!hasPermission) {
  //   return;
  // }
  setLoading(true)
    try {
      // Start the download
      const res = await RNBlobUtil.config({
        fileCache: true,
        path: filePath, // Save to path depending on the platform
      }).fetch('GET', url);

      // Check if file exists at the given path
      const fileExists = await RNBlobUtil.fs.exists(filePath);
      if (!fileExists) {
        Alert.alert('Saving Failed', 'File could not be saved.');
        return;
      }

      // Log the file path for debugging
      console.log('File saved at:', filePath);

      // Success alert
      // Alert.alert('Download Successful', `File saved to: ${filePath}`);
      setLoading(false);

      // Share the file using react-native-share
      if (Platform.OS === 'ios'
      ) {
        // iOS-specific sharing after download
        await Share.open({
          url: `file://${filePath}`, // Prefix with file:// for iOS
          // type: 'application/pdf', // Specify file type
          failOnCancel: false,
          saveToFiles:true,
          filename:source?.name,
          title:source?.name
        });
      }else if (Platform.OS === 'android') {
        // Android-specific sharing after download
        await Share.open({
          url: filePath,               // No prefix needed for Android
          // type: 'application/pdf',     // Specify file type
          failOnCancel: false,
          filename:source?.name,
        });
      }
    } catch (error) {
      // Error handling
      setLoading(false);
      console.log('Download error:', error);
      Alert.alert('Download Failed', 'Something went wrong during the download');
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          height: moderateScaleVertical(45),
          alignItems: 'flex-end',
          marginVertical:moderateScale(10),
          width:"100%",
          justifyContent:"center",
          // bottom:moderateScale(50)

      

          
        }}>
                  <View style={{alignItems:"center",flexDirection:"row",flex:1,width:"100%",justifyContent:"flex-end"}}>
                   <View style={{flexDirection:"row",alignItems:"center"}}>
                   <TouchableOpacity onPress={shareUrl}
                   disabled={loading}
                      style={[styles.labelGreen, {backgroundColor: '#094E85',opacity:loading?0.3:1}]}>
                      <ShareIcon name='share' color={colors.white} size={DeviceInfo?.isTablet()?textScale(14):textScale(16)}/>
                      <Text style={[styles.labelTextWhite]}> Share</Text>
                    </TouchableOpacity> 
                    <TouchableOpacity onPress={downloadFile}
                   disabled={loading}
                      style={[styles.labelGreen, {backgroundColor: '#094E85',opacity:loading?0.3:1}]}>
                        <CloseIcon name='download' color={colors.white} size={DeviceInfo.isTablet()?textScale(14):textScale(16)}/>
                      <Text style={[styles.labelTextWhite]}> Download</Text>
                    </TouchableOpacity> 
                   </View>
                    
          <TouchableOpacity onPress={toggleModal}>
          <CloseIcon
            color={colors.black}
            size={moderateScale(30)}
            name="close"
          />
        </TouchableOpacity>
          </View>
       
      </View>
      <Pdf
      trustAllCerts={false}
        source={sourcePdf}
        onLoadComplete={(numberOfPages, filePath) => {
        console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`);
        }}
        onError={error => {
          console.log(error);
        }}
        onPressLink={uri => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={styles.pdf}
      />
    </View>
  );
};

export default PdfViewContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: moderateScale(18),
    backgroundColor:colors.lightGreyColor,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: height-150,
    // height: 400,
    
  },
  labelTextWhite: {
    fontFamily: 'Urbanist-Bold',
    color: colors.white,
    fontSize:width>750?textScale(8):textScale(14)
  },
  labelGreen: {
    backgroundColor: '#53B914',
    paddingVertical: moderateScale(8),
    paddingHorizontal: moderateScale(10),
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    marginRight:moderateScale(10),

    borderRadius: moderateScale(20),
  },
});
