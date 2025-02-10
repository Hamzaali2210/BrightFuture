import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../styles/responsiveSize';
import colors from '../../styles/colors';
import fontFamily from '../../styles/fontFamily';

import {CustomInputDate} from '../../types/uiType';
import DatePicker from 'react-native-date-picker';

const CustomDatePicker: React.FC<CustomInputDate> = ({
  // const CustomDatePicker= ({
  value = '',
  placeholder,
  isError,
  onChangeText,
  setOpen,
  setDate,
  date,
  open,
}) => {

  
  return (
    <View
      style={{
        height: moderateScaleVertical(58),
        justifyContent: 'center',
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 0.5,
        
        borderColor:
          value !== ''
            ? colors.theme
            : isError
            ? colors.red
            : colors.blackOpacity25,
        marginVertical: moderateScaleVertical(10),
      }}>
      <TouchableOpacity
        onPress={() => {
          setOpen(true);
        }}>
        <View
          style={{
            // flex: 1,
            paddingHorizontal: moderateScale(20),
            // backgroundColor: 'red',
            flexDirection:"row",
            alignItems:"center"
            
          }}>
          <Text
            style={{
              fontSize: textScale(16),
              fontFamily: fontFamily.Montserrat_Medium,
              color: colors.blackGreyLight,
              height: '100%',
            }}>
            {date?.toLocaleDateString()}
          </Text>
        </View>
      </TouchableOpacity>

      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </View>
  );
};

export default CustomDatePicker;

const styles = StyleSheet.create({});
