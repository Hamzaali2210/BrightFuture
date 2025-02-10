import React, { useEffect, useState } from 'react';
import {
  Linking,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';

import {
  useNavigation,
  useRoute
} from '@react-navigation/native';
import colors from '../../../styles/colors';
import {
  moderateScaleVertical,
  verticalScale
} from '../../../styles/responsiveSize';
import { CourseChapter, TabType } from '../../../types/uiType';
import CustomTab from '../../Layout/TabLayout/CustomTab';



import { FlatList } from 'react-native';
import useGetData from '../../../hooks/useGetData';
import usePostData from '../../../hooks/usePostData';
import commonStyles from '../../../styles/commonStyles';
import { endpoints } from '../../../utils/endpoints';
import { showSuccess } from '../../../utils/helperFunctions';
import { formatTime } from '../../../utils/logicFunctions';
import ChapterDetailProgress from './AddCourse/AddChapter/ChapterDetailProgress';
import InstructorCourseHeader from './InstructorCourse/InstructorCourseHeader';
import AboutCourse from './SingleCourseDetail/AboutCourse';

type paramsType = {
  purchasedId: number;
};
function SingleCourseDetail() {
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as paramsType;

  const [pageCurrent, setPageCurrent] = useState(0);
  const [currentVideo, setCurrentVideo] = useState<any>({});


  useEffect(()=>{
      console.log("setCurrentVideosetCurrentVideosetCurrentVideosetCurrentVideo", currentVideo);
      
  },[currentVideo])

  const [markComplete,setMarkComplete]=useState(false);

  const {
    isLoading: purchasedDetailLoading,
    data: purchasedCourseDetail,
    isError,
    isSuccess,
  } = useGetData(`${endpoints.PURCHASED_COURSES_DETAIL}/${params?.courseId}`, [
    'PURCHASED_COURSES_DETAIL',
  ]);
  const {mutate: completeChapter} = usePostData(
    `${endpoints.CANSEE}`,
    ['CAN_SEE_CHAPTER'],
    'post',
    (data: any) => {
        showSuccess("Congratulation on Complting the chapter")
        setMarkComplete(!markComplete)
    },
    (error: any) => {
       
    },
  );
  console.log("courseIdcourseIdcourseIdcourseIdcourseIdcourseIdcourseId",params?.courseId,purchasedCourseDetail);
  

  const toggleMark = ()=>{
    console.log("completeChaptercompleteChaptercompleteChapter",currentVideo);
    
    return ;
    let payload = {
      video_id:currentVideo.id,
    }
    completeChapter(payload)
   
  }


  console.log("purchasedCourseDetailpurchasedCourseDetailpurchasedCourseDetail",purchasedCourseDetail);
  

  const tabArray: Array<TabType> = [
    {
      index: 0,
      label: 'Lessons',
    },
    // {
    //   index: 1,
    //   label: 'Reviews',
    // },
    {
      index: 1,
      label: 'About',
    },
    // {
    //   index: 3,
    //   label: 'Assigments',
    // },
  ];

  const handleBack = () => {
    navigation.goBack();
  };
  const {
    isSuccess: getChapterSuccess,

    data: getChapterData,
    isLoading: getChapterLoading,
  } = useGetData(
    `${endpoints.CHAPTERS}?course_id=${params?.courseId}&type=purchased`,
    ['notesAdded'],
  );


  console.log(
    "get chapter data ki detail idhar aa rhi hia",getChapterData
  );
  



  useEffect(() => {
    if (getChapterData) {
      setCurrentVideo(getChapterData?.data[0]?.video_and_notes[0]);
      setMarkComplete(getChapterData?.data[0]?.video_and_notes?.is_completed)
    }

  }, [getChapterData]);

  const handleEditChapter = (item: any) => {};

  const handleWhatsApp = ()  =>{
    const whatsappLink= getChapterData?.course?.whatsapp_link
      if(whatsappLink){
              Linking.openURL(whatsappLink);
      }
      
      
  }

  function totalDuration(item: any) {
    const total = item?.reduce((accumulator, currentValue) => {
      return accumulator + currentValue?.duration;
    }, 0);

    return total;
  }

  return (
    <ScrollView style={styles.container} nestedScrollEnabled showsVerticalScrollIndicator={false}>
      <InstructorCourseHeader
        handleBack={handleBack}
        courseData={{data:getChapterData?.course}}
        // courseData={{data:getChapterData?.data[0]?.courses}}
        // courseData={purchasedCourseDetail as any}
        currentVideo={currentVideo}
        isStudent={true}
        toggleMark={toggleMark}
        markComplete={markComplete}
        
      />
      {/* <SingleCourseDetailHeader handleBack={handleBack} courseData={getChapterData?.data[0]?.courses}/> */}
      <CustomTab
        tabTitle={tabArray}
        pagerViewStyle={{minHeight: verticalScale(400)}}
        highlightedColor={colors.themeYellow}
        pageCurrent={pageCurrent}
        setPageCurrent={setPageCurrent}
        tabStyle={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          // borderBottomWidth: 2,
        }}>
        <View key={0} style={[{marginBottom: verticalScale(50)},commonStyles.spacingCommon]}>
          {/* <LessonList isScroll /> */}
          {/* {!!getChapterData?.data[0]?.courses?.whatsapp_link && <TouchableOpacity
            style={{
              position: 'absolute',
              zIndex: 2,
              // width: moderateScale(50),
              height: moderateScale(50),
              backgroundColor: colors.theme,
              borderRadius: moderateScale(300),
              justifyContent: 'center',
              alignItems: 'center',
              bottom:moderateScale(50),
              right:moderateScale(20), 
              flexDirection:"row",
              gap:moderateScale(12),
              paddingHorizontal:moderateScale(12)
              

            }}
            onPress={()=>handleWhatsApp()}
            >
            <WhatsAppIcon
              size={moderateScale(30)}
              color={'white'}
              name="whatsapp"
            />
            <Text style={{color:colors.white,fontFamily:fontFamily.Poppins_Medium,fontSize:textScale(14)}}>{mainStrings.joinGroup}</Text>
          </TouchableOpacity>
          
          } */}
          <FlatList
            data={getChapterData?.data || [] as Array<CourseChapter>}
            style={{marginBottom:moderateScaleVertical(50)}}
            ListEmptyComponent={()=>{
              return <></>
            }}
            // data={[{name:"prince",notes:[1,2,3]},{name:"prince",notes:[1,2,3]},{name:"prince",notes:[1,2,3]}]}
            renderItem={({item, index}) => 
            {
              const newArr=[...(item.notes || []),...(item.video_and_notes || [])];
                 
                  newArr.sort((a:any,b:any)=>new Date(b.created_at).getTime()-new Date(a.created_at).getTime() )
                  console.log("file file file file new new new new ",newArr,item.notes,item.video_and_notes);
              
              // return <ChapterDetailProgress/>
              // return <></>
              return <ChapterDetailProgress
                // handleEdit={() => {}}
                item={item}
                chapterId={item?.id as number}
                chapterName={item?.name}
                canSee
                setCurrentVideo={setCurrentVideo}
                lessonNo={index + 1}
                notesNumber={item?.notes_count}
                videoNumber={item?.videos_count}
                duration={formatTime(totalDuration(item?.video_and_notes?.filter((item:any)=>item?.video_url)))}
                notesInfo={item?.video_and_notes}
                isPurchased
              />
            }}
          />
        </View>
        <View key={1} style={{backgroundColor: colors.white}}>
          <AboutCourse
            aboutInfo={getChapterData?.data[0]?.courses?.description}
            chapterCount={getChapterData?.data?.length}
          />
        </View>
        <View key={2} style={{backgroundColor: colors.white}}>
          {/* <ReviewList /> */}
        </View>

        <View key={3} style={{backgroundColor: colors.white}}>
          {/* <Assignment pageCurrent={pageCurrent} /> */}
        </View>
      </CustomTab>
    </ScrollView>
  );
}

export default SingleCourseDetail;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    gap: moderateScaleVertical(10),
  },
});
