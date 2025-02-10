// import React from "react"
// import ContentLoader,{Rect} from "react-content-loader/native"


// interface MyLoaderInterface {
//    width?:number;
//    height?:number;
//    backgroundColor?:string;
//    foregroundColor?:string;
//    rectWidth?:number;
//    rectHeight?:number;
//    rectRX?:number;
//    rectRY?:number;
//    rectX?:number;
//    rectY?:number;
  
   
// }


// const MyLoader:React.FC<MyLoaderInterface> = ({
//    width=400,
//    height=180,
//    backgroundColor="#f3f3f3",
//    foregroundColor="#ecebeb",
//    rectWidth=350,
//    rectHeight=200,
//    rectRX=20,
//    rectRY=20,
//    rectX=10,
//    rectY=10,
// }) => (
//   <ContentLoader 
//     speed={10}
//     width={width}
//     height={height}
//     viewBox="0 0 400 160"
//     backgroundColor={backgroundColor}
//     foregroundColor={foregroundColor}
    
//   >
//     <Rect x="0" y="88" rx="3" ry="3" width="178" height="6" /> 
//     <Rect x="0" y="88" rx="3" ry="3" width="178" height="6" /> 
//     <Rect x={rectX} y={rectY} rx={rectRX} ry={rectRY} width={rectWidth} height={rectHeight} /> 
//   </ContentLoader>
// )

// export default MyLoader



// import React from "react";
// import ContentLoader,{Rect,Circle} from "react-content-loader/native";
// import colors from "../../styles/colors";

// const MyLoader = (props) => (
//     <ContentLoader 
//     speed={1}
//     width={400}
//     height={900}
//     viewBox="0 0 400 900"
//     backgroundColor="#f3f3f3"
//     foregroundColor="#ecebeb"
//     // {...props}
//   >
//     {/* Header */}
//     <Rect x="20" y="50" rx="4" ry="4" width="360" height="30" />
//     {/* Live Users */}
//     {/* <Circle cx="50" cy="100" r="30" />
//     <Circle cx="150" cy="100" r="30" />
//     <Circle cx="250" cy="100" r="30" />
//     <Circle cx="350" cy="100" r="30" /> */}
//     {/* Offers */}
//     <Rect x="20" y="100" rx="10" ry="10" width="360" height="180" />
//     {/* Categories */}
//     <Rect x="10" y="300" rx="10" ry="10" width="80" height="80" />
//     <Rect x="110" y="300" rx="10" ry="10" width="80" height="80" />
//     <Rect x="210" y="300" rx="10" ry="10" width="80" height="80" />
//     <Rect x="310" y="300" rx="10" ry="10" width="80" height="80" />
//     {/* All Courses */}
//     <Rect x="20" y="410" rx="10" ry="10" width="360" height="200" />
//     <Rect x="20" y="580" rx="10" ry="10" width="360" height="200" />
//     {/* Instructors */}
//     <Circle cx="50" cy="910" r="40" />
//     <Circle cx="150" cy="910" r="40" />
//     <Circle cx="250" cy="910" r="40" />
//     <Circle cx="350" cy="910" r="40" />
//   </ContentLoader>
// );

// export default MyLoader;



import React from "react";
import { Dimensions } from "react-native";
import ContentLoader, { Rect, Circle } from "react-content-loader/native";
import { moderateScale, moderateScaleVertical } from "../../styles/responsiveSize";

const { width, height } = Dimensions.get("window");

const isLargeScreen = width > 768; // Check if it's an iPad or large device

const MyLoader = (props) => (
  <ContentLoader
    speed={1}
    width={width} // Adjust dynamically based on screen size
    height={height}
    viewBox={`0 0 ${width} ${height}`} // Dynamically adjust the viewBox
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    {/* Header */}
    <Rect x={width * 0.05} y={50} rx="4" ry="4" width={width * 0.9} height="30" />
    <Circle  cx={width * 0.15} cy={isLargeScreen ? 1400 : 910} r={isLargeScreen ? 60 : 40} />
    <Circle cx={width * 0.4} cy={isLargeScreen ? 1400 : 910} r={isLargeScreen ? 60 : 40} />
    <Circle cx={width * 0.65} cy={isLargeScreen ? 1400 : 910} r={isLargeScreen ? 60 : 40} />
    <Circle cx={width * 0.9} cy={isLargeScreen ? 1400 : 910} r={isLargeScreen ? 60 : 40} />
    
    {/* Offers */}
    <Rect x={width * 0.05} y={100} rx="10" ry="10" width={width * 0.9} height={moderateScaleVertical(180)} />

    {/* Categories */}
    <Rect x={width * 0.05} y={moderateScaleVertical(300)} rx="10" ry="10" width={isLargeScreen ?moderateScaleVertical(138) : moderateScale(75)} height={isLargeScreen ?moderateScaleVertical(138) : moderateScale(75)} />
    <Rect x={width * 0.29} y={moderateScaleVertical(300)} rx="10" ry="10" width={isLargeScreen ?moderateScaleVertical(138) : moderateScale(75)} height={isLargeScreen ?moderateScaleVertical(138) : moderateScale(75)} />
    <Rect x={width * 0.52} y={moderateScaleVertical(300)} rx="10" ry="10" width={isLargeScreen ?moderateScaleVertical(138) : moderateScale(75)} height={isLargeScreen ?moderateScaleVertical(138) : moderateScale(75)} />
    <Rect x={width * 0.76} y={moderateScaleVertical(300)} rx="10" ry="10" width={isLargeScreen ?moderateScaleVertical(138) : moderateScale(75)} height={isLargeScreen ?moderateScaleVertical(138) : moderateScale(75)} />

    {/* All Courses */}
    <Rect x={width * 0.05} y={isLargeScreen ? moderateScale(340) : moderateScale(410)} rx="10" ry="10" width={width * 0.9} height={isLargeScreen ? moderateScale(300) : moderateScale(200)} />
    {/* <Rect x={width * 0.05} y={isLargeScreen ? 950 : 580} rx="10" ry="10" width={width * 0.9} height={isLargeScreen ? (300 ): 200} /> */}

    {/* Instructors */}
    {/* <Circle cx={width * 0.15} cy={isLargeScreen ? 1400 : 910} r={isLargeScreen ? 60 : 40} />
    <Circle cx={width * 0.4} cy={isLargeScreen ? 1400 : 910} r={isLargeScreen ? 60 : 40} />
    <Circle cx={width * 0.65} cy={isLargeScreen ? 1400 : 910} r={isLargeScreen ? 60 : 40} />
    <Circle cx={width * 0.9} cy={isLargeScreen ? 1400 : 910} r={isLargeScreen ? 60 : 40} /> */}
  </ContentLoader>
);

export default MyLoader;
