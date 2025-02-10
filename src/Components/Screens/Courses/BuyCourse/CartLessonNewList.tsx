import {
    Button,
   FlatList, StyleSheet, Text, View 
  } from 'react-native';
  import React, { useEffect, useState } from 'react';
  import { useSelector } from 'react-redux';
  import CartLesson from './CartLesson';
  import useGetData from '../../../../hooks/useGetData';
  import { useNavigation } from '@react-navigation/native';
  import navigationStrings from '../../../../constants/navigationStrings';
  import { endpoints } from '../../../../utils/endpoints';
  import { formatTime } from '../../../../utils/logicFunctions';
  import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
  import { moderateScale, width } from '../../../../styles/responsiveSize';
import CartLessonNew from './CartLessonNew';
import ChapterDetailProgressEdit from '../AddCourse/AddChapter/ChapterDetaildProgressEdit';
import ChapterDetailProgress from '../AddCourse/AddChapter/ChapterDetailProgress';
import BuyCourse from '.';
import EmptyScreen from '../../../EmptyScreen';
import imagePath from '../../../../constants/imagePath';
import { mainStrings } from '../../../../constants/mainstrings';
  
  type ItemProps = {
    chapterName: string;
    notesQuantity: number;
    timing: string;
    isFree?: boolean;
    priceLesson: string;
    id?: any;
    handleCart?: (item: any, type: string) => void;
    item: any;
    handleDetail?:(item:any)=>void
    cartDetail: any;
    instructor?:boolean;
    buyCourse?:boolean
    cartLoading?:boolean;
    coursePurchasable?:boolean;
  };
  
  interface CartLessonListProps {
    handleCart?: (item: any, type: string) => void;
    courseId?:number,
    spaceBottom?: number;
    instructor?:boolean;
    lessonData:any;
    cartLoading?:boolean;
    coursePurchasable?:boolean;
    
  }
  
  
  
 
  
  
  
  
  function Item({
    chapterName,
    notesQuantity,
    timing,
    isFree,
    priceLesson,
    item,
    instructor,
    handleCart,
    handleDetail,
    buyCourse,
    cartLoading,
    setCurrentVideo,
    coursePurchasable,
    isExpired,
    videoNumber,
    refetchData
  }: ItemProps) {
    const steps = ['Payment', 'Address', 'Confirm Order', 'Dispatched', 'Delivered'];
      const [currentStep, setCurrentStep] = useState(0);
  
      const handleNextStep = () => {
          setCurrentStep(prevStep => (prevStep < steps.length - 1 ? prevStep + 1 : prevStep));
      };

      // const newArr=[...item.notes,...item.videos];
      console.log("newArrnewArrnewArrnewArrnewArrnewArrnewArrnewArrnewArr",item);
      function totalDuration(item: any) {
        const total = item?.reduce((accumulator, currentValue) => {
          return accumulator + currentValue?.duration;
        }, 0);
    
        return total;
      }
      
    
     return (
      <ChapterDetailProgress
             chapterDetail={item}
             chapterName={chapterName}
             notesNumber={notesQuantity}
             handleCart={handleCart}
             buyCourse={buyCourse}
             notesInfo={item?.video_and_notes}
             price={item.price}
             cartLoading={cartLoading}
             setCurrentVideo={setCurrentVideo}
             coursePurchasable={coursePurchasable}
             isExpired={isExpired}
             refetchData={refetchData}
             videoNumber={videoNumber}
             duration={formatTime(totalDuration(item?.video_and_notes?.filter((item:any)=>item?.video_url)))}


                  
  
      />
      // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      //         <StepProgressBar steps={steps} currentStep={currentStep} />
      //         <Button title="Next Step" onPress={handleNextStep} />
              
      //     </View>
    );
  }
  
  const CartLessonNewList: React.FC<CartLessonListProps> = ({
    handleCart,
    spaceBottom,
    lessonData,
    courseId,
    instructor,
    cartLoading,
    coursePurchasable,
    setCurrentVideo,
    isExpired,
    refetchData,
  }) => {
    const navigation = useNavigation<any>()
    const userData = useSelector((state: any) => state?.auth?.userPayload);
    console.log("lessonDatalessonDatalessonDatalessonDatalessonData",lessonData);
    
  
  
  
  
    const handleDetail=(item:any)=>{
        navigation.navigate(navigationStrings.ViewDetails,{courseId:item?.id})
        
    }
  
  
    
    
    
  
    return (
      <View style={[styles.container]}>
      
        
        <FlatList
          style={{marginBottom: spaceBottom > 0 ? spaceBottom : 40}}
          data={lessonData}
          // data={[1]}
          ListEmptyComponent={() => {
            return (
              <EmptyScreen
                  image={imagePath.noChapter}
                  heading={'No Chapters added yet'}
                  description={mainStrings.noChapterEmpty}
                  style={{height:300}}
                />
            );
          }}
         
          renderItem={({item}) => (
            <Item
              
              item={item}
              // timing={formatTime(totalDuration(item?.video_and_notes?.filter((item:any)=>item?.video_url)))}
              chapterName={item?.name}
              cartDetail={lessonData}
              notesQuantity={item?.notes_count}
              priceLesson={item?.price}
              // isFree={item?.video_and_notes?.filter((item)=>item?.video_url)[0]?.is_free}
              handleCart={handleCart}
              handleDetail={()=>handleDetail(item)}
              instructor={instructor}
              buyCourse = {userData?.role===2}
              cartLoading={cartLoading}
              coursePurchasable={coursePurchasable}
              setCurrentVideo={setCurrentVideo}
              isExpired={isExpired}
              refetchData={refetchData}
              videoNumber={item?.videos_count}
  
            />
          )}
          keyExtractor={item => item?.id}
        />
      </View>
    );
  };
  
  export default CartLessonNewList;
  
  const styles = StyleSheet.create({
    // container: {
    //   // flex: 1,
    // },
  
  
    container: {
      flexDirection: 'column',
    //   alignItems: 'center',
    //   justifyContent: 'center',
      // backgroundColor:"red",
  },
  stepContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
      width:width,
      backgroundColor:"yellow",
  },
  iconContainer: {
      alignItems: 'center',
  },
  icon: {
      width: moderateScale(30),
      height: moderateScale(30),
      borderRadius: moderateScale(150),
      justifyContent: 'center',
      alignItems: 'center',
      margin: 5,
  },
  iconText: {
      color: 'white',
  },
  stepText: {
      marginLeft: 20,
      fontSize: 16,
  },
  line: {
      width: 2,
      marginVertical: 5,
      // position:"relative",
      // bottom:12
      
  },
  });
  