import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as ScreenName from '../Screens';
import navigationStrings from '../constants/navigationStrings';
import ForgotPassword from '../Screens/SignUp/ForgotPassword';
import ResetPassword from '../Screens/SignUp/ResetPassword';

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <>
      <Stack.Screen
        name={navigationStrings.Onboarding}
        component={ScreenName.OnBoarding}
        options={{}}
      />
      <Stack.Screen
        name={navigationStrings.SelectUserType}
        component={ScreenName.SelectUserType}
        options={{
          headerShown: true,
          headerTitle: '',
          headerBackTitleVisible: false,
          headerTintColor: 'black',
        }}
      />

      <Stack.Screen
        name={navigationStrings.OtpVerify}
        component={ScreenName.OtpVerify}
        options={{
          headerShown: true,
          headerTitle: 'OTP verification',
          headerBackTitleVisible: false,
          headerTintColor: 'black',
        }}
      />

      <Stack.Screen
        name={navigationStrings.SignUp}
        component={ScreenName.SignUp}
        options={{}}
      />
      <Stack.Screen
        name={navigationStrings.SignIn}
        component={ScreenName.SignIn}
        options={{}}
      />
       <Stack.Screen
        name={navigationStrings.ForgotPassword}
        component={ForgotPassword}
        options={{
          headerShown: true,
          headerTitle: '',
          headerBackTitleVisible: false,
          headerTintColor: 'black',
        }}
      />
      <Stack.Screen
        name={navigationStrings.ResetPassword}
        component={ResetPassword}
        options={{
          headerShown: true,
          headerTitle: 'Reset Password',
          headerBackTitleVisible: false,
          headerTintColor: 'black',
        }}
      />
    </>
  );
}

export default AuthStack;
