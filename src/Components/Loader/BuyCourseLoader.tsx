import React from "react";
import ContentLoader, { Rect, Circle } from "react-content-loader/native";
import { useWindowDimensions, View } from "react-native";
import { height, moderateScale, textScale } from "../../styles/responsiveSize";
import DeviceInfo from "react-native-device-info";

interface CourseLoaderProps {
  width?: number;
}

const BuyCourseLoader: React.FC<CourseLoaderProps> = ({
  width = moderateScale(355),
}) =>{
  const {width:windowWidth}=useWindowDimensions()
  return  (
  <View style={{ flex: 1 }}>
    <ContentLoader
      speed={1}
      width={DeviceInfo?.isTablet() ? windowWidth-40 : width / 1.1}
      height={height}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      {/* Course Image Banner */}
      {DeviceInfo?.isTablet()?
      <Rect x={0} y={0} rx="8" ry="8" width={windowWidth-30} height={moderateScale(250)} />
      :<Rect x={0} y={0} rx="8" ry="8" width={width} height={moderateScale(250)} />}

      {/* Course Title */}
      {/* {DeviceInfo?.isTablet()?
       <Rect x={0} y={0} rx="8" ry="8" width={windowWidth-30} height={moderateScale(250)} />
      :<Rect x={moderateScale(0)} y={moderateScale(255)} rx="3" ry="3" width={width-20} height={textScale(50)} />} */}
      {DeviceInfo.isTablet()?<Rect x={0} y={moderateScale(255)} rx="8" ry="8" width={windowWidth-30} height={textScale(50)} />:<Rect x={moderateScale(0)} y={moderateScale(255)} rx="3" ry="3" width={width-20} height={textScale(50)} />}
      {/* Instructor Profile */}
      {/* <Circle cx={moderateScale(35)} cy={moderateScale(200)} r={moderateScale(15)} /> */}
      {/* <Rect x={moderateScale(55)} y={moderateScale(190)} rx="3" ry="3" width={textScale(100)} height={textScale(15)} /> */}

      {/* Course Price */}
      {/* <Rect x={moderateScale(15)} y={moderateScale(230)} rx="3" ry="3" width={textScale(80)} height={textScale(30)} /> */}

      {/* Enroll Button */}
      {/* <Rect x={moderateScale(120)} y={moderateScale(230)} rx="20" ry="20" width={textScale(200)} height={textScale(40)} /> */}

      {/* Statistics (Chapters, Videos, Duration) */}
      {/* <Rect x={moderateScale(15)} y={moderateScale(280)} rx="3" ry="3" width={textScale(70)} height={textScale(20)} />
      <Rect x={moderateScale(105)} y={moderateScale(280)} rx="3" ry="3" width={textScale(70)} height={textScale(20)} />
      <Rect x={moderateScale(195)} y={moderateScale(280)} rx="3" ry="3" width={textScale(70)} height={textScale(20)} /> */}

      {/* Tab section (Chapters, Reviews, About) */}
    {DeviceInfo?.isTablet()?<>
      <Rect x={moderateScale(0)} y={moderateScale(320)} rx="3" ry="3" width={textScale(150)} height={textScale(30)} />
      <Rect x={textScale(170)} y={moderateScale(320)} rx="3" ry="3" width={textScale(150)} height={textScale(30)} />
      <Rect x={textScale(350)} y={moderateScale(320)} rx="3" ry="3" width={textScale(150)} height={textScale(30)} />
      {/* <Rect x={moderateScale(225)} y={moderateScale(320)} rx="3" ry="3" width={textScale(100)} height={textScale(20)} /> */}
    </>  :<>
    <Rect x={moderateScale(0)} y={moderateScale(320)} rx="3" ry="3" width={textScale(100)} height={textScale(20)} />
      <Rect x={moderateScale(115)} y={moderateScale(320)} rx="3" ry="3" width={textScale(100)} height={textScale(20)} />
      <Rect x={moderateScale(225)} y={moderateScale(320)} rx="3" ry="3" width={textScale(100)} height={textScale(20)} />
      </>}
     

      {/* Chapter List */}
      {!DeviceInfo?.isTablet()?
      <>
       <Rect x={moderateScale(0)} y={moderateScale(360)} rx="8" ry="8" width={width - moderateScale(30)} height={textScale(80)} />
      <Rect x={moderateScale(0)} y={moderateScale(360+80)} rx="8" ry="8" width={width - moderateScale(30)} height={textScale(80)} />
      <Rect x={moderateScale(0)} y={moderateScale(360+80+80)} rx="8" ry="8" width={width - moderateScale(30)} height={textScale(80)} />
      <Rect x={moderateScale(0)} y={moderateScale(360+80+80+80)} rx="8" ry="8" width={width - moderateScale(30)} height={textScale(80)} />
      <Rect x={moderateScale(0)} y={moderateScale(360+80+80+80+80)} rx="8" ry="8" width={width - moderateScale(30)} height={textScale(80)} />
      </>
     
    :
    <>
    <Rect x={0} y={moderateScale(360)} rx="8" ry="8" width={windowWidth-40} height={textScale(80)} />
   <Rect x={0} y={moderateScale(360+80)} rx="8" ry="8" width={windowWidth-40} height={textScale(80)} />
   <Rect x={0} y={moderateScale(360+80+80)} rx="8" ry="8" width={windowWidth-40} height={textScale(80)} />
   <Rect x={0} y={moderateScale(360+80+80+80)} rx="8" ry="8" width={windowWidth-40} height={textScale(80)} />
   <Rect x={0} y={moderateScale(360+80+80+80+80)} rx="8" ry="8" width={windowWidth-40} height={textScale(80)} />
   </>
    }
    </ContentLoader>
  </View>
)};

export default BuyCourseLoader;
