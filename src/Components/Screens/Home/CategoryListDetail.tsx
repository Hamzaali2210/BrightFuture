import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {
  moderateScaleVertical,
  scale,
  width,
} from '../../../styles/responsiveSize';
import CoursesHomeItem from './CoursesHomeItem';
import {mainStrings} from '../../../constants/mainstrings';
import CategoryDetailItem from './CategoryDetailItem';
import {showError} from '../../../utils/helperFunctions';

import * as Progress from 'react-native-progress';
import useGetData from '../../../hooks/useGetData';
import {endpoints} from '../../../utils/endpoints';
import colors from '../../../styles/colors';
import {useNavigation} from '@react-navigation/native';
import navigationStrings from '../../../constants/navigationStrings';
import { useDispatch } from 'react-redux';
import { CategoryListLoader } from '../../../redux/slice/loaderSlice';
import BoxLoader from '../../Loader/BoxLoader';
import imagePath from '../../../constants/imagePath';
import EmptyScreen from '../../EmptyScreen';

function CategoryListDetail() {
  type ItemProps = {
    title: string;
    coverPhoto: string;
    handlePress: () => void;
  };
  

  const dispatch = useDispatch()
  const {data, isLoading, error, isError,status,isFetching} = useGetData(endpoints.CATEGORIES, [
    'CATEGORIES',
  ]);

  const navigation = useNavigation<any>();


  const categoryData: any = {catData: data, error: error};

  useEffect(() => {
    if (isError && error) {
      showError(categoryData?.error?.message);
    }
  }, [error]);

  useEffect(()=>{
    if(isLoading){
      dispatch(CategoryListLoader({loader:true}))
    }else if(status === 'success'){
          dispatch(CategoryListLoader({loader:false}))
    }
},[isLoading,status])



if(status === 'pending' || isFetching){
  return <>
        <BoxLoader rectX="20" rectY="20" rectRX="4" rectRY="4" rectWidth="300" rectHeight="30"/>
  </>
}


  const handlePress = (item: any) => {
    const data = {
      name: item?.name,
      id: item?.id,
    };

    navigation.navigate(navigationStrings.CourseCategory, data);
  };

  function Item({title, coverPhoto, handlePress}: ItemProps) {
    return (
      <CategoryDetailItem
        title={title}
        coverPhoto={coverPhoto}
        handlePress={handlePress}
        containerStyle={{width: width / 2.4, marginBottom: scale(16)}}
      />
    );
  }
  return (
    <View style={styles.container}>
      <FlatList
        numColumns={2}
        data={categoryData.catData?.data}
        scrollEnabled={!!categoryData.catData?.data?.length}
        ListEmptyComponent={() => {
          return (
            <EmptyScreen
              image={imagePath.catEmpty}
              heading={'Categories not found'}
              description={`Looks like you have not added anything to you cart yet. Go ahead & explore top categories.`}
            />
          );
        }}
        renderItem={({item}: any) => (
          <Item
            title={item.name}
            coverPhoto={item.cover}
            handlePress={() => handlePress(item)}
          />
        )}
      />
    </View>
  );
}

export default CategoryListDetail;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: moderateScaleVertical(20),
  },
});
