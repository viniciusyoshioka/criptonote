import React, { ReactChild } from "react"
import { Modal as RNModal, TouchableWithoutFeedback, ModalProps as RNModalProps, StyleProp, ViewStyle } from "react-native"

import { ModalBackground, ModalContent, ModalView } from "./style"


export interface ModalProps extends RNModalProps {
    visible: boolean,
    setVisible: (visible: boolean) => void,
    onClose?: () => void,
    children?: ReactChild,
    modalStyle?: StyleProp<ViewStyle>,
    backgroundStyle?: StyleProp<ViewStyle>,
}


export function Modal(props: ModalProps) {


    function closeModal() {
        if (props.onClose) {
            props.onClose()
        }
        props.setVisible(false)
    }


    return (
        <RNModal transparent={true} visible={props.visible} onRequestClose={closeModal}>
            <TouchableWithoutFeedback onPress={closeModal}>
                <ModalView style={props.modalStyle}>
                    <ModalBackground style={props.backgroundStyle} />

                    <ModalContent activeOpacity={1}>
                        {props?.children}
                    </ModalContent>
                </ModalView>
            </TouchableWithoutFeedback>
        </RNModal>
    )
}
