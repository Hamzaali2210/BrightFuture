export const paymentState = {
  cartData: [],
  fullCourse: false,
  addedCartData: [],
  couponApplied:false,
  courseData: {
    courseName: '',
    description: '',
    coverPhotoUrl: '',
    whatsappLink: '',
    chapterData: [],
  },
};

export const tagData = {
  wishlistTag: [],
  userRecording: false,
};

export const couponCode = {
  cartCall:0,
};

export const apiData = {
  cartCall:0,
  wishCall:0,
  paymentCall:0,
};
export const loaderHome  = {
   featureList : true,
   categoryList : true, 
   packageList : true, 
   couponList :true, 
   finalLoader : true, 
   instructorList: true,
}

export const addChapter = {

  chapterLength :0,

  chapterData: {
    chapterName: '',
    accessType: 'free',
    price: '',
    chapterVideoLink: '',
    chapterVideoName: '',
    notes: [],
    id: '',
    isSubscribed:false,
  },
  chapterDataError: {
    chapterName: '',
    coverPhoto: '',
    price: '',
    chapterVideoLink: '',
  },
  notes: {
    notesName: '',
    notesDescription: '',
    documentFile: '',
    documentFileUrl: '',
    notesVideo: [],
    id: '',
    isLesson:false,
  },
  notesError:{
    notesName: '',
    notesDescription: '',
    documentFile: undefined,
    documentFileUrl: '',
    id: '',
  },

  lessonChapter: {
    chapter_id: 0,
    video: '',
    name: '',
  },
  lessonChapterError: {
    video: '',
    name: '',
  },
 
  selectedChapter:{},
  lessonChapterId:null,
  position:null,
  notesAdded:[],
  notesInit:false,
  isModalVisible:false,
  chapterInit:true,
  chapterId:"",
  loading:false,
  notesVideoLoading:false,
  thumbnailResponse:"",
  thumbnailLoading:false,
  notesVideo:[],
  docUploading:false,
  chapterUpdate:false,
  notesUpdate:false,
  lessonUpdate:false,
  addNote:false,
  file:null,
  subFile:null,
  video:'',
  videoType:'',
  shaText:'',
  subVideo:'',
  progress:'0',
  progress2:"",
  upload:''




};






export const filterState = {
  
  courseName:{name:"",id:null},
  courseCode:{name:"",id:null},
  department:{name:"",id:null},
  university:{name:"",id:null},
  instructor:{name:"",id:null},
  rating:"",

}

