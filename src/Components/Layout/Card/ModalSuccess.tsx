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

const ModalSuccess:React.FC<ModalDeleteInterface> = ({children,isModalVisible,toggleModal,modalContent,modalView}) => {
  return (
    <Modal
    isVisible={isModalVisible}
    onBackdropPress={toggleModal}
    style={[styles.modal,modalView]}
  >
    <View style={[styles.modalContent,modalContent]}>
            {children}
    </View>
  </Modal>
  )
}

export default ModalSuccess

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        margin: 0,
        padding:moderateScale(20)
      },
    modalContent: {
        backgroundColor: '#ffffff',
        padding: moderateScale(20),
        borderRadius: moderateScale(20),
        
    
      },
})