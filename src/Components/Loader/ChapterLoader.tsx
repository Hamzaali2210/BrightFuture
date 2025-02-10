import React from "react";
import ContentLoader, { Rect, Circle } from "react-content-loader/native";
import { useWindowDimensions, View } from "react-native";
import { height, moderateScale, textScale } from "../../styles/responsiveSize";
import DeviceInfo from "react-native-device-info";

interface CourseLoaderProps {
  width?: number;
}

const ChapterLoader: React.FC<CourseLoaderProps> = ({
  width = textScale(355),
}) =>{
  const {width:windowWidth} = useWindowDimensions()

  return  (
  <View style={{ flex: 1 }}>
    <ContentLoader
      speed={1}
      width={DeviceInfo.isTablet() ? windowWidth : width / 1.1}
      height={height}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
   
      {/* Chapter List */}
      <Rect x={moderateScale(12)} y={moderateScale(0)} rx="12" ry="12" width={windowWidth - moderateScale(60)} height={textScale(80)} />
      <Rect x={moderateScale(12)} y={moderateScale(0+80)} rx="12" ry="12" width={windowWidth - moderateScale(60)} height={textScale(80)} />
      <Rect x={moderateScale(12)} y={moderateScale(0+80+80)} rx="12" ry="12" width={windowWidth - moderateScale(60)} height={textScale(80)} />
      <Rect x={moderateScale(12)} y={moderateScale(0+80+80+80)} rx="12" ry="12" width={windowWidth - moderateScale(60)} height={textScale(80)} />
      <Rect x={moderateScale(12)} y={moderateScale(0+80+80+80+80)} rx="12" ry="12" width={windowWidth - moderateScale(60)} height={textScale(80)} />
    </ContentLoader>
  </View>
)};

export default ChapterLoader;
