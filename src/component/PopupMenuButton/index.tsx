import React from "react"
import { RectButtonProps } from "react-native-gesture-handler"

import { PopupMenuButtonBase, PopupMenuButtonText } from "./style"


export interface PopupMenuButtonProps extends RectButtonProps {
    text: string,
}


export function PopupMenuButton(props: PopupMenuButtonProps) {
    return (
        <PopupMenuButtonBase {...props}>
            <PopupMenuButtonText numberOfLines={1}>
                {props.text}
            </PopupMenuButtonText>
        </PopupMenuButtonBase>
    )
}
