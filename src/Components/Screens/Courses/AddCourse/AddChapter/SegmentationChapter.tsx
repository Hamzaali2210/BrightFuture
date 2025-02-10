import {ScrollView, StyleSheet, Text, FlatList, View, ImageBackground} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import commonStyles from '../../../../../styles/commonStyles';
import {
  height,
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from '../../../../../styles/responsiveSize';
import fontFamily from '../../../../../styles/fontFamily';
import colors from '../../../../../styles/colors';
import {
  formatTimeInput,
  secondsToMMSS,
} from '../../../../../utils/logicFunctions';
import CustomTextInput from '../../../../CustomTextInput';
import CustomTimeInput from '../../../../Forms/CustomTimeInput';
import {
  constantpayload,
  mainStrings,
  validationErrorMessage,
} from '../../../../../constants/mainstrings';
import DottedButton from '../../../../Layout/Button/DottedButton';
import CommonButton from '../../../../CommonButton';
import NotesBox from './NotesBox';
import ErrorMessage from '../../../../Forms/ErrorMessage';
import axios from 'axios';
import { showError, showSuccess } from '../../../../../utils/helperFunctions';
import uuid from 'react-native-uuid';
import Newhsl from '../../../../../Screens/Newhsl';
import imagePath from '../../../../../constants/imagePath';
import { TouchableOpacity } from 'react-native-gesture-handler';
import BackBtn from '../../../../../assets/images/Icons/backBtn.svg';
import useGetData from '../../../../../hooks/useGetData';
import { endpoints } from '../../../../../utils/endpoints';


interface SegmentationInterface {
  title: string;
  start: number;
  end: number;
  id:string;
  startTime: string;
  endTime: string;
}

const SegmentationChapter = () => {
  const {params} = useRoute();
  const {chapterInfo,videoId}: any = params;
  const navigation = useNavigation();

  // states
  const [fromTimeInput, setFromTimeInput] = useState('');

  const [toTimeInput, setToTimeInput] = useState('');
  const [segmentName, setSegementName] = useState('');

  const [segmentation, setSegmentation] = useState<
    Array<SegmentationInterface>
  >([]);

  const [timeError, setTimeError] = useState('');
  const {data:bunnyData, status:bunnyStatus,isFetching} = useGetData(endpoints.BUNNY_KEY, ["bunny"]);


  // side effects

  useEffect(() => {
    const fromTime = convertTimeStringToSeconds(fromTimeInput);
    const toTime = convertTimeStringToSeconds(toTimeInput);

    if (fromTime > toTime) {
      setTimeError(validationErrorMessage?.compareTimeError);
      return;
    }
  }, [fromTimeInput, toTimeInput]);

  // logic  functions
  function convertTimeStringToSeconds(timeString: string) {
    // Split the string into hours and minutes
    const [minutes, seconds] = timeString.split(':').map(Number);

    // Convert hours and minutes to seconds
    const totalSeconds = minutes * 60 + seconds;

    return totalSeconds;
  }

  // ui functions
  const handleChange = (value: string) => {
    if (!value) {
      setTimeError(validationErrorMessage?.segmentTitleError);
      return;
    } else {
      setSegementName(value);
      setTimeError('');
    }
  };

  const handleAddSegmentation = () => {
    const fromTime = convertTimeStringToSeconds(fromTimeInput);
    const toTime = convertTimeStringToSeconds(toTimeInput);

    if (fromTime > chapterInfo?.duration) {
      setTimeError(validationErrorMessage.fromTimeError);
      return;
    }
    if (toTime > chapterInfo?.duration) {
      setTimeError(validationErrorMessage?.toTimeError);
      return;
    }

    if (fromTime > toTime) {
      setTimeError(validationErrorMessage?.compareTimeError);
      return;
    }

    if (!segmentName) {
      setTimeError(validationErrorMessage?.segmentTitleError);
      return;
    }

    const payload: SegmentationInterface = {
      title: segmentName,
      start: convertTimeStringToSeconds(fromTimeInput),
      end: convertTimeStringToSeconds(toTimeInput),
      startTime: fromTimeInput,
      endTime: toTimeInput,
      id:uuid.v4() as string
    };
    setSegmentation([...segmentation, payload]);
    setFromTimeInput('');
    setToTimeInput('');
    setSegementName('');
  };

  const handleSave = async () => {
    try {
       if(bunnyData?.data){

      const urlAdmin = `https://video.bunnycdn.com/library/${bunnyData?.data?.LIB_ID}/videos/${chapterInfo.video_url}`;
    const finalPayload = JSON.parse(JSON.stringify(segmentation))?.map(item => {
      delete item['startTime'];
      delete item['endTime'];
      delete item['id'];

      return item;
    });

    const response = await axios.post(
      urlAdmin,
      {chapters: finalPayload},
      {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          AccessKey: bunnyData?.data?.API_KEY,
        },
      },
    );
    if(response?.status === 200){
         navigation.goBack();
        showSuccess("Segmentation is done");


    }
  }

    } catch (error) {
        showError(error?.response?.data?.message)

    }



  };

  const handleEdit = () =>{

  }

  const handleDelete = (id:string) =>{
      const newData = segmentation.filter((item)=>item?.id !== id)
      setSegmentation(newData)
  }
  const handleBack = () => {
    navigation.goBack();
  };

  if(bunnyStatus === "pending"){
    return(
      <>
      </>
    )

  }

  return (
    <ScrollView>
         <View>
        <ImageBackground
          source={imagePath?.mathBlue}
          resizeMode="cover"
          style={styles.backImg}>
          <View style={[styles.backImgContainer, commonStyles.spacingCommon]}>
            <TouchableOpacity style={{}} onPress={handleBack}>
              <BackBtn width={moderateScale(50)} height={moderateScale(50)} />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.fontText}>Video Segmentation</Text>
          </View>


        </ImageBackground>
      </View>
        <View style={styles.thumbnailImageContainer}>
                {/* <SampleVimeo videoId={videoId}/> */}
                <Newhsl videoId={videoId} isMaximum={true} />
        </View>
        <View style={[commonStyles.spacingCommon]}>
        <Text style={styles.heading}>{chapterInfo.name}</Text>
      {/* <Text style={styles.para}>
        Chapters are displayed in the timeline and allow viewers to more easily
        navigate through the video.
      </Text> */}
      <FlatList
        data={segmentation}
        renderItem={({item}) => {
          return (
            <NotesBox
              notesName={item.title}
              edit
              deleteCurr
              handleEdit={handleEdit}
              handleDelete={()=>handleDelete(item?.id)}
              notesFile={`${item?.startTime} - ${item?.endTime}`}
            />
          );
        }}
        scrollEnabled={false}
      />
      <View style={styles.redContainer}>
      <Text
        style={[styles.para, {color: colors.red, fontSize: textScale(14)}]}>
        Chapter should stay inside of total video length:{' '}
        <Text style={[{fontFamily:fontFamily.Poppins_Bold}]}>{secondsToMMSS(chapterInfo?.duration)}</Text>
      </Text>
      </View>


      <View>
      <CustomTextInput
          value={segmentName}
          onChangeText={handleChange}
          placeholder={mainStrings.segmentName}
        />
        <View style={[styles.timeContainer]}>
          <CustomTimeInput
            value={fromTimeInput}
            handleTimeChange={(input: string) => {
              const fromTime = convertTimeStringToSeconds(input);
              setFromTimeInput(formatTimeInput(input));
              if (fromTime > chapterInfo?.duration) {
                setTimeError(validationErrorMessage.fromTimeError);
                return;
              } else {
                setTimeError('');
              }
            }}
            isError
            setTimeInput={setFromTimeInput}
          />
          <Text
            style={{
              fontFamily: fontFamily.Poppins_Medium,
              color: colors.grey1,
              fontSize: textScale(16),
            }}>
            To
          </Text>
          <CustomTimeInput
            value={toTimeInput}
            setTimeInput={setToTimeInput}
            handleTimeChange={(input: string) => {
              const endTime = convertTimeStringToSeconds(input);
              setToTimeInput(formatTimeInput(input));
              if (endTime > chapterInfo?.duration) {
                setTimeError(validationErrorMessage.toTimeError);
                return;
              } else {
                setTimeError('');
              }
            }}
          />
        </View>

      { timeError&&  <ErrorMessage
          message={timeError}
          errorStyle={{marginVertical: moderateScaleVertical(12)}}
        />}
      </View>
      <View style={{marginVertical: moderateScale(8)}}>
        <DottedButton
          btnText={'+Add Segmentation'}
          onPressBtn={handleAddSegmentation}
        />
      </View>

      <CommonButton
        btnText="Save"
        onPressBtn={handleSave}
        mainViewStyle={{marginHorizontal: 0}}
      />
        </View>

    </ScrollView>
  );
};

export default SegmentationChapter;

const styles = StyleSheet.create({
  heading: {
    fontSize: textScale(18),
    fontFamily: fontFamily.Poppins_SemiBold,
    color: colors.black,
    marginVertical: moderateScaleVertical(12),
  },
  para: {
    fontSize: textScale(14),
    color: colors.black,
    fontFamily: fontFamily.Poppins_Regular,
    // marginBottom: moderateScale(12),
    opacity:0.5,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fontText:{
    fontSize:textScale(20),
    color:colors.white,
    marginLeft:moderateScale(14),

    fontFamily:fontFamily.Poppins_SemiBold

  },
  redContainer:{
    backgroundColor:"#FF000012",
    borderRadius:moderateScale(8),
    padding:moderateScale(10),
    justifyContent:"center",
    alignItems:"center",
    marginVertical:moderateScaleVertical(8)
  },

  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: moderateScale(20),
    marginVertical:moderateScaleVertical(8),
  },
  thumbnailImageContainer: {
    width: width,
    // borderRadius: moderateScale(12),
    // height: '100%',
    height:height/3.78,
    // backgroundColor:colors.black,

    position: 'relative',
    bottom: moderateScale(2),
    overflow: 'hidden',
    borderBottomWidth: moderateScaleVertical(6),
    borderColor: colors.themeYellow,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

  },
  backImg: {
    // flex: 1,
    paddingVertical: moderateScaleVertical(60),
    flexDirection: 'row',
    position:"relative",
    justifyContent:"center",
    alignItems: 'center',
  },
  img: {
    width: '100%',
    backgroundColor: colors.black,
    height: moderateScale(200),
  },
  backImgContainer: {
    marginTop: moderateScaleVertical(20),
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    position:"absolute",
    top:30,
    left:moderateScale(10),
  },
});
