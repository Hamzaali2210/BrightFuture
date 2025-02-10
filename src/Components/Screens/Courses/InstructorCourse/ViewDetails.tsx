import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import InstructorCourseHeader from './InstructorCourseHeader';
import {useNavigation, useRoute} from '@react-navigation/native';
import DetailsHeader from './DetailsHeader';
import CustomTab from '../../../Layout/TabLayout/CustomTab';
import {TabType} from '../../../../types/uiType';
import colors from '../../../../styles/colors';
import {
  moderateScaleVertical,
  verticalScale,
} from '../../../../styles/responsiveSize';
import NotesDetail from './NotesDetail';
import commonStyles from '../../../../styles/commonStyles';
import useGetData from '../../../../hooks/useGetData';
import {endpoints} from '../../../../utils/endpoints';
import * as Progress from 'react-native-progress';
import QuizModule from './QuizModule';
import {videoIdGenerator} from '../../../../utils/logicFunctions';

const ViewDetails = () => {
  const navigation = useNavigation();
  const {params} = useRoute();
  const {data: getChapterData, isLoading: chapterLoading} = useGetData(
    `${endpoints.CHAPTERS}/${params?.chapterId}`,
    ['CHAPTERS'],
  );


  const handleBack = () => {
    navigation.goBack();
  };
  const tabArray: Array<TabType> = [
    {
      index: 0,
      label: 'Notes',
    },
    {
      index: 1,
      label: 'Quiz Module',
    },
  ];
  const [pageCurrent, setPageCurrent] = useState<number>(0);
  const [newVideoId, setNewVideoId] = useState('');

  const handlePress = (item: string) => {
    const videoId = videoIdGenerator(item);

    if (videoId) {
      setNewVideoId(videoId);
    }
  };

  if (chapterLoading) {
    return (
      <View
        style={[
          styles.container,
          {justifyContent: 'center', flex: 1, alignItems: 'center'},
        ]}>
        <Progress.Circle size={80} indeterminate color={colors.theme} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <DetailsHeader
        handleBack={handleBack}
        chapterData={getChapterData}
        lessonNo={params?.lessonNo}
        videoIdBack={newVideoId?newVideoId:params?.videoId}
      />

      <CustomTab
        tabTitle={tabArray}
        pagerViewStyle={{minHeight: moderateScaleVertical(480)}}
        highlightedColor={colors.themeYellow}
        pageCurrent={pageCurrent}
        setPageCurrent={setPageCurrent}
        tabStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          // borderBottomWidth: 2,
        }}>
        <View
          key={0}
          style={[
            {paddingVertical: verticalScale(12)},
            commonStyles.spacingCommon,
          ]}>
          <NotesDetail
            chapterId={getChapterData?.data?.id}
            studentCourse={!!params?.studentCourse}
            handlePress={handlePress}
          />
        </View>
        <View key={1} style={{backgroundColor: colors.white}}>
          <QuizModule />
        </View>
      </CustomTab>
    </ScrollView>
  );
};

export default ViewDetails;

const styles = StyleSheet.create({
  container: {},
});
