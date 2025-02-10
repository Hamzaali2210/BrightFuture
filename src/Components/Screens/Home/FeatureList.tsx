import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { Pagination } from 'react-native-snap-carousel';
import { useDispatch } from 'react-redux';
import CardImage from '../../../assets/images/CardSvg/GroupCard.svg';
import FeatureCard from '../../../Components/Layout/Card/FeatureCard';
import useGetData from '../../../hooks/useGetData';
import { FeatureListLoader } from '../../../redux/slice/loaderSlice';
import colors from '../../../styles/colors';
import {
  height,
  moderateScale,
  moderateScaleVertical,
  verticalScale,
  width
} from '../../../styles/responsiveSize';
import { endpoints } from '../../../utils/endpoints';
import MyLoader from '../../Loader/RectangleLoader';
import DeviceInfo from 'react-native-device-info';
import FastImage from 'react-native-fast-image';
import { IMAGE_API_URL } from '../../../utils/urls';

const  FeatureList:React.FC<{again: number}> = ({again}) => {
  const baseOptions = {
    vertical: false,
    width: width*0.95,
    height:DeviceInfo?.isTablet()?(width/2)-100: width / 2,
  } as const;



  const dispatch = useDispatch();
  const [index, setIndex] = useState<number>(0);

  type ItemProps = {
    textPara: string;
    svgImage: any;
    text: string;
    courses: [];
    colorGrad: string[];
    imageBack: string;
  };

  function Item({
    textPara,
    text,
    svgImage,
    courses,
    colorGrad,
    imageBack,
  }: ItemProps) {
    return (
      <FeatureCard
        text={text}
        textPara={textPara}
        svgImage={svgImage}
        courses={courses}
        imageBack={imageBack}
        colorGrad={colorGrad}
      />
    );
  }

  const {data: listPackage, status,isFetching} = useGetData(
    `${endpoints.GET_PACKAGE}`,
    ['AVAILABLE_COUPONS_PACKAGE',again],
  );

  const {data: banners, status:bannerStatus,isFetching:bannerFetching} = useGetData(
    `${endpoints.BANNERS}`,
    ['BANNERS',again],
  );

  const {status:packageStatus, data, error, refetch,isFetching:availableFetching} = useGetData(`${endpoints.AVAILABLE_COUPONS}?coupon_type=3`, [
    'AVAILABLE_GET_COUPONS_PACKAGE',again
  ]);

  useEffect(() => {
    if (bannerStatus === 'pending' || packageStatus==="pending") {
      dispatch(FeatureListLoader({loader: true}));
    } else if (bannerStatus === 'success' || packageStatus ==="success") {
      dispatch(FeatureListLoader({loader: false}));
    }
  }, [bannerStatus]);


  const ref = React.useRef<ICarouselInstance>(null);

  const handleSnap = (index: number) => {
    setIndex(index);
    console.log('newDatanewDatanewDatanewDatanewDatanewData', index);
  };

  if (status === 'pending' || isFetching || bannerFetching || availableFetching) {
    return (
      <>
        <MyLoader />
      </>
    );
  } else if (status === 'error') {
    return <></>;
  }

  const listFeatureData = listPackage?.data?.map(
    (item: any, index: number) => ({
      ...item,
      svgImage: <CardImage />,
      background_color:
        index % 2 == 0
          ? ['#4F88B4', '#112A50']
          : ['#ECA90A', '#094E85', '#094E85'],
    }),
  );



  return (
    <View style={styles.main}>
      {/* {!!listFeatureData?.length && <View
        style={[
          commonStyles.spacingCommon,
          {
            marginTop: moderateScaleVertical(10),
            marginBottom: moderateScaleVertical(10),
          },
        ]}>
        <HomeFeatHeading
          title={mainStrings.offers}
          routeName={navigationStrings.SpecialOffers}
        />
      </View>} */}
      <View style={[styles.mainFeature,
         {paddingHorizontal:moderateScale(8)}
         ]}>


        {/* <FlatList
          // data={listFeatureData}
          data={listFeatureData}

          renderItem={({item}: any) => (
            <Item
              text={item.text}
              textPara={item.textPara}
              svgImage={item.svgImage}
              courses={item.courses}
              colorGrad={item.background_color}
              imageBack={item?.backgroud_image}


            />
          )}
          keyExtractor={item => `${item.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
        /> */}
       {(data?.data?.length>0  || banners?.data?.length>0) &&(
         <Carousel
        {...baseOptions}
          // {...baseOptions,height:listFeatureData.length>0?width/2:0}
          loop={((data?.data?.length ?? 0) + (banners?.data?.length ?? 0)) > 1}
          // scrollAnimationDuration={0}
          ref={ref}
          // mode="parallax"
           style={{width: '100%'}}
          // data={[1,2,3]}
          data={ [...(data?.data ?? []), ...(banners?.data ?? [])]}
          pagingEnabled={true}
          autoPlay
          autoPlayInterval={5000}
          onSnapToItem={handleSnap}
          renderItem={({item,index}) => {

            if(item?.file){
              return <View style={styles.bannerContainer}>
                <FastImage
                resizeMode='cover'
                style={{height:"100%",width:"100%",}
                }
                source={{uri: `${IMAGE_API_URL}${item?.file}` || item?.file}}
                />
              </View>
            }

            return (
            <FeatureCard
              text={item?.text ||`Enroll in our ${item?.courses?.length} courses`}
              textPara={item?.description || `Enroll in our ${item?.courses?.length} courses at institution and get 25% for this semester `}
              // svgImage={undeitemfined}
              // duration={item?.expiry_in}
              // duration={248692}

              cardId={item?.id}
              specialCourse={item?.text}
              courses={item?.courses}
              textColor={item?.text_color}
              textDescColor={item?.description_color}
              textSize={item?.text_size}
              // colorGrad={[]}
              imageBack={item?.image ?? 'https://wallpapers.com/images/hd/grey-texture-background-cupxi624ho40xpjn.jpg'}
              // textPara={textPara}
              // svgImage={svgImage}
              // courses={courses}
              // imageBack={imageBack}
              colorGrad={item?.gradient_type==="horizontal"?[item?.gradient_from??"#4F88B4",item?.gradient_to??"#112A50"]:[item?.gradient_top??"#4F88B4",item?.gradient_bottom??"#112A50"]}

              // colorGrad={item?.background_color}
            />
          )}}
        />
        )}
      </View>
      <View style={{position:"absolute",top:DeviceInfo?.isTablet()?moderateScale(15):10,right:DeviceInfo?.isTablet()?moderateScale(20):10}}>
      <Pagination
        // dotsLength={courseData?.data?.length}
        dotsLength={(data?.data?.length??0)+(banners?.data?.length??0)}
        activeDotIndex={index}
        containerStyle={{
          // marginTop: -moderateScale(30),
          // marginTop:width/2-10
        }}

        dotStyle={styles.dotStyle}
        inactiveDotOpacity={0.65}
        inactiveDotScale={0.85}
      />
      </View>

    </View>
  );
}

export default FeatureList;

const styles = StyleSheet.create({
  main: {
    // backgroundColor:"red",
    marginBottom:-4,
    position:"relative",
  },
  mainFeature: {
    marginTop: verticalScale(20),
    // marginBottom: moderateScaleVertical(10),
    // backgroundColor:"red"
  },
  dotStyle: {
    width: moderateScaleVertical(7),
    height: moderateScaleVertical(7),
    borderRadius: moderateScale(500),
    backgroundColor: colors.themeYellow,
    marginHorizontal: -moderateScale(8),
  },
  bannerContainer:{
    backgroundColor:colors.grey1,
    borderRadius:moderateScale(18),
    overflow:"hidden",
    marginHorizontal: moderateScale(4),

  }
});
