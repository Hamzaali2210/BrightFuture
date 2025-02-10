import {ViewStyle} from 'react-native';

import {Status} from './uiType';
import React from 'react';

export interface FeatureCardInterface {
  textPara: string;
  svgImage: any;
  text: string;
  textDescColor?:string;
  duration:number;
  courses:[];
  colorGrad:string[];
  imageBack:string;
  textColor?:string;
  textSize?:string;
  cardId?:number;
}

export interface CoursesHomeItemProps {
  title: string;
  subject: string;
  dueDate?:boolean;
  price: number;
  // courseCode?:number;
  rating: string;
  discountPrice:number;
  courseId:number;
  imageCover:string;
  isFavorite?:boolean;
  refetch?:()=>void;
  isExpired?:boolean;
  
  fromWishlist?:boolean;
  containerStyle?: ViewStyle;
  handleFavorite?:()=>void;
  instructorName?:string;
  instrutorAvatar?:string;
  reviewAdded?:boolean;
  orderNumber?:string;
  orderStatus?:string;
  itemId?:string;
  courseCode?:string|number;
}

export interface CategoryDetailItemProp {
  title: string;
   handlePress:()=>void
  containerStyle?: ViewStyle;
  coverPhoto?:string;
}

export interface ReviewItemProp extends CategoryDetailItemProp {
  courseName: string;
}

export interface InstructorItemProps {
  title: string;
  position: string;
  imgPath: any;
  style?:ViewStyle;
  reviews:number;
  id:number;
  avgRating:number;
  home?:boolean;
}

export interface ContractItemProps {
  title: string;                                                                                                                                      
  svgImage: any;
  id?: number;
  overcomeStyleText?: any;
            
  handlePress?: () => void;
}


export type courseDiscountInterface = 'group' | 'course' | 'package' | 'special' | 'voucher' 
export interface CourseItem {
  imageUrl: string;                                                                                                                                                                                                                                                                                                                                                                                                                                           
  heading: string;
  dueDatePassed?:boolean;
  refetch?:()=>void;
  purchasedId?:number;
  authorAvatar?:string;
  isPurchasable?:boolean;
  course:any,
  isExpired?:boolean;
  author: string;
  isFavorite?:boolean;
  isLocked?:boolean;
  description: string;
  courseCode?:string;
  price?: number;
  discountPrice?: number;
  numLesson: number;
  isAddedToCart?:boolean,
  purchasedCourse?:boolean,
  courseType?:string;
  groupLink?:string;
  dueDate?:string;

  getCourseDataAgain?:()=>void;
  courseDiscount?:boolean;
  couponCourse?:boolean;
  courseId?:number;
  handleCouponSelection ?: () => void;
  thumbnail?:boolean;
  courseDiscountType?:() => courseDiscountInterface
}

export interface ProfileContainerProps {
  name: string;
  profession: string;
  rating: number;
  handleEdit?: () => void;
}

export interface PaymentInterface {
  paymentButton: boolean;
  paymentBoxStyle?: ViewStyle;
  totalPrice: string | number;  
  subTotalPrice: string;
  walletBalance:number;
  discountPrice: string;
  cartId:number;
  handleCheckout?:()=>void;
  courseId?:number;
  orderType?:string;
  // handlePress: () => void;

}

export interface PaymentCardInterface {
  paymentTitle: string;
  paymentParagraph: string;
  price: string | number;
  date: string;
  status: Status;
  handlePaymentCard:(type:Status)=>void
}

export interface ChapterDetailInterface {
  chapterName: string;
  edit?:boolean;
  deleteChapter?:boolean;
  views: string;
  notesNumber: number;
  handleEdit?: (id:number) => void;
  handleDelete?: (id:number) => void;
  handleEditVideo?:(id?:number,item?:any) => void;
  // handleDeleteNotes?: (id?:number) => void;
  handleAdd?: () => void;
  handleAddNotes?: (id:number) => void;
  handleEditNotes ?: () =>void;
  refetch:()=>{}

  duration: string;
  canSee?:boolean;
  chapterId?:number;
  notesInfo?:any;
  studentCourse?:boolean;
  isCollapsed2?:boolean;
  setIsCollapsed2?:React.Dispatch<React.SetStateAction<boolean>>
  setCurrentVideo?:React.Dispatch<React.SetStateAction<string>>;
  lessonNo?:number;
  addBtn?:boolean;
}

export interface PaymentTextInterface {
  total: string | number;
  title: string;
}

export interface PlanTabInterface {
  activeColor: number;
  handleActive: (type:number) => void;
}



export interface EnrolledStudentProps{
  name:string;
  price:number;
  chapterLength:number;
  paidDate:string;
  imageLink:string;
  isVerified:boolean;
  subType:boolean;
} 


export interface SignleCourseItemListProps{
    categoryId?:number;
    categoryKey?:string;
    value?:string;
    instuctorId?:number;
    getDataAgain?:()=>{}
}



export interface MyCourseListInterface {
  value:string;
}



export interface AllPaymentInterface {
  paymentListType : "all" | "completed"| "pending"
}

export interface PaymentListInterface {
  handlePayNowButton?: (pay:number)=>void;
  checklist:boolean;
  toBePaid?:any,
  paymentCheck?:boolean;
  
  data:any


  
}


export interface PurchasedCourseDetailInterface {
    checklist?:boolean; 
    paymentType :"full" | "emi"
    
   
}


export interface HeaderCardInterface{
  title:string,
  right?:boolean
  rightComponent?:()=>React.JSX.Element

}