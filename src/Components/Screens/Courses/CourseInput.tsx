import React from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import CrossIcon from '../../../assets/images/Icons/close.svg';
import SearchIcon from '../../../assets/images/Icons/search.svg';
import colors from '../../../styles/colors';
import commonStyles from '../../../styles/commonStyles';
import fontFamily from '../../../styles/fontFamily';
import {
  moderateScale,
  moderateScaleVertical,
  scale,
  textScale,
} from '../../../styles/responsiveSize';
import DeviceInfo from 'react-native-device-info';


interface CourseInputProps{
  value:string;
  handleChange:(e:string)=>void;
  handleCancel:()=>void;
  placeholder?:string
}

const CourseInput:React.FC<CourseInputProps>=({value,handleChange,handleCancel,placeholder="Search Course"})=> {
  return (
    <View style={[commonStyles.spacingCommon, styles.container]}>
      <SearchIcon />
      <View style={{ flex: 1 }}>
        <TextInput
          placeholder={placeholder}
          onChangeText={handleChange}
          value={value}
          placeholderTextColor={colors.grey1}
          style={{
            marginLeft: moderateScale(12),
            fontFamily: fontFamily.Poppins_Regular,
            color:colors.black,
            fontSize:DeviceInfo.isTablet()?textScale(10): textScale(14),
          }}
        />
      </View>

      <TouchableOpacity onPress={handleCancel}>
        <CrossIcon width={moderateScaleVertical(14)} height={moderateScaleVertical(14)}/>
      </TouchableOpacity>

      
    </View>
  );
}

export default CourseInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0F0F0',
    paddingVertical: moderateScaleVertical(18),
    borderRadius: moderateScaleVertical(10),
    height: moderateScaleVertical(55),
    flexDirection: 'row',
    alignItems: 'center',
  },
});
