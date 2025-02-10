import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
View
} from 'react-native';

import CourseInput from '../../../Components/Screens/Courses/CourseInput';
import SingleCourseList from '../../../Components/Screens/Courses/SingleCourseList';
import colors from '../../../styles/colors';
import commonStyles from '../../../styles/commonStyles';
import {
moderateScale,
  moderateScaleVertical
} from '../../../styles/responsiveSize';

import FilterIcon from '../../../assets/images/Icons/fitler.svg';
import navigationStrings from '../../../constants/navigationStrings';
import HeaderCard from '../../../Components/Layout/Card/HeaderCard';
import { useSelector } from 'react-redux';
import Animated, { SlideInDown, SlideInLeft } from 'react-native-reanimated';
import ProceddButton from '../../../Components/Layout/Button/ProceddButton';
import useGetData from '../../../hooks/useGetData';
import { endpoints } from '../../../utils/endpoints';

function Courses() {
  const navigation = useNavigation<any>();
  const [value, setValue] = useState('');
  const [spaceBottom, setSpaceBottom] = useState<number>(0);

  const {
    data: getData,
    refetch: getDataAgain,
    isRefetching,
    status: getDataStatus,
    error: carterror,
  } = useGetData(`${endpoints.GET_CART}?order_type=${'Full'}`, [
    'GET_CART',

  ]);


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
      <View style={[commonStyles.spacingCommon]}>
      <HeaderCard
          title={'Courses'}
          right
          rightComponent={() => (
            <TouchableOpacity
            onPress={() => {
              navigation.navigate(navigationStrings.Filter as never);
            }}>
            <FilterIcon
              width={moderateScaleVertical(45)}
              height={moderateScaleVertical(45)}
            />
          </TouchableOpacity>
          )}
        />
      </View>

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
          <CourseInput value={value} handleChange={handleChange} handleCancel={handleCancel} />
        </View>

        {/* <TouchableOpacity
          onPress={() => {
            navigation.navigate(navigationStrings.Filter as never);
          }}>
          <FilterIcon />
        </TouchableOpacity> */}
      </View>
      <View style={[styles.container, commonStyles.spacingCommon]}>
        <SingleCourseList categoryKey="INFINITE_DATA" value={value} getDataAgain={getDataAgain} />
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
            price={0}
            contentType="main"
            chapter={getData?.data?.courses?.length}
            onPressBtn={handleProceed}
          />
        </Animated.View>
      ) : null}
    </SafeAreaView>
  );
}

export default Courses;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
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
