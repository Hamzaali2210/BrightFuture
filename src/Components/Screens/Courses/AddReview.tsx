import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/EvilIcons';
import IconFeather from 'react-native-vector-icons/Feather';
import {Screen} from 'react-native-screens';
import commonStyles from '../../../styles/commonStyles';
import fontFamily from '../../../styles/fontFamily';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
  verticalScale,
  width,
} from '../../../styles/responsiveSize';

import StarGold from '../../../assets/images/Icons/starBig.svg';
import StarGrey from '../../../assets/images/Icons/starGrey.svg';
import colors from '../../../styles/colors';

import CommonButton from '../../CommonButton';
import usePostData from '../../../hooks/usePostData';
import {endpoints} from '../../../utils/endpoints';
import {showError, showSuccess} from '../../../utils/helperFunctions';
import {useRoute} from '@react-navigation/native';
import ModalCard from '../../Layout/Card/ModalCard';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useKeyboard} from '../../../hooks/useKeyboard';
import FastImage from 'react-native-fast-image';
import {IMAGE_API_URL} from '../../../utils/urls';

interface AddReviewInterface {
  courseId?: number;
  instructorId?: number;
  toggleModal?: () => void;
  title?: string;
  refetch?: () => void;
}

const AddReview: React.FC<AddReviewInterface> = ({
  courseId,
  title,
  toggleModal,
  refetch,
}) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const keyboardHeight = useKeyboard();
  const [submitReview, setSubmitReview] = useState(false);
  console.log(
    'keyboardHeightkeyboardHeightkeyboardHeightkeyboardHeightkeyboardHeight',
    courseId,
  );

  const route = useRoute();
  const {params}: any = route;

  const handleStarPress = (selectedRating: any) => {
    setRating(selectedRating);
  };

  const {status, error, mutate, data} = usePostData(
    endpoints.REVIEWS,
    ['Reviews'],
    'post',
    data => {
      showSuccess('Review Submitted successfully');
      toggleModal && toggleModal();
      refetch && refetch();
    },
    error => {
      showSuccess('Error while Adding Review plesae try later');
      toggleModal && toggleModal();
      return;
    },
  );

  const renderStar = (index: any) => {
    const filled = index < rating;

    return (
      <TouchableOpacity key={index} onPress={() => handleStarPress(index + 1)}>
        {filled ? (
          <StarGold
            width={moderateScale(25)}
            height={moderateScaleVertical(25)}
          />
        ) : (
          <StarGrey
            width={moderateScale(25)}
            height={moderateScaleVertical(25)}
          />
        )}
      </TouchableOpacity>
    );
  };

  useEffect(() => {}, [data]);

  const handleSubmit = () => {
    Keyboard.dismiss;

    if (rating === 0) {
      showError('Please Add the rating');
      return;
    } else if (!review) {
      showError('Please Add the Review');
      return;
    }
    setSubmitReview(true);

    const payload: any = {
      // instructor_id: params?.instructorId || 189,
      // course_id:courseId,
      rating: rating,
      subject: params?.courseName || params?.instructorName || title,
      review: review,
    };

    if (params?.instructorId) {
      payload.instructor_id = params?.instructorId;
    } else if (courseId) {
      payload.course_id = courseId;
    }

    if (payload) {
      setSubmitReview(false);
    }

    mutate(payload);
  };

  return (
    <View>
      {/* // behavior={Platform.OS === 'ios' ? 'padding' : 'height'} */}

      <View
        style={[
          styles.container,
          {
            marginHorizontal: moderateScaleVertical(4),
            marginBottom: keyboardHeight,
          },
          {padding: params?.instructorName ? moderateScale(12) : 0},
        ]}>
        {!params?.instructorId && (
          <Text
            style={{
              fontFamily: fontFamily.Poppins_Bold,
              fontSize: textScale(18),
              color: colors.black,
              marginVertical: verticalScale(4),
              marginBottom: moderateScaleVertical(4),
            }}>
            Add a Review
          </Text>
        )}
        {params?.instructorId && (
          <FastImage
            source={{
              uri:
                `${IMAGE_API_URL}${params.instructorImage}` ||
                params.instructorImage,
            }}
            resizeMode="cover"
            style={{
              width: moderateScaleVertical(120),
              height: moderateScale(120),
              borderRadius: 300,
              backgroundColor: 'rgba(0,0,0,0)',
              borderWidth: 2,
              borderColor: colors.theme,
              overflow: 'hidden',
            }}
          />
        )}
        {params?.instructorId && (
          <Text
            style={{
              fontFamily: fontFamily.Poppins_Regular,
              fontSize: textScale(16),
              color: colors.black,

              textAlign: 'center',
            }}>
            {params?.instructorName}
          </Text>
        )}
        {courseId && (
          <Text
            style={{
              fontFamily: fontFamily.Poppins_Regular,
              fontSize: textScale(16),
              color: colors.black,

              textAlign: 'center',
            }}>
            course : {title}
          </Text>
        )}

        <View style={[styles.starContainer]}>
          {[...Array(5).keys()].map(index => renderStar(index))}
        </View>

        <View style={{width: '100%'}}>
          <Text style={[styles.headingText]}>Write a Review</Text>
          <View style={[styles.TextInputContainer]}>
            <TextInput
              numberOfLines={5}
              multiline
              style={[styles.TextInput]}
              value={review}
              onChangeText={e => {
                setReview(e);
              }}
              placeholder="Add your review"

              // keyboardType="name-phone-pad"
            />
          </View>
        </View>

        {/* <View style={{ width: '100%' }}>
        <Text style={[styles.headingText, { width: '100%' }]}>
          Add Audio/Video
        </Text>
        <View style={[styles.btnContainer]}>
          <View style={[styles.btnBlue]}>
            <Text>
              <Icon name="camera" size={28} color={colors.theme} />
            </Text>
            <Text style={[styles.btnText]}>Take Video</Text>
          </View>
          <View style={[styles.btnBlue]}>
            <Text>
              <IconFeather name="upload" size={21} color={colors.theme} />
            </Text>
            <Text style={[styles.btnText]}>Take Video</Text>
          </View>
          <View style={[styles.btnBlue]}>
            <Text>
              <IconFeather name="mic" size={21} color={colors.theme} />
            </Text>
            <Text style={[styles.btnText]}>Take Audio</Text>
          </View>
        </View>
      </View> */}

        <CommonButton
          btnText="Submit"
          mainViewStyle={{
            width: width - 24,
            marginTop: moderateScale(30),
          }}
          loading={submitReview}
          onPressBtn={submitReview ? null : handleSubmit}
        />
      </View>
    </View>
  );
};

export default AddReview;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
  },

  starContainer: {
    flexDirection: 'row',
    gap: moderateScale(4),
    marginVertical: moderateScaleVertical(16),
  },
  headingText: {
    fontFamily: fontFamily.Poppins_Regular,
    marginVertical: moderateScaleVertical(12),
    fontSize: textScale(15),
    color: '#333333',
    opacity: 0.4,
  },
  TextInputContainer: {
    height: moderateScaleVertical(120),
    backgroundColor: colors.white,
    borderWidth: moderateScale(1),
    borderColor: colors.theme,
    borderRadius: moderateScale(10),
    padding: moderateScale(12),
    overflow: 'hidden',
  },
  TextInput: {
    fontFamily: fontFamily.Poppins_Regular,
    fontSize: textScale(12),

    width: '100%',
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: moderateScale(6),
  },
  btnBlue: {
    padding: moderateScale(8),
    paddingVertical: moderateScaleVertical(12),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: moderateScale(2),
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(6),
    borderColor: colors.theme,
  },
  btnText: {
    color: colors.themeDark,
  },
});
