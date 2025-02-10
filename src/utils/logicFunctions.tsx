import React from 'react';
import StarGold from '../assets/images/Icons/goldStar.svg';
import StarGrey from '../assets/images/Icons/greyStar.svg';
import {Alert, NativeModules, PermissionsAndroid, Platform} from 'react-native';
import {showError, showSuccess} from './helperFunctions';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {URL} from 'react-native-url-polyfill';

export function ratingStar(rating: number) {
  const ratingCeil = Math.floor(rating);

  const newArr = Array.from({length: 5}, (_, index) =>
    index + 1 <= ratingCeil ? (
      <StarGold width={15} height={15} />
    ) : (
      <StarGrey width={15} height={15} />
    ),
  );

  return newArr;
}

export function validatePassword(password: string) {
  // Check if the password is at least 6 characters long

  if (password.length < 6) {
    return false;
  }

  // Check for a combination of uppercase letters, lowercase letters, numbers, and symbols
  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const digitRegex = /\d/;
  const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;

  // if (!uppercaseRegex.test(password)) {
  //   return false; // Missing uppercase letter
  // }

  if (!lowercaseRegex.test(password)) {
    return false; // Missing lowercase letter
  }

  if (!digitRegex.test(password)) {
    return false; // Missing number
  }

  if (!symbolRegex.test(password)) {
    return false; // Missing symbol
  }

  // All checks passed, the password is valid
  return true;
}

export function isNumeric(value: string) {
  return /^\d+$/.test(value);
}

export const requestPermission = async () => {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ]);
    if (
      granted['android.permission.CAMERA'] &&
      granted['android.permission.WRITE_EXTERNAL_STORAGE']
    ) {
      console.log('You can use the camera');
    } else {
      console.log('Camera permission denied');
    }
  } catch (error) {
    console.log('permission error', error);
  }
};

export const handlePressInfo = async (item: any) => {
  try {
    const {config, fs} = ReactNativeBlobUtil;

    const downloads =
      Platform.OS === 'ios' ? fs.dirs.DocumentDir : fs.dirs.DownloadDir;

    // const response = await fetch(item?.file,{ headers: {
    //   "Content-Type": "multipart/form-data",
    //   // 'Content-Type': 'application/x-www-form-urlencoded',
    // },});
    const filePath = `${downloads}/${item?.name}.pdf`;
    const configPath = {
      fileCache: true,
      appendExt: 'pdf',
      title: `${item.name}.pdf`,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: filePath,
        description: 'Downloading PDF document',
        mediaScannable: true,
      },
    };

    const result = await config(configPath).fetch('GET', item?.file);

    // console.log('response response respomse',await response.blob());

    // const blob=await response.blob();

    // const exists = await fs.exists(filePath);
    // if(exists){
    //   await fs.unlink(filePath)
    // }

    if (Platform.OS === 'ios') {
      ReactNativeBlobUtil.fs.writeFile(filePath, result?.data, 'base64');
      ReactNativeBlobUtil.ios.openDocument(result?.data);
    }
    if (result?.path()) {
      showSuccess('Pdf Downloaded');
    }
  } catch (error) {
    showError('Error while downloading the pdf');
  }
};

export const videoIdGenerator = (videoUrl: string) => {
  try {
    const urlNew = new URL(videoUrl);
    const videoPath = urlNew.pathname.split('/')[1];
    // console.log('pathnamepathnamepathnamepathnamepathnamepathnamepathname',chapterData);
    return videoPath;
  } catch (error) {}
};

export const protectScreenRecording = () => {
  // NativeModules.ScreenShieldRN.protectScreenRecording();
};

export const displayAlert = (
  title: string,
  desc: string,
  onApprove?: () => void,
  onCancel?: () => void,
) => {
  Alert.alert(title, desc, [
    {
      text: 'Cancel',
      onPress: onCancel,
      style: 'cancel',
    },
    {
      text: 'OK',
      onPress: onApprove,
    },
  ]);
};

export const formatTime = (seconds: number) => {
  var hours = Math.floor(seconds / 3600);
  var minutes = Math.floor((seconds % 3600) / 60);
  var remainingSeconds = seconds % 60;

  var formattedTime = '';

  if (hours > 0) {
    formattedTime += hours + 'h ';
  }

  if (minutes > 0) {
    formattedTime += minutes + 'm ';
  }

  if (remainingSeconds > 0) {
    formattedTime += remainingSeconds + 's';
  }

  return formattedTime;
};

export function secondsToMMSS(seconds: number) {
  // Calculate minutes and seconds
  var minutes = Math.floor(seconds / 60);
  var remainingSeconds = seconds % 60;

  // Format the time as mm:ss
  var mmSS =
    (minutes < 10 ? '0' : '') +
    minutes +
    ':' +
    (remainingSeconds < 10 ? '0' : '') +
    remainingSeconds;
  return mmSS;
}

export const formatTimeInput = (input: string) => {
  // Remove non-numeric characters
  const cleanedInput = input.replace(/\D/g, '');

  // Format the input with colon after first two digits
  if (cleanedInput.length >= 3) {
    return cleanedInput.slice(0, 2) + ':' + cleanedInput.slice(2);
  } else {
    return cleanedInput;
  }
};

export const handlePdfView = (item: any) => {
  console.log('idhar saara ka saara data aa rha hai', item);

  // file name
};

export function getDate(date1: string, date2: string) {
  const createdDate = new Date(date1);
  const expiryDate = new Date(date2);

  const currentData = new Date();
  const timeDifference = expiryDate.getTime() - createdDate.getTime();
  const timeDifferenceCurrent = expiryDate.getTime() - currentData.getTime();

  console.log('$$$$$$$$$$$$$$', {
    createdDate,
    expiryDate,
    timeDifference,
    timeDifferenceCurrent,
  });

  //conversion to the days ;

  const result = Math.round(timeDifference / (1000 * 3600 * 24));
  const result2 = Math.round(timeDifferenceCurrent / (1000 * 3600 * 24));
  const finalResult = Math.round(result - result2);

  return {
    daysCompleted: finalResult,
    daysTotal: result,
    daysPending: result2,
  };
}
