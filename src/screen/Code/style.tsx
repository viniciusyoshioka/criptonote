import styled from "styled-components/native"
import { RectButton } from "react-native-gesture-handler"

import { styledProps } from "../../service/theme"


export const ViewContent = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    margin: 8px;
`


export const OpenNoteButtonBase = styled(RectButton)`
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 40px;
    padding-horizontal: 8px;
    border-radius: 2px;
    background-color: ${(props: styledProps) => props.theme.color.openNoteButton_background};
`


export const OpenNoteButtonText = styled.Text`
    font-size: 15px;
    color: ${(props: styledProps) => props.theme.color.openNoteButton_color};
    opacity: ${(props: styledProps) => props.theme.opacity.highEmphasis};
`
