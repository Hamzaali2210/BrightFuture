import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
  } from 'react-native';
  import React, {useState} from 'react';
  
  import {useNavigation} from '@react-navigation/native';
  import CrossIcon from '../../../assets/images/Icons/crossIcon.svg';
  import commonStyles from '../../../styles/commonStyles';
  import fontFamily from '../../../styles/fontFamily';
  import MultiSlider from '@ptomasroos/react-native-multi-slider';
  import {
    moderateScaleVertical,
    moderateScale,
    textScale,
  } from '../../../styles/responsiveSize';
  import colors from '../../../styles/colors';
  
  import RightArrow from '../../../assets/images/Icons/rightArr.svg';
  import CommonButton from '../../CommonButton';
  import ModalCard from '../../Layout/Card/ModalCard';
  import CustomNativeDropDown from '../../Forms/CustomNativeDropDown';
  import {useDispatch, useSelector} from 'react-redux';
  import {
    CourseCode,
    CourseName,
    Department,
    InstructorData,
    RatingData,
    UniversityData,
  } from '../../../redux/slice/filterSlice';
  import {TextInput} from 'react-native-gesture-handler';
  import useGetData from '../../../hooks/useGetData';
  import {endpoints} from '../../../utils/endpoints';
  import useGetInfinityData from '../../../hooks/useInfinityQuery';
  
  interface FilterComponentProps {
    leftTitle: string;
    rightTitle: string;
    handlePress: () => void;
  }
  
  const sortData = [
    {
      name: 'University',
      id: 'University',
    },
    {
      name: 'Instructor',
      id: 'Instructor',
    },
    {
      name: 'Department',
      id: 'Department',
    },
    {
      name: 'Course Name',
      id: 'Course Name',
    },
    {
      name: 'Course Code',
      id: 'Course Code',
    },
  ];
  
  const FilterComponent: React.FC<FilterComponentProps> = ({
    rightTitle,
    leftTitle,
    handlePress,
  }) => (
    <TouchableOpacity style={[styles.filterComponent, commonStyles.spacingCommon]}  onPress={handlePress}>
      <View style={[styles.filterHeading, {flex: 1}]}>
        <Text style={styles.filterTextLeft}>{leftTitle}</Text>
      </View>
      <View>
        <View style={[styles.filterHeadingRight, {}]}>
          <Text style={styles.filterTextRight}>{rightTitle}</Text>
          <RightArrow />
        </View>
      </View>
    </TouchableOpacity>
  );
  
  function FilterInstructor() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const universityData = useSelector((state: any) => state?.filter?.university);
    const instructorData = useSelector((state: any) => state?.filter?.instructor);
  const ratingData = useSelector((state: any) => state?.filter?.rating);
    const departmentData = useSelector((state: any) => state?.filter?.department);
    const courseName = useSelector((state: any) => state?.filter?.courseName);
    const courseCode = useSelector((state: any) => state?.filter?.courseCode);
  
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisible2, setIsModalVisible2] = useState(false);
    const [isModalVisible3, setIsModalVisible3] = useState(false);
    const [isModalVisible4, setIsModalVisible4] = useState(false);
    const [isModalVisible5, setIsModalVisible5] = useState(false);
  
    const toggleModal = () => {
      setIsModalVisible(!isModalVisible);
    };
    const toggleModal2 = () => {
      setIsModalVisible2(!isModalVisible2);
    };
    const toggleModal3 = () => {
      setIsModalVisible3(!isModalVisible3);
    };
    const toggleModal4 = () => {
      setIsModalVisible4(!isModalVisible4);
    };
    const toggleModal5 = () => {
      setIsModalVisible5(!isModalVisible5);
    };
  
    const handleNavigation = () => {
      navigation.goBack();
    };
  
    const {data: uniData}: any = useGetData(endpoints.UNIVERSITIES, [
      'UNIVERSITIES',
    ]);
    const {data: ins}: any = useGetData(endpoints.INSTRUCTOR, ['INSTRUCTOR']);
    const {data: uniDeptData}: any = useGetData(
      endpoints.UNIVERSITIES_DEPRATMENT,
      ['UNIVERSITIES_DEPRATMENT'],
    );
    const {data: courseData}: any = useGetData(
      endpoints.COURSES_LIST,
      ['COURSES_LIST'],
    );
  
    console.log("courseDatacourseDatacourseDatacourseDatacourseData",courseData);
    
  
  
    const universities=uniData?.data?.map((item: {id: number; name: string}) => ({
      id: item.id,
      name: item.name,
    }))
  
    const universitiesDept=uniDeptData?.data?.map((item: {id: number; name: string}) => ({
      id: item.id,
      name: item.name,
    }))
  
    const instructors=ins?.data?.map((item: {id: number; full_name: string}) => ({
      id: item.id,
      name: item.full_name,
    }))
    const courses=courseData?.data?.map((item: {id: number; name: string}) => ({
      id: item.id,
      name: item.name,
    }))
    const coursesCode=courseData?.data?.map((item: {id: number; code: string}) => ({
      id: item.id,
      name: item.code,
    }))
  
  
  
  
    console.log("instructorDatainstructorDatainstructorDatainstructorDatainstructorData",universitiesDept,uniDeptData);
    
  
   
    
  
  
  
  
    return (
      <SafeAreaView style={styles.container}>
        <View style={[styles.header, commonStyles.spacingCommon]}>
          <View>
            <TouchableOpacity onPress={handleNavigation}>
              <CrossIcon />
            </TouchableOpacity>
          </View>
          <Text style={styles.filterText}>Filter</Text>
          <TouchableOpacity
            onPress={() => {
              dispatch(Department(''));
              dispatch(RatingData(''));
           
            }}>
            <Text
              style={{
                fontFamily: fontFamily.Poppins_Regular,
                color: colors.black,
              }}>
              Clear all
            </Text>
          </TouchableOpacity>
        </View>
  
        <View style={{width: '100%'}}>
          {/* <FilterComponent
            leftTitle="University"
            rightTitle={universityData?.name ? universityData?.name : ''}
            handlePress={toggleModal}
          /> */}
          {/* <FilterComponent
            leftTitle="Instructor"
            rightTitle={instructorData?.name ? instructorData?.name : ''}
            handlePress={toggleModal2}
          /> */}
          <FilterComponent
            leftTitle="Department"
            rightTitle={departmentData?.name ? departmentData?.name : ''}
            handlePress={toggleModal3}
          />
            <FilterComponent
            leftTitle="Rating"
            rightTitle={ratingData}
            handlePress={toggleModal4}
          />
          {/* <FilterComponent
            leftTitle="Course Name"
            rightTitle={courseName?.name ? courseName?.name : ''}
            handlePress={toggleModal4}
          /> */}
          {/* <FilterComponent
            leftTitle="Course Code"
            rightTitle={courseCode?.name ? courseCode?.name : ''}
            handlePress={toggleModal5}
          /> */}
        </View>
        <View
          style={[
            commonStyles.spacing,
            {position: 'absolute', bottom: 10, width: '100%'},
          ]}>
          <CommonButton
            btnText="Apply"
            mainViewStyle={{marginHorizontal: 0, width: '100%'}}
            onPressBtn={() => {
              navigation.goBack();
            }}
          />
        </View>
        <ModalCard isModalVisible={isModalVisible} toggleModal={toggleModal}>
          <CustomNativeDropDown
            handleChange={value => {
              const universityData=universities?.filter((item:{id:string})=>item?.id==value)
              dispatch(UniversityData({id: value,name:universityData[0]?.name}));
            }}
            onDonePress={toggleModal}
            data={universities}
            placeholder={{
              label: 'Universties',
              value: null,
            }}
          />
        </ModalCard>
        <ModalCard isModalVisible={isModalVisible3} toggleModal={toggleModal3}>
          {/* <CustomNativeDropDown
            handleChange={value => {
              const departmentData=universitiesDept?.filter((item:{id:string})=>item?.id==value)
              dispatch(Department({id:value,name:departmentData[0]?.name}));
            }}
            onDonePress={toggleModal3}
            data={universitiesDept}
            placeholder={{
              label: 'Sort By',
              value: null,
            }}
          /> */}
           <FlatList
            ListHeaderComponent={()=>{
              return (<TouchableOpacity style={{marginVertical:moderateScaleVertical(12)}} onPress={()=>{
                dispatch(Department({id: null,name:''}));
                toggleModal3()
              }}>
                  <Text style={{fontSize:textScale(14),fontFamily:fontFamily.Poppins_Medium,color:colors.red}}>Clear</Text>
                </TouchableOpacity>)
            }}
            renderItem={
              ({item})=>{
                return (<TouchableOpacity style={{marginVertical:moderateScaleVertical(12)}} onPress={()=>{
                  dispatch(Department({id: item.id,name:item.name}));
                  toggleModal3()
                }}>
                    <Text style={{fontSize:textScale(14),fontFamily:fontFamily.Poppins_Medium,}}>{item.name}</Text>
                  </TouchableOpacity>)
              }
            }
            data={universitiesDept}
          />
        </ModalCard>
        <ModalCard isModalVisible={isModalVisible4} toggleModal={toggleModal4} isSwipe>
          {/* <CustomNativeDropDown
            handleChange={value => {
              const courseName=courses?.filter((item:{id:string})=>item?.id==value)
              dispatch(CourseName({id:value,name:courseName[0]?.name}));
            }}
            onDonePress={toggleModal4}
            data={courses}
            placeholder={{
              label: 'Select Courses',
              value: null,
            }}
          /> */}
           <FlatList
            ListHeaderComponent={()=>{
              return (<TouchableOpacity style={{marginVertical:moderateScaleVertical(12)}} onPress={()=>{
                dispatch(CourseName({id: null,name:''}));
                toggleModal4()
              }}>
                  <Text style={{fontSize:textScale(14),fontFamily:fontFamily.Poppins_Medium,color:colors.red}}>Clear</Text>
                </TouchableOpacity>)
            }}
            renderItem={
              ({item})=>{
                return (<TouchableOpacity style={{marginVertical:moderateScaleVertical(12)}} onPress={()=>{
                  dispatch(RatingData(item));
                  toggleModal4()
                }}>
                    <Text style={{fontSize:textScale(14),fontFamily:fontFamily.Poppins_Medium,}}>{item}</Text>
                  </TouchableOpacity>)
              }
            }
            data={[1,2,3,4,5]}
          />
        </ModalCard>
        <ModalCard isModalVisible={isModalVisible5} toggleModal={toggleModal5} isSwipe>
          {/* <CustomNativeDropDown
           handleChange={value => {
            const courseName=coursesCode?.filter((item:{id:string})=>item?.id==value)
            dispatch(CourseCode({id:value,name:courseName[0]?.name}));
          }}
            onDonePress={()=>{
              toggleModal5()
            }}
            data={coursesCode}
            placeholder={{
              label: 'Course Code',
              value: null,
            }}
          /> */}
           <FlatList
            ListHeaderComponent={()=>{
              return (<TouchableOpacity style={{marginVertical:moderateScaleVertical(12)}} onPress={()=>{
                dispatch(CourseCode({id: null,name:''}));
                toggleModal5()
              }}>
                  <Text style={{fontSize:textScale(14),fontFamily:fontFamily.Poppins_Medium,color:colors.red}}>Clear</Text>
                </TouchableOpacity>)
            }}
            renderItem={
              ({item,index})=>{
                return <TouchableOpacity style={{marginVertical:moderateScaleVertical(12)}} onPress={()=>{
                  dispatch(CourseCode({id: item.id,name:item.name}));
                  toggleModal5()
                }}>
                    <Text style={{fontSize:textScale(14),fontFamily:fontFamily.Poppins_Medium}}>{item.name}{index}</Text>
                  </TouchableOpacity>
              }
            }
            data={coursesCode}
          />
         
         
        </ModalCard>
        <ModalCard isModalVisible={isModalVisible2} toggleModal={toggleModal2} isSwipe>
          {/* <CustomNativeDropDown
            handleChange={value => {
              const instructorData=instructors?.filter((item:{id:string})=>item?.id==value)
              dispatch(InstructorData({id: value,name:instructorData[0]?.name}));
              
            }}
            data={instructors}
            onDonePress={()=>{
              toggleModal2()
            }}
            placeholder={{
              label: 'Instructors',
              value: null,
            }}
          /> */}
          <FlatList
           ListHeaderComponent={()=>{
            return (<TouchableOpacity style={{marginVertical:moderateScaleVertical(12)}} onPress={()=>{
              dispatch(InstructorData({id: null,name:''}));
              toggleModal2()
            }}>
                <Text style={{fontSize:textScale(14),fontFamily:fontFamily.Poppins_Medium,color:colors.red}}>Clear</Text>
              </TouchableOpacity>)
          }}
            renderItem={
              ({item})=>{
                return <TouchableOpacity style={{marginVertical:moderateScaleVertical(12)}} onPress={()=>{
                  dispatch(InstructorData({id: item.id,name:item.name}));
                  toggleModal2()
                }}>
                    <Text style={{fontSize:textScale(14),fontFamily:fontFamily.Poppins_Medium,}}>{item.name}</Text>
                  </TouchableOpacity>
              }
            }
            data={instructors}
          />
         
        
        </ModalCard>
      </SafeAreaView>
    );
  }
  
  export default FilterInstructor;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 0.5,
      paddingBottom: moderateScaleVertical(16),
      borderBottomColor: colors.blackGreyMedium,
    },
  
    filterText: {
      flex: 1,
      textAlign: 'center',
      fontFamily: fontFamily.Poppins_Medium,
      fontSize: textScale(17),
      alignItems: 'center',
      color: colors.black,
    },
    filterComponent: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      paddingVertical: moderateScaleVertical(20),
      borderBottomWidth: 0.5,
      paddingBottom: moderateScaleVertical(16),
      borderBottomColor: colors.blackGreyMedium,
    },
    filterHeading: {
      flex: 1,
    },
    filterHeadingRight: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: moderateScale(4),
    },
  
    filterTextLeft: {
      fontFamily: fontFamily.Poppins_Regular,
      fontSize: textScale(14),
      color: colors.black,
    },
    filterTextRight: {
      fontFamily: fontFamily.Poppins_Medium,
      fontSize: textScale(14),
      color: colors.theme,
    },
  });
  