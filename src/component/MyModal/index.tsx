import React from "react"

import { ModalBackground, ModalPopup, ModalScreen } from "./style"
import { ModalFullscreenProps } from "../ModalFullscreen"


export interface MyModalProps extends ModalFullscreenProps {}


export function MyModal(props: MyModalProps) {


    if (!props.visible) {
        return null
    }


    return (
        <ModalScreen
            activeOpacity={1}
            onPress={() => {
                props.setVisible(false)
                if (props.onClose) {
                    props.onClose()
                }
            }}
        >
            <ModalBackground style={props.backgroundStyle} />

            <ModalPopup
                activeOpacity={1}
                style={props.modalStyle}
            >
                {props.children}
            </ModalPopup>
        </ModalScreen>
    )
}
