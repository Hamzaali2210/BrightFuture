import {FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useEffect } from 'react';
import useGetData from '../../../hooks/useGetData';
import {showSuccess} from '../../../utils/helperFunctions';
import GroupCardLight from '../../../Components/Layout/Card/GroupCardLight';
import {
  height,
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../styles/responsiveSize';
import colors from '../../../styles/colors';
import fontFamily from '../../../styles/fontFamily';
import {endpoints} from '../../../utils/endpoints';
import commonStyles from '../../../styles/commonStyles';
import {useNavigation} from '@react-navigation/native';
import navigationStrings from '../../../constants/navigationStrings';
import ErrorBox from '../../../Components/ErrorBox';
import usePostData from '../../../hooks/usePostData';
import { useSelector } from 'react-redux';

const GroupCoupons = () => {
  const {status, data, error, refetch} = useGetData(`${endpoints.AVAILABLE_COUPONS}?coupon_type=1`, [
    'getcoupons',
  ]);
  const [refreshing, setRefreshing] = React.useState(false);
  const userData = useSelector((state: any) => state?.auth?.userPayload);

  const {mutate:addGroupMember,status:addGroupStatus} = usePostData(endpoints.ADD_GROUP,['ADD_GROUP'])

  const navigation = useNavigation<any>();

  console.log("datadatadatadatadatadatadatadata",data);
  


  if (status === 'success') {
    showSuccess('Coupons fetched');
  }

  if (status === 'error') {
    // showSuccess('error while fetching coupons');
  }

  useEffect(()=>{
    if (addGroupStatus === 'success') {
      showSuccess('A New Group Coupon Created');
      navigation.navigate(navigationStrings.MyVouchers);
    }
  
    else if (addGroupStatus === 'error') {
      showSuccess('error while fetching coupons');
    }
  },[addGroupStatus])
  const handleCreateAGroup = () => {};
  return (
    <View style={[commonStyles.spacing, {flex: 1,position:"relative"}]}>
       
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
                      height: moderateScaleVertical(height - 200),
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
            console.log("it's the dicscount in this and ther will be", item);
            
            
            return (
              <GroupCardLight
                member={item?.max_members}
                price={item?.discount_amount}
                type={item?.type}
                discountType={item?.discount_type}
                date={item?.expiry_date}
                createButtonChange={() => {
                  // navigation.navigate(navigationStrings.GroupCouponsDetail, {
                  //   couponID: item?.id,
                  // });

            let payload = {
              user_id:userData?.id,
              coupon_code:item?.code,
              is_owner:1,
          }
            
            addGroupMember(payload)
                }}

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
       <TouchableOpacity onPress={() =>{
        navigation.navigate(navigationStrings.GroupCouponsCustom as never)
       }} style={styles.addBtn}>
        <Text style={styles.addBtnText}>Create Group</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GroupCoupons;

const styles = StyleSheet.create({
  addBtn: {
    position: 'absolute',
    backgroundColor: colors.theme,
    padding: moderateScale(12),
    paddingHorizontal: moderateScale(16),
    borderRadius: moderateScale(100),
    bottom:
      height < 700 ? moderateScaleVertical(120) : moderateScaleVertical(40),
    right: moderateScale(20),
    borderWidth:3,
    borderColor:colors.themeDark
  },
  addBtnText: {
    fontFamily: fontFamily.Poppins_Medium,
    fontSize: textScale(14),
    color: colors.white,
  },
});
