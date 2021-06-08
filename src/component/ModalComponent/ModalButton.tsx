import React from "react"
import { TouchableOpacityProps } from "react-native"
import styled from "styled-components/native"

import { styledProps } from "../../service/theme"


export const ModalButtonBase = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    min-width: 64px;
    min-height: 32px;
    border-radius: 1px;
`


export const ModalButtonTextBase = styled.Text`
    font-size: 15px;
    opacity: ${(props: styledProps) => props.theme.opacity.highEmphasis};
    color: ${(props: styledProps) => props.theme.color.modalButton_color};
`


export interface ModalButtonProps extends TouchableOpacityProps {
    text?: string,
}


export function ModalButton(props: ModalButtonProps) {
    return (
        <ModalButtonBase {...props}>
            <ModalButtonTextBase numberOfLines={1}>
                {props?.text}
            </ModalButtonTextBase>
        </ModalButtonBase>
    )
}
