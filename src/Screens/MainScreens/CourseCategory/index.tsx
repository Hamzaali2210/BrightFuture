import {
  Animated,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React, { useState } from 'react';
  import {ParamListBase, useNavigation, useRoute} from '@react-navigation/native';
  import imagePath from '../../../constants/imagePath';
  
  import {CourseItem} from '../../../types/componentInterface';
  import colors from '../../../styles/colors';
  import {
    moderateScaleVertical,
    moderateScale,
    textScale,
    verticalScale,
  } from '../../../styles/responsiveSize';
  import commonStyles from '../../../styles/commonStyles';
  import SingleCourseList from '../../../Components/Screens/Courses/SingleCourseList';
  import CourseInput from '../../../Components/Screens/Courses/CourseInput';
  
  import FilterIcon from '../../../assets/images/Icons/fitler.svg';
  import navigationStrings from '../../../constants/navigationStrings';

  import Backbtn from '../../../assets/images/Icons/backBtnBlack.svg'
import { mainStrings } from '../../../constants/mainstrings';
import fontFamily from '../../../styles/fontFamily';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import useGetData from '../../../hooks/useGetData';
import { endpoints } from '../../../utils/endpoints';
import { SlideInDown, SlideInLeft } from 'react-native-reanimated';
import ProceddButton from '../../../Components/Layout/Button/ProceddButton';
  
type paramsType ={
    id:number,
    name:string,
}  
function CourseCategory() {
    
    const {params}=useRoute();
    const newData:paramsType= params as paramsType
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const [value, setValue] = useState('');

    const {
      data: getData,
      refetch: getDataAgain,
      isRefetching,
      status: getDataStatus,
      error: carterror,
    } = useGetData(`${endpoints.GET_CART}?order_type=${'Full'}`, [
      'GET_CART',
      
    ]);


    const handlePress=()=>{

        navigation.goBack();
    }

  const handleChange = (
    val: string,
  ) => {
    
    
    setValue(val as string);
  };
  const handleCancel = () =>{
    setValue('');
  }
    async function handleProceed() {
      
  
      try {
        navigation.navigate(navigationStrings.Cart);
      } catch (error) {
        
      }
    }
    return (
      <SafeAreaView style={[styles.container]}>
          <View style={[styles.headingContainer,commonStyles.spacingCommon]}>
          <TouchableOpacity style={{justifyContent:"center"}} onPress={handlePress}>
                <Backbtn width={moderateScaleVertical(50)} height={moderateScaleVertical(50)}/>
            </TouchableOpacity>
            <Text style={styles.textHeading}>
                  {newData.name} {mainStrings.Courses}
            </Text>
        </View>
        <View
          style={[
            commonStyles.spacingCommon,
            {
              marginBottom: moderateScaleVertical(16),
              flexDirection: 'row',
              gap: moderateScale(10),
            },
          ]}>
            
           
          <View style={{flex: 1}}>
            <CourseInput value={value} handleChange={handleChange} handleCancel={handleCancel}/>
          </View>
          {/* <TouchableOpacity
            onPress={() => {
              navigation.navigate(navigationStrings.Filter as never);
            }}>
            <FilterIcon />
          </TouchableOpacity> */}
        </View>
      
        <View
          style={[styles.container, commonStyles.spacingCommon]}>
           
          <SingleCourseList categoryId={newData?.id} categoryKey='INFINITE_CATEGORY' value={value} getDataAgain={getDataAgain}/>
        </View>

        {getData?.data?.id ? (
        <Animated.View
          onLayout={({nativeEvent}) => {
            const {height} = nativeEvent.layout;
          }}
          style={[styles.paymentContainer, commonStyles.spacingCommon]}
          entering={SlideInDown.duration(600)}
          exiting={SlideInLeft.duration(500)}>
          <ProceddButton
            price={'0'}
            chapter={getData?.data?.courses?.length}
            onPressBtn={handleProceed}
          />
        </Animated.View>
      ) : null}

       
      </SafeAreaView>
    );
  }
  
  export default CourseCategory;
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.white,
      flex:1
    },
    headingContainer:{
            marginVertical:moderateScaleVertical(20),
            flexDirection:"row",
            alignItems:"center",
            gap:moderateScale(12),
    },  
    textHeading:{
        fontFamily:fontFamily.Poppins_SemiBold,
        fontSize:moderateScaleVertical(16),
        color:colors.black,

    },
    paymentContainer: {
      backgroundColor: 'rgba(255,255,255,0.6)',
      height: moderateScaleVertical(120),
  
      width: '100%',
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      bottom: 0,
    },

  });
  