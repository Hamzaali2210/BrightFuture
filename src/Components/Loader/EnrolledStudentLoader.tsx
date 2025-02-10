import React from "react";
import ContentLoader, { Rect } from "react-content-loader/native";
import { View } from "react-native";
import { height, moderateScale, textScale, width } from "../../styles/responsiveSize"; // Ensure these functions handle responsive scaling
import colors from "../../styles/colors";
import DeviceInfo from "react-native-device-info";

interface EnrolledStudentsProps {
  width?: number;
  x?: number;
  y?: number;
  x1?: number;
  x2?: number;
  y2?: number;
  y1?: number;
}

const EnrolledStudentsLoader: React.FC<EnrolledStudentsProps> = ({
  width = textScale(355),
  x = 0,
  x1 = 0,
  y = textScale(5),
  y1 = textScale(210),
  y2 = textScale(245),
  x2 = 0,
}) => {
  // Adjust height and width dynamically based on the screen size
  const adjustedWidth =DeviceInfo.isTablet() ? width : width / 1.1;
  const loaderHeight = textScale(190); // Adjust the height if needed

  return (
    <View style={{ flex: 1 }}>
      <ContentLoader
        speed={1}
        width={adjustedWidth}
        height={loaderHeight + textScale(70)} // Adjusting total height for all Rects
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <Rect x={x} y={y} rx="3" ry="3" width={adjustedWidth} height={loaderHeight} />
        <Rect x={x1} y={y1} rx="3" ry="3" width={adjustedWidth} height={textScale(20)} />
        <Rect x={x2} y={y2} rx="3" ry="3" width={adjustedWidth} height={textScale(20)} />
      </ContentLoader>
    </View>
  );
};

export default EnrolledStudentsLoader;
