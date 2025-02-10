import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {WebView} from 'react-native-webview';
import {ParamListBase, useNavigation, useRoute} from '@react-navigation/native';
import BackBtn from '../assets/images/Icons/backBtnBlack.svg';
import navigationStrings from '../constants/navigationStrings';
import {URL} from 'react-native-url-polyfill';
import {showError, showSuccess} from '../utils/helperFunctions';
import * as Progress from 'react-native-progress';
import colors from '../styles/colors';
import api from '../utils/interceptor';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {paymentCallData} from '../redux/slice/apiSlice';
import {moderateScale, moderateScaleVertical} from '../styles/responsiveSize';
// import BackBtn from '../assets/images/Icons/backBtn.svg';
import DeviceInfo from 'react-native-device-info';

// interface WebViewPaymentInterface {
//   url: string;
// }

const WebViewPayment = () => {
  const {params}: any = useRoute();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const paymentCall = useSelector((state: any) => state.apiCall.paymentCall);

  const handlePress = () => {
    navigation.goBack();
  };
  const runFirst = `window.ReactNativeWebView.postMessage("this is message from web");`;

  useEffect(() => {
    (async () => {
      if (url) {
        const newUrl = new URL(url);
        const pathnameArray = newUrl.searchParams.get('user_id');

        if (pathnameArray) {
          try {
            const response = await api.get(url);
            const newData = response.data;
            console.log('here are the new data that is coming', newData);

            if (newData.IsSuccess === 'true') {
              navigation.navigate(navigationStrings.Home, {payment: 'done'});
              paymentCallData({paymentCall: paymentCall + 1});
            } else {
              navigation.navigate(navigationStrings.Home, {payment: 'notDone'});
              paymentCallData({paymentCall: paymentCall + 1});
            }
          } catch (error) {
            showError(`there was error while doing payment`);
            console.log('there are the error that is ', error);

            navigation.navigate(navigationStrings.Home, {payment: 'notDone'});
          }
        }
      }
    })();
  }, [url]);

  const handleWebViewNavigationStateChange = (newNavState: any) => {
    const {url} = newNavState;

    const newUrl = new URL(newNavState?.url);

    const pathnameArray = newUrl?.pathname?.split('/');

    // Check if the URL includes the callback URL or success/failure keywords
    if (
      pathnameArray[pathnameArray?.length - 1] === 'callback' &&
      newUrl?.searchParams?.get('user_id')
    ) {
      // Parse the URL or handle the callback to get payment status
      // Update your application state based on the payment status

      setUrl(newNavState?.url);
      return;
    }
  };

  return (
    <>
      <View style={{flex: 1}}>
        <TouchableOpacity
          onPress={handlePress}
          style={{
            top: moderateScaleVertical(25),
            left: moderateScale(15),
            flex: 0.12,
          }}>
          <BackBtn
            width={
              DeviceInfo?.isTablet() ? moderateScale(30) : moderateScale(50)
            }
            height={
              DeviceInfo?.isTablet() ? moderateScale(30) : moderateScale(50)
            }
          />
        </TouchableOpacity>
        {
          <WebView
            source={{
              uri: params?.url,
            }}
            onNavigationStateChange={handleWebViewNavigationStateChange}
            style={{flex: 0.88}}
            injectedJavaScript={runFirst}
            onMessage={event =>
              console.log('On Message', event.nativeEvent.data)
            }
          />
        }
      </View>
    </>
  );
};

export default WebViewPayment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
