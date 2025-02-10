import { ParamListBase, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import RNSecureStorage from 'rn-secure-storage';
import CartIcon from '../../../assets/images/Icons/cartIcon.svg';
import ContactUsIcon from '../../../assets/images/Icons/contactUsIcon.svg';
import LockIcon from '../../../assets/images/Icons/settingsIcon/LockIcon.svg';
import TermsIcon from '../../../assets/images/Icons/tandcPayment.svg';
import Container from './Container';
// import LogOut from '../../../assets/images/Icons/logoutIcon.svg';
import TrashIcon from 'react-native-vector-icons/FontAwesome';
import ProFileIcon from 'react-native-vector-icons/SimpleLineIcons';
import WishListIcon from '../../../assets/images/Icons/wishListSettings.svg';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import DeviceInfo from 'react-native-device-info';
import Animated, { SlideInDown, SlideInUp } from 'react-native-reanimated';
import DoorIcon from 'react-native-vector-icons/FontAwesome5';
import CouponIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import navigationStrings from '../../../constants/navigationStrings';
import usePostData from '../../../hooks/usePostData';
import { IsTempVar,userPayload as UserPayload } from '../../../redux/slice/authSlice';
import colors from '../../../styles/colors';
import { moderateScale,moderateScaleVertical } from '../../../styles/responsiveSize';
import { ContractItemProps } from '../../../types/componentInterface';
import { endpoints } from '../../../utils/endpoints';
import { showError, showSuccess } from '../../../utils/helperFunctions';

import BookIcon from 'react-native-vector-icons/AntDesign';
import { QueryClient } from '@tanstack/react-query';

function ContainerList() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const userPayload = useSelector((state: any) => state.auth.userPayload);

  const {
    mutate: logout,
    // isSuccess: dataSuccess,
    data: userData,
    // error: logoutError,
  } = usePostData(endpoints.LOGOUT, ['LOGOUT',userPayload],'post',async (data)=>{
    
    console.log("this is data:/n   ",data)

    console.log("this is userPayload :/n   ", userPayload)

    await RNSecureStorage.removeItem('token');
    await RNSecureStorage.removeItem('userData')
  
    dispatch(UserPayload({userPayload:null}))
   
    showSuccess('Logout Successfully');
  },async (error)=>{
    
    showError('Error while doing logout');
   
    await RNSecureStorage.removeItem('token');
    await RNSecureStorage.removeItem('userData')
    dispatch(UserPayload({userPayload:null}))
  
   
  });

  console.log({userDatauserDatauserData: userData});
  const dispatch = useDispatch();

  // useEffect(() => {
  //   (async () => {
  //     if (dataSuccess) {
       
  //     } else if (logoutError) {
  //       // await RNSecureStorage.removeItem('token');
  //       // dispatch(IsTempVar({tempVar: false}));
       
  //     }
  //   })();
  // }, [dataSuccess, logoutError]);

  const data: ContractItemProps[] = [
    {
      id: 1,
      title: 'Profile',
      svgImage: (
        <ProFileIcon
          color={colors.theme}
          size={moderateScaleVertical(20)}
          name="user"
        />
      ),
    },
    {
      id: 142,
      title: 'Voucher',
      svgImage: (
        <CouponIcon name="sale" size={moderateScaleVertical(20)} color={colors.theme} />
      ),
    },
    {
      id: 10,
      title: 'My Cart',
      svgImage: (
        <CartIcon width={moderateScaleVertical(25)} height={moderateScaleVertical(25)} />
      ),
    },
    {
      id: 12,
      // title: 'Puchased Courses',
      title: userPayload?.course_type_available?"Purchased History":'Enrolled Classes',
      svgImage: (
        // <PlayIconSettings
        //   width={moderateScaleVertical(24)}
        //   height={moderateScaleVertical(24)}
        // />
        <BookIcon
        name='book'
        color={colors.theme}
        size={moderateScaleVertical(24)}
        // width={moderateScaleVertical(24)}
        // height={moderateScaleVertical(24)}
      />
        
      ),
    },
    // {
    //   id: 124,
    //   title: 'Billing and Payments',
    //   svgImage: (
    //     <LockIcon width={moderateScaleVertical(30)} height={moderateScaleVertical(30)} />
    //   ),
    // },
    // {
    //   id: 134,
    //   title: 'My Plan',
    //   svgImage: (
    //     <PlanPaymentIcon width={moderateScaleVertical(30)} height={moderateScaleVertical(30)} />
    //   ),
    // },
    // {
    //   id: 124,
    //   title: 'Billing and Payments',
    //   svgImage: (
    //     <LockIcon width={moderateScaleVertical(30)} height={moderateScaleVertical(30)} />
    //   ),
    // },
    // {
    //   id: 194,
    //   title: 'My Assigments',
    //   svgImage: (
    //     <LockIcon width={moderateScaleVertical(30)} height={moderateScaleVertical(30)} />
    //   ),
    // },
    // {
    //   id: 24,
    //   title: 'My Voucher',
    //   svgImage: (
    //     <VoucherIcon width={moderateScaleVertical(30)} height={moderateScaleVertical(30)} />
    //   ),
    // },
    {
      id: 54,
      title: 'My Wishlist',
      svgImage: (
        <WishListIcon width={moderateScaleVertical(30)} height={moderateScaleVertical(30)} />
      ),
    },
    // {
    //   id: 44,
    //   title: 'Special Classes',
    //   svgImage: (
    //     <SpecialClass width={moderateScaleVertical(30)} height={moderateScaleVertical(30)} />
    //   ),
    // },
 
    {
      id: 13,
      title: 'Change Password',
      svgImage: (
        <LockIcon width={moderateScaleVertical(30)} height={moderateScaleVertical(30)} />
      ),
    },
    {
      id: 129,
      title: 'Terms & Condition',
      svgImage: (
        <TermsIcon width={moderateScaleVertical(30)} height={moderateScaleVertical(30)} />
      ),
    },
    {
      id: 137,
      title: 'Privacy Policy',
      svgImage: (
        <LockIcon width={moderateScaleVertical(30)} height={moderateScaleVertical(30)} />
      ),
    },
   
    {
      id: 132,
      title: 'Contact Us',
      svgImage: (
        <ContactUsIcon width={moderateScaleVertical(30)} height={moderateScaleVertical(30)} />
      ),
    },
    {
      id: 1412,
      title: 'Delete Account',
      svgImage: (
        <TrashIcon
        size={moderateScaleVertical(25)}
        color={colors.red}
        name="trash-o"
      />
      ),
    },
    {
      id: 14,
      title: 'Log out',
      svgImage: (
        <DoorIcon
          name="door-open"
          size={moderateScaleVertical(20)}
          color={colors.theme}

        />
      ),
    },
  ];

  const dataInstructor: ContractItemProps[] = [
    {
      id: 1,
      title: 'Profile',
      svgImage: (
        <LockIcon width={moderateScaleVertical(30)} height={moderateScaleVertical(30)} />
      ),
    },
    {
      id: 11,
      title: 'My Courses',
      svgImage: (
        <CartIcon width={moderateScaleVertical(25)} height={moderateScaleVertical(25)} />
      ),
    },

    // {
    //   id: 134,
    //   title: 'My Plan',
    //   svgImage: (
    //     <PlanPaymentIcon width={moderateScaleVertical(30)} height={moderateScaleVertical(30)} />
    //   ),
    // },

    {
      id: 13,
      title: 'Change Password',
      svgImage: (
        <LockIcon width={moderateScaleVertical(30)} height={moderateScaleVertical(30)} />
      ),
    },
    {
      id: 129,
      title: 'Terms & Condition',
      svgImage: (
        <TermsIcon width={moderateScaleVertical(30)} height={moderateScaleVertical(30)} />
      ),
    },
    {
      id: 137,
      title: 'Privacy Policy',
      svgImage: (
        <LockIcon width={moderateScaleVertical(30)} height={moderateScaleVertical(30)} />
      ),
    },
    {
      id: 132,
      title: 'Contact Us',
      svgImage: (
        <ContactUsIcon width={moderateScaleVertical(30)} height={moderateScaleVertical(30)} />
      ),
    },
    {
      id: 1412,
      title: 'Delete Account',
      svgImage: (
      <TrashIcon
        size={moderateScaleVertical(25)}
        color={colors.red}
        name="trash-o"
      />
      ),
    },
    {
      id: 14,
      title: 'Log out',
      svgImage: (
        <DoorIcon
          name="door-open"
          size={moderateScaleVertical(20)}
          color={colors.black}
        />
      ),
    },
  ];

  const handlePress = async (item: any) => {
    if (item === 1) {
      navigation.navigate(navigationStrings.Profile as never);
    }
    if (item === 10) {
      navigation.navigate(navigationStrings.Cart,{fromCart:true});
    }
    if (item === 11) {
      navigation.navigate(navigationStrings.MyCourses as never);
      // navigation.navigate(navigationStrings.SampleVideoUpload as never);
    }
    if (item === 12) {
      navigation.navigate(navigationStrings.PurchasedCourse as never);
    }
    if (item === 13) {
      navigation.navigate(navigationStrings.ChangePassword as never);
    }
    if (item === 134) {
      navigation.navigate(navigationStrings.MyPlan as never);
    }
    if (item === 142) {
      navigation.navigate(navigationStrings.MyVouchers as never);
    }

    if (item === 123) {
      navigation.navigate(navigationStrings.Cart,{fromCart:true});
    }
    if (item === 132) {
      navigation.navigate(navigationStrings.AboutUs as never);
      // navigation.navigate(navigationStrings.SampleUpload as never);
    }
    if (item === 135) {
      navigation.navigate(navigationStrings.AddReview as never);
    }
    if (item === 44) {
      // navigation.navigate(navigationStrings. as never);
    }

    if (item === 84) {
      navigation.navigate(navigationStrings.SampleVideoScreen as never);
    }

    if (item === 14) {
      const result = await DeviceInfo.getUniqueId();
      if(result){

        logout({mac_address: result});
      }
     
    }
    if (item === 124) {
      navigation.navigate(navigationStrings.Payments as never);
    }
    if (item === 129) {
      // navigation.navigate(navigationStrings.StudentList as never);
      navigation.navigate(navigationStrings.Terms as never);
    }
    if (item === 137) {
      // navigation.navigate(navigationStrings.NewGallerySample as never);
      navigation.navigate(navigationStrings.Privacy as never);
      // navigation.navigate(navigationStrings.AddReview as never);
      // navigation.navigate(navigationStrings.SampleHsl as never);
    }

    if (item === 54) {
      navigation.navigate(navigationStrings.Wishlist as never);
    }
    if (item === 194) {
      navigation.navigate(navigationStrings.MyAssignmets as never);
    }
    if (item === 1412) {
      navigation.navigate(navigationStrings.DeleteAccount as never);
    }
  };

  return (
    <Animated.View entering={SlideInUp} exiting={SlideInDown}>
      {!(userPayload?.role === 3)
        ? data.map((item: ContractItemProps) => {
            if ( item.id === 1412) {
              return (
                <Container
                  title={item.title}
                  key={item.id}
                  svgImage={item.svgImage}
                  overcomeStyleText={{color: colors.red}}
                  handlePress={() => handlePress(item.id)}
                />
              );
            }

            return (
              <Container
                title={item.title}
                key={item.id}
                svgImage={item.svgImage}
                handlePress={() => handlePress(item.id)}
              />
            );
          })
        : dataInstructor.map((item: ContractItemProps) => {
            if ( item.id === 1412) {
              return (
                <Container
                  title={item.title}
                  key={item.id}
                  svgImage={item.svgImage}
                  overcomeStyleText={{color: colors.red}}
                  handlePress={() => handlePress(item.id)}
                />
              );
            }

            return (
              <Container
                title={item.title}
                key={item.id}
                svgImage={item.svgImage}
                handlePress={() => handlePress(item.id)}
              />
            );
          })}
    </Animated.View>
  );
}

export default ContainerList;

const styles = StyleSheet.create({});
