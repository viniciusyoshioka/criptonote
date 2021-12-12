import { RectButton } from "react-native-gesture-handler"
import styled from "styled-components/native"

import { styledProps } from "../../service/theme"


export const Button = styled(RectButton)`
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    height: 56px;
    margin-right: 8px;
    margin-bottom: 6px;
    padding-horizontal: 8px;
    border-radius: 1px;
    background-color: ${(props: styledProps) => props.theme.color.noteItem_background};
    elevation: 2;
`


export const Block = styled.View`
    align-items: center;
    justify-content: center;
`


export const Line = styled.View`
    flex: 1;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
`


export const Title = styled.Text`
    width: 100%;
    font-size: 16px;
    opacity: ${(props: styledProps) => props.theme.opacity.highEmphasis};
    color: ${(props: styledProps) => props.theme.color.noteItem_color};
`


export const Date = styled.Text`
    width: 100%;
    font-size: 12px;
    opacity: ${(props: styledProps) => props.theme.opacity.mediumEmphasis};
    color: ${(props: styledProps) => props.theme.color.noteItem_color};
`
