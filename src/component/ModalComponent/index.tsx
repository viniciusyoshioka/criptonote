import styled from "styled-components/native"

import { ModalButton, ModalButtonProps } from "./ModalButton"
import { styledProps } from "../../service/theme"


export const ModalTitle = styled.Text`
    text-align-vertical: center;
    margin-horizontal: 24px;
    height: 56px;
    font-size: 18px;
    opacity: ${(props: styledProps) => props.theme.opacity.highEmphasis};
    color: ${(props: styledProps) => props.theme.color.modal_color};
`


export const ModalViewContent = styled.View`
    align-items: flex-start;
    justify-content: center;
    margin-horizontal: 24px;
`


export const ModalViewButton = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    margin: 8px;
`


export type { ModalButtonProps }
export { ModalButton }
