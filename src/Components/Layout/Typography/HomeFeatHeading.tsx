import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
  verticalScale,
} from '../../../styles/responsiveSize';
import colors from '../../../styles/colors';
import commonStyles from '../../../styles/commonStyles';
import {mainStrings} from '../../../constants/mainstrings';

import {HomeHeading} from '../../../types/uiType';
import ModalCard from '../Card/ModalCard';
import fontFamily from '../../../styles/fontFamily';
import CrossIcon from 'react-native-vector-icons/Entypo'
import TooltipIcon from 'react-native-vector-icons/AntDesign'
import DeviceInfo from 'react-native-device-info';
import { useSelector } from 'react-redux';

const HomeFeatHeading: React.FC<HomeHeading> = ({
  title,
  routeName,
  tooltip,
  tooltipContent,
}) => {
  const navigation = useNavigation();
  const userData = useSelector((state: any) => state?.auth?.userPayload);
  console.log('userDatauserDatauserDatauserData', userData);
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <View style={[styles.typeList]}>
      <Text style={[styles.typeHeading]}>{title}  {" "} {tooltip && !userData?.course_type_available  && <Text onPress={toggleModal}><TooltipIcon size={DeviceInfo.isTablet()?24: textScale(18)} color={colors.theme} name='questioncircleo'/> </Text>} </Text>
    
      {routeName && (
        <TouchableOpacity
          onPress={() => {
            if (routeName) {
              navigation.navigate(routeName as never);
            }
          }}>
          <Text style={[styles.typePara]}>{mainStrings.seeAll}</Text>
        </TouchableOpacity>
      )}
      {/* <ModalCard isModalVisible={isModalVisible} toggleModal={toggleModal} isCancel > */}
        {/* <View style={{alignItems:"flex-end",marginBottom:moderateScale(13)}}>
            <TouchableOpacity onPress={toggleModal}>
            <CrossIcon size={textScale(24)} color={colors.black} name='cross'/>
          </TouchableOpacity>
        </View> */}
        {/* <Text style={[styles.tooltipText]}>{tooltipContent}</Text> */}
      {/* </ModalCard> */}
    </View>
  );
};

export default HomeFeatHeading;

const styles = StyleSheet.create({
  typeList: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: moderateScaleVertical(10),
  },
  typeHeading: {
    fontSize:DeviceInfo.isTablet()?moderateScaleVertical(20):textScale(20),
    fontFamily: 'Poppins-SemiBold',
    flexGrow: 1,
    color: colors.black,
  },
  typePara: {
    fontFamily: 'KumbhSans-SemiBold',
    fontSize: moderateScaleVertical(14),
    color: colors.themeTri,
  },
  tooltipText: {
    fontFamily: fontFamily.Poppins_Regular,
    color: colors.black,
    fontSize: textScale(14),
    paddingBottom:moderateScaleVertical(12)
  },
});
