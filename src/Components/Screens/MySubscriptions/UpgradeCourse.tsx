import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../styles/responsiveSize';
import colors from '../../../styles/colors';
import fontFamily from '../../../styles/fontFamily';
import imagePath from '../../../constants/imagePath';
import commonStyles from '../../../styles/commonStyles';
import SwitchIcon from 'react-native-vector-icons/Fontisto';
import BlutTickRadio from '../../../assets/images/Icons/blueTick.svg';

import ToggleOff from '../../../assets/images/Icons/toggleOff.svg';
import PaymentStructure from '../Courses/Cart/PaymentStructure';
import Collapsible from 'react-native-collapsible';
import ArrowDown from 'react-native-vector-icons/AntDesign';

const qty = [
  {
    id: 1,
    title: 'First',
  },
  {
    id: 2,
    title: 'Second',
  },
  {
    id: 3,
    title: 'Third',
  },
];
const addOnData = [
  {
    isSelected: false,
    name: 'Pro-subscription',
    price: 10,
    id: 1,
  },
  {
    isSelected: false,
    name: ' Full In-person',
    price: 10,
    id: 2,
  },
  {
    isSelected: false,
    name: 'Collect Printed Notes',
    price: 10,
    id: 3,
  },
];
const addOnDataPro = [
    {
      isSelected: false,
      name: 'Pro-subscription',
      price: 10,
      id: 1,
    },
    
  ];

const UpgradeCourse = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isOnline, setIsOnline] = useState(true);
  const [isInPerson, setIsInPerson] = useState(false);
  const [selectedId, setSelectedId] = useState(1);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [fullCourse, setFullCourse] = useState(false);

  const toggleSwitch = () => {
    setIsInPerson(!isInPerson) 
    setIsOnline(!isOnline)};
  const toggleSwitch2 = () => {
    setIsOnline(!isOnline) 
    setIsInPerson(!isInPerson)
};

  const handleSelect = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleId = (id: number) => {
    setSelectedId(id);
  };
  return (
    <ScrollView >
      <View style={[commonStyles.spacingCommon]}>
        <Text
          style={{
            fontFamily: fontFamily.Poppins_Regular,
            fontSize: textScale(16),
            color: colors.black,
            paddingVertical: moderateScaleVertical(12),
          }}>
          Select Course
        </Text>
        <FlatList
          data={qty}
          horizontal
          style={{paddingVertical: moderateScaleVertical(10)}}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => {
            const backgroundColor = selectedIds.includes(item.id)
              ? colors.theme
              : colors.white;
            const color = selectedIds.includes(item.id) ? 'white' : 'black';
            const imgUrl = selectedIds.includes(item.id)
              ? imagePath.tickWhite
              : imagePath.tickGrey;

            return (
              <TouchableOpacity
                style={[styles.courseBtn, {backgroundColor}]}
                onPress={() => handleSelect(item?.id)}>
                <Image
                  style={{width: moderateScale(24), height: moderateScale(24)}}
                  source={imgUrl}
                />
                <Text>{item.title}</Text>
              </TouchableOpacity>
            );
          }}
        />
       

        <Text
          style={{
            fontFamily: fontFamily.Poppins_Regular,
            fontSize: textScale(16),
            color: colors.black,
            paddingVertical: moderateScaleVertical(12),
          }}>
          Upgrade Option
        </Text>

        <FlatList data={[1,2,33]} renderItem={()=>{
            return <>
            <View style={[styles.flexContainer,{marginVertical:moderateScale(12)}]}>
                            <Text style={{fontFamily:fontFamily.Poppins_SemiBold,fontSize:moderateScale(14),color:colors.black,flex:1}}>Course 2</Text>        
                            <ArrowDown name="down" color={colors.theme} size={moderateScale(14)}/>
                    </View>
            
                    <TouchableOpacity
                      style={styles.courseContainer}
                      onPress={() =>{if(!fullCourse){
                        setIsCollapsed(!isCollapsed)
                        
                        }}}>
                      <View style={[styles.flexContainer,{marginVertical:moderateScaleVertical(12)}]}>
                        <TouchableOpacity onPress={() => {
                            if(!isCollapsed){
                                setIsCollapsed(!isCollapsed)    
                            }
                            setFullCourse(!fullCourse)
                           
                            }}>
                          <Image
                            source={
                              fullCourse ? `${imagePath.radioBlue}` : imagePath.radioGrey
                            }
                          />
                        </TouchableOpacity>
            
                     
            
                        <Text
                          style={{
                            fontFamily: fontFamily.Poppins_Medium,
                            fontSize: moderateScaleVertical(16),
                            color: '#101828',
                            flex: 1,
                            marginLeft: moderateScale(12),
                          }}>
                          Full Course
                        </Text>
                        {fullCourse ? (
                          <TouchableOpacity style={styles.playButton}>
                            <Text style={styles.playButtonText}>Upgrade</Text>
                          </TouchableOpacity>
                        ) : (
                          <ArrowDown name="down" color={colors.theme} size={moderateScale(14)}/>
                        )}
                      </View>
            
                      <Collapsible collapsed={isCollapsed}>
                        {true && (
                          <>
                            <FlatList
                              style={{marginTop:moderateScaleVertical(8)}}
                              renderItem={({item, index}) => {
                                return (
                                    <View style={styles.lessonContainer}>
                                    <View key={index} style={styles.lesson}>
                                  <Image
                                    style={{width: moderateScale(15), height: moderateScale(15),marginRight:moderateScale(16)}}
                                    source={imagePath.greyIcon}
                                  />
                                    <View style={[styles.lessonTitleContainer]}>
                                      <View style={[styles.chapterNameContainer]}>
                                        <Text style={[styles.chapterNameText]}>First Chapter</Text>
                                        <View
                                          style={[
                                            styles.chapterDetailFeatureContainer,
                                            {gap: moderateScale(4)},
                                          ]}>
                                          <View style={[styles.chapterIconRow]}>
                                            <Image
                                              style={{
                                                width: moderateScale(12),
                                                height: moderateScale(12),
                                              }}
                                              source={imagePath.timeBlack}
                                            />
                                            <Text
                                              style={[
                                                {
                                                  color: colors.black,
                                                  fontSize: textScale(12),
                                                  marginLeft: moderateScale(2),
                                                },
                                              ]}>
                                              3 Lessons
                                            </Text>
                                          </View>
                                          <View style={[styles.chapterIconRow]}>
                                            <Image
                                              style={{
                                                width: moderateScale(12),
                                                height: moderateScaleVertical(10),
                                              }}
                                              source={imagePath.notesIcon}
                                            />
                        
                                            <Text
                                              style={[
                                                {
                                                  color: colors.black,
                                                  fontSize: textScale(12),
                                                  marginLeft: moderateScale(2),
                                                },
                                              ]}>
                                              1m30s
                                            </Text>
                                          </View>
                                        </View>
                                      </View>
                                    </View>
                                  {index===0 &&  <TouchableOpacity style={styles.playButton}>
                                      <Text style={styles.playButtonText}>Upgrade</Text>
                                    </TouchableOpacity>}
                                  </View>
                                  </View>
                                );
                              }}
                              data={[1, 2, 3]}
                            />
                          </>
                        )}
                      </Collapsible>
                    </TouchableOpacity>
            </>
                 
        }}/>



        <Text
          style={{
            fontFamily: fontFamily.Poppins_Regular,
            fontSize: textScale(16),
            color: colors.black,
            paddingVertical: moderateScaleVertical(12),
          }}>
          Subscription
        </Text>

        <View style={styles.flexContainer}>
          <Text
            style={{
              flex: 1,
              fontFamily: fontFamily.Poppins_Medium,
              fontSize: textScale(14),
              color: colors.black,
            }}>
            Online
          </Text>
          <TouchableOpacity onPress={toggleSwitch}>
            <SwitchIcon
              name={`${!isOnline ? 'toggle-off' : 'toggle-on'}`}
              size={moderateScale(32)}
              color={`${!isOnline ? colors.grey1 : colors.theme}`}
            />
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.flexContainer,
            {marginTop: moderateScaleVertical(12)},
          ]}>
          <Text
            style={{
              flex: 1,
              fontFamily: fontFamily.Poppins_Medium,
              fontSize: textScale(14),
              color: colors.black,
            }}>
            In-Person
          </Text>
          <TouchableOpacity onPress={toggleSwitch2}>
            <SwitchIcon
              name={`${!isInPerson ? 'toggle-off' : 'toggle-on'}`}
              size={moderateScale(30)}
              color={`${!isInPerson ? colors.grey1 : colors.theme}`}
            />
          </TouchableOpacity>
        </View>

        <Text
          style={{
            fontFamily: fontFamily.Poppins_Regular,
            fontSize: textScale(16),
            color: colors.black,
            paddingVertical: moderateScaleVertical(12),
          }}>
          Select Add Ons
        </Text>

        <FlatList
          data={isOnline?addOnData:isInPerson?addOnDataPro:[]}
          scrollEnabled={false}
          keyExtractor={({id}: any) => id}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                handleId(item.id);
              }}
              style={{
                flexDirection: 'row',
                marginVertical: moderateScaleVertical(4),
              }}>
              {selectedId === item.id ? (
                <BlutTickRadio width={20} height={20} />
              ) : (
                <ToggleOff />
              )}
              <Text
                style={{
                  flex: 1,
                  color: colors.black,
                  fontFamily: fontFamily.Poppins_SemiBold,
                  marginLeft: moderateScale(12),
                }}>
                {' '}
                {item.name}
              </Text>
              <Text
                style={{
                  fontFamily: fontFamily.Poppins_SemiBold,
                  fontSize: textScale(12),
                }}>
                {item.price} KD
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <PaymentStructure
        paymentButton={true}
        totalPrice={'120'}
        subTotalPrice={'120'}
        walletBalance={10}
        discountPrice={'120'}
        cartId={0}
        paymentBoxStyle={{marginTop: moderateScale(18)}}
      />
    </ScrollView>
  );
};

export default UpgradeCourse;

const styles = StyleSheet.create({
  courseBtn: {
    borderRadius: moderateScale(10),
    shadowColor: '#000',
    backgroundColor: colors.white,

    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
    width: moderateScale(124),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: moderateScale(12),
    marginHorizontal: moderateScale(8),
    paddingVertical: moderateScaleVertical(9),
  },
  chapterIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap:moderateScale(2),
  },

  chapterDetailFeatureContainer: {
    flexDirection: 'row',
    gap: moderateScale(20),
  },
  flexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chapterNameText: {
    fontSize: textScale(14),
    color: '#101828',
    fontFamily: fontFamily.Poppins_Medium,
  },
  courseContainer: {
    backgroundColor: '#F0F4F8',
    paddingVertical: moderateScale(16),
    paddingHorizontal: moderateScale(20),
    borderRadius: moderateScale(12),
  },
  chapterNameContainer: {},
  lesson: {
    // width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    
    // paddingVertical:moderateScaleVertical(10),
    paddingHorizontal:moderateScale(12),

   
    // borderLeftWidth: 3,
    // borderLeftColor: '#007BFF',
    // paddingLeft: 10,
    // backgroundColor: '#fff',
    // padding: 10,
    // borderRadius: 5,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 5,
    elevation: 5,
  },
  lessonTitleContainer: {
    flex: 5,
  },
  playButton: {
    backgroundColor: colors.theme,
    paddingVertical: moderateScaleVertical(4),
    paddingHorizontal: moderateScaleVertical(8),
    borderRadius: 500,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButtonText: {
    color: '#fff',
    fontFamily: fontFamily.Poppins_Medium,
    fontSize: textScale(12),
  },
  lessonContainer:{
    paddingVertical:moderateScaleVertical(12),
    borderTopColor: '#D9D9D9',
    borderTopWidth: 1,
    // marginBottom:moderateScaleVertical(12),
    
  },
});
