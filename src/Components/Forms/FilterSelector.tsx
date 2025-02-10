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

const FilterSelector: React.FC<CustomNativeDropdown> = ({value, isError,data,placeholder,handleChange,viewContainerStyle}) => {
    const [dropdownData,setDropdownData]=useState([])
    console.log('loploploplop',data,dropdownData);
    
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
      placeholder={placeholder}
      
    
      useNativeAndroidPickerStyle={false}
      style={{
        viewContainer: {
          height: moderateScaleVertical(35),
          justifyContent: 'center',
          borderRadius: moderateScale(4),
          overflow: 'hidden',
          // borderWidth: 0.5,
          width:moderateScale(100),
          backgroundColor:colors.filterBlue,
          // borderColor:
          //   value !== ''
          //     ? colors.theme
          //     : isError
          //     ? colors.red
          //     : colors.blackOpacity25,
          marginVertical: moderateScaleVertical(10),
          flexDirection: 'row',
          alignItems: 'center',
         
          ...viewContainerStyle
        },
        inputAndroidContainer: {
          flex: 1,
          justifyContent:"center",
        //   paddingHorizontal: moderateScale(24),
          marginVertical: moderateScaleVertical(10),
          width: moderateScale(width-50),
          // borderWidth: 0.5,
          backgroundColor:colors.filterBlue,
          height: moderateScaleVertical(58),
          
          borderRadius: moderateScale(16),
          // borderColor:
          //   value !== ''
          //     ? colors.theme
          //     : isError
          //     ? colors.red
          //     : colors.blackOpacity25,
          
          
        },
        inputIOSContainer: {
        //   flex: 1,
          justifyContent: 'center',
          backgroundColor:colors.filterBlue,

         
        },

        inputAndroid: {
          fontSize: textScale(12),
          color: colors.black,
          fontFamily: fontFamily.Montserrat_Medium,
          backgroundColor:colors.filterBlue,
          

        },
        inputIOS: {
          fontSize: textScale(12),
          color: colors.black,
          paddingHorizontal: moderateScale(20),
          fontFamily: fontFamily.Montserrat_Medium,
        },
      }}
    />
  );
};

export default FilterSelector;

const styles = StyleSheet.create({});
