import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import PreviousStudents from './PreviousStudents';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
  verticalScale,
} from '../../../styles/responsiveSize';
import colors from '../../../styles/colors';
import fontFamily from '../../../styles/fontFamily';
import {mainStrings} from '../../../constants/mainstrings';
import commonStyles from '../../../styles/commonStyles';
import CurrentStudent from './CurrentStudent';

interface HandleButtonChangeInterface{
  type:number;
  handleChange:()=>void;

}


const HandleButtonChange:React.FC<HandleButtonChangeInterface>=({type,handleChange})=>{
  return <View
        style={{
          flexDirection: 'row',
          marginVertical: verticalScale(12),
          justifyContent: 'center',
          gap: moderateScale(8),
        }}>
        <TouchableOpacity
          onPress={handleChange}
          style={[
            styles.badgeLabel,
            {
              backgroundColor: `${
                type === 0 ? colors.themeDark : colors.grey2
              }`,
            },
          ]}>
          <Text
            style={{
              fontFamily: fontFamily.Poppins_Medium,
              fontSize: textScale(14),
              color:`${
                type === 0 ? colors.grey2 : colors.themeDark
              }`,
            }}>
            {mainStrings.ActiveStudents}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={handleChange}
          style={[
            styles.badgeLabel,
            {
              backgroundColor: `${
                type === 1 ? colors.themeDark : colors.grey2
              }`,
            },
          ]}>
          <Text
            style={{
              fontFamily: fontFamily.Poppins_Medium,
              fontSize: textScale(14),
              color:`${
                type === 1 ? colors.grey2 : colors.themeDark
              }`,
            }}>
            {mainStrings.PreviousStudents}
          </Text>
        </TouchableOpacity>
      </View>
  
}


function MyStudents() {
  const [type, setType] = useState<number>(0);
  function handleChange(){
    if(type===0){
      setType(1)
    }else {
      setType(0)
    }
  }
  return (
    <View style={[commonStyles.spacingCommon]}>
      <HandleButtonChange type={type} handleChange={handleChange}/>
      
      
     {type===0?<CurrentStudent/>: <PreviousStudents />}
    </View>
  );
}

export default MyStudents;

const styles = StyleSheet.create({
  badgeLabel: {
    paddingVertical: moderateScaleVertical(10),
    paddingHorizontal: moderateScale(24),

    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(30),
  },
});
