import styled from "styled-components/native"

import { styledProps } from "../../service/theme"


export const ModalScreen = styled.TouchableOpacity`
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    align-items: center;
    justify-content: center;
    elevation: 5;
`


export const ModalBackground = styled.View`
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background-color: rgba(0, 0, 0, 0.5);
`


export const ModalPopup = styled.TouchableOpacity`
    width: 80%;
    elevation: 6;
    border-radius: 1px;
    background-color: ${(props: styledProps) => props.theme.color.modal_background};
`
