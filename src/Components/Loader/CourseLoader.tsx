import React from "react"
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native"
import { height, moderateScale, moderateScaleVertical, textScale, width } from "../../styles/responsiveSize"
import colors from "../../styles/colors"
import { useWindowDimensions, View } from "react-native"
import DeviceInfo from "react-native-device-info"


interface CourseLoaderProps{
    width?:number;
  x?:number;
y?:number;
x1?:number;
x2?:number;
y2?:number;
y1?:number;
}


const CourseLoader:React.FC<CourseLoaderProps> = ({
  width=textScale(355),
  x=0,x1=0,y=textScale(5),y1=textScale(210),y2=textScale(245),x2=0

}) =>{ 
  const {width:windowWidth,height:windowHeight}=useWindowDimensions()
  return  (
    <View style={{flex:1}}>
<ContentLoader 
    speed={1}
    width={DeviceInfo?.isTablet()?windowWidth:width/1.1}
    height={height}
    // viewBox={`0 0 ${width} ${height}`}
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    // {...props}
  >
 {DeviceInfo?.isTablet()?   <>
      <Rect x={0} y={y} rx="3" ry="3" width={windowWidth/2-90} height={textScale(190)} /> 
      <Rect x={windowWidth/2-40} y={y} rx="3" ry="3" width={windowWidth/2-90} height={textScale(190)} /> 
    {/* <Rect x={0} y={y1} rx="3" ry="3" width={windowWidth-100} height={textScale(20)} />
    <Rect x={0} y={y2} rx="3" ry="3" width={windowWidth-100} height={textScale(20)} /> */}
    </>:
    <>
    <Rect x={x} y={y} rx="3" ry="3" width={width} height={textScale(190)} /> 
    <Rect x={x1} y={y1} rx="3" ry="3" width={width} height={textScale(20)} />
    <Rect x={x2} y={y2} rx="3" ry="3" width={width} height={textScale(20)} />
    </>
    }
 
  </ContentLoader>
</View>
    
)}

export default CourseLoader

