
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import GroupCardLight from '../../../Components/Layout/Card/GroupCardLight'
import ModalCard from '../../../Components/Layout/Card/ModalCard'
import { moderateScale, moderateScaleVertical, textScale } from '../../../styles/responsiveSize'
import colors from '../../../styles/colors'
import fontFamily from '../../../styles/fontFamily'
import CustomTextInput from '../../../Components/CustomTextInput'
import FastImage from 'react-native-fast-image'
import imagePath from '../../../constants/imagePath'

const JoinGroup = () => {
  const [code, setCode] = React.useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <View>
     <ModalCard
        isModalVisible={isModalVisible}
        isCancel
        toggleModal={() => {
          setIsModalVisible(!isModalVisible);
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: moderateScaleVertical(20),
          }}>
          <Text
            style={{
              fontFamily: fontFamily.Poppins_SemiBold,
              color: colors.black,
              fontSize: textScale(18),
              marginTop: moderateScale(8),
              width: '100%',
            }}>
            Join a Group
          </Text>

          <CustomTextInput
            value={code}
            placeholder="Enter Code here"
            containerStyle={{
              height: moderateScale(60),
              width: '100%',
              marginTop: moderateScale(24),
            }}
            
            onChangeText={e => setCode(e)}
          />
          {/* <Text
            style={{
              fontFamily: fontFamily.Poppins_Medium,
              color: colors.red,
              fontSize: textScale(12),
              marginTop: moderateScale(8),
            }}>
            12 days left
          </Text>
          <Text
            style={{
              fontFamily: fontFamily.Poppins_Medium,
              color: colors.theme,
              fontSize: textScale(22),
              marginTop: moderateScale(24),
            }}>
            2 More students hurry up !!
          </Text> */}
          <View
            style={{
              borderRadius: moderateScale(14),
              backgroundColor: '#ECF1F6',
              padding: moderateScale(14),
              // marginHorizontal: moderateScale(20),
              marginTop: moderateScale(12),
            }}>
            <Text
              style={{
                color: colors.red,
                fontFamily: fontFamily.Poppins_Regular,
                fontSize: textScale(12),
              }}>
              Note:
            </Text>
            <Text
              style={{
                color: colors.black,
                fontFamily: fontFamily.Poppins_Regular,
                fontSize: textScale(12),
              }}>
              Please note, the coupon will only be activated if all group
              members initiate payment. If payment is not initiated within the
              specified time, the coupon will be disabled. In that case, if you
              have already made a payment, you will receive a refund within 24
              hours.
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: moderateScale(12),
            backgroundColor: '#FFE500',
            paddingVertical: moderateScaleVertical(12),
            justifyContent: 'center',
            borderRadius: moderateScale(15),
            marginBottom:moderateScale(12),
          }}>
          <FastImage
            source={imagePath.joinButton}
            style={{width: moderateScale(24), height: moderateScale(24)}}
          />
          <Text
            style={{
              fontFamily: fontFamily.Montserrat_SemiBold,
              color: colors.black,
              fontSize: textScale(16),
            }}>
            Join a Group
          </Text>
        </TouchableOpacity>
      </ModalCard>
    </View>
  )
}

export default JoinGroup

const styles = StyleSheet.create({})