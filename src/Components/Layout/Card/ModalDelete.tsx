import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'
import { moderateScale } from '../../../styles/responsiveSize';


interface ModalDeleteInterface{
    isModalVisible:boolean;
    toggleModal:()=>void;
    modalView?:ViewStyle;
    modalContent?:ViewStyle;
    children:React.ReactNode


}

const ModalDelete:React.FC<ModalDeleteInterface> = ({children,isModalVisible,toggleModal,modalContent,modalView}) => {
  return (
    <Modal
    isVisible={isModalVisible}
    onBackdropPress={toggleModal}
    swipeDirection="down"
    onSwipeComplete={toggleModal}
    
    style={[styles.modal,modalView]}
  >
    <View style={[styles.modalContent,modalContent]}>
            {children}
    </View>
  </Modal>
  )
}

export default ModalDelete

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        margin: 0,
        padding:moderateScale(20),
       
      },
    modalContent: {
        backgroundColor: '#ffcccc',
        padding: moderateScale(20),
        borderRadius: moderateScale(20),
        
    
      },
})