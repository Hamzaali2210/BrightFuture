/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {FC, useEffect} from 'react';
import {processColor} from 'react-native';
import FlashMessage from 'react-native-flash-message';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {Provider, useDispatch} from 'react-redux';
import Routes from './src/Navigation/Routes';
import {store} from './src/redux/store';
import {getToken} from './src/utils/interceptor';
import {requestPermission} from './src/utils/logicFunctions';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DeviceInfo from 'react-native-device-info';
import Orientation from 'react-native-orientation-locker';

const queryClient = new QueryClient();
const App: FC = () => {
  // <CaptureProtectionProvider>
  
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
 
 
 return (<GestureHandlerRootView style={{ flex: 1 }}>
   <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <View style={{flex: 1}}>
          <StatusBar 
           translucent
           backgroundColor={'rgba(0,0,0,0)'}
          />
          <Routes />
          <FlashMessage position="top" animated />
        </View>
      </QueryClientProvider>
    </Provider>
  </GestureHandlerRootView>)
   
  // </CaptureProtectionProvider>

}  ;

export default App;
