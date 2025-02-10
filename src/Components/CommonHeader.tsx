import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import imagePath from '../constants/imagePath';
import {moderateScaleVertical} from '../styles/responsiveSize';

interface commonHeaderProps {
  onPressBack?: () => {};
}

const CommonHeader: FC<commonHeaderProps> = ({onPressBack}) => {
  return (
    <View style={styles.mainStyle}>
      <TouchableOpacity onPress={onPressBack}>
        <Image source={imagePath.ic_back} />
      </TouchableOpacity>
      <View style={{flex: 1}} />
    </View>
  );
};

export default CommonHeader;

const styles = StyleSheet.create({
  mainStyle: {flexDirection: 'row', marginBottom: moderateScaleVertical(10)},
});
