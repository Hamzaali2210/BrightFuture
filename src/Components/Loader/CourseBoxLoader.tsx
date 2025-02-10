import React from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { useWindowDimensions } from 'react-native';
import { moderateScale, moderateScaleVertical } from '../../styles/responsiveSize';
import DeviceInfo from 'react-native-device-info';

const CourseBoxLoader = () => {
  const { width } = useWindowDimensions();
//   const isTablet = width > 600; // Adjust based on your tablet breakpoint
  const isTablet = DeviceInfo.isTablet(); // Adjust based on your tablet breakpoint

  return (
    <ContentLoader 
      width={width - 40} // 20px padding on each side
      height={isTablet ? moderateScaleVertical(320) : moderateScaleVertical(280)} // Adjust height for tablets vs phones
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      style={{ marginVertical: 10, alignSelf: 'center' }}
    >
      {/* Simple box */}
      <Rect x="0" y="0" rx="10" ry="10" width="100%" height="100%" />
    </ContentLoader>
  );
};

export default CourseBoxLoader;
