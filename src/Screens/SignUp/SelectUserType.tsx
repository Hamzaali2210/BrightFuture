import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import navigationStrings from '../../constants/navigationStrings';
import colors from '../../styles/colors';
import {moderateScale, textScale} from '../../styles/responsiveSize';
import imagePath from '../../constants/imagePath';
import {mainStrings} from '../../constants/mainstrings';
import commonStyles from '../../styles/commonStyles';

const SelectUserType = () => {
  const navigation = useNavigation<any>();
  const [userType, setUserType] = useState('');

  useEffect(() => {

    if (userType === 'student') {
      navigation.navigate(navigationStrings.SignIn,{type:"student"});
      setUserType("")
    } else if (userType === 'instructor') {
      navigation.navigate(navigationStrings.SignIn,{type:"instructor"});
      setUserType("")

    }
  }, [userType]);

  const handleUserType = (type: string) => {
    if (type === 'student') {
      setUserType('student');
    } else if (type === 'instructor') {
      setUserType('instructor');
    }
  };

  return (
    <View style={[styles.container]}>
      <View style={[styles.textContainer,commonStyles.spacingCommon]}>
      <Text style={[styles.heading]}>{mainStrings.headingType}</Text>
      <Text style={[styles.paragraph]}>{mainStrings.paragraphType}</Text>
        
      </View>
      <View style={[styles.typesContainer]}>
        <TouchableOpacity
          onPress={() => {
            handleUserType('instructor');
          }}>
          <View style={[styles.typeBox]}>
            <Image source={imagePath.Teacher} />
            <Text style={[styles.textType]}>{mainStrings.Teacher}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleUserType('student');
          }}>
          <View style={[styles.typeBox]}>
            <Image source={imagePath.Student} />
            <Text style={[styles.textType]}>{mainStrings.Student}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SelectUserType;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  textContainer: {
   flex:0.4,
   justifyContent:"flex-end",
   paddingVertical:textScale(20),
  },
  typesContainer: {
    flexDirection: 'row',
    gap: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',

  },
  typeBox: {
    width: moderateScale(150),
    height: moderateScale(150),
    borderRadius: moderateScale(10),
    gap:moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.themeDark,
  },
  textType:{
    fontFamily:"Poppins-SemiBold",
    fontSize:textScale(14),
    color:colors.white ,
 },
 heading:{
    fontSize:textScale(24),
    fontFamily:"Poppins-SemiBold",
    color:colors.themeDark
},
paragraph:{
    fontFamily:"Poppins-Medium",
    fontSize:textScale(14),
    color:colors.darkGrey


}

});
