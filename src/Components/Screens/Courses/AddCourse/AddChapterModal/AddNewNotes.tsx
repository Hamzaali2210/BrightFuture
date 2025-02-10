import {Platform, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomTextInput from '../../../../CustomTextInput';
import {
  mainStrings,
  validationErrorMessage,
} from '../../../../../constants/mainstrings';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../../styles/responsiveSize';
import fontFamily from '../../../../../styles/fontFamily';
import ErrorMessage from '../../../../Forms/ErrorMessage';
import DottedButtonGrey from '../../../../Layout/Button/DottedButtonGrey';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import {
  DocUploading,
  NotesData,
  NotesDataError,
  PositionId,
  UploadDocuments,
} from '../../../../../redux/slice/chapterSlice';
import {showError, showSuccess} from '../../../../../utils/helperFunctions';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../../../../../redux/store';
import colors from '../../../../../styles/colors';
import {API_URL_2} from '../../../../../utils/urls';
import usePostData from '../../../../../hooks/usePostData';
import {endpoints} from '../../../../../utils/endpoints';
import CommonButton from '../../../../CommonButton';
import { useKeyboard } from '../../../../../hooks/useKeyboard';

interface AddNewNotesInterface {
  toggleModal?: () => void;
  refetch?: () => void;
  position?:number
}

const AddNewNotes: React.FC<AddNewNotesInterface> = ({
  toggleModal,
  refetch,
  // position,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const keyboardHeight = useKeyboard(); 


  // states
  const notes = useSelector((state: any) => state?.chapter?.notes);
  const notesError = useSelector((state: any) => state?.chapter?.notesError);

  const chapterId = useSelector((state: any) => state?.chapter?.chapterId);

  console.log('chapterIdchapterIdchapterIdchapterIdchapterId', chapterId);

  const docUploading = useSelector(
    (state: any) => state?.chapter?.docUploading,
  );
  const lessonChapterId = useSelector(
    (state: any) => state?.chapter?.lessonChapterId,
  );
  const position = useSelector(
    (state: any) => {
      console.log('positonpositonpositonpositonpositonpositonpositon',state?.chapter?.position);
      
      return state?.chapter
    },
  );

  console.log("outside outside outside",position?.position);
  

  // local states
  const [loading, setLoading] = useState<boolean>(false);

  // effect and react query
  const {mutate: addNotesData, status: notesStatus} = usePostData(
    endpoints.NOTES,
    ['NOTES'],
  );

  const {
    status: updateNotesStatus,
    mutate: updateNotes,
    error: updateNotesError,
  } = usePostData(`${endpoints.UPDATE_NOTES}/${notes.id}`, ['UDPATE_NOTES']);

  useEffect(() => {
    if (notesStatus === 'success') {
      dispatch(
        NotesData({
          notes: {
            notesName: '',
            notesDescription: '',
            documentFile: '',
            id: '',
            notesVideo: [],
            documentFileUrl: '',
          },
        }),
      );
      dispatch(PositionId({position:null}));
      toggleModal && toggleModal();
      setLoading(false);
      refetch && refetch();
      showSuccess('Notes Uploaded Successfully');
    } else if (notesStatus === 'error') {
      toggleModal && toggleModal();
      refetch && refetch();
      dispatch(PositionId({position:null}));


      showError('Error While Uploading note');
      setLoading(false);
    } else if (notesStatus === 'pending') {
      setLoading(true);
    }
  }, [notesStatus]);

  useEffect(() => {
    if (updateNotesStatus === 'success') {
      dispatch(
        NotesData({
          notes: {
            notesName: '',
            notesDescription: '',
            documentFile: '',
            id: '',
            notesVideo: [],
            documentFileUrl: '',
          },
        }),
      );
      dispatch(PositionId({position:null}));

      setLoading(false);
      refetch && refetch();

      toggleModal && toggleModal();
      showSuccess('Document Updated Successfully');
    } else if (updateNotesStatus === 'pending') {
      setLoading(true);
    } else if (updateNotesStatus === 'error') {
      dispatch(PositionId({position:null}));

      dispatch(
        NotesData({
          notes: {
            notesName: '',
            notesDescription: '',
            documentFile: '',
            id: '',
            notesVideo: [],
            documentFileUrl: '',
          },
        }),
      );
      setLoading(false);
      refetch && refetch();
      toggleModal && toggleModal();
      showSuccess('Error while Updating the documents');
    }
  }, [updateNotesStatus]);

  useEffect(() => {
    if (notes.documentFileUrl) {
      dispatch(
        NotesDataError({
          notesError: {...notesError, documentFileUrl: ''},
        }),
      );
    }
  }, [notes]);

  /// logic
  const handleDocument = async () => {
    dispatch(UploadDocuments(''));
  };

  console.log('you have a notes in this', notes);

  const handleSaveNotes = () => {
    console.log('notesnotesnotesnotesnotesnotesnotesnotesnotes', notes);

    if (!notes.notesName) {
      dispatch(
        NotesDataError({
          notesError: {
            ...notesError,
            notesName: validationErrorMessage.notesNameError,
          },
        }),
      );

      return false;
    }

    console.log('twooooo');

    if (!notes.documentFileUrl) {
      dispatch(
        NotesDataError({
          notesError: {
            ...notesError,
            documentFileUrl: validationErrorMessage.notesDocuments,
          },
        }),
      );

      return false;
    }
    console.log('threee');

    let notesPayload = {
      name: notes?.notesName,
      description: notes?.notesDescription,
      file: notes?.documentFileUrl,
      file_name: notes?.documentFile?.name,
    };

    if (notes?.isLesson) {
      notesPayload.is_parent=true;
      notesPayload.chapter_id = chapterId;
    } else {
      // notesPayload.video_id = lessonChapterId;
      // note
      notesPayload.is_parent=false
      notesPayload.position=position?.position
      notesPayload.chapter_id = chapterId;
    }

    if (notes?.id) {
      updateNotes(notesPayload);
    } else {
      addNotesData(notesPayload);
    }
  };

  return (
    <View style={{marginBottom:Platform.OS==="ios"?keyboardHeight:0}}>
      <Text
        style={{
          fontSize: textScale(16),
          fontFamily: fontFamily.Poppins_Bold,
          textAlign: 'left',
        }}>
        Add Notes
      </Text>
      <View style={styles.textInputContainer}>
        <Text style={styles.textInputHeading}>{mainStrings.name}</Text>
        <CustomTextInput
          placeholder={mainStrings.name}
          containerStyle={{}}
          isError={!!notesError.notesName}
          onChangeText={e => {
            if (notesError?.notesName) {
              dispatch(
                NotesDataError({
                  notesError: {...notesError, notesName: ''},
                }),
              );
            }
            dispatch(NotesData({notes: {...notes, notesName: e}}));
          }}
          value={notes.notesName}
        />
        {notesError?.notesName && (
          <ErrorMessage
            message={notesError?.notesName}
            errorStyle={{marginLeft: moderateScaleVertical(10)}}
          />
        )}
      </View>
      <DottedButtonGrey
        btnText={
          docUploading
            ? 'loading...'
            : !!notes?.documentFile?.name
            ? `${notes?.documentFile?.name?.slice(0, 20)}...`
            : 'Upload PDF'
        }
        onPressBtn={handleDocument}
      />
      {notesError?.documentFileUrl && (
        <ErrorMessage
          message={notesError?.documentFileUrl}
          errorStyle={{
            marginLeft: moderateScaleVertical(10),
            marginVertical: moderateScale(10),
          }}
        />
      )}
      <CommonButton
        onPressBtn={handleSaveNotes}
        btnText="Save Note"
        mainViewStyle={{
          marginHorizontal: moderateScale(0),
          marginVertical: moderateScaleVertical(12),
          marginBottom: moderateScaleVertical(12),
        }}
        loading={loading}
      />
    </View>
  );
};

export default AddNewNotes;

const styles = StyleSheet.create({
  textHeading: {
    fontFamily: fontFamily.Poppins_SemiBold,
    fontSize: textScale(15),
    color: colors.black,
  },

  textInputContainer: {
    marginVertical: moderateScaleVertical(8),
  },
  textInputHeading: {
    fontFamily: fontFamily.Poppins_Regular,
    fontSize: textScale(14),
    color: colors.grey1,
  },
});
