import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import ImagePicker from 'react-native-image-crop-picker';
import {URL} from 'react-native-url-polyfill';
import UploadIcon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import CryptoJS from 'crypto-js';
import * as tus from 'tus-js-client';



import {
  constantpayload,
  mainStrings,
} from '../../../../../constants/mainstrings';
import {
  // _tusUploadFunction,
  File,
  LessonChapter,
  LessonChapterError,
  LessonUpdate,
  Loading,
  Progress2,
  ProgressVideo,
  ResumableUpload,
  ShaText,
  ThumbnailResponseNew,
  Video,
} from '../../../../../redux/slice/chapterSlice';
import {AppDispatch} from '../../../../../redux/store';
import colors from '../../../../../styles/colors';
import fontFamily from '../../../../../styles/fontFamily';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from '../../../../../styles/responsiveSize';
import {showError, showSuccess} from '../../../../../utils/helperFunctions';
import CommonButton from '../../../../CommonButton';
import CustomTextInput from '../../../../CustomTextInput';
import ErrorMessage from '../../../../Forms/ErrorMessage';
import usePostData from '../../../../../hooks/usePostData';
import {endpoints} from '../../../../../utils/endpoints';
import * as Progress from 'react-native-progress';
import { useKeyboard } from '../../../../../hooks/useKeyboard';
import useGetData from '../../../../../hooks/useGetData';
import { IMAGE_API_URL } from '../../../../../utils/urls';


interface AddNewChapterModalInterface {
  courseId: number;
  toggleModal?: () => void;
  refetch?:()=>void;
  videoId?:number;
  position?:number;
  chapterBackId?:number;
}

const AddNewLesson: React.FC<AddNewChapterModalInterface> = ({
  courseId,
  toggleModal,
  refetch,
  videoId,
  position,
  chapterBackId

}) => {
  const dispatch = useDispatch<AppDispatch>();
  const keyboardHeight = useKeyboard();

  const {data:BunnyData, status:bunnyStatus, isFetching,} = useGetData(endpoints.BUNNY_KEY, ['bunny']);
  console.log(BunnyData,'BunnyDataBunnyDataBunnyData')



  //constants variables

  const libId = constantpayload.LIB_ID;
  const apiKey = constantpayload?.API_KEY;
  const expireTime = constantpayload?.EXPIRE_TIME;
  const chapterDetail = useSelector((state: any) => state?.chapter);

  //state response
  const thumbnailResponse = useSelector(
    (state: any) => state?.chapter?.thumbnailResponse,
  );


  const chapterLength = useSelector(
    (state: any) => state?.chapter?.chapterLength,
  );
  const lessonUpdate = useSelector(
    (state: any) => state?.chapter?.lessonUpdate,
  );
  const fileDetail = useSelector((state: any) => state?.chapter?.file);
  const lessonChapter = useSelector(
    (state: any) => state?.chapter?.lessonChapter,
  );
  const lessonChapterError = useSelector(
    (state: any) => state?.chapter?.lessonChapterError,
  );
  const chapterId = useSelector((state: any) => state?.chapter?.chapterId);
  console.log("");


  const video = useSelector((state: any) => state?.chapter?.video);
  const file = useSelector((state: any) => state?.chapter?.file);

  const nol= useSelector((state)=>state)


  console.log("nolnolnolnolnolnolnolnolnolnol",nol);

  const progress = useSelector((state: any) => state?.chapter?.progress);


  //local state
  const [loading, setLoading] = useState(false);
  const [loading2,setLoading2] =useState(false);
  const [localProgress,setLocalProgress]=useState(0);

  const [videoLoading,setVideoLoading]=useState(false);

  // api handling
  const {mutate: addVideoData, status: videoChaperStatus,error} = usePostData(
    endpoints.ADD_CHAPTER_VIDEOS,
    ['ADD_CHAPTER_VIDEOS'],
  );



  const {
    mutate: updateVideoData,
    status: updateVideoStatus,

} = usePostData(endpoints.UPDATE_CHAPTER_VIDEOS, ['UPDATE_CHAPTER_VIDEOS']);

const _tusUploadFunction = (file:Blob,shText:string,libId:number,video:string,thumbnailPath:string,expireTime:number) =>{
  console.log("filefilefilefilefilefilefilefilefilefilefilefile",file);


  // const {dispatch, rejectWithValue, getState,fulfillWithValue,} = thunkObj
  dispatch(ThumbnailResponseNew({path: ''}));
  var upload = new tus.Upload(file, {
    endpoint: 'https://video.bunnycdn.com/tusupload',
    retryDelays: [0, 3000, 5000, 10000, 20000 ],
    headers: {
      AuthorizationSignature: shText, // SHA256 signature (library_id + api_key + expiration_time + video_id)
      AuthorizationExpire: expireTime.toString(), // Expiration time as in the signature,
      VideoId: video, // The guid of a previously created video object through the Create Video API call
      LibraryId: `${BunnyData?.data?.LIB_ID}`,
    },
    // chunkSize:20*1024*1024,
    metadata: {
      filetype: file?.type,
      title: file?.name,
      // collection: "collectionID"
    },
    onError: function (error) {
      console.log("erooooooo",error);

      showError('error while uploading the video');
      dispatch(Loading({loading: false}));
      // setLoading(false);
      // rejectWithValue("Error while uploading the video")
    },
    onProgress: function (bytesUploaded, bytesTotal) {
        var percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
        console.log("thereeeeeeeee",progress);
        dispatch(ProgressVideo({progress: percentage}));


      // if(!thumbnailPath){

      // }


    },
    onSuccess: function () {
      console.log("success is there");

      showSuccess("Video is Uploaded Successfully")
      // dispatch(ThumbnailResponseNew({thumbnailResponse:file?.uri}))
      dispatch(ThumbnailResponseNew({path: file?.uri}));

      // fulfillWithValue("Video is Uploaded")

    },
  });

  return upload

}




  // effect handling
  useEffect(() => {
    if (video) {


      const shaTex = BunnyData?.data?.LIB_ID + BunnyData?.data?.API_KEY + expireTime + video;
      const shText = CryptoJS.SHA256(shaTex).toString();
      dispatch(ShaText({shaText: shaTex}));
      console.log("here's we have come for the video",file,shText,libId,video,thumbnailResponse,expireTime);
      // dispatch(ResumableUpload(''));
      const upload = _tusUploadFunction(file,shText,BunnyData?.data?.LIB_ID,video,thumbnailResponse,expireTime)
      upload.start()
    }
  }, [video]);
  const _handlecommonScene=()=>{
    dispatch(
      LessonChapter({
        lessonChapter: {
          notesName: '',
          notesDescription: '',
          documentFile: '',
          id: '',
          notesVideo: [],
          documentFileUrl: '',
          file_name:'',

        },
      }),
    );
    dispatch(ProgressVideo({progress: '0'}));

    dispatch(Video({video:""}))

    toggleModal && toggleModal()
    setLoading(false);
    dispatch(
      LessonChapterError({
        lessonChapterError: {...lessonChapterError, video: ''},
      }),
    );

  }
  useEffect(() => {

    if (videoChaperStatus === 'success' ) {
      _handlecommonScene();
      dispatch(
        File({
          file: {
            name:
             '',
            uri: '',
            type: '',
          },
        }),
      );
      dispatch(Video({video: ''}));



      dispatch(ThumbnailResponseNew({path: ''}));
      refetch && refetch()

      showSuccess("Lesson Uploaded Successfully");
    } else if (videoChaperStatus === 'error' ) {
      _handlecommonScene()
      console.log("fileDetailfileDetailfileDetailfileDetail", fileDetail,error);
      dispatch(ThumbnailResponseNew({path: ''}));
      dispatch(
        File({
          file: {
            name:
             '',
            uri: '',
            type: '',
          },
        }),
      );
      dispatch(Video({video: ''}));
      // dispatch(ThumbnailResponseNew({path: ''}));
      refetch && refetch()


      showError('Error While Uploading Lesson');
    } else if (videoChaperStatus === 'pending') {
      dispatch(ThumbnailResponseNew({path: ''}));
      setLoading(true);
      // dispatch(ThumbnailResponseNew({path: ''}));
    }
  }, [videoChaperStatus,updateVideoStatus]);

  //logic function
  const handleVideo = async () => {
    try {
      // const result = await ImagePicker.openPicker({
      //   mediaType: 'video',
      //   compressVideoPreset: 'Passthrough',
      // });
      const result = await launchImageLibrary({mediaType:"video"});
      setVideoLoading(true)
      console.log("here's the result that is coming",result);

      if(!!result?.didCancel){
        setVideoLoading(false);
        showError("No Video Was selected")
        return;
      }

      // return;
      if(result?.assets){
      setVideoLoading(true)
      const url = new URL(result?.assets[0]?.uri);
      const newPathName = url?.pathname?.split('/');
      console.log("idhar se sresult pick ho gya ahi");

      const urlVideo = `https://video.bunnycdn.com/library/${BunnyData?.data?.LIB_ID}/videos`;
      const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          AccessKey: BunnyData?.data?.API_KEY,
        },
        body: JSON.stringify({
          title: result?.assets[0]?.fileName || newPathName[newPathName.length - 1],
        }),
      };
      setLoading2(true);

      const response = await fetch(urlVideo, options);
      console.log("response bhi aa chuka hai",response);

      const data = await response?.json();

      if (data && (result?.assets[0]?.uri || result?.assets[0]?.originalPath)) {
        dispatch(
          File({
            file: {
              // name:
              //   Platform.OS === 'ios'
              //     ? result?.assets[0].fileName
              //     : newPathName[newPathName.length - 1],
              name:result?.assets[0]?.fileName,
              uri: Platform.OS === 'ios' ? result?.assets[0]?.uri : result?.assets[0]?.uri,
              type: result?.assets[0]?.type,
            },
          }),
        );
        dispatch(Video({video: data?.guid}));

        setVideoLoading(false);
        setLoading2(false);
      }
    }else{
      setVideoLoading(false);
        throw new Error("Error while selecting the video")
    }


    } catch (err: any) {
      console.log("kkavhi kabhi error aa rha h", err);
      setLoading2(false);
      setVideoLoading(false);
      showError('error while uploading the video');
      if (err?.message == 'User did not grant library permission.') {
        if (Platform.OS === 'ios') {
          Linking.openURL('app-settings:');
        } else {
          Linking.openSettings();
        }
      }



    }
    return;
  };

  const handleLesson = () => {
    // Alert.alert("sasdasdasd")
    // return

    if(lessonUpdate){
      let payload = {
        id: lessonChapter?.video_id,
        video: video? video : lessonChapter?.video,
        name: lessonChapter?.name,
        file_name:fileDetail?.name,
        is_parent:false
      };
      // if(videoId){
      //   payload.video_id=videoId
      // }
      if(position){
        payload.position=position
      }else {
        payload.is_parent=true;
      }
      updateVideoData(payload);

    }else {
      const payload = {
        name: lessonChapter?.name,
        video: video,
        // video:"70ed328b-9c66-4f63-abee-c3995ef49de9",
        chapter_id:chapterBackId?chapterBackId:chapterId,
        library_id: BunnyData?.data?.LIB_ID,
        file_name:fileDetail?.name,
        is_parent:false,
      };
      // if(videoId){
      //   payload.video_id=videoId
      // }
      if(position){
        payload.position=position
      }
      else {
        payload.is_parent=true;
      }

      addVideoData(payload);
    }

  };


    useEffect(()=>{
      if(updateVideoStatus === "success"){
        showSuccess("Lesson Updated Successfully");
        dispatch(LessonUpdate({lessonUpdate: false}));
        _handlecommonScene()
        dispatch(
          LessonChapter({
            lessonChapter: {
              ...lessonChapter,
              chapter_id: 0,
              video_id: 0,
              name: '',
              video: '',
              file_name:'',
            },
          }),
        );
        dispatch(
          File({
            file: {
              name:
               '',
              uri: '',
              type: '',
            },
          }),
        );
        dispatch(Video({video: ''}));



        dispatch(ThumbnailResponseNew({path: ''}));
        refetch && refetch()
        toggleModal&&toggleModal()

      } else if(updateVideoStatus === "error"){
        showSuccess("Error While Updating the lesson");

        _handlecommonScene()
        dispatch(LessonUpdate({lessonUpdate: false}));
        dispatch(
          LessonChapter({
            lessonChapter: {
              ...lessonChapter,
              chapter_id: 0,
              video_id: 0,
              name: '',
              video: '',
              file_name:'',
            },
          }),
        );
        dispatch(ThumbnailResponseNew({path: ''}));
        dispatch(
          File({
            file: {
              name:
               '',
              uri: '',
              type: '',
            },
          }),
        );
        refetch && refetch()
        toggleModal&&toggleModal()
      } else if (updateVideoStatus === 'pending') {
        dispatch(ThumbnailResponseNew({path: ''}));
        setLoading(true);
        // dispatch(ThumbnailResponseNew({path: ''}));
      }
    },[updateVideoStatus])


      if(bunnyStatus === "pending"){
        return(
          <>
              <ActivityIndicator color={colors.theme} size={moderateScale(20)}/>
          </>
        )

      }


  return (
    <View style={{marginBottom:Platform.OS==="ios"?keyboardHeight:0}}>
      <View>
        <Text
          style={[
            styles.textInputHeading,
            {
              color: colors.black,
              fontFamily: fontFamily.Poppins_SemiBold,
              fontSize: textScale(14),
            },
          ]}>
          {mainStrings.lessonName}
        </Text>
        <CustomTextInput
          placeholder={mainStrings.lessonName}
          containerStyle={{}}
          isError={!!lessonChapterError.name}
          onChangeText={e => {
            // dispatch(CourseData({...courseData,chapterName:e}));
            if (lessonChapter?.name) {
              dispatch(
                LessonChapterError({
                  lessonChapterError: {...lessonChapterError, name: ''},
                }),
              );
              // setLessonChapterError({...lessonChapterError, name: ''});
            }
            dispatch(
              LessonChapter({lessonChapter: {...lessonChapter, name: e}}),
            );

            // setLessonChapter({...lessonChapter, name: e});
          }}
          value={lessonChapter.name}
        />
        {lessonChapterError?.name && (
          <ErrorMessage
            message={lessonChapterError?.name}
            errorStyle={{marginLeft: moderateScaleVertical(10)}}
          />
        )}
      </View>
      {
        <View style={styles.textInputContainer}>
          <Text style={styles.textHeading}>
            {chapterLength === 0
              ? mainStrings.UploadIntroductionVideo
              : mainStrings.UploadNoteVideo}
          </Text>
          <TouchableOpacity
            style={styles.uploadPhotoContainer}
            onPress={handleVideo}
            disabled={loading2}
            >
            {thumbnailResponse ? (
              <View style={styles.thumbnailImage}>
                <View style={styles.notesImgContainer}>
                  <FastImage
                    style={styles.notesImg}
                    source={{uri: `${IMAGE_API_URL}${thumbnailResponse}` || thumbnailResponse}}
                    resizeMode="cover"
                  />
                  <View style={{position:"absolute",justifyContent:"center",alignItems:"center",width:"100%",height:"100%",backgroundColor:"#00000075",top:0,left:0}}>

                  <Text style={[styles.notesThumbText,{color:colors.white,justifyContent:"center",}]}>{lessonChapter.file_name?lessonChapter.file_name:fileDetail?.name}</Text>
                  </View>
                </View>
              </View>
            ) : (

              <View style={styles.uploadPhotoContainerBtn}>


                {!!(+progress) || !!videoLoading ?
                <>
                 <View style={{height:moderateScaleVertical(120)}}>
                   <Progress.Circle
              color={colors.theme}
              size={moderateScale(100)}
              indeterminate
               />

                </View>
                   <Text  style={{
                    fontFamily: fontFamily.Poppins_Regular,
                    fontSize: textScale(16),

                    color: colors.theme,
                  }}>{!!+progress && `${progress}%`}</Text>
                </>

               : <>
               <UploadIcon
                size={moderateScale(100)}
                color={colors.theme}
                name="file-upload"
              />
              <Text
                style={{
                  fontFamily: fontFamily.Poppins_Regular,
                  fontSize: textScale(16),
                  color: colors.theme,
                }}>
                {lessonChapter?.file_name?`${lessonChapter?.file_name}`:mainStrings.UploadNoteVideo}
              </Text>
              </>}

              </View>
            )}

          </TouchableOpacity>
        </View>
      }
       {lessonChapterError?.video && (
          <ErrorMessage
            message={lessonChapterError?.video}
            errorStyle={{marginLeft: moderateScaleVertical(10)}}
          />
        )}
      <CommonButton
        btnText="Add Lesson"
        loading={loading}
        onPressBtn={handleLesson}
        mainViewStyle={{marginHorizontal: 0}}
      />
    </View>
  );
};

export default AddNewLesson;

const styles = StyleSheet.create({
  textHeading: {
    fontFamily: fontFamily.Poppins_SemiBold,
    fontSize: textScale(15),
    color: colors.black,
  },

  textInputContainer: {
    marginVertical: moderateScaleVertical(8),
  },
  uploadPhotoContainer: {
    // height: moderateScaleVertical(150),

    gap: moderateScale(12),

    justifyContent: 'center',
    borderRadius: moderateScale(24),
    overflow: 'hidden',
    borderWidth: 1.5,
    alignItems: 'center',

    borderColor: colors.theme,
    marginVertical: moderateScaleVertical(10),
  },
  uploadPhotoContainerBtn: {
    padding: moderateScale(12),
    justifyContent: 'center',
    alignItems: 'center',
    gap: moderateScaleVertical(12),
    paddingVertical: moderateScale(32),
  },
  thumbnailImage: {
    width: width,
    overflow: 'hidden',
    borderRadius: moderateScale(12),
    marginRight: moderateScale(16),
    position:"relative",
  },
  notesImgContainer: {
    width: width,
    height: moderateScaleVertical(200),
    resizeMode: 'cover',
    borderRadius: moderateScale(12),
    overflow: 'hidden',
  },
  notesImg: {
    width: '100%',
    height: '100%',
  },
  notesThumbText: {
    color: colors.black,
    fontFamily: fontFamily.Poppins_SemiBold,
    fontSize: textScale(14),
    textAlign: 'center',
    marginTop: moderateScaleVertical(8),

  },
  textInputHeading: {
    fontFamily: fontFamily.Poppins_Regular,
    fontSize: textScale(14),
    color: colors.grey1,
  },
});
