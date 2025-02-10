import React, { BlockquoteHTMLAttributes } from 'react';
import {
  ColorValue,
  KeyboardTypeOptions,
  TextStyle,
  ViewStyle,
} from 'react-native';

import {DocumentPickerResponse} from 'react-native-document-picker';

export interface HomeHeading {
  title: string;
  routeName?: string;
  tooltip?:boolean;
  tooltipContent?:string;
}

export interface categoryDataType {
  id?: number;
  title: string;
  svgIcon: any;
}

export interface DropDown {
  data?: any[];
  setSelectedItemFunc: (selItem: string, index: number, key: string) => void;
  selectedItem: {};
  placeholderInput: string;
  keyItem: string;
}

export interface CustomInput {
  value?: string;
  placeholder?: string;
  onChangeText?: (val: any) => void;
  isError?: boolean;
  inputStyle?: TextStyle;
  multiline?: boolean;
  keyboardType?: KeyboardTypeOptions;
  containerStyle?: ViewStyle;
}

export interface CustomInputDate extends CustomInput {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  date: Date;
  open: boolean;
}

export interface CustomInputIcon {
  value: string;
  placeholder: string;
  secure: boolean;
  icon: any;
  onChangeText: (val: any) => void;
  handleIconPress: () => void;
  isError?: boolean;
}


export interface CustomNativeDropdown{
  isError?: boolean;
  data?:any;
  value?:string;
  defaultValue?:string|number;
  handleChange: (val: string) => void;
  placeholder:{label:string,value:null};
  viewContainerStyle?:ViewStyle,
  onDonePress?:()=>void

}



export type TabType = {
  label: string;
  index: string | number;
};
export interface CustomTabProps {
  children: React.ReactNode;
  tabTitle: Array<TabType>;
  tabStyle?: ViewStyle;
  customTabStyle?: ViewStyle;
  highlightedColor?: ColorValue;
  textStyle?: TextStyle;
  pageCurrent?: number;
  pagerViewStyle: ViewStyle;
  setPageCurrent: React.Dispatch<React.SetStateAction<number>> | undefined;
}

export type Status = "Completed" | "Pending"
 
export interface LessonItemProps {
  chapterName: string;
  notesQuantity: string;
  timing: string;
}

export interface BuyLesson extends LessonItemProps {
  isFree?: boolean;
  priceLesson: string;
  handleCart?: (item: any, type: string) => void;
  item: any;
  instructor?: boolean;
  handleDetail?: (item: any) => void;
}

export interface ChapterInterface {
  course: ChapterCourseDetail;
  created_at: string;
  delete_request: boolean;
  id: number;
  is_deleted: boolean;
  name: string;
  price: string;
  updated_at: string;
  videos: Array<any>;
}

export interface ChapterCourseDetail {
  chapters_count: number;
  created_at: string;
  id: number;
  image: string | null;
  isPublished: boolean;
  name: string;
  offline_price: number;
  online_price: number;
  sections_count: number;
  university_name: string;
  updated_at: string;
  vdocipher_folder_id: string | null;
  whats_app_group_id: string | null;
  whats_app_group_name: string | null;
}

export interface CourseDataInterface {
  students: number;
  duration:number;
  is_purchasable:boolean;
  chapters: Array<ChapterInterface>;
  chapters_count: number;
  created_at: string;
  description: string;
  purchased_students_count:string;
  full_price: number;
  id: number;
  image: string;
  in_cart: boolean;
  instructor: any;
  isPublished: boolean;
  is_favourite?: boolean;
  discounted_price?:number;
  reviews_count: number;
  rating: number;
  average_rating?: number;
  online_price?:number;
  online_discounted_price?:number;
  in_person_discounted_price?:number;



  is_processing: boolean;
  is_purchased: boolean;
  name: string;
  university: Object;
  university_name: string;
  updated_at: string;
  video_count:number;
}

export interface wishlistType {
  course: ChapterCourseDetail;
  course_id: number;
  created_at: string;
  id: number;
  status: string;
  updated_at: string;
  user: UserProfileWishlist;
  user_id: number;
}

export interface UserProfileWishlist {
  avatar: null | string;
  country_code: string;
  created_at: string;
  dark: boolean;
  first_name: string;
  full_name: string;
  id: number;
  is_banned: boolean;
  last_login: string;
  last_name: string;
  mobile: string;
  referral_code: string;
  role: number;
  status: number;
  updated_at: string;
  wallet: number;
}

export interface InstructorType {
  id: number;
  full_name: string;
  avatar: string | null;
  dark: boolean;
  wallet: number;
  courses_count: number;
  reviews_count:number;
  average_rating:number;
  instructor_role:string;
}

export interface StudentReviewType {
  id: number;
  full_name: string;
  avatar: null | string;
  created_at?:string;
  student_id: string;
  review:string;
  rating:number;
  user:{
    avatar:string;
    review:string;
    rating:number;
    full_name:string;
  }
  is_publish?:number;
}


/*course chapter and notes type*/

export interface NotesType {
  notesName: string;
  notesDescription: string;
  documentFile: DocumentPickerResponse;
  documentFileUrl:string;
  id: string;
  notesVideo?: Array<string>;
}

export interface CourseChapter {
  name: string;
  videos: any;
  chapterName: string;
  can_view?:boolean

  accessType: string;
  price: string;
  chapterVideoLink: string;
  chapterVideoName: string;
  notes?: Array<NotesType>;
  video_and_notes?:[];

  id?: string | number;
}

export interface CourseDetail {
  courseName: string;
  description: string;
  coverPhotoUrl: string;
  whatsappLink: string;
  universityId: number;
  categoryId: number;
  chapterData?: Array<CourseChapter>;
}


export interface CouponCardInterface {
  expiryData: string;
  couponTitle :string;
  courseCount?: string;
  discountAmount?: number;
  discountType?: 'percentage' | 'price';
  realPrice?: number;
  code?: string;
  couponStyle?: ViewStyle;
  couponColor?: string;
  couponType ?:'group' | 'package' | 'discount' | 'special' ;
  navigationPath?:string;
}