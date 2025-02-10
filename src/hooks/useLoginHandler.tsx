import DeviceInfo from 'react-native-device-info';
import {useDispatch} from 'react-redux';
import RNSecureStorage, {ACCESSIBLE} from 'rn-secure-storage';
import {userPayload} from '../redux/slice/authSlice';
import {constantpayload} from '../constants/mainstrings';
import usePostData from '../hooks/usePostData';
import {endpoints} from '../utils/endpoints';
import {showError, showSuccess} from '../utils/helperFunctions';

interface LoginCredentials {
  mobile: string;
  password: string;
}
interface LoginResponse {
  data: {
    userId: string;
    token: string;
    [key: string]: any;
  };
}

const handleLogin = async (
  {mobile, password}: LoginCredentials,
  addLogin: (payload: any) => void,
) => {
  try {
    const result = await DeviceInfo.getUniqueId();
    if (result) {
      const payload = {
        mobile,
        password,
        operating_system: DeviceInfo.getBrand(),
        mac_address: result,
        country_code: constantpayload.COUNTRY_CODE,
      };
      addLogin(payload);
    } else {
      throw new Error('Unable to fetch device unique ID.');
    }
  } catch (error) {
    showError('An error occurred during the login process.');
    console.error('Handle Login Error:', error);
  }
};

const postDataHandler = async (
  dispatch: (arg0: {payload: any; type: 'counter/userPayload'}) => void,
  data: any,
) => {
  try {
    await RNSecureStorage.setItem('userData', JSON.stringify(data?.data), {
      accessible: ACCESSIBLE.WHEN_UNLOCKED,
    });
    dispatch(userPayload({userPayload: data?.data}));
    showSuccess('Login successfully');
  } catch (error) {
    showError('Failed to save user data securely.');
    console.error('Secure Storage Error:', error);
  }
};
(error: any) => {
  showError(error?.message);
};

export const useLoginHandler = () => {
  const dispatch = useDispatch();

  const postLogin = usePostData(
    endpoints.LOGIN,
    ['POSTDATA'],
    'post',
    async (data: LoginResponse) => {
      postDataHandler(dispatch, data);
    },
  );

  const instructorLogin = usePostData(
    endpoints.LOGIN_INS,
    ['LOGIN_INS'],
    'post',
    async data => {
      postDataHandler(dispatch, data);
    },
  );

  const {} = instructorLogin;

  const {mutate: addLogin} = postLogin;
  return {
    handleLogin: (credentials: LoginCredentials) =>
      handleLogin(credentials, addLogin),
  };
};
