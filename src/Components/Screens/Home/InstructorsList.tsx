import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { mainStrings } from '../../../constants/mainstrings';
import commonStyles from '../../../styles/commonStyles';
import { moderateScale, moderateScaleVertical, verticalScale } from '../../../styles/responsiveSize';
import HomeFeatHeading from '../../Layout/Typography/HomeFeatHeading';
import InstructorsItem from './InstructorsItem';

import navigationStrings from '../../../constants/navigationStrings';
import useGetData from '../../../hooks/useGetData';
import colors from '../../../styles/colors';
import { InstructorItemProps } from '../../../types/componentInterface';
import { endpoints } from '../../../utils/endpoints';

import { useDispatch } from 'react-redux';
import { InstructorListLoader } from '../../../redux/slice/loaderSlice';
import { InstructorType } from '../../../types/uiType';
import MyLoader from '../../Loader/RectangleLoader';

type instructorDataType = {
  data: Array<InstructorType>;
};

function Item({
  title,
  position,
  imgPath,
  style,
  reviews,
  avgRating,
  id,
  
}: InstructorItemProps) {
  return (
    <InstructorsItem
      title={title}
      position={position}
      imgPath={imgPath}
      style={style}
      reviews={reviews}
      avgRating={avgRating}
      id={id}
      
      home
    />
  );
}

const InstructorsList:React.FC<{again: number}> = ({again}) => {
  const {
    data: instructorData,
    isLoading,
    status,
    isFetching
  } = useGetData(`${endpoints.INSTRUCTOR}?per_page=10`, ['INSTRUCTOR',again]);

  const dispatch = useDispatch();

  const finalInstructorData: instructorDataType =
    instructorData as instructorDataType;

  console.log('finalInstructorDatafinal', finalInstructorData);

  const SAMPLE_IMAGE =
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  // if (isLoading) {
  //   return (
  //     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
  //       <Progress.Circle size={10} color={colors.theme} />
  //     </View>
  //   );
  // }

  useEffect(() => {
    if (status === 'pending') {
      dispatch(InstructorListLoader({loader: true}));
    } else if (status === 'success') {
      dispatch(InstructorListLoader({loader: false}));
    }
  }, [status]);

  if (status === 'pending'  ) {
    return (
      <>
        <MyLoader />
      </>
    );
  }

  return (
    <View style={[styles.container, commonStyles.spacingCommon]}>
      <HomeFeatHeading
        title={mainStrings.OurInstructors}
        routeName={navigationStrings.InstructorList}
        
      />
      <View
       style={[{marginBottom: moderateScaleVertical(16)}]}
       >
        <FlatList
          data={finalInstructorData?.data}
          renderItem={({item}) => (
            <Item
              id={item.id}
              title={item?.full_name}
              position={item?.instructor_role}
              // position={item?.instructorDepartments[0]?.department?.name}
              imgPath={item?.avatar || SAMPLE_IMAGE}
              style={{
                marginRight: moderateScale(8),
                // backgroundColor: colors.athensGray,
              }}

              reviews={item?.reviews_count}
              avgRating={item?.average_rating}
            />
          )}
          keyExtractor={item => `${item?.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

export default InstructorsList;

const styles = StyleSheet.create({
  container: {
    // marginTop: verticalScale(10),
    backgroundColor: colors.white,
  },
});
