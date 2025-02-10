import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import dayjs from 'dayjs';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import imagePath from '../../../constants/imagePath';
import navigationStrings from '../../../constants/navigationStrings';
import colors from '../../../styles/colors';
import fontFamily from '../../../styles/fontFamily';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from '../../../styles/responsiveSize';
import DeviceInfo from 'react-native-device-info';

interface MySubscriptionsCardInterface {
  courseListShow?: boolean;
  progress: SharedValue<number>;
  index: number;
  isLocked?:boolean;
  data: any;
}

const MySubscriptionsCard: React.FC<MySubscriptionsCardInterface> = ({
  courseListShow,
  progress,
  index,
  isLocked,
  data,
}) => {
  console.log('courseListShowcourseListShowcourseListShowcourseListShow', data);

  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      progress.value,
      [index - 1, index, index + 1],
      [0.8, 1, 0.8],
      'clamp',
    );

    return {
      transform: [{scale}],
    };
  });
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const handleDetail = () => {
    // navigation.navigate(navigationStrings.MySubscriptionsDetail)
  };
  const handleCancelDetail = () => {
    navigation.navigate(navigationStrings.CancelUpgrade);
  };

  const handleDowngrade = () => {
    navigation.navigate(navigationStrings.Downgrade);
  };

  return (
    <View style={[styles.cardContainer]}>
      <View style={styles.absPosition}>
        <Image source={imagePath.subsCardBlue} resizeMode="contain" 
        style={{width:"100%",height:"100%"}}
        // style={{width:moderateScale(200),height:moderateScale(200)}} 
        />
      </View>
      <View style={[styles.flexContainer]}>
        <View style={[styles.textContainer]}>
          <Text style={[styles.textCourse]}>
            {data?.purchased_courses?.length} Courses
          </Text>
          <Text style={[styles.textPrice]}>{data?.order_total}KD</Text>
          <Text style={[styles.textPurchased]}>
            purchased : {dayjs(data?.created_at).format('DD MMMM YYYY')}
          </Text>
        </View>
        <View
          style={[
            styles.textContainer,
            {gap: 10, flex: 1, alignItems: 'flex-end'},
          ]}>
          <View style={[styles.flexContainer, {gap: 10}]}>
            {/* <View style={[styles.label]}>
              <Text style={[styles.labelText]}>Online</Text>
            </View> */}
            <View
              style={[
                styles.label,
                {flexDirection: 'row', alignItems: 'center'},
                {
                  backgroundColor:
                    isLocked && 
                    data?.payment_type !== 'full'
                      ? '#FF9E0C'
                      : '#0DD015',
                  position: 'relative',
                  left: '7%',
                  gap: 2,
                  overflow: 'hidden',
                  width: moderateScale(93),
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                },
              ]}>
              {isLocked &&
              data?.payment_type !== 'full' ? (
                <Image source={imagePath.clockWhite} resizeMode='contain' />
              ) : null}
              <Text
                style={[
                  styles.labelText,
                  {fontFamily: fontFamily.Poppins_Medium},
                ]}>
                {
                (isLocked && data?.payment_type !== 'full')
                  ? 'Pending'
                  : 'Active'}
              </Text>
            </View>
          </View>
          <View style={[styles.dateContainer]}>
            <View style={[styles.flexContainer, {justifyContent: 'flex-end'}]}>
              <Text style={[styles.textPurchased]}>
                Payment Type : {data?.payment_type}
              </Text>
              {/* <CareIcon name="caretdown" color={colors.white} /> */}
            </View>
            {data?.payment_type !== 'full' && (
              <Text style={[styles.textPurchased]}>
                Renew Date : {dayjs(data?.due_date).format('DD MMM YYYY')}
              </Text>
            )}
          </View>
        </View>
      </View>
      <View style={[styles.flexContainer, {marginTop: moderateScale(0)}]}>
        {/* {courseListShow && <FlatList
          data={[1, 2, 3, 4, 5]}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={() => {
            return (
              <View style={[styles.imgContainer]}>
                <View style={[styles.imgBox]}>
                  <Image
                    style={{width: '100%', height: '100%'}}
                    source={{
                      uri: 'https://images.unsplash.com/photo-1576091358783-a212ec293ff3?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                    }}
                  />
                </View>
                <Text style={[styles.imgText]}>
                  {'Group Coupon Applied'.slice(0, 10)}..
                </Text>
              </View>
            );
          }}
        />} */}
      </View>

{/* <View style={{width:"100%"}}>
<Image
        source={imagePath.lineImage}
        resizeMode="cover"
        style={{marginVertical: moderateScaleVertical(8),width:width}}
      />
</View> */}
    

      {data?.payment_type === 'full' && !isLocked ? (
        <View style={[styles.flexContainer, styles.btnContainer,{marginTop:moderateScale(20)}]}>
          
          {/* <TouchableOpacity
            style={[styles.bigBtn]}
            onPress={() => {
              navigation.navigate(navigationStrings.Upgrade);
            }}>
            <Text style={[styles.labelText]}>Upgrade</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.bigBtn, {backgroundColor: 'white'}]}
            onPress={handleDowngrade}>
            <Text style={[styles.labelText, {color: colors.black}]}>
              Downgrade
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.bigBtn, {backgroundColor: 'white'}]}
            onPress={handleCancelDetail}>
            <Text style={[styles.labelText, {color: colors.black}]}>
              Cancel
            </Text>
          </TouchableOpacity> */}
        </View>
        // <></>
      ) : (
        (isLocked && data?.payment_type !== 'full') && <View>
          <TouchableOpacity
            style={{
              // width: moderateScale(120),
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: moderateScale(8),
              paddingVertical: moderateScale(8),
              borderRadius: moderateScale(120),
              backgroundColor: colors.white,
              marginTop:moderateScale(20),
            }}
            onPress={()=>{
              navigation.navigate(navigationStrings.PurchasedCourse)
            }}
            
            >
            <Text
              style={{
                fontFamily: fontFamily.Poppins_Medium,
                fontSize: textScale(12),
                color: colors.black,
              }}>
              Pay Now
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default MySubscriptionsCard;

const styles = StyleSheet.create({
  cardContainer: {
    padding: moderateScale(12),
    paddingVertical: moderateScaleVertical(16),
    backgroundColor: colors.theme,
    borderRadius: moderateScale(10),
    marginVertical: moderateScale(2),
    marginBottom: moderateScale(18),
    overflow: 'hidden',
    marginHorizontal: moderateScale(4),
    // width:width,
    // marginRight:moderateScale(28),
    // width:width*0.6,
    height:DeviceInfo.isTablet()?width*0.35:width*0.45,
   
    // alignSelf:"flex-start",
  },
  absPosition: {
    position: 'absolute',
    bottom:DeviceInfo?.isTablet()?-90: -20,
    right: moderateScale(12),
    width:DeviceInfo?.isTablet()?moderateScale(200):moderateScale(90),
    height:DeviceInfo?.isTablet()?moderateScale(200):moderateScale(90),

  },
  flexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {},
  textCourse: {
    fontFamily: fontFamily.Poppins_Medium,
    color: colors.white,
    fontSize: textScale(14),
  },
  textPrice: {
    fontFamily: fontFamily.Poppins_SemiBold,
    color: colors.white,
    // marginVertical:moderateScale(8),
    fontSize: moderateScale(30),
  },
  textPurchased: {
    fontFamily: fontFamily.Poppins_Medium,
    color: colors.white,
    fontSize: moderateScale(10),
  },
  label: {
    borderRadius: moderateScale(16),
    width: moderateScale(70),
    paddingVertical: moderateScale(3),
    backgroundColor: '#FFB92E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelText: {
    fontFamily: fontFamily.Poppins_Medium,
    fontSize:DeviceInfo?.isTablet()?moderateScale(10): textScale(14),
    color: colors.white,
  },
  dateContainer: {
    marginTop: moderateScale(14),
  },
  imgContainer: {
    margin: moderateScale(10),
    // marginTop:moderateScale(12),
  },
  btnContainer: {
    width: '100%',
    justifyContent: 'space-between',
    gap: 3,
    // backgroundColor:'red',
    paddingVertical: moderateScale(8),
    paddingHorizontal: moderateScale(10),
  },

  imgBox: {
    width: moderateScale(90),
    height: moderateScaleVertical(90),
    overflow: 'hidden',
    gap: moderateScale(10),
    borderRadius: moderateScale(10),
  },
  imgText: {
    color: colors.white,
    marginTop: moderateScaleVertical(8),
    fontFamily: fontFamily.Poppins_Regular,
  },
  bigBtn: {
    backgroundColor: '#FFB92E',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(14),
    paddingVertical: moderateScale(6),
    borderRadius: moderateScale(300),
  },
});
