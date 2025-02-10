import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import commonStyles from '../../../styles/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../styles/responsiveSize';
import fontFamily from '../../../styles/fontFamily';
import colors from '../../../styles/colors';
import imagePath from '../../../constants/imagePath';
import {Image} from 'react-native';
import CommonButton from '../../CommonButton';
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
const CancelCourse = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [reviewText, setReviewText] = useState<string>('');
  const handleSelect = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };
  return (
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
          paddingVertical: moderateScaleVertical(16),
        }}>
        Reason of Cancelation
      </Text>

      <TextInput
        style={{
            padding:moderateScale(16),
            fontFamily:fontFamily.Poppins_Regular,
            borderWidth:moderateScale(1),
            borderColor:'rgba(9, 78, 133, 0.2)',
            height:moderateScale(200),
            borderRadius:moderateScale(8),
            color:colors.black
        }}
        value={reviewText}
        multiline
        placeholder='Write description...'
        placeholderTextColor={'#11111140'}
        
        onChangeText={e => setReviewText(e)}
      />

      <CommonButton onPressBtn={()=>{}} btnText='Submit Request' mainViewStyle={{marginHorizontal:0,marginTop:moderateScale(40)}}/>
    </View>
  );
};

export default CancelCourse;

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
});
