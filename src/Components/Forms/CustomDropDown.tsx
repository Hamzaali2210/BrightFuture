import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import {
  moderateScale,
  moderateScaleVertical,
  scale,
  textScale,
} from '../../styles/responsiveSize';
import colors from '../../styles/colors';
import fontFamily from '../../styles/fontFamily';

import {DropDown} from '../../types/uiType';

const CustomDropDown: React.FC<DropDown> = props => {
  const {data, selectedItem, setSelectedItemFunc, placeholderInput, keyItem} =
    props;

  return (
    <SelectDropdown
      data={data as any[]}
      onSelect={(selItem, index) => {
        if (selItem?.id) {
          setSelectedItemFunc(selItem?.id, index, keyItem);
        }
      }}
      buttonTextAfterSelection={(selItem, index) => {
        if (selItem?.name) {
          return selItem?.name;
        }
      }}
      rowTextForSelection={(item, index) => {
        if (item?.name) {
          return item?.name;
        }
      }}
      search
      rowStyle={{
        justifyContent: 'flex-start',
        backgroundColor: colors.white,
      }}
      dropdownStyle={{
        borderRadius: scale(10),
      }}
      rowTextStyle={{
        textAlign: 'left',
        marginLeft: moderateScale(16),
        color: colors.darkGrey,
        fontFamily: fontFamily.Montserrat_Medium,
      }}
      searchPlaceHolder={placeholderInput}
      buttonStyle={{
        height: moderateScaleVertical(58),
        justifyContent: 'flex-start',
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 0.5,
        borderColor: selectedItem ? colors.theme : colors.blackOpacity25,
        marginVertical: moderateScaleVertical(10),
        backgroundColor: colors.white,
        width: '100%',
      }}
      defaultButtonText={placeholderInput}
      buttonTextStyle={{
        paddingHorizontal: moderateScale(10),
        fontSize: textScale(16),
        textAlign: 'left',
        color: colors.themeDark,
        fontFamily: fontFamily.Montserrat_Medium,
      }}
    />
  );
};

export default CustomDropDown;

const styles = StyleSheet.create({});
