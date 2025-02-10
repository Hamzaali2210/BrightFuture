import React from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { useWindowDimensions } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const SimpleBoxLoader = () => {
  const { width } = useWindowDimensions();
  const isTablet = DeviceInfo.isTablet(); // Adjust based on your tablet breakpoint

  return (
    <ContentLoader 
      width={width - 40} // 20px padding on each side
      height={isTablet ? 120 : 80} // Adjust height for tablets vs phones
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      style={{ marginVertical: 10, alignSelf: 'center' }}
    >
      {/* Simple box */}
      <Rect x="0" y="0" rx="10" ry="10" width="100%" height="100%" />
    </ContentLoader>
  );
};

export default SimpleBoxLoader;
