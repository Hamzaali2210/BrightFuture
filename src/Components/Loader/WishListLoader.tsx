import React from "react"
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native"
import { height, moderateScale, moderateScaleVertical, width } from "../../styles/responsiveSize"
import colors from "../../styles/colors"
import { View } from "react-native"

const WishlistLoader = (props) => (
    <View style={{flex:1,width:width}}>
  <ContentLoader
    speed={1}
    width={width}
    height={height}
    // viewBox="0 0 419 311"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <Rect x={moderateScale(12)} y={moderateScale(5)} rx="6" ry="6" width={width/2.2} height={moderateScaleVertical(190)} />
    <Rect x={width/2} y={moderateScaleVertical(5)} rx="6" ry="6" width={width/2.2}  height={moderateScaleVertical(190)} />
    <Rect x={moderateScale(12)} y={moderateScaleVertical(190)} rx="6" ry="6" width={width/2.2} height={moderateScaleVertical(190)} />
    <Rect x={width/2} y={moderateScaleVertical(190)} rx="6" ry="6" width={width/2.2}  height={moderateScaleVertical(190)} />
    <Rect x={moderateScale(12)} y={moderateScaleVertical(375)} rx="6" ry="6" width={width/2.2} height={moderateScaleVertical(190)} />
    <Rect x={width/2} y={moderateScaleVertical(375)} rx="6" ry="6" width={width/2.2}  height={moderateScaleVertical(190)} />
    <Rect x={moderateScale(12)} y={moderateScaleVertical(560)} rx="6" ry="6" width={width/2.2} height={moderateScaleVertical(190)} />
    <Rect x={width/2} y={moderateScaleVertical(560)} rx="6" ry="6" width={width/2.2}  height={moderateScaleVertical(190)} />
  </ContentLoader>
  {/* <ContentLoader
    speed={1}
    width={width}
    height={height}
    // viewBox="0 0 419 311"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <Rect x={moderateScale(12)} y={moderateScale(5)} rx="6" ry="6" width={width/2.2} height={moderateScaleVertical(190)} />
    <Rect x={width/2} y={moderateScaleVertical(5)} rx="6" ry="6" width={width/2.2}  height={moderateScaleVertical(190)} />
  </ContentLoader> */}
  {/* <ContentLoader
    speed={1}
    width={600}
    height={height}
    // viewBox="0 0 484 311"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <Rect x="20" y="11" rx="3" ry="3" width="166" height="195" />
    <Rect x="197" y="13" rx="0" ry="0" width="167" height="195" />
  </ContentLoader> */}
</View>

)

export default WishlistLoader

