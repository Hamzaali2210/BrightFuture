import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {showSuccess} from '../../../utils/helperFunctions';
import {useNavigation} from '@react-navigation/native';
import useGetData from '../../../hooks/useGetData';
import {endpoints} from '../../../utils/endpoints';
import fontFamily from '../../../styles/fontFamily';
import {textScale} from '../../../styles/responsiveSize';
import colors from '../../../styles/colors';
import GroupCardLight from '../../../Components/Layout/Card/GroupCardLight';
import navigationStrings from '../../../constants/navigationStrings';
import commonStyles from '../../../styles/commonStyles';
import ErrorBox from '../../../Components/ErrorBox';
import { getDate } from '../../../utils/logicFunctions';

const CourseDiscount = () => {
  const {status, data, error, refetch} = useGetData(endpoints.COUPONS, [
    'getcoupons',
  ]);
  const [refreshing, setRefreshing] = React.useState(false);
  const navigation = useNavigation<any>();
  console.log("data?.datadata?.datadata?.datadata?.datadata?.data", data?.data);
  


  if (status === 'success') {
    showSuccess('Coupons fetched');
  }

  if (status === 'error') {
    // showSuccess('error while fetching coupons');
  }
  return (
    <View style={[commonStyles.spacingCommon, {flex: 1}]}>
      {true ? (
        <FlatList
          data={data?.data}
          ListEmptyComponent={() => {
            return (
              <ErrorBox
                extraComp={
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      flex: 1,
                    }}>
                    <Text
                      style={{
                        fontFamily: fontFamily.Poppins_Medium,
                        fontSize: textScale(18),
                        color: colors.black,
                      }}>
                      NO{' '}
                      <Text
                        style={{
                          fontFamily: fontFamily.Poppins_Bold,
                          color: colors.themeDark,
                        }}>
                        COUPONS
                      </Text>{' '}
                      FOUND
                    </Text>
                  </View>
                }
              />
            );
          }}
          renderItem={({item}) => {
            console.log("item item in the course ",item);
            

            return (
              <GroupCardLight
                price={item?.discount_amount}
                type={'Course Discount'}
                dateInfo={getDate(item?.created_at, item.expiry_date)}
                courses={item?.courses_count}
                

                createButtonChange={() => {
                  
                  navigation.navigate(navigationStrings.CourseDiscountDetail, {
                    couponID: item?.id,
                  });
                }
              
              
              }
                
                colorsArr={['rgba(9, 78, 133, 0.07)', 'rgba(9, 78, 133, 0.07)']}
                btnLabel={'View Available courses'}

                // colorsArr={
                //   item?.backgroud_color
                //     ? [item?.backgroud_color, item?.backgroud_color]
                //     : ['#ebf1f5', '#ebf1f5']
                // }
              />
              // <>
              // {/* <GroupCoupons/> */}
              // <GroupCard />
              // </>
            );
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                refetch();
                if (status === 'success') setRefreshing(false);
                else if (status === 'error') setRefreshing(false);
              }}
            />
          }
        />
      ) : null}
    </View>
  );
};

export default CourseDiscount;

const styles = StyleSheet.create({});
