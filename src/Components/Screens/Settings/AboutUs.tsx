import React, { useState } from 'react';
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconPhone from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Foundation';
import { mainStrings } from '../../../constants/mainstrings';
import colors from '../../../styles/colors';
import commonStyles from '../../../styles/commonStyles';
import fontFamily from '../../../styles/fontFamily';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
  verticalScale,
  width
} from '../../../styles/responsiveSize';


import { faq } from '../../../constants/listData';
import { showError } from '../../../utils/helperFunctions';

interface CollapseContainerProps {
  ques: string;
  ans: string;
}

const CollapseContainer: React.FC<CollapseContainerProps> = ({ques, ans}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setIsCollapsed(!isCollapsed);
      }}>
      <View style={styles.collapseContainer}>
        <View style={styles.question}>
          <Text
            style={{
              fontFamily: fontFamily.Poppins_Medium,
              color: colors.black,
              fontSize: moderateScaleVertical(15),
              flex: 1,
            }}>
            {ques}
          </Text>
          <Text>
            <IconEntypo
              name={isCollapsed ? 'plus' : 'minus'}
              color="black"
              size={20}
            />
          </Text>
        </View>
        <Collapsible collapsed={isCollapsed}>
          <View style={styles.collpaseText}>
            <Text
              style={{
                fontFamily: fontFamily.Poppins_Regular,
                color: '#666666',
                fontSize: moderateScaleVertical(15),
                flex: 1,
              }}
            >
              {ans}
            </Text>
          </View>
        </Collapsible>
      </View>
    </TouchableWithoutFeedback>
  );
};

function AboutUs() {
  const handleLink = async ()=>{
    
    const whatsappUrl = `whatsapp://send?phone=96596771010&text=brightfuture`;
    try {
      const canOpen = await Linking.canOpenURL(whatsappUrl);
      
      if (canOpen) {
        await Linking.openURL(whatsappUrl);
      }
    } catch (error) {
      showError('Unable to open the URL');
      console.error('Error opening WhatsApp:', error);
    }
  }

  return (
    <ScrollView
      contentContainerStyle={[styles.container, commonStyles.spacingCommon]}
    >
      <View
        style={{
          alignItems: 'center',
          marginVertical: moderateScaleVertical(16),
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            fontFamily: fontFamily.Poppins_SemiBold,
            color: colors.black,
            fontSize: moderateScaleVertical(22),
          }}
        >
          {mainStrings.HowCanWeHelpYou}
        </Text>
      </View>

      <View style={styles.colorBoxContainer}>
        <View style={[styles.boxContainer, { backgroundColor: '#103E63' }]}>
          <View>
            <Text>
              <Icon name="mail" size={24} color="white" />
            </Text>
          </View>
          <Text
            style={{
              fontFamily: fontFamily.Poppins_Regular,
              fontSize: moderateScaleVertical(14),
              color: colors.darkGrey,
            }}
          >
            Email
          </Text>
          <Text
            style={{
              fontFamily: fontFamily.Poppins_SemiBold,
              fontSize: moderateScaleVertical(12),
              color: colors.white,
            }}
          >
            info@brightfuturekw.net
          </Text>
        </View>
        <View style={[styles.boxContainer, { backgroundColor: '#feb600' }]}>
          <View>
            <Text>
              <IconPhone name="phone" size={24} color="white" />
            </Text>
          </View>
          <Text
            style={{
              fontFamily: fontFamily.Poppins_Regular,
              fontSize: moderateScaleVertical(14),
              color: colors.grey1,
            }}
          >
            Contact Number
          </Text>

          <Text
            style={{
              fontFamily: fontFamily.Poppins_SemiBold,
              fontSize: moderateScaleVertical(12),
              color: colors.white,
            }}
          >
            {/* +965 90984914  */}
            {/* 90984914  */}
            96 77   1010

          </Text>
          <Text
            style={{
              fontFamily: fontFamily.Poppins_SemiBold,
              fontSize: moderateScaleVertical(12),
              color: colors.white,
            }}
          >
            {/* +965 90984914  */}
            {/* 90984914  */}
            96 77  7047
          </Text>
          {/* <Text
            style={{
              fontFamily: fontFamily.Poppins_SemiBold,
              fontSize: moderateScaleVertical(12),
              color: colors.white,
            }}
          >
            +965 96777047
          </Text> */}
        </View>
      </View>

      <TouchableOpacity style={styles.greenBoxContainer} onPress={handleLink}>
        <Text>
          <IconPhone name="whatsapp" size={24} color="white" />
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontFamily: fontFamily.Poppins_SemiBold,
            fontSize: moderateScaleVertical(16),
            color: colors.white,

            justifyContent: 'center',
          }}
        >
          Chat With Us (96777047)
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.greenBoxContainer} onPress={handleLink}>
        <Text>
          <IconPhone name="whatsapp" size={24} color="white" />
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontFamily: fontFamily.Poppins_SemiBold,
            fontSize: moderateScaleVertical(16),
            color: colors.white,

            justifyContent: 'center',
          }}
        >
          Chat With Us (96771010)
        </Text>
      </TouchableOpacity>

      <View style={styles.FaqContainer}>
        {/* <Text
          style={{
            fontFamily: fontFamily.Poppins_Bold,
            fontSize: moderateScaleVertical(16),
            color: colors.black,
          }}
        >
          {mainStrings.TopQuestions}
        </Text> */}

        {/* <View style={{ marginVertical: moderateScaleVertical(12) }}>
          {faq.map((item) => (
            <CollapseContainer
              key={item.id}
              ques={item.question}
              ans={item.answer}
            />
          ))}
        </View> */}
      </View>
    </ScrollView>
  );
}

export default AboutUs;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    // flex: 2,
    width,
  },
  colorBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxContainer: {
    width: width / 2.3,
    marginHorizontal: moderateScale(6),
    gap: moderateScale(2),

    borderRadius: moderateScale(8),
    height: moderateScale(120),
    padding: moderateScale(16),
  },
  greenBoxContainer: {
    backgroundColor: '#21CC05',
    borderRadius: moderateScale(8),
    padding: moderateScale(14),
    marginTop: verticalScale(16),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: moderateScale(8),
  },
  FaqContainer: {
    marginTop: verticalScale(16),
  },
  collapseContainer: {
    borderRadius: moderateScale(8),
    borderWidth: moderateScale(1),
    padding: moderateScale(16),
    marginBottom: moderateScale(16),
    borderColor: colors.blackGreyLight,
  },
  question: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  collpaseText: {
    marginTop: verticalScale(12),
  },

  //   container collpasible
});
