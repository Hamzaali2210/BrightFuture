import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';


import CourseInput from '../../../Components/Screens/Courses/CourseInput';
import colors from '../../../styles/colors';
import commonStyles from '../../../styles/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
  width
} from '../../../styles/responsiveSize';

import MyCourse from '../../../Components/Screens/Courses/MyCourse';
import fontFamily from '../../../styles/fontFamily';


import ShareIcon from 'react-native-vector-icons/Entypo';
import FilterSelector from '../../../Components/Forms/FilterSelector';
import SingleCourseList from '../../../Components/Screens/Courses/SingleCourseList';



function MyCourses() {
  const navigation = useNavigation();
  const selectedTab: Array<{id: number; label: string}> = [
    {
      id: 0,
      label: 'University',
    },
    {
      id: 1,
      label: 'Department',
    },
    {
      id: 2,
      label: 'Courses',
    },
  ];

  console.log("123435435123435435123435435123435435123435435",width);
  

  const handleAddCourse = () => {
    const payUrl = "https://demo.myfatoorah.com/En/KWT/PayInvoice/Details/050723386398704363-ee6037d4"
    const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(payUrl)}`;
    // navigation.navigate(navigationStrings.AddCourse as never);
    if (Platform.OS === 'ios') {
      Linking.openURL(payUrl);
    } else {
      Linking.openURL(payUrl);
    }
  };
  const [value, setValue] = useState('');

  const handleChange = (e: string) => {
    setValue(e);
  };
  const handleCancel = () => {
    setValue('');
  };

  return (
    <View style={[styles.container]}>
      <View
        style={[
          commonStyles.spacingCommon,
          {
            marginTop: moderateScaleVertical(16),
            flexDirection: 'row',
            gap: moderateScale(10),
          },
        ]}>
        <View style={{flex: 1}}>
     
             {/* <View style={[styles.courseContainer]}>
          {selectedTab.map((item, index) => {
            return (
              <>
                <View
                  // onPress={() => setSelected(item.id)}
                  style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Text
                    style={{
                      fontFamily: fontFamily.Poppins_Regular,
                      fontSize: textScale(12),
                      color:colors.white,
                      textAlign: 'center',
                    }}>
                    {item.label}
                  </Text>
                </View>
                <View
                  style={[
                    {
                      width: selectedTab.length - 1 !== index ? 1 : 0,
                      backgroundColor: '#9F9F9F',
                      height: '100%',
                    },
                  ]}
                />
              </>
            );
          })}
        </View> */}
        {(
          <>
            {/* <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: moderateScale(6),
              }}>
              <FilterSelector
                viewContainerStyle={{width: width / 3.4}}
                handleChange={() => {}}
                placeholder={{
                  label: 'University',
                  value: null,
                }}
                data={[
                  {name: 'uni', id: 'AUK'},
                  {name: 'name', id: 'AaUK'},
                  {name: 'unasdasdi', id: 'AarUK'},
                ]}
              />
              <FilterSelector
                viewContainerStyle={{width: width / 3.4}}
                handleChange={() => {}}
                placeholder={{
                  label: 'Department',
                  value: null,
                }}
                data={[
                  {name: 'uni', id: 'AUK'},
                  {name: 'name', id: 'AaUK'},
                  {name: 'unasdasdi', id: 'AarUK'},
                ]}
              />
              <FilterSelector
                viewContainerStyle={{width: width / 3.4}}
                handleChange={() => {}}
                placeholder={{
                  label: 'Courses',
                  value: null,
                }}
                data={[
                  {name: 'uni', id: 'AUK'},
                  {name: 'name', id: 'AaUK'},
                  {name: 'unasdasdi', id: 'AarUK'},
                ]}
              />
            </View> */}
           
          </>
        )}
        </View>
        {/* <TouchableOpacity
          onPress={() => {
            navigation.navigate(navigationStrings.Filter as never);
          }}>
          <FilterIcon />
        </TouchableOpacity> */}
      </View>
      <View style={[commonStyles.spacingCommon]}>
            <CourseInput value={value} handleChange={handleChange} handleCancel={handleCancel}/>
      </View>
      <View style={[styles.container, commonStyles.spacingCommon]}>
        {/* <SingleCourseList value={value}/> */}
        <MyCourse value={value} />
      </View>
      {/* <TouchableOpacity onPress={handleAddCourse} style={styles.addBtn}>
        <ShareIcon size={moderateScale(20)} color={colors.white} name='share'/>
        <Text style={styles.addBtnText}>Share</Text>
      </TouchableOpacity> */}
    </View>
  );
}

export default MyCourses;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    position: 'relative',
    flex: 1,
  },
  addBtn: {
    position: 'absolute',
    backgroundColor: colors.themeDark,
    padding: moderateScale(12),
    paddingHorizontal: moderateScale(16),
    borderRadius: moderateScale(100),
    bottom: moderateScaleVertical(20),
    right: moderateScale(20),
    flexDirection:"row",
    gap:moderateScale(10),
  },
  addBtnText: {
    fontFamily: fontFamily.Poppins_Medium,
    fontSize: textScale(14),
    color: colors.white,
  },
  courseContainer: {
    backgroundColor: colors.theme,
    borderRadius: moderateScale(8),
  
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(12),
    marginVertical: moderateScale(6),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
