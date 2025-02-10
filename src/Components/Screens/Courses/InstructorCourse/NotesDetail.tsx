import {
  Button,
  FlatList,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import commonStyles from '../../../../styles/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
  scale,
} from '../../../../styles/responsiveSize';
import fontFamily from '../../../../styles/fontFamily';
import colors from '../../../../styles/colors';
import NotesIcon from '../../../../assets/images/Icons/notesIconBlue.svg';
import PlayIcon from '../../../../assets/images/Icons/PlayIcon.svg';
import useGetData from '../../../../hooks/useGetData';
import {endpoints} from '../../../../utils/endpoints';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/Feather';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {showError, showSuccess} from '../../../../utils/helperFunctions';
import {handlePressInfo} from '../../../../utils/logicFunctions';
import CommonButton from '../../../CommonButton';
import {useNavigation} from '@react-navigation/native';
import navigationStrings from '../../../../constants/navigationStrings';

// import Share from 'react-native-share'

interface NotesContainerProps {
  notesHeader: string;
  notesInfo: string;
  handlePressInfo: (item: any) => void;
  item: any;
  handlePress?: (item:string) => void;

}

interface NotesProps {
  chapterId: number;
  studentCourse: boolean;
  handlePress?: (item:string) => void;
}

const NotesContainer: React.FC<NotesContainerProps> = ({
  notesHeader,
  notesInfo,
  handlePressInfo,
  item,
  handlePress,
}) => {

  return (
    <View style={styles.notesContainer}>
      <View>
        {item?.file ? (
          <NotesIcon
            width={moderateScale(32)}
            height={moderateScaleVertical(32)}
          />
        ) : (
          <TouchableOpacity onPress={()=>{handlePress!==undefined && handlePress(item?.video_url)}}>
            <PlayIcon
              width={moderateScale(32)}
              height={moderateScaleVertical(32)}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={{flex: 1}}>
        <Text style={[styles.notesHeader]}>{notesHeader}</Text>
        <Text style={[styles.notesInfo]}>{notesInfo}</Text>
      </View>
      {item?.file && (
        <TouchableOpacity
          onPress={handlePressInfo}
          style={{padding: moderateScale(10)}}>
          <Icon
            color={colors.blackGreyDark}
            size={moderateScale(20)}
            name="download"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const NotesDetail: React.FC<NotesProps> = ({chapterId, studentCourse,handlePress}) => {

  const navigation = useNavigation<any>();
  const {data: notesData, isLoading: notesLoading} = useGetData(
    `${endpoints.GET_NOTES}?per_page=10&chapter_id=${chapterId}`,
    ['NOTES_INT'],
  );

  const notesDataFinal: any = {notesData};
 

  useEffect(() => {
    async function requestStoragePermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        } else {
        }
      } catch (err) {
        console.warn(err);
      }
    }
    requestStoragePermission();
  }, []);

  if (notesLoading) {
    return (
      <View
        style={[
          styles.container,
          {justifyContent: 'center', alignItems: 'center', flex: 1},
        ]}>
        <Progress.Circle size={80} indeterminate color={colors.theme} />
      </View>
    );
  }

  const addNotes = () => {
    navigation.navigate(navigationStrings.AddNotes as never, {
      chapterId: chapterId,
    });
  };

  return (
    <View style={[styles.container, commonStyles.spacingCommon]}>
      <FlatList
        data={notesDataFinal?.notesData?.data}
        style={{marginBottom: scale(100)}}
        renderItem={({item}) => (
          <>
            <FlatList
              scrollEnabled={false}
              renderItem={({item: item2}) => (
                <NotesContainer
                  notesHeader={item?.name}
                  notesInfo={item?.description?.slice(0, 40)}
                  handlePressInfo={() => handlePressInfo(item2)}
                
                  item={item2}
                />
              )}
              data={item?.documents}
            />
            <FlatList
              renderItem={({item: item2}) => (
                <NotesContainer
                  notesHeader={item?.name}
                  notesInfo={item?.description?.slice(0, 40)}
                  handlePressInfo={() => handlePressInfo(item2)}
                  handlePress={handlePress}
                  item={item2}
                />
              )}
              scrollEnabled={false}
              data={item?.videos}
            />
          </>
        )}
      />
      {!studentCourse && (
        <CommonButton
          btnText="+Add Notes"
          onPressBtn={addNotes}
          mainViewStyle={{
            marginHorizontal: 0,
            marginBottom: moderateScale(20),
            position: 'absolute',
            bottom: 0,
          }}
        />
      )}
    </View>
  );
};

export default NotesDetail;

const styles = StyleSheet.create({
  container: {
    borderRadius: scale(12),
    backgroundColor: '#F9FAFB',
  },
  notesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(6),
    paddingVertical: moderateScaleVertical(24),
  },
  notesHeader: {
    fontFamily: fontFamily.Poppins_Bold,
    color: colors.black,
  },
  notesInfo: {
    fontFamily: fontFamily.Poppins_Medium,
    color: colors.grey1,
  },
});
