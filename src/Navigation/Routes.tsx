import * as React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import RNSecureStorage from 'rn-secure-storage';
import {Alert, AppState, NativeModules, Platform} from 'react-native';
import AuthStack from './AuthStack';
// import { useSelector } from "react-redux";
import MainStack from './MainStack';
import {getToken} from '../utils/interceptor';
import WithSplashScreen from '../Screens/SplashScreen';
import ScreenGuardModule from 'react-native-screenguard';
import {IsTempVar, userPayload, UserToken} from '../redux/slice/authSlice';
import {
  protectScreenRecording,
  requestPermission,
} from '../utils/logicFunctions';
import RNScreenshotPrevent, {
  usePreventScreenshot,
} from 'react-native-screenshot-prevent';
import {IsRecording} from '../redux/slice/tagSlice';
import NetInfo from '@react-native-community/netinfo';
import {onlineManager} from '@tanstack/react-query';
// import {
//   CaptureProtection,
//   CaptureProtectionModuleStatus,
//   useCaptureProtection,
// } from 'react-native-capture-protection';
import navigationStrings from '../constants/navigationStrings';
import DeviceInfo from 'react-native-device-info';
import Orientation from 'react-native-orientation-locker';
import usePostData from '../hooks/usePostData';
import { endpoints } from '../utils/endpoints';
import { showError } from '../utils/helperFunctions';

function Routes() {
  // const {isPrevent, status} = useCaptureProtection();
  onlineManager.setEventListener(setOnline => {
    return NetInfo.addEventListener(state => {
      setOnline(!!state.isConnected);
    });
  });


  // React.useEffect(() => {
  //   // Orientation.lockToPortrait();
  //   Orientation.lockToPortrait();
    
  //   // return;
  //   // if (DeviceInfo.isTablet()) {
  //   //   // Lock to portrait for tablets
  //   //   Orientation.lockToPortrait();
  //   // }
  //   // return () => {
  //   //   // Clean up on unmount or reset orientation if needed
  //   //   Orientation.unlockAllOrientations();
  //   // };
  // }, []);
 

  

  // React.useEffect(() => {
  //   (async () => {
  //     await CaptureProtection.preventScreenshot();
  //     await CaptureProtection.allowScreenRecord();
  //     // await CaptureProtection.preventScreenRecord();
  //   })();
  // }, []);

  // React.useEffect(() => {
  //   if (status === 4) {
  //     dispatch(IsRecording({userRecording: true}));
  //   } else if (status === 5) {
  //     dispatch(IsRecording({userRecording: false}));
  //   }
  //   console.log("here's the isPrevent and status", isPrevent, status);
  // }, [status]);

  React.useEffect(() => {
    // const asp= protectScreenRecording();
    // console.log("there's value coming",asp);

    requestPermission();
  }, []);

  const Stack = createNativeStackNavigator();
  // const prevent = usePreventScreenshot();
  // RNScreenshotPrevent.enabled(true);
  // if(!__DEV__) RNScreenshotPrevent.enableSecureView();

  const data = useSelector((state: any) => state?.auth?.userPayload);
  const token = useSelector((state: any) => state?.auth?.token);
  const [localState, setLocalState] = React.useState(false);


  console.log("datadatadatadatadatadata", data);
  
  const data2 = useSelector((state: any) => state?.auth);
  const userRecording = useSelector((state:any) => state?.tag?.userRecording);

  const dispatch = useDispatch();

  React.useEffect(() => {
    // dispatch(IsRecording({userRecording:localState}))
  }, [localState, userRecording]);


  const [isAppReady, setIsAppReady] = React.useState(false);
  const {mutate}=usePostData(endpoints.CHECK_TOKEN,['CHECK_TOKEN'],'post',async (data)=>{

  },async (err)=>{
    showError(err)
    
  })

  ScreenGuardModule.registerScreenRecordingEventListener(e => {
    dispatch(IsRecording({userRecording: !userRecording}));
  });

  ScreenGuardModule.registerScreenshotEventListener(e=>{
    
  })

  console.log('home data',data,AppState);

  React.useEffect(()=>{
      (async ()=>{
           const result = await DeviceInfo.getUniqueId()
        if(result){
          mutate({device_token:result})
        }
      })()
  },[AppState])
  
  React.useEffect(() => {
    try {
      (async () => {
       
        
        const token = await RNSecureStorage.getItem('token');
        const userData = await RNSecureStorage.getItem('userData');
        console.log('userDatauserDatauserDatauserData',userData);
        
        if (userData!==null && JSON.parse(userData)) {
          dispatch(userPayload({userPayload: JSON.parse(userData)}));
          dispatch(UserToken({token: token}));
        } else {
          dispatch(userPayload({userPayload:null}));
          dispatch(UserToken({token: null}));
        }
      })();
      setTimeout(() => {
        setIsAppReady(true);
      }, Platform.OS==="ios"?5500:7000);
      // setTimeout(() => {
      //   setIsAppReady(true);
      // }, 1000);
      // setIsAppReady(true);
    } catch (error) {
    }
  }, []);

  const linking = {
    prefixes: ['brightfutureuser://'],
    config: {
      screens: {
        [navigationStrings.GroupCouponsDetail]: 'groupcouponsdetail',
      },
    },
  }


  React.useEffect(() => {
    Orientation.lockToPortrait();
    // if (DeviceInfo.isTablet()) {
    //   // Lock to portrait for tablets
    //   Orientation.lockToPortrait();
    // }
    // return () => {
    //   // Clean up on unmount or reset orientation if needed
    //   Orientation.unlockAllOrientations();
    // };
  }, []);

  

  return (
    <WithSplashScreen isAppReady={isAppReady}>
      <NavigationContainer
        theme={{
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            background: 'white',
          },
        
        }}
        linking={linking}
        >
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation:
              Platform.OS === 'android' ? 'slide_from_bottom' : 'default',
          }}>
          {!!data?.id ? MainStack() : AuthStack()}
        </Stack.Navigator>
      </NavigationContainer>
    </WithSplashScreen>
  );
}

export default Routes;
