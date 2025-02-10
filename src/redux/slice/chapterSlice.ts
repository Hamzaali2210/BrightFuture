import {createAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {addChapter} from '../state/initialState';
import {createThumbnail} from 'react-native-create-thumbnail';
import * as tus from 'tus-js-client';
import {showError, showSuccess} from '../../utils/helperFunctions';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import {API_URL_2} from '../../utils/urls';
import {constantpayload} from '../../constants/mainstrings';
import CryptoJS from 'crypto-js';

export const ThumbnailResponseNew = createAsyncThunk(
  'chapter/ThumbnailResponseNew',
  // if you type your function argument here
  async (result: any) => {
    console.log("thumbnail api chl rhi hai",result);
    if(result?.path){
      const response = await createThumbnail({
        url: result?.path,
        timeStamp: 10000,
      });
      
      return response;
    }
    else {
      console.log("else mein gya hai idhar");
      
      return '';
    }
   

  },
);

export const UploadDocuments = createAsyncThunk(
  'chapter/UploadDocuments',
  async (data: any, {dispatch, rejectWithValue, getState}) => {
    try {
      dispatch(DocUploading({docUploading: true}));
      const state: any = getState();
      const notesState = state?.chapter?.notes;
      console.log("here's the staet that is coming and full", state);

      const result = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        // copyTo: 'cachesDirectory',
        type: [
          DocumentPicker.types.pdf,
          DocumentPicker.types.csv,
          DocumentPicker.types.docx,
          DocumentPicker.types.xls,
          DocumentPicker.types.xlsx,
          DocumentPicker.types.ppt,
          DocumentPicker.types.pptx,
          DocumentPicker.types.zip,
        ],
      });
     
      
      let formData = new FormData();
      formData.append('file', {
        name: result?.name,
        uri: result?.uri,
        type: result?.type,
      });

      let response = await fetch(`${API_URL_2}upload-file`, {
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const data = await response.json();
      console.log("document result :::::::",result,data);
      

      if (data?.data?.status === 200 || data?.status === 'success') {
        showSuccess('Pdf Uploaded SuccessFully');
        dispatch(
          NotesData({
            notes: {
              ...notesState,
              documentFile: result,
              documentFileUrl: data?.data[0],
            },
          }),
        );
        dispatch(DocUploading({docUploading: false}));

        return data;
      }else{
        throw new Error("Error While Uploading the pdf")
      }
    } catch (err) {
      showError('error while uploading the pdf');
      dispatch(DocUploading({docUploading: false}));
    }
    return;
  },
);

export const _tusUploadFunction = (file:Blob,shText:string,libId:number,video:string,thumbnailPath:string,expireTime:number,thunkObj?:any) =>{
  console.log("filefilefilefilefilefilefilefilefilefilefilefile",file);
  
  
  const {dispatch, rejectWithValue, getState,fulfillWithValue,} = thunkObj
  dispatch(ThumbnailResponseNew({path: ''}));
  var upload = new tus.Upload(file, {
    endpoint: 'https://video.bunnycdn.com/tusupload',
    retryDelays: [0, 3000, 5000, 10000, 20000 ],
    headers: {
      AuthorizationSignature: shText, // SHA256 signature (library_id + api_key + expiration_time + video_id)
      AuthorizationExpire: expireTime.toString(), // Expiration time as in the signature,
      VideoId: video, // The guid of a previously created video object through the Create Video API call
      LibraryId: `${libId}`,
    },
    // chunkSize:1*1024*1024,
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
      rejectWithValue("Error while uploading the video")
    },
    onProgress: function (bytesUploaded, bytesTotal) {
      
     
     
      
        var percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
        
        dispatch(ProgressVideo({progress: percentage}));

      
      // if(!thumbnailPath){
        
      // }
     

      
      
    },
    onSuccess: function () {
      showSuccess("Video is Uploaded Successfully")
      // dispatch(ThumbnailResponseNew({thumbnailResponse:file?.uri}))
      dispatch(ThumbnailResponseNew({path: file?.uri}));
      
      fulfillWithValue("Video is Uploaded")

    },
  });
  
  return upload 

}


export const ResumableUpload = createAsyncThunk(
  'chapter/ResumableUpload',
  async (data: any, {dispatch, rejectWithValue, getState,fulfillWithValue,}) => {
    return new Promise((reject,resolve)=>{
      const libId = constantpayload.LIB_ID;
      const expireTime = constantpayload?.EXPIRE_TIME;
      const state:any = getState();
      const shaText= state?.chapter?.shaText
      const file= state?.chapter?.file;
      const thumbnailPath =state?.chapter?.thumbnailResponse
      const video= state?.chapter?.video
  
      const shText = CryptoJS.SHA256(shaText).toString();
      console.log("dihar bhi phunch gya hai ",file,video);
      

  
  
     
      var upload = _tusUploadFunction(file,shText,libId,video,thumbnailPath,expireTime,{dispatch, rejectWithValue, getState,fulfillWithValue,})
      console.log("uploaduploaduploaduploadupload",upload);
      // upload.start();
      
      // Check if there are any previous uploads to continue.
      // dispatch(Upload({upload: upload.url}));
      // setUpload(upload);
      // upload.start();
      // return ;
      upload.findPreviousUploads().then(function (previousUploads) {
        console.log("previosu upload me in aa gya hun ");
        
        // Found previous uploads so we select the first one.
        if (previousUploads.length) {
          upload.resumeFromPreviousUpload(previousUploads[0]);
          console.log("previosu upload me in aa gya hun aur bhi anadar ");
        }
  
        // Start the upload
        console.log("upload karna start kar dia hai");
        
        upload.start();
      });
    }).catch((err)=>{
          console.log("abhi resume karte wawt error aaya ahi pta nhi ",err);
          // upload.start();
          
    })
    
  },
);





export const chapterSlice = createSlice({
  name: 'addChapter',
  initialState: {
    ...addChapter,
  },
  reducers: {
    ChapterData: (state, {payload}) => {
      state.chapterData = payload?.chapterData;
    },
    ChapterDataError: (state, {payload}) => {
      state.chapterDataError = payload?.chapterDataError;
    },
    NotesData: (state, {payload}) => {
      state.notes = payload?.notes;
    },
  
    NotesDataError: (state, {payload}) => {
      state.notesError = payload?.notesError;
    },
    LessonChapter: (state, {payload}) => {
      state.lessonChapter = payload?.lessonChapter;
    },
    LessonChapterError: (state, {payload}) => {
      state.lessonChapterError = payload?.lessonChapterError;
    },
    SelectedChapter: (state, {payload}) => {
      state.selectedChapter = payload?.selectedChapter;
    },
    LessonChapterId: (state, {payload}) => {
      state.lessonChapterId = payload?.lessonChapterId;
      // state.position=payload?.position;
    },
    PositionId: (state, {payload}) => {
      console.log("ye chl rha he position pe",payload,payload?.position);
      
      // state.lessonChapterId = payload?.lessonChapterId;
      state.position=payload?.position;
    },

    NotesAdded: (state, {payload}) => {
      state.notesAdded = payload?.notesAdded;
    },
    NotesInit: (state, {payload}) => {
      state.notesInit = payload?.notesInit;
    },
    IsModalVisible: (state, {payload}) => {
      state.isModalVisible = payload?.isModalVisible;
    },
    ChapterInit: (state, {payload}) => {
      state.chapterInit = payload?.chapterInit;
    },
    ChapterId: (state, {payload}) => {
      state.chapterId = payload?.chapterId;
    },
    Loading: (state, {payload}) => {
      state.loading = payload?.loading;
    },
    NotesVideoLoading: (state, {payload}) => {
      state.notesVideoLoading = payload?.notesVideoLoading;
    },
    NotesVideo: (state, {payload}) => {
      state.notesVideo = payload?.notesVideo;
    },
    DocUploading: (state, {payload}) => {
      state.docUploading = payload?.docUploading;
    },
    ChapterUpdate: (state, {payload}) => {
      state.chapterUpdate = payload?.chapterUpdate;
    },
    NotesUpdate: (state, {payload}) => {
      state.notesUpdate = payload?.notesUpdate;
    },
    LessonUpdate: (state, {payload}) => {
      state.lessonUpdate = payload?.lessonUpdate;
    },
    AddNote: (state, {payload}) => {
      state.addNote = payload?.addNote;
    },
    File: (state, {payload}) => {
      state.file = payload?.file;
    },
    SubFile: (state, {payload}) => {
      state.subFile = payload?.subFile;
    },
    Video: (state, {payload}) => {
      state.video = payload?.video;
      
    },
    VideoType: (state, {payload}) => {
      state.videoType = payload?.videoType;
    },
    ShaText: (state, {payload}) => {
      state.shaText = payload?.shaText;
    },
    SubVideo: (state, {payload}) => {
      state.subVideo = payload?.subVideo;
    },
    ThumbnailResponse: (state, {payload}) => {
      state.thumbnailResponse = payload?.thumbnailResponse;
    },

    ProgressVideo: (state, {payload}) => {
      state.progress = payload?.progress;
    },
    Progress2: (state, {payload}) => {
      state.progress2 = payload?.progress2;
    },
    Upload: (state, {payload}) => {
      state.upload = payload?.upload;
    },
    ChapterLength: (state, {payload}) => {
      state.chapterLength = payload?.chapterLength;
    },
  },

  extraReducers(builder) {
    builder.addCase(ThumbnailResponseNew.pending, (state, action) => {
      state.thumbnailLoading = true;
    });
    builder.addCase(ThumbnailResponseNew.fulfilled, (state, action) => {


      console.log("idhar fullfilled value aati hai action ke andar",action);
      
      state.thumbnailLoading = false;
      state.thumbnailResponse = action?.payload?.path;
    });
    builder.addCase(ThumbnailResponseNew.rejected, (state, action) => {
      state.thumbnailLoading = false;
    });
    builder.addCase(ResumableUpload.pending, (state, action) => {
      
      state.notesVideoLoading = true;
    });
    builder.addCase(ResumableUpload.fulfilled, (state, action) => {
      state.notesVideoLoading = false;
       
    });
    builder.addCase(ResumableUpload.rejected, (state, action) => {

      state.notesVideoLoading = false;
     
    });
  },
});

export const {
  ChapterData,
  ChapterDataError,
  ChapterId,
  ChapterLength,
  ChapterInit,
  ChapterUpdate,
  NotesAdded,
  NotesData,
  NotesDataError,
  NotesInit,
  NotesUpdate,
  NotesVideo,
  NotesVideoLoading,
  AddNote,
  SelectedChapter,
  ShaText,
  SubFile,
  SubVideo,
  ProgressVideo,
  Progress2,
  Upload,
  DocUploading,
  LessonUpdate,
  LessonChapter,
  LessonChapterError,
  LessonChapterId,
  Loading,
  Video,
  VideoType,
  PositionId,
  ThumbnailResponse,

  IsModalVisible,
  File,
} = chapterSlice.actions;

export default chapterSlice.reducer;
