import React from 'react';
import ContentLoader, {Rect} from 'react-content-loader/native';
import {View, ViewStyle} from 'react-native';
import { moderateScale, moderateScaleVertical } from '../../styles/responsiveSize';

interface MyLoaderInterface {
  width?: number | string;
  height?: number | string;
  backgroundColor?: string;
  foregroundColor?: string;
  rectWidth?: number | string;
  rectHeight?: number | string;
  rectRX?: number | string;
  rectRY?: number | string;
  rectX?: number | string;
  rectY?: number | string;
  viewStyle?: ViewStyle;
}

const BoxLoader: React.FC<MyLoaderInterface> = ({
  width = moderateScale(20),
  height = moderateScaleVertical(20),
  backgroundColor = '#f3f3f3',
  foregroundColor = '#ecebeb',
  rectWidth = moderateScale(20),
  rectHeight = moderateScale(20),
  rectRX = moderateScale(20),
  rectRY = moderateScale(20),
  rectX = 0,
  rectY = 0,
  viewStyle = {},
}) => (
  <View style={[viewStyle]}>
    <ContentLoader
      speed={2}
      width={width}
      height={height}
      // viewBox="0 0 400 160"
      backgroundColor={backgroundColor}
      foregroundColor={foregroundColor}>
      <Rect
        x={rectX}
        y={rectY}
        rx={rectRX}
        ry={rectRY}
        width={rectWidth}
        height={rectHeight}
      />
    </ContentLoader>
  </View>
);

export default BoxLoader;
