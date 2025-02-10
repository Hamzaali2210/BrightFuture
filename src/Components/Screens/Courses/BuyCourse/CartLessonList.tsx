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

type ItemProps = {
  chapterName: string;
  notesQuantity: string;
  timing: string;
  isFree?: boolean;
  priceLesson: string;
  id?: any;
  handleCart?: (item: any, type: string) => void;
  item: any;
  handleDetail?:(item:any)=>void
  cartDetail: any;
  instructor?:boolean;
};

interface CartLessonListProps {
  handleCart?: (item: any, type: string) => void;
  courseId?:number,
  spaceBottom?: number;
  instructor?:boolean;
  lessonData:any;
}



const StepProgressBar = ({ steps, currentStep }) => {
 
  return (
    <View style={styles.container}>
        {steps.map((step, index) => {
            const progress = useSharedValue(currentStep >= index ? 1 : 0);

            useEffect(() => {
                progress.value = withTiming(currentStep >= index ? 1 : 0);
            }, [currentStep]);

            const animatedIconStyle = useAnimatedStyle(() => {
                return {
                    backgroundColor: progress.value === 1 ? 'green' : 'grey',
                    transform: [{ scale: withSpring(progress.value === 1 ? 1.2 : 1) }],
                };
            });

            const animatedLineStyle = useAnimatedStyle(() => {
                return {
                    backgroundColor: progress.value === 1 ? 'green' : 'grey',
                    height: withTiming(progress.value === 1 ? '100%' : '100%'),
                };
            });

            return (
                <View key={index} style={styles.stepContainer}>
                    <View style={styles.iconContainer}>
                        <Animated.View style={[styles.icon, animatedIconStyle]}>
                            <Text style={styles.iconText}>{index + 1}</Text>
                        </Animated.View>
                        {index < steps.length - 1 && (
                            <Animated.View style={[styles.line, animatedLineStyle]} />
                        )}
                    </View>
                    <Text style={styles.stepText}>{step}</Text>
                </View>
            );
        })}
    </View>
);
};




function Item({
  chapterName,
  notesQuantity,
  timing,
  isFree,
  priceLesson,
  item,
  instructor,
  handleCart,
  handleDetail
}: ItemProps) {
  const steps = ['Payment', 'Address', 'Confirm Order', 'Dispatched', 'Delivered'];
    const [currentStep, setCurrentStep] = useState(0);

    const handleNextStep = () => {
        setCurrentStep(prevStep => (prevStep < steps.length - 1 ? prevStep + 1 : prevStep));
    };
   
   return (
    <CartLesson
      item={item}
      chapterName={chapterName}
      notesQuantity={notesQuantity}
      timing={timing}
      priceLesson={priceLesson}
      isFree={isFree}
      instructor={instructor}
      handleCart={handleCart}
      handleDetail={handleDetail}

    />
    // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //         <StepProgressBar steps={steps} currentStep={currentStep} />
    //         <Button title="Next Step" onPress={handleNextStep} />
            
    //     </View>
  );
}

const CartLessonList: React.FC<CartLessonListProps> = ({
  handleCart,
  spaceBottom,
  lessonData,
  courseId,
 
  instructor
}) => {
  const navigation = useNavigation<any>()
  console.log("lessonDatalessonDatalessonDatalessonDatalessonData",lessonData);
  


  

  const handleDetail=(item:any)=>{
      navigation.navigate(navigationStrings.ViewDetails,{courseId:item?.id})
      
  }


  
  
  

  return (
    <View style={[styles.container]}>
    
      
      <FlatList
        style={{marginBottom: spaceBottom > 0 ? spaceBottom : 40}}
        data={lessonData}
        showsVerticalScrollIndicator={false}
        
        // data={[1]}
       
        renderItem={({item}) => (
          <Item
            
            item={item}
            timing={formatTime(item?.videos?.reduce((acc,curr)=>acc+curr.duration,0))|| `0s`}
            chapterName={item?.name}
            cartDetail={lessonData}
            notesQuantity={item?.videos?.length}
            priceLesson={item?.price || 20}
            isFree={item?.videos[0]?.is_free}
            handleCart={handleCart}
            handleDetail={()=>handleDetail(item)}
            instructor={instructor}

          />
        )}
        keyExtractor={item => item?.id}
      />
    </View>
  );
};

export default CartLessonList;

const styles = StyleSheet.create({
  // container: {
  //   // flex: 1,
  // },


  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
