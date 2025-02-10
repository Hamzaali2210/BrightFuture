import {StyleSheet, Text, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import {PickerIOS} from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from '../../styles/responsiveSize';
import colors from '../../styles/colors';
import {CustomNativeDropdown} from '../../types/uiType';
import fontFamily from '../../styles/fontFamily';

const CustomNativeDropDownValue: React.FC<CustomNativeDropdown> = ({value,disable, defaultValue, isError,data,placeholder,handleChange,onDonePress}) => {
    const [dropdownData,setDropdownData]=useState([])
    console.log('datadatadatadatadatadatadatadatadatadatadata', data);

    useEffect(()=>{
                if(data?.length>0){
                    const dropData= data?.map((item:any)=>{

                        return {
                            value:item.id,
                            label:item.name,
                        }
                    })

                    setDropdownData(dropData)
                }
    },[])

    return (
    <RNPickerSelect
      onValueChange={handleChange}
      items={dropdownData}
      onDonePress={onDonePress}
      placeholder={placeholder}
      disabled={disable}
      useNativeAndroidPickerStyle={false}
      value={defaultValue}
      style={{
        viewContainer: {
          height: moderateScaleVertical(58),
          justifyContent: 'center',
          borderRadius: moderateScale(16),
          overflow: 'hidden',
          borderWidth: 0.5,
          borderColor:
            value !== ''
              ? colors.theme
              : isError
              ? colors.red
              : colors.blackOpacity25,
          marginVertical: moderateScaleVertical(10),
          flexDirection: 'row',
          alignItems: 'center',
        },
        inputAndroidContainer: {
          flex: 1,
          justifyContent: "center",
          paddingHorizontal: moderateScale(24),
          marginVertical: moderateScaleVertical(10),
          width: moderateScale(width-50),
          borderWidth: 0.5,
          height: moderateScaleVertical(58),
          borderRadius: moderateScale(16),
          borderColor:
            value !== ''
              ? colors.theme
              : isError
              ? colors.red
              : colors.blackOpacity25,


        },
        inputIOSContainer: {
          flex: 1,
          width: moderateScale(width-50),
          justifyContent: 'center',
          alignItems: 'center',
        },

        inputAndroid: {
          fontSize: textScale(16),
          color: colors.theme,
          fontFamily: fontFamily.Montserrat_Medium,
        },
        inputIOS: {
          fontSize: textScale(16),
          color: colors.theme,
          paddingHorizontal: moderateScale(20),
          fontFamily: fontFamily.Montserrat_Medium,
        },
      }}
    />
  );
};

export default CustomNativeDropDownValue;

const styles = StyleSheet.create({});
