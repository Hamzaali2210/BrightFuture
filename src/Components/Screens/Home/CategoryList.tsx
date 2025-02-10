import React, {useEffect} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {mainStrings} from '../../../constants/mainstrings';
import commonStyles from '../../../styles/commonStyles';
import {moderateScale, moderateScaleVertical, textScale, width} from '../../../styles/responsiveSize';
import HomeFeatHeading from '../../Layout/Typography/HomeFeatHeading';
import CategoryItem from './CategoryItem';

import navigationStrings from '../../../constants/navigationStrings';
import useGetData from '../../../hooks/useGetData';
import {endpoints} from '../../../utils/endpoints';

import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {CategoryListLoader} from '../../../redux/slice/loaderSlice';
import {showError} from '../../../utils/helperFunctions';
import MyLoader from '../../Loader/RectangleLoader';
import colors from '../../../styles/colors';
import DeviceInfo from 'react-native-device-info';


const CategoryList:React.FC<{again: number}> = ({again}) => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  const {data, isLoading, error, isError, status,isFetching} = useGetData(
    endpoints.CATEGORIES,
    ['CATEGORIES',again],
  );



  console.log("datadatadatadatadatadatadatadatadatadata",data);
  

  const handlePress = item => {
    const data = {
      name: item?.name,
      id: item?.id,
    };

    navigation.navigate(navigationStrings.CourseCategory, data);
  };

  const categoryData: any = {catData: data, error: error};

  useEffect(() => {
    if (isError && error) {
      showError(categoryData?.error?.message);
    }
  }, [error]);

  useEffect(() => {
    if (isLoading) {
      dispatch(CategoryListLoader({loader: true}));
    } else if (status === 'success') {
      dispatch(CategoryListLoader({loader: false}));
    }
  }, [isLoading, status]);

  if (status === 'pending' || isFetching) {
    return (
      <>
        <MyLoader />
      </>
    );
  }

  return (
    <View style={[commonStyles.spacingCommon,{marginTop:moderateScale(12)}]}>
      <HomeFeatHeading
        title={mainStrings.Categories}
        tooltip
        tooltipContent={mainStrings.departmentsTooltip}
        // routeName={navigationStrings.CategoryList}
      />
      <View style={[styles.categoryList]}>
        {/* {categoryData.catData?.data?.slice(0, 4)?.map((item: any) => (
          <TouchableOpacity onPress={() => handlePress(item)}>
            <CategoryItem
              title={item.name}
              svgIcon={item?.icon}
              key={item.id}
            />
          </TouchableOpacity>
        ))} */}
        <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categoryData?.catData?.data || [] }
        // data={[1,2,3,4] }
        renderItem={({item})=>{
          return   <TouchableOpacity onPress={() => handlePress(item)}>
          <CategoryItem
            // title={item.name}
            svgIcon={item?.icon}
            key={item?.id}
          />
           <Text
      style={{
        fontFamily: 'Poppins-Regular',
        fontStyle: 'italic',
        color: colors.black,
        textAlign:"center",
        fontSize: DeviceInfo.isTablet()?textScale(9):textScale(12),
        marginTop: DeviceInfo.isTablet() ? moderateScaleVertical(6):moderateScaleVertical(3),
        paddingHorizontal:moderateScale(2),
      }}
      numberOfLines={1}>
      {item?.name}
    </Text>
        </TouchableOpacity>
        }}
        />
      </View>
    </View>
  );
}

export default CategoryList;

const styles = StyleSheet.create({
  categoryList: {
    // flexDirection: 'row',
    // marginTop: moderateScale(14),
    gap: moderateScale(20),
    // justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
});
