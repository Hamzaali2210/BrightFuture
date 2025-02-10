import {StyleSheet, Text, View, ViewStyle,TouchableOpacity} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {moderateScale, textScale} from '../../../styles/responsiveSize';
import CrossIcon from 'react-native-vector-icons/AntDesign'
import colors from '../../../styles/colors';

interface ModalCardInterface {
  isModalVisible: boolean;
  toggleModal: () => void;
  modalView?: ViewStyle;
  modalContent?: ViewStyle;
  children: React.ReactNode;
  isSwipe?:boolean;
  isCancel?:boolean;

}

const ModalCard: React.FC<ModalCardInterface> = ({
  children,
  isModalVisible,
  toggleModal,
  modalContent,
  modalView,
  isSwipe,
  isCancel
}) => {
  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={toggleModal}
      swipeDirection={!isSwipe?"down":undefined}
      
      onSwipeComplete={()=>{
        if(isSwipe){
          return 

        }
        toggleModal()
      }}

      style={[styles.modal, modalView]}>
      <View style={[styles.modalContent, modalContent]}>
        
      { isCancel&&  <TouchableOpacity onPress={toggleModal} style={{alignSelf:"flex-end",padding:moderateScale(4)}}>
          <CrossIcon
          name='close'
          color={colors.black}
          size={textScale(24)}
          />
        </TouchableOpacity>}
        {/* </View> */}
        
        {children}
        </View>
    </Modal>
  );
};

export default ModalCard;

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: moderateScale(20),

    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
  },
});
