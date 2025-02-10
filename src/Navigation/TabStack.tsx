import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useEffect} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import navigationStrings from '../constants/navigationStrings';
import {Home, Settings, Wishlist} from '../Screens';

import Hearts from '../assets/images/Icons/heart.svg';
import HeartsDark from '../assets/images/Icons/heartDark.svg';
import PlayCircle from '../assets/images/Icons/playCircle.svg';
import PlayCircleDark from '../assets/images/Icons/playCircleDark.svg';
import SettingsLight from '../assets/images/Icons/settings.svg';
import SettingsDark from '../assets/images/Icons/settingsDark.svg';
import HomeIconDark from '../assets/images/Icons/starDark.svg';
import HomeIcon from '../assets/images/Icons/starLight.svg';
import colors from '../styles/colors';

import {useDispatch, useSelector} from 'react-redux';
import RNSecureStorage from 'rn-secure-storage';
import imagePath from '../constants/imagePath';
import {userPayload} from '../redux/slice/authSlice';
import MyCourses from '../Screens/MainScreens/MyCourses';
import {moderateScale, textScale, verticalScale} from '../styles/responsiveSize';

import MySubscriptionsDetail from '../Components/Screens/MySubscriptions/MySubscriptionsDetail';
import InstructorHome from '../Components/Screens/Home/InstructorHome';
import Calendar from '../Screens/MainScreens/Calendar';


import BookIcon from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.auth.userPayload);
  const navigation = useNavigation<any>()

  useEffect(() => {
    (async () => {
      const data: any = await RNSecureStorage.getItem('userData');
      if (JSON.parse(data)) {
        dispatch(userPayload({userPayload: JSON.parse(data)}));
      }
    })();
  }, []);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name={navigationStrings.Home}
        component={userData?.role === 2 ? Home : InstructorHome}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) =>
            focused ? <HomeIconDark /> : <HomeIcon />,
          tabBarActiveTintColor: colors.theme,
          tabBarLabelStyle: {
            fontFamily: 'KumbhSans-ExtraBold',
            fontSize: textScale(10),
          },
        }}
      />

      {/* {userData?.role === 3 ? (
        <Tab.Screen
          name={navigationStrings.MyCourses}
          component={MyCourses}
          options={{
            headerTitleStyle: {
              fontFamily: 'Poppins-Bold',
              fontSize: textScale(16),
            },
            headerTitle:"My Courses",
            tabBarIcon: ({focused}) =>
              focused ? <PlayCircleDark /> : <PlayCircle />,
            tabBarActiveTintColor: colors.theme,
            tabBarLabelStyle: {
              fontFamily: 'KumbhSans-ExtraBold',
              fontSize: textScale(10),
            },
          }}
        />
      ) : (
        <Tab.Screen
          name={navigationStrings.Courses}
          component={Courses}
          options={{
            headerTitleStyle: {
              fontFamily: 'Poppins-Bold',
              fontSize: textScale(16),
            },
            tabBarIcon: ({focused}) =>
              focused ? <PlayCircleDark /> : <PlayCircle />,
            tabBarActiveTintColor: colors.theme,
            tabBarLabelStyle: {
              fontFamily: 'KumbhSans-ExtraBold',
              fontSize: textScale(10),
            },
          }}
        />
      )} */}

      {userData?.role === 3 ? (
        <Tab.Screen
          name={navigationStrings.MyCourses}
          component={MyCourses}
          options={{
            headerTitleStyle: {
              fontFamily: 'Poppins-Bold',
              fontSize: textScale(16),
            },
            headerTitle: 'My Courses',
            tabBarIcon: ({focused}) =>
              focused ? <PlayCircleDark /> : <PlayCircle />,
            tabBarActiveTintColor: colors.theme,
            tabBarLabelStyle: {
              fontFamily: 'KumbhSans-ExtraBold',
              fontSize: textScale(10),
            },
          }}
        />
      ) : (
        <Tab.Screen
          name={navigationStrings.MySubscriptions}
          component={MySubscriptionsDetail}
          options={{
            headerTitleStyle: {
              fontFamily: 'Poppins-Bold',
              fontSize: textScale(16),
            },
            headerTitle: userData?.course_type_available ?"Subscriptions":'My Classes',
            // tabBarIcon: ({focused}) =>
            //   focused ? <PlayCircleDark /> : <PlayCircle />,
            tabBarIcon: ({focused}) =>{
              if(userData?.course_type_available){
                return focused ? <PlayCircleDark /> : <PlayCircle />
              }
              return ( <BookIcon name='book' color={focused?colors.theme:'#878787'} size={moderateScale(20)}/>)
            },
            tabBarActiveTintColor: colors.theme,
            tabBarLabelStyle: {
              fontFamily: 'KumbhSans-ExtraBold',
              fontSize: textScale(10),
            },
            tabBarLabel: userData?.course_type_available ?"Subscriptions":'My Classes',
          }}
        />
      )}

      {userData?.role === 3 ? null : // <Tab.Screen
      //   name={navigationStrings.StudentList}
      //   component={Students}
      //   options={{
      //     headerTitleStyle: {
      //       fontFamily: 'Poppins-Bold',
      //       fontSize: textScale(16),
      //     },
      //     tabBarIcon: ({focused}) =>
      //       focused ? <IonIcon name='person' color={colors.themeDark} size={25}/> : <IonIcon name='person' color={colors.grey1} size={25}/>,
      //     tabBarActiveTintColor: colors.theme,
      //     tabBarLabelStyle: {
      //       fontFamily: 'KumbhSans-ExtraBold',
      //       fontSize: textScale(10),
      //     },
      //   }}
      // />
      userData?.role === 2 ? (
        <Tab.Screen
          name={navigationStrings.Wishlist}
          component={Wishlist}
          options={{
            headerTitleStyle: {
              fontFamily: 'Poppins-Bold',
              fontSize: textScale(16),
            },
            tabBarIcon: ({focused}) => (focused ? <HeartsDark /> : <Hearts />),
            tabBarActiveTintColor: colors.theme,
            tabBarLabelStyle: {
              fontFamily: 'KumbhSans-ExtraBold',
              fontSize: textScale(10),
            },
            headerRight: () => (
              <TouchableOpacity onPress={()=>{
                 navigation.navigate(navigationStrings.Courses);
              }}>
                <View style={{marginRight: verticalScale(20)}}>
                  <Image source={imagePath.wishlistIcon} resizeMode='contain' />
                </View>
              </TouchableOpacity>
            ),
          }}
        />
        // <Tab.Screen
        //   name={navigationStrings.Calendar}
        //   component={Calendar}
        //   options={{
        //     headerTitleStyle: {
        //       fontFamily: 'Poppins-Bold',
        //       fontSize: textScale(16),
        //     },
        //     tabBarIcon: ({focused}) =>
        //       focused ? (
        //         <View >
        //         <Image source={imagePath.calendarIcon} tintColor={colors.theme}/>
        //        </View>
        //       ) : (
        //         <View >
        //           <Image source={imagePath.calendarIcon} />
        //         </View>
        //       ),
        //     tabBarActiveTintColor: colors.theme,
        //     tabBarLabelStyle: {
        //       fontFamily: 'KumbhSans-ExtraBold',
        //       fontSize: textScale(10),
        //     },
        //     headerRight: () => (
        //       <TouchableOpacity>
        //         <View style={{marginRight: verticalScale(20)}}>
        //           <Image source={imagePath.calendarIcon} />
        //         </View>
        //       </TouchableOpacity>
        //     ),
        //   }}
        // />
      ) : null}
      <Tab.Screen
        name={navigationStrings.Settings}
        component={Settings}
        options={{
          headerTitleStyle: {
            fontFamily: 'Poppins-Bold',
            fontSize: textScale(16),
          },
          tabBarIcon: ({focused}) =>
            focused ? <SettingsDark /> : <SettingsLight />,
          tabBarActiveTintColor: colors.theme,
          tabBarLabelStyle: {
            fontFamily: 'KumbhSans-ExtraBold',
            fontSize: textScale(10),
          },
        }}
      />
      {/* <Tab.Screen
        name={navigationStrings.Calendar}
        component={Calendar}
        options={{
          headerTitleStyle: {
            fontFamily: 'Poppins-Bold',
            fontSize: textScale(16),
          },
          tabBarIcon: ({focused}) =>
            focused ? <SettingsDark /> : <SettingsLight />,
          tabBarActiveTintColor: colors.theme,
          tabBarLabelStyle: {
            fontFamily: 'KumbhSans-ExtraBold',
            fontSize: textScale(10),
          },
        }}
      /> */}
    </Tab.Navigator>
  );
}
