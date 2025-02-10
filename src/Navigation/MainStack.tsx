import { createNativeStackNavigator } from '@react-navigation/native-stack';

import React from 'react';
import Profile from '../Screens/MainScreens/Settings/Profile';
import PurchasedCourse from '../Screens/MainScreens/Settings/PurchasedCourse';
import navigationStrings from '../constants/navigationStrings';
import MyTabs from './TabStack';

import { moderateScale, textScale } from '../styles/responsiveSize';

import Cart from '../Components/Screens/Courses/Cart';
import CategoryListDetail from '../Components/Screens/Home/CategoryListDetail';
import PurchasedCourseDetail from '../Components/Screens/Settings/PurchasedCourseDetail';
import FilterIcon from '../assets/images/Icons/fitler.svg';
import { mainStrings } from '../constants/mainstrings';

import AddCourse from '../Components/Screens/Courses/AddCourse';
import AddChapter from '../Components/Screens/Courses/AddCourse/AddChapter';
import VideoUploadComponent from '../Components/Screens/Courses/AddCourse/AddChapter/SampleUpload';
import AddReview from '../Components/Screens/Courses/AddReview';
import BuyCourse from '../Components/Screens/Courses/BuyCourse';
import Filter from '../Components/Screens/Courses/Filter';
import InstructorCourse from '../Components/Screens/Courses/InstructorCourse';
import AddNotes from '../Components/Screens/Courses/InstructorCourse/AddNotes';
import ViewDetails from '../Components/Screens/Courses/InstructorCourse/ViewDetails';
import SingleCourseDetail from '../Components/Screens/Courses/SingleCourseDetail';
import AssignmentList from '../Components/Screens/Courses/SingleCourseDetail/AssignmentList';
import Notification from '../Components/Screens/Notification';
import AboutUs from '../Components/Screens/Settings/AboutUs';
import ChangePassword from '../Components/Screens/Settings/ChangePassword';
import EditProfile from '../Components/Screens/Settings/EditProfile';
import MyPlan from '../Components/Screens/Settings/MyPlan';
import PrivacyPolicy from '../Components/Screens/Settings/PrivacyPolicy';
import Terms from '../Components/Screens/Settings/Terms';
import WebViewPayment from '../Components/WebViewPayment';
import { Courses, Payment, Wishlist } from '../Screens';
import AvailableOffer from '../Screens/MainScreens/Coupons/AvailableOffer';
import CourseCategory from '../Screens/MainScreens/CourseCategory';
import Students from '../Screens/MainScreens/Students';
import Payments from '../Screens/Payments';
import SampleVideoScreen from '../Screens/SampleVideoScreen';

// import AvailableOffer from '../Components/Screens/Coupons/AvailableOffer';
import { TouchableOpacity } from 'react-native';
import SampleContainer from '../Components/Layout/Video/SampleContainer';
import SegmentationChapter from '../Components/Screens/Courses/AddCourse/AddChapter/SegmentationChapter';
import InstructorsListDetail from '../Components/Screens/Home/InstructorListDetail';
import SpecialOffers from '../Components/Screens/Home/SpecialOffers';
import InstructorDetail from '../Components/Screens/Instructor/InstructorDetail';
import ReviewList from '../Components/Screens/Instructor/ReviewList';
import CancelCourse from '../Components/Screens/MySubscriptions/CancelCourse';
import DowngradeCourse from '../Components/Screens/MySubscriptions/DowngradeCourse';
import MySubscriptionsDetail from '../Components/Screens/MySubscriptions/MySubscriptionsDetail';
import UpgradeCourse from '../Components/Screens/MySubscriptions/UpgradeCourse';
import MyVoucherGroup from '../Components/Screens/Settings/MyVoucherGroup';
import PaymentDetail from '../Components/Screens/Settings/Payments/PaymentDetail';
import AvailableCoupon from '../Screens/MainScreens/Coupons/AvailableCoupon';
import CourseDiscount from '../Screens/MainScreens/Coupons/CourseDiscount';
import CourseDiscountDetail from '../Screens/MainScreens/Coupons/CourseDiscountDetail';
import GroupCoupons from '../Screens/MainScreens/Coupons/GroupCoupons';
import GroupCouponsDetail from '../Screens/MainScreens/Coupons/GroupCouponsDetail';
import GroupCouponsStudent from '../Screens/MainScreens/Coupons/GroupCouponsStudent';
import JoinGroup from '../Screens/MainScreens/Coupons/JoinGroup';
import SampleHsl from '../Screens/SampleHsl';
import fontFamily from '../styles/fontFamily';
import UploadVideo from '../Components/SampleVideoUpload';
import DeleteAccounts from '../Components/Screens/Settings/DeleteAccounts';
import { useSelector } from 'react-redux';
import FilterInstructor from '../Components/Screens/Courses/FilterInstructor';

const Stack = createNativeStackNavigator();

function MainStack() {
 

  return (
    <>
      <Stack.Screen
        name={navigationStrings.HomeTab}
        component={MyTabs}
        options={{}}
      />
      <Stack.Screen
        name={navigationStrings.PurchasedCourse}
        component={PurchasedCourse}
        options={{
          headerShown: true,
          headerTintColor: 'black',
          headerBackTitleVisible: false,
          headerTitle: mainStrings.purchasedCourse,
        }}
      />
      <Stack.Screen
        name={navigationStrings.SampleHsl}
        component={SampleHsl}
        options={{}}
      />
      <Stack.Screen
        name={navigationStrings.BuyCourse}
        component={BuyCourse}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.Courses}
        component={Courses}
        options={({navigation}) => ({
          headerShown: false,
          headerTintColor: 'black',
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontSize: textScale(20),
            fontFamily: 'Poppins-Bold',
          },
          headerRight: () => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(navigationStrings.Filter as never);
                }}>
                <FilterIcon
                  width={moderateScale(32)}
                  height={moderateScale(32)}
                />
              </TouchableOpacity>
            );
          },
        })}
      />
      <Stack.Screen
        name={navigationStrings.CategoryList}
        component={CategoryListDetail}
        options={{
          headerShown: true,
          headerTintColor: 'black',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.Profile}
        component={Profile}
        options={{
          headerShown: true,
          headerTintColor: 'black',
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontSize: textScale(20),
            fontFamily: 'Poppins-Bold',
          },
        }}
      />
      <Stack.Screen
        name={navigationStrings.PurchasedCourseDetail}
        component={PurchasedCourseDetail}
        options={{
          headerShown: true,
          headerTintColor: 'black',
          headerBackTitleVisible: false,
          headerTitle: mainStrings.purchasedCourse,
        }}
      />
      <Stack.Screen
        name={navigationStrings.Cart}
        component={Cart}
        options={{
          headerShown: false,
          headerTintColor: 'black',
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontSize: textScale(20),
            fontFamily: 'Poppins-Bold',
          },
        }}
      />
      <Stack.Screen
        name={navigationStrings.InstructorList}
        component={InstructorsListDetail}
        options={{
          headerShown: false,
          headerTintColor: 'black',
          headerBackTitleVisible: false,
          headerTitle: 'Instructors',
          headerTitleStyle: {
            fontSize: textScale(20),
            fontFamily: `${fontFamily.Poppins_SemiBold}`,
          },
        }}
      />
      <Stack.Screen
        name={navigationStrings.PaymentStructure}
        component={Payment}
        options={{
          headerShown: true,
          headerTintColor: 'black',
          headerTitle: 'Payment Structure',
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontSize: textScale(18),
            fontFamily: 'Poppins-SemiBold',
          },
        }}
      />
      <Stack.Screen
        name={navigationStrings.CourseDiscount}
        component={CourseDiscount}
        options={{
          headerShown: true,
          headerTintColor: 'black',
          headerTitle: 'Course Discount',
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontSize: textScale(18),
            fontFamily: 'Poppins-SemiBold',
          },
        }}
      />
      <Stack.Screen
        name={navigationStrings.CourseDiscountDetail}
        component={CourseDiscountDetail}
        options={{
          headerShown: true,
          headerTintColor: 'black',
          headerTitle: 'Course Discount Detail',
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontSize: textScale(18),
            fontFamily: 'Poppins-SemiBold',
          },
        }}
      />

      <Stack.Screen
        name={navigationStrings.SingleCourseDetail}
        component={SingleCourseDetail}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={navigationStrings.SampleVideoScreen}
        component={SampleVideoScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={navigationStrings.Filter}
        component={Filter}
        options={{
          headerShown: false,
        }}
      />
        <Stack.Screen
        name={navigationStrings.FilterInstructor}
        component={FilterInstructor}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.Terms}
        component={Terms}
        options={{
          headerShown: true,
          headerTintColor: 'black',
          headerTitle: 'Terms & Conditions',
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontSize: textScale(18),
            fontFamily: 'Poppins-Medium',
          },
        }}
      />
      <Stack.Screen
        name={navigationStrings.Privacy}
        component={PrivacyPolicy}
        options={{
          headerShown: true,
          headerTintColor: 'black',
          headerTitle: 'Privacy Policy',
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontSize: textScale(18),
            fontFamily: 'Poppins-Medium',
          },
        }}
      />
      <Stack.Screen
        name={navigationStrings.ChangePassword}
        component={ChangePassword}
        options={{
          headerShown: true,
          headerTintColor: 'black',
          headerTitle: 'Change Password',
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontSize: textScale(18),
            fontFamily: 'Poppins-SemiBold',
          },
        }}
      />
      <Stack.Screen
        name={navigationStrings.AboutUs}
        component={AboutUs}
        options={{
          headerShown: true,
          headerTintColor: 'black',
          headerTitle: 'About Us',
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontSize: textScale(18),
            fontFamily: 'Poppins-Medium',
          },
        }}
      />
          <Stack.Screen
          name={navigationStrings.Wishlist}
          component={Wishlist}
          options={{
            headerShown: true,
            headerTintColor: 'black',
            headerTitle: 'Wishlist',
            headerBackTitleVisible: false,
            headerTitleStyle: {
              fontSize: textScale(18),
              fontFamily: 'Poppins-Medium',
            },
          }}
        />
      <Stack.Screen
        name={navigationStrings.AddReview}
        component={AddReview}
        options={{
          headerShown: true,
          headerTintColor: 'black',
          headerTitle: 'Write a Review',
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontSize: textScale(18),
            fontFamily: 'Poppins-Medium',
          },
        }}
      />
          <Stack.Screen
        name={navigationStrings.SampleVideoUpload}
        component={UploadVideo}
        options={{
          headerShown: true,
          headerTintColor: 'black',
          headerTitle: 'Upload Video',
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontSize: textScale(18),
            fontFamily: 'Poppins-Medium',
          },
        }}
      />
      <Stack.Screen
        name={navigationStrings.Payments}
        component={Payments}
        options={{
          headerShown: true,
          headerTintColor: 'black',
          headerTitle: 'Payments',
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontSize: textScale(18),
            fontFamily: 'Poppins-Medium',
          },
        }}
      />
      <Stack.Screen
        name={navigationStrings.PaymentsDetail}
        component={PaymentDetail}
        options={{
          headerShown: true,
          headerTintColor: 'black',
          headerTitle: 'Payments',
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontSize: textScale(18),
            fontFamily: 'Poppins-Medium',
          },
        }}
      />
      <Stack.Screen
        name={navigationStrings.Upgrade}
        component={UpgradeCourse}
        options={{
          headerShown: true,
          headerTintColor: 'black',
          headerTitle: 'Upgrade',
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontSize: textScale(18),
            fontFamily: 'Poppins-SemiBold',
          },
        }}
      />
      <Stack.Screen
        name={navigationStrings.CancelUpgrade}
        component={CancelCourse}
        options={{
          headerShown: true,
          headerTintColor: 'black',
          headerTitle: 'Cancel Upgrade',
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontSize: textScale(18),
            fontFamily: 'Poppins-SemiBold',
          },
        }}
      />
      <Stack.Screen
        name={navigationStrings.Downgrade}
        component={DowngradeCourse}
        options={{
          headerShown: true,
          headerTintColor: 'black',
          headerTitle: 'Downgrade',
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontSize: textScale(18),
            fontFamily: 'Poppins-SemiBold',
          },
        }}
      />

      <Stack.Screen
        name={navigationStrings.MyAssignmets}
        component={AssignmentList}
        options={{
          headerShown: true,
          headerTintColor: 'black',
          headerTitle: 'My Assigments',
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontSize: textScale(18),
            fontFamily: 'Poppins-Medium',
          },
        }}
      />

<Stack.Screen
        name={navigationStrings.DeleteAccount}
        component={DeleteAccounts}
        options={{
          headerShown: true,
          headerTintColor: 'black',
          headerTitle: 'Delete Account',
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontSize: textScale(18),
            fontFamily: 'Poppins-Medium',
          },
        }}
      />
      <Stack.Screen
        name={navigationStrings.InstructorCourses}
        component={InstructorCourse}
        options={{
          headerShown: false,
          headerTintColor: 'black',
          headerTitle: 'My Assigments',
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontSize: textScale(18),
            fontFamily: 'Poppins-Medium',
          },
        }}
      />
      <Stack.Screen
        name={navigationStrings.ViewDetails}
        component={ViewDetails}
        options={{
          headerShown: false,
          headerTintColor: 'black',
          headerTitle: 'My Assigments',
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontSize: textScale(18),
            fontFamily: 'Poppins-Medium',
          },
        }}
      />
      <Stack.Screen
        name={navigationStrings.EditProfile}
        component={EditProfile}
        options={{
          headerShown: false,
        }}
      />
      {/* add course screen */}
      <Stack.Screen
        name={navigationStrings.AddCourse}
        component={AddCourse}
        options={{
          headerShown: true,
          headerTintColor: 'black',
          headerTitle: 'Add New Course',
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontSize: textScale(18),
            fontFamily: 'Poppins-Medium',
          },
        }}
      />
      <Stack.Screen
        name={navigationStrings.AddChapter}
        component={AddChapter}
        options={{
          headerShown: true,
          headerTintColor: 'black',
          headerTitle: 'Add Chapter',
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontSize: textScale(18),
            fontFamily: 'Poppins-Medium',
          },
        }}
      />
      <Stack.Screen
        name={navigationStrings.SegmentationChapter}
        component={SegmentationChapter}
        options={{
          headerShown: false,
          headerTintColor: 'black',
          headerTitle: 'Segmentation Chapter',
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontSize: textScale(18),
            fontFamily: 'Poppins-Medium',
          },
        }}
      />
      <Stack.Screen
        name={navigationStrings.MyPlan}
        component={MyPlan}
        options={{
          headerShown: true,
          headerTintColor: 'black',
          headerTitle: 'My Plans',
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontSize: textScale(18),
            fontFamily: 'Poppins-Medium',
          },
        }}
      />
      <Stack.Screen
        name={navigationStrings.Notifications}
        component={Notification}
        options={{
          headerShown: true,
          headerTintColor: 'black',
          headerTitle: 'Notifications',
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontSize: textScale(18),
            fontFamily: 'Poppins-Medium',
          },
        }}
      />
      <Stack.Screen
        name={navigationStrings.WebView}
        component={WebViewPayment}
        options={{
          headerShown: false,
          headerTintColor: 'black',
          headerTitle: 'Notifications',
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontSize: textScale(18),
            fontFamily: 'Poppins-Medium',
          },
        }}
      />
      <Stack.Screen
        name={navigationStrings.GroupCouponsCustom}
        component={GroupCouponsStudent}
        options={{
          headerShown: true,
          headerTintColor: 'black',

          headerTitle: 'Group Coupons',
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontSize: textScale(18),
            fontFamily: 'Poppins-Medium',
          },
        }}
      />
      <Stack.Screen
        name={navigationStrings.StudentList}
        component={Students}
        options={{
          headerShown: true,
          headerTintColor: 'black',
          headerTitle: 'Students',
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontSize: textScale(18),
            fontFamily: 'Poppins-Medium',
          },
        }}
      />

      <Stack.Screen
        name={navigationStrings.CourseCategory}
        component={CourseCategory}
        options={{
          headerShown: false,
          headerTintColor: 'black',
          headerTitle: 'Students',
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontSize: textScale(18),
            fontFamily: 'Poppins-Medium',
          },
        }}
      />
      <Stack.Screen
        name={navigationStrings.AddNotes}
        component={AddNotes}
        options={{
          headerShown: true,
          headerTintColor: 'black',
          headerTitle: 'Add Notes',
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontSize: textScale(18),
            fontFamily: 'Poppins-Medium',
          },
        }}
      />

      <Stack.Screen
        name={navigationStrings.SampleUpload}
        component={VideoUploadComponent}
        options={{
          headerShown: true,
          headerTintColor: 'black',
          headerTitle: 'Video Uploaded',
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontSize: textScale(18),
            fontFamily: 'Poppins-Medium',
          },
        }}
      />

      <Stack.Screen
        name={navigationStrings.AvailableOffers}
        component={AvailableOffer}
        options={{
          headerShown: true,
          headerTintColor: 'black',
          headerTitle: 'Available Offers',
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontSize: textScale(18),
            fontFamily: 'Poppins-Medium',
          },
        }}
      />
      <Stack.Screen
        name={navigationStrings.SpecialOffers}
        component={SpecialOffers}
        options={{
          headerShown: true,
          headerTintColor: 'black',
          headerTitle: 'Special Offers',
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontSize: textScale(18),
            fontFamily: 'Poppins-Medium',
          },
        }}
      />

      <Stack.Screen
        name={navigationStrings.AvailableCoupons}
        component={AvailableCoupon}
        options={{
          headerShown: true,
          headerTintColor: 'black',
          headerTitle: 'Available Coupons',
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontSize: textScale(18),
            fontFamily: 'Poppins-Medium',
          },
        }}
      />

      <Stack.Screen
        name={navigationStrings.GroupCouponsDetail}
        component={GroupCouponsDetail}
        options={{
          headerShown: true,
          headerTintColor: 'black',
          headerTitle: 'Group Coupons',
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontSize: textScale(18),
            fontFamily: 'Poppins-Medium',
          },
        }}
      />
      <Stack.Screen
        name={navigationStrings.GroupCoupons}
        component={GroupCoupons}
        options={{
          headerShown: true,
          headerTintColor: 'black',
          headerTitle: 'Group Coupons',
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontSize: textScale(18),
            fontFamily: 'Poppins-Medium',
          },
        }}
      />
      <Stack.Screen
        name={navigationStrings.JoinGroup}
        component={JoinGroup}
        options={{
          headerShown: true,
          headerTintColor: 'black',
          headerTitle: 'Join A Group',
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontSize: textScale(18),
            fontFamily: 'Poppins-Medium',
          },
        }}
      />
      <Stack.Screen
        name={navigationStrings.MyVouchers}
        component={MyVoucherGroup}
        options={{
          headerShown: true,
          headerTintColor: 'black',
          headerTitle: 'My Vouchers',
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontSize: textScale(18),
            fontFamily: 'Poppins-Medium',
          },
        }}
      />
      <Stack.Screen
        name={navigationStrings.NewGallerySample}
        component={SampleContainer}
        options={{
          headerShown: true,
          headerTintColor: 'black',
          headerTitle: 'New Gallery Sample',
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontSize: textScale(18),
            fontFamily: 'Poppins-Medium',
          },
        }}
      />
      <Stack.Screen
        name={navigationStrings.MySubscriptionsDetail}
        component={MySubscriptionsDetail}
        options={{
          headerShown: true,
          headerTintColor: 'black',
          headerTitle: 'My Subscriptions',
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontSize: textScale(18),
            fontFamily: 'Poppins-Medium',
          },
        }}
      />

      <Stack.Screen
        name={navigationStrings.InstructorDetail}
        component={InstructorDetail}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={navigationStrings.Reviews}
        component={ReviewList}
        options={{
          headerShown: true,
          headerTintColor: 'black',
          headerTitle: 'Reviews',
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontSize: textScale(18),
            fontFamily: 'Poppins-Medium',
          },
        }}
      />

      {/* <Stack.Screen
        name={navigationStrings.CourseDiscount}
        component={CourseDiscount}
        options={{
          headerShown: true,
          headerTintColor: 'black',
          headerTitle: 'Available Offers',
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontSize: textScale(18),
            fontFamily: 'Poppins-Medium',
          },
        }}
      /> */}
    </>
  );
}

export default MainStack;
