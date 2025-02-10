import {FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CoursesHomeItem from '../Home/CoursesHomeItem';
import {mainStrings} from '../../../constants/mainstrings';
import {moderateScale, scale, width} from '../../../styles/responsiveSize';
import commonStyles from '../../../styles/commonStyles';
import colors from '../../../styles/colors';
import useGetData from '../../../hooks/useGetData';
import {endpoints} from '../../../utils/endpoints';

import * as Progress from 'react-native-progress';
import fontFamily from '../../../styles/fontFamily';

import {wishlistType} from '../../../types/uiType';
import {useFocusEffect, useIsFocused, useNavigation} from '@react-navigation/native';
import navigationStrings from '../../../constants/navigationStrings';
import usePostData from '../../../hooks/usePostData';
import useDeleteData from '../../../hooks/useDeleteData';
import {showError, showSuccess} from '../../../utils/helperFunctions';
import {err} from 'react-native-svg';
import {useDispatch, useSelector} from 'react-redux';
import {IsWishlistTagData} from '../../../redux/slice/tagSlice';
import ErrorBox from '../../ErrorBox';
import WishlistLoader from '../../Loader/WishListLoader';
import EmptyScreen from '../../EmptyScreen';
import imagePath from '../../../constants/imagePath';

type wishlistDataType = {
  data: Array<wishlistType>;
};

type ItemProps = {
  title: string;
  subject: string;
  price: number;
  discountPrice: number;
  rating: string;
  isFavorite: boolean;
  handleFavorite: () => void;
  image:string;
  code?:number
  itemId?:string
  refetch:()=>void
};

function Item({
  title,
  subject,
  price,
  rating,
  discountPrice,
  isFavorite,
  handleFavorite,
  image,
  code,
  refetch,
  itemId,
  // courseCode,
}: ItemProps) {
  return (
    <CoursesHomeItem
      title={title}
      discountPrice={discountPrice}
      subject={subject}
      price={price}
      rating={rating}
      isFavorite={isFavorite}
      handleFavorite={handleFavorite}
      imageCover={image}
      itemId={itemId}
      courseCode={code}
      fromWishlist={true}
      refetch={refetch}

      containerStyle={{width: width / 2.2, margin: moderateScale(8)}}
    />
  );
}
const Wishlist = () => {
  const tag = useSelector((state: any) => state.tag.wishlistTag);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const focused = useIsFocused()
  console.log("focusedfocusedfocusedfocusedfocusedfocusedfocusedfocused", focused);

  const dispatch = useDispatch();
  IsWishlistTagData;
  const navigation = useNavigation<any>();
  const {data: wishlistData, isLoading,status,refetch,isRefetching} = useGetData(
    endpoints.STUDENT_WISHLIST,
    ['STUDENT_WISHLIST', ...tag,focused],
  );



  const {
    mutate: wishlistDataDelete,
    isSuccess: wishlistDeleteSuccess,
    error,
    isError: errorWishlist,
    data: DeleteSuccessData,
  } = usePostData(
    endpoints.STUDENT_WISHLIST,
    ['STUDENT_WISHLIST_DELETE'],
    'delete',
  );

  useEffect(() => {
    if (wishlistDeleteSuccess) {
      dispatch(IsWishlistTagData({tag: [...tag, `tag${Math.random()}`]}));

      showSuccess('Course removed from Wishlist Successfully');
    } else if (errorWishlist) {
      showError(error?.message);
    }
  }, [wishlistDeleteSuccess, error]);

  const handlePress = (item: any) => {
    navigation.navigate(navigationStrings.BuyCourse, {
      CourseId: item?.id,
    });
  };

  const handleFavorite = (item: any) => {

    console.log("itemitemitemitemitemitemitemitemitemitem", item);

    return
    wishlistDataDelete({id: item?.id});
  };

  const onRefresh = () => {
    setRefreshing(true);
    refetch();
  };


  useEffect(() => {
    if (!isRefetching) {
      setRefreshing(false);
    }
  }, [isRefetching]);

  const finalWishlistData = wishlistData as any;

  if (isLoading || isRefetching) {
    return (
      <View style={{ display: 'flex', alignItems: 'center'}}>
        {/* <Progress.Circle size={80} color={colors.themeDark} indeterminate /> */}
        <WishlistLoader />
      </View>
    );
  }
  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: colors.white,
        flex: 1,
        justifyContent: 'center',
      }}>
      {true ? (
        <FlatList
          numColumns={2}
          data={finalWishlistData?.data}
          scrollEnabled={!!finalWishlistData?.data?.length}
          ListEmptyComponent={() => {
            return (
              <EmptyScreen
                image={imagePath.wishEmpty}
                heading={'Your wishlist is empty'}
                description={`Looks like you have not added anything to you cart yet. Go ahead & explore top categories.`}
              />
            );
          }}
          refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          renderItem={({item}) => {
            return (
              <TouchableOpacity onPress={() => handlePress(item)}>
                <Item
                  handleFavorite={() => {
                    // console.log('handleFavoritehandleFavoritehandleFavoritehandleFavoritehandleFavorite',item);

                    handleFavorite(item);
                  }}
                  title={item?.name}
                  subject={item?.instructor?.full_name}
                  price={item?.full_price}
                  discountPrice={item?.discounted_price}
                  rating={item?.rating || '4.8'}
                  isFavorite={item?.is_favourite}
                  image={item?.image}
                  code={item?.code}
                  itemId={item?.id}
                  refetch={refetch}
                />
              </TouchableOpacity>
            );
          }}
        />
      ) : null}
    </View>
  );
};

export default Wishlist;

const styles = StyleSheet.create({});
