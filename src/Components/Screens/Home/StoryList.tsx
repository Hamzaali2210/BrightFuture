import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import InstagramStories, {
  InstagramStoriesPublicMethods,
} from '@birdwingo/react-native-instagram-stories';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native';
import {Pressable} from 'react-native';
import colors from '../../../styles/colors';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../styles/responsiveSize';
import fontFamily from '../../../styles/fontFamily';
import commonStyles from '../../../styles/commonStyles';
import useGetData from '../../../hooks/useGetData';
import {endpoints} from '../../../utils/endpoints';
import MyLoader from '../../Loader/RectangleLoader';
import DeviceInfo from 'react-native-device-info';
import {IMAGE_API_URL} from '../../../utils/urls';

const StoryList: React.FC<{again: number}> = ({again}) => {
  // to use public methods:
  const ref = useRef<InstagramStoriesPublicMethods>(null); // if using typescript - useRef<InstagramStoriesPublicMethods>( null )
  const {data, status, isFetching} = useGetData(endpoints.GET_STORY, [
    'stroy',
    again,
  ]);

  // usage of public method
  // const setStories = () => ref.current?.setStories(storiesPost);

  function StoryIcon() {}

  if (status === 'pending' || isFetching) {
    return (
      <>
        <MyLoader />
      </>
    );
  } else if (status === 'error') {
    return <></>;
  }
  const newData = data?.data?.map(item => ({
    id: item?.id.toString(),
    name: item?.name.toString(),
    avatarSource: {uri: `${IMAGE_API_URL}${item?.imgUrl}`},
    stories:
      item?.stories.map(story => ({
        id: story?.id.toString(),
        source: {
          uri: `${IMAGE_API_URL}${story?.source?.uri}`,
        },
        mediaType: story?.source?.uri.includes('.mp4' || '.mkv')
          ? 'video'
          : 'picture',
      })) ?? [],
  }));
  // console.log('HELLOHELLOHELLO : ', newData[3].stories)

  return (
    <View style={[commonStyles.spacingCommon]}>
      {data?.data?.length > 0 && (
        <InstagramStories
          ref={ref}
          showName
          stories={newData}
          // saveProgress
          // avatarBorderColors={[colors.themeYellow,colors.theme]}
          avatarBorderColors={[colors.themeYellow]}
          storyAvatarSize={moderateScaleVertical(50)}
          avatarSize={textScale(68)}
          progressActiveColor={colors.themeYellow}
          textStyle={{
            fontFamily: fontFamily.Poppins_Medium,
            color: colors.white,
            fontSize: DeviceInfo.isTablet() ? textScale(10) : textScale(14),
          }}
          closeIconColor={colors.themeYellow}
          // containerStyle={{backgroundColor:"red"}}

          avatarListContainerStyle={{
            // borderRadius: moderateScale(20),
            gap: moderateScaleVertical(10),
            marginTop: moderateScaleVertical(16),
          }}
          nameTextStyle={{
            fontFamily: fontFamily.Poppins_Regular,
            width: moderateScale(70),
            color: colors.black,
            fontSize: moderateScale(12),
            textAlign: 'center',
          }}
          // ...
        />
      )}
    </View>
  );
};

export default StoryList;

const styles = StyleSheet.create({
  aaaa: {},
});
