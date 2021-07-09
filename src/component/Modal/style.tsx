import styled from "styled-components/native"

import { styledProps } from "../../service/theme"


export const ModalView = styled.View`
    align-items: center;
    justify-content: center;
    height: 100%;
`


export const ModalBackground = styled.View`
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background-color: rgba(0, 0, 0, 0.35);
`


export const ModalContent = styled.TouchableOpacity`
    width: 280px;
    elevation: 6;
    border-radius: 1px;
    background-color: ${(props: styledProps) => props.theme.color.modal_background};
`
